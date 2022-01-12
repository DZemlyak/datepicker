import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter, } from '@matheo/datepicker/core';
import { createMissingDateImplError } from './datepicker-errors';
import * as i0 from "@angular/core";
import * as i1 from "@matheo/datepicker/core";
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
        this._size = (offsetWidth < offsetHeight ? offsetWidth : offsetHeight) * 0.9;
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
            const outer = this.twelveHour || this._selectedHour >= 0 && this._selectedHour < 12;
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
        if (this.dateFilter && !this.dateFilter(this.activeDate, this.currentView)) {
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
                const hour = i % 12 ? i : (i === 0 ? 12 : 0);
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
        const avg = (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
        const outer = this.inHourView && z > avg - 16 /* button radius */;
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
                ? (this._anteMeridian ? value : value + 12)
                : (outer ? value : value + 12);
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
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatClockView, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.DateAdapter, optional: true }, { token: MAT_DATE_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatClockView, selector: "mat-clock-view", inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", clockStep: "clockStep", twelveHour: "twelveHour", currentView: "currentView" }, outputs: { currentViewChange: "currentViewChange", selectedChange: "selectedChange", _userSelection: "_userSelection" }, host: { attributes: { "role": "clock" }, listeners: { "mousedown": "_handleMousedown($event)", "window:resize": "updateSize()" } }, exportAs: ["matClockView"], ngImport: i0, template: "<div class=\"mat-clock\" [style.width.px]=\"_size\" [style.height.px]=\"_size\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"inHourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!inHourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n", directives: [{ type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatClockView, decorators: [{
            type: Component,
            args: [{ selector: 'mat-clock-view', exportAs: 'matClockView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'clock',
                        '(mousedown)': '_handleMousedown($event)'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2Nsb2NrLXZpZXcudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jbG9jay12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUNMLFdBQVcsR0FFWixNQUFNLHlCQUF5QixDQUFDO0FBRWpDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBR2pFLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUN4QyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUM7QUFJeEM7OztHQUdHO0FBYUgsTUFBTSxPQUFPLFlBQVk7SUFtSXZCLFlBQ1Usa0JBQXFDLEVBQ3JDLFFBQW9CLEVBQ1QsWUFBNEIsRUFHdkMsWUFBNEI7UUFMNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ1QsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBR3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQW5FN0IsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixlQUFVLEdBQVksS0FB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c0JBRFYsS0FBSztnQkFZRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksaUJBQWlCO3NCQUExQixNQUFNO2dCQUlFLGNBQWM7c0JBRHRCLE1BQU07Z0JBSVksY0FBYztzQkFBaEMsTUFBTTtnQkFHUCxVQUFVO3NCQURULFlBQVk7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIERhdGVBZGFwdGVyLFxyXG4gIE1hdERhdGVGb3JtYXRzLFxyXG59IGZyb20gJ0BtYXRoZW8vZGF0ZXBpY2tlci9jb3JlJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbiwgTWF0Q2FsZW5kYXJVc2VyRXZlbnQgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBEYXRlRmlsdGVyRm4gfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQtYmFzZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0xPQ0tfUkFESVVTID0gNTA7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19JTk5FUl9SQURJVVMgPSAyNy41O1xyXG5leHBvcnQgY29uc3QgQ0xPQ0tfT1VURVJfUkFESVVTID0gNDEuMjU7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19USUNLX1JBRElVUyA9IDcuMDgzMztcclxuXHJcbmV4cG9ydCB0eXBlIENsb2NrVmlldyA9ICdob3VyJyB8ICdtaW51dGUnO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xvY2sgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWNsb2NrLXZpZXcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2xvY2stdmlldy5odG1sJyxcclxuICBleHBvcnRBczogJ21hdENsb2NrVmlldycsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICByb2xlOiAnY2xvY2snLFxyXG4gICAgJyhtb3VzZWRvd24pJzogJ19oYW5kbGVNb3VzZWRvd24oJGV2ZW50KSdcclxuICB9LFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRDbG9ja1ZpZXc8RD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBUaGUgdGltZSB0byBkaXNwbGF5IGluIHRoaXMgY2xvY2sgdmlldy4gKHRoZSByZXN0IGlzIGlnbm9yZWQpXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xyXG4gIH1cclxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xyXG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgICBjb25zdCB2YWxpZERhdGUgPVxyXG4gICAgICB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci50b2RheSgpO1xyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZShcclxuICAgICAgdmFsaWREYXRlLFxyXG4gICAgICB0aGlzLm1pbkRhdGUsXHJcbiAgICAgIHRoaXMubWF4RGF0ZVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9sZEFjdGl2ZURhdGUgJiZcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XHJcblxyXG4gIC8vIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xyXG4gIH1cclxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICB9XHJcbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvLyBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLlxyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cclxuICBASW5wdXQoKSBkYXRlQ2xhc3M6IE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD47XHJcblxyXG4gIEBJbnB1dCgpIGNsb2NrU3RlcDogbnVtYmVyID0gMTtcclxuXHJcbiAgQElucHV0KCkgdHdlbHZlSG91cjogQm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBjdXJyZW50VmlldzogQ2xvY2tWaWV3O1xyXG5cclxuICBAT3V0cHV0KCkgY3VycmVudFZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrVmlldz4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KClcclxuICByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEQgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8RCB8IG51bGw+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBfdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RCB8IG51bGw+PigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcclxuICB1cGRhdGVTaXplKCkge1xyXG4gICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLl9zaXplID0gKG9mZnNldFdpZHRoIDwgb2Zmc2V0SGVpZ2h0ID8gb2Zmc2V0V2lkdGggOiBvZmZzZXRIZWlnaHQpICogMC45O1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gSG91cnMgYW5kIE1pbnV0ZXMgcmVwcmVzZW50aW5nIHRoZSBjbG9jayB2aWV3LlxyXG4gIF9ob3VyczogYW55W10gPSBbXTtcclxuICBfbWludXRlczogYW55W10gPSBbXTtcclxuXHJcbiAgX2RyYWdnaW5nTW91c2U6IGJvb2xlYW47XHJcbiAgX3NlbGVjdGVkSG91cjogbnVtYmVyIHwgbnVsbDtcclxuICBfc2VsZWN0ZWRNaW51dGU6IG51bWJlciB8IG51bGw7XHJcbiAgX2FudGVNZXJpZGlhbjogYm9vbGVhbjtcclxuICBfc2l6ZTogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIG1vdXNlTW92ZUxpc3RlbmVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBtb3VzZVVwTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgZ2V0IGluSG91clZpZXcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmlldyA9PT0gJ2hvdXInO1xyXG4gIH1cclxuXHJcbiAgZ2V0IF9oYW5kKCk6IGFueSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEhvdXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRNaW51dGUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBsZXQgcmFkaXVzID0gQ0xPQ0tfT1VURVJfUkFESVVTO1xyXG4gICAgbGV0IGRlZyA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5Ib3VyVmlldykge1xyXG4gICAgICBjb25zdCBvdXRlciA9IHRoaXMudHdlbHZlSG91ciB8fCB0aGlzLl9zZWxlY3RlZEhvdXIgPj0gMCAmJiB0aGlzLl9zZWxlY3RlZEhvdXIgPCAxMjtcclxuICAgICAgcmFkaXVzID0gb3V0ZXIgPyBDTE9DS19PVVRFUl9SQURJVVMgOiBDTE9DS19JTk5FUl9SQURJVVM7XHJcbiAgICAgIGRlZyA9IE1hdGgucm91bmQodGhpcy5fc2VsZWN0ZWRIb3VyICogKDM2MCAvICgyNCAvIDIpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWcgPSBNYXRoLnJvdW5kKHRoaXMuX3NlbGVjdGVkTWludXRlICogKDM2MCAvIDYwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7ZGVnfWRlZylgLFxyXG4gICAgICBoZWlnaHQ6IGAke3JhZGl1c30lYCxcclxuICAgICAgJ21hcmdpbi10b3AnOiBgJHs1MCAtIHJhZGl1c30lYCxcclxuICAgICAgdHJhbnNpdGlvbjogdGhpcy5fZHJhZ2dpbmdNb3VzZSA/ICdub25lJyA6ICdhbGwgMzAwbXMgZWFzZScsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfREFURV9GT1JNQVRTKVxyXG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVNb3VzZW1vdmUoZXZlbnQpO1xyXG4gICAgfTtcclxuICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVNb3VzZXVwKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy51cGRhdGVTaXplKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBIYW5kbGVzIG1vdXNlZG93biBldmVudHMgb24gdGhlIGNsb2NrIGJvZHkuXHJcbiAgX2hhbmRsZU1vdXNlZG93bihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLl9kcmFnZ2luZ01vdXNlID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgICB0aGlzLnNldFRpbWUoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZU1vdXNlbW92ZShldmVudDogYW55KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5zZXRUaW1lKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVNb3VzZXVwKCkge1xyXG4gICAgdGhpcy5fZHJhZ2dpbmdNb3VzZSA9IGZhbHNlO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5kYXRlRmlsdGVyICYmICF0aGlzLmRhdGVGaWx0ZXIodGhpcy5hY3RpdmVEYXRlLCB0aGlzLmN1cnJlbnRWaWV3KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaW5Ib3VyVmlldykge1xyXG4gICAgICAvLyB3ZSByZWZyZXNoIHRoZSB2YWxpZCBtaW51dGVzXHJcbiAgICAgIHRoaXMuY3VycmVudFZpZXdDaGFuZ2UuZW1pdCgnbWludXRlJyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoeyB2YWx1ZTogdGhpcy5hY3RpdmVEYXRlLCBldmVudCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEluaXRpYWxpemVzIHRoaXMgY2xvY2sgdmlldy5cclxuICBfaW5pdCgpIHtcclxuICAgIHRoaXMuX2hvdXJzLmxlbmd0aCA9IDA7XHJcbiAgICB0aGlzLl9taW51dGVzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgY29uc3QgaG91ck5hbWVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91ck5hbWVzKCk7XHJcbiAgICBjb25zdCBtaW51dGVOYW1lcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZU5hbWVzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xyXG4gICAgICB0aGlzLl9hbnRlTWVyaWRpYW4gPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpIDwgMTI7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJOYW1lcy5sZW5ndGggLyAyOyBpKyspIHtcclxuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fYW50ZU1lcmlkaWFuID8gaSA6IGkgKyAxMixcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgMFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5faG91cnMucHVzaCh7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5fYW50ZU1lcmlkaWFuID8gaSA6IGkgKyAxMixcclxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/IGhvdXJOYW1lc1sxMl0gOiBob3VyTmFtZXNbaV0sXHJcbiAgICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnaG91cicpLFxyXG4gICAgICAgICAgY3NzQ2xhc3NlczogdGhpcy5kYXRlQ2xhc3MgPyB0aGlzLmRhdGVDbGFzcyhkYXRlLCAnaG91cicpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgdG9wOiBDTE9DS19SQURJVVMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG91ck5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3Qgb3V0ZXIgPSBpID4gMCAmJiBpIDwgMTM7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gb3V0ZXIgPyBDTE9DS19PVVRFUl9SQURJVVMgOiBDTE9DS19JTk5FUl9SQURJVVM7XHJcbiAgICAgICAgY29uc3QgaG91ciA9IGkgJSAxMiA/IGkgOiAoaSA9PT0gMCA/IDEyIDogMCk7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgaG91cixcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICAwLFxyXG4gICAgICAgICAgMFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5faG91cnMucHVzaCh7XHJcbiAgICAgICAgICB2YWx1ZTogaG91cixcclxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaG91ck5hbWVzW2hvdXJdLFxyXG4gICAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ2hvdXInKSxcclxuICAgICAgICAgIGNzc0NsYXNzZXM6IHRoaXMuZGF0ZUNsYXNzID8gdGhpcy5kYXRlQ2xhc3MoZGF0ZSwgJ2hvdXInKSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIHRvcDogQ0xPQ0tfUkFESVVTIC0gTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cyAtIENMT0NLX1RJQ0tfUkFESVVTLFxyXG4gICAgICAgICAgbGVmdDogQ0xPQ0tfUkFESVVTICsgTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyAtIENMT0NLX1RJQ0tfUkFESVVTLFxyXG4gICAgICAgICAgZm9udFNpemU6IGkgPiAwICYmIGkgPCAxMyA/ICcnIDogJzgwJScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pbnV0ZU5hbWVzLmxlbmd0aDsgaSArPSA1KSB7XHJcbiAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gMzApICogTWF0aC5QSTtcclxuICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgaSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIDBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fbWludXRlcy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogaSxcclxuICAgICAgICBkaXNwbGF5VmFsdWU6IGkgPT09IDAgPyAnMDAnIDogbWludXRlTmFtZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpLFxyXG4gICAgICAgIGNzc0NsYXNzZXM6IHRoaXMuZGF0ZUNsYXNzID8gdGhpcy5kYXRlQ2xhc3MoZGF0ZSwgJ21pbnV0ZScpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHRvcDpcclxuICAgICAgICAgIENMT0NLX1JBRElVUyAtXHJcbiAgICAgICAgICBNYXRoLmNvcyhyYWRpYW4pICogQ0xPQ0tfT1VURVJfUkFESVVTIC1cclxuICAgICAgICAgIENMT0NLX1RJQ0tfUkFESVVTLFxyXG4gICAgICAgIGxlZnQ6XHJcbiAgICAgICAgICBDTE9DS19SQURJVVMgK1xyXG4gICAgICAgICAgTWF0aC5zaW4ocmFkaWFuKSAqIENMT0NLX09VVEVSX1JBRElVUyAtXHJcbiAgICAgICAgICBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgVGltZVxyXG4gIHByaXZhdGUgc2V0VGltZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgdHJpZ2dlclJlY3QgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSB0cmlnZ2VyLm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gdHJpZ2dlci5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBwYWdlWCA9XHJcbiAgICAgIGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWCA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICBjb25zdCBwYWdlWSA9XHJcbiAgICAgIGV2ZW50LnBhZ2VZICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWSA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICBjb25zdCB4ID0gd2lkdGggLyAyIC0gKHBhZ2VYIC0gdHJpZ2dlclJlY3QubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldCk7XHJcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiAtIChwYWdlWSAtIHRyaWdnZXJSZWN0LnRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XHJcbiAgICBjb25zdCB1bml0ID1cclxuICAgICAgTWF0aC5QSSAvXHJcbiAgICAgICh0aGlzLmluSG91clZpZXcgPyA2IDogdGhpcy5jbG9ja1N0ZXAgPyAzMCAvIHRoaXMuY2xvY2tTdGVwIDogMzApO1xyXG4gICAgY29uc3QgeiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuICAgIGNvbnN0IGF2ZyA9ICh3aWR0aCAqIChDTE9DS19PVVRFUl9SQURJVVMgLyAxMDApICsgd2lkdGggKiAoQ0xPQ0tfSU5ORVJfUkFESVVTIC8gMTAwKSkgLyAyO1xyXG4gICAgY29uc3Qgb3V0ZXIgPSB0aGlzLmluSG91clZpZXcgJiYgeiA+IGF2ZyAtIDE2IC8qIGJ1dHRvbiByYWRpdXMgKi87XHJcblxyXG4gICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbjIoLXgsIHkpO1xyXG4gICAgaWYgKHJhZGlhbiA8IDApIHtcclxuICAgICAgcmFkaWFuID0gTWF0aC5QSSAqIDIgKyByYWRpYW47XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWUgPSBNYXRoLnJvdW5kKHJhZGlhbiAvIHVuaXQpO1xyXG5cclxuICAgIGxldCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xvbmUodGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBpZiAodGhpcy5pbkhvdXJWaWV3KSB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gMTIpIHtcclxuICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdmFsdWUgPSB0aGlzLnR3ZWx2ZUhvdXJcclxuICAgICAgICA/ICh0aGlzLl9hbnRlTWVyaWRpYW4gPyB2YWx1ZSA6IHZhbHVlICsgMTIpXHJcbiAgICAgICAgOiAob3V0ZXIgPyB2YWx1ZSA6IHZhbHVlICsgMTIpO1xyXG4gICAgICBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0SG91cnMoZGF0ZSwgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY2xvY2tTdGVwKSB7XHJcbiAgICAgICAgdmFsdWUgKj0gdGhpcy5jbG9ja1N0ZXA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlID09PSA2MCkge1xyXG4gICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgfVxyXG4gICAgICBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhkYXRlLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmFsaWRhdGUgaWYgdGhlIHJlc3VsdGluZyB2YWx1ZSBpcyBkaXNhYmxlZCBhbmQgZG8gbm90IHRha2UgYWN0aW9uXHJcbiAgICBpZiAodGhpcy5kYXRlRmlsdGVyICYmICF0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgdGhpcy5jdXJyZW50VmlldykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gcmUtcmVuZGVyIHRoZSBjbG9ja1xyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGRhdGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICB9XHJcblxyXG4gIF9mb2N1c0FjdGl2ZUNlbGwoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLl9kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikgPyBvYmogOiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibWF0LWNsb2NrXCIgW3N0eWxlLndpZHRoLnB4XT1cIl9zaXplXCIgW3N0eWxlLmhlaWdodC5weF09XCJfc2l6ZVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtY2xvY2stY2VudGVyXCI+PC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm1hdC1jbG9jay1oYW5kXCIgW25nU3R5bGVdPVwiX2hhbmRcIj48L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cIm1hdC1jbG9jay1ob3Vyc1wiIFtjbGFzcy5hY3RpdmVdPVwiaW5Ib3VyVmlld1wiPlxyXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfaG91cnNcIlxyXG4gICAgICBjbGFzcz1cIm1hdC1jbG9jay1jZWxsXCJcclxuICAgICAgW25nQ2xhc3NdPVwiaXRlbS5jc3NDbGFzc2VzXCJcclxuICAgICAgW2NsYXNzLm1hdC1jbG9jay1jZWxsLXNlbGVjdGVkXT1cIl9zZWxlY3RlZEhvdXIgPT0gaXRlbS52YWx1ZVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2xvY2stY2VsbC1kaXNhYmxlZF09XCIhaXRlbS5lbmFibGVkXCJcclxuICAgICAgW3N0eWxlLnRvcC4lXT1cIml0ZW0udG9wXCJcclxuICAgICAgW3N0eWxlLmxlZnQuJV09XCJpdGVtLmxlZnRcIlxyXG4gICAgICBbc3R5bGUuZm9udFNpemVdPVwiaXRlbS5mb250U2l6ZVwiPlxyXG4gICAgICB7eyBpdGVtLmRpc3BsYXlWYWx1ZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtY2xvY2stbWludXRlc1wiIFtjbGFzcy5hY3RpdmVdPVwiIWluSG91clZpZXdcIj5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX21pbnV0ZXNcIlxyXG4gICAgICBjbGFzcz1cIm1hdC1jbG9jay1jZWxsXCJcclxuICAgICAgW25nQ2xhc3NdPVwiaXRlbS5jc3NDbGFzc2VzXCJcclxuICAgICAgW2NsYXNzLm1hdC1jbG9jay1jZWxsLXNlbGVjdGVkXT1cIl9zZWxlY3RlZE1pbnV0ZSA9PSBpdGVtLnZhbHVlXCJcclxuICAgICAgW2NsYXNzLm1hdC1jbG9jay1jZWxsLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxyXG4gICAgICBbc3R5bGUudG9wLiVdPVwiaXRlbS50b3BcIlxyXG4gICAgICBbc3R5bGUubGVmdC4lXT1cIml0ZW0ubGVmdFwiPlxyXG4gICAgICB7eyBpdGVtLmRpc3BsYXlWYWx1ZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=