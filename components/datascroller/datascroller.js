var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, Renderer, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
var DataScroller = (function () {
    function DataScroller(el, differs, renderer, domHandler) {
        this.el = el;
        this.renderer = renderer;
        this.domHandler = domHandler;
        this.onLazyLoad = new EventEmitter();
        this.buffer = 0.9;
        this.dataToRender = [];
        this.first = 0;
        this.differ = differs.find([]).create(null);
    }
    DataScroller.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.lazy) {
            this.load();
        }
        if (this.loader) {
            this.scrollFunction = this.renderer.listen(this.loader, 'click', function () {
                _this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    };
    DataScroller.prototype.ngAfterContentInit = function () {
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
    DataScroller.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.lazy)
                this.dataToRender = this.value;
            else
                this.load();
        }
    };
    DataScroller.prototype.load = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
        else {
            for (var i = this.first; i < (this.first + this.rows); i++) {
                if (i >= this.value.length) {
                    break;
                }
                this.dataToRender.push(this.value[i]);
            }
        }
        this.first = this.first + this.rows;
    };
    DataScroller.prototype.reset = function () {
        this.first = 0;
        this.dataToRender = [];
        this.load();
    };
    DataScroller.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataScroller.prototype.bindScrollListener = function () {
        var _this = this;
        if (this.inline) {
            this.contentElement = this.contentViewChild.nativeElement;
            this.scrollFunction = this.renderer.listen(this.contentElement, 'scroll', function () {
                var scrollTop = _this.contentElement.scrollTop;
                var scrollHeight = _this.contentElement.scrollHeight;
                var viewportHeight = _this.contentElement.clientHeight;
                if ((scrollTop >= ((scrollHeight * _this.buffer) - (viewportHeight)))) {
                    _this.load();
                }
            });
        }
        else {
            this.scrollFunction = this.renderer.listenGlobal('window', 'scroll', function () {
                var docBody = document.body;
                var docElement = document.documentElement;
                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                var winHeight = docElement.clientHeight;
                var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
                if (scrollTop >= ((docHeight * _this.buffer) - winHeight)) {
                    _this.load();
                }
            });
        }
    };
    DataScroller.prototype.ngOnDestroy = function () {
        //unbind
        if (this.scrollFunction) {
            this.scrollFunction();
            this.contentElement = null;
        }
    };
    return DataScroller;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], DataScroller.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataScroller.prototype, "rows", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataScroller.prototype, "lazy", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataScroller.prototype, "onLazyLoad", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataScroller.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataScroller.prototype, "buffer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataScroller.prototype, "inline", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "scrollHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataScroller.prototype, "loader", void 0);
__decorate([
    ViewChild('content'),
    __metadata("design:type", ElementRef)
], DataScroller.prototype, "contentViewChild", void 0);
__decorate([
    ContentChild(Header),
    __metadata("design:type", Object)
], DataScroller.prototype, "header", void 0);
__decorate([
    ContentChild(Footer),
    __metadata("design:type", Object)
], DataScroller.prototype, "footer", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], DataScroller.prototype, "templates", void 0);
DataScroller = __decorate([
    Component({
        selector: 'p-dataScroller',
        template: "\n    <div [ngClass]=\"{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n        <div class=\"ui-datascroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n            <ng-content select=\"p-header\"></ng-content>\n        </div>\n        <div #content class=\"ui-datascroller-content ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\n            <ul class=\"ui-datascroller-list\">\n                <li *ngFor=\"let item of dataToRender\">\n                    <template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></template>\n                </li>\n            </ul>\n        </div>\n        <div class=\"ui-datascroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n            <ng-content select=\"p-footer\"></ng-content>\n        </div>\n    </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, IterableDiffers, Renderer, DomHandler])
], DataScroller);
export { DataScroller };
var DataScrollerModule = (function () {
    function DataScrollerModule() {
    }
    return DataScrollerModule;
}());
DataScrollerModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [DataScroller, SharedModule],
        declarations: [DataScroller]
    })
], DataScrollerModule);
export { DataScrollerModule };
//# sourceMappingURL=datascroller.js.map