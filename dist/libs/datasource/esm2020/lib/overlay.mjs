import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDataSource } from './datasource';
import { missingDataSourceInput } from './messages';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/progress-spinner";
import * as i3 from "./directives";
function DataSourceOverlay_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DataSourceOverlay_ng_template_1_ng_container_4_mat_datasource_loading_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-datasource-loading");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_1_ng_container_4_mat_datasource_loading_1_Template, 2, 1, "mat-datasource-loading", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-spinner", 3);
    i0.ɵɵelementStart(1, "div", null, 4);
    i0.ɵɵprojection(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, DataSourceOverlay_ng_template_1_ng_container_4_Template, 2, 1, "ng-container", 5);
} if (rf & 2) {
    const _r5 = i0.ɵɵreference(2);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("mode", ctx_r2.dataSource.progressMode)("value", ctx_r2.dataSource.progress)("diameter", ctx_r2.diameter)("strokeWidth", ctx_r2.strokeWidth);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !_r5.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_mat_datasource_error_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-datasource-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r16 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(error_r16.value);
} }
function DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_mat_datasource_error_1_Template, 2, 1, "mat-datasource-error", 10);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 1, ctx_r14.dataSource.getErrors));
} }
function DataSourceOverlay_ng_template_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 9);
    i0.ɵɵprojection(2, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_Template, 3, 3, "ng-container", 5);
} if (rf & 2) {
    const _r13 = i0.ɵɵreference(1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !_r13.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_ng_template_3_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-datasource-empty");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r18.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_3_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 11);
    i0.ɵɵprojection(2, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_3_ng_container_3_Template, 3, 1, "ng-container", 5);
} if (rf & 2) {
    const _r17 = i0.ɵɵreference(1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !_r17.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DataSourceOverlay_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_3_ng_template_1_Template, 4, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_3_Template, 4, 1, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r9 = i0.ɵɵreference(2);
    const _r11 = i0.ɵɵreference(4);
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r4.dataSource.hasErrors)("ngIfThen", _r9)("ngIfElse", _r11);
} }
const _c0 = [[["mat-datasource-loading"]], [["mat-datasource-error"]], [["mat-datasource-empty"]]];
const _c1 = ["mat-datasource-loading", "mat-datasource-error", "mat-datasource-empty"];
export class DataSourceOverlay {
    constructor(cdr) {
        this.cdr = cdr;
        this.onDestroy = new Subject();
    }
    ngAfterContentInit() {
        this._validateSource();
        // listen source changes
        this.dataSource.change$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this._display =
                this.dataSource.isLoading ||
                    this.dataSource.hasErrors ||
                    this.dataSource.isEmpty
                    ? 'flex'
                    : 'none';
            this.cdr.markForCheck();
        });
    }
    _validateSource() {
        if (!this.dataSource) {
            throw Error(missingDataSourceInput());
        }
    }
    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
