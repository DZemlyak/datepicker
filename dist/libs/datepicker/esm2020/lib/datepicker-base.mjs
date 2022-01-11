/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceStringArray } from '@angular/cdk/coercion';
import { ESCAPE, hasModifierKey, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, FlexibleConnectedPositionStrategy, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef, Directive, isDevMode, } from '@angular/core';
import { mixinColor } from '@angular/material/core';
import { merge, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { DateAdapter } from './core';
import { MatCalendar } from './calendar';
import { matDatepickerAnimations } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
import { MatDateSelectionModel, DateRange, } from './date-selection-model';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, } from './date-range-selection-strategy';
import { MatDatepickerIntl } from './datepicker-intl';
import * as i0 from "@angular/core";
import * as i1 from "./date-selection-model";
import * as i2 from "./core";
import * as i3 from "./datepicker-intl";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "./calendar";
import * as i6 from "@angular/common";
import * as i7 from "@angular/cdk/portal";
import * as i8 from "@angular/material/button";
import * as i9 from "@angular/cdk/overlay";
import * as i10 from "@angular/cdk/bidi";
function MatDatepickerContent_ng_template_2_Template(rf, ctx) { }
/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;
/** Injection token that determines the scroll handling while the calendar is open. */
export const MAT_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mat-datepicker-scroll-strategy');
/** @docs-private */
export function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
export const MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY,
};
// Boilerplate for applying mixins to MatDatepickerContent.
/** @docs-private */
const _MatDatepickerContentBase = mixinColor(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
});
/**
 * Component used as the content for the datepicker overlay. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the overlay that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
export class MatDatepickerContent extends _MatDatepickerContentBase {
    constructor(elementRef, _changeDetectorRef, _globalModel, _dateAdapter, _rangeSelectionStrategy, intl) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._globalModel = _globalModel;
        this._dateAdapter = _dateAdapter;
        this._rangeSelectionStrategy = _rangeSelectionStrategy;
        this._subscriptions = new Subscription();
        /** Emits when an animation has finished. */
        this._animationDone = new Subject();
        /** Portal with projected action buttons. */
        this._actionsPortal = null;
        this._closeButtonText = intl.closeCalendarLabel;
    }
    ngOnInit() {
        // If we have actions, clone the model so that we have the ability to cancel the selection,
        // otherwise update the global model directly. Note that we want to assign this as soon as
        // possible, but `_actionsPortal` isn't available in the constructor so we do it in `ngOnInit`.
        this._model = this._actionsPortal ? this._globalModel.clone() : this._globalModel;
        this._animationState = this.datepicker.touchUi ? 'enter-dialog' : 'enter-dropdown';
    }
    ngAfterViewInit() {
        this._subscriptions.add(this.datepicker.stateChanges.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        }));
        this._calendar.focusActiveCell();
    }
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        this._animationDone.complete();
    }
    _queueUserSelection(date) {
        this._model.queue(date);
    }
    _handleUserSelection(event) {
        const selection = this._model.selection;
        const value = event.value;
        const isRange = selection instanceof DateRange;
        // If we're selecting a range and we have a selection strategy, always pass the value through
        // there. Otherwise don't assign null values to the model, unless we're selecting a range.
        // A null value when picking a range means that the user cancelled the selection (e.g. by
        // pressing escape), whereas when selecting a single value it means that the value didn't
        // change. This isn't very intuitive, but it's here for backwards-compatibility.
        if (isRange && this._rangeSelectionStrategy) {
            const newSelection = this._rangeSelectionStrategy.selectionFinished(value, selection, event.event);
            this._model.updateSelection(newSelection, this);
        }
        else if (value &&
            (isRange || !this._dateAdapter.sameDate(value, selection, this._calendar.getUnit()))) {
            this._model.add(value);
        }
        // Delegate closing the overlay to the actions.
        if ((!this._model || this._model.isComplete()) && !this._actionsPortal) {
            this.datepicker.close();
        }
    }
    _startExitAnimation() {
        this._animationState = 'void';
        this._changeDetectorRef.markForCheck();
    }
    _getSelected() {
        return this._model.selection;
    }
    /** Applies the current pending selection to the global model. */
    _applyPendingSelection() {
        this._model.processQueue();
        if (this._model !== this._globalModel) {
            this._globalModel.updateSelection(this._model.selection, this);
        }
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerContent.ɵfac = function MatDatepickerContent_Factory(t) { return new (t || MatDatepickerContent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.MatDateSelectionModel), i0.ɵɵdirectiveInject(i2.DateAdapter), i0.ɵɵdirectiveInject(MAT_DATE_RANGE_SELECTION_STRATEGY, 8), i0.ɵɵdirectiveInject(i3.MatDatepickerIntl)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerContent.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatDatepickerContent, selectors: [["mat-datepicker-content"]], viewQuery: function MatDatepickerContent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(MatCalendar, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._calendar = _t.first);
    } }, hostAttrs: [1, "mat-datepicker-content"], hostVars: 3, hostBindings: function MatDatepickerContent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵsyntheticHostListener("@transformPanel.done", function MatDatepickerContent_animation_transformPanel_done_HostBindingHandler() { return ctx._animationDone.next(); });
    } if (rf & 2) {
        i0.ɵɵsyntheticHostProperty("@transformPanel", ctx._animationState);
        i0.ɵɵclassProp("mat-datepicker-content-touch", ctx.datepicker.touchUi);
    } }, inputs: { color: "color" }, exportAs: ["matDatepickerContent"], features: [i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 25, consts: [["cdkTrapFocus", "", 1, "mat-datepicker-content-container"], [3, "id", "ngClass", "type", "startAt", "startView", "yearsPerPage", "yearsPerRow", "clockStep", "twelveHour", "minDate", "maxDate", "dateFilter", "headerComponent", "selected", "dateClass", "comparisonStart", "comparisonEnd", "yearSelected", "monthSelected", "viewChanged", "dateChanged", "_userSelection"], [3, "cdkPortalOutlet"], ["type", "button", "mat-raised-button", "", 1, "mat-datepicker-close-button", 3, "color", "focus", "blur", "click"]], template: function MatDatepickerContent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "mat-calendar", 1);
        i0.ɵɵlistener("yearSelected", function MatDatepickerContent_Template_mat_calendar_yearSelected_1_listener($event) { return ctx.datepicker._selectYear($event); })("monthSelected", function MatDatepickerContent_Template_mat_calendar_monthSelected_1_listener($event) { return ctx.datepicker._selectMonth($event); })("viewChanged", function MatDatepickerContent_Template_mat_calendar_viewChanged_1_listener($event) { return ctx.datepicker._viewChanged($event); })("dateChanged", function MatDatepickerContent_Template_mat_calendar_dateChanged_1_listener($event) { return ctx._queueUserSelection($event); })("_userSelection", function MatDatepickerContent_Template_mat_calendar__userSelection_1_listener($event) { return ctx._handleUserSelection($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, MatDatepickerContent_ng_template_2_Template, 0, 0, "ng-template", 2);
        i0.ɵɵelementStart(3, "button", 3);
        i0.ɵɵlistener("focus", function MatDatepickerContent_Template_button_focus_3_listener() { return ctx._closeButtonFocused = true; })("blur", function MatDatepickerContent_Template_button_blur_3_listener() { return ctx._closeButtonFocused = false; })("click", function MatDatepickerContent_Template_button_click_3_listener() { return ctx.datepicker.close(); });
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("mat-datepicker-content-container-with-actions", ctx._actionsPortal);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.datepicker.id)("ngClass", ctx.datepicker.panelClass)("type", ctx.datepicker.type)("startAt", ctx.datepicker.startAt)("startView", ctx.datepicker.startView)("yearsPerPage", ctx.datepicker.yearsPerPage)("yearsPerRow", ctx.datepicker.yearsPerRow)("clockStep", ctx.datepicker.clockStep)("twelveHour", ctx.datepicker.twelveHour)("minDate", ctx.datepicker._getMinDate())("maxDate", ctx.datepicker._getMaxDate())("dateFilter", ctx.datepicker._getDateFilter())("headerComponent", ctx.datepicker.calendarHeaderComponent)("selected", ctx._getSelected())("dateClass", ctx.datepicker.dateClass)("comparisonStart", ctx.comparisonStart)("comparisonEnd", ctx.comparisonEnd)("@fadeInCalendar", "enter");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("cdkPortalOutlet", ctx._actionsPortal);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("cdk-visually-hidden", !ctx._closeButtonFocused);
        i0.ɵɵproperty("color", ctx.color || "primary");
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx._closeButtonText);
    } }, directives: [i4.CdkTrapFocus, i5.MatCalendar, i6.NgClass, i7.CdkPortalOutlet, i8.MatButton], styles: [".mat-datepicker-content{display:flex;flex-direction:column;border-radius:4px}.mat-datepicker-content .mat-calendar{width:296px;height:400px}.mat-datepicker-content .mat-calendar.datetime{height:420px}.mat-datepicker-content .mat-calendar.month{height:auto}.mat-datepicker-content .mat-datepicker-close-button{position:absolute;top:100%;left:0;margin-top:8px}.ng-animating .mat-datepicker-content .mat-datepicker-close-button{display:none}.mat-datepicker-content-container{display:flex;flex-direction:column;justify-content:stretch}.mat-datepicker-content-container .mat-calendar{flex:20 20 auto}.mat-datepicker-content-container .mat-calendar .mat-calendar-content{flex:1}.mat-datepicker-content-container .mat-calendar-actions{flex:1 0 auto}.mat-datepicker-content-touch{display:block;max-height:80vh;position:relative;overflow:visible}.mat-datepicker-content-touch .mat-datepicker-content-container{min-height:312px;max-height:788px;min-width:250px;max-width:750px}.mat-datepicker-content-touch .mat-calendar{width:100%;height:auto}@media all and (orientation: landscape){.mat-datepicker-content-touch .mat-datepicker-content-container{width:64vh;height:80vh}}@media all and (orientation: portrait){.mat-datepicker-content-touch .mat-datepicker-content-container{width:80vw;height:100vw}.mat-datepicker-content-touch .mat-datepicker-content-container-with-actions{height:115vw}}\n"], encapsulation: 2, data: { animation: [matDatepickerAnimations.transformPanel, matDatepickerAnimations.fadeInCalendar] }, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerContent, [{
        type: Component,
        args: [{ selector: 'mat-datepicker-content', host: {
                    'class': 'mat-datepicker-content',
                    '[@transformPanel]': '_animationState',
                    '(@transformPanel.done)': '_animationDone.next()',
                    '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
                }, animations: [matDatepickerAnimations.transformPanel, matDatepickerAnimations.fadeInCalendar], exportAs: 'matDatepickerContent', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['color'], template: "<div\r\n  cdkTrapFocus\r\n  class=\"mat-datepicker-content-container\"\r\n  [class.mat-datepicker-content-container-with-actions]=\"_actionsPortal\">\r\n  <mat-calendar\r\n    [id]=\"datepicker.id\"\r\n    [ngClass]=\"datepicker.panelClass\"\r\n    [type]=\"datepicker.type\"\r\n    [startAt]=\"datepicker.startAt\"\r\n    [startView]=\"datepicker.startView\"\r\n    [yearsPerPage]=\"datepicker.yearsPerPage\"\r\n    [yearsPerRow]=\"datepicker.yearsPerRow\"\r\n    [clockStep]=\"datepicker.clockStep\"\r\n    [twelveHour]=\"datepicker.twelveHour\"\r\n    [minDate]=\"datepicker._getMinDate()\"\r\n    [maxDate]=\"datepicker._getMaxDate()\"\r\n    [dateFilter]=\"datepicker._getDateFilter()\"\r\n    [headerComponent]=\"datepicker.calendarHeaderComponent\"\r\n    [selected]=\"_getSelected()\"\r\n    [dateClass]=\"datepicker.dateClass\"\r\n    [comparisonStart]=\"comparisonStart\"\r\n    [comparisonEnd]=\"comparisonEnd\"\r\n    [@fadeInCalendar]=\"'enter'\"\r\n    (yearSelected)=\"datepicker._selectYear($event)\"\r\n    (monthSelected)=\"datepicker._selectMonth($event)\"\r\n    (viewChanged)=\"datepicker._viewChanged($event)\"\r\n    (dateChanged)=\"_queueUserSelection($event)\"\r\n    (_userSelection)=\"_handleUserSelection($event)\"></mat-calendar>\r\n\r\n  <ng-template [cdkPortalOutlet]=\"_actionsPortal\"></ng-template>\r\n\r\n  <!-- Invisible close button for screen reader users. -->\r\n  <button\r\n    type=\"button\"\r\n    mat-raised-button\r\n    [color]=\"color || 'primary'\"\r\n    class=\"mat-datepicker-close-button\"\r\n    [class.cdk-visually-hidden]=\"!_closeButtonFocused\"\r\n    (focus)=\"_closeButtonFocused = true\"\r\n    (blur)=\"_closeButtonFocused = false\"\r\n    (click)=\"datepicker.close()\">{{ _closeButtonText }}</button>\r\n</div>\r\n", styles: [".mat-datepicker-content{display:flex;flex-direction:column;border-radius:4px}.mat-datepicker-content .mat-calendar{width:296px;height:400px}.mat-datepicker-content .mat-calendar.datetime{height:420px}.mat-datepicker-content .mat-calendar.month{height:auto}.mat-datepicker-content .mat-datepicker-close-button{position:absolute;top:100%;left:0;margin-top:8px}.ng-animating .mat-datepicker-content .mat-datepicker-close-button{display:none}.mat-datepicker-content-container{display:flex;flex-direction:column;justify-content:stretch}.mat-datepicker-content-container .mat-calendar{flex:20 20 auto}.mat-datepicker-content-container .mat-calendar .mat-calendar-content{flex:1}.mat-datepicker-content-container .mat-calendar-actions{flex:1 0 auto}.mat-datepicker-content-touch{display:block;max-height:80vh;position:relative;overflow:visible}.mat-datepicker-content-touch .mat-datepicker-content-container{min-height:312px;max-height:788px;min-width:250px;max-width:750px}.mat-datepicker-content-touch .mat-calendar{width:100%;height:auto}@media all and (orientation: landscape){.mat-datepicker-content-touch .mat-datepicker-content-container{width:64vh;height:80vh}}@media all and (orientation: portrait){.mat-datepicker-content-touch .mat-datepicker-content-container{width:80vw;height:100vw}.mat-datepicker-content-touch .mat-datepicker-content-container-with-actions{height:115vw}}\n"] }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.MatDateSelectionModel }, { type: i2.DateAdapter }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_RANGE_SELECTION_STRATEGY]
            }] }, { type: i3.MatDatepickerIntl }]; }, { _calendar: [{
            type: ViewChild,
            args: [MatCalendar]
        }] }); })();
