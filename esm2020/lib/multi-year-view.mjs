/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, SPACE, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, ViewChild, ViewEncapsulation, isDevMode, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DateAdapter } from './core';
import { MatCalendarBody, MatCalendarCell, } from './calendar-body';
import { createMissingDateImplError } from './datepicker-errors';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DateRange } from './date-selection-model';
import * as i0 from "@angular/core";
import * as i1 from "./core";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./calendar-body";
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
export class MatMultiYearView {
    constructor(_changeDetectorRef, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._rerenderSubscription = Subscription.EMPTY;
        /** consts moved as inputs */
        this.yearsPerPage = 24;
        this.yearsPerRow = 4;
        /** Emits when a new year is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits the selected year. This doesn't imply a change on the selected date */
        this.yearSelected = new EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new EventEmitter();
        if (!this._dateAdapter && isDevMode()) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this._dateAdapter.today();
    }
    /** The date to display in this multi-year view (everything other than the year is ignored). */
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        let oldActiveDate = this._activeDate;
        const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (!isSameMultiYearView(this._dateAdapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate, this.yearsPerPage)) {
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
        this._setSelectedYear(value);
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
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
    }
    /** Initializes this multi-year view. */
    _init() {
        this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
        // We want a range years such that we maximize the number of
        // enabled dates visible at once. This prevents issues where the minimum year
        // is the last item of a page OR the maximum year is the first item of a page.
        // The offset from the active year to the "slot" for the starting year is the
        // *actual* first rendered year in the multi-year view.
        const activeYear = this._dateAdapter.getYear(this._activeDate);
        const minYearOfPage = activeYear -
            getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate, this.yearsPerPage);
        this._years = [];
        for (let i = 0, row = []; i < this.yearsPerPage; i++) {
            row.push(minYearOfPage + i);
            if (row.length == this.yearsPerRow) {
                this._years.push(row.map((year) => this._createCellForYear(year)));
                row = [];
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /** Handles when a new year is selected. */
    _yearSelected(event) {
        const year = event.value;
        this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
        let month = this._dateAdapter.getMonth(this.activeDate);
        let daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth), this._dateAdapter.getHours(this.activeDate), this._dateAdapter.getMinutes(this.activeDate), this._dateAdapter.getSeconds(this.activeDate), this._dateAdapter.getMilliseconds(this.activeDate)));
    }
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeydown(event) {
        const oldActiveDate = this._activeDate;
        const isRtl = this._isRtl();
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -this.yearsPerRow);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, this.yearsPerRow);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate, this.yearsPerPage));
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, this.yearsPerPage -
                    getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate, this.yearsPerPage) -
                    1);
                break;
            case PAGE_UP:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -this.yearsPerPage * 10 : -this.yearsPerPage);
                break;
            case PAGE_DOWN:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? this.yearsPerPage * 10 : this.yearsPerPage);
                break;
            case ENTER:
            case SPACE:
                // Note that we only prevent the default action here while the selection happens in
                // `keyup` below. We can't do the selection here, because it can cause the calendar to
                // reopen if focus is restored immediately. We also can't call `preventDefault` on `keyup`
                // because it's too late (see #23305).
                this._selectionKeyPressed = true;
                break;
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
    /** Handles keyup events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeyup(event) {
        if (event.keyCode === SPACE || event.keyCode === ENTER) {
            if (this._selectionKeyPressed) {
                this._yearSelected({
                    value: this._dateAdapter.getYear(this._activeDate),
                    event,
                });
            }
            this._selectionKeyPressed = false;
        }
    }
    _getActiveCell() {
        return getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate, this.yearsPerPage);
    }
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell() {
        this._matCalendarBody._focusActiveCell();
    }
    /** Creates an MatCalendarCell for the given year. */
    _createCellForYear(year) {
        const date = this._dateAdapter.createDate(year, 0, 1);
        const yearName = this._dateAdapter.getYearName(date);
        const cellClasses = this.dateClass
            ? this.dateClass(date, 'multi-year')
            : undefined;
        return new MatCalendarCell(year, yearName, yearName, this._shouldEnableYear(year), cellClasses);
    }
    /** Whether the given year is enabled. */
    _shouldEnableYear(year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined ||
            year === null ||
            (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this._dateAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        const firstOfYear = this._dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this._dateAdapter.getYear(date) == year; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date, 'year')) {
                return true;
            }
        }
        return false;
    }
    /** Determines whether the user has the RTL layout direction. */
    _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
    /** Sets the currently-highlighted year based on a model value. */
    _setSelectedYear(value) {
        this._selectedYear = null;
        if (value instanceof DateRange) {
            const displayValue = value.start || value.end;
            if (displayValue) {
                this._selectedYear = this._dateAdapter.getYear(displayValue);
            }
        }
        else if (value) {
            this._selectedYear = this._dateAdapter.getYear(value);
        }
    }
}
/** @nocollapse */ /** @nocollapse */ MatMultiYearView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatMultiYearView, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DateAdapter, optional: true }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatMultiYearView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatMultiYearView, selector: "mat-multi-year-view", inputs: { yearsPerPage: "yearsPerPage", yearsPerRow: "yearsPerRow", activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "_matCalendarBody", first: true, predicate: MatCalendarBody, descendants: true }], exportAs: ["matMultiYearView"], ngImport: i0, template: "<table class=\"mat-calendar-table\" role=\"grid\">\r\n  <thead aria-hidden=\"true\" class=\"mat-calendar-table-header\">\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n         [rows]=\"_years\"\r\n         [todayValue]=\"_todayYear\"\r\n         [startValue]=\"_selectedYear!\"\r\n         [endValue]=\"_selectedYear!\"\r\n         [numCols]=\"yearsPerRow\"\r\n         [cellAspectRatio]=\"yearsPerRow / 7\"\r\n         [activeCell]=\"_getActiveCell()\"\r\n         (selectedValueChange)=\"_yearSelected($event)\"\r\n         (keyup)=\"_handleCalendarBodyKeyup($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n", components: [{ type: i3.MatCalendarBody, selector: "[mat-calendar-body]", inputs: ["label", "rows", "todayValue", "startValue", "endValue", "labelMinRequiredCells", "numCols", "activeCell", "isRange", "cellAspectRatio", "comparisonStart", "comparisonEnd", "previewStart", "previewEnd"], outputs: ["selectedValueChange", "previewChange"], exportAs: ["matCalendarBody"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatMultiYearView, decorators: [{
            type: Component,
            args: [{ selector: 'mat-multi-year-view', exportAs: 'matMultiYearView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"mat-calendar-table\" role=\"grid\">\r\n  <thead aria-hidden=\"true\" class=\"mat-calendar-table-header\">\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n         [rows]=\"_years\"\r\n         [todayValue]=\"_todayYear\"\r\n         [startValue]=\"_selectedYear!\"\r\n         [endValue]=\"_selectedYear!\"\r\n         [numCols]=\"yearsPerRow\"\r\n         [cellAspectRatio]=\"yearsPerRow / 7\"\r\n         [activeCell]=\"_getActiveCell()\"\r\n         (selectedValueChange)=\"_yearSelected($event)\"\r\n         (keyup)=\"_handleCalendarBodyKeyup($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { yearsPerPage: [{
                type: Input
            }], yearsPerRow: [{
                type: Input
            }], activeDate: [{
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
            }], selectedChange: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }], _matCalendarBody: [{
                type: ViewChild,
                args: [MatCalendarBody]
            }] } });
