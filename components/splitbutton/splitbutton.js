var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { ButtonModule } from '../button/button';
import { Router } from '@angular/router';
var SplitButton = (function () {
    function SplitButton(el, domHandler, renderer, router) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngOnInit = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.menuVisible = false;
        });
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url || item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit(event);
        }
        this.menuVisible = false;
        if (item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    };
    SplitButton.prototype.onDropdownClick = function (event, menu, container) {
        this.menuVisible = !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu, 25);
        menu.style.zIndex = String(++DomHandler.zindex);
        event.stopPropagation();
    };
    SplitButton.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    return SplitButton;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], SplitButton.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "iconPos", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "label", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SplitButton.prototype, "onClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SplitButton.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SplitButton.prototype, "menuStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "menuStyleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SplitButton.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SplitButton.prototype, "tabindex", void 0);
SplitButton = __decorate([
    Component({
        selector: 'p-splitButton',
        template: "\n        <div #container [ngClass]=\"{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" pButton [icon]=\"icon\" [label]=\"label\" cornerStyleClass=\"ui-corner-left\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </button><button type=\"button\" pButton class=\"ui-splitbutton-menubutton\" icon=\"fa-caret-down\" cornerStyleClass=\"ui-corner-right\" (click)=\"onDropdownClick($event,menu,container)\" [disabled]=\"disabled\"></button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of model\">\n                        <a [href]=\"item.url||'#'\" \n                        [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':item.disabled}\" \n                        (click)=\"itemClick($event,item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer, Router])
], SplitButton);
export { SplitButton };
var SplitButtonModule = (function () {
    function SplitButtonModule() {
    }
    return SplitButtonModule;
}());
SplitButtonModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [SplitButton, ButtonModule],
        declarations: [SplitButton]
    })
], SplitButtonModule);
export { SplitButtonModule };
//# sourceMappingURL=splitbutton.js.map