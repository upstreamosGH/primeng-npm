var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { Router } from '@angular/router';
var TabMenu = (function () {
    function TabMenu(router) {
        this.router = router;
    }
    TabMenu.prototype.ngOnInit = function () {
        if (!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    };
    TabMenu.prototype.itemClick = function (event, item) {
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
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
        if (item.routerLink) {
            this.router.navigate(item.routerLink);
        }
        this.activeItem = item;
    };
    TabMenu.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    TabMenu.prototype.unsubscribe = function (item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (var _i = 0, _a = item.items; _i < _a.length; _i++) {
                var childItem = _a[_i];
                this.unsubscribe(childItem);
            }
        }
    };
    return TabMenu;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], TabMenu.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TabMenu.prototype, "activeItem", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TabMenu.prototype, "popup", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TabMenu.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TabMenu.prototype, "styleClass", void 0);
TabMenu = __decorate([
    Component({
        selector: 'p-tabMenu',
        template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model\" \n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item}\">\n                    <a [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\"\n                        [attr.target]=\"item.target\">\n                        <span class=\"ui-menuitem-icon fa\" [ngClass]=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [Router])
], TabMenu);
export { TabMenu };
var TabMenuModule = (function () {
    function TabMenuModule() {
    }
    return TabMenuModule;
}());
TabMenuModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [TabMenu],
        declarations: [TabMenu]
    })
], TabMenuModule);
export { TabMenuModule };
//# sourceMappingURL=tabmenu.js.map