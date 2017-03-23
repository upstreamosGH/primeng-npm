var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from '../button/button';
import { MessagesModule } from '../messages/messages';
import { ProgressBarModule } from '../progressbar/progressbar';
import { PrimeTemplate, SharedModule } from '../common/shared';
var FileUpload = (function () {
    function FileUpload(sanitizer) {
        this.sanitizer = sanitizer;
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.onBeforeUpload = new EventEmitter();
        this.onBeforeSend = new EventEmitter();
        this.onUpload = new EventEmitter();
        this.onError = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.progress = 0;
    }
    FileUpload.prototype.ngOnInit = function () {
        this.files = [];
    };
    FileUpload.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'file':
                    _this.fileTemplate = item.template;
                    break;
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    _this.toolbarTemplate = item.template;
                    break;
                default:
                    _this.fileTemplate = item.template;
                    break;
            }
        });
    };
    FileUpload.prototype.onChooseClick = function (event, fileInput) {
        fileInput.value = null;
        fileInput.click();
    };
    FileUpload.prototype.onFileSelect = function (event) {
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                }
                this.files.push(files[i]);
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files });
        if (this.hasFiles() && this.auto) {
            this.upload();
        }
    };
    FileUpload.prototype.validate = function (file) {
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    };
    FileUpload.prototype.isImage = function (file) {
        return /^image\//.test(file.type);
    };
    FileUpload.prototype.onImageLoad = function (img) {
        window.URL.revokeObjectURL(img.src);
    };
    FileUpload.prototype.upload = function () {
        var _this = this;
        this.msgs = [];
        var xhr = new XMLHttpRequest(), formData = new FormData();
        this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData
        });
        for (var i = 0; i < this.files.length; i++) {
            formData.append(this.name, this.files[i], this.files[i].name);
        }
        xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                _this.progress = Math.round((e.loaded * 100) / e.total);
            }
        }, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                _this.progress = 0;
                if (xhr.status >= 200 && xhr.status < 300)
                    _this.onUpload.emit({ xhr: xhr, files: _this.files });
                else
                    _this.onError.emit({ xhr: xhr, files: _this.files });
                _this.clear();
            }
        };
        xhr.open('POST', this.url, true);
        this.onBeforeSend.emit({
            'xhr': xhr,
            'formData': formData
        });
        xhr.send(formData);
    };
    FileUpload.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
    };
    FileUpload.prototype.remove = function (index) {
        this.files.splice(index, 1);
    };
    FileUpload.prototype.hasFiles = function () {
        return this.files && this.files.length > 0;
    };
    FileUpload.prototype.onDragEnter = function (e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragOver = function (e) {
        if (!this.disabled) {
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragLeave = function (e) {
        if (!this.disabled) {
            this.dragHighlight = false;
        }
    };
    FileUpload.prototype.onDrop = function (e) {
        if (!this.disabled) {
            this.dragHighlight = false;
            e.stopPropagation();
            e.preventDefault();
            this.onFileSelect(e);
        }
    };
    FileUpload.prototype.formatSize = function (bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    return FileUpload;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "url", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "accept", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "auto", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], FileUpload.prototype, "maxFileSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileSizeMessageSummary", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileSizeMessageDetail", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "style", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "styleClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], FileUpload.prototype, "previewWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "chooseLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "uploadLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "cancelLabel", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onBeforeUpload", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onBeforeSend", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onUpload", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onError", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onClear", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], FileUpload.prototype, "onSelect", void 0);
__decorate([
    ContentChildren(PrimeTemplate),
    __metadata("design:type", QueryList)
], FileUpload.prototype, "templates", void 0);
FileUpload = __decorate([
    Component({
        selector: 'p-fileUpload',
        template: "\n        <div [ngClass]=\"'ui-fileupload ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-fileupload-buttonbar ui-widget-header ui-corner-top\">\n                <button type=\"button\" [label]=\"chooseLabel\" icon=\"fa-plus\" pButton class=\"ui-fileupload-choose\" (click)=\"onChooseClick($event, fileinput)\" [disabled]=\"disabled\"> \n                    <input #fileinput type=\"file\" (change)=\"onFileSelect($event)\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\">\n                </button>\n\n                <button *ngIf=\"!auto\" type=\"button\" [label]=\"uploadLabel\" icon=\"fa-upload\" pButton (click)=\"upload()\" [disabled]=\"!hasFiles()\"></button>\n                <button *ngIf=\"!auto\" type=\"button\" [label]=\"cancelLabel\" icon=\"fa-close\" pButton (click)=\"clear()\" [disabled]=\"!hasFiles()\"></button>\n            \n                <p-templateLoader [template]=\"toolbarTemplate\"></p-templateLoader>\n            </div>\n            <div [ngClass]=\"{'ui-fileupload-content ui-widget-content ui-corner-bottom':true,'ui-fileupload-highlight':dragHighlight}\" \n                (dragenter)=\"onDragEnter($event)\" (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n                <p-progressBar [value]=\"progress\" [showValue]=\"false\" *ngIf=\"hasFiles()\"></p-progressBar>\n                \n                <p-messages [value]=\"msgs\"></p-messages>\n                \n                <div class=\"ui-fileupload-files\" *ngIf=\"hasFiles()\">\n                    <div *ngIf=\"!fileTemplate\">\n                        <div class=\"ui-fileupload-row\" *ngFor=\"let file of files; let i = index;\">\n                            <div><img [src]=\"file.objectURL\" *ngIf=\"isImage(file)\" [width]=\"previewWidth\" /></div>\n                            <div>{{file.name}}</div>\n                            <div>{{formatSize(file.size)}}</div>\n                            <div><button type=\"button\" icon=\"fa-close\" pButton (click)=\"remove(i)\"></button></div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"fileTemplate\">\n                        <template ngFor [ngForOf]=\"files\" [ngForTemplate]=\"fileTemplate\"></template>\n                    </div>\n                </div>\n                \n                <p-templateLoader [template]=\"contentTemplate\"></p-templateLoader>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [DomSanitizer])
], FileUpload);
export { FileUpload };
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
        exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
        declarations: [FileUpload]
    })
], FileUploadModule);
export { FileUploadModule };
//# sourceMappingURL=fileupload.js.map