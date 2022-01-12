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
/** @nocollapse */ /** @nocollapse */ MatDatepickerApply.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerApply, deps: [{ token: i1.MatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatDatepickerApply.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepickerApply, selector: "[matDatepickerApply], [matDateRangePickerApply]", host: { listeners: { "click": "_applySelection()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerApply, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerApply], [matDateRangePickerApply]',
                    host: { '(click)': '_applySelection()' },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }]; } });
/** Button that will close the datepicker and discard the current selection. */
export class MatDatepickerCancel {
    constructor(_datepicker) {
        this._datepicker = _datepicker;
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerCancel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerCancel, deps: [{ token: i1.MatDatepickerBase }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatDatepickerCancel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepickerCancel, selector: "[matDatepickerCancel], [matDateRangePickerCancel]", host: { listeners: { "click": "_datepicker.close()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerCancel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerCancel], [matDateRangePickerCancel]',
                    host: { '(click)': '_datepicker.close()' },
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }]; } });
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
/** @nocollapse */ /** @nocollapse */ MatDatepickerActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerActions, deps: [{ token: i1.MatDatepickerBase }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatDatepickerActions.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepickerActions, selector: "mat-datepicker-actions, mat-date-range-picker-actions", viewQueries: [{ propertyName: "_template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, isInline: true, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerActions, decorators: [{
            type: Component,
            args: [{ selector: 'mat-datepicker-actions, mat-date-range-picker-actions', template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mat-datepicker-actions{display:flex;justify-content:flex-end;align-items:center;padding:0 8px 8px}.mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:8px}[dir=rtl] .mat-datepicker-actions .mat-button-base+.mat-button-base{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerBase }, { type: i0.ViewContainerRef }]; }, propDecorators: { _template: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBRTFFLGdHQUFnRztBQUtoRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFdBQXNFO1FBQXRFLGdCQUFXLEdBQVgsV0FBVyxDQUEyRDtJQUFHLENBQUM7SUFFOUYsZUFBZTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7O3FKQU5VLGtCQUFrQjt5SUFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlEQUFpRDtvQkFDM0QsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFDO2lCQUN2Qzs7QUFVRCwrRUFBK0U7QUFLL0UsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFtQixXQUFzRTtRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBMkQ7SUFBRyxDQUFDOztzSkFEbEYsbUJBQW1COzBJQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFKL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbURBQW1EO29CQUM3RCxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUM7aUJBQ3pDOztBQUtEOzs7R0FHRztBQWNILE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFDVSxXQUFzRSxFQUN0RSxpQkFBbUM7UUFEbkMsZ0JBQVcsR0FBWCxXQUFXLENBQTJEO1FBQ3RFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLHdFQUF3RTtRQUN4RSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7O3VKQXJCVSxvQkFBb0I7MklBQXBCLG9CQUFvQix3SUFDcEIsV0FBVyxnREFYWjs7Ozs7O0dBTVQ7MkZBSVUsb0JBQW9CO2tCQWJoQyxTQUFTOytCQUNFLHVEQUF1RCxZQUV2RDs7Ozs7O0dBTVQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7dUlBR2IsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIERpcmVjdGl2ZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7VGVtcGxhdGVQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJCYXNlLCBNYXREYXRlcGlja2VyQ29udHJvbH0gZnJvbSAnLi9kYXRlcGlja2VyLWJhc2UnO1xyXG5cclxuLyoqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGRhdGVwaWNrZXIgYW5kIGFzc2lnbiB0aGUgY3VycmVudCBzZWxlY3Rpb24gdG8gdGhlIGRhdGEgbW9kZWwuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21hdERhdGVwaWNrZXJBcHBseV0sIFttYXREYXRlUmFuZ2VQaWNrZXJBcHBseV0nLFxyXG4gIGhvc3Q6IHsnKGNsaWNrKSc6ICdfYXBwbHlTZWxlY3Rpb24oKSd9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckFwcGx5IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRlcGlja2VyOiBNYXREYXRlcGlja2VyQmFzZTxNYXREYXRlcGlja2VyQ29udHJvbDx1bmtub3duPiwgdW5rbm93bj4pIHt9XHJcblxyXG4gIF9hcHBseVNlbGVjdGlvbigpIHtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXIuX2FwcGx5UGVuZGluZ1NlbGVjdGlvbigpO1xyXG4gICAgdGhpcy5fZGF0ZXBpY2tlci5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGRhdGVwaWNrZXIgYW5kIGRpc2NhcmQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttYXREYXRlcGlja2VyQ2FuY2VsXSwgW21hdERhdGVSYW5nZVBpY2tlckNhbmNlbF0nLFxyXG4gIGhvc3Q6IHsnKGNsaWNrKSc6ICdfZGF0ZXBpY2tlci5jbG9zZSgpJ30sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyQ2FuY2VsIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2RhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXJCYXNlPE1hdERhdGVwaWNrZXJDb250cm9sPHVua25vd24+LCB1bmtub3duPikge31cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2plY3QgYSByb3cgb2YgYWN0aW9uIGJ1dHRvbnNcclxuICogdG8gdGhlIGJvdHRvbSBvZiBhIGRhdGVwaWNrZXIgb3IgZGF0ZSByYW5nZSBwaWNrZXIuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyLWFjdGlvbnMsIG1hdC1kYXRlLXJhbmdlLXBpY2tlci1hY3Rpb25zJyxcclxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci1hY3Rpb25zLnNjc3MnXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LWRhdGVwaWNrZXItYWN0aW9uc1wiPlxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJBY3Rpb25zIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPHVua25vd24+O1xyXG4gIHByaXZhdGUgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlckJhc2U8TWF0RGF0ZXBpY2tlckNvbnRyb2w8dW5rbm93bj4sIHVua25vd24+LFxyXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICApIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX3BvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl90ZW1wbGF0ZSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XHJcbiAgICB0aGlzLl9kYXRlcGlja2VyLnJlZ2lzdGVyQWN0aW9ucyh0aGlzLl9wb3J0YWwpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kYXRlcGlja2VyLnJlbW92ZUFjdGlvbnModGhpcy5fcG9ydGFsKTtcclxuXHJcbiAgICAvLyBOZWVkcyB0byBiZSBudWxsIGNoZWNrZWQgc2luY2Ugd2UgaW5pdGlhbGl6ZSBpdCBpbiBgbmdBZnRlclZpZXdJbml0YC5cclxuICAgIGlmICh0aGlzLl9wb3J0YWwgJiYgdGhpcy5fcG9ydGFsLmlzQXR0YWNoZWQpIHtcclxuICAgICAgdGhpcy5fcG9ydGFsPy5kZXRhY2goKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19