export function isSameMultiYearView(dateAdapter, date1, date2, minDate, maxDate, yearsPerPage) {
    const year1 = dateAdapter.getYear(date1);
    const year2 = dateAdapter.getYear(date2);
    const startingYear = getStartingYear(dateAdapter, minDate, maxDate, yearsPerPage);
    return (Math.floor((year1 - startingYear) / yearsPerPage) ===
        Math.floor((year2 - startingYear) / yearsPerPage));
}
/**
 * When the multi-year view is first opened, the active year will be in view.
 * So we compute how many years are between the active year and the *slot* where our
 * "startingYear" will render when paged into view.
 */
export function getActiveOffset(dateAdapter, activeDate, minDate, maxDate, yearsPerPage) {
    const activeYear = dateAdapter.getYear(activeDate);
    return euclideanModulo(activeYear - getStartingYear(dateAdapter, minDate, maxDate, yearsPerPage), yearsPerPage);
}
/**
 * We pick a "starting" year such that either the maximum year would be at the end
 * or the minimum year would be at the beginning of a page.
 */
function getStartingYear(dateAdapter, minDate, maxDate, yearsPerPage) {
    let startingYear = 0;
    if (maxDate) {
        const maxYear = dateAdapter.getYear(maxDate);
        startingYear = maxYear - yearsPerPage + 1;
    }
    else if (minDate) {
        startingYear = dateAdapter.getYear(minDate);
    }
    return startingYear;
}
/** Gets remainder that is non-negative, even if first number is negative */
function euclideanModulo(a, b) {
    return ((a % b) + b) % b;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGkteWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvbXVsdGkteWVhci12aWV3LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvbXVsdGkteWVhci12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssR0FDTixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUVqQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDckMsT0FBTyxFQUNMLGVBQWUsRUFDZixlQUFlLEdBR2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUduRDs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZ0gzQixZQUNVLGtCQUFxQyxFQUMxQixZQUE0QixFQUMzQixJQUFxQjtRQUZqQyx1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QWUsQ0FDN0IsV0FBMkIsRUFDM0IsVUFBYSxFQUNiLE9BQWlCLEVBQ2pCLE9BQWlCLEVBQ2pCLFlBQW9CO0lBRXBCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsT0FBTyxlQUFlLENBQ3BCLFVBQVUsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQ3pFLFlBQVksQ0FDYixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsZUFBZSxDQUN0QixXQUEyQixFQUMzQixPQUFpQixFQUNqQixPQUFpQixFQUNqQixZQUFvQjtJQUVwQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDckIsSUFBSSxPQUFPLEVBQUU7UUFDWCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLFlBQVksR0FBRyxPQUFPLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUMzQztTQUFNLElBQUksT0FBTyxFQUFFO1FBQ2xCLFlBQVksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELDRFQUE0RTtBQUM1RSxTQUFTLGVBQWUsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUMzQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRE9XTl9BUlJPVyxcbiAgRU5ELFxuICBFTlRFUixcbiAgSE9NRSxcbiAgTEVGVF9BUlJPVyxcbiAgUEFHRV9ET1dOLFxuICBQQUdFX1VQLFxuICBSSUdIVF9BUlJPVyxcbiAgVVBfQVJST1csXG4gIFNQQUNFLFxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uRGVzdHJveSxcbiAgaXNEZXZNb2RlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0Q2FsZW5kYXJCb2R5LFxuICBNYXRDYWxlbmRhckNlbGwsXG4gIE1hdENhbGVuZGFyVXNlckV2ZW50LFxuICBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uLFxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlIH0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRmlsdGVyRm4gfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBhIHllYXIgc2VsZWN0b3IgaW4gdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tdWx0aS15ZWFyLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJ211bHRpLXllYXItdmlldy5odG1sJyxcbiAgZXhwb3J0QXM6ICdtYXRNdWx0aVllYXJWaWV3JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdE11bHRpWWVhclZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogY29uc3RzIG1vdmVkIGFzIGlucHV0cyAqL1xuICBASW5wdXQoKSB5ZWFyc1BlclBhZ2UgPSAyNDtcblxuICBASW5wdXQoKSB5ZWFyc1BlclJvdyA9IDQ7XG5cbiAgLyoqIEZsYWcgdXNlZCB0byBmaWx0ZXIgb3V0IHNwYWNlL2VudGVyIGtleXVwIGV2ZW50cyB0aGF0IG9yaWdpbmF0ZWQgb3V0c2lkZSBvZiB0aGUgdmlldy4gKi9cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uS2V5UHJlc3NlZDogYm9vbGVhbjtcblxuICAvKiogVGhlIGRhdGUgdG8gZGlzcGxheSBpbiB0aGlzIG11bHRpLXllYXIgdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSB5ZWFyIGlzIGlnbm9yZWQpLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgfVxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgIGxldCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICBjb25zdCB2YWxpZERhdGUgPVxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSlcbiAgICAgICkgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgdmFsaWREYXRlLFxuICAgICAgdGhpcy5taW5EYXRlLFxuICAgICAgdGhpcy5tYXhEYXRlXG4gICAgKTtcblxuICAgIGlmIChcbiAgICAgICFpc1NhbWVNdWx0aVllYXJWaWV3KFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlcixcbiAgICAgICAgb2xkQWN0aXZlRGF0ZSxcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgdGhpcy5taW5EYXRlLFxuICAgICAgICB0aGlzLm1heERhdGUsXG4gICAgICAgIHRoaXMueWVhcnNQZXJQYWdlXG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbCkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVSYW5nZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwoXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRTZWxlY3RlZFllYXIodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbDtcblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gIH1cbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwoXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSlcbiAgICApO1xuICB9XG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICBASW5wdXQoKSBkYXRlRmlsdGVyOiBEYXRlRmlsdGVyRm48RD47XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlIGNlbGxzLiAqL1xuICBASW5wdXQoKSBkYXRlQ2xhc3M6IE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD47XG5cbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgeWVhciBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFjdGl2ZURhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgQFZpZXdDaGlsZChNYXRDYWxlbmRhckJvZHkpIF9tYXRDYWxlbmRhckJvZHk6IE1hdENhbGVuZGFyQm9keTtcblxuICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgeWVhcnMuICovXG4gIF95ZWFyczogTWF0Q2FsZW5kYXJDZWxsW11bXTtcblxuICAvKiogVGhlIHllYXIgdGhhdCB0b2RheSBmYWxscyBvbi4gKi9cbiAgX3RvZGF5WWVhcjogbnVtYmVyO1xuXG4gIC8qKiBUaGUgeWVhciBvZiB0aGUgc2VsZWN0ZWQgZGF0ZS4gTnVsbCBpZiB0aGUgc2VsZWN0ZWQgZGF0ZSBpcyBudWxsLiAqL1xuICBfc2VsZWN0ZWRZZWFyOiBudW1iZXIgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI/OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXNcbiAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5faW5pdCgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JlcmVuZGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtdWx0aS15ZWFyIHZpZXcuICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX3RvZGF5WWVhciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKSk7XG5cbiAgICAvLyBXZSB3YW50IGEgcmFuZ2UgeWVhcnMgc3VjaCB0aGF0IHdlIG1heGltaXplIHRoZSBudW1iZXIgb2ZcbiAgICAvLyBlbmFibGVkIGRhdGVzIHZpc2libGUgYXQgb25jZS4gVGhpcyBwcmV2ZW50cyBpc3N1ZXMgd2hlcmUgdGhlIG1pbmltdW0geWVhclxuICAgIC8vIGlzIHRoZSBsYXN0IGl0ZW0gb2YgYSBwYWdlIE9SIHRoZSBtYXhpbXVtIHllYXIgaXMgdGhlIGZpcnN0IGl0ZW0gb2YgYSBwYWdlLlxuXG4gICAgLy8gVGhlIG9mZnNldCBmcm9tIHRoZSBhY3RpdmUgeWVhciB0byB0aGUgXCJzbG90XCIgZm9yIHRoZSBzdGFydGluZyB5ZWFyIGlzIHRoZVxuICAgIC8vICphY3R1YWwqIGZpcnN0IHJlbmRlcmVkIHllYXIgaW4gdGhlIG11bHRpLXllYXIgdmlldy5cbiAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKTtcbiAgICBjb25zdCBtaW5ZZWFyT2ZQYWdlID1cbiAgICAgIGFjdGl2ZVllYXIgLVxuICAgICAgZ2V0QWN0aXZlT2Zmc2V0KFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlcixcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlLFxuICAgICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMubWF4RGF0ZSxcbiAgICAgICAgdGhpcy55ZWFyc1BlclBhZ2VcbiAgICAgICk7XG5cbiAgICB0aGlzLl95ZWFycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCByb3c6IG51bWJlcltdID0gW107IGkgPCB0aGlzLnllYXJzUGVyUGFnZTsgaSsrKSB7XG4gICAgICByb3cucHVzaChtaW5ZZWFyT2ZQYWdlICsgaSk7XG4gICAgICBpZiAocm93Lmxlbmd0aCA9PSB0aGlzLnllYXJzUGVyUm93KSB7XG4gICAgICAgIHRoaXMuX3llYXJzLnB1c2gocm93Lm1hcCgoeWVhcikgPT4gdGhpcy5fY3JlYXRlQ2VsbEZvclllYXIoeWVhcikpKTtcbiAgICAgICAgcm93ID0gW107XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgd2hlbiBhIG5ldyB5ZWFyIGlzIHNlbGVjdGVkLiAqL1xuICBfeWVhclNlbGVjdGVkKGV2ZW50OiBNYXRDYWxlbmRhclVzZXJFdmVudDxudW1iZXI+KSB7XG4gICAgY29uc3QgeWVhciA9IGV2ZW50LnZhbHVlO1xuICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQodGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKSk7XG4gICAgbGV0IG1vbnRoID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICBsZXQgZGF5c0luTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIDEpXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgTWF0aC5taW4odGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLCBkYXlzSW5Nb250aCksXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaWxsaXNlY29uZHModGhpcy5hY3RpdmVEYXRlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlkb3duIGV2ZW50cyBvbiB0aGUgY2FsZW5kYXIgYm9keSB3aGVuIGNhbGVuZGFyIGlzIGluIG11bHRpLXllYXIgdmlldy4gKi9cbiAgX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuX2lzUnRsKCk7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgIGlzUnRsID8gMSA6IC0xXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgIGlzUnRsID8gLTEgOiAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgIC10aGlzLnllYXJzUGVyUm93XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgICAgdGhpcy55ZWFyc1BlclJvd1xuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgIC1nZXRBY3RpdmVPZmZzZXQoXG4gICAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRGF0ZSxcbiAgICAgICAgICAgIHRoaXMubWluRGF0ZSxcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZSxcbiAgICAgICAgICAgIHRoaXMueWVhcnNQZXJQYWdlXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5EOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgICAgdGhpcy55ZWFyc1BlclBhZ2UgLVxuICAgICAgICAgICAgZ2V0QWN0aXZlT2Zmc2V0KFxuICAgICAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlcixcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmVEYXRlLFxuICAgICAgICAgICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICAgICAgICAgIHRoaXMubWF4RGF0ZSxcbiAgICAgICAgICAgICAgdGhpcy55ZWFyc1BlclBhZ2VcbiAgICAgICAgICAgICkgLVxuICAgICAgICAgICAgMVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxuICAgICAgICAgIGV2ZW50LmFsdEtleSA/IC10aGlzLnllYXJzUGVyUGFnZSAqIDEwIDogLXRoaXMueWVhcnNQZXJQYWdlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICBldmVudC5hbHRLZXkgPyB0aGlzLnllYXJzUGVyUGFnZSAqIDEwIDogdGhpcy55ZWFyc1BlclBhZ2VcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIG9ubHkgcHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gaGVyZSB3aGlsZSB0aGUgc2VsZWN0aW9uIGhhcHBlbnMgaW5cbiAgICAgICAgLy8gYGtleXVwYCBiZWxvdy4gV2UgY2FuJ3QgZG8gdGhlIHNlbGVjdGlvbiBoZXJlLCBiZWNhdXNlIGl0IGNhbiBjYXVzZSB0aGUgY2FsZW5kYXIgdG9cbiAgICAgICAgLy8gcmVvcGVuIGlmIGZvY3VzIGlzIHJlc3RvcmVkIGltbWVkaWF0ZWx5LiBXZSBhbHNvIGNhbid0IGNhbGwgYHByZXZlbnREZWZhdWx0YCBvbiBga2V5dXBgXG4gICAgICAgIC8vIGJlY2F1c2UgaXQncyB0b28gbGF0ZSAoc2VlICMyMzMwNSkuXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbktleVByZXNzZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuYWN0aXZlRGF0ZSkpIHtcbiAgICAgIHRoaXMuYWN0aXZlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5dXAgZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbXVsdGkteWVhciB2aWV3LiAqL1xuICBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gU1BBQ0UgfHwgZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25LZXlQcmVzc2VkKSB7XG4gICAgICAgIHRoaXMuX3llYXJTZWxlY3RlZCh7XG4gICAgICAgICAgdmFsdWU6IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSksXG4gICAgICAgICAgZXZlbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZWxlY3Rpb25LZXlQcmVzc2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgX2dldEFjdGl2ZUNlbGwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZ2V0QWN0aXZlT2Zmc2V0KFxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIsXG4gICAgICB0aGlzLmFjdGl2ZURhdGUsXG4gICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICB0aGlzLm1heERhdGUsXG4gICAgICB0aGlzLnllYXJzUGVyUGFnZVxuICAgICk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgYWN0aXZlIGNlbGwgYWZ0ZXIgdGhlIG1pY3JvdGFzayBxdWV1ZSBpcyBlbXB0eS4gKi9cbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLl9tYXRDYWxlbmRhckJvZHkuX2ZvY3VzQWN0aXZlQ2VsbCgpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYW4gTWF0Q2FsZW5kYXJDZWxsIGZvciB0aGUgZ2l2ZW4geWVhci4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlQ2VsbEZvclllYXIoeWVhcjogbnVtYmVyKSB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XG4gICAgY29uc3QgeWVhck5hbWUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyTmFtZShkYXRlKTtcbiAgICBjb25zdCBjZWxsQ2xhc3NlcyA9IHRoaXMuZGF0ZUNsYXNzXG4gICAgICA/IHRoaXMuZGF0ZUNsYXNzKGRhdGUsICdtdWx0aS15ZWFyJylcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBNYXRDYWxlbmRhckNlbGwoXG4gICAgICB5ZWFyLFxuICAgICAgeWVhck5hbWUsXG4gICAgICB5ZWFyTmFtZSxcbiAgICAgIHRoaXMuX3Nob3VsZEVuYWJsZVllYXIoeWVhciksXG4gICAgICBjZWxsQ2xhc3Nlc1xuICAgICk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xuICBwcml2YXRlIF9zaG91bGRFbmFibGVZZWFyKHllYXI6IG51bWJlcikge1xuICAgIC8vIGRpc2FibGUgaWYgdGhlIHllYXIgaXMgZ3JlYXRlciB0aGFuIG1heERhdGUgbG93ZXIgdGhhbiBtaW5EYXRlXG4gICAgaWYgKFxuICAgICAgeWVhciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB5ZWFyID09PSBudWxsIHx8XG4gICAgICAodGhpcy5tYXhEYXRlICYmIHllYXIgPiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMubWF4RGF0ZSkpIHx8XG4gICAgICAodGhpcy5taW5EYXRlICYmIHllYXIgPCB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMubWluRGF0ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZW5hYmxlIGlmIGl0IHJlYWNoZXMgaGVyZSBhbmQgdGhlcmUncyBubyBmaWx0ZXIgZGVmaW5lZFxuICAgIGlmICghdGhpcy5kYXRlRmlsdGVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdE9mWWVhciA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XG5cbiAgICAvLyBJZiBhbnkgZGF0ZSBpbiB0aGUgeWVhciBpcyBlbmFibGVkIGNvdW50IHRoZSB5ZWFyIGFzIGVuYWJsZWQuXG4gICAgZm9yIChcbiAgICAgIGxldCBkYXRlID0gZmlyc3RPZlllYXI7XG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUpID09IHllYXI7XG4gICAgICBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5kYXRlRmlsdGVyKGRhdGUsICd5ZWFyJykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIFJUTCBsYXlvdXQgZGlyZWN0aW9uLiAqL1xuICBwcml2YXRlIF9pc1J0bCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgY3VycmVudGx5LWhpZ2hsaWdodGVkIHllYXIgYmFzZWQgb24gYSBtb2RlbCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfc2V0U2VsZWN0ZWRZZWFyKHZhbHVlOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbCkge1xuICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IG51bGw7XG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHZhbHVlLnN0YXJ0IHx8IHZhbHVlLmVuZDtcblxuICAgICAgaWYgKGRpc3BsYXlWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZFllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRpc3BsYXlWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNdWx0aVllYXJWaWV3PEQ+KFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gIGRhdGUxOiBELFxuICBkYXRlMjogRCxcbiAgbWluRGF0ZTogRCB8IG51bGwsXG4gIG1heERhdGU6IEQgfCBudWxsLFxuICB5ZWFyc1BlclBhZ2U6IG51bWJlclxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHllYXIxID0gZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSk7XG4gIGNvbnN0IHllYXIyID0gZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMik7XG4gIGNvbnN0IHN0YXJ0aW5nWWVhciA9IGdldFN0YXJ0aW5nWWVhcihcbiAgICBkYXRlQWRhcHRlcixcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICAgeWVhcnNQZXJQYWdlXG4gICk7XG4gIHJldHVybiAoXG4gICAgTWF0aC5mbG9vcigoeWVhcjEgLSBzdGFydGluZ1llYXIpIC8geWVhcnNQZXJQYWdlKSA9PT1cbiAgICBNYXRoLmZsb29yKCh5ZWFyMiAtIHN0YXJ0aW5nWWVhcikgLyB5ZWFyc1BlclBhZ2UpXG4gICk7XG59XG5cbi8qKlxuICogV2hlbiB0aGUgbXVsdGkteWVhciB2aWV3IGlzIGZpcnN0IG9wZW5lZCwgdGhlIGFjdGl2ZSB5ZWFyIHdpbGwgYmUgaW4gdmlldy5cbiAqIFNvIHdlIGNvbXB1dGUgaG93IG1hbnkgeWVhcnMgYXJlIGJldHdlZW4gdGhlIGFjdGl2ZSB5ZWFyIGFuZCB0aGUgKnNsb3QqIHdoZXJlIG91clxuICogXCJzdGFydGluZ1llYXJcIiB3aWxsIHJlbmRlciB3aGVuIHBhZ2VkIGludG8gdmlldy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZU9mZnNldDxEPihcbiAgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICBhY3RpdmVEYXRlOiBELFxuICBtaW5EYXRlOiBEIHwgbnVsbCxcbiAgbWF4RGF0ZTogRCB8IG51bGwsXG4gIHllYXJzUGVyUGFnZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCBhY3RpdmVZZWFyID0gZGF0ZUFkYXB0ZXIuZ2V0WWVhcihhY3RpdmVEYXRlKTtcbiAgcmV0dXJuIGV1Y2xpZGVhbk1vZHVsbyhcbiAgICBhY3RpdmVZZWFyIC0gZ2V0U3RhcnRpbmdZZWFyKGRhdGVBZGFwdGVyLCBtaW5EYXRlLCBtYXhEYXRlLCB5ZWFyc1BlclBhZ2UpLFxuICAgIHllYXJzUGVyUGFnZVxuICApO1xufVxuXG4vKipcbiAqIFdlIHBpY2sgYSBcInN0YXJ0aW5nXCIgeWVhciBzdWNoIHRoYXQgZWl0aGVyIHRoZSBtYXhpbXVtIHllYXIgd291bGQgYmUgYXQgdGhlIGVuZFxuICogb3IgdGhlIG1pbmltdW0geWVhciB3b3VsZCBiZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgcGFnZS5cbiAqL1xuZnVuY3Rpb24gZ2V0U3RhcnRpbmdZZWFyPEQ+KFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gIG1pbkRhdGU6IEQgfCBudWxsLFxuICBtYXhEYXRlOiBEIHwgbnVsbCxcbiAgeWVhcnNQZXJQYWdlOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGxldCBzdGFydGluZ1llYXIgPSAwO1xuICBpZiAobWF4RGF0ZSkge1xuICAgIGNvbnN0IG1heFllYXIgPSBkYXRlQWRhcHRlci5nZXRZZWFyKG1heERhdGUpO1xuICAgIHN0YXJ0aW5nWWVhciA9IG1heFllYXIgLSB5ZWFyc1BlclBhZ2UgKyAxO1xuICB9IGVsc2UgaWYgKG1pbkRhdGUpIHtcbiAgICBzdGFydGluZ1llYXIgPSBkYXRlQWRhcHRlci5nZXRZZWFyKG1pbkRhdGUpO1xuICB9XG4gIHJldHVybiBzdGFydGluZ1llYXI7XG59XG5cbi8qKiBHZXRzIHJlbWFpbmRlciB0aGF0IGlzIG5vbi1uZWdhdGl2ZSwgZXZlbiBpZiBmaXJzdCBudW1iZXIgaXMgbmVnYXRpdmUgKi9cbmZ1bmN0aW9uIGV1Y2xpZGVhbk1vZHVsbyhhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiAoKGEgJSBiKSArIGIpICUgYjtcbn1cbiIsIjx0YWJsZSBjbGFzcz1cIm1hdC1jYWxlbmRhci10YWJsZVwiIHJvbGU9XCJncmlkXCI+XHJcbiAgPHRoZWFkIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzPVwibWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlclwiPlxyXG4gICAgPHRyPjx0aCBjbGFzcz1cIm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXItZGl2aWRlclwiIGNvbHNwYW49XCI0XCI+PC90aD48L3RyPlxyXG4gIDwvdGhlYWQ+XHJcbiAgPHRib2R5IG1hdC1jYWxlbmRhci1ib2R5XHJcbiAgICAgICAgIFtyb3dzXT1cIl95ZWFyc1wiXHJcbiAgICAgICAgIFt0b2RheVZhbHVlXT1cIl90b2RheVllYXJcIlxyXG4gICAgICAgICBbc3RhcnRWYWx1ZV09XCJfc2VsZWN0ZWRZZWFyIVwiXHJcbiAgICAgICAgIFtlbmRWYWx1ZV09XCJfc2VsZWN0ZWRZZWFyIVwiXHJcbiAgICAgICAgIFtudW1Db2xzXT1cInllYXJzUGVyUm93XCJcclxuICAgICAgICAgW2NlbGxBc3BlY3RSYXRpb109XCJ5ZWFyc1BlclJvdyAvIDdcIlxyXG4gICAgICAgICBbYWN0aXZlQ2VsbF09XCJfZ2V0QWN0aXZlQ2VsbCgpXCJcclxuICAgICAgICAgKHNlbGVjdGVkVmFsdWVDaGFuZ2UpPVwiX3llYXJTZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleXVwKT1cIl9oYW5kbGVDYWxlbmRhckJvZHlLZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oJGV2ZW50KVwiPlxyXG4gIDwvdGJvZHk+XHJcbjwvdGFibGU+XHJcbiJdfQ==