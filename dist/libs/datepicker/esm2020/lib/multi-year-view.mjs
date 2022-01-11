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
        const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) ||
            this._dateAdapter.today();
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
        const minYearOfPage = activeYear - getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate, this.yearsPerPage);
        this._years = [];
        for (let i = 0, row = []; i < this.yearsPerPage; i++) {
            row.push(minYearOfPage + i);
            if (row.length == this.yearsPerRow) {
                this._years.push(row.map(year => this._createCellForYear(year)));
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
                this._yearSelected({ value: this._dateAdapter.getYear(this._activeDate), event });
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
        const cellClasses = this.dateClass ? this.dateClass(date, 'multi-year') : undefined;
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
/** @nocollapse */ /** @nocollapse */ MatMultiYearView.ɵfac = function MatMultiYearView_Factory(t) { return new (t || MatMultiYearView)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DateAdapter, 8), i0.ɵɵdirectiveInject(i2.Directionality, 8)); };
/** @nocollapse */ /** @nocollapse */ MatMultiYearView.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatMultiYearView, selectors: [["mat-multi-year-view"]], viewQuery: function MatMultiYearView_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(MatCalendarBody, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._matCalendarBody = _t.first);
    } }, inputs: { yearsPerPage: "yearsPerPage", yearsPerRow: "yearsPerRow", activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", activeDateChange: "activeDateChange" }, exportAs: ["matMultiYearView"], decls: 5, vars: 7, consts: [["role", "grid", 1, "mat-calendar-table"], ["aria-hidden", "true", 1, "mat-calendar-table-header"], ["colspan", "4", 1, "mat-calendar-table-header-divider"], ["mat-calendar-body", "", 3, "rows", "todayValue", "startValue", "endValue", "numCols", "cellAspectRatio", "activeCell", "selectedValueChange", "keyup", "keydown"]], template: function MatMultiYearView_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table", 0);
        i0.ɵɵelementStart(1, "thead", 1);
        i0.ɵɵelementStart(2, "tr");
        i0.ɵɵelement(3, "th", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "tbody", 3);
        i0.ɵɵlistener("selectedValueChange", function MatMultiYearView_Template_tbody_selectedValueChange_4_listener($event) { return ctx._yearSelected($event); })("keyup", function MatMultiYearView_Template_tbody_keyup_4_listener($event) { return ctx._handleCalendarBodyKeyup($event); })("keydown", function MatMultiYearView_Template_tbody_keydown_4_listener($event) { return ctx._handleCalendarBodyKeydown($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("rows", ctx._years)("todayValue", ctx._todayYear)("startValue", ctx._selectedYear)("endValue", ctx._selectedYear)("numCols", ctx.yearsPerRow)("cellAspectRatio", ctx.yearsPerRow / 7)("activeCell", ctx._getActiveCell());
    } }, directives: [i3.MatCalendarBody], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatMultiYearView, [{
        type: Component,
        args: [{ selector: 'mat-multi-year-view', exportAs: 'matMultiYearView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"mat-calendar-table\" role=\"grid\">\r\n  <thead aria-hidden=\"true\" class=\"mat-calendar-table-header\">\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n         [rows]=\"_years\"\r\n         [todayValue]=\"_todayYear\"\r\n         [startValue]=\"_selectedYear!\"\r\n         [endValue]=\"_selectedYear!\"\r\n         [numCols]=\"yearsPerRow\"\r\n         [cellAspectRatio]=\"yearsPerRow / 7\"\r\n         [activeCell]=\"_getActiveCell()\"\r\n         (selectedValueChange)=\"_yearSelected($event)\"\r\n         (keyup)=\"_handleCalendarBodyKeyup($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n" }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: i2.Directionality, decorators: [{
                type: Optional
            }] }]; }, { yearsPerPage: [{
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
        }] }); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGkteWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvbXVsdGkteWVhci12aWV3LnRzIiwiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvbXVsdGkteWVhci12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssR0FDTixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUVqQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDckMsT0FBTyxFQUNMLGVBQWUsRUFDZixlQUFlLEdBR2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUduRDs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sZ0JBQWdCO0lBcUczQixZQUNVLGtCQUFxQyxFQUMxQixZQUE0QixFQUMzQixJQUFxQjtRQUZqQyx1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OlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gIERPV05fQVJST1csXHJcbiAgRU5ELFxyXG4gIEVOVEVSLFxyXG4gIEhPTUUsXHJcbiAgTEVGVF9BUlJPVyxcclxuICBQQUdFX0RPV04sXHJcbiAgUEFHRV9VUCxcclxuICBSSUdIVF9BUlJPVyxcclxuICBVUF9BUlJPVyxcclxuICBTUEFDRSxcclxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIE9uRGVzdHJveSxcclxuICBpc0Rldk1vZGUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTWF0Q2FsZW5kYXJCb2R5LFxyXG4gIE1hdENhbGVuZGFyQ2VsbCxcclxuICBNYXRDYWxlbmRhclVzZXJFdmVudCxcclxuICBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uLFxyXG59IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGVSYW5nZSB9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xyXG5pbXBvcnQgeyBEYXRlRmlsdGVyRm4gfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XHJcblxyXG4vKipcclxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBhIHllYXIgc2VsZWN0b3IgaW4gdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LW11bHRpLXllYXItdmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICdtdWx0aS15ZWFyLXZpZXcuaHRtbCcsXHJcbiAgZXhwb3J0QXM6ICdtYXRNdWx0aVllYXJWaWV3JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0TXVsdGlZZWFyVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfcmVyZW5kZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIC8qKiBjb25zdHMgbW92ZWQgYXMgaW5wdXRzICovXHJcbiAgQElucHV0KCkgeWVhcnNQZXJQYWdlID0gMjQ7XHJcblxyXG4gIEBJbnB1dCgpIHllYXJzUGVyUm93ID0gNDtcclxuXHJcbiAgLyoqIEZsYWcgdXNlZCB0byBmaWx0ZXIgb3V0IHNwYWNlL2VudGVyIGtleXVwIGV2ZW50cyB0aGF0IG9yaWdpbmF0ZWQgb3V0c2lkZSBvZiB0aGUgdmlldy4gKi9cclxuICBwcml2YXRlIF9zZWxlY3Rpb25LZXlQcmVzc2VkOiBib29sZWFuO1xyXG5cclxuICAvKiogVGhlIGRhdGUgdG8gZGlzcGxheSBpbiB0aGlzIG11bHRpLXllYXIgdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSB5ZWFyIGlzIGlnbm9yZWQpLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICB9XHJcbiAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcclxuICAgIGxldCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbGlkRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgIWlzU2FtZU11bHRpWWVhclZpZXcoXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgb2xkQWN0aXZlRGF0ZSxcclxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxyXG4gICAgICAgIHRoaXMubWluRGF0ZSxcclxuICAgICAgICB0aGlzLm1heERhdGUsXHJcbiAgICAgICAgdGhpcy55ZWFyc1BlclBhZ2UsXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XHJcblxyXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsKSB7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlUmFuZ2UpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2V0U2VsZWN0ZWRZZWFyKHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgfVxyXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gIH1cclxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlIGNlbGxzLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVDbGFzczogTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbjxEPjtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgeWVhciBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgYWN0aXZlRGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cclxuICBAVmlld0NoaWxkKE1hdENhbGVuZGFyQm9keSkgX21hdENhbGVuZGFyQm9keTogTWF0Q2FsZW5kYXJCb2R5O1xyXG5cclxuICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgeWVhcnMuICovXHJcbiAgX3llYXJzOiBNYXRDYWxlbmRhckNlbGxbXVtdO1xyXG5cclxuICAvKiogVGhlIHllYXIgdGhhdCB0b2RheSBmYWxscyBvbi4gKi9cclxuICBfdG9kYXlZZWFyOiBudW1iZXI7XHJcblxyXG4gIC8qKiBUaGUgeWVhciBvZiB0aGUgc2VsZWN0ZWQgZGF0ZS4gTnVsbCBpZiB0aGUgc2VsZWN0ZWQgZGF0ZSBpcyBudWxsLiAqL1xyXG4gIF9zZWxlY3RlZFllYXI6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI/OiBEaXJlY3Rpb25hbGl0eSxcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIgJiYgaXNEZXZNb2RlKCkpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXNcclxuICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2luaXQoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3JlcmVuZGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtdWx0aS15ZWFyIHZpZXcuICovXHJcbiAgX2luaXQoKSB7XHJcbiAgICB0aGlzLl90b2RheVllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCkpO1xyXG5cclxuICAgIC8vIFdlIHdhbnQgYSByYW5nZSB5ZWFycyBzdWNoIHRoYXQgd2UgbWF4aW1pemUgdGhlIG51bWJlciBvZlxyXG4gICAgLy8gZW5hYmxlZCBkYXRlcyB2aXNpYmxlIGF0IG9uY2UuIFRoaXMgcHJldmVudHMgaXNzdWVzIHdoZXJlIHRoZSBtaW5pbXVtIHllYXJcclxuICAgIC8vIGlzIHRoZSBsYXN0IGl0ZW0gb2YgYSBwYWdlIE9SIHRoZSBtYXhpbXVtIHllYXIgaXMgdGhlIGZpcnN0IGl0ZW0gb2YgYSBwYWdlLlxyXG5cclxuICAgIC8vIFRoZSBvZmZzZXQgZnJvbSB0aGUgYWN0aXZlIHllYXIgdG8gdGhlIFwic2xvdFwiIGZvciB0aGUgc3RhcnRpbmcgeWVhciBpcyB0aGVcclxuICAgIC8vICphY3R1YWwqIGZpcnN0IHJlbmRlcmVkIHllYXIgaW4gdGhlIG11bHRpLXllYXIgdmlldy5cclxuICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2FjdGl2ZURhdGUpO1xyXG4gICAgY29uc3QgbWluWWVhck9mUGFnZSA9XHJcbiAgICAgIGFjdGl2ZVllYXIgLSBnZXRBY3RpdmVPZmZzZXQodGhpcy5fZGF0ZUFkYXB0ZXIsIHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMueWVhcnNQZXJQYWdlKTtcclxuXHJcbiAgICB0aGlzLl95ZWFycyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIHJvdzogbnVtYmVyW10gPSBbXTsgaSA8IHRoaXMueWVhcnNQZXJQYWdlOyBpKyspIHtcclxuICAgICAgcm93LnB1c2gobWluWWVhck9mUGFnZSArIGkpO1xyXG4gICAgICBpZiAocm93Lmxlbmd0aCA9PSB0aGlzLnllYXJzUGVyUm93KSB7XHJcbiAgICAgICAgdGhpcy5feWVhcnMucHVzaChyb3cubWFwKHllYXIgPT4gdGhpcy5fY3JlYXRlQ2VsbEZvclllYXIoeWVhcikpKTtcclxuICAgICAgICByb3cgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IHllYXIgaXMgc2VsZWN0ZWQuICovXHJcbiAgX3llYXJTZWxlY3RlZChldmVudDogTWF0Q2FsZW5kYXJVc2VyRXZlbnQ8bnVtYmVyPikge1xyXG4gICAgY29uc3QgeWVhciA9IGV2ZW50LnZhbHVlO1xyXG4gICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdCh0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpKTtcclxuICAgIGxldCBtb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBsZXQgZGF5c0luTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgMSksXHJcbiAgICApO1xyXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgIHllYXIsXHJcbiAgICAgICAgbW9udGgsXHJcbiAgICAgICAgTWF0aC5taW4odGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLCBkYXlzSW5Nb250aCksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICApLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbXVsdGkteWVhciB2aWV3LiAqL1xyXG4gIF9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5faXNSdGwoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAxIDogLTEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgaXNSdGwgPyAtMSA6IDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLXRoaXMueWVhcnNQZXJSb3cpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCB0aGlzLnllYXJzUGVyUm93KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBIT01FOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXHJcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxyXG4gICAgICAgICAgLWdldEFjdGl2ZU9mZnNldCh0aGlzLl9kYXRlQWRhcHRlciwgdGhpcy5hY3RpdmVEYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgdGhpcy55ZWFyc1BlclBhZ2UpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRU5EOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXHJcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxyXG4gICAgICAgICAgdGhpcy55ZWFyc1BlclBhZ2UgLVxyXG4gICAgICAgICAgZ2V0QWN0aXZlT2Zmc2V0KHRoaXMuX2RhdGVBZGFwdGVyLCB0aGlzLmFjdGl2ZURhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCB0aGlzLnllYXJzUGVyUGFnZSkgLVxyXG4gICAgICAgICAgMSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFBBR0VfVVA6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcclxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXHJcbiAgICAgICAgICBldmVudC5hbHRLZXkgPyAtdGhpcy55ZWFyc1BlclBhZ2UgKiAxMCA6IC10aGlzLnllYXJzUGVyUGFnZSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFBBR0VfRE9XTjpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxyXG4gICAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcclxuICAgICAgICAgIGV2ZW50LmFsdEtleSA/IHRoaXMueWVhcnNQZXJQYWdlICogMTAgOiB0aGlzLnllYXJzUGVyUGFnZSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEVOVEVSOlxyXG4gICAgICBjYXNlIFNQQUNFOlxyXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBvbmx5IHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIGhlcmUgd2hpbGUgdGhlIHNlbGVjdGlvbiBoYXBwZW5zIGluXHJcbiAgICAgICAgLy8gYGtleXVwYCBiZWxvdy4gV2UgY2FuJ3QgZG8gdGhlIHNlbGVjdGlvbiBoZXJlLCBiZWNhdXNlIGl0IGNhbiBjYXVzZSB0aGUgY2FsZW5kYXIgdG9cclxuICAgICAgICAvLyByZW9wZW4gaWYgZm9jdXMgaXMgcmVzdG9yZWQgaW1tZWRpYXRlbHkuIFdlIGFsc28gY2FuJ3QgY2FsbCBgcHJldmVudERlZmF1bHRgIG9uIGBrZXl1cGBcclxuICAgICAgICAvLyBiZWNhdXNlIGl0J3MgdG9vIGxhdGUgKHNlZSAjMjMzMDUpLlxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbktleVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuYWN0aXZlRGF0ZSkpIHtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMga2V5dXAgZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbXVsdGkteWVhciB2aWV3LiAqL1xyXG4gIF9oYW5kbGVDYWxlbmRhckJvZHlLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFNQQUNFIHx8IGV2ZW50LmtleUNvZGUgPT09IEVOVEVSKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25LZXlQcmVzc2VkKSB7XHJcbiAgICAgICAgdGhpcy5feWVhclNlbGVjdGVkKHsgdmFsdWU6IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSksIGV2ZW50IH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25LZXlQcmVzc2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZ2V0QWN0aXZlQ2VsbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGdldEFjdGl2ZU9mZnNldCh0aGlzLl9kYXRlQWRhcHRlciwgdGhpcy5hY3RpdmVEYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgdGhpcy55ZWFyc1BlclBhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZvY3VzZXMgdGhlIGFjdGl2ZSBjZWxsIGFmdGVyIHRoZSBtaWNyb3Rhc2sgcXVldWUgaXMgZW1wdHkuICovXHJcbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHtcclxuICAgIHRoaXMuX21hdENhbGVuZGFyQm9keS5fZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlcyBhbiBNYXRDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiB5ZWFyLiAqL1xyXG4gIHByaXZhdGUgX2NyZWF0ZUNlbGxGb3JZZWFyKHllYXI6IG51bWJlcikge1xyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XHJcbiAgICBjb25zdCB5ZWFyTmFtZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXJOYW1lKGRhdGUpO1xyXG4gICAgY29uc3QgY2VsbENsYXNzZXMgPSB0aGlzLmRhdGVDbGFzcyA/IHRoaXMuZGF0ZUNsYXNzKGRhdGUsICdtdWx0aS15ZWFyJykgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBNYXRDYWxlbmRhckNlbGwoeWVhciwgeWVhck5hbWUsIHllYXJOYW1lLCB0aGlzLl9zaG91bGRFbmFibGVZZWFyKHllYXIpLCBjZWxsQ2xhc3Nlcyk7XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xyXG4gIHByaXZhdGUgX3Nob3VsZEVuYWJsZVllYXIoeWVhcjogbnVtYmVyKSB7XHJcbiAgICAvLyBkaXNhYmxlIGlmIHRoZSB5ZWFyIGlzIGdyZWF0ZXIgdGhhbiBtYXhEYXRlIGxvd2VyIHRoYW4gbWluRGF0ZVxyXG4gICAgaWYgKFxyXG4gICAgICB5ZWFyID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgeWVhciA9PT0gbnVsbCB8fFxyXG4gICAgICAodGhpcy5tYXhEYXRlICYmIHllYXIgPiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMubWF4RGF0ZSkpIHx8XHJcbiAgICAgICh0aGlzLm1pbkRhdGUgJiYgeWVhciA8IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5taW5EYXRlKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW5hYmxlIGlmIGl0IHJlYWNoZXMgaGVyZSBhbmQgdGhlcmUncyBubyBmaWx0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlyc3RPZlllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpO1xyXG5cclxuICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSB5ZWFyIGlzIGVuYWJsZWQgY291bnQgdGhlIHllYXIgYXMgZW5hYmxlZC5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBkYXRlID0gZmlyc3RPZlllYXI7XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIoZGF0ZSkgPT0geWVhcjtcclxuICAgICAgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKVxyXG4gICAgKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ3llYXInKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0aGUgdXNlciBoYXMgdGhlIFJUTCBsYXlvdXQgZGlyZWN0aW9uLiAqL1xyXG4gIHByaXZhdGUgX2lzUnRsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNldHMgdGhlIGN1cnJlbnRseS1oaWdobGlnaHRlZCB5ZWFyIGJhc2VkIG9uIGEgbW9kZWwgdmFsdWUuICovXHJcbiAgcHJpdmF0ZSBfc2V0U2VsZWN0ZWRZZWFyKHZhbHVlOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRZZWFyID0gbnVsbDtcclxuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlUmFuZ2UpIHtcclxuICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gdmFsdWUuc3RhcnQgfHwgdmFsdWUuZW5kO1xyXG5cclxuICAgICAgaWYgKGRpc3BsYXlWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIoZGlzcGxheVZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZFllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVNdWx0aVllYXJWaWV3PEQ+KFxyXG4gIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICBkYXRlMTogRCxcclxuICBkYXRlMjogRCxcclxuICBtaW5EYXRlOiBEIHwgbnVsbCxcclxuICBtYXhEYXRlOiBEIHwgbnVsbCxcclxuICB5ZWFyc1BlclBhZ2U6IG51bWJlclxyXG4pOiBib29sZWFuIHtcclxuICBjb25zdCB5ZWFyMSA9IGRhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTEpO1xyXG4gIGNvbnN0IHllYXIyID0gZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMik7XHJcbiAgY29uc3Qgc3RhcnRpbmdZZWFyID0gZ2V0U3RhcnRpbmdZZWFyKGRhdGVBZGFwdGVyLCBtaW5EYXRlLCBtYXhEYXRlLCB5ZWFyc1BlclBhZ2UpO1xyXG4gIHJldHVybiAoXHJcbiAgICBNYXRoLmZsb29yKCh5ZWFyMSAtIHN0YXJ0aW5nWWVhcikgLyB5ZWFyc1BlclBhZ2UpID09PVxyXG4gICAgTWF0aC5mbG9vcigoeWVhcjIgLSBzdGFydGluZ1llYXIpIC8geWVhcnNQZXJQYWdlKVxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGVuIHRoZSBtdWx0aS15ZWFyIHZpZXcgaXMgZmlyc3Qgb3BlbmVkLCB0aGUgYWN0aXZlIHllYXIgd2lsbCBiZSBpbiB2aWV3LlxyXG4gKiBTbyB3ZSBjb21wdXRlIGhvdyBtYW55IHllYXJzIGFyZSBiZXR3ZWVuIHRoZSBhY3RpdmUgeWVhciBhbmQgdGhlICpzbG90KiB3aGVyZSBvdXJcclxuICogXCJzdGFydGluZ1llYXJcIiB3aWxsIHJlbmRlciB3aGVuIHBhZ2VkIGludG8gdmlldy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVPZmZzZXQ8RD4oXHJcbiAgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gIGFjdGl2ZURhdGU6IEQsXHJcbiAgbWluRGF0ZTogRCB8IG51bGwsXHJcbiAgbWF4RGF0ZTogRCB8IG51bGwsXHJcbiAgeWVhcnNQZXJQYWdlOiBudW1iZXJcclxuKTogbnVtYmVyIHtcclxuICBjb25zdCBhY3RpdmVZZWFyID0gZGF0ZUFkYXB0ZXIuZ2V0WWVhcihhY3RpdmVEYXRlKTtcclxuICByZXR1cm4gZXVjbGlkZWFuTW9kdWxvKGFjdGl2ZVllYXIgLSBnZXRTdGFydGluZ1llYXIoZGF0ZUFkYXB0ZXIsIG1pbkRhdGUsIG1heERhdGUsIHllYXJzUGVyUGFnZSksIHllYXJzUGVyUGFnZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXZSBwaWNrIGEgXCJzdGFydGluZ1wiIHllYXIgc3VjaCB0aGF0IGVpdGhlciB0aGUgbWF4aW11bSB5ZWFyIHdvdWxkIGJlIGF0IHRoZSBlbmRcclxuICogb3IgdGhlIG1pbmltdW0geWVhciB3b3VsZCBiZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgcGFnZS5cclxuICovXHJcbmZ1bmN0aW9uIGdldFN0YXJ0aW5nWWVhcjxEPihcclxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgbWluRGF0ZTogRCB8IG51bGwsXHJcbiAgbWF4RGF0ZTogRCB8IG51bGwsXHJcbiAgeWVhcnNQZXJQYWdlOiBudW1iZXIsXHJcbik6IG51bWJlciB7XHJcbiAgbGV0IHN0YXJ0aW5nWWVhciA9IDA7XHJcbiAgaWYgKG1heERhdGUpIHtcclxuICAgIGNvbnN0IG1heFllYXIgPSBkYXRlQWRhcHRlci5nZXRZZWFyKG1heERhdGUpO1xyXG4gICAgc3RhcnRpbmdZZWFyID0gbWF4WWVhciAtIHllYXJzUGVyUGFnZSArIDE7XHJcbiAgfSBlbHNlIGlmIChtaW5EYXRlKSB7XHJcbiAgICBzdGFydGluZ1llYXIgPSBkYXRlQWRhcHRlci5nZXRZZWFyKG1pbkRhdGUpO1xyXG4gIH1cclxuICByZXR1cm4gc3RhcnRpbmdZZWFyO1xyXG59XHJcblxyXG4vKiogR2V0cyByZW1haW5kZXIgdGhhdCBpcyBub24tbmVnYXRpdmUsIGV2ZW4gaWYgZmlyc3QgbnVtYmVyIGlzIG5lZ2F0aXZlICovXHJcbmZ1bmN0aW9uIGV1Y2xpZGVhbk1vZHVsbyhhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuICgoYSAlIGIpICsgYikgJSBiO1xyXG59XHJcbiIsIjx0YWJsZSBjbGFzcz1cIm1hdC1jYWxlbmRhci10YWJsZVwiIHJvbGU9XCJncmlkXCI+XHJcbiAgPHRoZWFkIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzPVwibWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlclwiPlxyXG4gICAgPHRyPjx0aCBjbGFzcz1cIm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXItZGl2aWRlclwiIGNvbHNwYW49XCI0XCI+PC90aD48L3RyPlxyXG4gIDwvdGhlYWQ+XHJcbiAgPHRib2R5IG1hdC1jYWxlbmRhci1ib2R5XHJcbiAgICAgICAgIFtyb3dzXT1cIl95ZWFyc1wiXHJcbiAgICAgICAgIFt0b2RheVZhbHVlXT1cIl90b2RheVllYXJcIlxyXG4gICAgICAgICBbc3RhcnRWYWx1ZV09XCJfc2VsZWN0ZWRZZWFyIVwiXHJcbiAgICAgICAgIFtlbmRWYWx1ZV09XCJfc2VsZWN0ZWRZZWFyIVwiXHJcbiAgICAgICAgIFtudW1Db2xzXT1cInllYXJzUGVyUm93XCJcclxuICAgICAgICAgW2NlbGxBc3BlY3RSYXRpb109XCJ5ZWFyc1BlclJvdyAvIDdcIlxyXG4gICAgICAgICBbYWN0aXZlQ2VsbF09XCJfZ2V0QWN0aXZlQ2VsbCgpXCJcclxuICAgICAgICAgKHNlbGVjdGVkVmFsdWVDaGFuZ2UpPVwiX3llYXJTZWxlY3RlZCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleXVwKT1cIl9oYW5kbGVDYWxlbmRhckJvZHlLZXl1cCgkZXZlbnQpXCJcclxuICAgICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oJGV2ZW50KVwiPlxyXG4gIDwvdGJvZHk+XHJcbjwvdGFibGU+XHJcbiJdfQ==