DataSourceOverlay.ɵfac = function DataSourceOverlay_Factory(t) { return new (t || DataSourceOverlay)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
DataSourceOverlay.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataSourceOverlay, selectors: [["mat-datasource-overlay"]], hostAttrs: [1, "mat-datasource-overlay"], hostVars: 2, hostBindings: function DataSourceOverlay_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("display", ctx._display);
    } }, inputs: { dataSource: "dataSource", diameter: "diameter", strokeWidth: "strokeWidth" }, ngContentSelectors: _c1, decls: 5, vars: 3, consts: [[4, "ngIf", "ngIfThen", "ngIfElse"], ["loading", ""], ["loaded", ""], [3, "mode", "value", "diameter", "strokeWidth"], ["out", ""], [4, "ngIf"], ["errors", ""], ["empty", ""], [1, "mat-datasource-overlay"], ["err", ""], [4, "ngFor", "ngForOf"], ["emp", ""]], template: function DataSourceOverlay_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵtemplate(0, DataSourceOverlay_ng_container_0_Template, 1, 0, "ng-container", 0);
        i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_1_Template, 5, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_Template, 5, 3, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        const _r3 = i0.ɵɵreference(4);
        i0.ɵɵproperty("ngIf", ctx.dataSource.isLoading)("ngIfThen", _r1)("ngIfElse", _r3);
    } }, directives: [i1.NgIf, i2.MatProgressSpinner, i3.DataSourceLoading, i1.NgForOf, i3.DataSourceError, i3.DataSourceEmpty], pipes: [i1.KeyValuePipe], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceOverlay, [{
        type: Component,
        args: [{ selector: 'mat-datasource-overlay', host: {
                    class: 'mat-datasource-overlay'
                }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"dataSource.isLoading then loading; else loaded\"></ng-container>\r\n\r\n<ng-template #loading>\r\n  <mat-progress-spinner\r\n    [mode]=\"dataSource.progressMode\"\r\n    [value]=\"dataSource.progress\"\r\n    [diameter]=\"diameter\"\r\n    [strokeWidth]=\"strokeWidth\"\r\n  ></mat-progress-spinner>\r\n\r\n  <div #out>\r\n    <ng-content select=\"mat-datasource-loading\"></ng-content>\r\n  </div>\r\n  <ng-container *ngIf=\"!out.childNodes.length\">\r\n    <mat-datasource-loading *ngIf=\"dataSource.outputMsg\">{{ dataSource.outputMsg }}</mat-datasource-loading>\r\n  </ng-container>\r\n</ng-template>\r\n\r\n<ng-template #loaded>\r\n  <ng-container *ngIf=\"dataSource.hasErrors then errors; else empty\"></ng-container>\r\n\r\n  <ng-template #errors>\r\n    <div class=\"mat-datasource-overlay\" #err>\r\n      <ng-content select=\"mat-datasource-error\"></ng-content>\r\n    </div>\r\n    <ng-container *ngIf=\"!err.childNodes.length\">\r\n      <mat-datasource-error *ngFor=\"let error of dataSource.getErrors | keyvalue\">{{ error.value }}</mat-datasource-error>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #empty>\r\n    <div class=\"mat-datasource-overlay\" #emp>\r\n      <ng-content select=\"mat-datasource-empty\"></ng-content>\r\n    </div>\r\n    <ng-container *ngIf=\"!emp.childNodes.length\">\r\n      <mat-datasource-empty>{{ dataSource.outputMsg }}</mat-datasource-empty>\r\n    </ng-container>\r\n  </ng-template>\r\n</ng-template>\r\n" }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { dataSource: [{
            type: Input
        }], diameter: [{
            type: Input
        }], strokeWidth: [{
            type: Input
        }], _display: [{
            type: HostBinding,
            args: ['style.display']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0YXNvdXJjZS9zcmMvbGliL292ZXJsYXkudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGFzb3VyY2Uvc3JjL2xpYi9vdmVybGF5Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBRUwsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7Ozs7SUNicEQsd0JBQW9GOzs7SUFjaEYsOENBQXFEO0lBQUEsWUFBMEI7SUFBQSxpQkFBeUI7OztJQUFuRCxlQUEwQjtJQUExQixpREFBMEI7OztJQURqRiw2QkFBNkM7SUFDM0MscUlBQXdHO0lBQzFHLDBCQUFlOzs7SUFEWSxlQUEwQjtJQUExQixrREFBMEI7OztJQVhyRCwwQ0FLd0I7SUFFeEIsb0NBQVU7SUFDUixrQkFBeUQ7SUFDM0QsaUJBQU07SUFDTixrR0FFZTs7OztJQVhiLHFEQUFnQyxxQ0FBQSw2QkFBQSxtQ0FBQTtJQVNuQixlQUE0QjtJQUE1Qiw2Q0FBNEI7OztJQU0zQyx3QkFBa0Y7OztJQU85RSw0Q0FBNEU7SUFBQSxZQUFpQjtJQUFBLGlCQUF1Qjs7O0lBQXhDLGVBQWlCO0lBQWpCLHFDQUFpQjs7O0lBRC9GLDZCQUE2QztJQUMzQyxnSkFBb0g7O0lBQ3RILDBCQUFlOzs7SUFEMkIsZUFBa0M7SUFBbEMsNEVBQWtDOzs7SUFKNUUsaUNBQXlDO0lBQ3ZDLHFCQUF1RDtJQUN6RCxpQkFBTTtJQUNOLGdIQUVlOzs7SUFGQSxlQUE0QjtJQUE1Qiw4Q0FBNEI7OztJQVMzQyw2QkFBNkM7SUFDM0MsNENBQXNCO0lBQUEsWUFBMEI7SUFBQSxpQkFBdUI7SUFDekUsMEJBQWU7OztJQURTLGVBQTBCO0lBQTFCLGtEQUEwQjs7O0lBSmxELGtDQUF5QztJQUN2QyxxQkFBdUQ7SUFDekQsaUJBQU07SUFDTixnSEFFZTs7O0lBRkEsZUFBNEI7SUFBNUIsOENBQTRCOzs7SUFmN0Msa0dBQWtGO0lBRWxGLGlJQU9jO0lBRWQsaUlBT2M7Ozs7O0lBbEJDLGtEQUEyQixpQkFBQSxrQkFBQTs7OztBREs1QyxNQUFNLE9BQU8saUJBQWlCO0lBWTVCLFlBQTZCLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBRjNDLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRWMsQ0FBQztJQUV2RCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDckUsSUFBSSxDQUFDLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTO29CQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTztvQkFDckIsQ0FBQyxDQUFDLE1BQU07b0JBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUViLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixNQUFNLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDOztrRkF2Q1UsaUJBQWlCO29FQUFqQixpQkFBaUI7Ozs7UUN4QjlCLG9GQUFvRjtRQUVwRixtSEFjYztRQUVkLG1IQW9CYzs7OztRQXRDQywrQ0FBMkIsaUJBQUEsaUJBQUE7O3VGRHdCN0IsaUJBQWlCO2NBVDdCLFNBQVM7MkJBQ0Usd0JBQXdCLFFBRTVCO29CQUNKLEtBQUssRUFBRSx3QkFBd0I7aUJBQ2hDLGlCQUNjLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07b0VBSXRDLFVBQVU7a0JBQWxCLEtBQUs7WUFFRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUdOLFFBQVE7a0JBRFAsV0FBVzttQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1hdERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBtaXNzaW5nRGF0YVNvdXJjZUlucHV0IH0gZnJvbSAnLi9tZXNzYWdlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRhc291cmNlLW92ZXJsYXknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vdmVybGF5Lmh0bWwnLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbWF0LWRhdGFzb3VyY2Utb3ZlcmxheSdcclxuICB9LFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VPdmVybGF5PFJFUSwgUkFXLCBSRVM+XHJcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IE1hdERhdGFTb3VyY2U8UkVRLCBSQVcsIFJFUz47XHJcblxyXG4gIEBJbnB1dCgpIGRpYW1ldGVyOiBudW1iZXI7XHJcbiAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IG51bWJlcjtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcclxuICBfZGlzcGxheTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIG9uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5fdmFsaWRhdGVTb3VyY2UoKTtcclxuXHJcbiAgICAvLyBsaXN0ZW4gc291cmNlIGNoYW5nZXNcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5jaGFuZ2UkLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5fZGlzcGxheSA9XHJcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmlzTG9hZGluZyB8fFxyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5oYXNFcnJvcnMgfHxcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuaXNFbXB0eVxyXG4gICAgICAgICAgPyAnZmxleCdcclxuICAgICAgICAgIDogJ25vbmUnO1xyXG5cclxuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3ZhbGlkYXRlU291cmNlKCkge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgdGhyb3cgRXJyb3IobWlzc2luZ0RhdGFTb3VyY2VJbnB1dCgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgdGhpcy5vbkRlc3Ryb3kuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGFTb3VyY2UuaXNMb2FkaW5nIHRoZW4gbG9hZGluZzsgZWxzZSBsb2FkZWRcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cclxuICA8bWF0LXByb2dyZXNzLXNwaW5uZXJcclxuICAgIFttb2RlXT1cImRhdGFTb3VyY2UucHJvZ3Jlc3NNb2RlXCJcclxuICAgIFt2YWx1ZV09XCJkYXRhU291cmNlLnByb2dyZXNzXCJcclxuICAgIFtkaWFtZXRlcl09XCJkaWFtZXRlclwiXHJcbiAgICBbc3Ryb2tlV2lkdGhdPVwic3Ryb2tlV2lkdGhcIlxyXG4gID48L21hdC1wcm9ncmVzcy1zcGlubmVyPlxyXG5cclxuICA8ZGl2ICNvdXQ+XHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYXQtZGF0YXNvdXJjZS1sb2FkaW5nXCI+PC9uZy1jb250ZW50PlxyXG4gIDwvZGl2PlxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhb3V0LmNoaWxkTm9kZXMubGVuZ3RoXCI+XHJcbiAgICA8bWF0LWRhdGFzb3VyY2UtbG9hZGluZyAqbmdJZj1cImRhdGFTb3VyY2Uub3V0cHV0TXNnXCI+e3sgZGF0YVNvdXJjZS5vdXRwdXRNc2cgfX08L21hdC1kYXRhc291cmNlLWxvYWRpbmc+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48bmctdGVtcGxhdGUgI2xvYWRlZD5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVNvdXJjZS5oYXNFcnJvcnMgdGhlbiBlcnJvcnM7IGVsc2UgZW1wdHlcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG5nLXRlbXBsYXRlICNlcnJvcnM+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWF0LWRhdGFzb3VyY2Utb3ZlcmxheVwiICNlcnI+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1kYXRhc291cmNlLWVycm9yXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVyci5jaGlsZE5vZGVzLmxlbmd0aFwiPlxyXG4gICAgICA8bWF0LWRhdGFzb3VyY2UtZXJyb3IgKm5nRm9yPVwibGV0IGVycm9yIG9mIGRhdGFTb3VyY2UuZ2V0RXJyb3JzIHwga2V5dmFsdWVcIj57eyBlcnJvci52YWx1ZSB9fTwvbWF0LWRhdGFzb3VyY2UtZXJyb3I+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1hdC1kYXRhc291cmNlLW92ZXJsYXlcIiAjZW1wPlxyXG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYXQtZGF0YXNvdXJjZS1lbXB0eVwiPjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXAuY2hpbGROb2Rlcy5sZW5ndGhcIj5cclxuICAgICAgPG1hdC1kYXRhc291cmNlLWVtcHR5Pnt7IGRhdGFTb3VyY2Uub3V0cHV0TXNnIH19PC9tYXQtZGF0YXNvdXJjZS1lbXB0eT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==