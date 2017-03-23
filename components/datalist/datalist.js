var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChild, ContentChildren, IterableDiffers, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer, PrimeTemplate } from '../common/shared';
import { PaginatorModule } from '../paginator/paginator';
var DataList = (function () {
    function DataList(el, differs) {
        this.el = el;
        this.pageLinks = 5;
        this.onLazyLoad = new EventEmitter();
        this.paginatorPosition = 'bottom';
        this.emptyMessage = 'No records found';
        this.onPage = new EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataList.prototype.ngAfterContentInit = function () {
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
    DataList.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataList.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    };
    DataList.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataList.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataList.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataList.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataList.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataList.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    return DataList;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], DataList.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataList.prototype, "paginator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataList.prototype, "rows", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataList.prototype, "totalRecords", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DataList.prototype, "pageLinks", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DataList.prototype, "rowsPerPageOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DataList.prototype, "lazy", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataList.prototype, "onLazyLoad", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DataList.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataList.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataList.prototype, "paginatorPosition", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DataList.prototype, "emptyMessage", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DataList.prototype, "onPage", void 0);
__decorate([
    ContentChild(Header),
    __metadata("design:type", Object)
], DataList.prototype, "header", void 0);
__decorate([
    ContentChild(Footer),
    __metadata("design:type", Object)
], DataList.prototype, "footer", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], DataList.prototype, "templates", void 0);
DataList = __decorate([
    Component({
        selector: 'p-dataList',
        template: "\n        <div [ngClass]=\"'ui-datalist ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datalist-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='bottom' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datalist-content ui-widget-content\">\n                <div *ngIf=\"isEmpty()\" class=\"ui-datalist-emptymessage\">{{emptyMessage}}</div>\n                <ul class=\"ui-datalist-data\">\n                    <li *ngFor=\"let item of dataToRender;let i = index\">\n                        <template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\" [index]=\"i\"></template>\n                    </li>\n                </ul>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='top' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datalist-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [ElementRef, IterableDiffers])
], DataList);
export { DataList };
var DataListModule = (function () {
    function DataListModule() {
    }
    return DataListModule;
}());
DataListModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, PaginatorModule],
        exports: [DataList, SharedModule],
        declarations: [DataList]
    })
], DataListModule);
export { DataListModule };
//# sourceMappingURL=datalist.js.map