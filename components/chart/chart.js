var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
var UIChart = (function () {
    function UIChart(el, differs) {
        this.el = el;
        this.onDataSelect = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    UIChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    UIChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    UIChart.prototype.initChart = function () {
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options
        });
    };
    UIChart.prototype.getCanvas = function () {
        return this.el.nativeElement.children[0].children[0];
    };
    UIChart.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    UIChart.prototype.refresh = function () {
        if (this.chart) {
            this.chart.update();
        }
    };
    UIChart.prototype.reinit = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    UIChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    return UIChart;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], UIChart.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], UIChart.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], UIChart.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], UIChart.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], UIChart.prototype, "height", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], UIChart.prototype, "onDataSelect", void 0);
UIChart = __decorate([
    Component({
        selector: 'p-chart',
        template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [ElementRef, IterableDiffers])
], UIChart);
export { UIChart };
var ChartModule = (function () {
    function ChartModule() {
    }
    return ChartModule;
}());
ChartModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIChart],
        declarations: [UIChart]
    })
], ChartModule);
export { ChartModule };
//# sourceMappingURL=chart.js.map