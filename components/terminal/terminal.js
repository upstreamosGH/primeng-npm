var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Terminal = (function () {
    function Terminal(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.responseChange = new EventEmitter();
        this.handler = new EventEmitter();
        this.commands = [];
    }
    Terminal.prototype.ngAfterViewInit = function () {
        this.container = this.domHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    };
    Terminal.prototype.ngAfterViewChecked = function () {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    };
    Object.defineProperty(Terminal.prototype, "response", {
        set: function (value) {
            if (value) {
                this.commands[this.commands.length - 1].response = value;
                this.commandProcessed = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Terminal.prototype.handleCommand = function (event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.handler.emit({ originalEvent: event, command: this.command });
            this.command = '';
        }
    };
    Terminal.prototype.focus = function (element) {
        element.focus();
    };
    return Terminal;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Terminal.prototype, "welcomeMessage", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Terminal.prototype, "prompt", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Terminal.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Terminal.prototype, "styleClass", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Terminal.prototype, "responseChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Terminal.prototype, "handler", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Terminal.prototype, "response", null);
Terminal = __decorate([
    Component({
        selector: 'p-terminal',
        template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ",
        providers: [DomHandler]
    }),
    __metadata("design:paramtypes", [ElementRef, DomHandler])
], Terminal);
export { Terminal };
var TerminalModule = (function () {
    function TerminalModule() {
    }
    return TerminalModule;
}());
TerminalModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule],
        exports: [Terminal],
        declarations: [Terminal]
    })
], TerminalModule);
export { TerminalModule };
//# sourceMappingURL=terminal.js.map