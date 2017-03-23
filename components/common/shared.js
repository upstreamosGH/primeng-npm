var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, EventEmitter, Directive, ViewContainerRef, Input, Output, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = (function () {
    function Header() {
    }
    return Header;
}());
Header = __decorate([
    Component({
        selector: 'p-header',
        template: '<ng-content></ng-content>'
    })
], Header);
export { Header };
var Footer = (function () {
    function Footer() {
    }
    return Footer;
}());
Footer = __decorate([
    Component({
        selector: 'p-footer',
        template: '<ng-content></ng-content>'
    })
], Footer);
export { Footer };
var PrimeTemplate = (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        if (this.type) {
            console.log('Defining a pTemplate with type property is deprecated use pTemplate="type" instead.');
            return this.type;
        }
        else {
            return this.name;
        }
    };
    return PrimeTemplate;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], PrimeTemplate.prototype, "type", void 0);
__decorate([
    Input('pTemplate'),
    __metadata("design:type", String)
], PrimeTemplate.prototype, "name", void 0);
PrimeTemplate = __decorate([
    Directive({
        selector: '[pTemplate]',
        host: {}
    }),
    __metadata("design:paramtypes", [TemplateRef])
], PrimeTemplate);
export { PrimeTemplate };
var TemplateWrapper = (function () {
    function TemplateWrapper(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateWrapper.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    };
    TemplateWrapper.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return TemplateWrapper;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], TemplateWrapper.prototype, "item", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TemplateWrapper.prototype, "index", void 0);
__decorate([
    Input('pTemplateWrapper'),
    __metadata("design:type", TemplateRef)
], TemplateWrapper.prototype, "templateRef", void 0);
TemplateWrapper = __decorate([
    Directive({
        selector: '[pTemplateWrapper]'
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], TemplateWrapper);
export { TemplateWrapper };
var Column = (function () {
    function Column() {
        this.sortFunction = new EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    return Column;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "field", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "sortField", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "footer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Column.prototype, "sortable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Column.prototype, "editable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Column.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "filterMatchMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Column.prototype, "rowspan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Column.prototype, "colspan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Column.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Column.prototype, "hidden", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Column.prototype, "expander", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "selectionMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Column.prototype, "filterPlaceholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Column.prototype, "frozen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Column.prototype, "sortFunction", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], Column.prototype, "templates", void 0);
__decorate([
    ContentChild(TemplateRef),
    __metadata("design:type", TemplateRef)
], Column.prototype, "template", void 0);
Column = __decorate([
    Component({
        selector: 'p-column',
        template: ""
    })
], Column);
export { Column };
var Row = (function () {
    function Row() {
    }
    return Row;
}());
__decorate([
    ContentChildren(Column),
    __metadata("design:type", QueryList)
], Row.prototype, "columns", void 0);
Row = __decorate([
    Component({
        selector: 'p-row',
        template: ""
    })
], Row);
export { Row };
var HeaderColumnGroup = (function () {
    function HeaderColumnGroup() {
    }
    return HeaderColumnGroup;
}());
__decorate([
    ContentChildren(Row),
    __metadata("design:type", QueryList)
], HeaderColumnGroup.prototype, "rows", void 0);
HeaderColumnGroup = __decorate([
    Component({
        selector: 'p-headerColumnGroup',
        template: ""
    })
], HeaderColumnGroup);
export { HeaderColumnGroup };
var FooterColumnGroup = (function () {
    function FooterColumnGroup() {
    }
    return FooterColumnGroup;
}());
__decorate([
    ContentChildren(Row),
    __metadata("design:type", QueryList)
], FooterColumnGroup.prototype, "rows", void 0);
FooterColumnGroup = __decorate([
    Component({
        selector: 'p-footerColumnGroup',
        template: ""
    })
], FooterColumnGroup);
export { FooterColumnGroup };
var ColumnBodyTemplateLoader = (function () {
    function ColumnBodyTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnBodyTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnBodyTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnBodyTemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnBodyTemplateLoader.prototype, "column", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnBodyTemplateLoader.prototype, "rowData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ColumnBodyTemplateLoader.prototype, "rowIndex", void 0);
ColumnBodyTemplateLoader = __decorate([
    Component({
        selector: 'p-columnBodyTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ColumnBodyTemplateLoader);
export { ColumnBodyTemplateLoader };
var ColumnHeaderTemplateLoader = (function () {
    function ColumnHeaderTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnHeaderTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnHeaderTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnHeaderTemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnHeaderTemplateLoader.prototype, "column", void 0);
ColumnHeaderTemplateLoader = __decorate([
    Component({
        selector: 'p-columnHeaderTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ColumnHeaderTemplateLoader);
export { ColumnHeaderTemplateLoader };
var ColumnFooterTemplateLoader = (function () {
    function ColumnFooterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFooterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFooterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFooterTemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnFooterTemplateLoader.prototype, "column", void 0);
ColumnFooterTemplateLoader = __decorate([
    Component({
        selector: 'p-columnFooterTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ColumnFooterTemplateLoader);
export { ColumnFooterTemplateLoader };
var ColumnFilterTemplateLoader = (function () {
    function ColumnFilterTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnFilterTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    };
    ColumnFilterTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnFilterTemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnFilterTemplateLoader.prototype, "column", void 0);
ColumnFilterTemplateLoader = __decorate([
    Component({
        selector: 'p-columnFilterTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ColumnFilterTemplateLoader);
export { ColumnFilterTemplateLoader };
var ColumnEditorTemplateLoader = (function () {
    function ColumnEditorTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnEditorTemplateLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    ColumnEditorTemplateLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return ColumnEditorTemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnEditorTemplateLoader.prototype, "column", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnEditorTemplateLoader.prototype, "rowData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnEditorTemplateLoader.prototype, "rowIndex", void 0);
ColumnEditorTemplateLoader = __decorate([
    Component({
        selector: 'p-columnEditorTemplateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ColumnEditorTemplateLoader);
export { ColumnEditorTemplateLoader };
var TemplateLoader = (function () {
    function TemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateLoader.prototype.ngOnInit = function () {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    };
    TemplateLoader.prototype.ngOnDestroy = function () {
        if (this.view)
            this.view.destroy();
    };
    return TemplateLoader;
}());
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], TemplateLoader.prototype, "template", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TemplateLoader.prototype, "data", void 0);
TemplateLoader = __decorate([
    Component({
        selector: 'p-templateLoader',
        template: ""
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], TemplateLoader);
export { TemplateLoader };
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader],
        declarations: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.js.map