/** Base class for a datepicker. */
export class MatDatepickerBase {
    constructor(_overlay, _ngZone, _viewContainerRef, scrollStrategy, _dateAdapter, _dir, _model) {
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._model = _model;
        this._inputStateChanges = Subscription.EMPTY;
        /** The type of value handled by the calendar. */
        this.type = 'date';
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /** multi-year inputs */
        this.yearsPerPage = 24;
        this.yearsPerRow = 4;
        /** Clock interval */
        this.clockStep = 1;
        /** Clock hour format */
        this.twelveHour = true;
        this._touchUi = false;
        /** Preferred position of the datepicker in the X axis. */
        this.xPosition = 'start';
        /** Preferred position of the datepicker in the Y axis. */
        this.yPosition = 'below';
        this._restoreFocus = true;
        /**
         * Emits selected year in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when the current view changes.
         */
        this.viewChanged = new EventEmitter(true);
        /** Emits when the datepicker has been opened. */
        this.openedStream = new EventEmitter();
        /** Emits when the datepicker has been closed. */
        this.closedStream = new EventEmitter();
        this._opened = false;
        /** The id for the datepicker calendar. */
        this.id = `mat-datepicker-${datepickerUid++}`;
        /** The element that was focused before the datepicker was opened. */
        this._focusedElementBeforeOpen = null;
        /** Unique class that will be added to the backdrop so that the test harnesses can look it up. */
        this._backdropHarnessClass = `${this.id}-backdrop`;
        /** Emits when the datepicker's state changes. */
        this.stateChanges = new Subject();
        if (!this._dateAdapter && isDevMode()) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._scrollStrategy = scrollStrategy;
    }
    /** The date to open the calendar to initially. */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this.datepickerInput ? this.datepickerInput.getStartValue() : null);
    }
    set startAt(value) {
        this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /** Color palette to use on the datepicker's calendar. */
    get color() {
        return (this._color || (this.datepickerInput ? this.datepickerInput.getThemePalette() : undefined));
    }
    set color(value) {
        this._color = value;
    }
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a dropdown and elements have more padding to allow for bigger touch targets.
     */
    get touchUi() {
        return this._touchUi;
    }
    set touchUi(value) {
        this._touchUi = coerceBooleanProperty(value);
    }
    /** Whether the datepicker pop-up should be disabled. */
    get disabled() {
        return this._disabled === undefined && this.datepickerInput
            ? this.datepickerInput.disabled
            : !!this._disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.stateChanges.next(undefined);
        }
    }
    /**
     * Whether to restore focus to the previously-focused element when the calendar is closed.
     * Note that automatic focus restoration is an accessibility feature and it is recommended that
     * you provide your own equivalent, if you decide to turn it off.
     */
    get restoreFocus() {
        return this._restoreFocus;
    }
    set restoreFocus(value) {
        this._restoreFocus = coerceBooleanProperty(value);
    }
    /**
     * Classes to be passed to the date picker panel.
     * Supports string and string array values, similar to `ngClass`.
     */
    get panelClass() {
        return this._panelClass;
    }
    set panelClass(value) {
        this._panelClass = coerceStringArray(value);
    }
    /** Whether the calendar is open. */
    get opened() {
        return this._opened;
    }
    set opened(value) {
        coerceBooleanProperty(value) ? this.open() : this.close();
    }
    /** The minimum selectable date. */
    _getMinDate() {
        return this.datepickerInput && this.datepickerInput.min;
    }
    /** The maximum selectable date. */
    _getMaxDate() {
        return this.datepickerInput && this.datepickerInput.max;
    }
    _getDateFilter() {
        return this.datepickerInput && this.datepickerInput.dateFilter;
    }
    ngOnChanges(changes) {
        const positionChange = changes['xPosition'] || changes['yPosition'];
        if (positionChange && !positionChange.firstChange && this._overlayRef) {
            const positionStrategy = this._overlayRef.getConfig().positionStrategy;
            if (positionStrategy instanceof FlexibleConnectedPositionStrategy) {
                this._setConnectedPositions(positionStrategy);
                if (this.opened) {
                    this._overlayRef.updatePosition();
                }
            }
        }
        if (this.datepickerInput != null && this.datepickerInput.type !== this.type) {
            this.datepickerInput.type = this.type;
        }
        this.stateChanges.next(undefined);
    }
    ngOnDestroy() {
        this._destroyOverlay();
        this.close();
        this._inputStateChanges.unsubscribe();
        this.stateChanges.complete();
    }
    /** Selects the given date */
    select(date) {
        this._model.add(date);
    }
    /** Emits the selected year in multiyear view */
    _selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /** Emits selected month in year view */
    _selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /** Emits changed view */
    _viewChanged(view) {
        this.viewChanged.emit(view);
    }
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     * @returns Selection model that the input should hook itself up to.
     */
    registerInput(input) {
        if (this.datepickerInput && isDevMode()) {
            throw Error('A MatDatepicker can only be associated with a single input.');
        }
        this._inputStateChanges.unsubscribe();
        this.datepickerInput = input;
        this.datepickerInput.type = this.type;
        this._inputStateChanges = input.stateChanges.subscribe(() => this.stateChanges.next(undefined));
        return this._model;
    }
    /**
     * Registers a portal containing action buttons with the datepicker.
     * @param portal Portal to be registered.
     */
    registerActions(portal) {
        if (this._actionsPortal && isDevMode()) {
            throw Error('A MatDatepicker can only be associated with a single actions row.');
        }
        this._actionsPortal = portal;
    }
    /**
     * Removes a portal containing action buttons from the datepicker.
     * @param portal Portal to be removed.
     */
    removeActions(portal) {
        if (portal === this._actionsPortal) {
            this._actionsPortal = null;
        }
    }
    /** Open the calendar. */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this.datepickerInput && isDevMode()) {
            throw Error('Attempted to open an MatDatepicker with no associated input.');
        }
        this._focusedElementBeforeOpen = _getFocusedElementPierceShadowDom();
        this._openOverlay();
        this._opened = true;
        this.openedStream.emit();
    }
    /** Close the calendar. */
    close() {
        if (!this._opened) {
            return;
        }
        if (this._componentRef) {
            const instance = this._componentRef.instance;
            instance._startExitAnimation();
            instance._animationDone.pipe(take(1)).subscribe(() => this._destroyOverlay());
        }
        const completeClose = () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        };
        if (this._restoreFocus &&
            this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /** Applies the current pending selection on the overlay to the model. */
    _applyPendingSelection() {
        this._componentRef?.instance?._applyPendingSelection();
    }
    /** Forwards relevant values from the datepicker to the datepicker content inside the overlay. */
    _forwardContentValues(instance) {
        instance.datepicker = this;
        instance.color = this.color;
        instance._actionsPortal = this._actionsPortal;
    }
    /** Opens the overlay with the calendar. */
    _openOverlay() {
        this._destroyOverlay();
        const isDialog = this.touchUi;
        const labelId = this.datepickerInput.getOverlayLabelId();
        const portal = new ComponentPortal(MatDatepickerContent, this._viewContainerRef);
        const overlayRef = (this._overlayRef = this._overlay.create(new OverlayConfig({
            positionStrategy: isDialog ? this._getDialogStrategy() : this._getDropdownStrategy(),
            hasBackdrop: true,
            backdropClass: [
                isDialog ? 'cdk-overlay-dark-backdrop' : 'mat-overlay-transparent-backdrop',
                this._backdropHarnessClass,
            ],
            direction: this._dir,
            scrollStrategy: isDialog ? this._overlay.scrollStrategies.block() : this._scrollStrategy(),
            panelClass: `mat-datepicker-${isDialog ? 'dialog' : 'popup'}`,
        })));
        const overlayElement = overlayRef.overlayElement;
        overlayElement.setAttribute('role', 'dialog');
        if (labelId) {
            overlayElement.setAttribute('aria-labelledby', labelId);
        }
        if (isDialog) {
            overlayElement.setAttribute('aria-modal', 'true');
        }
        this._getCloseStream(overlayRef).subscribe(event => {
            if (event) {
                event.preventDefault();
            }
            this.close();
        });
        this._componentRef = overlayRef.attach(portal);
        this._forwardContentValues(this._componentRef.instance);
        // Update the position once the calendar has rendered. Only relevant in dropdown mode.
        if (!isDialog) {
            this._ngZone.onStable.pipe(take(1)).subscribe(() => overlayRef.updatePosition());
        }
    }
    /** Destroys the current overlay. */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = this._componentRef = null;
        }
    }
    /** Gets a position strategy that will open the calendar as a dropdown. */
    _getDialogStrategy() {
        return this._overlay.position().global().centerHorizontally().centerVertically();
    }
    /** Gets a position strategy that will open the calendar as a dropdown. */
    _getDropdownStrategy() {
        const strategy = this._overlay
            .position()
            .flexibleConnectedTo(this.datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.mat-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition();
        return this._setConnectedPositions(strategy);
    }
    /** Sets the positions of the datepicker in dropdown mode based on the current configuration. */
    _setConnectedPositions(strategy) {
        const primaryX = this.xPosition === 'end' ? 'end' : 'start';
        const secondaryX = primaryX === 'start' ? 'end' : 'start';
        const primaryY = this.yPosition === 'above' ? 'bottom' : 'top';
        const secondaryY = primaryY === 'top' ? 'bottom' : 'top';
        return strategy.withPositions([
            {
                originX: primaryX,
                originY: secondaryY,
                overlayX: primaryX,
                overlayY: primaryY,
            },
            {
                originX: primaryX,
                originY: primaryY,
                overlayX: primaryX,
                overlayY: secondaryY,
            },
            {
                originX: secondaryX,
                originY: secondaryY,
                overlayX: secondaryX,
                overlayY: primaryY,
            },
            {
                originX: secondaryX,
                originY: primaryY,
                overlayX: secondaryX,
                overlayY: secondaryY,
            },
        ]);
    }
    /** Gets an observable that will emit when the overlay is supposed to be closed. */
    _getCloseStream(overlayRef) {
        return merge(overlayRef.backdropClick(), overlayRef.detachments(), overlayRef.keydownEvents().pipe(filter(event => {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            return ((event.keyCode === ESCAPE && !hasModifierKey(event)) ||
                (this.datepickerInput && hasModifierKey(event, 'altKey') && event.keyCode === UP_ARROW));
        })));
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerBase.ɵfac = function MatDatepickerBase_Factory(t) { return new (t || MatDatepickerBase)(i0.ɵɵdirectiveInject(i9.Overlay), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(MAT_DATEPICKER_SCROLL_STRATEGY), i0.ɵɵdirectiveInject(i2.DateAdapter, 8), i0.ɵɵdirectiveInject(i10.Directionality, 8), i0.ɵɵdirectiveInject(i1.MatDateSelectionModel)); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerBase.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDatepickerBase, inputs: { calendarHeaderComponent: "calendarHeaderComponent", startAt: "startAt", type: "type", startView: "startView", yearsPerPage: "yearsPerPage", yearsPerRow: "yearsPerRow", clockStep: "clockStep", twelveHour: "twelveHour", color: "color", touchUi: "touchUi", disabled: "disabled", xPosition: "xPosition", yPosition: "yPosition", restoreFocus: "restoreFocus", dateClass: "dateClass", panelClass: "panelClass", opened: "opened" }, outputs: { yearSelected: "yearSelected", monthSelected: "monthSelected", viewChanged: "viewChanged", openedStream: "opened", closedStream: "closed" }, features: [i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerBase, [{
        type: Directive
    }], function () { return [{ type: i9.Overlay }, { type: i0.NgZone }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DATEPICKER_SCROLL_STRATEGY]
            }] }, { type: i2.DateAdapter, decorators: [{
                type: Optional
            }] }, { type: i10.Directionality, decorators: [{
                type: Optional
            }] }, { type: i1.MatDateSelectionModel }]; }, { calendarHeaderComponent: [{
            type: Input
        }], startAt: [{
            type: Input
        }], type: [{
            type: Input
        }], startView: [{
            type: Input
        }], yearsPerPage: [{
            type: Input
        }], yearsPerRow: [{
            type: Input
        }], clockStep: [{
            type: Input
        }], twelveHour: [{
            type: Input
        }], color: [{
            type: Input
        }], touchUi: [{
            type: Input
        }], disabled: [{
            type: Input
        }], xPosition: [{
            type: Input
        }], yPosition: [{
            type: Input
        }], restoreFocus: [{
            type: Input
        }], yearSelected: [{
            type: Output
        }], monthSelected: [{
            type: Output
        }], viewChanged: [{
            type: Output
        }], dateClass: [{
            type: Input
        }], openedStream: [{
            type: Output,
            args: ['opened']
        }], closedStream: [{
            type: Output,
            args: ['closed']
        }], panelClass: [{
            type: Input
        }], opened: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1iYXNlLnRzIiwiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1jb250ZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFHYixpQ0FBaUMsR0FDbEMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFpQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFJVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFZLFVBQVUsRUFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHakUsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixTQUFTLEdBQ1YsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsaUNBQWlDLEdBRWxDLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFdEQsaUVBQWlFO0FBQ2pFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztBQUV0QixzRkFBc0Y7QUFDdEYsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQzlELGdDQUFnQyxDQUNqQyxDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxzQ0FBc0MsQ0FBQyxPQUFnQjtJQUNyRSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNyRCxDQUFDO0FBUUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLCtDQUErQyxHQUFHO0lBQzdELE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLHNDQUFzQztDQUNuRCxDQUFDO0FBRUYsMkRBQTJEO0FBQzNELG9CQUFvQjtBQUNwQixNQUFNLHlCQUF5QixHQUFHLFVBQVUsQ0FDMUM7SUFDRSxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFJLENBQUM7Q0FDaEQsQ0FDRixDQUFDO0FBRUY7Ozs7OztHQU1HO0FBaUJILE1BQU0sT0FBTyxvQkFDWCxTQUFRLHlCQUF5QjtJQW1DakMsWUFDRSxVQUFzQixFQUNkLGtCQUFxQyxFQUNyQyxZQUF5QyxFQUN6QyxZQUE0QixFQUc1Qix1QkFBeUQsRUFDakUsSUFBdUI7UUFFdkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBUlYsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFDekMsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBRzVCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBa0M7UUF4QzNELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXFCNUMsNENBQTRDO1FBQ25DLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVE5Qyw0Q0FBNEM7UUFDNUMsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBYTNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbEQsQ0FBQztJQUVELFFBQVE7UUFDTiwyRkFBMkY7UUFDM0YsMEZBQTBGO1FBQzFGLCtGQUErRjtRQUMvRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDbEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyRixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBTztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBcUM7UUFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDeEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMxQixNQUFNLE9BQU8sR0FBRyxTQUFTLFlBQVksU0FBUyxDQUFDO1FBRS9DLDZGQUE2RjtRQUM3RiwwRkFBMEY7UUFDMUYseUZBQXlGO1FBQ3pGLHlGQUF5RjtRQUN6RixnRkFBZ0Y7UUFDaEYsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FDakUsS0FBSyxFQUNMLFNBQW9DLEVBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQ1osQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakU7YUFBTSxJQUNMLEtBQUs7WUFDTCxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUF5QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUNwRztZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBK0MsQ0FBQztJQUNyRSxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLHNCQUFzQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQzs7OEhBekhVLG9CQUFvQiw4TEEwQ3JCLGlDQUFpQzt5SEExQ2hDLG9CQUFvQjt1QkFPcEIsV0FBVzs7Ozs7cUpBUFgseUJBQXFCOzs7OztRQzFIbEMsOEJBR3lFO1FBQ3ZFLHVDQXVCa0Q7UUFKaEQsMkhBQWdCLGtDQUE4QixJQUFDLGdIQUM5QixtQ0FBK0IsSUFERCw0R0FFaEMsbUNBQStCLElBRkMsNEdBR2hDLCtCQUEyQixJQUhLLGtIQUk3QixnQ0FBNEIsSUFKQztRQUlDLGlCQUFlO1FBRWpFLHFGQUE4RDtRQUc5RCxpQ0FRK0I7UUFGN0IsMkhBQStCLElBQUksSUFBQyw0R0FDTixLQUFLLElBREMsb0ZBRTNCLHNCQUFrQixJQUZTO1FBRVAsWUFBc0I7UUFBQSxpQkFBUztRQUNoRSxpQkFBTTs7UUF0Q0osbUZBQXNFO1FBRXBFLGVBQW9CO1FBQXBCLHNDQUFvQixzQ0FBQSw2QkFBQSxtQ0FBQSx1Q0FBQSw2Q0FBQSwyQ0FBQSx1Q0FBQSx5Q0FBQSx5Q0FBQSx5Q0FBQSwrQ0FBQSwyREFBQSxnQ0FBQSx1Q0FBQSx3Q0FBQSxvQ0FBQSw0QkFBQTtRQXdCVCxlQUFrQztRQUFsQyxvREFBa0M7UUFRN0MsZUFBa0Q7UUFBbEQsK0RBQWtEO1FBRmxELDhDQUE0QjtRQUtDLGVBQXNCO1FBQXRCLDBDQUFzQjsrL0NENEV6QyxDQUFDLHVCQUF1QixDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjLENBQUM7dUZBTWpGLG9CQUFvQjtjQWhCaEMsU0FBUzsyQkFDRSx3QkFBd0IsUUFHNUI7b0JBQ0osT0FBTyxFQUFFLHdCQUF3QjtvQkFDakMsbUJBQW1CLEVBQUUsaUJBQWlCO29CQUN0Qyx3QkFBd0IsRUFBRSx1QkFBdUI7b0JBQ2pELHNDQUFzQyxFQUFFLG9CQUFvQjtpQkFDN0QsY0FDVyxDQUFDLHVCQUF1QixDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsWUFDbEYsc0JBQXNCLGlCQUNqQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFVBQ3ZDLENBQUMsT0FBTyxDQUFDOztzQkEyQ2QsUUFBUTs7c0JBQ1IsTUFBTTt1QkFBQyxpQ0FBaUM7d0RBbkNuQixTQUFTO2tCQUFoQyxTQUFTO21CQUFDLFdBQVc7O0FBaUt4QixtQ0FBbUM7QUFFbkMsTUFBTSxPQUFnQixpQkFBaUI7SUFpTXJDLFlBQ1UsUUFBaUIsRUFDakIsT0FBZSxFQUNmLGlCQUFtQyxFQUNILGNBQW1CLEVBQ3ZDLFlBQTRCLEVBQzVCLElBQW9CLEVBQ2hDLE1BQW1DO1FBTm5DLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFFdkIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQzVCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQTZCO1FBbE1yQyx1QkFBa0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBaUJoRCxpREFBaUQ7UUFDeEMsU0FBSSxHQUFvQixNQUFNLENBQUM7UUFFeEMsa0RBQWtEO1FBQ3pDLGNBQVMsR0FBb0IsT0FBTyxDQUFDO1FBRTlDLHdCQUF3QjtRQUNmLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLHFCQUFxQjtRQUNaLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFFdkIsd0JBQXdCO1FBQ2YsZUFBVSxHQUFHLElBQUksQ0FBQztRQXlCbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQW1CekIsMERBQTBEO1FBRTFELGNBQVMsR0FBZ0MsT0FBTyxDQUFDO1FBRWpELDBEQUEwRDtRQUUxRCxjQUFTLEdBQWdDLE9BQU8sQ0FBQztRQWN6QyxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUU3Qjs7O1dBR0c7UUFDZ0IsaUJBQVksR0FBb0IsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUV6RTs7O1dBR0c7UUFDZ0Isa0JBQWEsR0FBb0IsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUUxRTs7V0FFRztRQUNnQixnQkFBVyxHQUFrQyxJQUFJLFlBQVksQ0FDOUUsSUFBSSxDQUNMLENBQUM7UUFLRixpREFBaUQ7UUFDdEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRW5FLGlEQUFpRDtRQUN0QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUF1QjNELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFeEIsMENBQTBDO1FBQzFDLE9BQUUsR0FBVyxrQkFBa0IsYUFBYSxFQUFFLEVBQUUsQ0FBQztRQXNCakQscUVBQXFFO1FBQzdELDhCQUF5QixHQUF1QixJQUFJLENBQUM7UUFFN0QsaUdBQWlHO1FBQ3pGLDBCQUFxQixHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDO1FBUXRELGlEQUFpRDtRQUN4QyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFXMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDckMsTUFBTSwwQkFBMEIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFwTUQsa0RBQWtEO0lBQ2xELElBQ0ksT0FBTztRQUNULDZGQUE2RjtRQUM3RixxQkFBcUI7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQWU7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQW9CRCx5REFBeUQ7SUFDekQsSUFDSSxLQUFLO1FBQ1AsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDM0YsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFtQjtRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUdELHdEQUF3RDtJQUN4RCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlO1lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBV0Q7Ozs7T0FJRztJQUNILElBQ0ksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBYztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUErQkQ7OztPQUdHO0lBQ0gsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUF3QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHRCxvQ0FBb0M7SUFDcEMsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBTUQsbUNBQW1DO0lBQ25DLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO0lBQzFELENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO0lBQ2pFLENBQUM7SUF1Q0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBRXZFLElBQUksZ0JBQWdCLFlBQVksaUNBQWlDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBQyxJQUFPO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGdEQUFnRDtJQUNoRCxXQUFXLENBQUMsY0FBaUI7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxZQUFZLENBQUMsZUFBa0I7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixZQUFZLENBQUMsSUFBcUI7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxhQUFhLENBQUMsS0FBUTtRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZUFBZSxDQUFDLE1BQXNCO1FBQ3BDLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxNQUFzQjtRQUNsQyxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztTQUM3RTtRQUVELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxpQ0FBaUMsRUFBRSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwwQkFBMEI7SUFDMUIsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDL0U7UUFFRCxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7WUFDekIsK0NBQStDO1lBQy9DLHlDQUF5QztZQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFDRSxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMseUJBQXlCO1lBQzlCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssS0FBSyxVQUFVLEVBQzFEO1lBQ0EsMEZBQTBGO1lBQzFGLDJGQUEyRjtZQUMzRix5RkFBeUY7WUFDekYsdUZBQXVGO1lBQ3ZGLDJDQUEyQztZQUMzQyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDTCxhQUFhLEVBQUUsQ0FBQztTQUNqQjtJQUNILENBQUM7SUFFRCx5RUFBeUU7SUFDekUsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELGlHQUFpRztJQUN2RixxQkFBcUIsQ0FBQyxRQUFvQztRQUNsRSxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsUUFBUSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ2hELENBQUM7SUFFRCwyQ0FBMkM7SUFDbkMsWUFBWTtRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQ2hDLG9CQUFvQixFQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3pELElBQUksYUFBYSxDQUFDO1lBQ2hCLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUNwRixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO2dCQUMzRSxJQUFJLENBQUMscUJBQXFCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDMUYsVUFBVSxFQUFFLGtCQUFrQixRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1NBQzlELENBQUMsQ0FDSCxDQUFDLENBQUM7UUFDSCxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ2pELGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLElBQUksT0FBTyxFQUFFO1lBQ1gsY0FBYyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osY0FBYyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RCxzRkFBc0Y7UUFDdEYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO0lBRUQsb0NBQW9DO0lBQzVCLGVBQWU7UUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCwwRUFBMEU7SUFDbEUsa0JBQWtCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDbkYsQ0FBQztJQUVELDBFQUEwRTtJQUNsRSxvQkFBb0I7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDM0IsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2FBQ3JFLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDO2FBQ2hELHNCQUFzQixDQUFDLEtBQUssQ0FBQzthQUM3QixrQkFBa0IsQ0FBQyxDQUFDLENBQUM7YUFDckIsa0JBQWtCLEVBQUUsQ0FBQztRQUV4QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0dBQWdHO0lBQ3hGLHNCQUFzQixDQUFDLFFBQTJDO1FBQ3hFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1RCxNQUFNLFVBQVUsR0FBRyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUMxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0QsTUFBTSxVQUFVLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFekQsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQzVCO2dCQUNFLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsVUFBVTtnQkFDbkIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2FBQ25CO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLFVBQVU7YUFDckI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsUUFBUTthQUNuQjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxVQUFVO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1GQUFtRjtJQUMzRSxlQUFlLENBQUMsVUFBc0I7UUFDNUMsT0FBTyxLQUFLLENBQ1YsVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUMxQixVQUFVLENBQUMsV0FBVyxFQUFFLEVBQ3hCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLDBGQUEwRjtZQUMxRixPQUFPLENBQ0wsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FDeEYsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQUNKLENBQUM7O3dIQXhlbUIsaUJBQWlCLHFJQXFNM0IsOEJBQThCO3NIQXJNcEIsaUJBQWlCO3VGQUFqQixpQkFBaUI7Y0FEdEMsU0FBUzs7c0JBc01MLE1BQU07dUJBQUMsOEJBQThCOztzQkFDckMsUUFBUTs7c0JBQ1IsUUFBUTs0REE5TEYsdUJBQXVCO2tCQUEvQixLQUFLO1lBSUYsT0FBTztrQkFEVixLQUFLO1lBWUcsSUFBSTtrQkFBWixLQUFLO1lBR0csU0FBUztrQkFBakIsS0FBSztZQUdHLFlBQVk7a0JBQXBCLEtBQUs7WUFFRyxXQUFXO2tCQUFuQixLQUFLO1lBR0csU0FBUztrQkFBakIsS0FBSztZQUdHLFVBQVU7a0JBQWxCLEtBQUs7WUFJRixLQUFLO2tCQURSLEtBQUs7WUFnQkYsT0FBTztrQkFEVixLQUFLO1lBV0YsUUFBUTtrQkFEWCxLQUFLO1lBa0JOLFNBQVM7a0JBRFIsS0FBSztZQUtOLFNBQVM7a0JBRFIsS0FBSztZQVNGLFlBQVk7a0JBRGYsS0FBSztZQWFhLFlBQVk7a0JBQTlCLE1BQU07WUFNWSxhQUFhO2tCQUEvQixNQUFNO1lBS1ksV0FBVztrQkFBN0IsTUFBTTtZQUtFLFNBQVM7a0JBQWpCLEtBQUs7WUFHcUIsWUFBWTtrQkFBdEMsTUFBTTttQkFBQyxRQUFRO1lBR1csWUFBWTtrQkFBdEMsTUFBTTttQkFBQyxRQUFRO1lBT1osVUFBVTtrQkFEYixLQUFLO1lBV0YsTUFBTTtrQkFEVCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZVN0cmluZ0FycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgRVNDQVBFLCBoYXNNb2RpZmllcktleSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQge1xyXG4gIE92ZXJsYXksXHJcbiAgT3ZlcmxheUNvbmZpZyxcclxuICBPdmVybGF5UmVmLFxyXG4gIFNjcm9sbFN0cmF0ZWd5LFxyXG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcclxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGlvblRva2VuLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgaXNEZXZNb2RlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYW5Db2xvciwgbWl4aW5Db2xvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBfZ2V0Rm9jdXNlZEVsZW1lbnRQaWVyY2VTaGFkb3dEb20gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZSc7XHJcbmltcG9ydCB7IE1hdENhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XHJcbmltcG9ydCB7IE1hdENhbGVuZGFyVHlwZSwgTWF0Q2FsZW5kYXJWaWV3IH0gZnJvbSAnLi9jYWxlbmRhci50eXBlcyc7XHJcbmltcG9ydCB7IG1hdERhdGVwaWNrZXJBbmltYXRpb25zIH0gZnJvbSAnLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBNYXRDYWxlbmRhclVzZXJFdmVudCwgTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbiB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XHJcbmltcG9ydCB7IERhdGVGaWx0ZXJGbiB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC1iYXNlJztcclxuaW1wb3J0IHtcclxuICBFeHRyYWN0RGF0ZVR5cGVGcm9tU2VsZWN0aW9uLFxyXG4gIE1hdERhdGVTZWxlY3Rpb25Nb2RlbCxcclxuICBEYXRlUmFuZ2UsXHJcbn0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XHJcbmltcG9ydCB7XHJcbiAgTUFUX0RBVEVfUkFOR0VfU0VMRUNUSU9OX1NUUkFURUdZLFxyXG4gIE1hdERhdGVSYW5nZVNlbGVjdGlvblN0cmF0ZWd5LFxyXG59IGZyb20gJy4vZGF0ZS1yYW5nZS1zZWxlY3Rpb24tc3RyYXRlZ3knO1xyXG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW50bCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcclxuXHJcbi8qKiBVc2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIElEIGZvciBlYWNoIGRhdGVwaWNrZXIgaW5zdGFuY2UuICovXHJcbmxldCBkYXRlcGlja2VyVWlkID0gMDtcclxuXHJcbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXHJcbmV4cG9ydCBjb25zdCBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KFxyXG4gICdtYXQtZGF0ZXBpY2tlci1zY3JvbGwtc3RyYXRlZ3knLFxyXG4pO1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XHJcbiAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XHJcbn1cclxuXHJcbi8qKiBQb3NzaWJsZSBwb3NpdGlvbnMgZm9yIHRoZSBkYXRlcGlja2VyIGRyb3Bkb3duIGFsb25nIHRoZSBYIGF4aXMuICovXHJcbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJEcm9wZG93blBvc2l0aW9uWCA9ICdzdGFydCcgfCAnZW5kJztcclxuXHJcbi8qKiBQb3NzaWJsZSBwb3NpdGlvbnMgZm9yIHRoZSBkYXRlcGlja2VyIGRyb3Bkb3duIGFsb25nIHRoZSBZIGF4aXMuICovXHJcbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJEcm9wZG93blBvc2l0aW9uWSA9ICdhYm92ZScgfCAnYmVsb3cnO1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xyXG4gIHByb3ZpZGU6IE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWSxcclxuICBkZXBzOiBbT3ZlcmxheV0sXHJcbiAgdXNlRmFjdG9yeTogTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlksXHJcbn07XHJcblxyXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdERhdGVwaWNrZXJDb250ZW50LlxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5jb25zdCBfTWF0RGF0ZXBpY2tlckNvbnRlbnRCYXNlID0gbWl4aW5Db2xvcihcclxuICBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG4gIH0sXHJcbik7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHVzZWQgYXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBkYXRlcGlja2VyIG92ZXJsYXkuIFdlIHVzZSB0aGlzIGluc3RlYWQgb2YgdXNpbmdcclxuICogTWF0Q2FsZW5kYXIgZGlyZWN0bHkgYXMgdGhlIGNvbnRlbnQgc28gd2UgY2FuIGNvbnRyb2wgdGhlIGluaXRpYWwgZm9jdXMuIFRoaXMgYWxzbyBnaXZlcyB1cyBhXHJcbiAqIHBsYWNlIHRvIHB1dCBhZGRpdGlvbmFsIGZlYXR1cmVzIG9mIHRoZSBvdmVybGF5IHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSBjYWxlbmRhciBpdHNlbGYgaW4gdGhlXHJcbiAqIGZ1dHVyZS4gKGUuZy4gY29uZmlybWF0aW9uIGJ1dHRvbnMpLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyLWNvbnRlbnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci1jb250ZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWydkYXRlcGlja2VyLWNvbnRlbnQuc2NzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdtYXQtZGF0ZXBpY2tlci1jb250ZW50JyxcclxuICAgICdbQHRyYW5zZm9ybVBhbmVsXSc6ICdfYW5pbWF0aW9uU3RhdGUnLFxyXG4gICAgJyhAdHJhbnNmb3JtUGFuZWwuZG9uZSknOiAnX2FuaW1hdGlvbkRvbmUubmV4dCgpJyxcclxuICAgICdbY2xhc3MubWF0LWRhdGVwaWNrZXItY29udGVudC10b3VjaF0nOiAnZGF0ZXBpY2tlci50b3VjaFVpJyxcclxuICB9LFxyXG4gIGFuaW1hdGlvbnM6IFttYXREYXRlcGlja2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbCwgbWF0RGF0ZXBpY2tlckFuaW1hdGlvbnMuZmFkZUluQ2FsZW5kYXJdLFxyXG4gIGV4cG9ydEFzOiAnbWF0RGF0ZXBpY2tlckNvbnRlbnQnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyQ29udGVudDxTLCBEID0gRXh0cmFjdERhdGVUeXBlRnJvbVNlbGVjdGlvbjxTPj5cclxuICBleHRlbmRzIF9NYXREYXRlcGlja2VyQ29udGVudEJhc2VcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDYW5Db2xvciB7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICBwcml2YXRlIF9tb2RlbDogTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFMsIEQ+O1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBpbnRlcm5hbCBjYWxlbmRhciBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRDYWxlbmRhcikgX2NhbGVuZGFyOiBNYXRDYWxlbmRhcjxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciB0aGF0IGNyZWF0ZWQgdGhlIG92ZXJsYXkuICovXHJcbiAgZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlckJhc2U8YW55LCBTLCBEPjtcclxuXHJcbiAgLyoqIFN0YXJ0IG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLiAqL1xyXG4gIGNvbXBhcmlzb25TdGFydDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBFbmQgb2YgdGhlIGNvbXBhcmlzb24gcmFuZ2UuICovXHJcbiAgY29tcGFyaXNvbkVuZDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyIGlzIGFib3ZlIG9yIGJlbG93IHRoZSBpbnB1dC4gKi9cclxuICBfaXNBYm92ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbi4gKi9cclxuICBfYW5pbWF0aW9uU3RhdGU6ICdlbnRlci1kcm9wZG93bicgfCAnZW50ZXItZGlhbG9nJyB8ICd2b2lkJztcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYW4gYW5pbWF0aW9uIGhhcyBmaW5pc2hlZC4gKi9cclxuICByZWFkb25seSBfYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBUZXh0IGZvciB0aGUgY2xvc2UgYnV0dG9uLiAqL1xyXG4gIF9jbG9zZUJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNsb3NlIGJ1dHRvbiBjdXJyZW50bHkgaGFzIGZvY3VzLiAqL1xyXG4gIF9jbG9zZUJ1dHRvbkZvY3VzZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBQb3J0YWwgd2l0aCBwcm9qZWN0ZWQgYWN0aW9uIGJ1dHRvbnMuICovXHJcbiAgX2FjdGlvbnNQb3J0YWw6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2dsb2JhbE1vZGVsOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD4sXHJcbiAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfREFURV9SQU5HRV9TRUxFQ1RJT05fU1RSQVRFR1kpXHJcbiAgICBwcml2YXRlIF9yYW5nZVNlbGVjdGlvblN0cmF0ZWd5OiBNYXREYXRlUmFuZ2VTZWxlY3Rpb25TdHJhdGVneTxEPixcclxuICAgIGludGw6IE1hdERhdGVwaWNrZXJJbnRsLFxyXG4gICkge1xyXG4gICAgc3VwZXIoZWxlbWVudFJlZik7XHJcbiAgICB0aGlzLl9jbG9zZUJ1dHRvblRleHQgPSBpbnRsLmNsb3NlQ2FsZW5kYXJMYWJlbDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gSWYgd2UgaGF2ZSBhY3Rpb25zLCBjbG9uZSB0aGUgbW9kZWwgc28gdGhhdCB3ZSBoYXZlIHRoZSBhYmlsaXR5IHRvIGNhbmNlbCB0aGUgc2VsZWN0aW9uLFxyXG4gICAgLy8gb3RoZXJ3aXNlIHVwZGF0ZSB0aGUgZ2xvYmFsIG1vZGVsIGRpcmVjdGx5LiBOb3RlIHRoYXQgd2Ugd2FudCB0byBhc3NpZ24gdGhpcyBhcyBzb29uIGFzXHJcbiAgICAvLyBwb3NzaWJsZSwgYnV0IGBfYWN0aW9uc1BvcnRhbGAgaXNuJ3QgYXZhaWxhYmxlIGluIHRoZSBjb25zdHJ1Y3RvciBzbyB3ZSBkbyBpdCBpbiBgbmdPbkluaXRgLlxyXG4gICAgdGhpcy5fbW9kZWwgPSB0aGlzLl9hY3Rpb25zUG9ydGFsID8gdGhpcy5fZ2xvYmFsTW9kZWwuY2xvbmUoKSA6IHRoaXMuX2dsb2JhbE1vZGVsO1xyXG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSB0aGlzLmRhdGVwaWNrZXIudG91Y2hVaSA/ICdlbnRlci1kaWFsb2cnIDogJ2VudGVyLWRyb3Bkb3duJztcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKFxyXG4gICAgICB0aGlzLmRhdGVwaWNrZXIuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pLFxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9hbmltYXRpb25Eb25lLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBfcXVldWVVc2VyU2VsZWN0aW9uKGRhdGU6IEQpIHtcclxuICAgIHRoaXMuX21vZGVsLnF1ZXVlKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZVVzZXJTZWxlY3Rpb24oZXZlbnQ6IE1hdENhbGVuZGFyVXNlckV2ZW50PEQgfCBudWxsPikge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5fbW9kZWwuc2VsZWN0aW9uO1xyXG4gICAgY29uc3QgdmFsdWUgPSBldmVudC52YWx1ZTtcclxuICAgIGNvbnN0IGlzUmFuZ2UgPSBzZWxlY3Rpb24gaW5zdGFuY2VvZiBEYXRlUmFuZ2U7XHJcblxyXG4gICAgLy8gSWYgd2UncmUgc2VsZWN0aW5nIGEgcmFuZ2UgYW5kIHdlIGhhdmUgYSBzZWxlY3Rpb24gc3RyYXRlZ3ksIGFsd2F5cyBwYXNzIHRoZSB2YWx1ZSB0aHJvdWdoXHJcbiAgICAvLyB0aGVyZS4gT3RoZXJ3aXNlIGRvbid0IGFzc2lnbiBudWxsIHZhbHVlcyB0byB0aGUgbW9kZWwsIHVubGVzcyB3ZSdyZSBzZWxlY3RpbmcgYSByYW5nZS5cclxuICAgIC8vIEEgbnVsbCB2YWx1ZSB3aGVuIHBpY2tpbmcgYSByYW5nZSBtZWFucyB0aGF0IHRoZSB1c2VyIGNhbmNlbGxlZCB0aGUgc2VsZWN0aW9uIChlLmcuIGJ5XHJcbiAgICAvLyBwcmVzc2luZyBlc2NhcGUpLCB3aGVyZWFzIHdoZW4gc2VsZWN0aW5nIGEgc2luZ2xlIHZhbHVlIGl0IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGRpZG4ndFxyXG4gICAgLy8gY2hhbmdlLiBUaGlzIGlzbid0IHZlcnkgaW50dWl0aXZlLCBidXQgaXQncyBoZXJlIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cclxuICAgIGlmIChpc1JhbmdlICYmIHRoaXMuX3JhbmdlU2VsZWN0aW9uU3RyYXRlZ3kpIHtcclxuICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gdGhpcy5fcmFuZ2VTZWxlY3Rpb25TdHJhdGVneS5zZWxlY3Rpb25GaW5pc2hlZChcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBzZWxlY3Rpb24gYXMgdW5rbm93biBhcyBEYXRlUmFuZ2U8RD4sXHJcbiAgICAgICAgZXZlbnQuZXZlbnQsXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZVNlbGVjdGlvbihuZXdTZWxlY3Rpb24gYXMgdW5rbm93biBhcyBTLCB0aGlzKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHZhbHVlICYmXHJcbiAgICAgIChpc1JhbmdlIHx8ICF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZSh2YWx1ZSwgc2VsZWN0aW9uIGFzIHVua25vd24gYXMgRCwgdGhpcy5fY2FsZW5kYXIuZ2V0VW5pdCgpKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9tb2RlbC5hZGQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlbGVnYXRlIGNsb3NpbmcgdGhlIG92ZXJsYXkgdG8gdGhlIGFjdGlvbnMuXHJcbiAgICBpZiAoKCF0aGlzLl9tb2RlbCB8fCB0aGlzLl9tb2RlbC5pc0NvbXBsZXRlKCkpICYmICF0aGlzLl9hY3Rpb25zUG9ydGFsKSB7XHJcbiAgICAgIHRoaXMuZGF0ZXBpY2tlci5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N0YXJ0RXhpdEFuaW1hdGlvbigpIHtcclxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBfZ2V0U2VsZWN0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuc2VsZWN0aW9uIGFzIHVua25vd24gYXMgRCB8IERhdGVSYW5nZTxEPiB8IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQXBwbGllcyB0aGUgY3VycmVudCBwZW5kaW5nIHNlbGVjdGlvbiB0byB0aGUgZ2xvYmFsIG1vZGVsLiAqL1xyXG4gIF9hcHBseVBlbmRpbmdTZWxlY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9tb2RlbC5wcm9jZXNzUXVldWUoKTtcclxuICAgIGlmICh0aGlzLl9tb2RlbCAhPT0gdGhpcy5fZ2xvYmFsTW9kZWwpIHtcclxuICAgICAgdGhpcy5fZ2xvYmFsTW9kZWwudXBkYXRlU2VsZWN0aW9uKHRoaXMuX21vZGVsLnNlbGVjdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogRm9ybSBjb250cm9sIHRoYXQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBhIGRhdGVwaWNrZXIuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0RGF0ZXBpY2tlckNvbnRyb2w8RD4ge1xyXG4gIHR5cGU6IE1hdENhbGVuZGFyVHlwZTtcclxuICBnZXRTdGFydFZhbHVlKCk6IEQgfCBudWxsO1xyXG4gIGdldFRoZW1lUGFsZXR0ZSgpOiBUaGVtZVBhbGV0dGU7XHJcbiAgbWluOiBEIHwgbnVsbDtcclxuICBtYXg6IEQgfCBudWxsO1xyXG4gIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIGRhdGVGaWx0ZXI6IERhdGVGaWx0ZXJGbjxEPjtcclxuICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWY7XHJcbiAgZ2V0T3ZlcmxheUxhYmVsSWQoKTogc3RyaW5nIHwgbnVsbDtcclxuICBzdGF0ZUNoYW5nZXM6IE9ic2VydmFibGU8dm9pZD47XHJcbn1cclxuXHJcbi8qKiBBIGRhdGVwaWNrZXIgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG8gYSB7QGxpbmsgTWF0RGF0ZXBpY2tlckNvbnRyb2x9LiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1hdERhdGVwaWNrZXJQYW5lbDxcclxuICBDIGV4dGVuZHMgTWF0RGF0ZXBpY2tlckNvbnRyb2w8RD4sXHJcbiAgUyxcclxuICBEID0gRXh0cmFjdERhdGVUeXBlRnJvbVNlbGVjdGlvbjxTPixcclxuICA+IHtcclxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGRhdGUgcGlja2VyIGlzIGNsb3NlZC4gKi9cclxuICBjbG9zZWRTdHJlYW06IEV2ZW50RW1pdHRlcjx2b2lkPjtcclxuICAvKiogVGhlIHR5cGUgb2YgdmFsdWUgaGFuZGxlZCBieSB0aGUgY2FsZW5kYXIuICovXHJcbiAgdHlwZTogTWF0Q2FsZW5kYXJUeXBlO1xyXG4gIC8qKiBDb2xvciBwYWxldHRlIHRvIHVzZSBvbiB0aGUgZGF0ZXBpY2tlcidzIGNhbGVuZGFyLiAqL1xyXG4gIGNvbG9yOiBUaGVtZVBhbGV0dGU7XHJcbiAgLyoqIFRoZSBpbnB1dCBlbGVtZW50IHRoZSBkYXRlcGlja2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cclxuICBkYXRlcGlja2VySW5wdXQ6IEM7XHJcbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wLXVwIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cclxuICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAvKiogVGhlIGlkIGZvciB0aGUgZGF0ZXBpY2tlcidzIGNhbGVuZGFyLiAqL1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgaXMgb3Blbi4gKi9cclxuICBvcGVuZWQ6IGJvb2xlYW47XHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBkYXRlIHBpY2tlciBpcyBvcGVuZWQuICovXHJcbiAgb3BlbmVkU3RyZWFtOiBFdmVudEVtaXR0ZXI8dm9pZD47XHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIncyBzdGF0ZSBjaGFuZ2VzLiAqL1xyXG4gIHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPjtcclxuICAvKiogT3BlbnMgdGhlIGRhdGVwaWNrZXIuICovXHJcbiAgb3BlbigpOiB2b2lkO1xyXG4gIC8qKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlcGlja2VyLiAqL1xyXG4gIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IEMpOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD47XHJcbn1cclxuXHJcbi8qKiBCYXNlIGNsYXNzIGZvciBhIGRhdGVwaWNrZXIuICovXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0RGF0ZXBpY2tlckJhc2U8XHJcbiAgQyBleHRlbmRzIE1hdERhdGVwaWNrZXJDb250cm9sPEQ+LFxyXG4gIFMsXHJcbiAgRCA9IEV4dHJhY3REYXRlVHlwZUZyb21TZWxlY3Rpb248Uz4sXHJcbiAgPiBpbXBsZW1lbnRzIE1hdERhdGVwaWNrZXJQYW5lbDxDLCBTLCBEPiwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcclxuICBwcml2YXRlIF9pbnB1dFN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGN1c3RvbSBoZWFkZXIgY29tcG9uZW50IGZvciB0aGUgY2FsZW5kYXIsIGlmIHNldC4gKi9cclxuICBASW5wdXQoKSBjYWxlbmRhckhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xyXG5cclxuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGwge1xyXG4gICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XHJcbiAgICAvLyBzZWxlY3RlZCB2YWx1ZSBpcy5cclxuICAgIHJldHVybiB0aGlzLl9zdGFydEF0IHx8ICh0aGlzLmRhdGVwaWNrZXJJbnB1dCA/IHRoaXMuZGF0ZXBpY2tlcklucHV0LmdldFN0YXJ0VmFsdWUoKSA6IG51bGwpO1xyXG4gIH1cclxuICBzZXQgc3RhcnRBdCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgdHlwZSBvZiB2YWx1ZSBoYW5kbGVkIGJ5IHRoZSBjYWxlbmRhci4gKi9cclxuICBASW5wdXQoKSB0eXBlOiBNYXRDYWxlbmRhclR5cGUgPSAnZGF0ZSc7XHJcblxyXG4gIC8qKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uICovXHJcbiAgQElucHV0KCkgc3RhcnRWaWV3OiBNYXRDYWxlbmRhclZpZXcgPSAnbW9udGgnO1xyXG5cclxuICAvKiogbXVsdGkteWVhciBpbnB1dHMgKi9cclxuICBASW5wdXQoKSB5ZWFyc1BlclBhZ2UgPSAyNDtcclxuXHJcbiAgQElucHV0KCkgeWVhcnNQZXJSb3cgPSA0O1xyXG5cclxuICAvKiogQ2xvY2sgaW50ZXJ2YWwgKi9cclxuICBASW5wdXQoKSBjbG9ja1N0ZXAgPSAxO1xyXG5cclxuICAvKiogQ2xvY2sgaG91ciBmb3JtYXQgKi9cclxuICBASW5wdXQoKSB0d2VsdmVIb3VyID0gdHJ1ZTtcclxuXHJcbiAgLyoqIENvbG9yIHBhbGV0dGUgdG8gdXNlIG9uIHRoZSBkYXRlcGlja2VyJ3MgY2FsZW5kYXIuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX2NvbG9yIHx8ICh0aGlzLmRhdGVwaWNrZXJJbnB1dCA/IHRoaXMuZGF0ZXBpY2tlcklucHV0LmdldFRoZW1lUGFsZXR0ZSgpIDogdW5kZWZpbmVkKVxyXG4gICAgKTtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIF9jb2xvcjogVGhlbWVQYWxldHRlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBVSSBpcyBpbiB0b3VjaCBtb2RlLiBJbiB0b3VjaCBtb2RlIHRoZSBjYWxlbmRhciBvcGVucyBpbiBhIGRpYWxvZyByYXRoZXJcclxuICAgKiB0aGFuIGEgZHJvcGRvd24gYW5kIGVsZW1lbnRzIGhhdmUgbW9yZSBwYWRkaW5nIHRvIGFsbG93IGZvciBiaWdnZXIgdG91Y2ggdGFyZ2V0cy5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCB0b3VjaFVpKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoVWk7XHJcbiAgfVxyXG4gIHNldCB0b3VjaFVpKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl90b3VjaFVpID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfdG91Y2hVaSA9IGZhbHNlO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlciBwb3AtdXAgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXRcclxuICAgICAgPyB0aGlzLmRhdGVwaWNrZXJJbnB1dC5kaXNhYmxlZFxyXG4gICAgICA6ICEhdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFByZWZlcnJlZCBwb3NpdGlvbiBvZiB0aGUgZGF0ZXBpY2tlciBpbiB0aGUgWCBheGlzLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgeFBvc2l0aW9uOiBEYXRlcGlja2VyRHJvcGRvd25Qb3NpdGlvblggPSAnc3RhcnQnO1xyXG5cclxuICAvKiogUHJlZmVycmVkIHBvc2l0aW9uIG9mIHRoZSBkYXRlcGlja2VyIGluIHRoZSBZIGF4aXMuICovXHJcbiAgQElucHV0KClcclxuICB5UG9zaXRpb246IERhdGVwaWNrZXJEcm9wZG93blBvc2l0aW9uWSA9ICdiZWxvdyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gcmVzdG9yZSBmb2N1cyB0byB0aGUgcHJldmlvdXNseS1mb2N1c2VkIGVsZW1lbnQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxyXG4gICAqIE5vdGUgdGhhdCBhdXRvbWF0aWMgZm9jdXMgcmVzdG9yYXRpb24gaXMgYW4gYWNjZXNzaWJpbGl0eSBmZWF0dXJlIGFuZCBpdCBpcyByZWNvbW1lbmRlZCB0aGF0XHJcbiAgICogeW91IHByb3ZpZGUgeW91ciBvd24gZXF1aXZhbGVudCwgaWYgeW91IGRlY2lkZSB0byB0dXJuIGl0IG9mZi5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCByZXN0b3JlRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdG9yZUZvY3VzO1xyXG4gIH1cclxuICBzZXQgcmVzdG9yZUZvY3VzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZXN0b3JlRm9jdXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9yZXN0b3JlRm9jdXMgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBzZWxlY3RlZCB5ZWFyIGluIG11bHRpeWVhciB2aWV3LlxyXG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldy5cclxuICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbiB0aGUgY3VycmVudCB2aWV3IGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZpZXdDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TWF0Q2FsZW5kYXJWaWV3PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2FsZW5kYXJWaWV3PihcclxuICAgIHRydWUsXHJcbiAgKTtcclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGN1c3RvbSBDU1MgY2xhc3NlcyB0byBkYXRlcy4gKi9cclxuICBASW5wdXQoKSBkYXRlQ2xhc3M6IE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD47XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGhhcyBiZWVuIG9wZW5lZC4gKi9cclxuICBAT3V0cHV0KCdvcGVuZWQnKSByZWFkb25seSBvcGVuZWRTdHJlYW0gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGhhcyBiZWVuIGNsb3NlZC4gKi9cclxuICBAT3V0cHV0KCdjbG9zZWQnKSByZWFkb25seSBjbG9zZWRTdHJlYW0gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBkYXRlIHBpY2tlciBwYW5lbC5cclxuICAgKiBTdXBwb3J0cyBzdHJpbmcgYW5kIHN0cmluZyBhcnJheSB2YWx1ZXMsIHNpbWlsYXIgdG8gYG5nQ2xhc3NgLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHBhbmVsQ2xhc3MoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhbmVsQ2xhc3M7XHJcbiAgfVxyXG4gIHNldCBwYW5lbENsYXNzKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5fcGFuZWxDbGFzcyA9IGNvZXJjZVN0cmluZ0FycmF5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGFuZWxDbGFzczogc3RyaW5nW107XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XHJcbiAgfVxyXG4gIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSkgPyB0aGlzLm9wZW4oKSA6IHRoaXMuY2xvc2UoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gIC8qKiBUaGUgaWQgZm9yIHRoZSBkYXRlcGlja2VyIGNhbGVuZGFyLiAqL1xyXG4gIGlkOiBzdHJpbmcgPSBgbWF0LWRhdGVwaWNrZXItJHtkYXRlcGlja2VyVWlkKyt9YDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBfZ2V0TWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWluO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBfZ2V0TWF4RGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWF4O1xyXG4gIH1cclxuXHJcbiAgX2dldERhdGVGaWx0ZXIoKTogRGF0ZUZpbHRlckZuPEQ+IHtcclxuICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLmRhdGVwaWNrZXJJbnB1dC5kYXRlRmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IGludG8gd2hpY2ggd2UndmUgcmVuZGVyZWQgdGhlIGNhbGVuZGFyLiAqL1xyXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgcmVuZGVyZWQgaW4gdGhlIG92ZXJsYXkuICovXHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TWF0RGF0ZXBpY2tlckNvbnRlbnQ8UywgRD4+IHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBkYXRlcGlja2VyIHdhcyBvcGVuZWQuICovXHJcbiAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKiogVW5pcXVlIGNsYXNzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3Agc28gdGhhdCB0aGUgdGVzdCBoYXJuZXNzZXMgY2FuIGxvb2sgaXQgdXAuICovXHJcbiAgcHJpdmF0ZSBfYmFja2Ryb3BIYXJuZXNzQ2xhc3MgPSBgJHt0aGlzLmlkfS1iYWNrZHJvcGA7XHJcblxyXG4gIC8qKiBDdXJyZW50bHktcmVnaXN0ZXJlZCBhY3Rpb25zIHBvcnRhbC4gKi9cclxuICBwcml2YXRlIF9hY3Rpb25zUG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgaW5wdXQgZWxlbWVudCB0aGlzIGRhdGVwaWNrZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xyXG4gIGRhdGVwaWNrZXJJbnB1dDogQztcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIncyBzdGF0ZSBjaGFuZ2VzLiAqL1xyXG4gIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcclxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIEBJbmplY3QoTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcclxuICAgIHByaXZhdGUgX21vZGVsOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD4sXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyICYmIGlzRGV2TW9kZSgpKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbkNoYW5nZSA9IGNoYW5nZXNbJ3hQb3NpdGlvbiddIHx8IGNoYW5nZXNbJ3lQb3NpdGlvbiddO1xyXG5cclxuICAgIGlmIChwb3NpdGlvbkNoYW5nZSAmJiAhcG9zaXRpb25DaGFuZ2UuZmlyc3RDaGFuZ2UgJiYgdGhpcy5fb3ZlcmxheVJlZikge1xyXG4gICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5O1xyXG5cclxuICAgICAgaWYgKHBvc2l0aW9uU3RyYXRlZ3kgaW5zdGFuY2VvZiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpIHtcclxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0ZWRQb3NpdGlvbnMocG9zaXRpb25TdHJhdGVneSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wZW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRhdGVwaWNrZXJJbnB1dCAhPSBudWxsICYmIHRoaXMuZGF0ZXBpY2tlcklucHV0LnR5cGUgIT09IHRoaXMudHlwZSkge1xyXG4gICAgICB0aGlzLmRhdGVwaWNrZXJJbnB1dC50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGVzdHJveU92ZXJsYXkoKTtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX2lucHV0U3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGUgKi9cclxuICBzZWxlY3QoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbW9kZWwuYWRkKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyIGluIG11bHRpeWVhciB2aWV3ICovXHJcbiAgX3NlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldyAqL1xyXG4gIF9zZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdHMgY2hhbmdlZCB2aWV3ICovXHJcbiAgX3ZpZXdDaGFuZ2VkKHZpZXc6IE1hdENhbGVuZGFyVmlldyk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3Q2hhbmdlZC5lbWl0KHZpZXcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIGRhdGVwaWNrZXIuXHJcbiAgICogQHBhcmFtIGlucHV0IFRoZSBkYXRlcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyBkYXRlcGlja2VyLlxyXG4gICAqIEByZXR1cm5zIFNlbGVjdGlvbiBtb2RlbCB0aGF0IHRoZSBpbnB1dCBzaG91bGQgaG9vayBpdHNlbGYgdXAgdG8uXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJJbnB1dChpbnB1dDogQyk6IE1hdERhdGVTZWxlY3Rpb25Nb2RlbDxTLCBEPiB7XHJcbiAgICBpZiAodGhpcy5kYXRlcGlja2VySW5wdXQgJiYgaXNEZXZNb2RlKCkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0EgTWF0RGF0ZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbnB1dFN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5kYXRlcGlja2VySW5wdXQgPSBpbnB1dDtcclxuICAgIHRoaXMuZGF0ZXBpY2tlcklucHV0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICB0aGlzLl9pbnB1dFN0YXRlQ2hhbmdlcyA9IGlucHV0LnN0YXRlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCh1bmRlZmluZWQpKTtcclxuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyBhIHBvcnRhbCBjb250YWluaW5nIGFjdGlvbiBidXR0b25zIHdpdGggdGhlIGRhdGVwaWNrZXIuXHJcbiAgICogQHBhcmFtIHBvcnRhbCBQb3J0YWwgdG8gYmUgcmVnaXN0ZXJlZC5cclxuICAgKi9cclxuICByZWdpc3RlckFjdGlvbnMocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2FjdGlvbnNQb3J0YWwgJiYgaXNEZXZNb2RlKCkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0EgTWF0RGF0ZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgYWN0aW9ucyByb3cuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY3Rpb25zUG9ydGFsID0gcG9ydGFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhIHBvcnRhbCBjb250YWluaW5nIGFjdGlvbiBidXR0b25zIGZyb20gdGhlIGRhdGVwaWNrZXIuXHJcbiAgICogQHBhcmFtIHBvcnRhbCBQb3J0YWwgdG8gYmUgcmVtb3ZlZC5cclxuICAgKi9cclxuICByZW1vdmVBY3Rpb25zKHBvcnRhbDogVGVtcGxhdGVQb3J0YWwpOiB2b2lkIHtcclxuICAgIGlmIChwb3J0YWwgPT09IHRoaXMuX2FjdGlvbnNQb3J0YWwpIHtcclxuICAgICAgdGhpcy5fYWN0aW9uc1BvcnRhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogT3BlbiB0aGUgY2FsZW5kYXIuICovXHJcbiAgb3BlbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiBpc0Rldk1vZGUoKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGVkIHRvIG9wZW4gYW4gTWF0RGF0ZXBpY2tlciB3aXRoIG5vIGFzc29jaWF0ZWQgaW5wdXQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gX2dldEZvY3VzZWRFbGVtZW50UGllcmNlU2hhZG93RG9tKCk7XHJcbiAgICB0aGlzLl9vcGVuT3ZlcmxheSgpO1xyXG4gICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcclxuICAgIHRoaXMub3BlbmVkU3RyZWFtLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBDbG9zZSB0aGUgY2FsZW5kYXIuICovXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX29wZW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgaW5zdGFuY2UuX3N0YXJ0RXhpdEFuaW1hdGlvbigpO1xyXG4gICAgICBpbnN0YW5jZS5fYW5pbWF0aW9uRG9uZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9kZXN0cm95T3ZlcmxheSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAvLyBUaGUgYF9vcGVuZWRgIGNvdWxkJ3ZlIGJlZW4gcmVzZXQgYWxyZWFkeSBpZlxyXG4gICAgICAvLyB3ZSBnb3QgdHdvIGV2ZW50cyBpbiBxdWljayBzdWNjZXNzaW9uLlxyXG4gICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbG9zZWRTdHJlYW0uZW1pdCgpO1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLl9yZXN0b3JlRm9jdXMgJiZcclxuICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuICYmXHJcbiAgICAgIHR5cGVvZiB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMgPT09ICdmdW5jdGlvbidcclxuICAgICkge1xyXG4gICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcclxuICAgICAgLy8gbWFya2VkIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZC4gSWYgdGhlIGV2ZW50IGZpcmVzIG91dCBvZiBzZXF1ZW5jZSBhbmQgdGhlIGVsZW1lbnQgdGhhdFxyXG4gICAgICAvLyB3ZSdyZSByZWZvY3VzaW5nIG9wZW5zIHRoZSBkYXRlcGlja2VyIG9uIGZvY3VzLCB0aGUgdXNlciBjb3VsZCBiZSBzdHVjayB3aXRoIG5vdCBiZWluZ1xyXG4gICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcclxuICAgICAgLy8gdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLCBhc3luYyBhcyB3ZWxsLlxyXG4gICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMoKTtcclxuICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbXBsZXRlQ2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBBcHBsaWVzIHRoZSBjdXJyZW50IHBlbmRpbmcgc2VsZWN0aW9uIG9uIHRoZSBvdmVybGF5IHRvIHRoZSBtb2RlbC4gKi9cclxuICBfYXBwbHlQZW5kaW5nU2VsZWN0aW9uKCkge1xyXG4gICAgdGhpcy5fY29tcG9uZW50UmVmPy5pbnN0YW5jZT8uX2FwcGx5UGVuZGluZ1NlbGVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZvcndhcmRzIHJlbGV2YW50IHZhbHVlcyBmcm9tIHRoZSBkYXRlcGlja2VyIHRvIHRoZSBkYXRlcGlja2VyIGNvbnRlbnQgaW5zaWRlIHRoZSBvdmVybGF5LiAqL1xyXG4gIHByb3RlY3RlZCBfZm9yd2FyZENvbnRlbnRWYWx1ZXMoaW5zdGFuY2U6IE1hdERhdGVwaWNrZXJDb250ZW50PFMsIEQ+KSB7XHJcbiAgICBpbnN0YW5jZS5kYXRlcGlja2VyID0gdGhpcztcclxuICAgIGluc3RhbmNlLmNvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgIGluc3RhbmNlLl9hY3Rpb25zUG9ydGFsID0gdGhpcy5fYWN0aW9uc1BvcnRhbDtcclxuICB9XHJcblxyXG4gIC8qKiBPcGVucyB0aGUgb3ZlcmxheSB3aXRoIHRoZSBjYWxlbmRhci4gKi9cclxuICBwcml2YXRlIF9vcGVuT3ZlcmxheSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rlc3Ryb3lPdmVybGF5KCk7XHJcblxyXG4gICAgY29uc3QgaXNEaWFsb2cgPSB0aGlzLnRvdWNoVWk7XHJcbiAgICBjb25zdCBsYWJlbElkID0gdGhpcy5kYXRlcGlja2VySW5wdXQuZ2V0T3ZlcmxheUxhYmVsSWQoKTtcclxuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8TWF0RGF0ZXBpY2tlckNvbnRlbnQ8UywgRD4+KFxyXG4gICAgICBNYXREYXRlcGlja2VyQ29udGVudCxcclxuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZixcclxuICAgICk7XHJcbiAgICBjb25zdCBvdmVybGF5UmVmID0gKHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShcclxuICAgICAgbmV3IE92ZXJsYXlDb25maWcoe1xyXG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IGlzRGlhbG9nID8gdGhpcy5fZ2V0RGlhbG9nU3RyYXRlZ3koKSA6IHRoaXMuX2dldERyb3Bkb3duU3RyYXRlZ3koKSxcclxuICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcclxuICAgICAgICBiYWNrZHJvcENsYXNzOiBbXHJcbiAgICAgICAgICBpc0RpYWxvZyA/ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyA6ICdtYXQtb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXHJcbiAgICAgICAgICB0aGlzLl9iYWNrZHJvcEhhcm5lc3NDbGFzcyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyLFxyXG4gICAgICAgIHNjcm9sbFN0cmF0ZWd5OiBpc0RpYWxvZyA/IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpIDogdGhpcy5fc2Nyb2xsU3RyYXRlZ3koKSxcclxuICAgICAgICBwYW5lbENsYXNzOiBgbWF0LWRhdGVwaWNrZXItJHtpc0RpYWxvZyA/ICdkaWFsb2cnIDogJ3BvcHVwJ31gLFxyXG4gICAgICB9KSxcclxuICAgICkpO1xyXG4gICAgY29uc3Qgb3ZlcmxheUVsZW1lbnQgPSBvdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50O1xyXG4gICAgb3ZlcmxheUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xyXG5cclxuICAgIGlmIChsYWJlbElkKSB7XHJcbiAgICAgIG92ZXJsYXlFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgbGFiZWxJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzRGlhbG9nKSB7XHJcbiAgICAgIG92ZXJsYXlFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZ2V0Q2xvc2VTdHJlYW0ob3ZlcmxheVJlZikuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBvdmVybGF5UmVmLmF0dGFjaChwb3J0YWwpO1xyXG4gICAgdGhpcy5fZm9yd2FyZENvbnRlbnRWYWx1ZXModGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC4gT25seSByZWxldmFudCBpbiBkcm9wZG93biBtb2RlLlxyXG4gICAgaWYgKCFpc0RpYWxvZykge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4gb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBEZXN0cm95cyB0aGUgY3VycmVudCBvdmVybGF5LiAqL1xyXG4gIHByaXZhdGUgX2Rlc3Ryb3lPdmVybGF5KCkge1xyXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcclxuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9jb21wb25lbnRSZWYgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgYSBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IHdpbGwgb3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBkcm9wZG93bi4gKi9cclxuICBwcml2YXRlIF9nZXREaWFsb2dTdHJhdGVneSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCkuY2VudGVySG9yaXpvbnRhbGx5KCkuY2VudGVyVmVydGljYWxseSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgYSBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IHdpbGwgb3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBkcm9wZG93bi4gKi9cclxuICBwcml2YXRlIF9nZXREcm9wZG93blN0cmF0ZWd5KCkge1xyXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5XHJcbiAgICAgIC5wb3NpdGlvbigpXHJcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZGF0ZXBpY2tlcklucHV0LmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKSlcclxuICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQnKVxyXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcclxuICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbig4KVxyXG4gICAgICAud2l0aExvY2tlZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3NldENvbm5lY3RlZFBvc2l0aW9ucyhzdHJhdGVneSk7XHJcbiAgfVxyXG5cclxuICAvKiogU2V0cyB0aGUgcG9zaXRpb25zIG9mIHRoZSBkYXRlcGlja2VyIGluIGRyb3Bkb3duIG1vZGUgYmFzZWQgb24gdGhlIGN1cnJlbnQgY29uZmlndXJhdGlvbi4gKi9cclxuICBwcml2YXRlIF9zZXRDb25uZWN0ZWRQb3NpdGlvbnMoc3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSkge1xyXG4gICAgY29uc3QgcHJpbWFyeVggPSB0aGlzLnhQb3NpdGlvbiA9PT0gJ2VuZCcgPyAnZW5kJyA6ICdzdGFydCc7XHJcbiAgICBjb25zdCBzZWNvbmRhcnlYID0gcHJpbWFyeVggPT09ICdzdGFydCcgPyAnZW5kJyA6ICdzdGFydCc7XHJcbiAgICBjb25zdCBwcmltYXJ5WSA9IHRoaXMueVBvc2l0aW9uID09PSAnYWJvdmUnID8gJ2JvdHRvbScgOiAndG9wJztcclxuICAgIGNvbnN0IHNlY29uZGFyeVkgPSBwcmltYXJ5WSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xyXG5cclxuICAgIHJldHVybiBzdHJhdGVneS53aXRoUG9zaXRpb25zKFtcclxuICAgICAge1xyXG4gICAgICAgIG9yaWdpblg6IHByaW1hcnlYLFxyXG4gICAgICAgIG9yaWdpblk6IHNlY29uZGFyeVksXHJcbiAgICAgICAgb3ZlcmxheVg6IHByaW1hcnlYLFxyXG4gICAgICAgIG92ZXJsYXlZOiBwcmltYXJ5WSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9yaWdpblg6IHByaW1hcnlYLFxyXG4gICAgICAgIG9yaWdpblk6IHByaW1hcnlZLFxyXG4gICAgICAgIG92ZXJsYXlYOiBwcmltYXJ5WCxcclxuICAgICAgICBvdmVybGF5WTogc2Vjb25kYXJ5WSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9yaWdpblg6IHNlY29uZGFyeVgsXHJcbiAgICAgICAgb3JpZ2luWTogc2Vjb25kYXJ5WSxcclxuICAgICAgICBvdmVybGF5WDogc2Vjb25kYXJ5WCxcclxuICAgICAgICBvdmVybGF5WTogcHJpbWFyeVksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvcmlnaW5YOiBzZWNvbmRhcnlYLFxyXG4gICAgICAgIG9yaWdpblk6IHByaW1hcnlZLFxyXG4gICAgICAgIG92ZXJsYXlYOiBzZWNvbmRhcnlYLFxyXG4gICAgICAgIG92ZXJsYXlZOiBzZWNvbmRhcnlZLFxyXG4gICAgICB9LFxyXG4gICAgXSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgd2lsbCBlbWl0IHdoZW4gdGhlIG92ZXJsYXkgaXMgc3VwcG9zZWQgdG8gYmUgY2xvc2VkLiAqL1xyXG4gIHByaXZhdGUgX2dldENsb3NlU3RyZWFtKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHtcclxuICAgIHJldHVybiBtZXJnZShcclxuICAgICAgb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCksXHJcbiAgICAgIG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKSxcclxuICAgICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkucGlwZShcclxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgLy8gQ2xvc2luZyBvbiBhbHQgKyB1cCBpcyBvbmx5IHZhbGlkIHdoZW4gdGhlcmUncyBhbiBpbnB1dCBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGVwaWNrZXIuXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICFoYXNNb2RpZmllcktleShldmVudCkpIHx8XHJcbiAgICAgICAgICAgICh0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiBoYXNNb2RpZmllcktleShldmVudCwgJ2FsdEtleScpICYmIGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3BlbmVkOiBCb29sZWFuSW5wdXQ7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RvdWNoVWk6IEJvb2xlYW5JbnB1dDtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVzdG9yZUZvY3VzOiBCb29sZWFuSW5wdXQ7XHJcbn1cclxuIiwiPGRpdlxyXG4gIGNka1RyYXBGb2N1c1xyXG4gIGNsYXNzPVwibWF0LWRhdGVwaWNrZXItY29udGVudC1jb250YWluZXJcIlxyXG4gIFtjbGFzcy5tYXQtZGF0ZXBpY2tlci1jb250ZW50LWNvbnRhaW5lci13aXRoLWFjdGlvbnNdPVwiX2FjdGlvbnNQb3J0YWxcIj5cclxuICA8bWF0LWNhbGVuZGFyXHJcbiAgICBbaWRdPVwiZGF0ZXBpY2tlci5pZFwiXHJcbiAgICBbbmdDbGFzc109XCJkYXRlcGlja2VyLnBhbmVsQ2xhc3NcIlxyXG4gICAgW3R5cGVdPVwiZGF0ZXBpY2tlci50eXBlXCJcclxuICAgIFtzdGFydEF0XT1cImRhdGVwaWNrZXIuc3RhcnRBdFwiXHJcbiAgICBbc3RhcnRWaWV3XT1cImRhdGVwaWNrZXIuc3RhcnRWaWV3XCJcclxuICAgIFt5ZWFyc1BlclBhZ2VdPVwiZGF0ZXBpY2tlci55ZWFyc1BlclBhZ2VcIlxyXG4gICAgW3llYXJzUGVyUm93XT1cImRhdGVwaWNrZXIueWVhcnNQZXJSb3dcIlxyXG4gICAgW2Nsb2NrU3RlcF09XCJkYXRlcGlja2VyLmNsb2NrU3RlcFwiXHJcbiAgICBbdHdlbHZlSG91cl09XCJkYXRlcGlja2VyLnR3ZWx2ZUhvdXJcIlxyXG4gICAgW21pbkRhdGVdPVwiZGF0ZXBpY2tlci5fZ2V0TWluRGF0ZSgpXCJcclxuICAgIFttYXhEYXRlXT1cImRhdGVwaWNrZXIuX2dldE1heERhdGUoKVwiXHJcbiAgICBbZGF0ZUZpbHRlcl09XCJkYXRlcGlja2VyLl9nZXREYXRlRmlsdGVyKClcIlxyXG4gICAgW2hlYWRlckNvbXBvbmVudF09XCJkYXRlcGlja2VyLmNhbGVuZGFySGVhZGVyQ29tcG9uZW50XCJcclxuICAgIFtzZWxlY3RlZF09XCJfZ2V0U2VsZWN0ZWQoKVwiXHJcbiAgICBbZGF0ZUNsYXNzXT1cImRhdGVwaWNrZXIuZGF0ZUNsYXNzXCJcclxuICAgIFtjb21wYXJpc29uU3RhcnRdPVwiY29tcGFyaXNvblN0YXJ0XCJcclxuICAgIFtjb21wYXJpc29uRW5kXT1cImNvbXBhcmlzb25FbmRcIlxyXG4gICAgW0BmYWRlSW5DYWxlbmRhcl09XCInZW50ZXInXCJcclxuICAgICh5ZWFyU2VsZWN0ZWQpPVwiZGF0ZXBpY2tlci5fc2VsZWN0WWVhcigkZXZlbnQpXCJcclxuICAgIChtb250aFNlbGVjdGVkKT1cImRhdGVwaWNrZXIuX3NlbGVjdE1vbnRoKCRldmVudClcIlxyXG4gICAgKHZpZXdDaGFuZ2VkKT1cImRhdGVwaWNrZXIuX3ZpZXdDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgKGRhdGVDaGFuZ2VkKT1cIl9xdWV1ZVVzZXJTZWxlY3Rpb24oJGV2ZW50KVwiXHJcbiAgICAoX3VzZXJTZWxlY3Rpb24pPVwiX2hhbmRsZVVzZXJTZWxlY3Rpb24oJGV2ZW50KVwiPjwvbWF0LWNhbGVuZGFyPlxyXG5cclxuICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJfYWN0aW9uc1BvcnRhbFwiPjwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDwhLS0gSW52aXNpYmxlIGNsb3NlIGJ1dHRvbiBmb3Igc2NyZWVuIHJlYWRlciB1c2Vycy4gLS0+XHJcbiAgPGJ1dHRvblxyXG4gICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICBtYXQtcmFpc2VkLWJ1dHRvblxyXG4gICAgW2NvbG9yXT1cImNvbG9yIHx8ICdwcmltYXJ5J1wiXHJcbiAgICBjbGFzcz1cIm1hdC1kYXRlcGlja2VyLWNsb3NlLWJ1dHRvblwiXHJcbiAgICBbY2xhc3MuY2RrLXZpc3VhbGx5LWhpZGRlbl09XCIhX2Nsb3NlQnV0dG9uRm9jdXNlZFwiXHJcbiAgICAoZm9jdXMpPVwiX2Nsb3NlQnV0dG9uRm9jdXNlZCA9IHRydWVcIlxyXG4gICAgKGJsdXIpPVwiX2Nsb3NlQnV0dG9uRm9jdXNlZCA9IGZhbHNlXCJcclxuICAgIChjbGljayk9XCJkYXRlcGlja2VyLmNsb3NlKClcIj57eyBfY2xvc2VCdXR0b25UZXh0IH19PC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=