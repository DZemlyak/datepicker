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
import { DateAdapter } from './core';
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
    _shouldHandleChangeEvent({ source, }) {
        return (source !== this._rangeInput._startInput &&
            source !== this._rangeInput._endInput);
    }
    _assignValueProgrammatically(value) {
        super._assignValueProgrammatically(value);
        const opposite = (this === this._rangeInput._startInput
            ? this._rangeInput._endInput
            : this._rangeInput._startInput);
        opposite?._validatorOnChange();
    }
}
/** @nocollapse */ /** @nocollapse */ MatDateRangeInputPartBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateRangeInputPartBase, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatDateRangeInputPartBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatDateRangeInputPartBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateRangeInputPartBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
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
                }] }]; } });
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
                : { matStartDateInvalid: { end: end, actual: start } };
        };
        this._validator = Validators.compose([
            ...super._getValidators(),
            this._startValidator,
        ]);
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
/** @nocollapse */ /** @nocollapse */ MatStartDate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatStartDate, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatStartDate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatStartDate, selector: "input[matStartDate]", inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, host: { attributes: { "type": "text" }, listeners: { "input": "_onInput($event.target.value)", "change": "_onChange()", "keydown": "_onKeydown($event)", "blur": "_onBlur()" }, properties: { "disabled": "disabled", "attr.id": "_rangeInput.id", "attr.aria-haspopup": "_rangeInput.rangePicker ? \"dialog\" : null", "attr.aria-owns": "(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null", "attr.min": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null", "attr.max": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null" }, classAttribute: "mat-start-date mat-date-range-input-inner" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: MatStartDate, multi: true },
        { provide: NG_VALIDATORS, useExisting: MatStartDate, multi: true },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatStartDate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matStartDate]',
                    host: {
                        class: 'mat-start-date mat-date-range-input-inner',
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
                        type: 'text',
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
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
                }] }]; } });
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
                : { matEndDateInvalid: { start: start, actual: end } };
        };
        this._validator = Validators.compose([
            ...super._getValidators(),
            this._endValidator,
        ]);
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
/** @nocollapse */ /** @nocollapse */ MatEndDate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatEndDate, deps: [{ token: MAT_DATE_RANGE_INPUT_PARENT }, { token: i0.ElementRef }, { token: i1.ErrorStateMatcher }, { token: i0.Injector }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatEndDate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatEndDate, selector: "input[matEndDate]", inputs: { errorStateMatcher: "errorStateMatcher" }, outputs: { dateChange: "dateChange", dateInput: "dateInput" }, host: { attributes: { "type": "text" }, listeners: { "input": "_onInput($event.target.value)", "change": "_onChange()", "keydown": "_onKeydown($event)", "blur": "_onBlur()" }, properties: { "disabled": "disabled", "attr.aria-haspopup": "_rangeInput.rangePicker ? \"dialog\" : null", "attr.aria-owns": "(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null", "attr.min": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null", "attr.max": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null" }, classAttribute: "mat-end-date mat-date-range-input-inner" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: MatEndDate, multi: true },
        { provide: NG_VALIDATORS, useExisting: MatEndDate, multi: true },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatEndDate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matEndDate]',
                    host: {
                        class: 'mat-end-date mat-date-range-input-inner',
                        '[disabled]': 'disabled',
                        '(input)': '_onInput($event.target.value)',
                        '(change)': '_onChange()',
                        '(keydown)': '_onKeydown($event)',
                        '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
                        '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
                        '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
                        '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
                        '(blur)': '_onBlur()',
                        type: 'text',
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
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
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
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1pbnB1dC1wYXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGUtcmFuZ2UtaW5wdXQtcGFydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLGNBQWMsRUFDZCxNQUFNLEVBRU4sUUFBUSxFQUNSLFdBQVcsR0FFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFNBQVMsRUFFVCxVQUFVLEdBR1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBRUwsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBa0IsTUFBTSxRQUFRLENBQUM7QUFDckQsT0FBTyxFQUFFLHNCQUFzQixFQUFnQixNQUFNLHlCQUF5QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQTRCLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBbUI3RTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLGNBQWMsQ0FFM0QsNkJBQTZCLENBQUMsQ0FBQztBQUVqQzs7R0FFRztBQUNILE1BQ2UseUJBQ2IsU0FBUSxzQkFBb0M7SUFlNUMsWUFFUyxXQUF1QyxFQUM5QyxVQUF3QyxFQUNqQyx5QkFBNEMsRUFDM0MsU0FBbUIsRUFDUixXQUFtQixFQUNuQixnQkFBb0MsRUFDM0MsV0FBMkIsRUFDRCxXQUEyQjtRQUVqRSxLQUFLLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztR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LE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtxQkFDakU7b0JBQ0Qsc0VBQXNFO29CQUN0RSx3REFBd0Q7b0JBQ3hELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7b0JBQ3BDLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUM5Qjs7MEJBbUJJLE1BQU07MkJBQUMsMkJBQTJCOzswQkFJbEMsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdCxcbiAgT25Jbml0LFxuICBJbmplY3RvcixcbiAgSW5qZWN0RmxhZ3MsXG4gIERvQ2hlY2ssXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5nRm9ybSxcbiAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICBOZ0NvbnRyb2wsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzLFxuICBBYnN0cmFjdENvbnRyb2wsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gIG1peGluRXJyb3JTdGF0ZSxcbiAgTUFUX0RBVEVfRk9STUFUUyxcbiAgRXJyb3JTdGF0ZU1hdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgQkFDS1NQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW5wdXRCYXNlLCBEYXRlRmlsdGVyRm4gfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2UsIERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZSB9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xuXG4vKiogUGFyZW50IGNvbXBvbmVudCB0aGF0IHNob3VsZCBiZSB3cmFwcGVkIGFyb3VuZCBgTWF0U3RhcnREYXRlYCBhbmQgYE1hdEVuZERhdGVgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXREYXRlUmFuZ2VJbnB1dFBhcmVudDxEPiB7XG4gIGlkOiBzdHJpbmc7XG4gIG1pbjogRCB8IG51bGw7XG4gIG1heDogRCB8IG51bGw7XG4gIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcbiAgcmFuZ2VQaWNrZXI6IHtcbiAgICBvcGVuZWQ6IGJvb2xlYW47XG4gICAgaWQ6IHN0cmluZztcbiAgfTtcbiAgX3N0YXJ0SW5wdXQ6IE1hdERhdGVSYW5nZUlucHV0UGFydEJhc2U8RD47XG4gIF9lbmRJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJ0QmFzZTxEPjtcbiAgX2dyb3VwRGlzYWJsZWQ6IGJvb2xlYW47XG4gIF9oYW5kbGVDaGlsZFZhbHVlQ2hhbmdlKCk6IHZvaWQ7XG4gIF9vcGVuRGF0ZXBpY2tlcigpOiB2b2lkO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSByYW5nZSBpbnB1dCB3cmFwcGVyIGNvbXBvbmVudFxuICogdG8gdGhlIHBhcnRzIHdpdGhvdXQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICovXG5leHBvcnQgY29uc3QgTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPFxuICBNYXREYXRlUmFuZ2VJbnB1dFBhcmVudDx1bmtub3duPlxuPignTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgdGhlIGluZGl2aWR1YWwgaW5wdXRzIHRoYXQgY2FuIGJlIHByb2plY3RlZCBpbnNpZGUgYSBgbWF0LWRhdGUtcmFuZ2UtaW5wdXRgLlxuICovXG5ARGlyZWN0aXZlKClcbmFic3RyYWN0IGNsYXNzIE1hdERhdGVSYW5nZUlucHV0UGFydEJhc2U8RD5cbiAgZXh0ZW5kcyBNYXREYXRlcGlja2VySW5wdXRCYXNlPERhdGVSYW5nZTxEPj5cbiAgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2tcbntcbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgbmdDb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgYWJzdHJhY3QgdXBkYXRlRXJyb3JTdGF0ZSgpOiB2b2lkO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvdmVycmlkZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGw7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvdmVycmlkZSBfYXNzaWduVmFsdWVUb01vZGVsKHZhbHVlOiBEIHwgbnVsbCk6IHZvaWQ7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvdmVycmlkZSBfZ2V0VmFsdWVGcm9tTW9kZWwoXG4gICAgbW9kZWxWYWx1ZTogRGF0ZVJhbmdlPEQ+XG4gICk6IEQgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTUFUX0RBVEVfUkFOR0VfSU5QVVRfUEFSRU5UKVxuICAgIHB1YmxpYyBfcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRhdGVBZGFwdGVyLCBkYXRlRm9ybWF0cyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBXZSBuZWVkIHRoZSBkYXRlIGlucHV0IHRvIHByb3ZpZGUgaXRzZWxmIGFzIGEgYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCBhbmQgYSBgVmFsaWRhdG9yYCwgd2hpbGVcbiAgICAvLyBpbmplY3RpbmcgaXRzIGBOZ0NvbnRyb2xgIHNvIHRoYXQgdGhlIGVycm9yIHN0YXRlIGlzIGhhbmRsZWQgY29ycmVjdGx5LiBUaGlzIGludHJvZHVjZXMgYVxuICAgIC8vIGNpcmN1bGFyIGRlcGVuZGVuY3ksIGJlY2F1c2UgYm90aCBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIGFuZCBgVmFsaWRhdG9yYCBkZXBlbmQgb24gdGhlIGlucHV0XG4gICAgLy8gaXRzZWxmLiBVc3VhbGx5IHdlIGNhbiB3b3JrIGFyb3VuZCBpdCBmb3IgdGhlIENWQSwgYnV0IHRoZXJlJ3Mgbm8gQVBJIHRvIGRvIGl0IGZvciB0aGVcbiAgICAvLyB2YWxpZGF0b3IuIFdlIHdvcmsgYXJvdW5kIGl0IGhlcmUgYnkgaW5qZWN0aW5nIHRoZSBgTmdDb250cm9sYCBpbiBgbmdPbkluaXRgLCBhZnRlclxuICAgIC8vIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gcmVzb2x2ZWQuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcbiAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLl9pbmplY3Rvci5nZXQoXG4gICAgICBOZ0NvbnRyb2wsXG4gICAgICBudWxsLFxuICAgICAgSW5qZWN0RmxhZ3MuU2VsZiB8IEluamVjdEZsYWdzLk9wdGlvbmFsXG4gICAgKTtcblxuICAgIGlmIChuZ0NvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sID0gbmdDb250cm9sO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgdGhpcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlIHRoZXJlIGFyZSBzb21lXG4gICAgICAvLyBlcnJvciB0cmlnZ2VycyB0aGF0IHdlIGNhbid0IHN1YnNjcmliZSB0byAoZS5nLiBwYXJlbnQgZm9ybSBzdWJtaXNzaW9ucykuIFRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgd2hhdGV2ZXIgbG9naWMgaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxuICAgICAgdGhpcy51cGRhdGVFcnJvclN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcGxhY2Vob2xkZXIgb2YgdGhlIGlucHV0LiAqL1xuICBfZ2V0UGxhY2Vob2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wbGFjZWhvbGRlcjtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBgaW5wdXRgIGV2ZW50cyBvbiB0aGUgaW5wdXQgZWxlbWVudC4gKi9cbiAgb3ZlcnJpZGUgX29uSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIHN1cGVyLl9vbklucHV0KHZhbHVlKTtcbiAgICB0aGlzLl9yYW5nZUlucHV0Ll9oYW5kbGVDaGlsZFZhbHVlQ2hhbmdlKCk7XG4gIH1cblxuICAvKiogT3BlbnMgdGhlIGRhdGVwaWNrZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBpbnB1dC4gKi9cbiAgcHJvdGVjdGVkIF9vcGVuUG9wdXAoKTogdm9pZCB7XG4gICAgdGhpcy5fcmFuZ2VJbnB1dC5fb3BlbkRhdGVwaWNrZXIoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIGRhdGUgZnJvbSB0aGUgcmFuZ2UgaW5wdXQuICovXG4gIF9nZXRNaW5EYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZUlucHV0Lm1pbjtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIGRhdGUgZnJvbSB0aGUgcmFuZ2UgaW5wdXQuICovXG4gIF9nZXRNYXhEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZUlucHV0Lm1heDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBkYXRlIGZpbHRlciBmdW5jdGlvbiBmcm9tIHRoZSByYW5nZSBpbnB1dC4gKi9cbiAgcHJvdGVjdGVkIF9nZXREYXRlRmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZUlucHV0LmRhdGVGaWx0ZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3BhcmVudERpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZUlucHV0Ll9ncm91cERpc2FibGVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zaG91bGRIYW5kbGVDaGFuZ2VFdmVudCh7XG4gICAgc291cmNlLFxuICB9OiBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8RGF0ZVJhbmdlPEQ+Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzb3VyY2UgIT09IHRoaXMuX3JhbmdlSW5wdXQuX3N0YXJ0SW5wdXQgJiZcbiAgICAgIHNvdXJjZSAhPT0gdGhpcy5fcmFuZ2VJbnB1dC5fZW5kSW5wdXRcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hc3NpZ25WYWx1ZVByb2dyYW1tYXRpY2FsbHkodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgc3VwZXIuX2Fzc2lnblZhbHVlUHJvZ3JhbW1hdGljYWxseSh2YWx1ZSk7XG4gICAgY29uc3Qgb3Bwb3NpdGUgPSAoXG4gICAgICB0aGlzID09PSB0aGlzLl9yYW5nZUlucHV0Ll9zdGFydElucHV0XG4gICAgICAgID8gdGhpcy5fcmFuZ2VJbnB1dC5fZW5kSW5wdXRcbiAgICAgICAgOiB0aGlzLl9yYW5nZUlucHV0Ll9zdGFydElucHV0XG4gICAgKSBhcyBNYXREYXRlUmFuZ2VJbnB1dFBhcnRCYXNlPEQ+IHwgdW5kZWZpbmVkO1xuICAgIG9wcG9zaXRlPy5fdmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgfVxufVxuXG5jb25zdCBfTWF0RGF0ZVJhbmdlSW5wdXRCYXNlID0gbWl4aW5FcnJvclN0YXRlKE1hdERhdGVSYW5nZUlucHV0UGFydEJhc2UpO1xuXG4vKiogSW5wdXQgZm9yIGVudGVyaW5nIHRoZSBzdGFydCBkYXRlIGluIGEgYG1hdC1kYXRlLXJhbmdlLWlucHV0YC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdFN0YXJ0RGF0ZV0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdtYXQtc3RhcnQtZGF0ZSBtYXQtZGF0ZS1yYW5nZS1pbnB1dC1pbm5lcicsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcbiAgICAnKGNoYW5nZSknOiAnX29uQ2hhbmdlKCknLFxuICAgICcoa2V5ZG93biknOiAnX29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2F0dHIuaWRdJzogJ19yYW5nZUlucHV0LmlkJyxcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIgPyBcImRpYWxvZ1wiIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOlxuICAgICAgJyhfcmFuZ2VJbnB1dC5yYW5nZVBpY2tlcj8ub3BlbmVkICYmIF9yYW5nZUlucHV0LnJhbmdlUGlja2VyLmlkKSB8fCBudWxsJyxcbiAgICAnW2F0dHIubWluXSc6XG4gICAgICAnX2dldE1pbkRhdGUoKSA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEoX2dldE1pbkRhdGUoKSkgOiBudWxsJyxcbiAgICAnW2F0dHIubWF4XSc6XG4gICAgICAnX2dldE1heERhdGUoKSA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEoX2dldE1heERhdGUoKSkgOiBudWxsJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gICAgdHlwZTogJ3RleHQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogTWF0U3RhcnREYXRlLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdFN0YXJ0RGF0ZSwgbXVsdGk6IHRydWUgfSxcbiAgXSxcbiAgLy8gVGhlc2UgbmVlZCB0byBiZSBzcGVjaWZpZWQgZXhwbGljaXRseSwgYmVjYXVzZSBzb21lIHRvb2xpbmcgZG9lc24ndFxuICAvLyBzZWVtIHRvIHBpY2sgdGhlbSB1cCBmcm9tIHRoZSBiYXNlIGNsYXNzLiBTZWUgIzIwOTMyLlxuICBvdXRwdXRzOiBbJ2RhdGVDaGFuZ2UnLCAnZGF0ZUlucHV0J10sXG4gIGlucHV0czogWydlcnJvclN0YXRlTWF0Y2hlciddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTdGFydERhdGU8RD5cbiAgZXh0ZW5kcyBfTWF0RGF0ZVJhbmdlSW5wdXRCYXNlPEQ+XG4gIGltcGxlbWVudHMgQ2FuVXBkYXRlRXJyb3JTdGF0ZVxue1xuICAvKiogVmFsaWRhdG9yIHRoYXQgY2hlY2tzIHRoYXQgdGhlIHN0YXJ0IGRhdGUgaXNuJ3QgYWZ0ZXIgdGhlIGVuZCBkYXRlLiAqL1xuICBwcml2YXRlIF9zdGFydFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXG4gICAgKTtcbiAgICBjb25zdCBlbmQgPSB0aGlzLl9tb2RlbCA/IHRoaXMuX21vZGVsLnNlbGVjdGlvbi5lbmQgOiBudWxsO1xuICAgIHJldHVybiAhc3RhcnQgfHwgIWVuZCB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShzdGFydCwgZW5kKSA8PSAwXG4gICAgICA/IG51bGxcbiAgICAgIDogeyBtYXRTdGFydERhdGVJbnZhbGlkOiB7IGVuZDogZW5kLCBhY3R1YWw6IHN0YXJ0IH0gfTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCkgcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgcmFuZ2VJbnB1dCxcbiAgICAgIGVsZW1lbnRSZWYsXG4gICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICBpbmplY3RvcixcbiAgICAgIHBhcmVudEZvcm0sXG4gICAgICBwYXJlbnRGb3JtR3JvdXAsXG4gICAgICBkYXRlQWRhcHRlcixcbiAgICAgIGRhdGVGb3JtYXRzXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAuLi5zdXBlci5fZ2V0VmFsaWRhdG9ycygpLFxuICAgIHRoaXMuX3N0YXJ0VmFsaWRhdG9yLFxuICBdKTtcblxuICBwcm90ZWN0ZWQgX2dldFZhbHVlRnJvbU1vZGVsKG1vZGVsVmFsdWU6IERhdGVSYW5nZTxEPikge1xuICAgIHJldHVybiBtb2RlbFZhbHVlLnN0YXJ0O1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9zaG91bGRIYW5kbGVDaGFuZ2VFdmVudChcbiAgICBjaGFuZ2U6IERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxEYXRlUmFuZ2U8RD4+XG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghc3VwZXIuX3Nob3VsZEhhbmRsZUNoYW5nZUV2ZW50KGNoYW5nZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICFjaGFuZ2Uub2xkVmFsdWU/LnN0YXJ0XG4gICAgICAgID8gISFjaGFuZ2Uuc2VsZWN0aW9uLnN0YXJ0XG4gICAgICAgIDogIWNoYW5nZS5zZWxlY3Rpb24uc3RhcnQgfHxcbiAgICAgICAgICAgICEhdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoXG4gICAgICAgICAgICAgIGNoYW5nZS5vbGRWYWx1ZS5zdGFydCxcbiAgICAgICAgICAgICAgY2hhbmdlLnNlbGVjdGlvbi5zdGFydFxuICAgICAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Fzc2lnblZhbHVlVG9Nb2RlbCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICBpZiAodGhpcy5fbW9kZWwpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gbmV3IERhdGVSYW5nZSh2YWx1ZSwgdGhpcy5fbW9kZWwuc2VsZWN0aW9uLmVuZCk7XG4gICAgICB0aGlzLl9tb2RlbC51cGRhdGVTZWxlY3Rpb24ocmFuZ2UsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfZm9ybWF0VmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgc3VwZXIuX2Zvcm1hdFZhbHVlKHZhbHVlKTtcblxuICAgIC8vIEFueSB0aW1lIHRoZSBpbnB1dCB2YWx1ZSBpcyByZWZvcm1hdHRlZCB3ZSBuZWVkIHRvIHRlbGwgdGhlIHBhcmVudC5cbiAgICB0aGlzLl9yYW5nZUlucHV0Ll9oYW5kbGVDaGlsZFZhbHVlQ2hhbmdlKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdmFsdWUgdGhhdCBzaG91bGQgYmUgdXNlZCB3aGVuIG1pcnJvcmluZyB0aGUgaW5wdXQncyBzaXplLiAqL1xuICBnZXRNaXJyb3JWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgdmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwID8gdmFsdWUgOiBlbGVtZW50LnBsYWNlaG9sZGVyO1xuICB9XG59XG5cbi8qKiBJbnB1dCBmb3IgZW50ZXJpbmcgdGhlIGVuZCBkYXRlIGluIGEgYG1hdC1kYXRlLXJhbmdlLWlucHV0YC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdEVuZERhdGVdJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbWF0LWVuZC1kYXRlIG1hdC1kYXRlLXJhbmdlLWlucHV0LWlubmVyJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknLFxuICAgICcoY2hhbmdlKSc6ICdfb25DaGFuZ2UoKScsXG4gICAgJyhrZXlkb3duKSc6ICdfb25LZXlkb3duKCRldmVudCknLFxuICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdfcmFuZ2VJbnB1dC5yYW5nZVBpY2tlciA/IFwiZGlhbG9nXCIgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6XG4gICAgICAnKF9yYW5nZUlucHV0LnJhbmdlUGlja2VyPy5vcGVuZWQgJiYgX3JhbmdlSW5wdXQucmFuZ2VQaWNrZXIuaWQpIHx8IG51bGwnLFxuICAgICdbYXR0ci5taW5dJzpcbiAgICAgICdfZ2V0TWluRGF0ZSgpID8gX2RhdGVBZGFwdGVyLnRvSXNvODYwMShfZ2V0TWluRGF0ZSgpKSA6IG51bGwnLFxuICAgICdbYXR0ci5tYXhdJzpcbiAgICAgICdfZ2V0TWF4RGF0ZSgpID8gX2RhdGVBZGFwdGVyLnRvSXNvODYwMShfZ2V0TWF4RGF0ZSgpKSA6IG51bGwnLFxuICAgICcoYmx1ciknOiAnX29uQmx1cigpJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBNYXRFbmREYXRlLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1hdEVuZERhdGUsIG11bHRpOiB0cnVlIH0sXG4gIF0sXG4gIC8vIFRoZXNlIG5lZWQgdG8gYmUgc3BlY2lmaWVkIGV4cGxpY2l0bHksIGJlY2F1c2Ugc29tZSB0b29saW5nIGRvZXNuJ3RcbiAgLy8gc2VlbSB0byBwaWNrIHRoZW0gdXAgZnJvbSB0aGUgYmFzZSBjbGFzcy4gU2VlICMyMDkzMi5cbiAgb3V0cHV0czogWydkYXRlQ2hhbmdlJywgJ2RhdGVJbnB1dCddLFxuICBpbnB1dHM6IFsnZXJyb3JTdGF0ZU1hdGNoZXInXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RW5kRGF0ZTxEPlxuICBleHRlbmRzIF9NYXREYXRlUmFuZ2VJbnB1dEJhc2U8RD5cbiAgaW1wbGVtZW50cyBDYW5VcGRhdGVFcnJvclN0YXRlXG57XG4gIC8qKiBWYWxpZGF0b3IgdGhhdCBjaGVja3MgdGhhdCB0aGUgZW5kIGRhdGUgaXNuJ3QgYmVmb3JlIHRoZSBzdGFydCBkYXRlLiAqL1xuICBwcml2YXRlIF9lbmRWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgZW5kID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKFxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICApO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fbW9kZWwgPyB0aGlzLl9tb2RlbC5zZWxlY3Rpb24uc3RhcnQgOiBudWxsO1xuICAgIHJldHVybiAhZW5kIHx8ICFzdGFydCB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShlbmQsIHN0YXJ0KSA+PSAwXG4gICAgICA/IG51bGxcbiAgICAgIDogeyBtYXRFbmREYXRlSW52YWxpZDogeyBzdGFydDogc3RhcnQsIGFjdHVhbDogZW5kIH0gfTtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX0lOUFVUX1BBUkVOVCkgcmFuZ2VJbnB1dDogTWF0RGF0ZVJhbmdlSW5wdXRQYXJlbnQ8RD4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBwYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgQE9wdGlvbmFsKCkgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUykgZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgcmFuZ2VJbnB1dCxcbiAgICAgIGVsZW1lbnRSZWYsXG4gICAgICBkZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICBpbmplY3RvcixcbiAgICAgIHBhcmVudEZvcm0sXG4gICAgICBwYXJlbnRGb3JtR3JvdXAsXG4gICAgICBkYXRlQWRhcHRlcixcbiAgICAgIGRhdGVGb3JtYXRzXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAuLi5zdXBlci5fZ2V0VmFsaWRhdG9ycygpLFxuICAgIHRoaXMuX2VuZFZhbGlkYXRvcixcbiAgXSk7XG5cbiAgcHJvdGVjdGVkIF9nZXRWYWx1ZUZyb21Nb2RlbChtb2RlbFZhbHVlOiBEYXRlUmFuZ2U8RD4pIHtcbiAgICByZXR1cm4gbW9kZWxWYWx1ZS5lbmQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3Nob3VsZEhhbmRsZUNoYW5nZUV2ZW50KFxuICAgIGNoYW5nZTogRGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPERhdGVSYW5nZTxEPj5cbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdXBlci5fc2hvdWxkSGFuZGxlQ2hhbmdlRXZlbnQoY2hhbmdlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIWNoYW5nZS5vbGRWYWx1ZT8uZW5kXG4gICAgICAgID8gISFjaGFuZ2Uuc2VsZWN0aW9uLmVuZFxuICAgICAgICA6ICFjaGFuZ2Uuc2VsZWN0aW9uLmVuZCB8fFxuICAgICAgICAgICAgISF0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShcbiAgICAgICAgICAgICAgY2hhbmdlLm9sZFZhbHVlLmVuZCxcbiAgICAgICAgICAgICAgY2hhbmdlLnNlbGVjdGlvbi5lbmRcbiAgICAgICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hc3NpZ25WYWx1ZVRvTW9kZWwodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgaWYgKHRoaXMuX21vZGVsKSB7XG4gICAgICBjb25zdCByYW5nZSA9IG5ldyBEYXRlUmFuZ2UodGhpcy5fbW9kZWwuc2VsZWN0aW9uLnN0YXJ0LCB2YWx1ZSk7XG4gICAgICB0aGlzLl9tb2RlbC51cGRhdGVTZWxlY3Rpb24ocmFuZ2UsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIF9vbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBJZiB0aGUgdXNlciBpcyBwcmVzc2luZyBiYWNrc3BhY2Ugb24gYW4gZW1wdHkgZW5kIGlucHV0LCBtb3ZlIGZvY3VzIGJhY2sgdG8gdGhlIHN0YXJ0LlxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fcmFuZ2VJbnB1dC5fc3RhcnRJbnB1dC5mb2N1cygpO1xuICAgIH1cblxuICAgIHN1cGVyLl9vbktleWRvd24oZXZlbnQpO1xuICB9XG59XG4iXX0=