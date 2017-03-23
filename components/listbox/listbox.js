var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/ObjectUtils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = (function () {
    function Listbox(el, domHandler, objectUtils) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.checkbox = false;
        this.filter = false;
        this.metaKeySelection = true;
        this.onChange = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Listbox.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        if (!this.checkboxClick) {
            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value.splice(this.findIndex(option), 1);
                }
                else {
                    this.value = [];
                    this.value.push(option.value);
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value.push(option.value);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.value.splice(this.findIndex(option), 1);
            }
            else {
                this.value = this.value || [];
                this.value.push(option.value);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.isSelected = function (option) {
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var i = 0; i < this.value.length; i++) {
                    if (this.value[i] === option.value) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.value == option.value;
        }
        return selected;
    };
    Listbox.prototype.findIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(option.value, this.value[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Listbox.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    Listbox.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    Listbox.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    Listbox.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onDoubleClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.onCheckboxClick = function (event, option) {
        this.checkboxClick = true;
        var selected = this.isSelected(option);
        if (selected) {
            this.value.splice(this.findIndex(option), 1);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value.push(option.value);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    return Listbox;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], Listbox.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Listbox.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Listbox.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "checkbox", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "metaKeySelection", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Listbox.prototype, "onChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Listbox.prototype, "onDblClick", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], Listbox.prototype, "templates", void 0);
Listbox = __decorate([
    Component({
        selector: 'p-listbox',
        template: "\n        <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple) || filter\">\n                <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n                    <div class=\"ui-helper-hidden-accessible\">\n                        <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\n                    </div>\n                    <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked()}\" (click)=\"toggleAll($event,cb)\">\n                        <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':isAllChecked()}\"></span>\n                    </div>\n                </div>\n                <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n                    <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n            </div>\n            <ul class=\"ui-listbox-list\">\n                <li *ngFor=\"let option of options\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\n                    [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option)}\"\n                    (click)=\"onOptionClick($event,option)\" (dblclick)=\"onDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\">\n                    <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\" (click)=\"onCheckboxClick($event,option)\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input type=\"checkbox\" [checked]=\"isSelected(option)\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                            <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':isSelected(option)}\"></span>\n                        </div>\n                    </div>\n                    <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n                    <template *ngIf=\"itemTemplate\" [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\"></template>\n                </li>\n            </ul>\n        </div>\n    ",
        providers: [DomHandler, ObjectUtils, LISTBOX_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler, ObjectUtils])
], Listbox);
export { Listbox };
var ListboxModule = (function () {
    function ListboxModule() {
    }
    return ListboxModule;
}());
ListboxModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [Listbox, SharedModule],
        declarations: [Listbox]
    })
], ListboxModule);
export { ListboxModule };
//# sourceMappingURL=listbox.js.map