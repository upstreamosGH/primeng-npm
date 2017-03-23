var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Draggable = (function () {
    function Draggable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag()) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
    };
    Draggable.prototype.mouseover = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseleave = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    return Draggable;
}());
__decorate([
    Input('pDraggable'),
    __metadata("design:type", String)
], Draggable.prototype, "scope", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Draggable.prototype, "dragEffect", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Draggable.prototype, "dragHandle", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Draggable.prototype, "onDragStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Draggable.prototype, "onDragEnd", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Draggable.prototype, "onDrag", void 0);
__decorate([
    HostListener('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Draggable.prototype, "dragStart", null);
__decorate([
    HostListener('drag', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Draggable.prototype, "drag", null);
__decorate([
    HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Draggable.prototype, "dragEnd", null);
__decorate([
    HostListener('mouseover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Draggable.prototype, "mouseover", null);
__decorate([
    HostListener('mouseleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Draggable.prototype, "mouseleave", null);
Draggable = __decorate([
    Directive({
        selector: '[pDraggable]',
        host: {
            '[draggable]': 'true'
        },
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler])
], Draggable);
export { Draggable };
var Droppable = (function () {
    function Droppable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onDragOver = new EventEmitter();
    }
    Droppable.prototype.drop = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.dragOver = function (event) {
        event.preventDefault();
        this.onDragOver.emit(event);
    };
    Droppable.prototype.allowDrop = function (event) {
        var dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (var j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Droppable;
}());
__decorate([
    Input('pDroppable'),
    __metadata("design:type", Object)
], Droppable.prototype, "scope", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Droppable.prototype, "dropEffect", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Droppable.prototype, "onDragEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Droppable.prototype, "onDragLeave", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Droppable.prototype, "onDrop", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Droppable.prototype, "onDragOver", void 0);
__decorate([
    HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Droppable.prototype, "drop", null);
__decorate([
    HostListener('dragenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Droppable.prototype, "dragEnter", null);
__decorate([
    HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Droppable.prototype, "dragLeave", null);
__decorate([
    HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Droppable.prototype, "dragOver", null);
Droppable = __decorate([
    Directive({
        selector: '[pDroppable]',
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler])
], Droppable);
export { Droppable };
var DragDropModule = (function () {
    function DragDropModule() {
    }
    return DragDropModule;
}());
DragDropModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Draggable, Droppable],
        declarations: [Draggable, Droppable]
    })
], DragDropModule);
export { DragDropModule };
//# sourceMappingURL=dragdrop.js.map