var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, trigger, state, transition, style, animate, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
var Fieldset = (function () {
    function Fieldset(el) {
        this.el = el;
        this.collapsed = false;
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
    }
    Fieldset.prototype.toggle = function (event) {
        var _this = this;
        if (this.toggleable) {
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            //TODO: Use onDone of animate callback instead with RC6
            setTimeout(function () {
                _this.animating = false;
            }, 400);
        }
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
    };
    Fieldset.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return Fieldset;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Fieldset.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Fieldset.prototype, "toggleable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Fieldset.prototype, "collapsed", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Fieldset.prototype, "onBeforeToggle", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Fieldset.prototype, "onAfterToggle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Fieldset.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Fieldset.prototype, "styleClass", void 0);
Fieldset = __decorate([
    Component({
        selector: 'p-fieldset',
        template: "\n        <fieldset [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\" (click)=\"toggle($event)\">\n                <span *ngIf=\"toggleable\" class=\"ui-fieldset-toggler fa fa-w\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                {{legend}}\n            </legend>\n            <div class=\"ui-fieldset-content-wrapper\" [@fieldsetContent]=\"collapsed ? 'hidden' : 'visible'\" \n                        [ngClass]=\"{'ui-fieldset-content-wrapper-overflown': collapsed||animating}\">\n                <div class=\"ui-fieldset-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </fieldset>\n    ",
        animations: [
            trigger('fieldsetContent', [
                state('hidden', style({
                    height: '0px'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [ElementRef])
], Fieldset);
export { Fieldset };
var FieldsetModule = (function () {
    function FieldsetModule() {
    }
    return FieldsetModule;
}());
FieldsetModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Fieldset],
        declarations: [Fieldset]
    })
], FieldsetModule);
export { FieldsetModule };
//# sourceMappingURL=fieldset.js.map