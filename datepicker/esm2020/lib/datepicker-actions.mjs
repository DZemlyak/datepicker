/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatDatepickerBase } from './datepicker-base';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-base";
function MatDatepickerActions_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵprojection(1);
    i0.ɵɵelementEnd();
} }
const _c0 = ["*"];
/** Button that will close the datepicker and assign the current selection to the data model. */
export class MatDatepickerApply {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
    _applySelection() {
        this._datepicker._applyPendingSelection();
        this._datepicker.close();
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerApply.ɵfac = function MatDatepickerApply_Factory(t) { return new (t || MatDatepickerApply)(i0.ɵɵdirectiveInject(i1.MatDatepickerBase)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerApply.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDatepickerApply, selectors: [["", "matDatepickerApply", ""], ["", "matDateRangePickerApply", ""]], hostBindings: function MatDatepickerApply_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function MatDatepickerApply_click_HostBindingHandler() { return ctx._applySelection(); });
    } } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerApply, [{
        type: Directive,
        args: [{
                selector: '[matDatepickerApply], [matDateRangePickerApply]',
                host: { '(click)': '_applySelection()' },
            }]
    }], function () { return [{ type: i1.MatDatepickerBase }]; }, null); })();
/** Button that will close the datepicker and discard the current selection. */
export class MatDatepickerCancel {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerCancel.ɵfac = function MatDatepickerCancel_Factory(t) { return new (t || MatDatepickerCancel)(i0.ɵɵdirectiveInject(i1.MatDatepickerBase)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerCancel.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDatepickerCancel, selectors: [["", "matDatepickerCancel", ""], ["", "matDateRangePickerCancel", ""]], hostBindings: function MatDatepickerCancel_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function MatDatepickerCancel_click_HostBindingHandler() { return ctx._datepicker.close(); });
    } } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerCancel, [{
        type: Directive,
        args: [{
                selector: '[matDatepickerCancel], [matDateRangePickerCancel]',
                host: { '(click)': '_datepicker.close()' },
            }]
    }], function () { return [{ type: i1.MatDatepickerBase }]; }, null); })();
/**
 * Container that can be used to project a row of action buttons
 * to the bottom of a datepicker or date range picker.
 */
