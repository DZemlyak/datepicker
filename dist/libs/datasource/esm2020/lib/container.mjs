import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDataSource } from './datasource';
import { missingDataSourceInput } from './messages';
import * as i0 from "@angular/core";
import * as i1 from "./overlay";
const _c0 = [[["mat-table"], ["table"], ["", "mat-datasource-content", ""]], [["mat-datasource-empty"]], [["mat-datasource-error"]], [["mat-datasource-loading"]], "*"];
const _c1 = ["mat-table,table,[mat-datasource-content]", "mat-datasource-empty", "mat-datasource-error", "mat-datasource-loading", "*"];
export class DataSourceContainer {
    constructor() {
        this.diameter = 40;
        this.strokeWidth = 5;
    }
    ngAfterContentInit() {
        this._validateSource();
    }
    _validateSource() {
        if (!this.dataSource) {
            throw Error(missingDataSourceInput());
        }
    }
}
DataSourceContainer.ɵfac = function DataSourceContainer_Factory(t) { return new (t || DataSourceContainer)(); };
DataSourceContainer.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataSourceContainer, selectors: [["mat-datasource"]], hostAttrs: [1, "mat-datasource"], inputs: { dataSource: "dataSource", diameter: "diameter", strokeWidth: "strokeWidth" }, ngContentSelectors: _c1, decls: 9, vars: 5, consts: [[1, "mat-datasource-container"], [1, "mat-datasource-output"], [3, "dataSource", "diameter", "strokeWidth"]], template: function DataSourceContainer_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "mat-datasource-overlay", 2);
        i0.ɵɵprojection(4, 1, ["ngProjectAs", "mat-datasource-empty", 5, ["mat-datasource-empty"]]);
        i0.ɵɵprojection(5, 2, ["ngProjectAs", "mat-datasource-error", 5, ["mat-datasource-error"]]);
        i0.ɵɵprojection(6, 3, ["ngProjectAs", "mat-datasource-loading", 5, ["mat-datasource-loading"]]);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div");
        i0.ɵɵprojection(8, 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("hidden", ctx.dataSource.isLoading || ctx.dataSource.isEmpty ? "" : null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("dataSource", ctx.dataSource)("diameter", ctx.diameter)("strokeWidth", ctx.strokeWidth);
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("hidden", ctx.dataSource.isLoading || ctx.dataSource.isEmpty ? "" : null);
    } }, directives: [i1.DataSourceOverlay], styles: [".mat-datasource-container{position:relative}.mat-datasource-container .mat-datasource-output{display:flex;flex-direction:column}.mat-datasource-container .mat-datasource-output:not(:empty){flex:1}\n", ".mat-datasource-empty,.mat-datasource-error,.mat-datasource-loading{display:block;text-align:center}\n", ".mat-datasource-overlay{display:flex;flex-direction:column;min-height:120px;width:100%;align-items:center;place-content:center}.mat-datasource-overlay>*{margin-bottom:15px}.mat-datasource-overlay>*:last-child{margin-bottom:0}.mat-datasource-overlay:empty{margin-bottom:0;min-height:0}\n"], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceContainer, [{
        type: Component,
        args: [{ selector: 'mat-datasource', host: {
                    class: 'mat-datasource'
                }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-datasource-container\">\r\n  <div class=\"mat-datasource-output\" [attr.hidden]=\"dataSource.isLoading || dataSource.isEmpty ? '' : null\">\r\n    <ng-content select=\"mat-table,table,[mat-datasource-content]\"></ng-content>\r\n  </div>\r\n\r\n  <mat-datasource-overlay [dataSource]=\"dataSource\" [diameter]=\"diameter\" [strokeWidth]=\"strokeWidth\">\r\n    <ng-content select=\"mat-datasource-empty\" ngProjectAs=\"mat-datasource-empty\"></ng-content>\r\n    <ng-content select=\"mat-datasource-error\" ngProjectAs=\"mat-datasource-error\"></ng-content>\r\n    <ng-content select=\"mat-datasource-loading\" ngProjectAs=\"mat-datasource-loading\"></ng-content>\r\n  </mat-datasource-overlay>\r\n</div>\r\n\r\n<div [attr.hidden]=\"dataSource.isLoading || dataSource.isEmpty ? '' : null\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [".mat-datasource-container{position:relative}.mat-datasource-container .mat-datasource-output{display:flex;flex-direction:column}.mat-datasource-container .mat-datasource-output:not(:empty){flex:1}\n", ".mat-datasource-empty,.mat-datasource-error,.mat-datasource-loading{display:block;text-align:center}\n", ".mat-datasource-overlay{display:flex;flex-direction:column;min-height:120px;width:100%;align-items:center;place-content:center}.mat-datasource-overlay>*{margin-bottom:15px}.mat-datasource-overlay>*:last-child{margin-bottom:0}.mat-datasource-overlay:empty{margin-bottom:0;min-height:0}\n"] }]
    }], function () { return []; }, { dataSource: [{
            type: Input
        }], diameter: [{
            type: Input
        }], strokeWidth: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRhc291cmNlL3NyYy9saWIvY29udGFpbmVyLnRzIiwiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRhc291cmNlL3NyYy9saWIvY29udGFpbmVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7QUFZcEQsTUFBTSxPQUFPLG1CQUFtQjtJQU05QjtRQUhTLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxnQkFBVyxHQUFHLENBQUMsQ0FBQztJQUVWLENBQUM7SUFFaEIsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixNQUFNLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOztzRkFoQlUsbUJBQW1CO3NFQUFuQixtQkFBbUI7O1FDcEJoQyw4QkFBc0M7UUFDcEMsOEJBQTBHO1FBQ3hHLGtCQUEyRTtRQUM3RSxpQkFBTTtRQUVOLGlEQUFvRztRQUNsRywyRkFBMEY7UUFDMUYsMkZBQTBGO1FBQzFGLCtGQUE4RjtRQUNoRyxpQkFBeUI7UUFDM0IsaUJBQU07UUFFTiwyQkFBNEU7UUFDMUUscUJBQXlCO1FBQzNCLGlCQUFNOztRQWIrQixlQUFzRTtRQUF0RSx3RkFBc0U7UUFJakYsZUFBeUI7UUFBekIsMkNBQXlCLDBCQUFBLGdDQUFBO1FBTzlDLGVBQXNFO1FBQXRFLHdGQUFzRTs7dUZEUTlELG1CQUFtQjtjQVYvQixTQUFTOzJCQUNFLGdCQUFnQixRQUdwQjtvQkFDSixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QixpQkFDYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO3NDQUd0QyxVQUFVO2tCQUFsQixLQUFLO1lBRUcsUUFBUTtrQkFBaEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBtaXNzaW5nRGF0YVNvdXJjZUlucHV0IH0gZnJvbSAnLi9tZXNzYWdlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRhc291cmNlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29udGFpbmVyLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbnRhaW5lci5zY3NzJywgJy4vZGlyZWN0aXZlcy5zY3NzJywgJy4vb3ZlcmxheS5zY3NzJ10sXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdtYXQtZGF0YXNvdXJjZSdcclxuICB9LFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VDb250YWluZXI8UkVRLCBSQVcsIFJFUz4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICBASW5wdXQoKSBkYXRhU291cmNlOiBNYXREYXRhU291cmNlPFJFUSwgUkFXLCBSRVM+O1xyXG5cclxuICBASW5wdXQoKSBkaWFtZXRlciA9IDQwO1xyXG4gIEBJbnB1dCgpIHN0cm9rZVdpZHRoID0gNTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl92YWxpZGF0ZVNvdXJjZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdmFsaWRhdGVTb3VyY2UoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihtaXNzaW5nRGF0YVNvdXJjZUlucHV0KCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibWF0LWRhdGFzb3VyY2UtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1hdC1kYXRhc291cmNlLW91dHB1dFwiIFthdHRyLmhpZGRlbl09XCJkYXRhU291cmNlLmlzTG9hZGluZyB8fCBkYXRhU291cmNlLmlzRW1wdHkgPyAnJyA6IG51bGxcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC10YWJsZSx0YWJsZSxbbWF0LWRhdGFzb3VyY2UtY29udGVudF1cIj48L25nLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxtYXQtZGF0YXNvdXJjZS1vdmVybGF5IFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBbZGlhbWV0ZXJdPVwiZGlhbWV0ZXJcIiBbc3Ryb2tlV2lkdGhdPVwic3Ryb2tlV2lkdGhcIj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1kYXRhc291cmNlLWVtcHR5XCIgbmdQcm9qZWN0QXM9XCJtYXQtZGF0YXNvdXJjZS1lbXB0eVwiPjwvbmctY29udGVudD5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1kYXRhc291cmNlLWVycm9yXCIgbmdQcm9qZWN0QXM9XCJtYXQtZGF0YXNvdXJjZS1lcnJvclwiPjwvbmctY29udGVudD5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1kYXRhc291cmNlLWxvYWRpbmdcIiBuZ1Byb2plY3RBcz1cIm1hdC1kYXRhc291cmNlLWxvYWRpbmdcIj48L25nLWNvbnRlbnQ+XHJcbiAgPC9tYXQtZGF0YXNvdXJjZS1vdmVybGF5PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgW2F0dHIuaGlkZGVuXT1cImRhdGFTb3VyY2UuaXNMb2FkaW5nIHx8IGRhdGFTb3VyY2UuaXNFbXB0eSA/ICcnIDogbnVsbFwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcbiJdfQ==