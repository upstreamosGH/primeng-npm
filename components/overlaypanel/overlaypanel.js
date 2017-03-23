var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var OverlayPanel = (function () {
    function OverlayPanel(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.dismissable = true;
        this.onBeforeShow = new EventEmitter();
        this.onAfterShow = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onAfterHide = new EventEmitter();
        this.visible = false;
    }
    OverlayPanel.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dismissable) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (!_this.selfClick && !_this.targetEvent) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.targetEvent = false;
            });
        }
    };
    OverlayPanel.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    };
    OverlayPanel.prototype.toggle = function (event, target) {
        var currentTarget = (target || event.currentTarget || event.target);
        if (!this.target || this.target == currentTarget) {
            if (this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.target = currentTarget;
    };
    OverlayPanel.prototype.show = function (event, target) {
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.onBeforeShow.emit(null);
        var elementTarget = target || event.currentTarget || event.target;
        this.container.style.zIndex = ++DomHandler.zindex;
        if (this.visible) {
            this.domHandler.absolutePosition(this.container, elementTarget);
        }
        else {
            this.visible = true;
            this.domHandler.absolutePosition(this.container, elementTarget);
            this.domHandler.fadeIn(this.container, 250);
        }
        this.onAfterShow.emit(null);
    };
    OverlayPanel.prototype.hide = function () {
        if (this.visible) {
            this.onBeforeHide.emit(null);
            this.visible = false;
            this.onAfterHide.emit(null);
        }
    };
    OverlayPanel.prototype.onPanelClick = function () {
        if (this.dismissable) {
            this.selfClick = true;
        }
    };
    OverlayPanel.prototype.onCloseClick = function (event) {
        this.hide();
        if (this.dismissable) {
            this.selfClick = true;
        }
        event.preventDefault();
    };
    OverlayPanel.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        this.target = null;
    };
    return OverlayPanel;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], OverlayPanel.prototype, "dismissable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], OverlayPanel.prototype, "showCloseIcon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], OverlayPanel.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], OverlayPanel.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], OverlayPanel.prototype, "appendTo", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], OverlayPanel.prototype, "onBeforeShow", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], OverlayPanel.prototype, "onAfterShow", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], OverlayPanel.prototype, "onBeforeHide", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], OverlayPanel.prototype, "onAfterHide", void 0);
OverlayPanel = __decorate([
    Component({
        selector: 'p-overlayPanel',
        template: "\n        <div [ngClass]=\"'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            [style.display]=\"visible ? 'block' : 'none'\" (click)=\"onPanelClick()\">\n            <div class=\"ui-overlaypanel-content\">\n                <ng-content></ng-content>\n            </div>\n            <a href=\"#\" *ngIf=\"showCloseIcon\" class=\"ui-overlaypanel-close ui-state-default\" (click)=\"onCloseClick($event)\">\n                <span class=\"fa fa-fw fa-close\"></span>\n            </a>\n        </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer])
], OverlayPanel);
export { OverlayPanel };
var OverlayPanelModule = (function () {
    function OverlayPanelModule() {
    }
    return OverlayPanelModule;
}());
OverlayPanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [OverlayPanel],
        declarations: [OverlayPanel]
    })
], OverlayPanelModule);
export { OverlayPanelModule };
//# sourceMappingURL=overlaypanel.js.map