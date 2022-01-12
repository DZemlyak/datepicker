/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE, ESCAPE, hasModifierKey, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, ViewChild, isDevMode, } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Directionality } from '@angular/cdk/bidi';
import { DateAdapter } from '@matheo/datepicker/core';
import { MatCalendarBody, MatCalendarCell, } from './calendar-body';
import { createMissingDateImplError } from './datepicker-errors';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DateRange } from './date-selection-model';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, } from './date-range-selection-strategy';
import * as i0 from "@angular/core";
import * as i1 from "@matheo/datepicker/core";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./calendar-body";
import * as i4 from "@angular/common";
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
export class MatMonthView {
    constructor(_changeDetectorRef, _dateFormats, _dateAdapter, _dir, _rangeStrategy) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateFormats = _dateFormats;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._rangeStrategy = _rangeStrategy;
        this._rerenderSubscription = Subscription.EMPTY;
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits when any date is selected. */
        this._userSelection = new EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new EventEmitter();
        if (isDevMode()) {
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('MAT_DATE_FORMATS');
            }
        }
        this._activeDate = this._dateAdapter.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        const oldActiveDate = this._activeDate;
        const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) ||
            this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    /** The currently selected date. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (value instanceof DateRange) {
            this._selected = value;
        }
        else {
            this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        }
        this._setRanges(this._selected);
    }
    /** The minimum selectable date. */
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** The maximum selectable date. */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    ngAfterContentInit() {
        this._rerenderSubscription = this._dateAdapter.localeChanges
            .pipe(startWith(null))
            .subscribe(() => this._init());
    }
    ngOnChanges(changes) {
        const comparisonChange = changes['comparisonStart'] || changes['comparisonEnd'];
        if (comparisonChange && !comparisonChange.firstChange) {
            this._setRanges(this.selected);
        }
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
    }
    /** Handles when a new date is selected. */
    _dateSelected(event) {
        const date = event.value;
        const selectedYear = this._dateAdapter.getYear(this.activeDate);
        const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
        const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date, this._dateAdapter.getHours(this.activeDate), this._dateAdapter.getMinutes(this.activeDate), this._dateAdapter.getSeconds(this.activeDate), this._dateAdapter.getMilliseconds(this.activeDate));
        let rangeStartDate;
        let rangeEndDate;
        if (this._selected instanceof DateRange) {
            rangeStartDate = this._getDateInCurrentMonth(this._selected.start);
            rangeEndDate = this._getDateInCurrentMonth(this._selected.end);
        }
        else {
            rangeStartDate = rangeEndDate = this._getDateInCurrentMonth(this._selected);
        }
        if (rangeStartDate !== date || rangeEndDate !== date) {
            this.selectedChange.emit(selectedDate);
        }
        this._userSelection.emit({ value: selectedDate, event: event.event });
        this._previewStart = this._previewEnd = null;
        this._changeDetectorRef.markForCheck();
    }
    /** Handles keydown events on the calendar body when calendar is in month view. */
    _handleCalendarBodyKeydown(event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        const oldActiveDate = this._activeDate;
        const isRtl = this._isRtl();
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this._dateAdapter.getDate(this._activeDate));
                break;
            case PAGE_UP:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, -1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, 1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                this._selectionKeyPressed = true;
                if (this._canSelect(this._activeDate)) {
                    // Prevent unexpected default actions such as form submission.
                    // Note that we only prevent the default action here while the selection happens in
                    // `keyup` below. We can't do the selection here, because it can cause the calendar to
                    // reopen if focus is restored immediately. We also can't call `preventDefault` on `keyup`
                    // because it's too late (see #23305).
                    event.preventDefault();
                }
                return;
            case ESCAPE:
                // Abort the current range selection if the user presses escape mid-selection.
                if (this._previewEnd != null && !hasModifierKey(event)) {
                    this._previewStart = this._previewEnd = null;
                    this.selectedChange.emit(null);
                    this._userSelection.emit({ value: null, event });
                    event.preventDefault();
                    event.stopPropagation(); // Prevents the overlay from closing.
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    }
    /** Handles keyup events on the calendar body when calendar is in month view. */
    _handleCalendarBodyKeyup(event) {
        if (event.keyCode === SPACE || event.keyCode === ENTER) {
            if (this._selectionKeyPressed && this._canSelect(this._activeDate)) {
                this._dateSelected({ value: this._dateAdapter.getDate(this._activeDate), event });
            }
            this._selectionKeyPressed = false;
        }
    }
    /** Initializes this month view. */
    _init() {
        this._setRanges(this.selected);
        this._todayDate = this._getCellCompareValue(this._dateAdapter.today());
        this._monthLabel = this._dateFormats.display.monthLabel
            ? this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthLabel)
            : this._dateAdapter
                .getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase();
        let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset =
            (DAYS_PER_WEEK +
                this._dateAdapter.getDayOfWeek(firstOfMonth) -
                this._dateAdapter.getFirstDayOfWeek()) %
                DAYS_PER_WEEK;
        this._initWeekdays();
        this._createWeekCells();
        this._changeDetectorRef.markForCheck();
    }
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(movePreview) {
        this._matCalendarBody._focusActiveCell(movePreview);
    }
    /** Called when the user has activated a new cell and the preview needs to be updated. */
    _previewChanged({ event, value: cell }) {
        if (this._rangeStrategy) {
            // We can assume that this will be a range, because preview
            // events aren't fired for single date selections.
            const value = cell ? cell.rawValue : null;
            const previewRange = this._rangeStrategy.createPreview(value, this.selected, event);
            this._previewStart = this._getCellCompareValue(previewRange.start);
            this._previewEnd = this._getCellCompareValue(previewRange.end);
            // Note that here we need to use `detectChanges`, rather than `markForCheck`, because
            // the way `_focusActiveCell` is set up at the moment makes it fire at the wrong time
            // when navigating one month back using the keyboard which will cause this handler
            // to throw a "changed after checked" error when updating the preview state.
            this._changeDetectorRef.detectChanges();
        }
    }
    /** Initializes the weekdays. */
    _initWeekdays() {
        const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        let weekdays = longWeekdays.map((long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    }
    /** Creates MatCalendarCells for the dates in this month. */
    _createWeekCells() {
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        const dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            const enabled = this._shouldEnableDate(date);
            const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            const cellClasses = this.dateClass ? this.dateClass(date, 'month') : undefined;
            this._weeks[this._weeks.length - 1].push(new MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses, this._getCellCompareValue(date), date));
        }
    }
    /** Date filter for the month */
    _shouldEnableDate(date) {
        return (!!date &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) &&
            (!this.dateFilter || this.dateFilter(date, 'day')));
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    _getDateInCurrentMonth(date) {
        return date && this._hasSameMonthAndYear(date, this.activeDate)
            ? this._dateAdapter.getDate(date)
            : null;
    }
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    _hasSameMonthAndYear(d1, d2) {
        return !!(d1 &&
            d2 &&
            this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
            this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
    }
    /** Gets the value that will be used to one cell to another. */
    _getCellCompareValue(date) {
        if (date) {
            // We use the time since the Unix epoch to compare dates in this view, rather than the
            // cell values, because we need to support ranges that span across multiple months/years.
            const year = this._dateAdapter.getYear(date);
            const month = this._dateAdapter.getMonth(date);
            const day = this._dateAdapter.getDate(date);
            return new Date(year, month, day).getTime();
        }
        return null;
    }
    /** Determines whether the user has the RTL layout direction. */
    _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
    /** Sets the current range based on a model value. */
    _setRanges(selectedValue) {
        if (selectedValue instanceof DateRange) {
            this._rangeStart = this._getCellCompareValue(selectedValue.start);
            this._rangeEnd = this._getCellCompareValue(selectedValue.end);
            this._isRange = true;
        }
        else {
            this._rangeStart = this._rangeEnd = this._getCellCompareValue(selectedValue);
            this._isRange = false;
        }
        this._comparisonRangeStart = this._getCellCompareValue(this.comparisonStart);
        this._comparisonRangeEnd = this._getCellCompareValue(this.comparisonEnd);
    }
    /** Gets whether a date can be selected in the month view. */
    _canSelect(date) {
        return !this.dateFilter || this.dateFilter(date);
    }
}
/** @nocollapse */ /** @nocollapse */ MatMonthView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatMonthView, deps: [{ token: i0.ChangeDetectorRef }, { token: MAT_DATE_FORMATS, optional: true }, { token: i1.DateAdapter, optional: true }, { token: i2.Directionality, optional: true }, { token: MAT_DATE_RANGE_SELECTION_STRATEGY, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatMonthView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatMonthView, selector: "mat-month-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", comparisonStart: "comparisonStart", comparisonEnd: "comparisonEnd" }, outputs: { selectedChange: "selectedChange", _userSelection: "_userSelection", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "_matCalendarBody", first: true, predicate: MatCalendarBody, descendants: true }], exportAs: ["matMonthView"], usesOnChanges: true, ngImport: i0, template: "<table class=\"mat-calendar-table\" role=\"grid\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr>\r\n      <!-- For the day-of-the-week column header, we use an `<abbr>` element because VoiceOver\r\n           ignores the `aria-label`. ChromeVox, however, does not read the full name\r\n           for the `<abbr>`, so we still set `aria-label` on the header element. -->\r\n      <th scope=\"col\" *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">\r\n        <abbr class=\"mat-calendar-abbr\" [attr.title]=\"day.long\">{{day.narrow}}</abbr>\r\n      </th>\r\n    </tr>\r\n    <tr><th aria-hidden=\"true\" class=\"mat-calendar-table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n         [label]=\"_monthLabel\"\r\n         [rows]=\"_weeks\"\r\n         [todayValue]=\"_todayDate!\"\r\n         [startValue]=\"_rangeStart!\"\r\n         [endValue]=\"_rangeEnd!\"\r\n         [comparisonStart]=\"_comparisonRangeStart\"\r\n         [comparisonEnd]=\"_comparisonRangeEnd\"\r\n         [previewStart]=\"_previewStart\"\r\n         [previewEnd]=\"_previewEnd\"\r\n         [isRange]=\"_isRange\"\r\n         [labelMinRequiredCells]=\"3\"\r\n         [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\"\r\n         (selectedValueChange)=\"_dateSelected($event)\"\r\n         (previewChange)=\"_previewChanged($event)\"\r\n         (keyup)=\"_handleCalendarBodyKeyup($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n", components: [{ type: i3.MatCalendarBody, selector: "[mat-calendar-body]", inputs: ["label", "rows", "todayValue", "startValue", "endValue", "labelMinRequiredCells", "numCols", "activeCell", "isRange", "cellAspectRatio", "comparisonStart", "comparisonEnd", "previewStart", "previewEnd"], outputs: ["selectedValueChange", "previewChange"], exportAs: ["matCalendarBody"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatMonthView, decorators: [{
            type: Component,
            args: [{ selector: 'mat-month-view', exportAs: 'matMonthView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"mat-calendar-table\" role=\"grid\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr>\r\n      <!-- For the day-of-the-week column header, we use an `<abbr>` element because VoiceOver\r\n           ignores the `aria-label`. ChromeVox, however, does not read the full name\r\n           for the `<abbr>`, so we still set `aria-label` on the header element. -->\r\n      <th scope=\"col\" *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">\r\n        <abbr class=\"mat-calendar-abbr\" [attr.title]=\"day.long\">{{day.narrow}}</abbr>\r\n      </th>\r\n    </tr>\r\n    <tr><th aria-hidden=\"true\" class=\"mat-calendar-table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n         [label]=\"_monthLabel\"\r\n         [rows]=\"_weeks\"\r\n         [todayValue]=\"_todayDate!\"\r\n         [startValue]=\"_rangeStart!\"\r\n         [endValue]=\"_rangeEnd!\"\r\n         [comparisonStart]=\"_comparisonRangeStart\"\r\n         [comparisonEnd]=\"_comparisonRangeEnd\"\r\n         [previewStart]=\"_previewStart\"\r\n         [previewEnd]=\"_previewEnd\"\r\n         [isRange]=\"_isRange\"\r\n         [labelMinRequiredCells]=\"3\"\r\n         [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\"\r\n         (selectedValueChange)=\"_dateSelected($event)\"\r\n         (previewChange)=\"_previewChanged($event)\"\r\n         (keyup)=\"_handleCalendarBodyKeyup($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
                }] }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DATE_RANGE_SELECTION_STRATEGY]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], dateFilter: [{
                type: Input
            }], dateClass: [{
                type: Input
            }], comparisonStart: [{
                type: Input
            }], comparisonEnd: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], _userSelection: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }], _matCalendarBody: [{
                type: ViewChild,
                args: [MatCalendarBody]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL21vbnRoLXZpZXcudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9tb250aC12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sY0FBYyxHQUNmLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsRUFJVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQWtCLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUNMLGVBQWUsRUFDZixlQUFlLEdBR2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFFTCxpQ0FBaUMsR0FD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QzNFLENBQUM7SUFFRCw2REFBNkQ7SUFDckQsVUFBVSxDQUFDLElBQU87UUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDOzsrSUFyY1UsWUFBWSxtREE0SEQsZ0JBQWdCLHNIQUc1QixpQ0FBaUM7bUlBL0hoQyxZQUFZLHliQW9GWixlQUFlLGlHQzNKNUIsc2hEQStCQTsyRkR3Q2EsWUFBWTtrQkFQeEIsU0FBUzsrQkFDRSxnQkFBZ0IsWUFFaEIsY0FBYyxpQkFDVCxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzswQkE4SDVDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFDbkMsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxpQ0FBaUM7OzBCQUN4QyxRQUFROzRDQXRIUCxVQUFVO3NCQURiLEtBQUs7Z0JBa0JGLFFBQVE7c0JBRFgsS0FBSztnQkFpQkYsT0FBTztzQkFEVixLQUFLO2dCQVdGLE9BQU87c0JBRFYsS0FBSztnQkFVRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxhQUFhO3NCQUFyQixLQUFLO2dCQUdhLGNBQWM7c0JBQWhDLE1BQU07Z0JBR1ksY0FBYztzQkFBaEMsTUFBTTtnQkFJWSxnQkFBZ0I7c0JBQWxDLE1BQU07Z0JBR3FCLGdCQUFnQjtzQkFBM0MsU0FBUzt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gIERPV05fQVJST1csXHJcbiAgRU5ELFxyXG4gIEVOVEVSLFxyXG4gIEhPTUUsXHJcbiAgTEVGVF9BUlJPVyxcclxuICBQQUdFX0RPV04sXHJcbiAgUEFHRV9VUCxcclxuICBSSUdIVF9BUlJPVyxcclxuICBVUF9BUlJPVyxcclxuICBTUEFDRSxcclxuICBFU0NBUEUsXHJcbiAgaGFzTW9kaWZpZXJLZXksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBWaWV3Q2hpbGQsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIGlzRGV2TW9kZSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnQG1hdGhlby9kYXRlcGlja2VyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIE1hdENhbGVuZGFyQm9keSxcclxuICBNYXRDYWxlbmRhckNlbGwsXHJcbiAgTWF0Q2FsZW5kYXJVc2VyRXZlbnQsXHJcbiAgTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbixcclxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRlUmFuZ2UgfSBmcm9tICcuL2RhdGUtc2VsZWN0aW9uLW1vZGVsJztcclxuaW1wb3J0IHtcclxuICBNYXREYXRlUmFuZ2VTZWxlY3Rpb25TdHJhdGVneSxcclxuICBNQVRfREFURV9SQU5HRV9TRUxFQ1RJT05fU1RSQVRFR1ksXHJcbn0gZnJvbSAnLi9kYXRlLXJhbmdlLXNlbGVjdGlvbi1zdHJhdGVneSc7XHJcbmltcG9ydCB7IERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuXHJcbmNvbnN0IERBWVNfUEVSX1dFRUsgPSA3O1xyXG5cclxuLyoqXHJcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSBzaW5nbGUgbW9udGggaW4gdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LW1vbnRoLXZpZXcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnbW9udGgtdmlldy5odG1sJyxcclxuICBleHBvcnRBczogJ21hdE1vbnRoVmlldycsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdE1vbnRoVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIEZsYWcgdXNlZCB0byBmaWx0ZXIgb3V0IHNwYWNlL2VudGVyIGtleXVwIGV2ZW50cyB0aGF0IG9yaWdpbmF0ZWQgb3V0c2lkZSBvZiB0aGUgdmlldy4gKi9cclxuICBwcml2YXRlIF9zZWxlY3Rpb25LZXlQcmVzc2VkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbW9udGggdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSBtb250aCBhbmQgeWVhciBpcyBpZ25vcmVkKS5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbGlkRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gICAgaWYgKCF0aGlzLl9oYXNTYW1lTW9udGhBbmRZZWFyKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcclxuXHJcbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGwpIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVSYW5nZSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zZXRSYW5nZXModGhpcy5fc2VsZWN0ZWQpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cclxuICBASW5wdXQoKSBkYXRlQ2xhc3M6IE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD47XHJcblxyXG4gIC8qKiBTdGFydCBvZiB0aGUgY29tcGFyaXNvbiByYW5nZS4gKi9cclxuICBASW5wdXQoKSBjb21wYXJpc29uU3RhcnQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogRW5kIG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLiAqL1xyXG4gIEBJbnB1dCgpIGNvbXBhcmlzb25FbmQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RCB8IG51bGw+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBfdXNlclNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPE1hdENhbGVuZGFyVXNlckV2ZW50PEQgfCBudWxsPj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD4+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cclxuICBAVmlld0NoaWxkKE1hdENhbGVuZGFyQm9keSkgX21hdENhbGVuZGFyQm9keTogTWF0Q2FsZW5kYXJCb2R5O1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGlzIG1vbnRoIChlLmcuIFwiSmFudWFyeSAyMDE3XCIpLiAqL1xyXG4gIF9tb250aExhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLiAqL1xyXG4gIF93ZWVrczogTWF0Q2FsZW5kYXJDZWxsW11bXTtcclxuXHJcbiAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgaW4gdGhlIGZpcnN0IHJvdyBiZWZvcmUgdGhlIDFzdCBvZiB0aGUgbW9udGguICovXHJcbiAgX2ZpcnN0V2Vla09mZnNldDogbnVtYmVyO1xyXG5cclxuICAvKiogU3RhcnQgdmFsdWUgb2YgdGhlIGN1cnJlbnRseS1zaG93biBkYXRlIHJhbmdlLiAqL1xyXG4gIF9yYW5nZVN0YXJ0OiBudW1iZXIgfCBudWxsO1xyXG5cclxuICAvKiogRW5kIHZhbHVlIG9mIHRoZSBjdXJyZW50bHktc2hvd24gZGF0ZSByYW5nZS4gKi9cclxuICBfcmFuZ2VFbmQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBTdGFydCB2YWx1ZSBvZiB0aGUgY3VycmVudGx5LXNob3duIGNvbXBhcmlzb24gZGF0ZSByYW5nZS4gKi9cclxuICBfY29tcGFyaXNvblJhbmdlU3RhcnQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBFbmQgdmFsdWUgb2YgdGhlIGN1cnJlbnRseS1zaG93biBjb21wYXJpc29uIGRhdGUgcmFuZ2UuICovXHJcbiAgX2NvbXBhcmlzb25SYW5nZUVuZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgLyoqIFN0YXJ0IG9mIHRoZSBwcmV2aWV3IHJhbmdlLiAqL1xyXG4gIF9wcmV2aWV3U3RhcnQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBFbmQgb2YgdGhlIHByZXZpZXcgcmFuZ2UuICovXHJcbiAgX3ByZXZpZXdFbmQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBzZWxlY3RpbmcgYSByYW5nZSBvZiBkYXRlcy4gKi9cclxuICBfaXNSYW5nZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRvZGF5IGZhbGxzIG9uLiBOdWxsIGlmIHRvZGF5IGlzIGluIGFub3RoZXIgbW9udGguICovXHJcbiAgX3RvZGF5RGF0ZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBuYW1lcyBvZiB0aGUgd2Vla2RheXMuICovXHJcbiAgX3dlZWtkYXlzOiB7IGxvbmc6IHN0cmluZzsgbmFycm93OiBzdHJpbmcgfVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJlYWRvbmx5IF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyPzogRGlyZWN0aW9uYWxpdHksXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX1JBTkdFX1NFTEVDVElPTl9TVFJBVEVHWSlcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBwcml2YXRlIF9yYW5nZVN0cmF0ZWd5PzogTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8RD4sXHJcbiAgKSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcclxuICAgICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlcikge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHMpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXNcclxuICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2luaXQoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBjb21wYXJpc29uQ2hhbmdlID0gY2hhbmdlc1snY29tcGFyaXNvblN0YXJ0J10gfHwgY2hhbmdlc1snY29tcGFyaXNvbkVuZCddO1xyXG5cclxuICAgIGlmIChjb21wYXJpc29uQ2hhbmdlICYmICFjb21wYXJpc29uQ2hhbmdlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuX3NldFJhbmdlcyh0aGlzLnNlbGVjdGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cclxuICBfZGF0ZVNlbGVjdGVkKGV2ZW50OiBNYXRDYWxlbmRhclVzZXJFdmVudDxudW1iZXI+KSB7XHJcbiAgICBjb25zdCBkYXRlID0gZXZlbnQudmFsdWU7XHJcbiAgICBjb25zdCBzZWxlY3RlZFllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgIHNlbGVjdGVkWWVhcixcclxuICAgICAgc2VsZWN0ZWRNb250aCxcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgKTtcclxuICAgIGxldCByYW5nZVN0YXJ0RGF0ZTogbnVtYmVyIHwgbnVsbDtcclxuICAgIGxldCByYW5nZUVuZERhdGU6IG51bWJlciB8IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkIGluc3RhbmNlb2YgRGF0ZVJhbmdlKSB7XHJcbiAgICAgIHJhbmdlU3RhcnREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuX3NlbGVjdGVkLnN0YXJ0KTtcclxuICAgICAgcmFuZ2VFbmREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuX3NlbGVjdGVkLmVuZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRW5kRGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLl9zZWxlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJhbmdlU3RhcnREYXRlICE9PSBkYXRlIHx8IHJhbmdlRW5kRGF0ZSAhPT0gZGF0ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWREYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoeyB2YWx1ZTogc2VsZWN0ZWREYXRlLCBldmVudDogZXZlbnQuZXZlbnQgfSk7XHJcbiAgICB0aGlzLl9wcmV2aWV3U3RhcnQgPSB0aGlzLl9wcmV2aWV3RW5kID0gbnVsbDtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xyXG4gIF9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAvLyBUT0RPKG1tYWxlcmJhKTogV2UgY3VycmVudGx5IGFsbG93IGtleWJvYXJkIG5hdmlnYXRpb24gdG8gZGlzYWJsZWQgZGF0ZXMsIGJ1dCBqdXN0IHByZXZlbnRcclxuICAgIC8vIGRpc2FibGVkIG9uZXMgZnJvbSBiZWluZyBzZWxlY3RlZC4gVGhpcyBtYXkgbm90IGJlIGlkZWFsLCB3ZSBzaG91bGQgbG9vayBpbnRvIHdoZXRoZXJcclxuICAgIC8vIG5hdmlnYXRpb24gc2hvdWxkIHNraXAgb3ZlciBkaXNhYmxlZCBkYXRlcywgYW5kIGlmIHNvLCBob3cgdG8gaW1wbGVtZW50IHRoYXQgZWZmaWNpZW50bHkuXHJcblxyXG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuX2lzUnRsKCk7XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAxIDogLTEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCBpc1J0bCA/IC0xIDogMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsIC03KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBET1dOX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCA3KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBIT01FOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXHJcbiAgICAgICAgICAxIC0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEVORDpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5fYWN0aXZlRGF0ZSkgLVxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFBBR0VfVVA6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gZXZlbnQuYWx0S2V5XHJcbiAgICAgICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLTEpXHJcbiAgICAgICAgICA6IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIC0xKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBQQUdFX0RPV046XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gZXZlbnQuYWx0S2V5XHJcbiAgICAgICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgMSlcclxuICAgICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRU5URVI6XHJcbiAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uS2V5UHJlc3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYW5TZWxlY3QodGhpcy5fYWN0aXZlRGF0ZSkpIHtcclxuICAgICAgICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAgICAgICAgICAvLyBOb3RlIHRoYXQgd2Ugb25seSBwcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBoZXJlIHdoaWxlIHRoZSBzZWxlY3Rpb24gaGFwcGVucyBpblxyXG4gICAgICAgICAgLy8gYGtleXVwYCBiZWxvdy4gV2UgY2FuJ3QgZG8gdGhlIHNlbGVjdGlvbiBoZXJlLCBiZWNhdXNlIGl0IGNhbiBjYXVzZSB0aGUgY2FsZW5kYXIgdG9cclxuICAgICAgICAgIC8vIHJlb3BlbiBpZiBmb2N1cyBpcyByZXN0b3JlZCBpbW1lZGlhdGVseS4gV2UgYWxzbyBjYW4ndCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb24gYGtleXVwYFxyXG4gICAgICAgICAgLy8gYmVjYXVzZSBpdCdzIHRvbyBsYXRlIChzZWUgIzIzMzA1KS5cclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBFU0NBUEU6XHJcbiAgICAgICAgLy8gQWJvcnQgdGhlIGN1cnJlbnQgcmFuZ2Ugc2VsZWN0aW9uIGlmIHRoZSB1c2VyIHByZXNzZXMgZXNjYXBlIG1pZC1zZWxlY3Rpb24uXHJcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpZXdFbmQgIT0gbnVsbCAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XHJcbiAgICAgICAgICB0aGlzLl9wcmV2aWV3U3RhcnQgPSB0aGlzLl9wcmV2aWV3RW5kID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChudWxsKTtcclxuICAgICAgICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCh7IHZhbHVlOiBudWxsLCBldmVudCB9KTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudHMgdGhlIG92ZXJsYXkgZnJvbSBjbG9zaW5nLlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG9uJ3QgcHJldmVudCBkZWZhdWx0IG9yIGZvY3VzIGFjdGl2ZSBjZWxsIG9uIGtleXMgdGhhdCB3ZSBkb24ndCBleHBsaWNpdGx5IGhhbmRsZS5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuYWN0aXZlRGF0ZSkpIHtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMga2V5dXAgZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cclxuICBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBTUEFDRSB8fCBldmVudC5rZXlDb2RlID09PSBFTlRFUikge1xyXG4gICAgICBpZiAodGhpcy5fc2VsZWN0aW9uS2V5UHJlc3NlZCAmJiB0aGlzLl9jYW5TZWxlY3QodGhpcy5fYWN0aXZlRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLl9kYXRlU2VsZWN0ZWQoeyB2YWx1ZTogdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLl9hY3RpdmVEYXRlKSwgZXZlbnQgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvbktleVByZXNzZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIG1vbnRoIHZpZXcuICovXHJcbiAgX2luaXQoKSB7XHJcbiAgICB0aGlzLl9zZXRSYW5nZXModGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLl90b2RheURhdGUgPSB0aGlzLl9nZXRDZWxsQ29tcGFyZVZhbHVlKHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCkpO1xyXG4gICAgdGhpcy5fbW9udGhMYWJlbCA9IHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhMYWJlbFxyXG4gICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhMYWJlbClcclxuICAgICAgOiB0aGlzLl9kYXRlQWRhcHRlclxyXG4gICAgICAgIC5nZXRNb250aE5hbWVzKCdzaG9ydCcpXHJcbiAgICAgIFt0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpXS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xyXG5cclxuICAgIGxldCBmaXJzdE9mTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIDEsXHJcbiAgICApO1xyXG4gICAgdGhpcy5fZmlyc3RXZWVrT2Zmc2V0ID1cclxuICAgICAgKERBWVNfUEVSX1dFRUsgK1xyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldERheU9mV2VlayhmaXJzdE9mTW9udGgpIC1cclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRGaXJzdERheU9mV2VlaygpKSAlXHJcbiAgICAgIERBWVNfUEVSX1dFRUs7XHJcblxyXG4gICAgdGhpcy5faW5pdFdlZWtkYXlzKCk7XHJcbiAgICB0aGlzLl9jcmVhdGVXZWVrQ2VsbHMoKTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXHJcbiAgX2ZvY3VzQWN0aXZlQ2VsbChtb3ZlUHJldmlldz86IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX21hdENhbGVuZGFyQm9keS5fZm9jdXNBY3RpdmVDZWxsKG1vdmVQcmV2aWV3KTtcclxuICB9XHJcblxyXG4gIC8qKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgYWN0aXZhdGVkIGEgbmV3IGNlbGwgYW5kIHRoZSBwcmV2aWV3IG5lZWRzIHRvIGJlIHVwZGF0ZWQuICovXHJcbiAgX3ByZXZpZXdDaGFuZ2VkKHsgZXZlbnQsIHZhbHVlOiBjZWxsIH06IE1hdENhbGVuZGFyVXNlckV2ZW50PE1hdENhbGVuZGFyQ2VsbDxEPiB8IG51bGw+KSB7XHJcbiAgICBpZiAodGhpcy5fcmFuZ2VTdHJhdGVneSkge1xyXG4gICAgICAvLyBXZSBjYW4gYXNzdW1lIHRoYXQgdGhpcyB3aWxsIGJlIGEgcmFuZ2UsIGJlY2F1c2UgcHJldmlld1xyXG4gICAgICAvLyBldmVudHMgYXJlbid0IGZpcmVkIGZvciBzaW5nbGUgZGF0ZSBzZWxlY3Rpb25zLlxyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNlbGwgPyBjZWxsLnJhd1ZhbHVlISA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHByZXZpZXdSYW5nZSA9IHRoaXMuX3JhbmdlU3RyYXRlZ3kuY3JlYXRlUHJldmlldyhcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICB0aGlzLnNlbGVjdGVkIGFzIERhdGVSYW5nZTxEPixcclxuICAgICAgICBldmVudCxcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fcHJldmlld1N0YXJ0ID0gdGhpcy5fZ2V0Q2VsbENvbXBhcmVWYWx1ZShwcmV2aWV3UmFuZ2Uuc3RhcnQpO1xyXG4gICAgICB0aGlzLl9wcmV2aWV3RW5kID0gdGhpcy5fZ2V0Q2VsbENvbXBhcmVWYWx1ZShwcmV2aWV3UmFuZ2UuZW5kKTtcclxuXHJcbiAgICAgIC8vIE5vdGUgdGhhdCBoZXJlIHdlIG5lZWQgdG8gdXNlIGBkZXRlY3RDaGFuZ2VzYCwgcmF0aGVyIHRoYW4gYG1hcmtGb3JDaGVja2AsIGJlY2F1c2VcclxuICAgICAgLy8gdGhlIHdheSBgX2ZvY3VzQWN0aXZlQ2VsbGAgaXMgc2V0IHVwIGF0IHRoZSBtb21lbnQgbWFrZXMgaXQgZmlyZSBhdCB0aGUgd3JvbmcgdGltZVxyXG4gICAgICAvLyB3aGVuIG5hdmlnYXRpbmcgb25lIG1vbnRoIGJhY2sgdXNpbmcgdGhlIGtleWJvYXJkIHdoaWNoIHdpbGwgY2F1c2UgdGhpcyBoYW5kbGVyXHJcbiAgICAgIC8vIHRvIHRocm93IGEgXCJjaGFuZ2VkIGFmdGVyIGNoZWNrZWRcIiBlcnJvciB3aGVuIHVwZGF0aW5nIHRoZSBwcmV2aWV3IHN0YXRlLlxyXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIHdlZWtkYXlzLiAqL1xyXG4gIHByaXZhdGUgX2luaXRXZWVrZGF5cygpIHtcclxuICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcclxuICAgIGNvbnN0IG5hcnJvd1dlZWtkYXlzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ25hcnJvdycpO1xyXG4gICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKTtcclxuXHJcbiAgICAvLyBSb3RhdGUgdGhlIGxhYmVscyBmb3IgZGF5cyBvZiB0aGUgd2VlayBiYXNlZCBvbiB0aGUgY29uZmlndXJlZCBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBsZXQgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XHJcbiAgICAgIHJldHVybiB7IGxvbmcsIG5hcnJvdzogbmFycm93V2Vla2RheXNbaV0gfTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fd2Vla2RheXMgPSB3ZWVrZGF5cy5zbGljZShmaXJzdERheU9mV2VlaykuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlcyBNYXRDYWxlbmRhckNlbGxzIGZvciB0aGUgZGF0ZXMgaW4gdGhpcyBtb250aC4gKi9cclxuICBwcml2YXRlIF9jcmVhdGVXZWVrQ2VsbHMoKSB7XHJcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlTmFtZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlTmFtZXMoKTtcclxuICAgIHRoaXMuX3dlZWtzID0gW1tdXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBjZWxsID0gdGhpcy5fZmlyc3RXZWVrT2Zmc2V0OyBpIDwgZGF5c0luTW9udGg7IGkrKywgY2VsbCsrKSB7XHJcbiAgICAgIGlmIChjZWxsID09IERBWVNfUEVSX1dFRUspIHtcclxuICAgICAgICB0aGlzLl93ZWVrcy5wdXNoKFtdKTtcclxuICAgICAgICBjZWxsID0gMDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICBpICsgMSxcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZW5hYmxlZCA9IHRoaXMuX3Nob3VsZEVuYWJsZURhdGUoZGF0ZSk7XHJcbiAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LmRhdGVBMTF5TGFiZWwpO1xyXG4gICAgICBjb25zdCBjZWxsQ2xhc3NlcyA9IHRoaXMuZGF0ZUNsYXNzID8gdGhpcy5kYXRlQ2xhc3MoZGF0ZSwgJ21vbnRoJykgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICB0aGlzLl93ZWVrc1t0aGlzLl93ZWVrcy5sZW5ndGggLSAxXS5wdXNoKFxyXG4gICAgICAgIG5ldyBNYXRDYWxlbmRhckNlbGw8RD4oXHJcbiAgICAgICAgICBpICsgMSxcclxuICAgICAgICAgIGRhdGVOYW1lc1tpXSxcclxuICAgICAgICAgIGFyaWFMYWJlbCxcclxuICAgICAgICAgIGVuYWJsZWQsXHJcbiAgICAgICAgICBjZWxsQ2xhc3NlcyxcclxuICAgICAgICAgIHRoaXMuX2dldENlbGxDb21wYXJlVmFsdWUoZGF0ZSkhLFxyXG4gICAgICAgICAgZGF0ZSxcclxuICAgICAgICApLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIERhdGUgZmlsdGVyIGZvciB0aGUgbW9udGggKi9cclxuICBwcml2YXRlIF9zaG91bGRFbmFibGVEYXRlKGRhdGU6IEQpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICEhZGF0ZSAmJlxyXG4gICAgICAoIXRoaXMubWluRGF0ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXHJcbiAgICAgICghdGhpcy5tYXhEYXRlIHx8IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMCkgJiZcclxuICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdkYXknKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBkYXRlIGluIHRoaXMgbW9udGggdGhhdCB0aGUgZ2l2ZW4gRGF0ZSBmYWxscyBvbi5cclxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIERhdGUgaXMgaW4gYW5vdGhlciBtb250aC5cclxuICAgKi9cclxuICBwcml2YXRlIF9nZXREYXRlSW5DdXJyZW50TW9udGgoZGF0ZTogRCB8IG51bGwpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIHJldHVybiBkYXRlICYmIHRoaXMuX2hhc1NhbWVNb250aEFuZFllYXIoZGF0ZSwgdGhpcy5hY3RpdmVEYXRlKVxyXG4gICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUoZGF0ZSlcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSAyIGRhdGVzIGFyZSBub24tbnVsbCBhbmQgZmFsbCB3aXRoaW4gdGhlIHNhbWUgbW9udGggb2YgdGhlIHNhbWUgeWVhci4gKi9cclxuICBwcml2YXRlIF9oYXNTYW1lTW9udGhBbmRZZWFyKGQxOiBEIHwgbnVsbCwgZDI6IEQgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gISEoXHJcbiAgICAgIGQxICYmXHJcbiAgICAgIGQyICYmXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKGQxKSA9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aChkMikgJiZcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkMSkgPT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkMilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB0aGUgdmFsdWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gb25lIGNlbGwgdG8gYW5vdGhlci4gKi9cclxuICBwcml2YXRlIF9nZXRDZWxsQ29tcGFyZVZhbHVlKGRhdGU6IEQgfCBudWxsKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICBpZiAoZGF0ZSkge1xyXG4gICAgICAvLyBXZSB1c2UgdGhlIHRpbWUgc2luY2UgdGhlIFVuaXggZXBvY2ggdG8gY29tcGFyZSBkYXRlcyBpbiB0aGlzIHZpZXcsIHJhdGhlciB0aGFuIHRoZVxyXG4gICAgICAvLyBjZWxsIHZhbHVlcywgYmVjYXVzZSB3ZSBuZWVkIHRvIHN1cHBvcnQgcmFuZ2VzIHRoYXQgc3BhbiBhY3Jvc3MgbXVsdGlwbGUgbW9udGhzL3llYXJzLlxyXG4gICAgICBjb25zdCB5ZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKTtcclxuICAgICAgY29uc3QgbW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aChkYXRlKTtcclxuICAgICAgY29uc3QgZGF5ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKTtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpLmdldFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBSVEwgbGF5b3V0IGRpcmVjdGlvbi4gKi9cclxuICBwcml2YXRlIF9pc1J0bCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJztcclxuICB9XHJcblxyXG4gIC8qKiBTZXRzIHRoZSBjdXJyZW50IHJhbmdlIGJhc2VkIG9uIGEgbW9kZWwgdmFsdWUuICovXHJcbiAgcHJpdmF0ZSBfc2V0UmFuZ2VzKHNlbGVjdGVkVmFsdWU6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsKSB7XHJcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSBpbnN0YW5jZW9mIERhdGVSYW5nZSkge1xyXG4gICAgICB0aGlzLl9yYW5nZVN0YXJ0ID0gdGhpcy5fZ2V0Q2VsbENvbXBhcmVWYWx1ZShzZWxlY3RlZFZhbHVlLnN0YXJ0KTtcclxuICAgICAgdGhpcy5fcmFuZ2VFbmQgPSB0aGlzLl9nZXRDZWxsQ29tcGFyZVZhbHVlKHNlbGVjdGVkVmFsdWUuZW5kKTtcclxuICAgICAgdGhpcy5faXNSYW5nZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yYW5nZVN0YXJ0ID0gdGhpcy5fcmFuZ2VFbmQgPSB0aGlzLl9nZXRDZWxsQ29tcGFyZVZhbHVlKHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICB0aGlzLl9pc1JhbmdlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29tcGFyaXNvblJhbmdlU3RhcnQgPSB0aGlzLl9nZXRDZWxsQ29tcGFyZVZhbHVlKHRoaXMuY29tcGFyaXNvblN0YXJ0KTtcclxuICAgIHRoaXMuX2NvbXBhcmlzb25SYW5nZUVuZCA9IHRoaXMuX2dldENlbGxDb21wYXJlVmFsdWUodGhpcy5jb21wYXJpc29uRW5kKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXRzIHdoZXRoZXIgYSBkYXRlIGNhbiBiZSBzZWxlY3RlZCBpbiB0aGUgbW9udGggdmlldy4gKi9cclxuICBwcml2YXRlIF9jYW5TZWxlY3QoZGF0ZTogRCkge1xyXG4gICAgcmV0dXJuICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpO1xyXG4gIH1cclxufVxyXG4iLCI8dGFibGUgY2xhc3M9XCJtYXQtY2FsZW5kYXItdGFibGVcIiByb2xlPVwiZ3JpZFwiPlxyXG4gIDx0aGVhZCBjbGFzcz1cIm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXJcIj5cclxuICAgIDx0cj5cclxuICAgICAgPCEtLSBGb3IgdGhlIGRheS1vZi10aGUtd2VlayBjb2x1bW4gaGVhZGVyLCB3ZSB1c2UgYW4gYDxhYmJyPmAgZWxlbWVudCBiZWNhdXNlIFZvaWNlT3ZlclxyXG4gICAgICAgICAgIGlnbm9yZXMgdGhlIGBhcmlhLWxhYmVsYC4gQ2hyb21lVm94LCBob3dldmVyLCBkb2VzIG5vdCByZWFkIHRoZSBmdWxsIG5hbWVcclxuICAgICAgICAgICBmb3IgdGhlIGA8YWJicj5gLCBzbyB3ZSBzdGlsbCBzZXQgYGFyaWEtbGFiZWxgIG9uIHRoZSBoZWFkZXIgZWxlbWVudC4gLS0+XHJcbiAgICAgIDx0aCBzY29wZT1cImNvbFwiICpuZ0Zvcj1cImxldCBkYXkgb2YgX3dlZWtkYXlzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJkYXkubG9uZ1wiPlxyXG4gICAgICAgIDxhYmJyIGNsYXNzPVwibWF0LWNhbGVuZGFyLWFiYnJcIiBbYXR0ci50aXRsZV09XCJkYXkubG9uZ1wiPnt7ZGF5Lm5hcnJvd319PC9hYmJyPlxyXG4gICAgICA8L3RoPlxyXG4gICAgPC90cj5cclxuICAgIDx0cj48dGggYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3M9XCJtYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyLWRpdmlkZXJcIiBjb2xzcGFuPVwiN1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvdGg+PC90cj5cclxuICA8L3RoZWFkPlxyXG4gIDx0Ym9keSBtYXQtY2FsZW5kYXItYm9keVxyXG4gICAgICAgICBbbGFiZWxdPVwiX21vbnRoTGFiZWxcIlxyXG4gICAgICAgICBbcm93c109XCJfd2Vla3NcIlxyXG4gICAgICAgICBbdG9kYXlWYWx1ZV09XCJfdG9kYXlEYXRlIVwiXHJcbiAgICAgICAgIFtzdGFydFZhbHVlXT1cIl9yYW5nZVN0YXJ0IVwiXHJcbiAgICAgICAgIFtlbmRWYWx1ZV09XCJfcmFuZ2VFbmQhXCJcclxuICAgICAgICAgW2NvbXBhcmlzb25TdGFydF09XCJfY29tcGFyaXNvblJhbmdlU3RhcnRcIlxyXG4gICAgICAgICBbY29tcGFyaXNvbkVuZF09XCJfY29tcGFyaXNvblJhbmdlRW5kXCJcclxuICAgICAgICAgW3ByZXZpZXdTdGFydF09XCJfcHJldmlld1N0YXJ0XCJcclxuICAgICAgICAgW3ByZXZpZXdFbmRdPVwiX3ByZXZpZXdFbmRcIlxyXG4gICAgICAgICBbaXNSYW5nZV09XCJfaXNSYW5nZVwiXHJcbiAgICAgICAgIFtsYWJlbE1pblJlcXVpcmVkQ2VsbHNdPVwiM1wiXHJcbiAgICAgICAgIFthY3RpdmVDZWxsXT1cIl9kYXRlQWRhcHRlci5nZXREYXRlKGFjdGl2ZURhdGUpIC0gMVwiXHJcbiAgICAgICAgIChzZWxlY3RlZFZhbHVlQ2hhbmdlKT1cIl9kYXRlU2VsZWN0ZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgIChwcmV2aWV3Q2hhbmdlKT1cIl9wcmV2aWV3Q2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleXVwKT1cIl9oYW5kbGVDYWxlbmRhckJvZHlLZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oJGV2ZW50KVwiPlxyXG4gIDwvdGJvZHk+XHJcbjwvdGFibGU+XHJcbiJdfQ==