/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation, isDevMode, } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { DateAdapter, } from './core';
import { matDatepickerAnimations } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatClockView } from './clock-view';
import { MatMonthView } from './month-view';
import { getActiveOffset, isSameMultiYearView, MatMultiYearView, } from './multi-year-view';
import { MatYearView } from './year-view';
import { MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, DateRange } from './date-selection-model';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "./core";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/cdk/portal";
import * as i6 from "@angular/cdk/a11y";
import * as i7 from "./clock-view";
import * as i8 from "./month-view";
import * as i9 from "./year-view";
import * as i10 from "./multi-year-view";
const _c0 = function () { return ["multi-year"]; };
function MatCalendarHeader_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "button", 6);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.switchToView("multi-year"); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r0.isControlActive(i0.ɵɵpureFunction0(5, _c0)));
    i0.ɵɵproperty("@controlActive", ctx_r0.isControlActive(i0.ɵɵpureFunction0(6, _c0)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r0._intl.switchToMultiYearViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0._yearButtonText);
} }
const _c1 = function () { return ["year"]; };
function MatCalendarHeader_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "button", 7);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.switchToView("year"); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 6);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_3_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.switchToView("multi-year"); });
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r1.isControlActive(i0.ɵɵpureFunction0(10, _c1)));
    i0.ɵɵproperty("@controlActive", ctx_r1.isControlActive(i0.ɵɵpureFunction0(11, _c1)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r1._intl.switchToYearViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1._monthButtonText);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r1.isControlActive(i0.ɵɵpureFunction0(12, _c0)));
    i0.ɵɵproperty("@controlActive", ctx_r1.isControlActive(i0.ɵɵpureFunction0(13, _c0)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r1._intl.switchToMultiYearViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1._yearButtonText);
} }
const _c2 = function () { return ["month", "year"]; };
function MatCalendarHeader_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "button", 6);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.switchToView("multi-year"); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 8);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_4_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r11); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.monthdayClicked(); });
    i0.ɵɵelementStart(5, "span", 9);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 10);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r2.isControlActive(i0.ɵɵpureFunction0(11, _c0)));
    i0.ɵɵproperty("@controlActive", ctx_r2.isControlActive(i0.ɵɵpureFunction0(12, _c0)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r2._intl.switchToMultiYearViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2._yearButtonText);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r2.isControlActive(i0.ɵɵpureFunction0(13, _c2)));
    i0.ɵɵproperty("@controlActive", ctx_r2.isControlActive(i0.ɵɵpureFunction0(14, _c2)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r2.monthdayButtonLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2._dayButtonText, "\u00A0");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2._monthdayButtonText);
} }
function MatCalendarHeader_div_5_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelementStart(1, "button", 18);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_5_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(2); return ctx_r14.toggleAmPm(true); });
    i0.ɵɵtext(2, " AM ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 18);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_5_div_10_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r15); const ctx_r16 = i0.ɵɵnextContext(2); return ctx_r16.toggleAmPm(false); });
    i0.ɵɵtext(4, " PM ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r13._isAM);
    i0.ɵɵproperty("@controlActive", ctx_r13._isAM ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r13._intl.setToAMLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mat-custom-control-active", !ctx_r13._isAM);
    i0.ɵɵproperty("@controlActive", !ctx_r13._isAM ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r13._intl.setToPMLabel);
} }
const _c3 = function () { return ["hour"]; };
const _c4 = function () { return ["minute"]; };
function MatCalendarHeader_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelementStart(1, "div", 12);
    i0.ɵɵelementStart(2, "button", 13);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_5_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r18); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.switchToView("hour"); });
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 14);
    i0.ɵɵtext(6, ":");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 15);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_5_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r18); const ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.switchToView("minute"); });
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, MatCalendarHeader_div_5_div_10_Template, 5, 8, "div", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r3.isControlActive(i0.ɵɵpureFunction0(11, _c3)));
    i0.ɵɵproperty("@controlActive", ctx_r3.isControlActive(i0.ɵɵpureFunction0(12, _c3)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r3._intl.switchToHourViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3._hourButtonText);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mat-custom-control-active", ctx_r3.isControlActive(i0.ɵɵpureFunction0(13, _c4)));
    i0.ɵɵproperty("@controlActive", ctx_r3.isControlActive(i0.ɵɵpureFunction0(14, _c4)) ? "active" : "");
    i0.ɵɵattribute("aria-label", ctx_r3._intl.switchToMinuteViewLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3._minuteButtonText);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.calendar.twelveHour);
} }
function MatCalendarHeader_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelementStart(1, "button", 20);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r21); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.previousClicked(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 21);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_6_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r21); const ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.currentPeriodClicked(); });
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 22);
    i0.ɵɵlistener("click", function MatCalendarHeader_div_6_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r21); const ctx_r23 = i0.ɵɵnextContext(); return ctx_r23.nextClicked(); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r4.previousEnabled());
    i0.ɵɵattribute("aria-label", ctx_r4.prevButtonLabel);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", ctx_r4.currentPeriodDisabled());
    i0.ɵɵattribute("aria-label", ctx_r4.periodButtonLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.periodButtonText);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r4.nextEnabled());
    i0.ɵɵattribute("aria-label", ctx_r4.nextButtonLabel);
} }
function MatCalendar_ng_template_0_Template(rf, ctx) { }
function MatCalendar_mat_clock_view_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-clock-view", 6);
    i0.ɵɵlistener("activeDateChange", function MatCalendar_mat_clock_view_2_Template_mat_clock_view_activeDateChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.activeDate = $event; })("currentViewChange", function MatCalendar_mat_clock_view_2_Template_mat_clock_view_currentViewChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.currentView = $event; })("selectedChange", function MatCalendar_mat_clock_view_2_Template_mat_clock_view_selectedChange_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.setDate($event); })("hourSelected", function MatCalendar_mat_clock_view_2_Template_mat_clock_view_hourSelected_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9._hourSelectedInClockView($event); })("_userSelection", function MatCalendar_mat_clock_view_2_Template_mat_clock_view__userSelection_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10._timeSelectedInClockView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("activeDate", ctx_r1.activeDate)("selected", ctx_r1.selected)("currentView", ctx_r1.currentView)("selected", ctx_r1.selected)("dateFilter", ctx_r1.dateFilter)("dateClass", ctx_r1.dateClass)("clockStep", ctx_r1.clockStep)("twelveHour", ctx_r1.twelveHour);
} }
function MatCalendar_mat_month_view_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-month-view", 7);
    i0.ɵɵlistener("activeDateChange", function MatCalendar_mat_month_view_3_Template_mat_month_view_activeDateChange_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.activeDate = $event; })("_userSelection", function MatCalendar_mat_month_view_3_Template_mat_month_view__userSelection_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13._daySelected($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("activeDate", ctx_r2.activeDate)("selected", ctx_r2.selected)("dateFilter", ctx_r2.dateFilter)("maxDate", ctx_r2.maxDate)("minDate", ctx_r2.minDate)("dateClass", ctx_r2.dateClass)("comparisonStart", ctx_r2.comparisonStart)("comparisonEnd", ctx_r2.comparisonEnd);
} }
function MatCalendar_mat_year_view_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-year-view", 8);
    i0.ɵɵlistener("activeDateChange", function MatCalendar_mat_year_view_4_Template_mat_year_view_activeDateChange_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r14 = i0.ɵɵnextContext(); return ctx_r14.activeDate = $event; })("monthSelected", function MatCalendar_mat_year_view_4_Template_mat_year_view_monthSelected_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16._monthSelectedInYearView($event); })("selectedChange", function MatCalendar_mat_year_view_4_Template_mat_year_view_selectedChange_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.hasOutput("month") ? ctx_r17._dateEmit($event) : ctx_r17._goToDateInView($event, "month"); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("activeDate", ctx_r3.activeDate)("selected", ctx_r3.selected)("dateFilter", ctx_r3.dateFilter)("maxDate", ctx_r3.maxDate)("minDate", ctx_r3.minDate)("dateClass", ctx_r3.dateClass);
} }
function MatCalendar_mat_multi_year_view_5_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-multi-year-view", 9);
    i0.ɵɵlistener("activeDateChange", function MatCalendar_mat_multi_year_view_5_Template_mat_multi_year_view_activeDateChange_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.activeDate = $event; })("yearSelected", function MatCalendar_mat_multi_year_view_5_Template_mat_multi_year_view_yearSelected_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20._yearSelectedInMultiYearView($event); })("selectedChange", function MatCalendar_mat_multi_year_view_5_Template_mat_multi_year_view_selectedChange_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.hasOutput("year") ? ctx_r21._dateEmit($event) : ctx_r21._goToDateInView($event, "year"); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("yearsPerPage", ctx_r4.yearsPerPage)("yearsPerRow", ctx_r4.yearsPerRow)("activeDate", ctx_r4.activeDate)("selected", ctx_r4.selected)("dateFilter", ctx_r4.dateFilter)("maxDate", ctx_r4.maxDate)("minDate", ctx_r4.minDate)("dateClass", ctx_r4.dateClass);
} }
/** Counter used to generate unique IDs. */
let uniqueId = 0;
/** Default header for MatCalendar */
export class MatCalendarHeader {
    constructor(_intl, calendar, _dateAdapter, _dateFormats, changeDetectorRef) {
        this._intl = _intl;
        this.calendar = calendar;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this.changeDetectorRef = changeDetectorRef;
        this._buttonDescriptionId = `mat-calendar-button-${uniqueId++}`;
        this.updateValues();
        this.calendar.stateChanges.subscribe(() => this.updateValues());
    }
    get getCssClasses() {
        const cssClasses = [`type-${this.calendar.type}`];
        return cssClasses.join(' ');
    }
    updateValues() {
        const activeDate = this.calendar.getDate();
        const day = this._dateAdapter.getDayOfWeek(activeDate);
        let hours = this._dateAdapter.getHours(activeDate);
        this._isAM = hours < 12;
        if (this.calendar.twelveHour) {
            hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        }
        const minutes = this._dateAdapter.getMinutes(activeDate);
        this._yearButtonText = this._dateAdapter.getYear(activeDate).toString();
        this._monthButtonText = this._dateAdapter.format(activeDate, this._dateFormats.display.monthLabel);
        this._monthdayButtonText = this._dateAdapter.format(activeDate, this._dateFormats.display.monthDayLabel);
        this._dayButtonText = this._dateAdapter.getDayOfWeekNames('short')[day];
        this._hourButtonText = hours.toString();
        this._minuteButtonText = ('00' + minutes).slice(-2);
        this.changeDetectorRef.markForCheck();
    }
    hasPrevNextBlock() {
        return !['hour', 'minute'].includes(this.calendar.currentView);
    }
    isControlActive(views) {
        return views.includes(this.calendar.currentView);
    }
    switchToView(view) {
        this.calendar.currentView = view;
    }
    toggleAmPm(am) {
        if (this._isAM !== am) {
            this.calendar.setDate(this._dateAdapter.addCalendarHours(this.calendar.getDate(), this._isAM ? 12 : -12));
        }
    }
    /** The label for the current calendar view. */
    get periodButtonText() {
        if (this.calendar.currentView == 'month') {
            return this._dateAdapter
                .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
                .toLocaleUpperCase();
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYearName(this.calendar.activeDate);
        }
        // The offset from the active year to the "slot" for the starting year is the
        // *actual* first rendered year in the multi-year view, and the last year is
        // just yearsPerPage - 1 away.
        const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
        const minYearOfPage = activeYear -
            getActiveOffset(this._dateAdapter, this.calendar.activeDate, this.calendar.minDate, this.calendar.maxDate, this.calendar.yearsPerPage);
        const maxYearOfPage = minYearOfPage + this.calendar.yearsPerPage - 1;
        const minYearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(minYearOfPage, 0, 1));
        const maxYearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(maxYearOfPage, 0, 1));
        return this._intl.formatYearRange(minYearName, maxYearName);
    }
    get monthdayButtonLabel() {
        return this.calendar.currentView == 'month'
            ? this._intl.switchToYearViewLabel
            : this._intl.switchToMonthViewLabel;
    }
    get periodButtonLabel() {
        return this.calendar.currentView == 'month'
            ? this._intl.switchToMultiYearViewLabel
            : this._intl.switchToMonthViewLabel;
    }
    /** The label for the previous button. */
    get prevButtonLabel() {
        return {
            'month': this._intl.prevMonthLabel,
            'year': this._intl.prevYearLabel,
            'multi-year': this._intl.prevMultiYearLabel,
        }[this.calendar.currentView];
    }
    /** The label for the next button. */
    get nextButtonLabel() {
        return {
            'month': this._intl.nextMonthLabel,
            'year': this._intl.nextYearLabel,
            'multi-year': this._intl.nextMultiYearLabel,
        }[this.calendar.currentView];
    }
    monthdayClicked() {
        this.calendar.currentView = this.calendar.currentView == 'month' ? 'year' : 'month';
    }
    currentPeriodDisabled() {
        return ['year', 'month'].includes(this.calendar.type);
    }
    /** Handles user clicks on the period label. */
    currentPeriodClicked() {
        this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
    }
    /** Handles user clicks on the previous button. */
    previousClicked() {
        const date = this.calendar.currentView == 'month'
            ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1)
            : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? -1 : -this.calendar.yearsPerPage);
        this.calendar.setDate(date);
    }
    /** Handles user clicks on the next button. */
    nextClicked() {
        const date = this.calendar.currentView == 'month'
            ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
            : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? 1 : this.calendar.yearsPerPage);
        this.calendar.setDate(date);
    }
    /** Whether the previous period button is enabled. */
    previousEnabled() {
        if (!this.calendar.minDate) {
            return true;
        }
        return (!this.calendar.minDate || !this._isSameView(this.calendar.activeDate, this.calendar.minDate));
    }
    /** Whether the next period button is enabled. */
    nextEnabled() {
        return (!this.calendar.maxDate || !this._isSameView(this.calendar.activeDate, this.calendar.maxDate));
    }
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    _isSameView(date1, date2) {
        if (this.calendar.currentView == 'month') {
            return (this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2));
        }
        if (this.calendar.currentView == 'year') {
            return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return isSameMultiYearView(this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate, this.calendar.yearsPerPage);
    }
}
/** @nocollapse */ /** @nocollapse */ MatCalendarHeader.ɵfac = function MatCalendarHeader_Factory(t) { return new (t || MatCalendarHeader)(i0.ɵɵdirectiveInject(i1.MatDatepickerIntl), i0.ɵɵdirectiveInject(forwardRef(() => MatCalendar)), i0.ɵɵdirectiveInject(i2.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
/** @nocollapse */ /** @nocollapse */ MatCalendarHeader.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatCalendarHeader, selectors: [["mat-custom-header"]], hostVars: 2, hostBindings: function MatCalendarHeader_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.getCssClasses);
    } }, exportAs: ["matCalendarHeader"], decls: 7, vars: 5, consts: [[1, "mat-custom-header"], [1, "mat-custom-controls"], ["class", "mat-custom-date", 4, "ngIf"], ["class", "mat-custom-time", 4, "ngIf"], ["class", "mat-custom-prev-next", 4, "ngIf"], [1, "mat-custom-date"], ["mat-button", "", "type", "button", 1, "mat-custom-date-year", "mat-custom-control", 3, "click"], ["mat-button", "", "type", "button", 1, "mat-custom-date-month", "mat-custom-control", 3, "click"], ["mat-button", "", "type", "button", 1, "mat-custom-date-monthday", "mat-custom-control", 3, "click"], [1, "mat-custom-date-year-dayname"], [1, "mat-custom-date-year-monthday"], [1, "mat-custom-time"], [1, "mat-custom-time-hour"], ["mat-button", "", "type", "button", 1, "mat-custom-time-hour", "mat-custom-control", 3, "click"], [1, "mat-custom-separator"], ["mat-button", "", "type", "button", 1, "mat-custom-time-minute", "mat-custom-control", 3, "click"], ["class", "mat-custom-time-ampm", 4, "ngIf"], [1, "mat-custom-time-ampm"], ["mat-button", "", "type", "button", 1, "mat-calendar-control", 3, "click"], [1, "mat-custom-prev-next"], ["mat-icon-button", "", "type", "button", 1, "mat-calendar-previous-button", 3, "disabled", "click"], ["mat-button", "", "type", "button", "disableRipple", "true", 1, "mat-custom-period", "mat-custom-control", 3, "disabled", "click"], ["mat-icon-button", "", "type", "button", 1, "mat-calendar-next-button", 3, "disabled", "click"]], template: function MatCalendarHeader_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, MatCalendarHeader_div_2_Template, 4, 7, "div", 2);
        i0.ɵɵtemplate(3, MatCalendarHeader_div_3_Template, 7, 14, "div", 2);
        i0.ɵɵtemplate(4, MatCalendarHeader_div_4_Template, 9, 15, "div", 2);
        i0.ɵɵtemplate(5, MatCalendarHeader_div_5_Template, 11, 15, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, MatCalendarHeader_div_6_Template, 6, 7, "div", 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.calendar.type === "year");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.calendar.type === "month");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.calendar.hasOutput("date"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.calendar.hasOutput("time"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasPrevNextBlock());
    } }, directives: [i3.NgIf, i4.MatButton], styles: ["mat-custom-header *{box-sizing:border-box}mat-custom-header .mat-custom-control,mat-custom-header .mat-custom-separator{opacity:.75}mat-custom-header .mat-custom-control-active{opacity:1}mat-custom-header .mat-custom-controls{display:flex;flex-direction:row;padding:5% 4%}mat-custom-header .mat-custom-controls .mat-button{font-size:inherit;font-weight:inherit;line-height:inherit;padding:0;min-width:auto}mat-custom-header .mat-custom-controls .mat-custom-date{display:flex;flex-direction:column;flex:1 1 auto;place-content:flex-start;align-items:flex-start}mat-custom-header .mat-custom-controls .mat-custom-date-year{font-size:16px;line-height:20px}mat-custom-header .mat-custom-controls .mat-custom-date-year-dayname{display:none}mat-custom-header .mat-custom-controls .mat-custom-date-monthday{font-size:42px;line-height:36px}mat-custom-header .mat-custom-controls .mat-custom-time{display:flex;flex-direction:row;flex:1 1 auto;place-content:flex-end;align-items:flex-end}mat-custom-header .mat-custom-controls .mat-custom-time-hour{display:flex;flex-direction:row;place-content:center flex-end;align-items:center;font-size:42px;line-height:36px}mat-custom-header .mat-custom-controls .mat-custom-time-ampm{display:flex;flex-direction:column;font-size:16px;line-height:18px;min-width:30px}mat-custom-header .mat-custom-controls .mat-custom-time-ampm .mat-custom-control-active{font-weight:500;opacity:1}mat-custom-header .mat-custom-prev-next{display:flex;flex-direction:row;place-content:stretch space-between;align-items:stretch;padding:1% 0}mat-custom-header .mat-custom-prev-next .mat-button .mat-button-focus-overlay{display:none}mat-custom-header.type-year .mat-custom-controls .mat-custom-date{place-content:center;align-items:center}mat-custom-header.type-year .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px}mat-custom-header.type-month .mat-custom-controls .mat-custom-date{flex-direction:row;place-content:center;align-items:center}mat-custom-header.type-month .mat-custom-controls .mat-custom-date-month,mat-custom-header.type-month .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px}mat-custom-header.type-month .mat-custom-controls .mat-custom-date-month:not(:last-child),mat-custom-header.type-month .mat-custom-controls .mat-custom-date-year:not(:last-child){margin-right:.2em}mat-custom-header.type-date .mat-custom-controls .mat-custom-date{flex-direction:row-reverse;place-content:center;align-items:center}mat-custom-header.type-date .mat-custom-controls .mat-custom-date-monthday:after{content:\", \";display:inline-block}mat-custom-header.type-date .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px;margin-left:.2em}mat-custom-header.type-datetime .mat-custom-controls .mat-custom-date-year{font-weight:500}mat-custom-header.type-time .mat-custom-controls .mat-custom-time{place-content:center;align-items:center}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-hour{font-size:56px;line-height:56px}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-hour,mat-custom-header.type-time .mat-custom-controls .mat-custom-time-minute{min-width:62px}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-ampm{font-size:22px;line-height:24px;margin-top:4px;min-width:45px}\n"], encapsulation: 2, data: { animation: [matDatepickerAnimations.controlActive] }, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatCalendarHeader, [{
        type: Component,
        args: [{ selector: 'mat-custom-header', exportAs: 'matCalendarHeader', animations: [matDatepickerAnimations.controlActive], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-custom-header\">\r\n  <div class=\"mat-custom-controls\">\r\n\r\n    <div class=\"mat-custom-date\" *ngIf=\"calendar.type === 'year'\">\r\n      <button mat-button type=\"button\" class=\"mat-custom-date-year mat-custom-control\"\r\n      (click)=\"switchToView('multi-year')\"\r\n      [@controlActive]=\"isControlActive(['multi-year']) ? 'active' : ''\"\r\n      [class.mat-custom-control-active]=\"isControlActive(['multi-year'])\"\r\n      [attr.aria-label]=\"_intl.switchToMultiYearViewLabel\">\r\n        <span>{{ _yearButtonText }}</span>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"mat-custom-date\" *ngIf=\"calendar.type === 'month'\">\r\n      <button mat-button type=\"button\" class=\"mat-custom-date-month mat-custom-control\"\r\n      (click)=\"switchToView('year')\"\r\n      [@controlActive]=\"isControlActive(['year']) ? 'active' : ''\"\r\n      [class.mat-custom-control-active]=\"isControlActive(['year'])\"\r\n      [attr.aria-label]=\"_intl.switchToYearViewLabel\">\r\n        <span>{{ _monthButtonText }}</span>\r\n      </button>\r\n\r\n      <button mat-button type=\"button\" class=\"mat-custom-date-year mat-custom-control\"\r\n      (click)=\"switchToView('multi-year')\"\r\n      [@controlActive]=\"isControlActive(['multi-year']) ? 'active' : ''\"\r\n      [class.mat-custom-control-active]=\"isControlActive(['multi-year'])\"\r\n      [attr.aria-label]=\"_intl.switchToMultiYearViewLabel\">\r\n        <span>{{ _yearButtonText }}</span>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"mat-custom-date\" *ngIf=\"calendar.hasOutput('date')\">\r\n      <button mat-button type=\"button\" class=\"mat-custom-date-year mat-custom-control\"\r\n      (click)=\"switchToView('multi-year')\"\r\n      [@controlActive]=\"isControlActive(['multi-year']) ? 'active' : ''\"\r\n      [class.mat-custom-control-active]=\"isControlActive(['multi-year'])\"\r\n      [attr.aria-label]=\"_intl.switchToMultiYearViewLabel\">\r\n        <span>{{ _yearButtonText }}</span>\r\n      </button>\r\n\r\n      <button mat-button type=\"button\" class=\"mat-custom-date-monthday mat-custom-control\"\r\n      (click)=\"monthdayClicked()\"\r\n      [@controlActive]=\"isControlActive(['month', 'year']) ? 'active' : ''\"\r\n      [class.mat-custom-control-active]=\"isControlActive(['month', 'year'])\"\r\n      [attr.aria-label]=\"monthdayButtonLabel\">\r\n        <span class=\"mat-custom-date-year-dayname\">{{ _dayButtonText }}&nbsp;</span>\r\n        <span class=\"mat-custom-date-year-monthday\">{{ _monthdayButtonText }}</span>\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"mat-custom-time\" *ngIf=\"calendar.hasOutput('time')\">\r\n      <div class=\"mat-custom-time-hour\">\r\n        <button mat-button type=\"button\" class=\"mat-custom-time-hour mat-custom-control\"\r\n        (click)=\"switchToView('hour')\"\r\n        [@controlActive]=\"isControlActive(['hour']) ? 'active' : ''\"\r\n        [class.mat-custom-control-active]=\"isControlActive(['hour'])\"\r\n        [attr.aria-label]=\"_intl.switchToHourViewLabel\">\r\n          <span>{{ _hourButtonText }}</span>\r\n        </button>\r\n\r\n        <span class=\"mat-custom-separator\">:</span>\r\n\r\n        <button mat-button type=\"button\" class=\"mat-custom-time-minute mat-custom-control\"\r\n        [@controlActive]=\"isControlActive(['minute']) ? 'active' : ''\"\r\n        [class.mat-custom-control-active]=\"isControlActive(['minute'])\"\r\n        (click)=\"switchToView('minute')\"\r\n        [attr.aria-label]=\"_intl.switchToMinuteViewLabel\">\r\n          <span>{{ _minuteButtonText }}</span>\r\n        </button>\r\n\r\n      </div>\r\n      <div class=\"mat-custom-time-ampm\" *ngIf=\"calendar.twelveHour\">\r\n        <button mat-button type=\"button\" class=\"mat-calendar-control\"\r\n        [@controlActive]=\"_isAM ? 'active' : ''\"\r\n        [class.mat-custom-control-active]=\"_isAM\"\r\n        [attr.aria-label]=\"_intl.setToAMLabel\"\r\n        (click)=\"toggleAmPm(true)\">\r\n          AM\r\n        </button>\r\n        <button mat-button type=\"button\" class=\"mat-calendar-control\"\r\n        [@controlActive]=\"!_isAM ? 'active' : ''\"\r\n        [class.mat-custom-control-active]=\"!_isAM\"\r\n        [attr.aria-label]=\"_intl.setToPMLabel\"\r\n        (click)=\"toggleAmPm(false)\">\r\n          PM\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <div class=\"mat-custom-prev-next\" *ngIf=\"hasPrevNextBlock()\">\r\n\r\n    <button mat-icon-button type=\"button\"\r\n            class=\"mat-calendar-previous-button\"\r\n            [disabled]=\"!previousEnabled()\"\r\n            (click)=\"previousClicked()\"\r\n            [attr.aria-label]=\"prevButtonLabel\">\r\n    </button>\r\n\r\n    <button mat-button type=\"button\" class=\"mat-custom-period mat-custom-control\"\r\n    disableRipple=\"true\"\r\n    (click)=\"currentPeriodClicked()\"\r\n    [disabled]=\"currentPeriodDisabled()\"\r\n    [attr.aria-label]=\"periodButtonLabel\">\r\n      <strong>{{ periodButtonText }}</strong>\r\n    </button>\r\n\r\n    <button mat-icon-button type=\"button\"\r\n            class=\"mat-calendar-next-button\"\r\n            [disabled]=\"!nextEnabled()\"\r\n            (click)=\"nextClicked()\"\r\n            [attr.aria-label]=\"nextButtonLabel\">\r\n    </button>\r\n\r\n  </div>\r\n</div>\r\n", styles: ["mat-custom-header *{box-sizing:border-box}mat-custom-header .mat-custom-control,mat-custom-header .mat-custom-separator{opacity:.75}mat-custom-header .mat-custom-control-active{opacity:1}mat-custom-header .mat-custom-controls{display:flex;flex-direction:row;padding:5% 4%}mat-custom-header .mat-custom-controls .mat-button{font-size:inherit;font-weight:inherit;line-height:inherit;padding:0;min-width:auto}mat-custom-header .mat-custom-controls .mat-custom-date{display:flex;flex-direction:column;flex:1 1 auto;place-content:flex-start;align-items:flex-start}mat-custom-header .mat-custom-controls .mat-custom-date-year{font-size:16px;line-height:20px}mat-custom-header .mat-custom-controls .mat-custom-date-year-dayname{display:none}mat-custom-header .mat-custom-controls .mat-custom-date-monthday{font-size:42px;line-height:36px}mat-custom-header .mat-custom-controls .mat-custom-time{display:flex;flex-direction:row;flex:1 1 auto;place-content:flex-end;align-items:flex-end}mat-custom-header .mat-custom-controls .mat-custom-time-hour{display:flex;flex-direction:row;place-content:center flex-end;align-items:center;font-size:42px;line-height:36px}mat-custom-header .mat-custom-controls .mat-custom-time-ampm{display:flex;flex-direction:column;font-size:16px;line-height:18px;min-width:30px}mat-custom-header .mat-custom-controls .mat-custom-time-ampm .mat-custom-control-active{font-weight:500;opacity:1}mat-custom-header .mat-custom-prev-next{display:flex;flex-direction:row;place-content:stretch space-between;align-items:stretch;padding:1% 0}mat-custom-header .mat-custom-prev-next .mat-button .mat-button-focus-overlay{display:none}mat-custom-header.type-year .mat-custom-controls .mat-custom-date{place-content:center;align-items:center}mat-custom-header.type-year .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px}mat-custom-header.type-month .mat-custom-controls .mat-custom-date{flex-direction:row;place-content:center;align-items:center}mat-custom-header.type-month .mat-custom-controls .mat-custom-date-month,mat-custom-header.type-month .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px}mat-custom-header.type-month .mat-custom-controls .mat-custom-date-month:not(:last-child),mat-custom-header.type-month .mat-custom-controls .mat-custom-date-year:not(:last-child){margin-right:.2em}mat-custom-header.type-date .mat-custom-controls .mat-custom-date{flex-direction:row-reverse;place-content:center;align-items:center}mat-custom-header.type-date .mat-custom-controls .mat-custom-date-monthday:after{content:\", \";display:inline-block}mat-custom-header.type-date .mat-custom-controls .mat-custom-date-year{font-size:42px;line-height:36px;margin-left:.2em}mat-custom-header.type-datetime .mat-custom-controls .mat-custom-date-year{font-weight:500}mat-custom-header.type-time .mat-custom-controls .mat-custom-time{place-content:center;align-items:center}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-hour{font-size:56px;line-height:56px}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-hour,mat-custom-header.type-time .mat-custom-controls .mat-custom-time-minute{min-width:62px}mat-custom-header.type-time .mat-custom-controls .mat-custom-time-ampm{font-size:22px;line-height:24px;margin-top:4px;min-width:45px}\n"] }]
    }], function () { return [{ type: i1.MatDatepickerIntl }, { type: MatCalendar, decorators: [{
                type: Inject,
                args: [forwardRef(() => MatCalendar)]
            }] }, { type: i2.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }, { type: i0.ChangeDetectorRef }]; }, { getCssClasses: [{
            type: HostBinding,
            args: ['class']
        }] }); })();
