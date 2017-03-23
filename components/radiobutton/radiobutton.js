var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, ElementRef, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButton; }),
    multi: true
};
var RadioButton = (function () {
    function RadioButton(cd) {
        this.cd = cd;
        this.onClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    RadioButton.prototype.ngAfterViewInit = function () {
        this.input = this.inputViewChild.nativeElement;
    };
    RadioButton.prototype.handleClick = function () {
        if (!this.disabled) {
            this.onClick.emit(null);
            this.select();
        }
    };
    RadioButton.prototype.select = function () {
        if (!this.disabled) {
            this.input.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    RadioButton.prototype.writeValue = function (value) {
        this.checked = (value == this.value);
        if (this.input) {
            this.input.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    RadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    RadioButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    RadioButton.prototype.onFocus = function (event) {
        this.focused = true;
    };
    RadioButton.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    RadioButton.prototype.onChange = function (event) {
        this.select();
    };
    return RadioButton;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioButton.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RadioButton.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], RadioButton.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RadioButton.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], RadioButton.prototype, "tabindex", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], RadioButton.prototype, "onClick", void 0);
__decorate([
    ViewChild('rb'),
    __metadata("design:type", ElementRef)
], RadioButton.prototype, "inputViewChild", void 0);
RadioButton = __decorate([
    Component({
        selector: 'p-radioButton',
        template: "\n        <div class=\"ui-radiobutton ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" \n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\">\n            </div>\n            <div (click)=\"handleClick()\"\n                [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-radiobutton-icon\" [ngClass]=\"{'fa fa-circle':rb.checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-radiobutton-label\" (click)=\"select()\" *ngIf=\"label\">{{label}}</label>\n    ",
        providers: [RADIO_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], RadioButton);
export { RadioButton };
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [RadioButton],
        declarations: [RadioButton]
    })
], RadioButtonModule);
export { RadioButtonModule };
//# sourceMappingURL=radiobutton.js.map