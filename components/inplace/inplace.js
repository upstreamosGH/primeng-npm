var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button';
var InplaceDisplay = (function () {
    function InplaceDisplay() {
    }
    return InplaceDisplay;
}());
InplaceDisplay = __decorate([
    Component({
        selector: 'p-inplaceDisplay',
        template: '<ng-content></ng-content>'
    })
], InplaceDisplay);
export { InplaceDisplay };
var InplaceContent = (function () {
    function InplaceContent() {
    }
    return InplaceContent;
}());
InplaceContent = __decorate([
    Component({
        selector: 'p-inplaceContent',
        template: '<ng-content></ng-content>'
    })
], InplaceContent);
export { InplaceContent };
var Inplace = (function () {
    function Inplace() {
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    return Inplace;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "active", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "closable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Inplace.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Inplace.prototype, "styleClass", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Inplace.prototype, "onActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Inplace.prototype, "onDeactivate", void 0);
Inplace = __decorate([
    Component({
        selector: 'p-inplace',
        template: "\n        <div [ngClass]=\"'ui-inplace ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\"\n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"fa-close\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
    })
], Inplace);
export { Inplace };
var InplaceModule = (function () {
    function InplaceModule() {
    }
    return InplaceModule;
}());
InplaceModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
        declarations: [Inplace, InplaceDisplay, InplaceContent]
    })
], InplaceModule);
export { InplaceModule };
//# sourceMappingURL=inplace.js.map