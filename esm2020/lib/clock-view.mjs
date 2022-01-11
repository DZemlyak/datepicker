import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Optional, Output, ViewEncapsulation, } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter, } from './core';
import { createMissingDateImplError } from './datepicker-errors';
import * as i0 from "@angular/core";
import * as i1 from "./core";
import * as i2 from "@angular/common";
function MatClockView_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("top", item_r2.top, "%")("left", item_r2.left, "%")("font-size", item_r2.fontSize);
    i0.ɵɵclassProp("mat-clock-cell-selected", ctx_r0._selectedHour == item_r2.value)("mat-clock-cell-disabled", !item_r2.enabled);
    i0.ɵɵproperty("ngClass", item_r2.cssClasses);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r2.displayValue, " ");
} }
function MatClockView_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("top", item_r3.top, "%")("left", item_r3.left, "%");
    i0.ɵɵclassProp("mat-clock-cell-selected", ctx_r1._selectedMinute == item_r3.value)("mat-clock-cell-disabled", !item_r3.enabled);
    i0.ɵɵproperty("ngClass", item_r3.cssClasses);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r3.displayValue, " ");
} }
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
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵfac = function MatClockView_Factory(t) { return new (t || MatClockView)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8)); };
/** @nocollapse */ /** @nocollapse */ MatClockView.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatClockView, selectors: [["mat-clock-view"]], hostAttrs: ["role", "clock"], hostBindings: function MatClockView_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function MatClockView_mousedown_HostBindingHandler($event) { return ctx._handleMousedown($event); })("resize", function MatClockView_resize_HostBindingHandler() { return ctx.updateSize(); }, false, i0.ɵɵresolveWindow);
    } }, inputs: { activeDate: "activeDate", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", clockStep: "clockStep", twelveHour: "twelveHour", currentView: "currentView" }, outputs: { currentViewChange: "currentViewChange", selectedChange: "selectedChange", _userSelection: "_userSelection" }, exportAs: ["matClockView"], decls: 7, vars: 11, consts: [[1, "mat-clock"], [1, "mat-clock-center"], [1, "mat-clock-hand", 3, "ngStyle"], [1, "mat-clock-hours"], ["class", "mat-clock-cell", 3, "ngClass", "mat-clock-cell-selected", "mat-clock-cell-disabled", "top", "left", "fontSize", 4, "ngFor", "ngForOf"], [1, "mat-clock-minutes"], ["class", "mat-clock-cell", 3, "ngClass", "mat-clock-cell-selected", "mat-clock-cell-disabled", "top", "left", 4, "ngFor", "ngForOf"], [1, "mat-clock-cell", 3, "ngClass"]], template: function MatClockView_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelement(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtemplate(4, MatClockView_div_4_Template, 2, 12, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 5);
        i0.ɵɵtemplate(6, MatClockView_div_6_Template, 2, 10, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵstyleProp("width", ctx._size, "px")("height", ctx._size, "px");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngStyle", ctx._hand);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("active", ctx.inHourView);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx._hours);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("active", !ctx.inHourView);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx._minutes);
    } }, directives: [i2.NgStyle, i2.NgForOf, i2.NgClass], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatClockView, [{
        type: Component,
        args: [{ selector: 'mat-clock-view', exportAs: 'matClockView', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    role: 'clock',
                    '(mousedown)': '_handleMousedown($event)'
                }, preserveWhitespaces: false, template: "<div class=\"mat-clock\" [style.width.px]=\"_size\" [style.height.px]=\"_size\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"inHourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!inHourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }]; }, { activeDate: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2Nsb2NrLXZpZXcudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jbG9jay12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUNMLFdBQVcsR0FFWixNQUFNLFFBQVEsQ0FBQztBQUVoQixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7SUNoQjdELDhCQU9tQztJQUNqQyxZQUNGO0lBQUEsaUJBQU07Ozs7SUFKSix1Q0FBd0IsMkJBQUEsK0JBQUE7SUFGeEIsZ0ZBQTZELDZDQUFBO0lBRDdELDRDQUEyQjtJQU0zQixlQUNGO0lBREUscURBQ0Y7OztJQUlBLDhCQU02QjtJQUMzQixZQUNGO0lBQUEsaUJBQU07Ozs7SUFISix1Q0FBd0IsMkJBQUE7SUFGeEIsa0ZBQStELDZDQUFBO0lBRC9ELDRDQUEyQjtJQUszQixlQUNGO0lBREUscURBQ0Y7O0FERkosTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMvQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDdkMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUl4Qzs7O0dBR0c7QUFhSCxN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LDhEQVNNO1FBQ1IsaUJBQU07UUFFTiw4QkFBNEQ7UUFDMUQsOERBUU07UUFDUixpQkFBTTtRQUNSLGlCQUFNOztRQTVCaUIsd0NBQXdCLDJCQUFBO1FBRWpCLGVBQWlCO1FBQWpCLG1DQUFpQjtRQUVoQixlQUEyQjtRQUEzQix3Q0FBMkI7UUFDaEMsZUFBUztRQUFULG9DQUFTO1FBWUYsZUFBNEI7UUFBNUIseUNBQTRCO1FBQ25DLGVBQVc7UUFBWCxzQ0FBVzs7dUZENkJ4QixZQUFZO2NBWnhCLFNBQVM7MkJBQ0UsZ0JBQWdCLFlBRWhCLGNBQWMsaUJBQ1QsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6QztvQkFDSixJQUFJLEVBQUUsT0FBTztvQkFDYixhQUFhLEVBQUUsMEJBQTBCO2lCQUMxQyx1QkFDb0IsS0FBSzs7c0JBd0l2QixRQUFROztzQkFDUixRQUFROztzQkFDUixNQUFNO3VCQUFDLGdCQUFnQjt3QkFuSXRCLFVBQVU7a0JBRGIsS0FBSztZQTBCRixRQUFRO2tCQURYLEtBQUs7WUFhRixPQUFPO2tCQURWLEtBQUs7WUFhRixPQUFPO2tCQURWLEtBQUs7WUFZRyxVQUFVO2tCQUFsQixLQUFLO1lBR0csU0FBUztrQkFBakIsS0FBSztZQUVHLFNBQVM7a0JBQWpCLEtBQUs7WUFFRyxVQUFVO2tCQUFsQixLQUFLO1lBRUcsV0FBVztrQkFBbkIsS0FBSztZQUVJLGlCQUFpQjtrQkFBMUIsTUFBTTtZQUlFLGNBQWM7a0JBRHRCLE1BQU07WUFJWSxjQUFjO2tCQUFoQyxNQUFNO1lBR1AsVUFBVTtrQkFEVCxZQUFZO21CQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHtcclxuICBEYXRlQWRhcHRlcixcclxuICBNYXREYXRlRm9ybWF0cyxcclxufSBmcm9tICcuL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uLCBNYXRDYWxlbmRhclVzZXJFdmVudCB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcbmltcG9ydCB7IERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBDTE9DS19SQURJVVMgPSA1MDtcclxuZXhwb3J0IGNvbnN0IENMT0NLX0lOTkVSX1JBRElVUyA9IDI3LjU7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19PVVRFUl9SQURJVVMgPSA0MS4yNTtcclxuZXhwb3J0IGNvbnN0IENMT0NLX1RJQ0tfUkFESVVTID0gNy4wODMzO1xyXG5cclxuZXhwb3J0IHR5cGUgQ2xvY2tWaWV3ID0gJ2hvdXInIHwgJ21pbnV0ZSc7XHJcblxyXG4vKipcclxuICogQSBjbG9jayB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtY2xvY2stdmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICdjbG9jay12aWV3Lmh0bWwnLFxyXG4gIGV4cG9ydEFzOiAnbWF0Q2xvY2tWaWV3JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgIHJvbGU6ICdjbG9jaycsXHJcbiAgICAnKG1vdXNlZG93biknOiAnX2hhbmRsZU1vdXNlZG93bigkZXZlbnQpJ1xyXG4gIH0sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdENsb2NrVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lIHRvIGRpc3BsYXkgaW4gdGhpcyBjbG9jayB2aWV3LiAodGhlIHJlc3QgaXMgaWdub3JlZClcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9XHJcbiAgICAgIHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKFxyXG4gICAgICB2YWxpZERhdGUsXHJcbiAgICAgIHRoaXMubWluRGF0ZSxcclxuICAgICAgdGhpcy5tYXhEYXRlXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgb2xkQWN0aXZlRGF0ZSAmJlxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShvbGRBY3RpdmVEYXRlLCB0aGlzLl9hY3RpdmVEYXRlKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcclxuXHJcbiAgLy8gVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLlxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgfVxyXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbChcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpXHJcbiAgICApO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gIH1cclxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8vIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuXHJcbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogRGF0ZUZpbHRlckZuPEQ+O1xyXG5cclxuICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVDbGFzczogTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbjxEPjtcclxuXHJcbiAgQElucHV0KCkgY2xvY2tTdGVwOiBudW1iZXIgPSAxO1xyXG5cclxuICBASW5wdXQoKSB0d2VsdmVIb3VyOiBCb29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGN1cnJlbnRWaWV3OiBDbG9ja1ZpZXc7XHJcblxyXG4gIEBPdXRwdXQoKSBjdXJyZW50Vmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tWaWV3PigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RCB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IF91c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD4+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxyXG4gIHVwZGF0ZVNpemUoKSB7XHJcbiAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMuX3NpemUgPSAob2Zmc2V0V2lkdGggPCBvZmZzZXRIZWlnaHQgPyBvZmZzZXRXaWR0aCA6IG9mZnNldEhlaWdodCkgKiAwLjk7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvLyBIb3VycyBhbmQgTWludXRlcyByZXByZXNlbnRpbmcgdGhlIGNsb2NrIHZpZXcuXHJcbiAgX2hvdXJzOiBhbnlbXSA9IFtdO1xyXG4gIF9taW51dGVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICBfZHJhZ2dpbmdNb3VzZTogYm9vbGVhbjtcclxuICBfc2VsZWN0ZWRIb3VyOiBudW1iZXIgfCBudWxsO1xyXG4gIF9zZWxlY3RlZE1pbnV0ZTogbnVtYmVyIHwgbnVsbDtcclxuICBfYW50ZU1lcmlkaWFuOiBib29sZWFuO1xyXG4gIF9zaXplOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgbW91c2VNb3ZlTGlzdGVuZXI6IGFueTtcclxuICBwcml2YXRlIG1vdXNlVXBMaXN0ZW5lcjogYW55O1xyXG5cclxuICBnZXQgaW5Ib3VyVmlldygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3ID09PSAnaG91cic7XHJcbiAgfVxyXG5cclxuICBnZXQgX2hhbmQoKTogYW55IHtcclxuICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICB0aGlzLl9zZWxlY3RlZE1pbnV0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGxldCByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XHJcbiAgICBsZXQgZGVnID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5pbkhvdXJWaWV3KSB7XHJcbiAgICAgIGNvbnN0IG91dGVyID0gdGhpcy50d2VsdmVIb3VyIHx8IHRoaXMuX3NlbGVjdGVkSG91ciA+PSAwICYmIHRoaXMuX3NlbGVjdGVkSG91ciA8IDEyO1xyXG4gICAgICByYWRpdXMgPSBvdXRlciA/IENMT0NLX09VVEVSX1JBRElVUyA6IENMT0NLX0lOTkVSX1JBRElVUztcclxuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLl9zZWxlY3RlZEhvdXIgKiAoMzYwIC8gKDI0IC8gMikpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlZyA9IE1hdGgucm91bmQodGhpcy5fc2VsZWN0ZWRNaW51dGUgKiAoMzYwIC8gNjApKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHtkZWd9ZGVnKWAsXHJcbiAgICAgIGhlaWdodDogYCR7cmFkaXVzfSVgLFxyXG4gICAgICAnbWFyZ2luLXRvcCc6IGAkezUwIC0gcmFkaXVzfSVgLFxyXG4gICAgICB0cmFuc2l0aW9uOiB0aGlzLl9kcmFnZ2luZ01vdXNlID8gJ25vbmUnIDogJ2FsbCAzMDBtcyBlYXNlJyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXHJcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHNcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU1vdXNlbW92ZShldmVudCk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU1vdXNldXAoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVNpemUoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuX2luaXQoKTtcclxuICB9XHJcblxyXG4gIC8vIEhhbmRsZXMgbW91c2Vkb3duIGV2ZW50cyBvbiB0aGUgY2xvY2sgYm9keS5cclxuICBfaGFuZGxlTW91c2Vkb3duKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuX2RyYWdnaW5nTW91c2UgPSB0cnVlO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICAgIHRoaXMuc2V0VGltZShldmVudCk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTW91c2Vtb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnNldFRpbWUoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZU1vdXNldXAoKSB7XHJcbiAgICB0aGlzLl9kcmFnZ2luZ01vdXNlID0gZmFsc2U7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLmRhdGVGaWx0ZXIgJiYgIXRoaXMuZGF0ZUZpbHRlcih0aGlzLmFjdGl2ZURhdGUsIHRoaXMuY3VycmVudFZpZXcpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pbkhvdXJWaWV3KSB7XHJcbiAgICAgIC8vIHdlIHJlZnJlc2ggdGhlIHZhbGlkIG1pbnV0ZXNcclxuICAgICAgdGhpcy5jdXJyZW50Vmlld0NoYW5nZS5lbWl0KCdtaW51dGUnKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCh7IHZhbHVlOiB0aGlzLmFjdGl2ZURhdGUsIGV2ZW50IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZXMgdGhpcyBjbG9jayB2aWV3LlxyXG4gIF9pbml0KCkge1xyXG4gICAgdGhpcy5faG91cnMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuX21pbnV0ZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICBjb25zdCBob3VyTmFtZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3VyTmFtZXMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZU5hbWVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlTmFtZXMoKTtcclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XHJcbiAgICAgIHRoaXMuX2FudGVNZXJpZGlhbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSkgPCAxMjtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG91ck5hbWVzLmxlbmd0aCAvIDI7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gNikgKiBNYXRoLlBJO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IENMT0NLX09VVEVSX1JBRElVUztcclxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9hbnRlTWVyaWRpYW4gPyBpIDogaSArIDEyLFxyXG4gICAgICAgICAgMCxcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICAwXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9ob3Vycy5wdXNoKHtcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLl9hbnRlTWVyaWRpYW4gPyBpIDogaSArIDEyLFxyXG4gICAgICAgICAgZGlzcGxheVZhbHVlOiBpID09PSAwID8gaG91ck5hbWVzWzEyXSA6IGhvdXJOYW1lc1tpXSxcclxuICAgICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdob3VyJyksXHJcbiAgICAgICAgICBjc3NDbGFzc2VzOiB0aGlzLmRhdGVDbGFzcyA/IHRoaXMuZGF0ZUNsYXNzKGRhdGUsICdob3VyJykgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3VyTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBvdXRlciA9IGkgPiAwICYmIGkgPCAxMztcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBvdXRlciA/IENMT0NLX09VVEVSX1JBRElVUyA6IENMT0NLX0lOTkVSX1JBRElVUztcclxuICAgICAgICBjb25zdCBob3VyID0gaSAlIDEyID8gaSA6IChpID09PSAwID8gMTIgOiAwKTtcclxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICBob3VyLFxyXG4gICAgICAgICAgMCxcclxuICAgICAgICAgIDAsXHJcbiAgICAgICAgICAwXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9ob3Vycy5wdXNoKHtcclxuICAgICAgICAgIHZhbHVlOiBob3VyLFxyXG4gICAgICAgICAgZGlzcGxheVZhbHVlOiBob3VyTmFtZXNbaG91cl0sXHJcbiAgICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnaG91cicpLFxyXG4gICAgICAgICAgY3NzQ2xhc3NlczogdGhpcy5kYXRlQ2xhc3MgPyB0aGlzLmRhdGVDbGFzcyhkYXRlLCAnaG91cicpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgdG9wOiBDTE9DS19SQURJVVMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBmb250U2l6ZTogaSA+IDAgJiYgaSA8IDEzID8gJycgOiAnODAlJyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWludXRlTmFtZXMubGVuZ3RoOyBpICs9IDUpIHtcclxuICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyAzMCkgKiBNYXRoLlBJO1xyXG4gICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9taW51dGVzLnB1c2goe1xyXG4gICAgICAgIHZhbHVlOiBpLFxyXG4gICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcwMCcgOiBtaW51dGVOYW1lc1tpXSxcclxuICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnbWludXRlJyksXHJcbiAgICAgICAgY3NzQ2xhc3NlczogdGhpcy5kYXRlQ2xhc3MgPyB0aGlzLmRhdGVDbGFzcyhkYXRlLCAnbWludXRlJykgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgdG9wOlxyXG4gICAgICAgICAgQ0xPQ0tfUkFESVVTIC1cclxuICAgICAgICAgIE1hdGguY29zKHJhZGlhbikgKiBDTE9DS19PVVRFUl9SQURJVVMgLVxyXG4gICAgICAgICAgQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgbGVmdDpcclxuICAgICAgICAgIENMT0NLX1JBRElVUyArXHJcbiAgICAgICAgICBNYXRoLnNpbihyYWRpYW4pICogQ0xPQ0tfT1VURVJfUkFESVVTIC1cclxuICAgICAgICAgIENMT0NLX1RJQ0tfUkFESVVTLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8vIFNldCBUaW1lXHJcbiAgcHJpdmF0ZSBzZXRUaW1lKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0cmlnZ2VyUmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aWR0aCA9IHRyaWdnZXIub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0cmlnZ2VyLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHBhZ2VYID1cclxuICAgICAgZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWDtcclxuICAgIGNvbnN0IHBhZ2VZID1cclxuICAgICAgZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VZIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWTtcclxuICAgIGNvbnN0IHggPSB3aWR0aCAvIDIgLSAocGFnZVggLSB0cmlnZ2VyUmVjdC5sZWZ0IC0gd2luZG93LnBhZ2VYT2Zmc2V0KTtcclxuICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyIC0gKHBhZ2VZIC0gdHJpZ2dlclJlY3QudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0KTtcclxuICAgIGNvbnN0IHVuaXQgPVxyXG4gICAgICBNYXRoLlBJIC9cclxuICAgICAgKHRoaXMuaW5Ib3VyVmlldyA/IDYgOiB0aGlzLmNsb2NrU3RlcCA/IDMwIC8gdGhpcy5jbG9ja1N0ZXAgOiAzMCk7XHJcbiAgICBjb25zdCB6ID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xyXG4gICAgY29uc3QgYXZnID0gKHdpZHRoICogKENMT0NLX09VVEVSX1JBRElVUyAvIDEwMCkgKyB3aWR0aCAqIChDTE9DS19JTk5FUl9SQURJVVMgLyAxMDApKSAvIDI7XHJcbiAgICBjb25zdCBvdXRlciA9IHRoaXMuaW5Ib3VyVmlldyAmJiB6ID4gYXZnIC0gMTYgLyogYnV0dG9uIHJhZGl1cyAqLztcclxuXHJcbiAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuMigteCwgeSk7XHJcbiAgICBpZiAocmFkaWFuIDwgMCkge1xyXG4gICAgICByYWRpYW4gPSBNYXRoLlBJICogMiArIHJhZGlhbjtcclxuICAgIH1cclxuICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQocmFkaWFuIC8gdW5pdCk7XHJcblxyXG4gICAgbGV0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jbG9uZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIGlmICh0aGlzLmluSG91clZpZXcpIHtcclxuICAgICAgaWYgKHZhbHVlID09PSAxMikge1xyXG4gICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgfVxyXG4gICAgICB2YWx1ZSA9IHRoaXMudHdlbHZlSG91clxyXG4gICAgICAgID8gKHRoaXMuX2FudGVNZXJpZGlhbiA/IHZhbHVlIDogdmFsdWUgKyAxMilcclxuICAgICAgICA6IChvdXRlciA/IHZhbHVlIDogdmFsdWUgKyAxMik7XHJcbiAgICAgIGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5zZXRIb3VycyhkYXRlLCB2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jbG9ja1N0ZXApIHtcclxuICAgICAgICB2YWx1ZSAqPSB0aGlzLmNsb2NrU3RlcDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgPT09IDYwKSB7XHJcbiAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5zZXRNaW51dGVzKGRhdGUsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2YWxpZGF0ZSBpZiB0aGUgcmVzdWx0aW5nIHZhbHVlIGlzIGRpc2FibGVkIGFuZCBkbyBub3QgdGFrZSBhY3Rpb25cclxuICAgIGlmICh0aGlzLmRhdGVGaWx0ZXIgJiYgIXRoaXMuZGF0ZUZpbHRlcihkYXRlLCB0aGlzLmN1cnJlbnRWaWV3KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgZG9uJ3Qgd2FudCB0byByZS1yZW5kZXIgdGhlIGNsb2NrXHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gIH1cclxuXHJcbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSA/IG9iaiA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJtYXQtY2xvY2tcIiBbc3R5bGUud2lkdGgucHhdPVwiX3NpemVcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cIl9zaXplXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1hdC1jbG9jay1jZW50ZXJcIj48L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWNsb2NrLWhhbmRcIiBbbmdTdHlsZV09XCJfaGFuZFwiPjwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWNsb2NrLWhvdXJzXCIgW2NsYXNzLmFjdGl2ZV09XCJpbkhvdXJWaWV3XCI+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9ob3Vyc1wiXHJcbiAgICAgIGNsYXNzPVwibWF0LWNsb2NrLWNlbGxcIlxyXG4gICAgICBbbmdDbGFzc109XCJpdGVtLmNzc0NsYXNzZXNcIlxyXG4gICAgICBbY2xhc3MubWF0LWNsb2NrLWNlbGwtc2VsZWN0ZWRdPVwiX3NlbGVjdGVkSG91ciA9PSBpdGVtLnZhbHVlXCJcclxuICAgICAgW2NsYXNzLm1hdC1jbG9jay1jZWxsLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxyXG4gICAgICBbc3R5bGUudG9wLiVdPVwiaXRlbS50b3BcIlxyXG4gICAgICBbc3R5bGUubGVmdC4lXT1cIml0ZW0ubGVmdFwiXHJcbiAgICAgIFtzdHlsZS5mb250U2l6ZV09XCJpdGVtLmZvbnRTaXplXCI+XHJcbiAgICAgIHt7IGl0ZW0uZGlzcGxheVZhbHVlIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cIm1hdC1jbG9jay1taW51dGVzXCIgW2NsYXNzLmFjdGl2ZV09XCIhaW5Ib3VyVmlld1wiPlxyXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfbWludXRlc1wiXHJcbiAgICAgIGNsYXNzPVwibWF0LWNsb2NrLWNlbGxcIlxyXG4gICAgICBbbmdDbGFzc109XCJpdGVtLmNzc0NsYXNzZXNcIlxyXG4gICAgICBbY2xhc3MubWF0LWNsb2NrLWNlbGwtc2VsZWN0ZWRdPVwiX3NlbGVjdGVkTWludXRlID09IGl0ZW0udmFsdWVcIlxyXG4gICAgICBbY2xhc3MubWF0LWNsb2NrLWNlbGwtZGlzYWJsZWRdPVwiIWl0ZW0uZW5hYmxlZFwiXHJcbiAgICAgIFtzdHlsZS50b3AuJV09XCJpdGVtLnRvcFwiXHJcbiAgICAgIFtzdHlsZS5sZWZ0LiVdPVwiaXRlbS5sZWZ0XCI+XHJcbiAgICAgIHt7IGl0ZW0uZGlzcGxheVZhbHVlIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==