/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Optional, InjectionToken, Inject, Injector, InjectFlags, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgForm, FormGroupDirective, NgControl, Validators, } from '@angular/forms';
import { mixinErrorState, MAT_DATE_FORMATS, ErrorStateMatcher, } from '@angular/material/core';
import { BACKSPACE } from '@angular/cdk/keycodes';
import { DateAdapter, } from './core';
import { MatDatepickerInputBase } from './datepicker-input-base';
import { DateRange } from './date-selection-model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/core";
import * as i2 from "@angular/forms";
import * as i3 from "./core";
/**
 * Used to provide the date range input wrapper component
 * to the parts without circular dependencies.
 */
export const MAT_DATE_RANGE_INPUT_PARENT = new InjectionToken('MAT_DATE_RANGE_INPUT_PARENT');
/**
 * Base class for the individual inputs that can be projected inside a `mat-date-range-input`.
 */
class MatDateRangeInputPartBase extends MatDatepickerInputBase {
    constructor(_rangeInput, elementRef, _defaultErrorStateMatcher, _injector, _parentForm, _parentFormGroup, dateAdapter, dateFormats) {
        super(elementRef, dateAdapter, dateFormats);
        this._rangeInput = _rangeInput;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._injector = _injector;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
    }
    ngOnInit() {
        // We need the date input to provide itself as a `ControlValueAccessor` and a `Validator`, while
        // injecting its `NgControl` so that the error state is handled correctly. This introduces a
        // circular dependency, because both `ControlValueAccessor` and `Validator` depend on the input
        // itself. Usually we can work around it for the CVA, but there's no API to do it for the
        // validator. We work around it here by injecting the `NgControl` in `ngOnInit`, after
        // everything has been resolved.
        // tslint:disable-next-line:no-bitwise
        const ngControl = this._injector.get(NgControl, null, InjectFlags.Self | InjectFlags.Optional);
        if (ngControl) {
            this.ngControl = ngControl;
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }
    /** Gets whether the input is empty. */
    isEmpty() {
        return this._elementRef.nativeElement.value.length === 0;
    }
    /** Gets the placeholder of the input. */
    _getPlaceholder() {
        return this._elementRef.nativeElement.placeholder;
    }
    /** Focuses the input. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** Handles `input` events on the input element. */
    _onInput(value) {
        super._onInput(value);
        this._rangeInput._handleChildValueChange();
    }
    /** Opens the datepicker associated with the input. */
    _openPopup() {
        this._rangeInput._openDatepicker();
    }
    /** Gets the minimum date from the range input. */
    _getMinDate() {
        return this._rangeInput.min;
    }
    /** Gets the maximum date from the range input. */
    _getMaxDate() {
        return this._rangeInput.max;
    }
    /** Gets the date filter function from the range input. */
    _getDateFilter() {
        return this._rangeInput.dateFilter;
    }
    _parentDisabled() {
        return this._rangeInput._groupDisabled;
    }
    _shouldHandleChangeEvent({ source }) {
        return source !== this._rangeInput._startInput && source !== this._rangeInput._endInput;
    }
    _assignValueProgrammatically(value) {
        super._assignValueProgrammatically(value);
        const opposite = (this === this._rangeInput._startInput
            ? this._rangeInput._endInput
            : this._rangeInput._startInput);
        opposite?._validatorOnChange();
    }
}
/** @nocollapse */ /** @nocollapse */ MatDateRangeInputPartBase.ɵfac = function MatDateRangeInputPartBase_Factory(t) { return new (t || MatDateRangeInputPartBase)(i0.ɵɵdirectiveInject(MAT_DATE_RANGE_INPUT_PARENT), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ErrorStateMatcher), i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i2.NgForm, 8), i0.ɵɵdirectiveInject(i2.FormGroupDirective, 8), i0.ɵɵdirectiveInject(i3.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8)); };
/** @nocollapse */ /** @nocollapse */ MatDateRangeInputPartBase.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDateRangeInputPartBase, features: [i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDateRangeInputPartBase, [{
        type: Directive
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DATE_RANGE_INPUT_PARENT]
            }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                type: Optional
            }] }, { type: i2.FormGroupDirective, decorators: [{
                type: Optional
            }] }, { type: i3.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }]; }, null); })();
