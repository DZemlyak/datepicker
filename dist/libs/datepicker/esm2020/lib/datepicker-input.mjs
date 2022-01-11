/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, forwardRef, Inject, Input, Optional } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { DateAdapter, } from './core';
import { MatDatepickerInputBase } from './datepicker-input-base';
import * as i0 from "@angular/core";
import * as i1 from "./core";
import * as i2 from "@angular/material/form-field";
/** @docs-private */
export const MAT_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatDatepickerInput),
    multi: true,
};
/** @docs-private */
export const MAT_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MatDatepickerInput),
    multi: true,
};
/** Directive used to connect an input to a MatDatepicker. */
export class MatDatepickerInput extends MatDatepickerInputBase {
    constructor(elementRef, dateAdapter, dateFormats, _formField) {
        super(elementRef, dateAdapter, dateFormats);
        this._formField = _formField;
        this._closedSubscription = Subscription.EMPTY;
        this._validator = Validators.compose(super._getValidators());
    }
    /** The datepicker that this input is associated with. */
    set matDatepicker(datepicker) {
        if (datepicker) {
            this._datepicker = datepicker;
            this._closedSubscription = datepicker.closedStream.subscribe(() => this._onTouched());
            this._registerModel(datepicker.registerInput(this));
        }
    }
    /** The minimum valid date. */
    get min() {
        return this._min;
    }
    set min(value) {
        const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        if (!this._dateAdapter.sameDate(validValue, this._min, this.getUnit())) {
            this._min = validValue;
            this._validatorOnChange();
        }
    }
    /** The maximum valid date. */
    get max() {
        return this._max;
    }
    set max(value) {
        const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        if (!this._dateAdapter.sameDate(validValue, this._max, this.getUnit())) {
            this._max = validValue;
            this._validatorOnChange();
        }
    }
    /** Function that can be used to filter out dates within the datepicker. */
    get dateFilter() {
        return this._dateFilter;
    }
    set dateFilter(value) {
        const wasMatchingValue = this._matchesFilter(this.value);
        this._dateFilter = value;
        if (this._matchesFilter(this.value) !== wasMatchingValue) {
            this._validatorOnChange();
        }
    }
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    getConnectedOverlayOrigin() {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    }
    /** Gets the ID of an element that should be used a description for the calendar overlay. */
    getOverlayLabelId() {
        if (this._formField) {
            return this._formField.getLabelId();
        }
        return this._elementRef.nativeElement.getAttribute('aria-labelledby');
    }
    /** Returns the palette used by the input's form field, if any. */
    getThemePalette() {
        return this._formField ? this._formField.color : undefined;
    }
    /** Gets the value at which the calendar should start. */
    getStartValue() {
        return this.value;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._closedSubscription.unsubscribe();
    }
    /** Opens the associated datepicker. */
    _openPopup() {
        if (this._datepicker) {
            this._datepicker.open();
        }
    }
    _getValueFromModel(modelValue) {
        return modelValue;
    }
    _assignValueToModel(value) {
        if (this._model) {
            this._model.updateSelection(value, this);
        }
    }
    /** Gets the input's minimum date. */
    _getMinDate() {
        return this._min;
    }
    /** Gets the input's maximum date. */
    _getMaxDate() {
        return this._max;
    }
    /** Gets the input's date filtering function. */
    _getDateFilter() {
        return this._dateFilter;
    }
    _shouldHandleChangeEvent(event) {
        return event.source !== this;
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerInput.ɵfac = function MatDatepickerInput_Factory(t) { return new (t || MatDatepickerInput)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8), i0.ɵɵdirectiveInject(MAT_FORM_FIELD, 8)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerInput.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDatepickerInput, selectors: [["input", "matDatepicker", ""]], hostAttrs: [1, "mat-datepicker-input"], hostVars: 6, hostBindings: function MatDatepickerInput_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function MatDatepickerInput_input_HostBindingHandler($event) { return ctx._onInput($event.target.value); })("change", function MatDatepickerInput_change_HostBindingHandler() { return ctx._onChange(); })("blur", function MatDatepickerInput_blur_HostBindingHandler() { return ctx._onBlur(); })("keydown", function MatDatepickerInput_keydown_HostBindingHandler($event) { return ctx._onKeydown($event); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("disabled", ctx.disabled);
        i0.ɵɵattribute("aria-haspopup", ctx._datepicker ? "dialog" : null)("aria-owns", (ctx._datepicker == null ? null : ctx._datepicker.opened) && ctx._datepicker.id || null)("min", ctx.min ? ctx._dateAdapter.toIso8601(ctx.min) : null)("max", ctx.max ? ctx._dateAdapter.toIso8601(ctx.max) : null)("data-mat-calendar", ctx._datepicker ? ctx._datepicker.id : null);
    } }, inputs: { matDatepicker: "matDatepicker", min: "min", max: "max", dateFilter: ["matDatepickerFilter", "dateFilter"] }, exportAs: ["matDatepickerInput"], features: [i0.ɵɵProvidersFeature([
            MAT_DATEPICKER_VALUE_ACCESSOR,
            MAT_DATEPICKER_VALIDATORS,
            { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput },
        ]), i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerInput, [{
        type: Directive,
        args: [{
                selector: 'input[matDatepicker]',
                providers: [
                    MAT_DATEPICKER_VALUE_ACCESSOR,
                    MAT_DATEPICKER_VALIDATORS,
                    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput },
                ],
                host: {
                    'class': 'mat-datepicker-input',
                    '[attr.aria-haspopup]': '_datepicker ? "dialog" : null',
                    '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
                    '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
                    '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
                    // Used by the test harness to tie this input to its calendar. We can't depend on
                    // `aria-owns` for this, because it's only defined while the calendar is open.
                    '[attr.data-mat-calendar]': '_datepicker ? _datepicker.id : null',
                    '[disabled]': 'disabled',
                    '(input)': '_onInput($event.target.value)',
                    '(change)': '_onChange()',
                    '(blur)': '_onBlur()',
                    '(keydown)': '_onKeydown($event)',
                },
                exportAs: 'matDatepickerInput',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }, { type: i2.MatFormField, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_FORM_FIELD]
            }] }]; }, { matDatepicker: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], dateFilter: [{
            type: Input,
            args: ['matDatepickerFilter']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXItaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQWUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQ0wsV0FBVyxHQUVaLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxzQkFBc0IsRUFBZ0IsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQUkvRSxvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQVE7SUFDaEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FB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Z0I7O3NCQUNuQyxRQUFROztzQkFBSSxNQUFNO3VCQUFDLGNBQWM7d0JBN0RoQyxhQUFhO2tCQURoQixLQUFLO1lBWUYsR0FBRztrQkFETixLQUFLO1lBZ0JGLEdBQUc7a0JBRE4sS0FBSztZQWdCRixVQUFVO2tCQURiLEtBQUs7bUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkLCBNQVRfRk9STV9GSUVMRCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xyXG5pbXBvcnQgeyBNQVRfSU5QVVRfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIERhdGVBZGFwdGVyLFxyXG4gIE1hdERhdGVGb3JtYXRzLFxyXG59IGZyb20gJy4vY29yZSc7XHJcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnB1dEJhc2UsIERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlckNvbnRyb2wsIE1hdERhdGVwaWNrZXJQYW5lbCB9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuaW1wb3J0IHsgRGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlIH0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXREYXRlcGlja2VySW5wdXQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFUElDS0VSX1ZBTElEQVRPUlM6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdERhdGVwaWNrZXJJbnB1dCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG4vKiogRGlyZWN0aXZlIHVzZWQgdG8gY29ubmVjdCBhbiBpbnB1dCB0byBhIE1hdERhdGVwaWNrZXIuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbWF0RGF0ZXBpY2tlcl0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTUFUX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICBNQVRfREFURVBJQ0tFUl9WQUxJREFUT1JTLFxyXG4gICAgeyBwcm92aWRlOiBNQVRfSU5QVVRfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBNYXREYXRlcGlja2VySW5wdXQgfSxcclxuICBdLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdtYXQtZGF0ZXBpY2tlci1pbnB1dCcsXHJcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnX2RhdGVwaWNrZXIgPyBcImRpYWxvZ1wiIDogbnVsbCcsXHJcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICcoX2RhdGVwaWNrZXI/Lm9wZW5lZCAmJiBfZGF0ZXBpY2tlci5pZCkgfHwgbnVsbCcsXHJcbiAgICAnW2F0dHIubWluXSc6ICdtaW4gPyBfZGF0ZUFkYXB0ZXIudG9Jc284NjAxKG1pbikgOiBudWxsJyxcclxuICAgICdbYXR0ci5tYXhdJzogJ21heCA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEobWF4KSA6IG51bGwnLFxyXG4gICAgLy8gVXNlZCBieSB0aGUgdGVzdCBoYXJuZXNzIHRvIHRpZSB0aGlzIGlucHV0IHRvIGl0cyBjYWxlbmRhci4gV2UgY2FuJ3QgZGVwZW5kIG9uXHJcbiAgICAvLyBgYXJpYS1vd25zYCBmb3IgdGhpcywgYmVjYXVzZSBpdCdzIG9ubHkgZGVmaW5lZCB3aGlsZSB0aGUgY2FsZW5kYXIgaXMgb3Blbi5cclxuICAgICdbYXR0ci5kYXRhLW1hdC1jYWxlbmRhcl0nOiAnX2RhdGVwaWNrZXIgPyBfZGF0ZXBpY2tlci5pZCA6IG51bGwnLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxyXG4gICAgJyhjaGFuZ2UpJzogJ19vbkNoYW5nZSgpJyxcclxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcclxuICAgICcoa2V5ZG93biknOiAnX29uS2V5ZG93bigkZXZlbnQpJyxcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0RGF0ZXBpY2tlcklucHV0JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJJbnB1dDxEPlxyXG4gIGV4dGVuZHMgTWF0RGF0ZXBpY2tlcklucHV0QmFzZTxEIHwgbnVsbCwgRD5cclxuICBpbXBsZW1lbnRzIE1hdERhdGVwaWNrZXJDb250cm9sPEQgfCBudWxsPiwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jbG9zZWRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1hdERhdGVwaWNrZXIoZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlclBhbmVsPE1hdERhdGVwaWNrZXJDb250cm9sPEQ+LCBEIHwgbnVsbCwgRD4pIHtcclxuICAgIGlmIChkYXRlcGlja2VyKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIgPSBkYXRlcGlja2VyO1xyXG4gICAgICB0aGlzLl9jbG9zZWRTdWJzY3JpcHRpb24gPSBkYXRlcGlja2VyLmNsb3NlZFN0cmVhbS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25Ub3VjaGVkKCkpO1xyXG4gICAgICB0aGlzLl9yZWdpc3Rlck1vZGVsKGRhdGVwaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIF9kYXRlcGlja2VyOiBNYXREYXRlcGlja2VyUGFuZWw8TWF0RGF0ZXBpY2tlckNvbnRyb2w8RD4sIEQgfCBudWxsLCBEPjtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG4gIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICBjb25zdCB2YWxpZFZhbHVlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZSh2YWxpZFZhbHVlLCB0aGlzLl9taW4sIHRoaXMuZ2V0VW5pdCgpKSkge1xyXG4gICAgICB0aGlzLl9taW4gPSB2YWxpZFZhbHVlO1xyXG4gICAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9taW46IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXgoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heDtcclxuICB9XHJcbiAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIGNvbnN0IHZhbGlkVmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyLnNhbWVEYXRlKHZhbGlkVmFsdWUsIHRoaXMuX21heCwgdGhpcy5nZXRVbml0KCkpKSB7XHJcbiAgICAgIHRoaXMuX21heCA9IHZhbGlkVmFsdWU7XHJcbiAgICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX21heDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGZpbHRlciBvdXQgZGF0ZXMgd2l0aGluIHRoZSBkYXRlcGlja2VyLiAqL1xyXG4gIEBJbnB1dCgnbWF0RGF0ZXBpY2tlckZpbHRlcicpXHJcbiAgZ2V0IGRhdGVGaWx0ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUZpbHRlcjtcclxuICB9XHJcbiAgc2V0IGRhdGVGaWx0ZXIodmFsdWU6IERhdGVGaWx0ZXJGbjxEIHwgbnVsbD4pIHtcclxuICAgIGNvbnN0IHdhc01hdGNoaW5nVmFsdWUgPSB0aGlzLl9tYXRjaGVzRmlsdGVyKHRoaXMudmFsdWUpO1xyXG4gICAgdGhpcy5fZGF0ZUZpbHRlciA9IHZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLl9tYXRjaGVzRmlsdGVyKHRoaXMudmFsdWUpICE9PSB3YXNNYXRjaGluZ1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEIHwgbnVsbD47XHJcblxyXG4gIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cclxuICBwcm90ZWN0ZWQgX3ZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXHJcbiAgICBAT3B0aW9uYWwoKSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpIGRhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0ZPUk1fRklFTEQpIHByaXZhdGUgX2Zvcm1GaWVsZD86IE1hdEZvcm1GaWVsZCxcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRhdGVBZGFwdGVyLCBkYXRlRm9ybWF0cyk7XHJcbiAgICB0aGlzLl92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2Uoc3VwZXIuX2dldFZhbGlkYXRvcnMoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBlbGVtZW50IHRoYXQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNvbm5lY3RlZCB0by5cclxuICAgKiBAcmV0dXJuIFRoZSBlbGVtZW50IHRvIGNvbm5lY3QgdGhlIHBvcHVwIHRvLlxyXG4gICAqL1xyXG4gIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm9ybUZpZWxkID8gdGhpcy5fZm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSA6IHRoaXMuX2VsZW1lbnRSZWY7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGEgZGVzY3JpcHRpb24gZm9yIHRoZSBjYWxlbmRhciBvdmVybGF5LiAqL1xyXG4gIGdldE92ZXJsYXlMYWJlbElkKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2Zvcm1GaWVsZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZm9ybUZpZWxkLmdldExhYmVsSWQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5Jyk7XHJcbiAgfVxyXG5cclxuICAvKiogUmV0dXJucyB0aGUgcGFsZXR0ZSB1c2VkIGJ5IHRoZSBpbnB1dCdzIGZvcm0gZmllbGQsIGlmIGFueS4gKi9cclxuICBnZXRUaGVtZVBhbGV0dGUoKTogVGhlbWVQYWxldHRlIHtcclxuICAgIHJldHVybiB0aGlzLl9mb3JtRmllbGQgPyB0aGlzLl9mb3JtRmllbGQuY29sb3IgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgdmFsdWUgYXQgd2hpY2ggdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydC4gKi9cclxuICBnZXRTdGFydFZhbHVlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xyXG4gICAgdGhpcy5fY2xvc2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogT3BlbnMgdGhlIGFzc29jaWF0ZWQgZGF0ZXBpY2tlci4gKi9cclxuICBwcm90ZWN0ZWQgX29wZW5Qb3B1cCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9kYXRlcGlja2VyKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9nZXRWYWx1ZUZyb21Nb2RlbChtb2RlbFZhbHVlOiBEIHwgbnVsbCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiBtb2RlbFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9hc3NpZ25WYWx1ZVRvTW9kZWwodmFsdWU6IEQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fbW9kZWwpIHtcclxuICAgICAgdGhpcy5fbW9kZWwudXBkYXRlU2VsZWN0aW9uKHZhbHVlLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHRoZSBpbnB1dCdzIG1pbmltdW0gZGF0ZS4gKi9cclxuICBfZ2V0TWluRGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgaW5wdXQncyBtYXhpbXVtIGRhdGUuICovXHJcbiAgX2dldE1heERhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIGlucHV0J3MgZGF0ZSBmaWx0ZXJpbmcgZnVuY3Rpb24uICovXHJcbiAgcHJvdGVjdGVkIF9nZXREYXRlRmlsdGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3Nob3VsZEhhbmRsZUNoYW5nZUV2ZW50KGV2ZW50OiBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8RD4pIHtcclxuICAgIHJldHVybiBldmVudC5zb3VyY2UgIT09IHRoaXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==