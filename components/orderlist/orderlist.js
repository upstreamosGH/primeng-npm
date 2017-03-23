var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, ContentChildren, QueryList, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
var OrderList = (function () {
    function OrderList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.metaKeySelection = true;
        this.onReorder = new EventEmitter();
    }
    OrderList.prototype.ngAfterViewInit = function () {
        this.listContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-orderlist-list');
    };
    OrderList.prototype.ngAfterContentInit = function () {
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
    OrderList.prototype.ngAfterViewChecked = function () {
        if (this.movedUp || this.movedDown) {
            var listItems = this.domHandler.find(this.listContainer, 'li.ui-state-highlight');
            var listItem = void 0;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            this.domHandler.scrollInView(this.listContainer, listItem);
            this.movedUp = false;
            this.movedDown = false;
        }
    };
    OrderList.prototype.onItemClick = function (event, item) {
        var index = this.findIndexInList(item, this.selectedItems);
        var selected = (index != -1);
        var metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected && metaKey) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = (metaKey) ? this.selectedItems || [] : [];
                this.selectedItems.push(item);
            }
        }
        else {
            if (selected) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems = this.selectedItems || [];
                this.selectedItems.push(item);
            }
        }
        this.itemTouched = false;
    };
    OrderList.prototype.onItemTouchEnd = function (event) {
        this.itemTouched = true;
    };
    OrderList.prototype.isSelected = function (item) {
        return this.findIndexInList(item, this.selectedItems) != -1;
    };
    OrderList.prototype.findIndexInList = function (item, list) {
        var index = -1;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    OrderList.prototype.moveUp = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = 0; i < this.selectedItems.length; i++) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex - 1];
                    this.value[selectedItemIndex - 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveTop = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = 0; i < this.selectedItems.length; i++) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                    listElement.scrollTop = 0;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            listElement.scrollTop = 0;
        }
    };
    OrderList.prototype.moveDown = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = this.selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex + 1];
                    this.value[selectedItemIndex + 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveBottom = function (event, listElement) {
        if (this.selectedItems) {
            for (var i = this.selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = this.selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            listElement.scrollTop = listElement.scrollHeight;
        }
    };
    return OrderList;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], OrderList.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], OrderList.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], OrderList.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], OrderList.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], OrderList.prototype, "listStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], OrderList.prototype, "responsive", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], OrderList.prototype, "metaKeySelection", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], OrderList.prototype, "onReorder", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], OrderList.prototype, "templates", void 0);
OrderList = __decorate([
    Component({
        selector: 'p-orderList',
        template: "\n        <div [ngClass]=\"{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-orderlist-controls ui-grid-col-2\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom($event,listelement)\"></button>\n                </div>\n                <div class=\"ui-grid-col-10\">\n                    <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                    <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\">\n                        <li *ngFor=\"let item of value\" class=\"ui-orderlist-item\"\n                            [ngClass]=\"{'ui-state-highlight':isSelected(item)}\" \n                            (click)=\"onItemClick($event,item)\" (touchend)=\"onItemTouchEnd($event)\">\n                            <template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></template>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler])
], OrderList);
export { OrderList };
var OrderListModule = (function () {
    function OrderListModule() {
    }
    return OrderListModule;
}());
OrderListModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule, SharedModule],
        exports: [OrderList, SharedModule],
        declarations: [OrderList]
    })
], OrderListModule);
export { OrderListModule };
//# sourceMappingURL=orderlist.js.map