const _MatDateRangeInputBase = mixinErrorState(MatDateRangeInputPartBase);
/** Input for entering the start date in a `mat-date-range-input`. */
export class MatStartDate extends _MatDateRangeInputBase {
    constructor(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats) {
        super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats);
        /** Validator that checks that the start date isn't after the end date. */
        this._startValidator = (control) => {
            const start = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            const end = this._model ? this._model.selection.end : null;
            return !start || !end || this._dateAdapter.compareDate(start, end) <= 0
                ? null
                : { 'matStartDateInvalid': { 'end': end, 'actual': start } };
        };
        this._validator = Validators.compose([...super._getValidators(), this._startValidator]);
    }
    _getValueFromModel(modelValue) {
        return modelValue.start;
    }
    _shouldHandleChangeEvent(change) {
        if (!super._shouldHandleChangeEvent(change)) {
            return false;
        }
        else {
            return !change.oldValue?.start
                ? !!change.selection.start
                : !change.selection.start ||
                    !!this._dateAdapter.compareDate(change.oldValue.start, change.selection.start);
        }
    }
    _assignValueToModel(value) {
        if (this._model) {
            const range = new DateRange(value, this._model.selection.end);
            this._model.updateSelection(range, this);
        }
    }
    _formatValue(value) {
        super._formatValue(value);
        // Any time the input value is reformatted we need to tell the parent.
        this._rangeInput._handleChildValueChange();
    }
    /** Gets the value that should be used when mirroring the input's size. */
    getMirrorValue() {
        const element = this._elementRef.nativeElement;
        const value = element.value;
        return value.length > 0 ? value : element.placeholder;
    }
}
/** @nocollapse */ /** @nocollapse */ MatStartDate.ɵfac = function MatStartDate_Factory(t) { return new (t || MatStartDate)(i0.ɵɵdirectiveInject(MAT_DATE_RANGE_INPUT_PARENT), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ErrorStateMatcher), i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i2.NgForm, 8), i0.ɵɵdirectiveInject(i2.FormGroupDirective, 8), i0.ɵɵdirectiveInject(i3.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8)); };
/** @nocollapse */ /** @nocollapse */ MatStartDate.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatStartDate, selectors: [["input", "matStartDate", ""]], hostAttrs: ["type", "text", 1, "mat-start-date", "mat-date-range-input-inner"], hostVars: 6, hostBindings: function MatStartDate_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function MatStartDate_input_HostBindingHandler($event) { return ctx._onInput($event.target.value); })("change", function MatStartDate_change_HostBindingHandler() { return ctx._onChange(); })("keydown", function MatStartDate_keydown_HostBindingHandler($event) { return ctx._onKeydown($event); })("blur", function MatStartDate_blur_HostBindingHandler() { return ctx._onBlur(); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("disabled", ctx.disabled);
        i0.ɵɵattribute("id", ctx._rangeInput.id)("aria-haspopup", ctx._rangeInput.rangePicker ? "dialog" : null)("aria-owns", (ctx._rangeInput.rangePicker == null ? null : ctx._rangeInput.rangePicker.opened) && ctx._rangeInput.rangePicker.id || null)("min", ctx._getMinDate() ? ctx._dateAdapter.toIso8601(ctx._getMinDate()) : null)("max", ctx._getMaxDate() ? ctx._dateAdapter.toIso8601(ctx._getMaxDate()) : null);
    } }, inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, features: [i0.ɵɵProvidersFeature([
            { provide: NG_VALUE_ACCESSOR, useExisting: MatStartDate, multi: true },
            { provide: NG_VALIDATORS, useExisting: MatStartDate, multi: true },
        ]), i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatStartDate, [{
        type: Directive,
        args: [{
                selector: 'input[matStartDate]',
                host: {
                    'class': 'mat-start-date mat-date-range-input-inner',
                    '[disabled]': 'disabled',
                    '(input)': '_onInput($event.target.value)',
                    '(change)': '_onChange()',
                    '(keydown)': '_onKeydown($event)',
                    '[attr.id]': '_rangeInput.id',
                    '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
                    '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
                    '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
                    '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
                    '(blur)': '_onBlur()',
                    'type': 'text',
                },
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: MatStartDate, multi: true },
                    { provide: NG_VALIDATORS, useExisting: MatStartDate, multi: true },
                ],
                // These need to be specified explicitly, because some tooling doesn't
                // seem to pick them up from the base class. See #20932.
                outputs: ['dateChange', 'dateInput'],
                inputs: ['errorStateMatcher'],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DATE_RANGE_INPUT_PARENT]
            }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                type: Optional
            }] }, { type: i2.FormGroupDirective, decorators: [{
                type: Optional
            }] }, { type: i3.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }]; }, null); })();
