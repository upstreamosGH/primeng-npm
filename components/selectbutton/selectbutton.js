var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SELECTBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectButton; }),
    multi: true
};
var SelectButton = (function () {
    function SelectButton() {
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectButton.prototype.onItemClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        if (this.multiple) {
            var itemIndex = this.findItemIndex(option);
            if (itemIndex != -1)
                this.value.splice(itemIndex, 1);
            else
                this.value.push(option.value);
        }
        else {
            this.value = option.value;
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    return SelectButton;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], SelectButton.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelectButton.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectButton.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectButton.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectButton.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectButton.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectButton.prototype, "onChange", void 0);
SelectButton = __decorate([
    Component({
        selector: 'p-selectButton',
        template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options;\" class=\"ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled':disabled}\" (click)=\"onItemClick($event,option)\">\n                <span class=\"ui-button-text ui-c\">{{option.label}}</span>\n            </div>\n        </div>\n    ",
        providers: [SELECTBUTTON_VALUE_ACCESSOR]
    })
], SelectButton);
export { SelectButton };
var SelectButtonModule = (function () {
    function SelectButtonModule() {
    }
    return SelectButtonModule;
}());
SelectButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [SelectButton],
        declarations: [SelectButton]
    })
], SelectButtonModule);
export { SelectButtonModule };
//# sourceMappingURL=selectbutton.js.map