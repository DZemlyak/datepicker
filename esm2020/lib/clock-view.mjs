import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from './core';
import { createMissingDateImplError } from './datepicker-errors';
import * as i0 from "@angular/core";
import * as i1 from "./core";
import * as i2 from "@angular/common";
export const CLOCK_RADIUS = 50;
export const CLOCK_INNER_RADIUS = 27.5;
export const CLOCK_OUTER_RADIUS = 41.25;
export const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
export class MatClockView {
    constructor(_changeDetectorRef, _element, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._element = _element;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this.clockStep = 1;
        this.twelveHour = false;
        this.currentViewChange = new EventEmitter();
        /** Emits when a new date is selected. */
        this.selectedChange = new EventEmitter();
        /** Emits when any date is selected. */
        this._userSelection = new EventEmitter();
        // Hours and Minutes representing the clock view.
        this._hours = [];
        this._minutes = [];
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this.mouseMoveListener = (event) => {
            this._handleMousemove(event);
        };
        this.mouseUpListener = () => {
            this._handleMouseup();
        };
    }
    /**
     * The time to display in this clock view. (the rest is ignored)
     */
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        const oldActiveDate = this._activeDate;
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) ||
            this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (oldActiveDate &&
            this._dateAdapter.compareDate(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    // The currently selected date.
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** The minimum selectable date. */
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** The maximum selectable date. */
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    updateSize() {
        const { offsetWidth, offsetHeight } = this._element.nativeElement;
        this._size =
            (offsetWidth < offsetHeight ? offsetWidth : offsetHeight) * 0.9;
        this._changeDetectorRef.detectChanges();
    }
    get inHourView() {
        return this.currentView === 'hour';
    }
    get _hand() {
        this._selectedHour = this._dateAdapter.getHours(this.activeDate);
        this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
        let radius = CLOCK_OUTER_RADIUS;
        let deg = 0;
        if (this.inHourView) {
            const outer = this.twelveHour || (this._selectedHour >= 0 && this._selectedHour < 12);
            radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
            deg = Math.round(this._selectedHour * (360 / (24 / 2)));
        }
        else {
            deg = Math.round(this._selectedMinute * (360 / 60));
        }
        return {
            transform: `rotate(${deg}deg)`,
            height: `${radius}%`,
            'margin-top': `${50 - radius}%`,
            transition: this._draggingMouse ? 'none' : 'all 300ms ease',
        };
    }
    ngAfterViewInit() {
        this.updateSize();
    }
    ngAfterContentInit() {
        this._init();
    }
    // Handles mousedown events on the clock body.
    _handleMousedown(event) {
        this._draggingMouse = true;
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
        this.setTime(event);
    }
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    _handleMouseup() {
        this._draggingMouse = false;
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        if (this.dateFilter &&
            !this.dateFilter(this.activeDate, this.currentView)) {
            return;
        }
        if (this.inHourView) {
            // we refresh the valid minutes
            this.currentViewChange.emit('minute');
            this.selectedChange.emit(this.activeDate);
            this._init();
        }
        else {
            this._userSelection.emit({ value: this.activeDate, event });
        }
    }
    // Initializes this clock view.
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        const hourNames = this._dateAdapter.getHourNames();
        const minuteNames = this._dateAdapter.getMinuteNames();
        if (this.twelveHour) {
            this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;
            for (let i = 0; i < hourNames.length / 2; i++) {
                const radian = (i / 6) * Math.PI;
                const radius = CLOCK_OUTER_RADIUS;
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._anteMeridian ? i : i + 12, 0, 0, 0);
                this._hours.push({
                    value: this._anteMeridian ? i : i + 12,
                    displayValue: i === 0 ? hourNames[12] : hourNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    cssClasses: this.dateClass ? this.dateClass(date, 'hour') : undefined,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                });
            }
        }
        else {
            for (let i = 0; i < hourNames.length; i++) {
                const radian = (i / 6) * Math.PI;
                const outer = i > 0 && i < 13;
                const radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                const hour = i % 12 ? i : i === 0 ? 12 : 0;
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), hour, 0, 0, 0);
                this._hours.push({
                    value: hour,
                    displayValue: hourNames[hour],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    cssClasses: this.dateClass ? this.dateClass(date, 'hour') : undefined,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%',
                });
            }
        }
        for (let i = 0; i < minuteNames.length; i += 5) {
            const radian = (i / 30) * Math.PI;
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), i, 0, 0);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
                cssClasses: this.dateClass ? this.dateClass(date, 'minute') : undefined,
                top: CLOCK_RADIUS -
                    Math.cos(radian) * CLOCK_OUTER_RADIUS -
                    CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS +
                    Math.sin(radian) * CLOCK_OUTER_RADIUS -
                    CLOCK_TICK_RADIUS,
            });
        }
        this._changeDetectorRef.markForCheck();
    }
    // Set Time
    setTime(event) {
        const trigger = this._element.nativeElement;
        const triggerRect = trigger.getBoundingClientRect();
        const width = trigger.offsetWidth;
        const height = trigger.offsetHeight;
        const pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        const pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        const x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
        const y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
        const unit = Math.PI /
            (this.inHourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
        const z = Math.sqrt(x * x + y * y);
        const avg = (width * (CLOCK_OUTER_RADIUS / 100) +
            width * (CLOCK_INNER_RADIUS / 100)) /
            2;
        const outer = this.inHourView && z > avg - 16; /* button radius */
        let radian = Math.atan2(-x, y);
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        let value = Math.round(radian / unit);
        let date = this._dateAdapter.clone(this.activeDate);
        if (this.inHourView) {
            if (value === 12) {
                value = 0;
            }
            value = this.twelveHour
                ? this._anteMeridian
                    ? value
                    : value + 12
                : outer
                    ? value
                    : value + 12;
            date = this._dateAdapter.setHours(date, value);
        }
        else {
            if (this.clockStep) {
                value *= this.clockStep;
            }
            if (value === 60) {
                value = 0;
            }
            date = this._dateAdapter.setMinutes(date, value);
        }
        // validate if the resulting value is disabled and do not take action
        if (this.dateFilter && !this.dateFilter(date, this.currentView)) {
            return;
        }
        // we don't want to re-render the clock
        this._activeDate = date;
        this.selectedChange.emit(this.activeDate);
    }
    _focusActiveCell() { }
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) &&
            this._dateAdapter.isValid(obj)
            ? obj
            : null;
    }
}
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatClockView, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatClockView, selector: "mat-clock-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", clockStep: "clockStep", twelveHour: "twelveHour", currentView: "currentView" }, outputs: { currentViewChange: "currentViewChange", selectedChange: "selectedChange", _userSelection: "_userSelection" }, host: { attributes: { "role": "clock" }, listeners: { "mousedown": "_handleMousedown($event)", "window:resize": "updateSize()" } }, exportAs: ["matClockView"], ngImport: i0, template: "<div class=\"mat-clock\" [style.width.px]=\"_size\" [style.height.px]=\"_size\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"inHourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!inHourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n", directives: [{ type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatClockView, decorators: [{
            type: Component,
            args: [{ selector: 'mat-clock-view', exportAs: 'matClockView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'clock',
                        '(mousedown)': '_handleMousedown($event)',
                    }, preserveWhitespaces: false, template: "<div class=\"mat-clock\" [style.width.px]=\"_size\" [style.height.px]=\"_size\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"inHourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!inHourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.DateAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_FORMATS]
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
            }], clockStep: [{
                type: Input
            }], twelveHour: [{
                type: Input
            }], currentView: [{
                type: Input
            }], currentViewChange: [{
                type: Output
            }], selectedChange: [{
                type: Output
            }], _userSelection: [{
                type: Output
            }], updateSize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2Nsb2NrLXZpZXcudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jbG9jay12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBa0IsTUFBTSxRQUFRLENBQUM7QUFLckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFHakUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMvQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDdkMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUl4Qzs7O0dBR0c7QUFhSCxNQUFNLE9BQU8sWUFBWTtJQXVJdkIsWUFDVSxrQkFBcUMsRUFDckMsUUFBb0IsRUFDVCxZQUE0QixFQUd2QyxZQUE0QjtRQUw1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDVCxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFHdkMsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBdkU3QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGVBQVUsR0FBWSxLQUFL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VUFBVTtzQkFBbEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFJRSxjQUFjO3NCQUR0QixNQUFNO2dCQUlZLGNBQWM7c0JBQWhDLE1BQU07Z0JBS1AsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQge1xuICBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uLFxuICBNYXRDYWxlbmRhclVzZXJFdmVudCxcbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5pbXBvcnQgeyBEYXRlRmlsdGVyRm4gfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBDTE9DS19SQURJVVMgPSA1MDtcbmV4cG9ydCBjb25zdCBDTE9DS19JTk5FUl9SQURJVVMgPSAyNy41O1xuZXhwb3J0IGNvbnN0IENMT0NLX09VVEVSX1JBRElVUyA9IDQxLjI1O1xuZXhwb3J0IGNvbnN0IENMT0NLX1RJQ0tfUkFESVVTID0gNy4wODMzO1xuXG5leHBvcnQgdHlwZSBDbG9ja1ZpZXcgPSAnaG91cicgfCAnbWludXRlJztcblxuLyoqXG4gKiBBIGNsb2NrIHRoYXQgaXMgdXNlZCBhcyBwYXJ0IG9mIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2xvY2stdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnY2xvY2stdmlldy5odG1sJyxcbiAgZXhwb3J0QXM6ICdtYXRDbG9ja1ZpZXcnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIHJvbGU6ICdjbG9jaycsXG4gICAgJyhtb3VzZWRvd24pJzogJ19oYW5kbGVNb3VzZWRvd24oJGV2ZW50KScsXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDbG9ja1ZpZXc8RD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyoqXG4gICAqIFRoZSB0aW1lIHRvIGRpc3BsYXkgaW4gdGhpcyBjbG9jayB2aWV3LiAodGhlIHJlc3QgaXMgaWdub3JlZClcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xuICB9XG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgY29uc3QgdmFsaWREYXRlID1cbiAgICAgIHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8XG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci50b2RheSgpO1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jbGFtcERhdGUoXG4gICAgICB2YWxpZERhdGUsXG4gICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICB0aGlzLm1heERhdGVcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgb2xkQWN0aXZlRGF0ZSAmJlxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcblxuICAvLyBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xuXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKFxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpXG4gICAgKTtcbiAgfVxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbChcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XG5cbiAgLy8gQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS5cbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogRGF0ZUZpbHRlckZuPEQ+O1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gIEBJbnB1dCgpIGRhdGVDbGFzczogTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbjxEPjtcblxuICBASW5wdXQoKSBjbG9ja1N0ZXA6IG51bWJlciA9IDE7XG5cbiAgQElucHV0KCkgdHdlbHZlSG91cjogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGN1cnJlbnRWaWV3OiBDbG9ja1ZpZXc7XG5cbiAgQE91dHB1dCgpIGN1cnJlbnRWaWV3Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja1ZpZXc+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RCB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IF91c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD5cbiAgPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICB1cGRhdGVTaXplKCkge1xuICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX3NpemUgPVxuICAgICAgKG9mZnNldFdpZHRoIDwgb2Zmc2V0SGVpZ2h0ID8gb2Zmc2V0V2lkdGggOiBvZmZzZXRIZWlnaHQpICogMC45O1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vIEhvdXJzIGFuZCBNaW51dGVzIHJlcHJlc2VudGluZyB0aGUgY2xvY2sgdmlldy5cbiAgX2hvdXJzOiBhbnlbXSA9IFtdO1xuICBfbWludXRlczogYW55W10gPSBbXTtcblxuICBfZHJhZ2dpbmdNb3VzZTogYm9vbGVhbjtcbiAgX3NlbGVjdGVkSG91cjogbnVtYmVyIHwgbnVsbDtcbiAgX3NlbGVjdGVkTWludXRlOiBudW1iZXIgfCBudWxsO1xuICBfYW50ZU1lcmlkaWFuOiBib29sZWFuO1xuICBfc2l6ZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgbW91c2VNb3ZlTGlzdGVuZXI6IGFueTtcbiAgcHJpdmF0ZSBtb3VzZVVwTGlzdGVuZXI6IGFueTtcblxuICBnZXQgaW5Ib3VyVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldyA9PT0gJ2hvdXInO1xuICB9XG5cbiAgZ2V0IF9oYW5kKCk6IGFueSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRIb3VyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKTtcbiAgICB0aGlzLl9zZWxlY3RlZE1pbnV0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcbiAgICBsZXQgcmFkaXVzID0gQ0xPQ0tfT1VURVJfUkFESVVTO1xuICAgIGxldCBkZWcgPSAwO1xuXG4gICAgaWYgKHRoaXMuaW5Ib3VyVmlldykge1xuICAgICAgY29uc3Qgb3V0ZXIgPVxuICAgICAgICB0aGlzLnR3ZWx2ZUhvdXIgfHwgKHRoaXMuX3NlbGVjdGVkSG91ciA+PSAwICYmIHRoaXMuX3NlbGVjdGVkSG91ciA8IDEyKTtcbiAgICAgIHJhZGl1cyA9IG91dGVyID8gQ0xPQ0tfT1VURVJfUkFESVVTIDogQ0xPQ0tfSU5ORVJfUkFESVVTO1xuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLl9zZWxlY3RlZEhvdXIgKiAoMzYwIC8gKDI0IC8gMikpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLl9zZWxlY3RlZE1pbnV0ZSAqICgzNjAgLyA2MCkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHtkZWd9ZGVnKWAsXG4gICAgICBoZWlnaHQ6IGAke3JhZGl1c30lYCxcbiAgICAgICdtYXJnaW4tdG9wJzogYCR7NTAgLSByYWRpdXN9JWAsXG4gICAgICB0cmFuc2l0aW9uOiB0aGlzLl9kcmFnZ2luZ01vdXNlID8gJ25vbmUnIDogJ2FsbCAzMDBtcyBlYXNlJyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXG4gICkge1xuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xuICAgIH1cblxuICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlTW91c2Vtb3ZlKGV2ZW50KTtcbiAgICB9O1xuICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlTW91c2V1cCgpO1xuICAgIH07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51cGRhdGVTaXplKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLy8gSGFuZGxlcyBtb3VzZWRvd24gZXZlbnRzIG9uIHRoZSBjbG9jayBib2R5LlxuICBfaGFuZGxlTW91c2Vkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLl9kcmFnZ2luZ01vdXNlID0gdHJ1ZTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgIHRoaXMuc2V0VGltZShldmVudCk7XG4gIH1cblxuICBfaGFuZGxlTW91c2Vtb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0VGltZShldmVudCk7XG4gIH1cblxuICBfaGFuZGxlTW91c2V1cCgpIHtcbiAgICB0aGlzLl9kcmFnZ2luZ01vdXNlID0gZmFsc2U7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuZGF0ZUZpbHRlciAmJlxuICAgICAgIXRoaXMuZGF0ZUZpbHRlcih0aGlzLmFjdGl2ZURhdGUsIHRoaXMuY3VycmVudFZpZXcpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5Ib3VyVmlldykge1xuICAgICAgLy8gd2UgcmVmcmVzaCB0aGUgdmFsaWQgbWludXRlc1xuICAgICAgdGhpcy5jdXJyZW50Vmlld0NoYW5nZS5lbWl0KCdtaW51dGUnKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoeyB2YWx1ZTogdGhpcy5hY3RpdmVEYXRlLCBldmVudCB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBJbml0aWFsaXplcyB0aGlzIGNsb2NrIHZpZXcuXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX2hvdXJzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fbWludXRlcy5sZW5ndGggPSAwO1xuXG4gICAgY29uc3QgaG91ck5hbWVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91ck5hbWVzKCk7XG4gICAgY29uc3QgbWludXRlTmFtZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVOYW1lcygpO1xuXG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xuICAgICAgdGhpcy5fYW50ZU1lcmlkaWFuID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSA8IDEyO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJOYW1lcy5sZW5ndGggLyAyOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IENMT0NLX09VVEVSX1JBRElVUztcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICAgIHRoaXMuX2FudGVNZXJpZGlhbiA/IGkgOiBpICsgMTIsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faG91cnMucHVzaCh7XG4gICAgICAgICAgdmFsdWU6IHRoaXMuX2FudGVNZXJpZGlhbiA/IGkgOiBpICsgMTIsXG4gICAgICAgICAgZGlzcGxheVZhbHVlOiBpID09PSAwID8gaG91ck5hbWVzWzEyXSA6IGhvdXJOYW1lc1tpXSxcbiAgICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnaG91cicpLFxuICAgICAgICAgIGNzc0NsYXNzZXM6IHRoaXMuZGF0ZUNsYXNzID8gdGhpcy5kYXRlQ2xhc3MoZGF0ZSwgJ2hvdXInKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcbiAgICAgICAgY29uc3Qgb3V0ZXIgPSBpID4gMCAmJiBpIDwgMTM7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IG91dGVyID8gQ0xPQ0tfT1VURVJfUkFESVVTIDogQ0xPQ0tfSU5ORVJfUkFESVVTO1xuICAgICAgICBjb25zdCBob3VyID0gaSAlIDEyID8gaSA6IGkgPT09IDAgPyAxMiA6IDA7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgICBob3VyLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX2hvdXJzLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiBob3VyLFxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaG91ck5hbWVzW2hvdXJdLFxuICAgICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdob3VyJyksXG4gICAgICAgICAgY3NzQ2xhc3NlczogdGhpcy5kYXRlQ2xhc3MgPyB0aGlzLmRhdGVDbGFzcyhkYXRlLCAnaG91cicpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRvcDogQ0xPQ0tfUkFESVVTIC0gTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cyAtIENMT0NLX1RJQ0tfUkFESVVTLFxuICAgICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgICAgICBmb250U2l6ZTogaSA+IDAgJiYgaSA8IDEzID8gJycgOiAnODAlJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW51dGVOYW1lcy5sZW5ndGg7IGkgKz0gNSkge1xuICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyAzMCkgKiBNYXRoLlBJO1xuICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICBpLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgICApO1xuICAgICAgdGhpcy5fbWludXRlcy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGksXG4gICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcwMCcgOiBtaW51dGVOYW1lc1tpXSxcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpLFxuICAgICAgICBjc3NDbGFzc2VzOiB0aGlzLmRhdGVDbGFzcyA/IHRoaXMuZGF0ZUNsYXNzKGRhdGUsICdtaW51dGUnKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdG9wOlxuICAgICAgICAgIENMT0NLX1JBRElVUyAtXG4gICAgICAgICAgTWF0aC5jb3MocmFkaWFuKSAqIENMT0NLX09VVEVSX1JBRElVUyAtXG4gICAgICAgICAgQ0xPQ0tfVElDS19SQURJVVMsXG4gICAgICAgIGxlZnQ6XG4gICAgICAgICAgQ0xPQ0tfUkFESVVTICtcbiAgICAgICAgICBNYXRoLnNpbihyYWRpYW4pICogQ0xPQ0tfT1VURVJfUkFESVVTIC1cbiAgICAgICAgICBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLy8gU2V0IFRpbWVcbiAgcHJpdmF0ZSBzZXRUaW1lKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHRyaWdnZXJSZWN0ID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IHRyaWdnZXIub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdHJpZ2dlci5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgcGFnZVggPVxuICAgICAgZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWDtcbiAgICBjb25zdCBwYWdlWSA9XG4gICAgICBldmVudC5wYWdlWSAhPT0gdW5kZWZpbmVkID8gZXZlbnQucGFnZVkgOiBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIGNvbnN0IHggPSB3aWR0aCAvIDIgLSAocGFnZVggLSB0cmlnZ2VyUmVjdC5sZWZ0IC0gd2luZG93LnBhZ2VYT2Zmc2V0KTtcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiAtIChwYWdlWSAtIHRyaWdnZXJSZWN0LnRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgY29uc3QgdW5pdCA9XG4gICAgICBNYXRoLlBJIC9cbiAgICAgICh0aGlzLmluSG91clZpZXcgPyA2IDogdGhpcy5jbG9ja1N0ZXAgPyAzMCAvIHRoaXMuY2xvY2tTdGVwIDogMzApO1xuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgY29uc3QgYXZnID1cbiAgICAgICh3aWR0aCAqIChDTE9DS19PVVRFUl9SQURJVVMgLyAxMDApICtcbiAgICAgICAgd2lkdGggKiAoQ0xPQ0tfSU5ORVJfUkFESVVTIC8gMTAwKSkgL1xuICAgICAgMjtcbiAgICBjb25zdCBvdXRlciA9IHRoaXMuaW5Ib3VyVmlldyAmJiB6ID4gYXZnIC0gMTY7IC8qIGJ1dHRvbiByYWRpdXMgKi9cblxuICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKC14LCB5KTtcbiAgICBpZiAocmFkaWFuIDwgMCkge1xuICAgICAgcmFkaWFuID0gTWF0aC5QSSAqIDIgKyByYWRpYW47XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQocmFkaWFuIC8gdW5pdCk7XG5cbiAgICBsZXQgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsb25lKHRoaXMuYWN0aXZlRGF0ZSk7XG5cbiAgICBpZiAodGhpcy5pbkhvdXJWaWV3KSB7XG4gICAgICBpZiAodmFsdWUgPT09IDEyKSB7XG4gICAgICAgIHZhbHVlID0gMDtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gdGhpcy50d2VsdmVIb3VyXG4gICAgICAgID8gdGhpcy5fYW50ZU1lcmlkaWFuXG4gICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgIDogdmFsdWUgKyAxMlxuICAgICAgICA6IG91dGVyXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB2YWx1ZSArIDEyO1xuICAgICAgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLnNldEhvdXJzKGRhdGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2xvY2tTdGVwKSB7XG4gICAgICAgIHZhbHVlICo9IHRoaXMuY2xvY2tTdGVwO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09PSA2MCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhkYXRlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgaWYgdGhlIHJlc3VsdGluZyB2YWx1ZSBpcyBkaXNhYmxlZCBhbmQgZG8gbm90IHRha2UgYWN0aW9uXG4gICAgaWYgKHRoaXMuZGF0ZUZpbHRlciAmJiAhdGhpcy5kYXRlRmlsdGVyKGRhdGUsIHRoaXMuY3VycmVudFZpZXcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2UgZG9uJ3Qgd2FudCB0byByZS1yZW5kZXIgdGhlIGNsb2NrXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfZm9jdXNBY3RpdmVDZWxsKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAqL1xuICBwcml2YXRlIF9nZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgPyBvYmpcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1hdC1jbG9ja1wiIFtzdHlsZS53aWR0aC5weF09XCJfc2l6ZVwiIFtzdHlsZS5oZWlnaHQucHhdPVwiX3NpemVcIj5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWNsb2NrLWNlbnRlclwiPjwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtY2xvY2staGFuZFwiIFtuZ1N0eWxlXT1cIl9oYW5kXCI+PC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtY2xvY2staG91cnNcIiBbY2xhc3MuYWN0aXZlXT1cImluSG91clZpZXdcIj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2hvdXJzXCJcclxuICAgICAgY2xhc3M9XCJtYXQtY2xvY2stY2VsbFwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cIml0ZW0uY3NzQ2xhc3Nlc1wiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2xvY2stY2VsbC1zZWxlY3RlZF09XCJfc2VsZWN0ZWRIb3VyID09IGl0ZW0udmFsdWVcIlxyXG4gICAgICBbY2xhc3MubWF0LWNsb2NrLWNlbGwtZGlzYWJsZWRdPVwiIWl0ZW0uZW5hYmxlZFwiXHJcbiAgICAgIFtzdHlsZS50b3AuJV09XCJpdGVtLnRvcFwiXHJcbiAgICAgIFtzdHlsZS5sZWZ0LiVdPVwiaXRlbS5sZWZ0XCJcclxuICAgICAgW3N0eWxlLmZvbnRTaXplXT1cIml0ZW0uZm9udFNpemVcIj5cclxuICAgICAge3sgaXRlbS5kaXNwbGF5VmFsdWUgfX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWNsb2NrLW1pbnV0ZXNcIiBbY2xhc3MuYWN0aXZlXT1cIiFpbkhvdXJWaWV3XCI+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9taW51dGVzXCJcclxuICAgICAgY2xhc3M9XCJtYXQtY2xvY2stY2VsbFwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cIml0ZW0uY3NzQ2xhc3Nlc1wiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2xvY2stY2VsbC1zZWxlY3RlZF09XCJfc2VsZWN0ZWRNaW51dGUgPT0gaXRlbS52YWx1ZVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2xvY2stY2VsbC1kaXNhYmxlZF09XCIhaXRlbS5lbmFibGVkXCJcclxuICAgICAgW3N0eWxlLnRvcC4lXT1cIml0ZW0udG9wXCJcclxuICAgICAgW3N0eWxlLmxlZnQuJV09XCJpdGVtLmxlZnRcIj5cclxuICAgICAge3sgaXRlbS5kaXNwbGF5VmFsdWUgfX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19