/** Input for entering the end date in a `mat-date-range-input`. */
export class MatEndDate extends _MatDateRangeInputBase {
    constructor(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats) {
        super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup, dateAdapter, dateFormats);
        /** Validator that checks that the end date isn't before the start date. */
        this._endValidator = (control) => {
            const end = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            const start = this._model ? this._model.selection.start : null;
            return !end || !start || this._dateAdapter.compareDate(end, start) >= 0
                ? null
                : { 'matEndDateInvalid': { 'start': start, 'actual': end } };
        };
        this._validator = Validators.compose([...super._getValidators(), this._endValidator]);
    }
    _getValueFromModel(modelValue) {
        return modelValue.end;
    }
    _shouldHandleChangeEvent(change) {
        if (!super._shouldHandleChangeEvent(change)) {
            return false;
        }
        else {
            return !change.oldValue?.end
                ? !!change.selection.end
                : !change.selection.end ||
                    !!this._dateAdapter.compareDate(change.oldValue.end, change.selection.end);
        }
    }
    _assignValueToModel(value) {
        if (this._model) {
            const range = new DateRange(this._model.selection.start, value);
            this._model.updateSelection(range, this);
        }
    }
    _onKeydown(event) {
        // If the user is pressing backspace on an empty end input, move focus back to the start.
        if (event.keyCode === BACKSPACE && !this._elementRef.nativeElement.value) {
            this._rangeInput._startInput.focus();
        }
        super._onKeydown(event);
    }
}
/** @nocollapse */ /** @nocollapse */ MatEndDate.ɵfac = function MatEndDate_Factory(t) { return new (t || MatEndDate)(i0.ɵɵdirectiveInject(MAT_DATE_RANGE_INPUT_PARENT), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.ErrorStateMatcher), i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i2.NgForm, 8), i0.ɵɵdirectiveInject(i2.FormGroupDirective, 8), i0.ɵɵdirectiveInject(i3.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8)); };
/** @nocollapse */ /** @nocollapse */ MatEndDate.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatEndDate, selectors: [["input", "matEndDate", ""]], hostAttrs: ["type", "text", 1, "mat-end-date", "mat-date-range-input-inner"], hostVars: 5, hostBindings: function MatEndDate_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function MatEndDate_input_HostBindingHandler($event) { return ctx._onInput($event.target.value); })("change", function MatEndDate_change_HostBindingHandler() { return ctx._onChange(); })("keydown", function MatEndDate_keydown_HostBindingHandler($event) { return ctx._onKeydown($event); })("blur", function MatEndDate_blur_HostBindingHandler() { return ctx._onBlur(); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("disabled", ctx.disabled);
        i0.ɵɵattribute("aria-haspopup", ctx._rangeInput.rangePicker ? "dialog" : null)("aria-owns", (ctx._rangeInput.rangePicker == null ? null : ctx._rangeInput.rangePicker.opened) && ctx._rangeInput.rangePicker.id || null)("min", ctx._getMinDate() ? ctx._dateAdapter.toIso8601(ctx._getMinDate()) : null)("max", ctx._getMaxDate() ? ctx._dateAdapter.toIso8601(ctx._getMaxDate()) : null);
    } }, inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, features: [i0.ɵɵProvidersFeature([
            { provide: NG_VALUE_ACCESSOR, useExisting: MatEndDate, multi: true },
            { provide: NG_VALIDATORS, useExisting: MatEndDate, multi: true },
        ]), i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatEndDate, [{
        type: Directive,
        args: [{
                selector: 'input[matEndDate]',
                host: {
                    'class': 'mat-end-date mat-date-range-input-inner',
                    '[disabled]': 'disabled',
                    '(input)': '_onInput($event.target.value)',
                    '(change)': '_onChange()',
                    '(keydown)': '_onKeydown($event)',
                    '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
                    '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
                    '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
                    '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
                    '(blur)': '_onBlur()',
                    'type': 'text',
                },
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: MatEndDate, multi: true },
                    { provide: NG_VALIDATORS, useExisting: MatEndDate, multi: true },
                ],
                // These need to be specified explicitly, because some tooling doesn't
                // seem to pick them up from the base class. See #20932.
                outputs: ['dateChange', 'dateInput'],
                inputs: ['errorStateMatcher'],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DATE_RANGE_INPUT_PARENT]
            }] }, { type: i0.ElementRef }, { type: i1.ErrorStateMatcher }, { type: i0.Injector }, { type: i2.NgForm, decorators: [{
                type: Optional
            }] }, { type: i2.FormGroupDirective, decorators: [{
                type: Optional
            }] }, { type: i3.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1pbnB1dC1wYXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGUtcmFuZ2UtaW5wdXQtcGFydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLGNBQWMsRUFDZCxNQUFNLEVBRU4sUUFBUSxFQUNSLFdBQVcsR0FFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFNBQVMsRUFFVCxVQUFVLEdBR1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBRUwsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUNMLFdBQVcsR0FFWixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQUUsc0JBQXNCLEVBQWdCLE1BQU0seUJBQXlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBNEIsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7QUFtQjdFOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLElBQUksY0FBYyxDQUMzRCw2QkFBNkIsQ0FDOUIsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFDZSx5QkFDYixTQUFRLHNCQUFvQztJQVk1QyxZQUM4QyxXQUF1QyxFQUNuRixVQUF3QyxFQUNqQyx5QkFBNEMsRUFDM0MsU0FBbUIsRUFDUixXQUFtQixFQUNuQixnQkFBb0MsRUFDM0MsV0FBMkIsRUFDRCxXQUEyQjtRQUVqRSxLQUFLLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztR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QUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDcEUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQ2pFO2dCQUNELHNFQUFzRTtnQkFDdEUsd0RBQXdEO2dCQUN4RCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2dCQUNwQyxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUM5Qjs7c0JBWUksTUFBTTt1QkFBQywyQkFBMkI7O3NCQUlsQyxRQUFROztzQkFDUixRQUFROztzQkFDUixRQUFROztzQkFDUixRQUFROztzQkFBSSxNQUFNO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBPcHRpb25hbCxcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBJbmplY3QsXHJcbiAgT25Jbml0LFxyXG4gIEluamVjdG9yLFxyXG4gIEluamVjdEZsYWdzLFxyXG4gIERvQ2hlY2ssXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTkdfVkFMSURBVE9SUyxcclxuICBOZ0Zvcm0sXHJcbiAgRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gIE5nQ29udHJvbCxcclxuICBWYWxpZGF0b3JGbixcclxuICBWYWxpZGF0b3JzLFxyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBWYWxpZGF0aW9uRXJyb3JzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBDYW5VcGRhdGVFcnJvclN0YXRlLFxyXG4gIG1peGluRXJyb3JTdGF0ZSxcclxuICBNQVRfREFURV9GT1JNQVRTLFxyXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBCQUNLU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQge1xyXG4gIERhdGVBZGFwdGVyLFxyXG4gIE1hdERhdGVGb3JtYXRzLFxyXG59IGZyb20gJy4vY29yZSc7XHJcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnB1dEJhc2UsIERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuaW1wb3J0IHsgRGF0ZVJhbmdlLCBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2UgfSBmcm9tICcuL2RhdGUtc2VsZWN0aW9uLW1vZGVsJztcclxuXHJcbi8qKiBQYXJlbnQgY29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIHdyYXBwZWQgYXJvdW5kIGBNYXRTdGFydERhdGVgIGFuZCBgTWF0RW5kRGF0ZWAuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbWluOiBEIHwgbnVsbDtcclxuICBtYXg6IEQgfCBudWxsO1xyXG4gIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuICByYW5nZVBpY2tlcjoge1xyXG4gICAgb3BlbmVkOiBib29sZWFuO1xyXG4gICAgaWQ6IHN0cmluZztcclxuICB9O1xyXG4gIF9zdGFydElucHV0OiBNYXREYXRlUmFuZ2VJbnB1dFBhcnRCYXNlPEQ+O1xyXG4gIF9lbmRJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZTxEPjtcclxuICBfZ3JvdXBEaXNhYmxlZDogYm9vbGVhbjtcclxuICBfaGFuZGxlQ2hpbGRWYWx1ZUNoYW5nZSgpOiB2b2lkO1xyXG4gIF9vcGVuRGF0ZXBpY2tlcigpOiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBwcm92aWRlIHRoZSBkYXRlIHJhbmdlIGlucHV0IHdyYXBwZXIgY29tcG9uZW50XHJcbiAqIHRvIHRoZSBwYXJ0cyB3aXRob3V0IGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBNQVRfREFURV9SQU5HRV9JTlBVVF9QQVJFTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8dW5rbm93bj4+KFxyXG4gICdNQVRfREFURV9SQU5HRV9JTlBVVF9QQVJFTlQnLFxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBpbmRpdmlkdWFsIGlucHV0cyB0aGF0IGNhbiBiZSBwcm9qZWN0ZWQgaW5zaWRlIGEgYG1hdC1kYXRlLXJhbmdlLWlucHV0YC5cclxuICovXHJcbkBEaXJlY3RpdmUoKVxyXG5hYnN0cmFjdCBjbGFzcyBNYXREYXRlUmFuZ2VJbnB1dFBhcnRCYXNlPEQ+XHJcbiAgZXh0ZW5kcyBNYXREYXRlcGlja2VySW5wdXRCYXNlPERhdGVSYW5nZTxEPj5cclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XHJcbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuICBuZ0NvbnRyb2w6IE5nQ29udHJvbDtcclxuXHJcbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuICBhYnN0cmFjdCB1cGRhdGVFcnJvclN0YXRlKCk6IHZvaWQ7XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvdmVycmlkZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG92ZXJyaWRlIF9hc3NpZ25WYWx1ZVRvTW9kZWwodmFsdWU6IEQgfCBudWxsKTogdm9pZDtcclxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb3ZlcnJpZGUgX2dldFZhbHVlRnJvbU1vZGVsKG1vZGVsVmFsdWU6IERhdGVSYW5nZTxEPik6IEQgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UKSBwdWJsaWMgX3JhbmdlSW5wdXQ6IE1hdERhdGVSYW5nZUlucHV0UGFyZW50PEQ+LFxyXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcclxuICAgIHB1YmxpYyBfZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9wYXJlbnRGb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSxcclxuICAgIEBPcHRpb25hbCgpIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzLFxyXG4gICkge1xyXG4gICAgc3VwZXIoZWxlbWVudFJlZiwgZGF0ZUFkYXB0ZXIsIGRhdGVGb3JtYXRzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gV2UgbmVlZCB0aGUgZGF0ZSBpbnB1dCB0byBwcm92aWRlIGl0c2VsZiBhcyBhIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgYW5kIGEgYFZhbGlkYXRvcmAsIHdoaWxlXHJcbiAgICAvLyBpbmplY3RpbmcgaXRzIGBOZ0NvbnRyb2xgIHNvIHRoYXQgdGhlIGVycm9yIHN0YXRlIGlzIGhhbmRsZWQgY29ycmVjdGx5LiBUaGlzIGludHJvZHVjZXMgYVxyXG4gICAgLy8gY2lyY3VsYXIgZGVwZW5kZW5jeSwgYmVjYXVzZSBib3RoIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgYW5kIGBWYWxpZGF0b3JgIGRlcGVuZCBvbiB0aGUgaW5wdXRcclxuICAgIC8vIGl0c2VsZi4gVXN1YWxseSB3ZSBjYW4gd29yayBhcm91bmQgaXQgZm9yIHRoZSBDVkEsIGJ1dCB0aGVyZSdzIG5vIEFQSSB0byBkbyBpdCBmb3IgdGhlXHJcbiAgICAvLyB2YWxpZGF0b3IuIFdlIHdvcmsgYXJvdW5kIGl0IGhlcmUgYnkgaW5qZWN0aW5nIHRoZSBgTmdDb250cm9sYCBpbiBgbmdPbkluaXRgLCBhZnRlclxyXG4gICAgLy8gZXZlcnl0aGluZyBoYXMgYmVlbiByZXNvbHZlZC5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLl9pbmplY3Rvci5nZXQoTmdDb250cm9sLCBudWxsLCBJbmplY3RGbGFncy5TZWxmIHwgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpO1xyXG5cclxuICAgIGlmIChuZ0NvbnRyb2wpIHtcclxuICAgICAgdGhpcy5uZ0NvbnRyb2wgPSBuZ0NvbnRyb2w7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcclxuICAgICAgLy8gV2UgbmVlZCB0byByZS1ldmFsdWF0ZSB0aGlzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2UgdGhlcmUgYXJlIHNvbWVcclxuICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXHJcbiAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxyXG4gICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xyXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgaW5wdXQuICovXHJcbiAgX2dldFBsYWNlaG9sZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wbGFjZWhvbGRlcjtcclxuICB9XHJcblxyXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cclxuICBmb2N1cygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgYGlucHV0YCBldmVudHMgb24gdGhlIGlucHV0IGVsZW1lbnQuICovXHJcbiAgb3ZlcnJpZGUgX29uSW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgc3VwZXIuX29uSW5wdXQodmFsdWUpO1xyXG4gICAgdGhpcy5fcmFuZ2VJbnB1dC5faGFuZGxlQ2hpbGRWYWx1ZUNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIE9wZW5zIHRoZSBkYXRlcGlja2VyIGFzc29jaWF0ZWQgd2l0aCB0aGUgaW5wdXQuICovXHJcbiAgcHJvdGVjdGVkIF9vcGVuUG9wdXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yYW5nZUlucHV0Ll9vcGVuRGF0ZXBpY2tlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIG1pbmltdW0gZGF0ZSBmcm9tIHRoZSByYW5nZSBpbnB1dC4gKi9cclxuICBfZ2V0TWluRGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9yYW5nZUlucHV0Lm1pbjtcclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIGRhdGUgZnJvbSB0aGUgcmFuZ2UgaW5wdXQuICovXHJcbiAgX2dldE1heERhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5tYXg7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgZGF0ZSBmaWx0ZXIgZnVuY3Rpb24gZnJvbSB0aGUgcmFuZ2UgaW5wdXQuICovXHJcbiAgcHJvdGVjdGVkIF9nZXREYXRlRmlsdGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlSW5wdXQuZGF0ZUZpbHRlcjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfcGFyZW50RGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VJbnB1dC5fZ3JvdXBEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoeyBzb3VyY2UgfTogRGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPERhdGVSYW5nZTxEPj4pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBzb3VyY2UgIT09IHRoaXMuX3JhbmdlSW5wdXQuX3N0YXJ0SW5wdXQgJiYgc291cmNlICE9PSB0aGlzLl9yYW5nZUlucHV0Ll9lbmRJbnB1dDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfYXNzaWduVmFsdWVQcm9ncmFtbWF0aWNhbGx5KHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgc3VwZXIuX2Fzc2lnblZhbHVlUHJvZ3JhbW1hdGljYWxseSh2YWx1ZSk7XHJcbiAgICBjb25zdCBvcHBvc2l0ZSA9IChcclxuICAgICAgdGhpcyA9PT0gdGhpcy5fcmFuZ2VJbnB1dC5fc3RhcnRJbnB1dFxyXG4gICAgICAgID8gdGhpcy5fcmFuZ2VJbnB1dC5fZW5kSW5wdXRcclxuICAgICAgICA6IHRoaXMuX3JhbmdlSW5wdXQuX3N0YXJ0SW5wdXRcclxuICAgICkgYXMgTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZTxEPiB8IHVuZGVmaW5lZDtcclxuICAgIG9wcG9zaXRlPy5fdmFsaWRhdG9yT25DaGFuZ2UoKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IF9NYXREYXRlUmFuZ2VJbnB1dEJhc2UgPSBtaXhpbkVycm9yU3RhdGUoTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZSk7XHJcblxyXG4vKiogSW5wdXQgZm9yIGVudGVyaW5nIHRoZSBzdGFydCBkYXRlIGluIGEgYG1hdC1kYXRlLXJhbmdlLWlucHV0YC4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFttYXRTdGFydERhdGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnbWF0LXN0YXJ0LWRhdGUgbWF0LWRhdGUtcmFuZ2UtaW5wdXQtaW5uZXInLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxyXG4gICAgJyhjaGFuZ2UpJzogJ19vbkNoYW5nZSgpJyxcclxuICAgICcoa2V5ZG93biknOiAnX29uS2V5ZG93bigkZXZlbnQpJyxcclxuICAgICdbYXR0ci5pZF0nOiAnX3JhbmdlSW5wdXQuaWQnLFxyXG4gICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ19yYW5nZUlucHV0LnJhbmdlUGlja2VyID8gXCJkaWFsb2dcIiA6IG51bGwnLFxyXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnKF9yYW5nZUlucHV0LnJhbmdlUGlja2VyPy5vcGVuZWQgJiYgX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIuaWQpIHx8IG51bGwnLFxyXG4gICAgJ1thdHRyLm1pbl0nOiAnX2dldE1pbkRhdGUoKSA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEoX2dldE1pbkRhdGUoKSkgOiBudWxsJyxcclxuICAgICdbYXR0ci5tYXhdJzogJ19nZXRNYXhEYXRlKCkgPyBfZGF0ZUFkYXB0ZXIudG9Jc284NjAxKF9nZXRNYXhEYXRlKCkpIDogbnVsbCcsXHJcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXHJcbiAgICAndHlwZSc6ICd0ZXh0JyxcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IE1hdFN0YXJ0RGF0ZSwgbXVsdGk6IHRydWUgfSxcclxuICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdFN0YXJ0RGF0ZSwgbXVsdGk6IHRydWUgfSxcclxuICBdLFxyXG4gIC8vIFRoZXNlIG5lZWQgdG8gYmUgc3BlY2lmaWVkIGV4cGxpY2l0bHksIGJlY2F1c2Ugc29tZSB0b29saW5nIGRvZXNuJ3RcclxuICAvLyBzZWVtIHRvIHBpY2sgdGhlbSB1cCBmcm9tIHRoZSBiYXNlIGNsYXNzLiBTZWUgIzIwOTMyLlxyXG4gIG91dHB1dHM6IFsnZGF0ZUNoYW5nZScsICdkYXRlSW5wdXQnXSxcclxuICBpbnB1dHM6IFsnZXJyb3JTdGF0ZU1hdGNoZXInXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFN0YXJ0RGF0ZTxEPiBleHRlbmRzIF9NYXREYXRlUmFuZ2VJbnB1dEJhc2U8RD4gaW1wbGVtZW50cyBDYW5VcGRhdGVFcnJvclN0YXRlIHtcclxuICAvKiogVmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHN0YXJ0IGRhdGUgaXNuJ3QgYWZ0ZXIgdGhlIGVuZCBkYXRlLiAqL1xyXG4gIHByaXZhdGUgX3N0YXJ0VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbChcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSksXHJcbiAgICApO1xyXG4gICAgY29uc3QgZW5kID0gdGhpcy5fbW9kZWwgPyB0aGlzLl9tb2RlbC5zZWxlY3Rpb24uZW5kIDogbnVsbDtcclxuICAgIHJldHVybiAhc3RhcnQgfHwgIWVuZCB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShzdGFydCwgZW5kKSA8PSAwXHJcbiAgICAgID8gbnVsbFxyXG4gICAgICA6IHsgJ21hdFN0YXJ0RGF0ZUludmFsaWQnOiB7ICdlbmQnOiBlbmQsICdhY3R1YWwnOiBzdGFydCB9IH07XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCkgcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXHJcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxyXG4gICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcixcclxuICAgIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm06IE5nRm9ybSxcclxuICAgIEBPcHRpb25hbCgpIHBhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9GT1JNQVRTKSBkYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgcmFuZ2VJbnB1dCxcclxuICAgICAgZWxlbWVudFJlZixcclxuICAgICAgZGVmYXVsdEVycm9yU3RhdGVNYXRjaGVyLFxyXG4gICAgICBpbmplY3RvcixcclxuICAgICAgcGFyZW50Rm9ybSxcclxuICAgICAgcGFyZW50Rm9ybUdyb3VwLFxyXG4gICAgICBkYXRlQWRhcHRlcixcclxuICAgICAgZGF0ZUZvcm1hdHMsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF92YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnN1cGVyLl9nZXRWYWxpZGF0b3JzKCksIHRoaXMuX3N0YXJ0VmFsaWRhdG9yXSk7XHJcblxyXG4gIHByb3RlY3RlZCBfZ2V0VmFsdWVGcm9tTW9kZWwobW9kZWxWYWx1ZTogRGF0ZVJhbmdlPEQ+KSB7XHJcbiAgICByZXR1cm4gbW9kZWxWYWx1ZS5zdGFydDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoXHJcbiAgICBjaGFuZ2U6IERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxEYXRlUmFuZ2U8RD4+LFxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFzdXBlci5fc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoY2hhbmdlKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gIWNoYW5nZS5vbGRWYWx1ZT8uc3RhcnRcclxuICAgICAgICA/ICEhY2hhbmdlLnNlbGVjdGlvbi5zdGFydFxyXG4gICAgICAgIDogIWNoYW5nZS5zZWxlY3Rpb24uc3RhcnQgfHxcclxuICAgICAgICAhIXRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGNoYW5nZS5vbGRWYWx1ZS5zdGFydCwgY2hhbmdlLnNlbGVjdGlvbi5zdGFydCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2Fzc2lnblZhbHVlVG9Nb2RlbCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIGlmICh0aGlzLl9tb2RlbCkge1xyXG4gICAgICBjb25zdCByYW5nZSA9IG5ldyBEYXRlUmFuZ2UodmFsdWUsIHRoaXMuX21vZGVsLnNlbGVjdGlvbi5lbmQpO1xyXG4gICAgICB0aGlzLl9tb2RlbC51cGRhdGVTZWxlY3Rpb24ocmFuZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9mb3JtYXRWYWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHN1cGVyLl9mb3JtYXRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgLy8gQW55IHRpbWUgdGhlIGlucHV0IHZhbHVlIGlzIHJlZm9ybWF0dGVkIHdlIG5lZWQgdG8gdGVsbCB0aGUgcGFyZW50LlxyXG4gICAgdGhpcy5fcmFuZ2VJbnB1dC5faGFuZGxlQ2hpbGRWYWx1ZUNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiBtaXJyb3JpbmcgdGhlIGlucHV0J3Mgc2l6ZS4gKi9cclxuICBnZXRNaXJyb3JWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC52YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBlbGVtZW50LnBsYWNlaG9sZGVyO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIElucHV0IGZvciBlbnRlcmluZyB0aGUgZW5kIGRhdGUgaW4gYSBgbWF0LWRhdGUtcmFuZ2UtaW5wdXRgLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W21hdEVuZERhdGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnbWF0LWVuZC1kYXRlIG1hdC1kYXRlLXJhbmdlLWlucHV0LWlubmVyJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdfb25DaGFuZ2UoKScsXHJcbiAgICAnKGtleWRvd24pJzogJ19vbktleWRvd24oJGV2ZW50KScsXHJcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIgPyBcImRpYWxvZ1wiIDogbnVsbCcsXHJcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICcoX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXI/Lm9wZW5lZCAmJiBfcmFuZ2VJbnB1dC5yYW5nZVBpY2tlci5pZCkgfHwgbnVsbCcsXHJcbiAgICAnW2F0dHIubWluXSc6ICdfZ2V0TWluRGF0ZSgpID8gX2RhdGVBZGFwdGVyLnRvSXNvODYwMShfZ2V0TWluRGF0ZSgpKSA6IG51bGwnLFxyXG4gICAgJ1thdHRyLm1heF0nOiAnX2dldE1heERhdGUoKSA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEoX2dldE1heERhdGUoKSkgOiBudWxsJyxcclxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcclxuICAgICd0eXBlJzogJ3RleHQnLFxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogTWF0RW5kRGF0ZSwgbXVsdGk6IHRydWUgfSxcclxuICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdEVuZERhdGUsIG11bHRpOiB0cnVlIH0sXHJcbiAgXSxcclxuICAvLyBUaGVzZSBuZWVkIHRvIGJlIHNwZWNpZmllZCBleHBsaWNpdGx5LCBiZWNhdXNlIHNvbWUgdG9vbGluZyBkb2Vzbid0XHJcbiAgLy8gc2VlbSB0byBwaWNrIHRoZW0gdXAgZnJvbSB0aGUgYmFzZSBjbGFzcy4gU2VlICMyMDkzMi5cclxuICBvdXRwdXRzOiBbJ2RhdGVDaGFuZ2UnLCAnZGF0ZUlucHV0J10sXHJcbiAgaW5wdXRzOiBbJ2Vycm9yU3RhdGVNYXRjaGVyJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRFbmREYXRlPEQ+IGV4dGVuZHMgX01hdERhdGVSYW5nZUlucHV0QmFzZTxEPiBpbXBsZW1lbnRzIENhblVwZGF0ZUVycm9yU3RhdGUge1xyXG4gIC8qKiBWYWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgZW5kIGRhdGUgaXNuJ3QgYmVmb3JlIHRoZSBzdGFydCBkYXRlLiAqL1xyXG4gIHByaXZhdGUgX2VuZFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgZW5kID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fbW9kZWwgPyB0aGlzLl9tb2RlbC5zZWxlY3Rpb24uc3RhcnQgOiBudWxsO1xyXG4gICAgcmV0dXJuICFlbmQgfHwgIXN0YXJ0IHx8IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGVuZCwgc3RhcnQpID49IDBcclxuICAgICAgPyBudWxsXHJcbiAgICAgIDogeyAnbWF0RW5kRGF0ZUludmFsaWQnOiB7ICdzdGFydCc6IHN0YXJ0LCAnYWN0dWFsJzogZW5kIH0gfTtcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UKSByYW5nZUlucHV0OiBNYXREYXRlUmFuZ2VJbnB1dFBhcmVudDxEPixcclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXHJcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxyXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybTogTmdGb3JtLFxyXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpIGRhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICApIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICByYW5nZUlucHV0LFxyXG4gICAgICBlbGVtZW50UmVmLFxyXG4gICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsXHJcbiAgICAgIGluamVjdG9yLFxyXG4gICAgICBwYXJlbnRGb3JtLFxyXG4gICAgICBwYXJlbnRGb3JtR3JvdXAsXHJcbiAgICAgIGRhdGVBZGFwdGVyLFxyXG4gICAgICBkYXRlRm9ybWF0cyxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbLi4uc3VwZXIuX2dldFZhbGlkYXRvcnMoKSwgdGhpcy5fZW5kVmFsaWRhdG9yXSk7XHJcblxyXG4gIHByb3RlY3RlZCBfZ2V0VmFsdWVGcm9tTW9kZWwobW9kZWxWYWx1ZTogRGF0ZVJhbmdlPEQ+KSB7XHJcbiAgICByZXR1cm4gbW9kZWxWYWx1ZS5lbmQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3Nob3VsZEhhbmRsZUNoYW5nZUV2ZW50KFxyXG4gICAgY2hhbmdlOiBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8RGF0ZVJhbmdlPEQ+PixcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICghc3VwZXIuX3Nob3VsZEhhbmRsZUNoYW5nZUV2ZW50KGNoYW5nZSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICFjaGFuZ2Uub2xkVmFsdWU/LmVuZFxyXG4gICAgICAgID8gISFjaGFuZ2Uuc2VsZWN0aW9uLmVuZFxyXG4gICAgICAgIDogIWNoYW5nZS5zZWxlY3Rpb24uZW5kIHx8XHJcbiAgICAgICAgISF0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShjaGFuZ2Uub2xkVmFsdWUuZW5kLCBjaGFuZ2Uuc2VsZWN0aW9uLmVuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2Fzc2lnblZhbHVlVG9Nb2RlbCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIGlmICh0aGlzLl9tb2RlbCkge1xyXG4gICAgICBjb25zdCByYW5nZSA9IG5ldyBEYXRlUmFuZ2UodGhpcy5fbW9kZWwuc2VsZWN0aW9uLnN0YXJ0LCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZVNlbGVjdGlvbihyYW5nZSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBfb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAvLyBJZiB0aGUgdXNlciBpcyBwcmVzc2luZyBiYWNrc3BhY2Ugb24gYW4gZW1wdHkgZW5kIGlucHV0LCBtb3ZlIGZvY3VzIGJhY2sgdG8gdGhlIHN0YXJ0LlxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEJBQ0tTUEFDRSAmJiAhdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3JhbmdlSW5wdXQuX3N0YXJ0SW5wdXQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdXBlci5fb25LZXlkb3duKGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19