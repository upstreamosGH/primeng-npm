var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, QueryList, trigger, state, transition, style, animate } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../common/shared';
var Accordion = (function () {
    function Accordion(el) {
        this.el = el;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return Accordion;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Accordion.prototype, "multiple", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Accordion.prototype, "onClose", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Accordion.prototype, "onOpen", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Accordion.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Accordion.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Accordion.prototype, "lazy", void 0);
Accordion = __decorate([
    Component({
        selector: 'p-accordion',
        template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [ElementRef])
], Accordion);
export { Accordion };
var AccordionTab = (function () {
    function AccordionTab(accordion) {
        this.accordion = accordion;
        this.selectedChange = new EventEmitter();
        this.accordion.addTab(this);
    }
    AccordionTab.prototype.toggle = function (event) {
        var _this = this;
        if (this.disabled) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        //TODO: Use onDone of animate callback instead with RC6
        setTimeout(function () {
            _this.animating = false;
        }, 400);
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "lazy", {
        get: function () {
            return this.accordion.lazy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return AccordionTab;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], AccordionTab.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AccordionTab.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AccordionTab.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], AccordionTab.prototype, "selectedChange", void 0);
__decorate([
    ContentChildren(Header),
    __metadata("design:type", QueryList)
], AccordionTab.prototype, "headerFacet", void 0);
AccordionTab = __decorate([
    Component({
        selector: 'p-accordionTab',
        template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\"\n            (click)=\"toggle($event)\">\n            <span class=\"fa fa-fw\" [ngClass]=\"{'fa-caret-down': selected, 'fa-caret-right': !selected}\"></span>\n            <a href=\"#\" *ngIf=\"!hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">{{header}}</a>\n            <a href=\"#\" *ngIf=\"hasHeaderFacet\" role=\"tab\" [attr.aria-expanded]=\"selected\" [attr.aria-selected]=\"selected\">\n                <ng-content select=\"p-header\"></ng-content>\n            </a>\n        </div>\n        <div class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? 'visible' : 'hidden'\" \n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" role=\"tabpanel\" [attr.aria-hidden]=\"!selected\">\n            <div class=\"ui-accordion-content ui-widget-content\" *ngIf=\"lazy ? selected : true\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        animations: [
            trigger('tabContent', [
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
    __metadata("design:paramtypes", [Accordion])
], AccordionTab);
export { AccordionTab };
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
AccordionModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Accordion, AccordionTab],
        declarations: [Accordion, AccordionTab]
    })
], AccordionModule);
export { AccordionModule };
//# sourceMappingURL=accordion.js.map