export class MatDatepickerActions {
    constructor(_datepicker, _viewContainerRef) {
        this._datepicker = _datepicker;
        this._viewContainerRef = _viewContainerRef;
    }
    ngAfterViewInit() {
        this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        this._datepicker.registerActions(this._portal);
    }
    ngOnDestroy() {
        this._datepicker.removeActions(this._portal);
        // Needs to be null checked since we initialize it in `ngAfterViewInit`.
        if (this._portal && this._portal.isAttached) {
            this._portal?.detach();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerActions.ɵfac = function MatDatepickerActions_Factory(t) { return new (t || MatDatepickerActions)(i0.ɵɵdirectiveInject(i1.MatDatepickerBase), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerActions.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatDatepickerActions, selectors: [["mat-datepicker-actions"], ["mat-date-range-picker-actions"]], viewQuery: function MatDatepickerActions_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(TemplateRef, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._template = _t.first);
    } }, ngContentSelectors: _c0, decls: 1, vars: 0, consts: [[1, "mat-datepicker-actions"]], template: function MatDatepickerActions_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, MatDatepickerActions_ng_template_0_Template, 2, 0, "ng-template");
    } }, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:0;margin-right:8px}\n"], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerActions, [{
        type: Component,
        args: [{ selector: 'mat-datepicker-actions, mat-date-range-picker-actions', template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:0;margin-right:8px}\n"] }]
    }], function () { return [{ type: i1.MatDatepickerBase }, { type: i0.ViewContainerRef }]; }, { _template: [{
            type: ViewChild,
            args: [TemplateRef]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxtQkFBbUIsQ0FBQzs7OztJQWtDcEUsOEJBQW9DO0lBQ2xDLGtCQUF5QjtJQUMzQixpQkFBTTs7O0FBbENaLGdHQUFnRztBQUtoRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFdBQXNFO1FBQXRFLGdCQUFXLEdBQVgsV0FBVyxDQUEyRDtJQUFHLENBQUM7SUFFOUYsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7OzBIQU5VLGtCQUFrQjt1SEFBbEIsa0JBQWtCOytGQUFsQixxQkFBaUI7O3VGQUFqQixrQkFBa0I7Y0FKOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpREFBaUQ7Z0JBQzNELElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBQzthQUN2Qzs7QUFVRCwrRUFBK0U7QUFLL0UsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFtQixXQUFzRTtRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBMkQ7SUFBRyxDQUFDOzs0SEFEbEYsbUJBQW1CO3dIQUFuQixtQkFBbUI7Z0dBQW5CLHVCQUFtQjs7dUZBQW5CLG1CQUFtQjtjQUovQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1EQUFtRDtnQkFDN0QsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO2FBQ3pDOztBQUtEOzs7R0FHRztBQWNILE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFDVSxXQUFzRSxFQUN0RSxpQkFBbUM7UUFEbkMsZ0JBQVcsR0FBWCxXQUFXLENBQTJEO1FBQ3RFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLHdFQUF3RTtRQUN4RSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7OzhIQXJCVSxvQkFBb0I7eUhBQXBCLG9CQUFvQjt1QkFDcEIsV0FBVzs7Ozs7O1FBVnBCLGtGQUljOzt1RkFLTCxvQkFBb0I7Y0FiaEMsU0FBUzsyQkFDRSx1REFBdUQsWUFFdkQ7Ozs7OztHQU1ULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJO21HQUdiLFNBQVM7a0JBQWhDLFNBQVM7bUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBEaXJlY3RpdmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1RlbXBsYXRlUG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyQmFzZSwgTWF0RGF0ZXBpY2tlckNvbnRyb2x9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuXHJcbi8qKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBkYXRlcGlja2VyIGFuZCBhc3NpZ24gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIHRvIHRoZSBkYXRhIG1vZGVsLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttYXREYXRlcGlja2VyQXBwbHldLCBbbWF0RGF0ZVJhbmdlUGlja2VyQXBwbHldJyxcclxuICBob3N0OiB7JyhjbGljayknOiAnX2FwcGx5U2VsZWN0aW9uKCknfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJBcHBseSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlckJhc2U8TWF0RGF0ZXBpY2tlckNvbnRyb2w8dW5rbm93bj4sIHVua25vd24+KSB7fVxyXG5cclxuICBfYXBwbHlTZWxlY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9kYXRlcGlja2VyLl9hcHBseVBlbmRpbmdTZWxlY3Rpb24oKTtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXIuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBkYXRlcGlja2VyIGFuZCBkaXNjYXJkIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWF0RGF0ZXBpY2tlckNhbmNlbF0sIFttYXREYXRlUmFuZ2VQaWNrZXJDYW5jZWxdJyxcclxuICBob3N0OiB7JyhjbGljayknOiAnX2RhdGVwaWNrZXIuY2xvc2UoKSd9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckNhbmNlbCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIF9kYXRlcGlja2VyOiBNYXREYXRlcGlja2VyQmFzZTxNYXREYXRlcGlja2VyQ29udHJvbDx1bmtub3duPiwgdW5rbm93bj4pIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9qZWN0IGEgcm93IG9mIGFjdGlvbiBidXR0b25zXHJcbiAqIHRvIHRoZSBib3R0b20gb2YgYSBkYXRlcGlja2VyIG9yIGRhdGUgcmFuZ2UgcGlja2VyLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtZGF0ZXBpY2tlci1hY3Rpb25zLCBtYXQtZGF0ZS1yYW5nZS1waWNrZXItYWN0aW9ucycsXHJcbiAgc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItYWN0aW9ucy5zY3NzJ10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZT5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1hdC1kYXRlcGlja2VyLWFjdGlvbnNcIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyQWN0aW9ucyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjx1bmtub3duPjtcclxuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXJCYXNlPE1hdERhdGVwaWNrZXJDb250cm9sPHVua25vd24+LCB1bmtub3duPixcclxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl9wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5fdGVtcGxhdGUsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xyXG4gICAgdGhpcy5fZGF0ZXBpY2tlci5yZWdpc3RlckFjdGlvbnModGhpcy5fcG9ydGFsKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGF0ZXBpY2tlci5yZW1vdmVBY3Rpb25zKHRoaXMuX3BvcnRhbCk7XHJcblxyXG4gICAgLy8gTmVlZHMgdG8gYmUgbnVsbCBjaGVja2VkIHNpbmNlIHdlIGluaXRpYWxpemUgaXQgaW4gYG5nQWZ0ZXJWaWV3SW5pdGAuXHJcbiAgICBpZiAodGhpcy5fcG9ydGFsICYmIHRoaXMuX3BvcnRhbC5pc0F0dGFjaGVkKSB7XHJcbiAgICAgIHRoaXMuX3BvcnRhbD8uZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==