/** A calendar that is used as part of the datepicker. */
export class MatCalendar {
    constructor(_intl, _dateAdapter, _dateFormats, _changeDetectorRef) {
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this._moveFocusOnNextTick = false;
        /** The type of value handled by the calendar. */
        this.type = 'date';
        /** Whether the calendar should be started in. */
        this.startView = 'month';
        /** multi-year inputs */
        this.yearsPerPage = 24;
        this.yearsPerRow = 4;
        /** Clock interval */
        this.clockStep = 1;
        /** Clock hour format */
        this.twelveHour = false;
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the year chosen in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the month chosen in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when the date changes.
         */
        this.dateChanged = new EventEmitter();
        /**
         * Emits when the current view changes.
         */
        this.viewChanged = new EventEmitter(true);
        /** Emits when any date is selected. */
        this._userSelection = new EventEmitter();
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         */
        this.stateChanges = new Subject();
        if (isDevMode()) {
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('MAT_DATE_FORMATS');
            }
        }
        this._intlChanges = _intl.changes.subscribe(() => {
            _changeDetectorRef.markForCheck();
            this.stateChanges.next();
        });
    }
    /** A date representing the period (month or year) to start the calendar in. */
    get startAt() {
        return this._startAt;
    }
    set startAt(value) {
        this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
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
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    get activeDate() {
        return this._clampedActiveDate;
    }
    set activeDate(value) {
        this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this.stateChanges.next();
        this._changeDetectorRef.markForCheck();
    }
    /** Whether the calendar is in month view. */
    get currentView() {
        return this._currentView;
    }
    set currentView(value) {
        const viewChangedResult = this._currentView !== value ? value : null;
        this._currentView = value;
        this._moveFocusOnNextTick = true;
        this._changeDetectorRef.markForCheck();
        if (viewChangedResult) {
            this.viewChanged.emit(viewChangedResult);
        }
    }
    ngAfterContentInit() {
        this._calendarHeaderPortal = new ComponentPortal(this.headerComponent || MatCalendarHeader);
        this.activeDate = this.startAt || this._dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView =
            this.type === 'year'
                ? 'multi-year'
                : this.type === 'month'
                    ? 'year'
                    : this.type === 'time' && !['hour', 'minute'].includes(this.startView)
                        ? 'hour'
                        : this.startView;
    }
    ngAfterViewChecked() {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    ngOnDestroy() {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    }
    ngOnChanges(changes) {
        const change = changes['minDate'] || changes['maxDate'] || changes['dateFilter'];
        if (change && !change.firstChange) {
            const view = this._getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
                this._changeDetectorRef.detectChanges();
                view._init();
            }
        }
        this.stateChanges.next();
    }
    /** Focuses the active date. */
    focusActiveCell() {
        this._getCurrentViewComponent()._focusActiveCell(false);
    }
    hasOutput(type) {
        return this.type.indexOf(type) !== -1;
    }
    getDate() {
        return !this.selected || this.selected instanceof DateRange
            ? this.activeDate
            : this.selected;
    }
    getUnit() {
        switch (this.type) {
            case 'date':
                return 'day';
            case 'datetime':
            case 'time':
                return 'minute';
            default:
                return this.type;
        }
    }
    setDate(date) {
        if (!(this.selected instanceof DateRange)) {
            this.selected = date;
        }
        this.activeDate = date;
        this.dateChanged.emit(date);
    }
    /** Updates today's date after an update of the active date */
    updateTodaysDate() {
        this._getCurrentViewComponent()._init();
    }
    /** Handles date selection in the month view. */
    _dateSelected(event) {
        const date = event.value;
        if (this.selected instanceof DateRange ||
            (date && !this._dateAdapter.sameDate(date, this.selected, this.getUnit()))) {
            this.selectedChange.emit(date);
        }
        this._userSelection.emit(event);
    }
    _dateEmit(value) {
        this.setDate(value);
        this._userSelection.emit({ value, event: null });
    }
    /** Handles date selection in the clock view. */
    _hourSelectedInClockView(date) {
        this.setDate(date);
        this.selectedChange.emit(date);
    }
    _timeSelectedInClockView(event) {
        this.setDate(event.value);
        this.selectedChange.emit(event.value);
        this._userSelection.emit(event);
    }
    /** Handles user day selection. */
    _daySelected(event) {
        if (!this.hasOutput('time') || this.selected instanceof DateRange) {
            this.setDate(event.value);
            this._dateSelected(event);
        }
        else {
            this.selectedChange.emit(event.value);
            this._goToDateInView(event.value, 'hour');
        }
    }
    /** Handles year selection in the multiyear view. */
    _yearSelectedInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /** Handles month selection in the year view. */
    _monthSelectedInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /** Handles year/month selection in the multi-year/year views. */
    _goToDateInView(date, view) {
        this.setDate(date);
        this.currentView = view;
    }
    /** Returns the component instance that corresponds to the current calendar view. */
    _getCurrentViewComponent() {
        // The return type is explicitly written as a union to ensure that the Closure compiler does
        // not optimize calls to _init(). Without the explict return type, TypeScript narrows it to
        // only the first component type. See https://github.com/angular/components/issues/22996.
        return this.clockView || this.monthView || this.yearView || this.multiYearView;
    }
}
/** @nocollapse */ /** @nocollapse */ MatCalendar.ɵfac = function MatCalendar_Factory(t) { return new (t || MatCalendar)(i0.ɵɵdirectiveInject(i1.MatDatepickerIntl), i0.ɵɵdirectiveInject(i2.DateAdapter, 8), i0.ɵɵdirectiveInject(MAT_DATE_FORMATS, 8), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
/** @nocollapse */ /** @nocollapse */ MatCalendar.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatCalendar, selectors: [["mat-calendar"]], viewQuery: function MatCalendar_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(MatClockView, 5);
        i0.ɵɵviewQuery(MatMonthView, 5);
        i0.ɵɵviewQuery(MatYearView, 5);
        i0.ɵɵviewQuery(MatMultiYearView, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.clockView = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.monthView = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.yearView = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.multiYearView = _t.first);
    } }, hostAttrs: [1, "mat-calendar"], hostVars: 2, hostBindings: function MatCalendar_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.type);
    } }, inputs: { headerComponent: "headerComponent", startAt: "startAt", type: "type", startView: "startView", yearsPerPage: "yearsPerPage", yearsPerRow: "yearsPerRow", selected: "selected", minDate: "minDate", maxDate: "maxDate", dateFilter: "dateFilter", dateClass: "dateClass", clockStep: "clockStep", twelveHour: "twelveHour", comparisonStart: "comparisonStart", comparisonEnd: "comparisonEnd" }, outputs: { selectedChange: "selectedChange", yearSelected: "yearSelected", monthSelected: "monthSelected", dateChanged: "dateChanged", viewChanged: "viewChanged", _userSelection: "_userSelection" }, exportAs: ["matCalendar"], features: [i0.ɵɵProvidersFeature([MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER]), i0.ɵɵNgOnChangesFeature], decls: 6, vars: 5, consts: [[3, "cdkPortalOutlet"], ["cdkMonitorSubtreeFocus", "", "tabindex", "-1", 1, "mat-calendar-content", 3, "ngSwitch"], [3, "activeDate", "selected", "currentView", "dateFilter", "dateClass", "clockStep", "twelveHour", "activeDateChange", "currentViewChange", "selectedChange", "hourSelected", "_userSelection", 4, "ngSwitchDefault"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "comparisonStart", "comparisonEnd", "activeDateChange", "_userSelection", 4, "ngSwitchCase"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "monthSelected", "selectedChange", 4, "ngSwitchCase"], [3, "yearsPerPage", "yearsPerRow", "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "yearSelected", "selectedChange", 4, "ngSwitchCase"], [3, "activeDate", "selected", "currentView", "dateFilter", "dateClass", "clockStep", "twelveHour", "activeDateChange", "currentViewChange", "selectedChange", "hourSelected", "_userSelection"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "comparisonStart", "comparisonEnd", "activeDateChange", "_userSelection"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "monthSelected", "selectedChange"], [3, "yearsPerPage", "yearsPerRow", "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "yearSelected", "selectedChange"]], template: function MatCalendar_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MatCalendar_ng_template_0_Template, 0, 0, "ng-template", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, MatCalendar_mat_clock_view_2_Template, 1, 8, "mat-clock-view", 2);
        i0.ɵɵtemplate(3, MatCalendar_mat_month_view_3_Template, 1, 8, "mat-month-view", 3);
        i0.ɵɵtemplate(4, MatCalendar_mat_year_view_4_Template, 1, 6, "mat-year-view", 4);
        i0.ɵɵtemplate(5, MatCalendar_mat_multi_year_view_5_Template, 1, 8, "mat-multi-year-view", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("cdkPortalOutlet", ctx._calendarHeaderPortal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.currentView);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngSwitchCase", "month");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "year");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", "multi-year");
    } }, directives: [i5.CdkPortalOutlet, i6.CdkMonitorFocus, i3.NgSwitch, i3.NgSwitchDefault, i3.NgSwitchCase, i7.MatClockView, i8.MatMonthView, i9.MatYearView, i10.MatMultiYearView], styles: [".mat-calendar{display:flex;flex-direction:column}.mat-calendar-header{padding:8px 8px 0}.mat-calendar-content{padding:0 8px 8px;outline:none}.mat-calendar-controls{display:flex;margin:5% calc(4.71429% - 16px)}.mat-calendar-controls .mat-icon-button:hover .mat-button-focus-overlay{opacity:.04}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0}.mat-calendar-arrow{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.cdk-high-contrast-active .mat-calendar-arrow{fill:CanvasText}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button:after,.mat-calendar-next-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button:after{border-left-width:2px;transform:translate(2px) rotate(-45deg)}.mat-calendar-next-button:after{border-right-width:2px;transform:translate(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider:after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}.mat-calendar-abbr{text-decoration:none}\n"], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatCalendar, [{
        type: Component,
        args: [{ selector: 'mat-calendar', host: {
                    'class': 'mat-calendar',
                }, exportAs: 'matCalendar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER], template: "<ng-template [cdkPortalOutlet]=\"_calendarHeaderPortal\"></ng-template>\r\n\r\n<div class=\"mat-calendar-content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\r\n\r\n  <mat-clock-view\r\n      *ngSwitchDefault\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [(currentView)]=\"currentView\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [dateClass]=\"dateClass\"\r\n      [clockStep]=\"clockStep\"\r\n      [twelveHour]=\"twelveHour\"\r\n      (selectedChange)=\"setDate($event)\"\r\n      (hourSelected)=\"_hourSelectedInClockView($event)\"\r\n      (_userSelection)=\"_timeSelectedInClockView($event)\">\r\n  </mat-clock-view>\r\n\r\n  <mat-month-view\r\n      *ngSwitchCase=\"'month'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [dateClass]=\"dateClass\"\r\n      [comparisonStart]=\"comparisonStart\"\r\n      [comparisonEnd]=\"comparisonEnd\"\r\n      (_userSelection)=\"_daySelected($event)\">\r\n  </mat-month-view>\r\n\r\n  <mat-year-view\r\n      *ngSwitchCase=\"'year'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [dateClass]=\"dateClass\"\r\n      (monthSelected)=\"_monthSelectedInYearView($event)\"\r\n      (selectedChange)=\"hasOutput('month') ? _dateEmit($event) : _goToDateInView($event, 'month')\">\r\n  </mat-year-view>\r\n\r\n  <mat-multi-year-view\r\n      *ngSwitchCase=\"'multi-year'\"\r\n      [yearsPerPage]=\"yearsPerPage\"\r\n      [yearsPerRow]=\"yearsPerRow\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [dateClass]=\"dateClass\"\r\n      (yearSelected)=\"_yearSelectedInMultiYearView($event)\"\r\n      (selectedChange)=\"hasOutput('year') ? _dateEmit($event) : _goToDateInView($event, 'year')\">\r\n  </mat-multi-year-view>\r\n</div>\r\n", styles: [".mat-calendar{display:flex;flex-direction:column}.mat-calendar-header{padding:8px 8px 0}.mat-calendar-content{padding:0 8px 8px;outline:none}.mat-calendar-controls{display:flex;margin:5% calc(4.71429% - 16px)}.mat-calendar-controls .mat-icon-button:hover .mat-button-focus-overlay{opacity:.04}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0}.mat-calendar-arrow{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.cdk-high-contrast-active .mat-calendar-arrow{fill:CanvasText}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button:after,.mat-calendar-next-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button:after{border-left-width:2px;transform:translate(2px) rotate(-45deg)}.mat-calendar-next-button:after{border-right-width:2px;transform:translate(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider:after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}.mat-calendar-abbr{text-decoration:none}\n"] }]
    }], function () { return [{ type: i1.MatDatepickerIntl }, { type: i2.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_FORMATS]
            }] }, { type: i0.ChangeDetectorRef }]; }, { headerComponent: [{
            type: Input
        }], startAt: [{
            type: Input
        }], type: [{
            type: HostBinding,
            args: ['class']
        }, {
            type: Input
        }], startView: [{
            type: Input
        }], yearsPerPage: [{
            type: Input
        }], yearsPerRow: [{
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
        }], comparisonStart: [{
            type: Input
        }], comparisonEnd: [{
            type: Input
        }], selectedChange: [{
            type: Output
        }], yearSelected: [{
            type: Output
        }], monthSelected: [{
            type: Output
        }], dateChanged: [{
            type: Output
        }], viewChanged: [{
            type: Output
        }], _userSelection: [{
            type: Output
        }], clockView: [{
            type: ViewChild,
            args: [MatClockView]
        }], monthView: [{
            type: ViewChild,
            args: [MatMonthView]
        }], yearView: [{
            type: ViewChild,
            args: [MatYearView]
        }], multiYearView: [{
            type: ViewChild,
            args: [MatMultiYearView]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jYWxlbmRhci50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL21hdC1oZWFkZXIuaHRtbCIsIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2NhbGVuZGFyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLGVBQWUsRUFBeUIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFDTCxXQUFXLEdBR1osTUFBTSxRQUFRLENBQUM7QUFHaEIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGdCQUFnQixHQUNqQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9B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QUFlO2tCQUF2QixLQUFLO1lBR0csYUFBYTtrQkFBckIsS0FBSztZQUdhLGNBQWM7a0JBQWhDLE1BQU07WUFNWSxZQUFZO2tCQUE5QixNQUFNO1lBTVksYUFBYTtrQkFBL0IsTUFBTTtZQUtZLFdBQVc7a0JBQTdCLE1BQU07WUFLWSxXQUFXO2tCQUE3QixNQUFNO1lBS1ksY0FBYztrQkFBaEMsTUFBTTtZQUlrQixTQUFTO2tCQUFqQyxTQUFTO21CQUFDLFlBQVk7WUFHRSxTQUFTO2tCQUFqQyxTQUFTO21CQUFDLFlBQVk7WUFHQyxRQUFRO2tCQUEvQixTQUFTO21CQUFDLFdBQVc7WUFHTyxhQUFhO2tCQUF6QyxTQUFTO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDb21wb25lbnRUeXBlLCBQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBpc0Rldk1vZGUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgRGF0ZUFkYXB0ZXIsXHJcbiAgRGF0ZVVuaXQsXHJcbiAgTWF0RGF0ZUZvcm1hdHMsXHJcbn0gZnJvbSAnLi9jb3JlJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXJVc2VyRXZlbnQsIE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb24gfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xyXG5pbXBvcnQgeyBNYXRDYWxlbmRhclR5cGUsIE1hdENhbGVuZGFyVmlldyB9IGZyb20gJy4vY2FsZW5kYXIudHlwZXMnO1xyXG5pbXBvcnQgeyBtYXREYXRlcGlja2VyQW5pbWF0aW9ucyB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XHJcbmltcG9ydCB7IERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuaW1wb3J0IHsgTWF0Q2xvY2tWaWV3IH0gZnJvbSAnLi9jbG9jay12aWV3JztcclxuaW1wb3J0IHsgTWF0TW9udGhWaWV3IH0gZnJvbSAnLi9tb250aC12aWV3JztcclxuaW1wb3J0IHtcclxuICBnZXRBY3RpdmVPZmZzZXQsXHJcbiAgaXNTYW1lTXVsdGlZZWFyVmlldyxcclxuICBNYXRNdWx0aVllYXJWaWV3LFxyXG59IGZyb20gJy4vbXVsdGkteWVhci12aWV3JztcclxuaW1wb3J0IHsgTWF0WWVhclZpZXcgfSBmcm9tICcuL3llYXItdmlldyc7XHJcbmltcG9ydCB7IE1BVF9TSU5HTEVfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVIsIERhdGVSYW5nZSB9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xyXG5cclxuLyoqIENvdW50ZXIgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSURzLiAqL1xyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuLyoqIERlZmF1bHQgaGVhZGVyIGZvciBNYXRDYWxlbmRhciAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1jdXN0b20taGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJ21hdC1oZWFkZXIuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LWhlYWRlci5zY3NzJ10sXHJcbiAgZXhwb3J0QXM6ICdtYXRDYWxlbmRhckhlYWRlcicsXHJcbiAgYW5pbWF0aW9uczogW21hdERhdGVwaWNrZXJBbmltYXRpb25zLmNvbnRyb2xBY3RpdmVdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRDYWxlbmRhckhlYWRlcjxEPiB7XHJcbiAgX2J1dHRvbkRlc2NyaXB0aW9uSWQgPSBgbWF0LWNhbGVuZGFyLWJ1dHRvbi0ke3VuaXF1ZUlkKyt9YDtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgZ2V0IGdldENzc0NsYXNzZXMoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNzc0NsYXNzZXM6IHN0cmluZ1tdID0gW2B0eXBlLSR7dGhpcy5jYWxlbmRhci50eXBlfWBdO1xyXG4gICAgcmV0dXJuIGNzc0NsYXNzZXMuam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgX3llYXJCdXR0b25UZXh0OiBzdHJpbmc7XHJcbiAgX21vbnRoQnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gIF9tb250aGRheUJ1dHRvblRleHQ6IHN0cmluZztcclxuICBfZGF5QnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gIF9ob3VyQnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gIF9taW51dGVCdXR0b25UZXh0OiBzdHJpbmc7XHJcbiAgX2lzQU06IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCxcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNYXRDYWxlbmRhcikpIHB1YmxpYyBjYWxlbmRhcjogTWF0Q2FsZW5kYXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICkge1xyXG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcclxuICAgIHRoaXMuY2FsZW5kYXIuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVZhbHVlcygpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZhbHVlcygpIHtcclxuICAgIGNvbnN0IGFjdGl2ZURhdGUgPSB0aGlzLmNhbGVuZGFyLmdldERhdGUoKTtcclxuXHJcbiAgICBjb25zdCBkYXkgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXlPZldlZWsoYWN0aXZlRGF0ZSk7XHJcbiAgICBsZXQgaG91cnMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3VycyhhY3RpdmVEYXRlKTtcclxuICAgIHRoaXMuX2lzQU0gPSBob3VycyA8IDEyO1xyXG4gICAgaWYgKHRoaXMuY2FsZW5kYXIudHdlbHZlSG91cikge1xyXG4gICAgICBob3VycyA9IGhvdXJzID09PSAwID8gMTIgOiBob3VycyA+IDEyID8gaG91cnMgLSAxMiA6IGhvdXJzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWludXRlcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXMoYWN0aXZlRGF0ZSk7XHJcblxyXG4gICAgdGhpcy5feWVhckJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGFjdGl2ZURhdGUpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLl9tb250aEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoYWN0aXZlRGF0ZSxcclxuICAgICAgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aExhYmVsKTtcclxuICAgIHRoaXMuX21vbnRoZGF5QnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChhY3RpdmVEYXRlLFxyXG4gICAgICB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoRGF5TGFiZWwpO1xyXG4gICAgdGhpcy5fZGF5QnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdzaG9ydCcpW2RheV07XHJcbiAgICB0aGlzLl9ob3VyQnV0dG9uVGV4dCA9IGhvdXJzLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLl9taW51dGVCdXR0b25UZXh0ID0gKCcwMCcgKyBtaW51dGVzKS5zbGljZSgtMik7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGhhc1ByZXZOZXh0QmxvY2soKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIVsnaG91cicsICdtaW51dGUnXS5pbmNsdWRlcyh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3KTtcclxuICB9XHJcblxyXG4gIGlzQ29udHJvbEFjdGl2ZSh2aWV3czogTWF0Q2FsZW5kYXJWaWV3W10pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB2aWV3cy5pbmNsdWRlcyh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3KTtcclxuICB9XHJcblxyXG4gIHN3aXRjaFRvVmlldyh2aWV3OiBNYXRDYWxlbmRhclZpZXcpOiB2b2lkIHtcclxuICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPSB2aWV3O1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW1QbShhbSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2lzQU0gIT09IGFtKSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXIuc2V0RGF0ZSh0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKFxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIuZ2V0RGF0ZSgpLCB0aGlzLl9pc0FNID8gMTIgOiAtMTIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXHJcbiAgZ2V0IHBlcmlvZEJ1dHRvblRleHQoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICdtb250aCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyXHJcbiAgICAgICAgLmZvcm1hdCh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyTGFiZWwpXHJcbiAgICAgICAgLnRvTG9jYWxlVXBwZXJDYXNlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAneWVhcicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIG9mZnNldCBmcm9tIHRoZSBhY3RpdmUgeWVhciB0byB0aGUgXCJzbG90XCIgZm9yIHRoZSBzdGFydGluZyB5ZWFyIGlzIHRoZVxyXG4gICAgLy8gKmFjdHVhbCogZmlyc3QgcmVuZGVyZWQgeWVhciBpbiB0aGUgbXVsdGkteWVhciB2aWV3LCBhbmQgdGhlIGxhc3QgeWVhciBpc1xyXG4gICAgLy8ganVzdCB5ZWFyc1BlclBhZ2UgLSAxIGF3YXkuXHJcbiAgICBjb25zdCBhY3RpdmVZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3QgbWluWWVhck9mUGFnZSA9XHJcbiAgICAgIGFjdGl2ZVllYXIgLVxyXG4gICAgICBnZXRBY3RpdmVPZmZzZXQoXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLFxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIubWluRGF0ZSxcclxuICAgICAgICB0aGlzLmNhbGVuZGFyLm1heERhdGUsXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhci55ZWFyc1BlclBhZ2UsXHJcbiAgICAgICk7XHJcbiAgICBjb25zdCBtYXhZZWFyT2ZQYWdlID0gbWluWWVhck9mUGFnZSArIHRoaXMuY2FsZW5kYXIueWVhcnNQZXJQYWdlIC0gMTtcclxuICAgIGNvbnN0IG1pblllYXJOYW1lID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUobWluWWVhck9mUGFnZSwgMCwgMSksXHJcbiAgICApO1xyXG4gICAgY29uc3QgbWF4WWVhck5hbWUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyTmFtZShcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShtYXhZZWFyT2ZQYWdlLCAwLCAxKSxcclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5faW50bC5mb3JtYXRZZWFyUmFuZ2UobWluWWVhck5hbWUsIG1heFllYXJOYW1lKTtcclxuICB9XHJcblxyXG4gIGdldCBtb250aGRheUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAnbW9udGgnXHJcbiAgICAgID8gdGhpcy5faW50bC5zd2l0Y2hUb1llYXJWaWV3TGFiZWxcclxuICAgICAgOiB0aGlzLl9pbnRsLnN3aXRjaFRvTW9udGhWaWV3TGFiZWw7XHJcbiAgfVxyXG5cclxuICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICdtb250aCdcclxuICAgICAgPyB0aGlzLl9pbnRsLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsXHJcbiAgICAgIDogdGhpcy5faW50bC5zd2l0Y2hUb01vbnRoVmlld0xhYmVsO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cclxuICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAnbW9udGgnOiB0aGlzLl9pbnRsLnByZXZNb250aExhYmVsLFxyXG4gICAgICAneWVhcic6IHRoaXMuX2ludGwucHJldlllYXJMYWJlbCxcclxuICAgICAgJ211bHRpLXllYXInOiB0aGlzLl9pbnRsLnByZXZNdWx0aVllYXJMYWJlbCxcclxuICAgIH1bdGhpcy5jYWxlbmRhci5jdXJyZW50Vmlld107XHJcbiAgfVxyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24uICovXHJcbiAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ21vbnRoJzogdGhpcy5faW50bC5uZXh0TW9udGhMYWJlbCxcclxuICAgICAgJ3llYXInOiB0aGlzLl9pbnRsLm5leHRZZWFyTGFiZWwsXHJcbiAgICAgICdtdWx0aS15ZWFyJzogdGhpcy5faW50bC5uZXh0TXVsdGlZZWFyTGFiZWwsXHJcbiAgICB9W3RoaXMuY2FsZW5kYXIuY3VycmVudFZpZXddO1xyXG4gIH1cclxuXHJcbiAgbW9udGhkYXlDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9IHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJyA/ICd5ZWFyJyA6ICdtb250aCc7XHJcbiAgfVxyXG5cclxuICBjdXJyZW50UGVyaW9kRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gWyd5ZWFyJywgJ21vbnRoJ10uaW5jbHVkZXModGhpcy5jYWxlbmRhci50eXBlKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwZXJpb2QgbGFiZWwuICovXHJcbiAgY3VycmVudFBlcmlvZENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID0gdGhpcy5jYWxlbmRhci5jdXJyZW50VmlldyA9PSAnbW9udGgnID8gJ211bHRpLXllYXInIDogJ21vbnRoJztcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwcmV2aW91cyBidXR0b24uICovXHJcbiAgcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0ZSA9XHJcbiAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJ1xyXG4gICAgICAgID8gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCAtMSlcclxuICAgICAgICA6IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXHJcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsXHJcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICd5ZWFyJyA/IC0xIDogLXRoaXMuY2FsZW5kYXIueWVhcnNQZXJQYWdlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5jYWxlbmRhci5zZXREYXRlKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIG5leHQgYnV0dG9uLiAqL1xyXG4gIG5leHRDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0ZSA9XHJcbiAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ21vbnRoJ1xyXG4gICAgICAgID8gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCAxKVxyXG4gICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcclxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWN0aXZlRGF0ZSxcclxuICAgICAgICAgIHRoaXMuY2FsZW5kYXIuY3VycmVudFZpZXcgPT0gJ3llYXInID8gMSA6IHRoaXMuY2FsZW5kYXIueWVhcnNQZXJQYWdlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgdGhpcy5jYWxlbmRhci5zZXREYXRlKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cclxuICBwcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuY2FsZW5kYXIubWluRGF0ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICF0aGlzLmNhbGVuZGFyLm1pbkRhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5jYWxlbmRhci5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyLm1pbkRhdGUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xyXG4gIG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgIXRoaXMuY2FsZW5kYXIubWF4RGF0ZSB8fCAhdGhpcy5faXNTYW1lVmlldyh0aGlzLmNhbGVuZGFyLmFjdGl2ZURhdGUsIHRoaXMuY2FsZW5kYXIubWF4RGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgdHdvIGRhdGVzIHJlcHJlc2VudCB0aGUgc2FtZSB2aWV3IGluIHRoZSBjdXJyZW50IHZpZXcgbW9kZSAobW9udGggb3IgeWVhcikuICovXHJcbiAgcHJpdmF0ZSBfaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICdtb250aCcpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKSAmJlxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGUxKSA9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aChkYXRlMilcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNhbGVuZGFyLmN1cnJlbnRWaWV3ID09ICd5ZWFyJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgPT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMik7XHJcbiAgICB9XHJcbiAgICAvLyBPdGhlcndpc2Ugd2UgYXJlIGluICdtdWx0aS15ZWFyJyB2aWV3LlxyXG4gICAgcmV0dXJuIGlzU2FtZU11bHRpWWVhclZpZXcoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLFxyXG4gICAgICBkYXRlMSxcclxuICAgICAgZGF0ZTIsXHJcbiAgICAgIHRoaXMuY2FsZW5kYXIubWluRGF0ZSxcclxuICAgICAgdGhpcy5jYWxlbmRhci5tYXhEYXRlLFxyXG4gICAgICB0aGlzLmNhbGVuZGFyLnllYXJzUGVyUGFnZSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogQSBjYWxlbmRhciB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtY2FsZW5kYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnbWF0LWNhbGVuZGFyJyxcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0Q2FsZW5kYXInLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbTUFUX1NJTkdMRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRDYWxlbmRhcjxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKiogQW4gaW5wdXQgaW5kaWNhdGluZyB0aGUgdHlwZSBvZiB0aGUgaGVhZGVyIGNvbXBvbmVudCwgaWYgc2V0LiAqL1xyXG4gIEBJbnB1dCgpIGhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xyXG5cclxuICAvKiogQSBwb3J0YWwgY29udGFpbmluZyB0aGUgaGVhZGVyIGNvbXBvbmVudCB0eXBlIGZvciB0aGlzIGNhbGVuZGFyLiAqL1xyXG4gIF9jYWxlbmRhckhlYWRlclBvcnRhbDogUG9ydGFsPGFueT47XHJcblxyXG4gIHByaXZhdGUgX2ludGxDaGFuZ2VzOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXHJcbiAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XHJcbiAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xyXG5cclxuICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcclxuICB9XHJcbiAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIHR5cGUgb2YgdmFsdWUgaGFuZGxlZCBieSB0aGUgY2FsZW5kYXIuICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgQElucHV0KCkgdHlwZTogTWF0Q2FsZW5kYXJUeXBlID0gJ2RhdGUnO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgc2hvdWxkIGJlIHN0YXJ0ZWQgaW4uICovXHJcbiAgQElucHV0KCkgc3RhcnRWaWV3OiBNYXRDYWxlbmRhclZpZXcgPSAnbW9udGgnO1xyXG5cclxuICAvKiogbXVsdGkteWVhciBpbnB1dHMgKi9cclxuICBASW5wdXQoKSB5ZWFyc1BlclBhZ2UgPSAyNDtcclxuXHJcbiAgQElucHV0KCkgeWVhcnNQZXJSb3cgPSA0O1xyXG5cclxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IERhdGVSYW5nZTxEPiB8IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEYXRlUmFuZ2U8RD4gfCBEIHwgbnVsbCkge1xyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVJhbmdlKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRGF0ZVJhbmdlPEQ+IHwgRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cclxuICBASW5wdXQoKSBkYXRlQ2xhc3M6IE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD47XHJcblxyXG4gIC8qKiBDbG9jayBpbnRlcnZhbCAqL1xyXG4gIEBJbnB1dCgpIGNsb2NrU3RlcDogbnVtYmVyID0gMTtcclxuXHJcbiAgLyoqIENsb2NrIGhvdXIgZm9ybWF0ICovXHJcbiAgQElucHV0KCkgdHdlbHZlSG91cjogQm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKiogU3RhcnQgb2YgdGhlIGNvbXBhcmlzb24gcmFuZ2UuICovXHJcbiAgQElucHV0KCkgY29tcGFyaXNvblN0YXJ0OiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEVuZCBvZiB0aGUgY29tcGFyaXNvbiByYW5nZS4gKi9cclxuICBASW5wdXQoKSBjb21wYXJpc29uRW5kOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RCB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgdGhlIHllYXIgY2hvc2VuIGluIG11bHRpeWVhciB2aWV3LlxyXG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHRoZSBtb250aCBjaG9zZW4gaW4geWVhciB2aWV3LlxyXG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB3aGVuIHRoZSBkYXRlIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50IHZpZXcgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmlld0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclZpZXc+KFxyXG4gICAgdHJ1ZSxcclxuICApO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgX3VzZXJTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RCB8IG51bGw+PigpO1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGNsb2NrIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0Q2xvY2tWaWV3KSBjbG9ja1ZpZXc6IE1hdENsb2NrVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBtb250aCB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdE1vbnRoVmlldykgbW9udGhWaWV3OiBNYXRNb250aFZpZXc8RD47XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhciB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdFllYXJWaWV3KSB5ZWFyVmlldzogTWF0WWVhclZpZXc8RD47XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbXVsdGkteWVhciB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdE11bHRpWWVhclZpZXcpIG11bHRpWWVhclZpZXc6IE1hdE11bHRpWWVhclZpZXc8RD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IGFjdGl2ZSBkYXRlLiBUaGlzIGRldGVybWluZXMgd2hpY2ggdGltZSBwZXJpb2QgaXMgc2hvd24gYW5kIHdoaWNoIGRhdGUgaXNcclxuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWx1ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cclxuICBnZXQgY3VycmVudFZpZXcoKTogTWF0Q2FsZW5kYXJWaWV3IHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldztcclxuICB9XHJcbiAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNYXRDYWxlbmRhclZpZXcpIHtcclxuICAgIGNvbnN0IHZpZXdDaGFuZ2VkUmVzdWx0ID0gdGhpcy5fY3VycmVudFZpZXcgIT09IHZhbHVlID8gdmFsdWUgOiBudWxsO1xyXG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSB2YWx1ZTtcclxuICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICBpZiAodmlld0NoYW5nZWRSZXN1bHQpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhbmdlZC5lbWl0KHZpZXdDaGFuZ2VkUmVzdWx0KTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1hdENhbGVuZGFyVmlldztcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBfaW50bDogTWF0RGF0ZXBpY2tlckludGwsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHMpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faW50bENoYW5nZXMgPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9jYWxlbmRhckhlYWRlclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwodGhpcy5oZWFkZXJDb21wb25lbnQgfHwgTWF0Q2FsZW5kYXJIZWFkZXIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zdGFydEF0IHx8IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcblxyXG4gICAgLy8gQXNzaWduIHRvIHRoZSBwcml2YXRlIHByb3BlcnR5IHNpbmNlIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBmb2N1cyBvbiBpbml0LlxyXG4gICAgdGhpcy5fY3VycmVudFZpZXcgPVxyXG4gICAgICB0aGlzLnR5cGUgPT09ICd5ZWFyJ1xyXG4gICAgICAgID8gJ211bHRpLXllYXInXHJcbiAgICAgICAgOiB0aGlzLnR5cGUgPT09ICdtb250aCdcclxuICAgICAgICAgID8gJ3llYXInXHJcbiAgICAgICAgICA6IHRoaXMudHlwZSA9PT0gJ3RpbWUnICYmICFbJ2hvdXInLCAnbWludXRlJ10uaW5jbHVkZXModGhpcy5zdGFydFZpZXcpXHJcbiAgICAgICAgICAgID8gJ2hvdXInXHJcbiAgICAgICAgICAgIDogdGhpcy5zdGFydFZpZXc7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICBpZiAodGhpcy5fbW92ZUZvY3VzT25OZXh0VGljaykge1xyXG4gICAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2ludGxDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1snbWluRGF0ZSddIHx8IGNoYW5nZXNbJ21heERhdGUnXSB8fCBjaGFuZ2VzWydkYXRlRmlsdGVyJ107XHJcblxyXG4gICAgaWYgKGNoYW5nZSAmJiAhY2hhbmdlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpO1xyXG5cclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIGBkZXRlY3RDaGFuZ2VzYCBtYW51YWxseSBoZXJlLCBiZWNhdXNlIHRoZSBgbWluRGF0ZWAsIGBtYXhEYXRlYCBldGMuIGFyZVxyXG4gICAgICAgIC8vIHBhc3NlZCBkb3duIHRvIHRoZSB2aWV3IHZpYSBkYXRhIGJpbmRpbmdzIHdoaWNoIHdvbid0IGJlIHVwLXRvLWRhdGUgd2hlbiB3ZSBjYWxsIGBfaW5pdGAuXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHZpZXcuX2luaXQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBGb2N1c2VzIHRoZSBhY3RpdmUgZGF0ZS4gKi9cclxuICBmb2N1c0FjdGl2ZUNlbGwoKSB7XHJcbiAgICB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLl9mb2N1c0FjdGl2ZUNlbGwoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgaGFzT3V0cHV0KHR5cGU6IE1hdENhbGVuZGFyVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZS5pbmRleE9mKHR5cGUpICE9PSAtMTtcclxuICB9XHJcblxyXG4gIGdldERhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gIXRoaXMuc2VsZWN0ZWQgfHwgdGhpcy5zZWxlY3RlZCBpbnN0YW5jZW9mIERhdGVSYW5nZVxyXG4gICAgICA/IHRoaXMuYWN0aXZlRGF0ZVxyXG4gICAgICA6IHRoaXMuc2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRVbml0KCk6IERhdGVVbml0IHtcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIHJldHVybiAnZGF5JztcclxuICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICByZXR1cm4gJ21pbnV0ZSc7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldERhdGUoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgaWYgKCEodGhpcy5zZWxlY3RlZCBpbnN0YW5jZW9mIERhdGVSYW5nZSkpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSBkYXRlO1xyXG5cclxuICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdChkYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKiBVcGRhdGVzIHRvZGF5J3MgZGF0ZSBhZnRlciBhbiB1cGRhdGUgb2YgdGhlIGFjdGl2ZSBkYXRlICovXHJcbiAgdXBkYXRlVG9kYXlzRGF0ZSgpIHtcclxuICAgIHRoaXMuX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkuX2luaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGRhdGUgc2VsZWN0aW9uIGluIHRoZSBtb250aCB2aWV3LiAqL1xyXG4gIF9kYXRlU2VsZWN0ZWQoZXZlbnQ6IE1hdENhbGVuZGFyVXNlckV2ZW50PEQgfCBudWxsPik6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0ZSA9IGV2ZW50LnZhbHVlO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5zZWxlY3RlZCBpbnN0YW5jZW9mIERhdGVSYW5nZSB8fFxyXG4gICAgICAoZGF0ZSAmJiAhdGhpcy5fZGF0ZUFkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5zZWxlY3RlZCwgdGhpcy5nZXRVbml0KCkpKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgX2RhdGVFbWl0KHZhbHVlOiBEKSB7XHJcbiAgICB0aGlzLnNldERhdGUodmFsdWUpO1xyXG4gICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KHsgdmFsdWUsIGV2ZW50OiBudWxsIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIGNsb2NrIHZpZXcuICovXHJcbiAgX2hvdXJTZWxlY3RlZEluQ2xvY2tWaWV3KGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcclxuICB9XHJcblxyXG4gIF90aW1lU2VsZWN0ZWRJbkNsb2NrVmlldyhldmVudDogTWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RCB8IG51bGw+KTogdm9pZCB7XHJcbiAgICB0aGlzLnNldERhdGUoZXZlbnQudmFsdWUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGV2ZW50LnZhbHVlKTtcclxuICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB1c2VyIGRheSBzZWxlY3Rpb24uICovXHJcbiAgX2RheVNlbGVjdGVkKGV2ZW50OiBNYXRDYWxlbmRhclVzZXJFdmVudDxEIHwgbnVsbD4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXNPdXRwdXQoJ3RpbWUnKSB8fCB0aGlzLnNlbGVjdGVkIGluc3RhbmNlb2YgRGF0ZVJhbmdlKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0ZShldmVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuX2RhdGVTZWxlY3RlZChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZXZlbnQudmFsdWUpO1xyXG4gICAgICB0aGlzLl9nb1RvRGF0ZUluVmlldyhldmVudC52YWx1ZSwgJ2hvdXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHllYXIgc2VsZWN0aW9uIGluIHRoZSBtdWx0aXllYXIgdmlldy4gKi9cclxuICBfeWVhclNlbGVjdGVkSW5NdWx0aVllYXJWaWV3KG5vcm1hbGl6ZWRZZWFyOiBEKSB7XHJcbiAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xyXG4gIF9tb250aFNlbGVjdGVkSW5ZZWFyVmlldyhub3JtYWxpemVkTW9udGg6IEQpIHtcclxuICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB5ZWFyL21vbnRoIHNlbGVjdGlvbiBpbiB0aGUgbXVsdGkteWVhci95ZWFyIHZpZXdzLiAqL1xyXG4gIF9nb1RvRGF0ZUluVmlldyhkYXRlOiBELCB2aWV3OiBNYXRDYWxlbmRhclZpZXcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0RGF0ZShkYXRlKTtcclxuICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqIFJldHVybnMgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXHJcbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKTogTWF0Q2xvY2tWaWV3PEQ+IHwgTWF0TW9udGhWaWV3PEQ+IHwgTWF0WWVhclZpZXc8RD4gfCBNYXRNdWx0aVllYXJWaWV3PEQ+IHtcclxuICAgIC8vIFRoZSByZXR1cm4gdHlwZSBpcyBleHBsaWNpdGx5IHdyaXR0ZW4gYXMgYSB1bmlvbiB0byBlbnN1cmUgdGhhdCB0aGUgQ2xvc3VyZSBjb21waWxlciBkb2VzXHJcbiAgICAvLyBub3Qgb3B0aW1pemUgY2FsbHMgdG8gX2luaXQoKS4gV2l0aG91dCB0aGUgZXhwbGljdCByZXR1cm4gdHlwZSwgVHlwZVNjcmlwdCBuYXJyb3dzIGl0IHRvXHJcbiAgICAvLyBvbmx5IHRoZSBmaXJzdCBjb21wb25lbnQgdHlwZS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzIyOTk2LlxyXG4gICAgcmV0dXJuIHRoaXMuY2xvY2tWaWV3IHx8IHRoaXMubW9udGhWaWV3IHx8IHRoaXMueWVhclZpZXcgfHwgdGhpcy5tdWx0aVllYXJWaWV3O1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibWF0LWN1c3RvbS1oZWFkZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWN1c3RvbS1jb250cm9sc1wiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtYXQtY3VzdG9tLWRhdGVcIiAqbmdJZj1cImNhbGVuZGFyLnR5cGUgPT09ICd5ZWFyJ1wiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWN1c3RvbS1kYXRlLXllYXIgbWF0LWN1c3RvbS1jb250cm9sXCJcclxuICAgICAgKGNsaWNrKT1cInN3aXRjaFRvVmlldygnbXVsdGkteWVhcicpXCJcclxuICAgICAgW0Bjb250cm9sQWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ211bHRpLXllYXInXSkgPyAnYWN0aXZlJyA6ICcnXCJcclxuICAgICAgW2NsYXNzLm1hdC1jdXN0b20tY29udHJvbC1hY3RpdmVdPVwiaXNDb250cm9sQWN0aXZlKFsnbXVsdGkteWVhciddKVwiXHJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwuc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWxcIj5cclxuICAgICAgICA8c3Bhbj57eyBfeWVhckJ1dHRvblRleHQgfX08L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm1hdC1jdXN0b20tZGF0ZVwiICpuZ0lmPVwiY2FsZW5kYXIudHlwZSA9PT0gJ21vbnRoJ1wiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWN1c3RvbS1kYXRlLW1vbnRoIG1hdC1jdXN0b20tY29udHJvbFwiXHJcbiAgICAgIChjbGljayk9XCJzd2l0Y2hUb1ZpZXcoJ3llYXInKVwiXHJcbiAgICAgIFtAY29udHJvbEFjdGl2ZV09XCJpc0NvbnRyb2xBY3RpdmUoWyd5ZWFyJ10pID8gJ2FjdGl2ZScgOiAnJ1wiXHJcbiAgICAgIFtjbGFzcy5tYXQtY3VzdG9tLWNvbnRyb2wtYWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ3llYXInXSlcIlxyXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLnN3aXRjaFRvWWVhclZpZXdMYWJlbFwiPlxyXG4gICAgICAgIDxzcGFuPnt7IF9tb250aEJ1dHRvblRleHQgfX08L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1hdC1jdXN0b20tZGF0ZS15ZWFyIG1hdC1jdXN0b20tY29udHJvbFwiXHJcbiAgICAgIChjbGljayk9XCJzd2l0Y2hUb1ZpZXcoJ211bHRpLXllYXInKVwiXHJcbiAgICAgIFtAY29udHJvbEFjdGl2ZV09XCJpc0NvbnRyb2xBY3RpdmUoWydtdWx0aS15ZWFyJ10pID8gJ2FjdGl2ZScgOiAnJ1wiXHJcbiAgICAgIFtjbGFzcy5tYXQtY3VzdG9tLWNvbnRyb2wtYWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ211bHRpLXllYXInXSlcIlxyXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsXCI+XHJcbiAgICAgICAgPHNwYW4+e3sgX3llYXJCdXR0b25UZXh0IH19PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtYXQtY3VzdG9tLWRhdGVcIiAqbmdJZj1cImNhbGVuZGFyLmhhc091dHB1dCgnZGF0ZScpXCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtY3VzdG9tLWRhdGUteWVhciBtYXQtY3VzdG9tLWNvbnRyb2xcIlxyXG4gICAgICAoY2xpY2spPVwic3dpdGNoVG9WaWV3KCdtdWx0aS15ZWFyJylcIlxyXG4gICAgICBbQGNvbnRyb2xBY3RpdmVdPVwiaXNDb250cm9sQWN0aXZlKFsnbXVsdGkteWVhciddKSA/ICdhY3RpdmUnIDogJydcIlxyXG4gICAgICBbY2xhc3MubWF0LWN1c3RvbS1jb250cm9sLWFjdGl2ZV09XCJpc0NvbnRyb2xBY3RpdmUoWydtdWx0aS15ZWFyJ10pXCJcclxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJfaW50bC5zd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbFwiPlxyXG4gICAgICAgIDxzcGFuPnt7IF95ZWFyQnV0dG9uVGV4dCB9fTwvc3Bhbj5cclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWN1c3RvbS1kYXRlLW1vbnRoZGF5IG1hdC1jdXN0b20tY29udHJvbFwiXHJcbiAgICAgIChjbGljayk9XCJtb250aGRheUNsaWNrZWQoKVwiXHJcbiAgICAgIFtAY29udHJvbEFjdGl2ZV09XCJpc0NvbnRyb2xBY3RpdmUoWydtb250aCcsICd5ZWFyJ10pID8gJ2FjdGl2ZScgOiAnJ1wiXHJcbiAgICAgIFtjbGFzcy5tYXQtY3VzdG9tLWNvbnRyb2wtYWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ21vbnRoJywgJ3llYXInXSlcIlxyXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vbnRoZGF5QnV0dG9uTGFiZWxcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdC1jdXN0b20tZGF0ZS15ZWFyLWRheW5hbWVcIj57eyBfZGF5QnV0dG9uVGV4dCB9fSZuYnNwOzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdC1jdXN0b20tZGF0ZS15ZWFyLW1vbnRoZGF5XCI+e3sgX21vbnRoZGF5QnV0dG9uVGV4dCB9fTwvc3Bhbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibWF0LWN1c3RvbS10aW1lXCIgKm5nSWY9XCJjYWxlbmRhci5oYXNPdXRwdXQoJ3RpbWUnKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LWN1c3RvbS10aW1lLWhvdXJcIj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWN1c3RvbS10aW1lLWhvdXIgbWF0LWN1c3RvbS1jb250cm9sXCJcclxuICAgICAgICAoY2xpY2spPVwic3dpdGNoVG9WaWV3KCdob3VyJylcIlxyXG4gICAgICAgIFtAY29udHJvbEFjdGl2ZV09XCJpc0NvbnRyb2xBY3RpdmUoWydob3VyJ10pID8gJ2FjdGl2ZScgOiAnJ1wiXHJcbiAgICAgICAgW2NsYXNzLm1hdC1jdXN0b20tY29udHJvbC1hY3RpdmVdPVwiaXNDb250cm9sQWN0aXZlKFsnaG91ciddKVwiXHJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJfaW50bC5zd2l0Y2hUb0hvdXJWaWV3TGFiZWxcIj5cclxuICAgICAgICAgIDxzcGFuPnt7IF9ob3VyQnV0dG9uVGV4dCB9fTwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXQtY3VzdG9tLXNlcGFyYXRvclwiPjo8L3NwYW4+XHJcblxyXG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtY3VzdG9tLXRpbWUtbWludXRlIG1hdC1jdXN0b20tY29udHJvbFwiXHJcbiAgICAgICAgW0Bjb250cm9sQWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ21pbnV0ZSddKSA/ICdhY3RpdmUnIDogJydcIlxyXG4gICAgICAgIFtjbGFzcy5tYXQtY3VzdG9tLWNvbnRyb2wtYWN0aXZlXT1cImlzQ29udHJvbEFjdGl2ZShbJ21pbnV0ZSddKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInN3aXRjaFRvVmlldygnbWludXRlJylcIlxyXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwuc3dpdGNoVG9NaW51dGVWaWV3TGFiZWxcIj5cclxuICAgICAgICAgIDxzcGFuPnt7IF9taW51dGVCdXR0b25UZXh0IH19PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtY3VzdG9tLXRpbWUtYW1wbVwiICpuZ0lmPVwiY2FsZW5kYXIudHdlbHZlSG91clwiPlxyXG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtY2FsZW5kYXItY29udHJvbFwiXHJcbiAgICAgICAgW0Bjb250cm9sQWN0aXZlXT1cIl9pc0FNID8gJ2FjdGl2ZScgOiAnJ1wiXHJcbiAgICAgICAgW2NsYXNzLm1hdC1jdXN0b20tY29udHJvbC1hY3RpdmVdPVwiX2lzQU1cIlxyXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwuc2V0VG9BTUxhYmVsXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlQW1QbSh0cnVlKVwiPlxyXG4gICAgICAgICAgQU1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWNhbGVuZGFyLWNvbnRyb2xcIlxyXG4gICAgICAgIFtAY29udHJvbEFjdGl2ZV09XCIhX2lzQU0gPyAnYWN0aXZlJyA6ICcnXCJcclxuICAgICAgICBbY2xhc3MubWF0LWN1c3RvbS1jb250cm9sLWFjdGl2ZV09XCIhX2lzQU1cIlxyXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwuc2V0VG9QTUxhYmVsXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlQW1QbShmYWxzZSlcIj5cclxuICAgICAgICAgIFBNXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtY3VzdG9tLXByZXYtbmV4dFwiICpuZ0lmPVwiaGFzUHJldk5leHRCbG9jaygpXCI+XHJcblxyXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibWF0LWNhbGVuZGFyLXByZXZpb3VzLWJ1dHRvblwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhcHJldmlvdXNFbmFibGVkKClcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwicHJldmlvdXNDbGlja2VkKClcIlxyXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInByZXZCdXR0b25MYWJlbFwiPlxyXG4gICAgPC9idXR0b24+XHJcblxyXG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1hdC1jdXN0b20tcGVyaW9kIG1hdC1jdXN0b20tY29udHJvbFwiXHJcbiAgICBkaXNhYmxlUmlwcGxlPVwidHJ1ZVwiXHJcbiAgICAoY2xpY2spPVwiY3VycmVudFBlcmlvZENsaWNrZWQoKVwiXHJcbiAgICBbZGlzYWJsZWRdPVwiY3VycmVudFBlcmlvZERpc2FibGVkKClcIlxyXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJwZXJpb2RCdXR0b25MYWJlbFwiPlxyXG4gICAgICA8c3Ryb25nPnt7IHBlcmlvZEJ1dHRvblRleHQgfX08L3N0cm9uZz5cclxuICAgIDwvYnV0dG9uPlxyXG5cclxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzcz1cIm1hdC1jYWxlbmRhci1uZXh0LWJ1dHRvblwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhbmV4dEVuYWJsZWQoKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJuZXh0Q2xpY2tlZCgpXCJcclxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uTGFiZWxcIj5cclxuICAgIDwvYnV0dG9uPlxyXG5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiIsIjxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cIl9jYWxlbmRhckhlYWRlclBvcnRhbFwiPjwvbmctdGVtcGxhdGU+XHJcblxyXG48ZGl2IGNsYXNzPVwibWF0LWNhbGVuZGFyLWNvbnRlbnRcIiBbbmdTd2l0Y2hdPVwiY3VycmVudFZpZXdcIiBjZGtNb25pdG9yU3VidHJlZUZvY3VzIHRhYmluZGV4PVwiLTFcIj5cclxuXHJcbiAgPG1hdC1jbG9jay12aWV3XHJcbiAgICAgICpuZ1N3aXRjaERlZmF1bHRcclxuICAgICAgWyhhY3RpdmVEYXRlKV09XCJhY3RpdmVEYXRlXCJcclxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICAgICAgWyhjdXJyZW50VmlldyldPVwiY3VycmVudFZpZXdcIlxyXG4gICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxyXG4gICAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcclxuICAgICAgW2RhdGVDbGFzc109XCJkYXRlQ2xhc3NcIlxyXG4gICAgICBbY2xvY2tTdGVwXT1cImNsb2NrU3RlcFwiXHJcbiAgICAgIFt0d2VsdmVIb3VyXT1cInR3ZWx2ZUhvdXJcIlxyXG4gICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwic2V0RGF0ZSgkZXZlbnQpXCJcclxuICAgICAgKGhvdXJTZWxlY3RlZCk9XCJfaG91clNlbGVjdGVkSW5DbG9ja1ZpZXcoJGV2ZW50KVwiXHJcbiAgICAgIChfdXNlclNlbGVjdGlvbik9XCJfdGltZVNlbGVjdGVkSW5DbG9ja1ZpZXcoJGV2ZW50KVwiPlxyXG4gIDwvbWF0LWNsb2NrLXZpZXc+XHJcblxyXG4gIDxtYXQtbW9udGgtdmlld1xyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiXHJcbiAgICAgIFsoYWN0aXZlRGF0ZSldPVwiYWN0aXZlRGF0ZVwiXHJcbiAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxyXG4gICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcclxuICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXHJcbiAgICAgIFtkYXRlQ2xhc3NdPVwiZGF0ZUNsYXNzXCJcclxuICAgICAgW2NvbXBhcmlzb25TdGFydF09XCJjb21wYXJpc29uU3RhcnRcIlxyXG4gICAgICBbY29tcGFyaXNvbkVuZF09XCJjb21wYXJpc29uRW5kXCJcclxuICAgICAgKF91c2VyU2VsZWN0aW9uKT1cIl9kYXlTZWxlY3RlZCgkZXZlbnQpXCI+XHJcbiAgPC9tYXQtbW9udGgtdmlldz5cclxuXHJcbiAgPG1hdC15ZWFyLXZpZXdcclxuICAgICAgKm5nU3dpdGNoQ2FzZT1cIid5ZWFyJ1wiXHJcbiAgICAgIFsoYWN0aXZlRGF0ZSldPVwiYWN0aXZlRGF0ZVwiXHJcbiAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxyXG4gICAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcclxuICAgICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXHJcbiAgICAgIFtkYXRlQ2xhc3NdPVwiZGF0ZUNsYXNzXCJcclxuICAgICAgKG1vbnRoU2VsZWN0ZWQpPVwiX21vbnRoU2VsZWN0ZWRJblllYXJWaWV3KCRldmVudClcIlxyXG4gICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwiaGFzT3V0cHV0KCdtb250aCcpID8gX2RhdGVFbWl0KCRldmVudCkgOiBfZ29Ub0RhdGVJblZpZXcoJGV2ZW50LCAnbW9udGgnKVwiPlxyXG4gIDwvbWF0LXllYXItdmlldz5cclxuXHJcbiAgPG1hdC1tdWx0aS15ZWFyLXZpZXdcclxuICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS15ZWFyJ1wiXHJcbiAgICAgIFt5ZWFyc1BlclBhZ2VdPVwieWVhcnNQZXJQYWdlXCJcclxuICAgICAgW3llYXJzUGVyUm93XT1cInllYXJzUGVyUm93XCJcclxuICAgICAgWyhhY3RpdmVEYXRlKV09XCJhY3RpdmVEYXRlXCJcclxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICAgICAgW2RhdGVGaWx0ZXJdPVwiZGF0ZUZpbHRlclwiXHJcbiAgICAgIFttYXhEYXRlXT1cIm1heERhdGVcIlxyXG4gICAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcclxuICAgICAgW2RhdGVDbGFzc109XCJkYXRlQ2xhc3NcIlxyXG4gICAgICAoeWVhclNlbGVjdGVkKT1cIl95ZWFyU2VsZWN0ZWRJbk11bHRpWWVhclZpZXcoJGV2ZW50KVwiXHJcbiAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJoYXNPdXRwdXQoJ3llYXInKSA/IF9kYXRlRW1pdCgkZXZlbnQpIDogX2dvVG9EYXRlSW5WaWV3KCRldmVudCwgJ3llYXInKVwiPlxyXG4gIDwvbWF0LW11bHRpLXllYXItdmlldz5cclxuPC9kaXY+XHJcbiJdfQ==