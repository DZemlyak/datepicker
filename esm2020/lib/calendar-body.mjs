/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, NgZone, } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["mat-calendar-body", ""];
function MatCalendarBody_tr_0_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("padding-top", ctx_r3._cellPadding)("padding-bottom", ctx_r3._cellPadding);
    i0.ɵɵattribute("colspan", ctx_r3._firstRowOffset);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r3._firstRowOffset >= ctx_r3.labelMinRequiredCells ? ctx_r3.label : "", " ");
} }
function MatCalendarBody_tr_0_td_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 5);
    i0.ɵɵlistener("click", function MatCalendarBody_tr_0_td_2_Template_td_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r8); const item_r5 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7._cellClicked(item_r5, $event); });
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const colIndex_r6 = ctx.index;
    const rowIndex_r2 = i0.ɵɵnextContext().index;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", ctx_r4._cellWidth)("padding-top", ctx_r4._cellPadding)("padding-bottom", ctx_r4._cellPadding);
    i0.ɵɵclassProp("mat-calendar-body-disabled", !item_r5.enabled)("mat-calendar-body-active", ctx_r4._isActiveCell(rowIndex_r2, colIndex_r6))("mat-calendar-body-range-start", ctx_r4._isRangeStart(item_r5.compareValue))("mat-calendar-body-range-end", ctx_r4._isRangeEnd(item_r5.compareValue))("mat-calendar-body-in-range", ctx_r4._isInRange(item_r5.compareValue))("mat-calendar-body-comparison-bridge-start", ctx_r4._isComparisonBridgeStart(item_r5.compareValue, rowIndex_r2, colIndex_r6))("mat-calendar-body-comparison-bridge-end", ctx_r4._isComparisonBridgeEnd(item_r5.compareValue, rowIndex_r2, colIndex_r6))("mat-calendar-body-comparison-start", ctx_r4._isComparisonStart(item_r5.compareValue))("mat-calendar-body-comparison-end", ctx_r4._isComparisonEnd(item_r5.compareValue))("mat-calendar-body-in-comparison-range", ctx_r4._isInComparisonRange(item_r5.compareValue))("mat-calendar-body-preview-start", ctx_r4._isPreviewStart(item_r5.compareValue))("mat-calendar-body-preview-end", ctx_r4._isPreviewEnd(item_r5.compareValue))("mat-calendar-body-in-preview", ctx_r4._isInPreview(item_r5.compareValue));
    i0.ɵɵproperty("ngClass", item_r5.cssClasses)("tabindex", ctx_r4._isActiveCell(rowIndex_r2, colIndex_r6) ? 0 : -1);
    i0.ɵɵattribute("data-mat-row", rowIndex_r2)("data-mat-col", colIndex_r6)("aria-label", item_r5.ariaLabel)("aria-disabled", !item_r5.enabled || null)("aria-selected", ctx_r4._isSelected(item_r5.compareValue))("aria-current", ctx_r4.todayValue === item_r5.compareValue ? "date" : null);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("mat-calendar-body-selected", ctx_r4._isSelected(item_r5.compareValue))("mat-calendar-body-comparison-identical", ctx_r4._isComparisonIdentical(item_r5.compareValue))("mat-calendar-body-today", ctx_r4.todayValue === item_r5.compareValue);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r5.displayValue, " ");
} }
function MatCalendarBody_tr_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 1);
    i0.ɵɵtemplate(1, MatCalendarBody_tr_0_td_1_Template, 2, 6, "td", 2);
    i0.ɵɵtemplate(2, MatCalendarBody_tr_0_td_2_Template, 4, 47, "td", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    const rowIndex_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", rowIndex_r2 === 0 && ctx_r0._firstRowOffset);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r1);
} }
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export class MatCalendarCell {
    constructor(value, displayValue, ariaLabel, enabled, cssClasses = {}, compareValue = value, rawValue) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
        this.compareValue = compareValue;
        this.rawValue = rawValue;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
export class MatCalendarBody {
    constructor(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /** The number of columns in the table. */
        this.numCols = 7;
        /** The cell number of the active cell in the table. */
        this.activeCell = 0;
        /** Whether a range is being selected. */
        this.isRange = false;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         */
        this.cellAspectRatio = 1;
        /** Start of the preview range. */
        this.previewStart = null;
        /** End of the preview range. */
        this.previewEnd = null;
        /** Emits when a new value is selected. */
        this.selectedValueChange = new EventEmitter();
        /** Emits when the preview has changed as a result of a user action. */
        this.previewChange = new EventEmitter();
        /**
         * Event handler for when the user enters an element
         * inside the calendar body (e.g. by hovering in or focus).
         */
        this._enterHandler = (event) => {
            if (this._skipNextFocus && event.type === 'focus') {
                this._skipNextFocus = false;
                return;
            }
            // We only need to hit the zone when we're selecting a range.
            if (event.target && this.isRange) {
                const cell = this._getCellFromElement(event.target);
                if (cell) {
                    this._ngZone.run(() => this.previewChange.emit({ value: cell.enabled ? cell : null, event }));
                }
            }
        };
        /**
         * Event handler for when the user's pointer leaves an element
         * inside the calendar body (e.g. by hovering out or blurring).
         */
        this._leaveHandler = (event) => {
            // We only need to hit the zone when we're selecting a range.
            if (this.previewEnd !== null && this.isRange) {
                // Only reset the preview end value when leaving cells. This looks better, because
                // we have a gap between the cells and the rows and we don't want to remove the
                // range just for it to show up again when the user moves a few pixels to the side.
                if (event.target && isTableCell(event.target)) {
                    this._ngZone.run(() => this.previewChange.emit({ value: null, event }));
                }
            }
        };
        _ngZone.runOutsideAngular(() => {
            const element = _elementRef.nativeElement;
            element.addEventListener('mouseenter', this._enterHandler, true);
            element.addEventListener('focus', this._enterHandler, true);
            element.addEventListener('mouseleave', this._leaveHandler, true);
            element.addEventListener('blur', this._leaveHandler, true);
        });
    }
    /** Called when a cell is clicked. */
    _cellClicked(cell, event) {
        if (cell.enabled) {
            this.selectedValueChange.emit({ value: cell.value, event });
        }
    }
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value) {
        return this.startValue === value || this.endValue === value;
    }
    ngOnChanges(changes) {
        const columnChanges = changes['numCols'];
        const { rows, numCols } = this;
        if (changes['rows'] || columnChanges) {
            this._firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
        }
        if (changes['cellAspectRatio'] || columnChanges || !this._cellPadding) {
            this._cellPadding = `${(50 * this.cellAspectRatio) / numCols}%`;
        }
        if (columnChanges || !this._cellWidth) {
            this._cellWidth = `${100 / numCols}%`;
        }
    }
    ngOnDestroy() {
        const element = this._elementRef.nativeElement;
        element.removeEventListener('mouseenter', this._enterHandler, true);
        element.removeEventListener('focus', this._enterHandler, true);
        element.removeEventListener('mouseleave', this._leaveHandler, true);
        element.removeEventListener('blur', this._leaveHandler, true);
    }
    /** Returns whether a cell is active. */
    _isActiveCell(rowIndex, colIndex) {
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber == this.activeCell;
    }
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(movePreview = true) {
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.pipe(take(1)).subscribe(() => {
                const activeCell = this._elementRef.nativeElement.querySelector('.mat-calendar-body-active');
                if (activeCell) {
                    if (!movePreview) {
                        this._skipNextFocus = true;
                    }
                    activeCell.focus();
                }
            });
        });
    }
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value) {
        return isStart(value, this.startValue, this.endValue);
    }
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value) {
        return isEnd(value, this.startValue, this.endValue);
    }
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value) {
        return isInRange(value, this.startValue, this.endValue, this.isRange);
    }
    /** Gets whether a value is the start of the comparison range. */
    _isComparisonStart(value) {
        return isStart(value, this.comparisonStart, this.comparisonEnd);
    }
    /** Whether the cell is a start bridge cell between the main and comparison ranges. */
    _isComparisonBridgeStart(value, rowIndex, colIndex) {
        if (!this._isComparisonStart(value) || this._isRangeStart(value) || !this._isInRange(value)) {
            return false;
        }
        let previousCell = this.rows[rowIndex][colIndex - 1];
        if (!previousCell) {
            const previousRow = this.rows[rowIndex - 1];
            previousCell = previousRow && previousRow[previousRow.length - 1];
        }
        return previousCell && !this._isRangeEnd(previousCell.compareValue);
    }
    /** Whether the cell is an end bridge cell between the main and comparison ranges. */
    _isComparisonBridgeEnd(value, rowIndex, colIndex) {
        if (!this._isComparisonEnd(value) || this._isRangeEnd(value) || !this._isInRange(value)) {
            return false;
        }
        let nextCell = this.rows[rowIndex][colIndex + 1];
        if (!nextCell) {
            const nextRow = this.rows[rowIndex + 1];
            nextCell = nextRow && nextRow[0];
        }
        return nextCell && !this._isRangeStart(nextCell.compareValue);
    }
    /** Gets whether a value is the end of the comparison range. */
    _isComparisonEnd(value) {
        return isEnd(value, this.comparisonStart, this.comparisonEnd);
    }
    /** Gets whether a value is within the current comparison range. */
    _isInComparisonRange(value) {
        return isInRange(value, this.comparisonStart, this.comparisonEnd, this.isRange);
    }
    /**
     * Gets whether a value is the same as the start and end of the comparison range.
     * For context, the functions that we use to determine whether something is the start/end of
     * a range don't allow for the start and end to be on the same day, because we'd have to use
     * much more specific CSS selectors to style them correctly in all scenarios. This is fine for
     * the regular range, because when it happens, the selected styles take over and still show where
     * the range would've been, however we don't have these selected styles for a comparison range.
     * This function is used to apply a class that serves the same purpose as the one for selected
     * dates, but it only applies in the context of a comparison range.
     */
    _isComparisonIdentical(value) {
        // Note that we don't need to null check the start/end
        // here, because the `value` will always be defined.
        return this.comparisonStart === this.comparisonEnd && value === this.comparisonStart;
    }
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value) {
        return isStart(value, this.previewStart, this.previewEnd);
    }
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value) {
        return isEnd(value, this.previewStart, this.previewEnd);
    }
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value) {
        return isInRange(value, this.previewStart, this.previewEnd, this.isRange);
    }
    /** Finds the MatCalendarCell that corresponds to a DOM node. */
    _getCellFromElement(element) {
        let cell;
        if (isTableCell(element)) {
            cell = element;
        }
        else if (isTableCell(element.parentNode)) {
            cell = element.parentNode;
        }
        if (cell) {
            const row = cell.getAttribute('data-mat-row');
            const col = cell.getAttribute('data-mat-col');
            if (row && col) {
                return this.rows[parseInt(row)][parseInt(col)];
            }
        }
        return null;
    }
}
/** @nocollapse */ /** @nocollapse */ MatCalendarBody.ɵfac = function MatCalendarBody_Factory(t) { return new (t || MatCalendarBody)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
/** @nocollapse */ /** @nocollapse */ MatCalendarBody.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatCalendarBody, selectors: [["", "mat-calendar-body", ""]], hostAttrs: [1, "mat-calendar-body"], inputs: { label: "label", rows: "rows", todayValue: "todayValue", startValue: "startValue", endValue: "endValue", labelMinRequiredCells: "labelMinRequiredCells", numCols: "numCols", activeCell: "activeCell", isRange: "isRange", cellAspectRatio: "cellAspectRatio", comparisonStart: "comparisonStart", comparisonEnd: "comparisonEnd", previewStart: "previewStart", previewEnd: "previewEnd" }, outputs: { selectedValueChange: "selectedValueChange", previewChange: "previewChange" }, exportAs: ["matCalendarBody"], features: [i0.ɵɵNgOnChangesFeature], attrs: _c0, decls: 1, vars: 1, consts: [["role", "row", 4, "ngFor", "ngForOf"], ["role", "row"], ["class", "mat-calendar-body-label", 3, "paddingTop", "paddingBottom", 4, "ngIf"], ["role", "gridcell", "class", "mat-calendar-body-cell", 3, "ngClass", "tabindex", "mat-calendar-body-disabled", "mat-calendar-body-active", "mat-calendar-body-range-start", "mat-calendar-body-range-end", "mat-calendar-body-in-range", "mat-calendar-body-comparison-bridge-start", "mat-calendar-body-comparison-bridge-end", "mat-calendar-body-comparison-start", "mat-calendar-body-comparison-end", "mat-calendar-body-in-comparison-range", "mat-calendar-body-preview-start", "mat-calendar-body-preview-end", "mat-calendar-body-in-preview", "width", "paddingTop", "paddingBottom", "click", 4, "ngFor", "ngForOf"], [1, "mat-calendar-body-label"], ["role", "gridcell", 1, "mat-calendar-body-cell", 3, "ngClass", "tabindex", "click"], [1, "mat-calendar-body-cell-content", "mat-focus-indicator"], [1, "mat-calendar-body-cell-preview"]], template: function MatCalendarBody_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MatCalendarBody_tr_0_Template, 3, 2, "tr", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.rows);
    } }, directives: [i1.NgForOf, i1.NgIf, i1.NgClass], styles: [".mat-calendar-body{min-width:224px}.mat-calendar-body-label{height:0;line-height:0;text-align:left;padding-left:4.7142857143%;padding-right:4.7142857143%}.mat-calendar-body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mat-calendar-body-cell:before,.mat-calendar-body-cell:after,.mat-calendar-body-cell-preview{content:\"\";position:absolute;top:5%;left:0;z-index:0;box-sizing:border-box;height:90%;width:100%}.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-start:after,.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,.mat-calendar-body-comparison-start:after,.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:5%;width:95%;border-top-left-radius:999px;border-bottom-left-radius:999px}[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,[dir=rtl] .mat-calendar-body-comparison-start:after,[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:0;border-radius:0 999px 999px 0}.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,.mat-calendar-body-comparison-end:after,.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,[dir=rtl] .mat-calendar-body-comparison-end:after,[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{left:5%;border-radius:999px 0 0 999px}[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start:after{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}.mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end.mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start:after{width:90%}.mat-calendar-body-in-preview .mat-calendar-body-cell-preview{border-top:dashed 1px;border-bottom:dashed 1px}.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:dashed 1px}[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:0;border-right:dashed 1px}.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:dashed 1px}[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:0;border-left:dashed 1px}.mat-calendar-body-disabled{cursor:default}.cdk-high-contrast-active .mat-calendar-body-disabled{opacity:.5}.mat-calendar-body-cell-content{top:5%;left:5%;z-index:1;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid;border-radius:999px}.mat-calendar-body-cell-content.mat-focus-indicator{position:absolute}.cdk-high-contrast-active .mat-calendar-body-cell-content{border:none}.mat-datepicker-dialog .mat-dialog-container{position:relative;overflow:visible}.cdk-high-contrast-active .mat-datepicker-popup:not(:empty),.cdk-high-contrast-active .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected{outline:solid 1px}.cdk-high-contrast-active .mat-calendar-body-today{outline:dotted 1px}.cdk-high-contrast-active .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-high-contrast-active .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){outline:dotted 2px}.cdk-high-contrast-active .mat-calendar-body-cell:before,.cdk-high-contrast-active .mat-calendar-body-cell:after,.cdk-high-contrast-active .mat-calendar-body-selected{background:none}.cdk-high-contrast-active .mat-calendar-body-in-range:before,.cdk-high-contrast-active .mat-calendar-body-comparison-bridge-start:before,.cdk-high-contrast-active .mat-calendar-body-comparison-bridge-end:before{border-top:solid 1px;border-bottom:solid 1px}.cdk-high-contrast-active .mat-calendar-body-range-start:before{border-left:solid 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-range-start:before{border-left:0;border-right:solid 1px}.cdk-high-contrast-active .mat-calendar-body-range-end:before{border-right:solid 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-range-end:before{border-right:0;border-left:solid 1px}.cdk-high-contrast-active .mat-calendar-body-in-comparison-range:before{border-top:dashed 1px;border-bottom:dashed 1px}.cdk-high-contrast-active .mat-calendar-body-comparison-start:before{border-left:dashed 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-comparison-start:before{border-left:0;border-right:dashed 1px}.cdk-high-contrast-active .mat-calendar-body-comparison-end:before{border-right:dashed 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-comparison-end:before{border-right:0;border-left:dashed 1px}[dir=rtl] .mat-calendar-body-label{text-align:right}\n"], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatCalendarBody, [{
        type: Component,
        args: [{ selector: '[mat-calendar-body]', host: {
                    'class': 'mat-calendar-body',
                }, exportAs: 'matCalendarBody', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<!--\r\n  If there's not enough space in the first row, create a separate label row. We mark this row as\r\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\r\n-->\r\n<!--tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\r\n  <td class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"numCols\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n    {{label}}\r\n  </td>\r\n</tr-->\r\n\r\n<!-- Create the first row separately so we can include a special spacer cell. -->\r\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n  <!--\r\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\r\n    The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\r\n    percentage of the width (a variant of the trick described here:\r\n    https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\r\n  -->\r\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\r\n      class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"_firstRowOffset\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n    {{_firstRowOffset >= labelMinRequiredCells ? label : ''}}\r\n  </td>\r\n  <td *ngFor=\"let item of row; let colIndex = index\"\r\n      role=\"gridcell\"\r\n      class=\"mat-calendar-body-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [tabindex]=\"_isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n      [attr.data-mat-row]=\"rowIndex\"\r\n      [attr.data-mat-col]=\"colIndex\"\r\n      [class.mat-calendar-body-disabled]=\"!item.enabled\"\r\n      [class.mat-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-range-start]=\"_isRangeStart(item.compareValue)\"\r\n      [class.mat-calendar-body-range-end]=\"_isRangeEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-range]=\"_isInRange(item.compareValue)\"\r\n      [class.mat-calendar-body-comparison-bridge-start]=\"_isComparisonBridgeStart(item.compareValue, rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-comparison-bridge-end]=\"_isComparisonBridgeEnd(item.compareValue, rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-comparison-start]=\"_isComparisonStart(item.compareValue)\"\r\n      [class.mat-calendar-body-comparison-end]=\"_isComparisonEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-comparison-range]=\"_isInComparisonRange(item.compareValue)\"\r\n      [class.mat-calendar-body-preview-start]=\"_isPreviewStart(item.compareValue)\"\r\n      [class.mat-calendar-body-preview-end]=\"_isPreviewEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-preview]=\"_isInPreview(item.compareValue)\"\r\n      [attr.aria-label]=\"item.ariaLabel\"\r\n      [attr.aria-disabled]=\"!item.enabled || null\"\r\n      [attr.aria-selected]=\"_isSelected(item.compareValue)\"\r\n      [attr.aria-current]=\"todayValue === item.compareValue ? 'date' : null\"\r\n      (click)=\"_cellClicked(item, $event)\"\r\n      [style.width]=\"_cellWidth\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n      <div class=\"mat-calendar-body-cell-content mat-focus-indicator\"\r\n        [class.mat-calendar-body-selected]=\"_isSelected(item.compareValue)\"\r\n        [class.mat-calendar-body-comparison-identical]=\"_isComparisonIdentical(item.compareValue)\"\r\n        [class.mat-calendar-body-today]=\"todayValue === item.compareValue\">\r\n        {{item.displayValue}}\r\n      </div>\r\n      <div class=\"mat-calendar-body-cell-preview\"></div>\r\n  </td>\r\n</tr>\r\n", styles: [".mat-calendar-body{min-width:224px}.mat-calendar-body-label{height:0;line-height:0;text-align:left;padding-left:4.7142857143%;padding-right:4.7142857143%}.mat-calendar-body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mat-calendar-body-cell:before,.mat-calendar-body-cell:after,.mat-calendar-body-cell-preview{content:\"\";position:absolute;top:5%;left:0;z-index:0;box-sizing:border-box;height:90%;width:100%}.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-start:after,.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,.mat-calendar-body-comparison-start:after,.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:5%;width:95%;border-top-left-radius:999px;border-bottom-left-radius:999px}[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,[dir=rtl] .mat-calendar-body-comparison-start:after,[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:0;border-radius:0 999px 999px 0}.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,.mat-calendar-body-comparison-end:after,.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,[dir=rtl] .mat-calendar-body-comparison-end:after,[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{left:5%;border-radius:999px 0 0 999px}[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start:after{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}.mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end.mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start:after{width:90%}.mat-calendar-body-in-preview .mat-calendar-body-cell-preview{border-top:dashed 1px;border-bottom:dashed 1px}.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:dashed 1px}[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:0;border-right:dashed 1px}.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:dashed 1px}[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:0;border-left:dashed 1px}.mat-calendar-body-disabled{cursor:default}.cdk-high-contrast-active .mat-calendar-body-disabled{opacity:.5}.mat-calendar-body-cell-content{top:5%;left:5%;z-index:1;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid;border-radius:999px}.mat-calendar-body-cell-content.mat-focus-indicator{position:absolute}.cdk-high-contrast-active .mat-calendar-body-cell-content{border:none}.mat-datepicker-dialog .mat-dialog-container{position:relative;overflow:visible}.cdk-high-contrast-active .mat-datepicker-popup:not(:empty),.cdk-high-contrast-active .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected{outline:solid 1px}.cdk-high-contrast-active .mat-calendar-body-today{outline:dotted 1px}.cdk-high-contrast-active .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-high-contrast-active .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){outline:dotted 2px}.cdk-high-contrast-active .mat-calendar-body-cell:before,.cdk-high-contrast-active .mat-calendar-body-cell:after,.cdk-high-contrast-active .mat-calendar-body-selected{background:none}.cdk-high-contrast-active .mat-calendar-body-in-range:before,.cdk-high-contrast-active .mat-calendar-body-comparison-bridge-start:before,.cdk-high-contrast-active .mat-calendar-body-comparison-bridge-end:before{border-top:solid 1px;border-bottom:solid 1px}.cdk-high-contrast-active .mat-calendar-body-range-start:before{border-left:solid 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-range-start:before{border-left:0;border-right:solid 1px}.cdk-high-contrast-active .mat-calendar-body-range-end:before{border-right:solid 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-range-end:before{border-right:0;border-left:solid 1px}.cdk-high-contrast-active .mat-calendar-body-in-comparison-range:before{border-top:dashed 1px;border-bottom:dashed 1px}.cdk-high-contrast-active .mat-calendar-body-comparison-start:before{border-left:dashed 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-comparison-start:before{border-left:0;border-right:dashed 1px}.cdk-high-contrast-active .mat-calendar-body-comparison-end:before{border-right:dashed 1px}[dir=rtl] .cdk-high-contrast-active .mat-calendar-body-comparison-end:before{border-right:0;border-left:dashed 1px}[dir=rtl] .mat-calendar-body-label{text-align:right}\n"] }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, { label: [{
            type: Input
        }], rows: [{
            type: Input
        }], todayValue: [{
            type: Input
        }], startValue: [{
            type: Input
        }], endValue: [{
            type: Input
        }], labelMinRequiredCells: [{
            type: Input
        }], numCols: [{
            type: Input
        }], activeCell: [{
            type: Input
        }], isRange: [{
            type: Input
        }], cellAspectRatio: [{
            type: Input
        }], comparisonStart: [{
            type: Input
        }], comparisonEnd: [{
            type: Input
        }], previewStart: [{
            type: Input
        }], previewEnd: [{
            type: Input
        }], selectedValueChange: [{
            type: Output
        }], previewChange: [{
            type: Output
        }] }); })();
/** Checks whether a node is a table cell element. */
function isTableCell(node) {
    return node.nodeName === 'TD';
}
/** Checks whether a value is the start of a range. */
function isStart(value, start, end) {
    return end !== null && start !== end && value < end && value === start;
}
/** Checks whether a value is the end of a range. */
function isEnd(value, start, end) {
    return start !== null && start !== end && value >= start && value === end;
}
/** Checks whether a value is inside of a range. */
function isInRange(value, start, end, rangeEnabled) {
    return (rangeEnabled &&
        start !== null &&
        end !== null &&
        start !== end &&
        value >= start &&
        value <= end);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2NhbGVuZGFyLWJvZHkudHMiLCIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jYWxlbmRhci1ib2R5Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixNQUFNLEdBSVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztJQ0FsQyw2QkFJeUM7SUFDdkMsWUFDRjtJQUFBLGlCQUFLOzs7SUFIRCxrREFBaUMsdUNBQUE7SUFEakMsaURBQWdDO0lBR2xDLGVBQ0Y7SUFERSwyR0FDRjs7OztJQUNBLDZCQTJCeUM7SUFIckMsOE5BQVMsb0NBQTBCLElBQUM7SUFJcEMsOEJBR3FFO0lBQ25FLFlBQ0Y7SUFBQSxpQkFBTTtJQUNOLHlCQUFrRDtJQUN0RCxpQkFBSzs7Ozs7O0lBVkQsMENBQTBCLG9DQUFBLHVDQUFBO0lBbEIxQiw4REFBa0QsNEVBQUEsNkVBQUEseUVBQUEsdUVBQUEsOEhBQUEsMEhBQUEsdUZBQUEsbUZBQUEsNEZBQUEsaUZBQUEsNkVBQUEsMkVBQUE7SUFKbEQsNENBQTJCLHFFQUFBO0lBRTNCLDJDQUE4Qiw2QkFBQSxpQ0FBQSwyQ0FBQSwyREFBQSw0RUFBQTtJQXdCNUIsZUFBbUU7SUFBbkUsc0ZBQW1FLCtGQUFBLHVFQUFBO0lBR25FLGVBQ0Y7SUFERSxxREFDRjs7O0lBL0NOLDZCQUE4RDtJQU81RCxtRUFNSztJQUNMLG9FQW1DSztJQUNQLGlCQUFLOzs7OztJQTNDRSxlQUF1QztJQUF2QyxrRUFBdUM7SUFPdkIsZUFB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QUcsQ0FDYixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge01hdENhbGVuZGFyVmlld30gZnJvbSAnLi9jYWxlbmRhci50eXBlcyc7XHJcblxyXG4vKiogRXh0cmEgQ1NTIGNsYXNzZXMgdGhhdCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGEgY2FsZW5kYXIgY2VsbC4gKi9cclxuZXhwb3J0IHR5cGUgTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyA9IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7W2tleTogc3RyaW5nXTogYW55fTtcclxuXHJcbi8qKiBGdW5jdGlvbiB0aGF0IGNhbiBnZW5lcmF0ZSB0aGUgZXh0cmEgY2xhc3NlcyB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byBhIGNhbGVuZGFyIGNlbGwuICovXHJcbmV4cG9ydCB0eXBlIE1hdENhbGVuZGFyQ2VsbENsYXNzRnVuY3Rpb248RD4gPSAoXHJcbiAgZGF0ZTogRCxcclxuICB2aWV3OiBNYXRDYWxlbmRhclZpZXcsXHJcbikgPT4gTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcclxuXHJcbi8qKlxyXG4gKiBBbiBpbnRlcm5hbCBjbGFzcyB0aGF0IHJlcHJlc2VudHMgdGhlIGRhdGEgY29ycmVzcG9uZGluZyB0byBhIHNpbmdsZSBjYWxlbmRhciBjZWxsLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWF0Q2FsZW5kYXJDZWxsPEQgPSBhbnk+IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyLFxyXG4gICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nLFxyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICBwdWJsaWMgY3NzQ2xhc3NlczogTWF0Q2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcyA9IHt9LFxyXG4gICAgcHVibGljIGNvbXBhcmVWYWx1ZSA9IHZhbHVlLFxyXG4gICAgcHVibGljIHJhd1ZhbHVlPzogRCxcclxuICApIHt9XHJcbn1cclxuXHJcbi8qKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBkYXRlIGluc2lkZSB0aGUgY2FsZW5kYXIgaXMgdHJpZ2dlcmVkIGFzIGEgcmVzdWx0IG9mIGEgdXNlciBhY3Rpb24uICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2FsZW5kYXJVc2VyRXZlbnQ8RD4ge1xyXG4gIHZhbHVlOiBEO1xyXG4gIGV2ZW50OiBFdmVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgY2FsZW5kYXIgZGF0YSBpbiBhIHRhYmxlLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1ttYXQtY2FsZW5kYXItYm9keV0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItYm9keS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnY2FsZW5kYXItYm9keS5zY3NzJ10sXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ21hdC1jYWxlbmRhci1ib2R5JyxcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0Q2FsZW5kYXJCb2R5JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0Q2FsZW5kYXJCb2R5IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gc2tpcCB0aGUgbmV4dCBmb2N1cyBldmVudCB3aGVuIHJlbmRlcmluZyB0aGUgcHJldmlldyByYW5nZS5cclxuICAgKiBXZSBuZWVkIGEgZmxhZyBsaWtlIHRoaXMsIGJlY2F1c2Ugc29tZSBicm93c2VycyBmaXJlIGZvY3VzIGV2ZW50cyBhc3luY2hyb25vdXNseS5cclxuICAgKi9cclxuICBwcml2YXRlIF9za2lwTmV4dEZvY3VzOiBib29sZWFuO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgdGFibGUuIChlLmcuIFwiSmFuIDIwMTdcIikuICovXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBjZWxscyB0byBkaXNwbGF5IGluIHRoZSB0YWJsZS4gKi9cclxuICBASW5wdXQoKSByb3dzOiBNYXRDYWxlbmRhckNlbGxbXVtdO1xyXG5cclxuICAvKiogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LiAqL1xyXG4gIEBJbnB1dCgpIHRvZGF5VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgLyoqIFN0YXJ0IHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBkYXRlIHJhbmdlLiAqL1xyXG4gIEBJbnB1dCgpIHN0YXJ0VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgLyoqIEVuZCB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgZGF0ZSByYW5nZS4gKi9cclxuICBASW5wdXQoKSBlbmRWYWx1ZTogbnVtYmVyO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGZyZWUgY2VsbHMgbmVlZGVkIHRvIGZpdCB0aGUgbGFiZWwgaW4gdGhlIGZpcnN0IHJvdy4gKi9cclxuICBASW5wdXQoKSBsYWJlbE1pblJlcXVpcmVkQ2VsbHM6IG51bWJlcjtcclxuXHJcbiAgLyoqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgdGFibGUuICovXHJcbiAgQElucHV0KCkgbnVtQ29sczogbnVtYmVyID0gNztcclxuXHJcbiAgLyoqIFRoZSBjZWxsIG51bWJlciBvZiB0aGUgYWN0aXZlIGNlbGwgaW4gdGhlIHRhYmxlLiAqL1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUNlbGw6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKiBXaGV0aGVyIGEgcmFuZ2UgaXMgYmVpbmcgc2VsZWN0ZWQuICovXHJcbiAgQElucHV0KCkgaXNSYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXNwZWN0IHJhdGlvICh3aWR0aCAvIGhlaWdodCkgdG8gdXNlIGZvciB0aGUgY2VsbHMgaW4gdGhlIHRhYmxlLiBUaGlzIGFzcGVjdCByYXRpbyB3aWxsIGJlXHJcbiAgICogbWFpbnRhaW5lZCBldmVuIGFzIHRoZSB0YWJsZSByZXNpemVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNlbGxBc3BlY3RSYXRpbzogbnVtYmVyID0gMTtcclxuXHJcbiAgLyoqIFN0YXJ0IG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLiAqL1xyXG4gIEBJbnB1dCgpIGNvbXBhcmlzb25TdGFydDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgLyoqIEVuZCBvZiB0aGUgY29tcGFyaXNvbiByYW5nZS4gKi9cclxuICBASW5wdXQoKSBjb21wYXJpc29uRW5kOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICAvKiogU3RhcnQgb2YgdGhlIHByZXZpZXcgcmFuZ2UuICovXHJcbiAgQElucHV0KCkgcHJldmlld1N0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqIEVuZCBvZiB0aGUgcHJldmlldyByYW5nZS4gKi9cclxuICBASW5wdXQoKSBwcmV2aWV3RW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgdmFsdWUgaXMgc2VsZWN0ZWQuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENhbGVuZGFyVXNlckV2ZW50PG51bWJlcj4+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBwcmV2aWV3IGhhcyBjaGFuZ2VkIGFzIGEgcmVzdWx0IG9mIGEgdXNlciBhY3Rpb24uICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHByZXZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgTWF0Q2FsZW5kYXJVc2VyRXZlbnQ8TWF0Q2FsZW5kYXJDZWxsIHwgbnVsbD5cclxuICA+KCk7XHJcblxyXG4gIC8qKiBUaGUgbnVtYmVyIG9mIGJsYW5rIGNlbGxzIHRvIHB1dCBhdCB0aGUgYmVnaW5uaW5nIGZvciB0aGUgZmlyc3Qgcm93LiAqL1xyXG4gIF9maXJzdFJvd09mZnNldDogbnVtYmVyO1xyXG5cclxuICAvKiogUGFkZGluZyBmb3IgdGhlIGluZGl2aWR1YWwgZGF0ZSBjZWxscy4gKi9cclxuICBfY2VsbFBhZGRpbmc6IHN0cmluZztcclxuXHJcbiAgLyoqIFdpZHRoIG9mIGFuIGluZGl2aWR1YWwgY2VsbC4gKi9cclxuICBfY2VsbFdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xyXG4gICAgX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9lbnRlckhhbmRsZXIsIHRydWUpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fZW50ZXJIYW5kbGVyLCB0cnVlKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fbGVhdmVIYW5kbGVyLCB0cnVlKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fbGVhdmVIYW5kbGVyLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIENhbGxlZCB3aGVuIGEgY2VsbCBpcyBjbGlja2VkLiAqL1xyXG4gIF9jZWxsQ2xpY2tlZChjZWxsOiBNYXRDYWxlbmRhckNlbGwsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoY2VsbC5lbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHt2YWx1ZTogY2VsbC52YWx1ZSwgZXZlbnR9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgYSBjZWxsIHNob3VsZCBiZSBtYXJrZWQgYXMgc2VsZWN0ZWQuICovXHJcbiAgX2lzU2VsZWN0ZWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhcnRWYWx1ZSA9PT0gdmFsdWUgfHwgdGhpcy5lbmRWYWx1ZSA9PT0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBjb2x1bW5DaGFuZ2VzID0gY2hhbmdlc1snbnVtQ29scyddO1xyXG4gICAgY29uc3Qge3Jvd3MsIG51bUNvbHN9ID0gdGhpcztcclxuXHJcbiAgICBpZiAoY2hhbmdlc1sncm93cyddIHx8IGNvbHVtbkNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5fZmlyc3RSb3dPZmZzZXQgPSByb3dzICYmIHJvd3MubGVuZ3RoICYmIHJvd3NbMF0ubGVuZ3RoID8gbnVtQ29scyAtIHJvd3NbMF0ubGVuZ3RoIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snY2VsbEFzcGVjdFJhdGlvJ10gfHwgY29sdW1uQ2hhbmdlcyB8fCAhdGhpcy5fY2VsbFBhZGRpbmcpIHtcclxuICAgICAgdGhpcy5fY2VsbFBhZGRpbmcgPSBgJHsoNTAgKiB0aGlzLmNlbGxBc3BlY3RSYXRpbykgLyBudW1Db2xzfSVgO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb2x1bW5DaGFuZ2VzIHx8ICF0aGlzLl9jZWxsV2lkdGgpIHtcclxuICAgICAgdGhpcy5fY2VsbFdpZHRoID0gYCR7MTAwIC8gbnVtQ29sc30lYDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuX2VudGVySGFuZGxlciwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fZW50ZXJIYW5kbGVyLCB0cnVlKTtcclxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX2xlYXZlSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9sZWF2ZUhhbmRsZXIsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFJldHVybnMgd2hldGhlciBhIGNlbGwgaXMgYWN0aXZlLiAqL1xyXG4gIF9pc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGNlbGxOdW1iZXIgPSByb3dJbmRleCAqIHRoaXMubnVtQ29scyArIGNvbEluZGV4O1xyXG5cclxuICAgIC8vIEFjY291bnQgZm9yIHRoZSBmYWN0IHRoYXQgdGhlIGZpcnN0IHJvdyBtYXkgbm90IGhhdmUgYXMgbWFueSBjZWxscy5cclxuICAgIGlmIChyb3dJbmRleCkge1xyXG4gICAgICBjZWxsTnVtYmVyIC09IHRoaXMuX2ZpcnN0Um93T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjZWxsTnVtYmVyID09IHRoaXMuYWN0aXZlQ2VsbDtcclxuICB9XHJcblxyXG4gIC8qKiBGb2N1c2VzIHRoZSBhY3RpdmUgY2VsbCBhZnRlciB0aGUgbWljcm90YXNrIHF1ZXVlIGlzIGVtcHR5LiAqL1xyXG4gIF9mb2N1c0FjdGl2ZUNlbGwobW92ZVByZXZpZXcgPSB0cnVlKSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZUNlbGw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgJy5tYXQtY2FsZW5kYXItYm9keS1hY3RpdmUnLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVDZWxsKSB7XHJcbiAgICAgICAgICBpZiAoIW1vdmVQcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraXBOZXh0Rm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGFjdGl2ZUNlbGwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIHN0YXJ0IG9mIHRoZSBtYWluIHJhbmdlLiAqL1xyXG4gIF9pc1JhbmdlU3RhcnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMuc3RhcnRWYWx1ZSwgdGhpcy5lbmRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiB0aGUgbWFpbiByYW5nZS4gKi9cclxuICBfaXNSYW5nZUVuZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gaXNFbmQodmFsdWUsIHRoaXMuc3RhcnRWYWx1ZSwgdGhpcy5lbmRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgd2l0aGluIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgcmFuZ2UuICovXHJcbiAgX2lzSW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNJblJhbmdlKHZhbHVlLCB0aGlzLnN0YXJ0VmFsdWUsIHRoaXMuZW5kVmFsdWUsIHRoaXMuaXNSYW5nZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIHN0YXJ0IG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLiAqL1xyXG4gIF9pc0NvbXBhcmlzb25TdGFydCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gaXNTdGFydCh2YWx1ZSwgdGhpcy5jb21wYXJpc29uU3RhcnQsIHRoaXMuY29tcGFyaXNvbkVuZCk7XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2VsbCBpcyBhIHN0YXJ0IGJyaWRnZSBjZWxsIGJldHdlZW4gdGhlIG1haW4gYW5kIGNvbXBhcmlzb24gcmFuZ2VzLiAqL1xyXG4gIF9pc0NvbXBhcmlzb25CcmlkZ2VTdGFydCh2YWx1ZTogbnVtYmVyLCByb3dJbmRleDogbnVtYmVyLCBjb2xJbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2lzQ29tcGFyaXNvblN0YXJ0KHZhbHVlKSB8fCB0aGlzLl9pc1JhbmdlU3RhcnQodmFsdWUpIHx8ICF0aGlzLl9pc0luUmFuZ2UodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcHJldmlvdXNDZWxsOiBNYXRDYWxlbmRhckNlbGwgfCB1bmRlZmluZWQgPSB0aGlzLnJvd3Nbcm93SW5kZXhdW2NvbEluZGV4IC0gMV07XHJcblxyXG4gICAgaWYgKCFwcmV2aW91c0NlbGwpIHtcclxuICAgICAgY29uc3QgcHJldmlvdXNSb3cgPSB0aGlzLnJvd3Nbcm93SW5kZXggLSAxXTtcclxuICAgICAgcHJldmlvdXNDZWxsID0gcHJldmlvdXNSb3cgJiYgcHJldmlvdXNSb3dbcHJldmlvdXNSb3cubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzQ2VsbCAmJiAhdGhpcy5faXNSYW5nZUVuZChwcmV2aW91c0NlbGwuY29tcGFyZVZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjZWxsIGlzIGFuIGVuZCBicmlkZ2UgY2VsbCBiZXR3ZWVuIHRoZSBtYWluIGFuZCBjb21wYXJpc29uIHJhbmdlcy4gKi9cclxuICBfaXNDb21wYXJpc29uQnJpZGdlRW5kKHZhbHVlOiBudW1iZXIsIHJvd0luZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5faXNDb21wYXJpc29uRW5kKHZhbHVlKSB8fCB0aGlzLl9pc1JhbmdlRW5kKHZhbHVlKSB8fCAhdGhpcy5faXNJblJhbmdlKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5leHRDZWxsOiBNYXRDYWxlbmRhckNlbGwgfCB1bmRlZmluZWQgPSB0aGlzLnJvd3Nbcm93SW5kZXhdW2NvbEluZGV4ICsgMV07XHJcblxyXG4gICAgaWYgKCFuZXh0Q2VsbCkge1xyXG4gICAgICBjb25zdCBuZXh0Um93ID0gdGhpcy5yb3dzW3Jvd0luZGV4ICsgMV07XHJcbiAgICAgIG5leHRDZWxsID0gbmV4dFJvdyAmJiBuZXh0Um93WzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0Q2VsbCAmJiAhdGhpcy5faXNSYW5nZVN0YXJ0KG5leHRDZWxsLmNvbXBhcmVWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiB0aGUgY29tcGFyaXNvbiByYW5nZS4gKi9cclxuICBfaXNDb21wYXJpc29uRW5kKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBpc0VuZCh2YWx1ZSwgdGhpcy5jb21wYXJpc29uU3RhcnQsIHRoaXMuY29tcGFyaXNvbkVuZCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0cyB3aGV0aGVyIGEgdmFsdWUgaXMgd2l0aGluIHRoZSBjdXJyZW50IGNvbXBhcmlzb24gcmFuZ2UuICovXHJcbiAgX2lzSW5Db21wYXJpc29uUmFuZ2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGlzSW5SYW5nZSh2YWx1ZSwgdGhpcy5jb21wYXJpc29uU3RhcnQsIHRoaXMuY29tcGFyaXNvbkVuZCwgdGhpcy5pc1JhbmdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZSBjb21wYXJpc29uIHJhbmdlLlxyXG4gICAqIEZvciBjb250ZXh0LCB0aGUgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIHRvIGRldGVybWluZSB3aGV0aGVyIHNvbWV0aGluZyBpcyB0aGUgc3RhcnQvZW5kIG9mXHJcbiAgICogYSByYW5nZSBkb24ndCBhbGxvdyBmb3IgdGhlIHN0YXJ0IGFuZCBlbmQgdG8gYmUgb24gdGhlIHNhbWUgZGF5LCBiZWNhdXNlIHdlJ2QgaGF2ZSB0byB1c2VcclxuICAgKiBtdWNoIG1vcmUgc3BlY2lmaWMgQ1NTIHNlbGVjdG9ycyB0byBzdHlsZSB0aGVtIGNvcnJlY3RseSBpbiBhbGwgc2NlbmFyaW9zLiBUaGlzIGlzIGZpbmUgZm9yXHJcbiAgICogdGhlIHJlZ3VsYXIgcmFuZ2UsIGJlY2F1c2Ugd2hlbiBpdCBoYXBwZW5zLCB0aGUgc2VsZWN0ZWQgc3R5bGVzIHRha2Ugb3ZlciBhbmQgc3RpbGwgc2hvdyB3aGVyZVxyXG4gICAqIHRoZSByYW5nZSB3b3VsZCd2ZSBiZWVuLCBob3dldmVyIHdlIGRvbid0IGhhdmUgdGhlc2Ugc2VsZWN0ZWQgc3R5bGVzIGZvciBhIGNvbXBhcmlzb24gcmFuZ2UuXHJcbiAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGFwcGx5IGEgY2xhc3MgdGhhdCBzZXJ2ZXMgdGhlIHNhbWUgcHVycG9zZSBhcyB0aGUgb25lIGZvciBzZWxlY3RlZFxyXG4gICAqIGRhdGVzLCBidXQgaXQgb25seSBhcHBsaWVzIGluIHRoZSBjb250ZXh0IG9mIGEgY29tcGFyaXNvbiByYW5nZS5cclxuICAgKi9cclxuICBfaXNDb21wYXJpc29uSWRlbnRpY2FsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIHN0YXJ0L2VuZFxyXG4gICAgLy8gaGVyZSwgYmVjYXVzZSB0aGUgYHZhbHVlYCB3aWxsIGFsd2F5cyBiZSBkZWZpbmVkLlxyXG4gICAgcmV0dXJuIHRoaXMuY29tcGFyaXNvblN0YXJ0ID09PSB0aGlzLmNvbXBhcmlzb25FbmQgJiYgdmFsdWUgPT09IHRoaXMuY29tcGFyaXNvblN0YXJ0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBzdGFydCBvZiB0aGUgcHJldmlldyByYW5nZS4gKi9cclxuICBfaXNQcmV2aWV3U3RhcnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGlzU3RhcnQodmFsdWUsIHRoaXMucHJldmlld1N0YXJ0LCB0aGlzLnByZXZpZXdFbmQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIHRoZSBlbmQgb2YgdGhlIHByZXZpZXcgcmFuZ2UuICovXHJcbiAgX2lzUHJldmlld0VuZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gaXNFbmQodmFsdWUsIHRoaXMucHJldmlld1N0YXJ0LCB0aGlzLnByZXZpZXdFbmQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgd2hldGhlciBhIHZhbHVlIGlzIGluc2lkZSB0aGUgcHJldmlldyByYW5nZS4gKi9cclxuICBfaXNJblByZXZpZXcodmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGlzSW5SYW5nZSh2YWx1ZSwgdGhpcy5wcmV2aWV3U3RhcnQsIHRoaXMucHJldmlld0VuZCwgdGhpcy5pc1JhbmdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIHdoZW4gdGhlIHVzZXIgZW50ZXJzIGFuIGVsZW1lbnRcclxuICAgKiBpbnNpZGUgdGhlIGNhbGVuZGFyIGJvZHkgKGUuZy4gYnkgaG92ZXJpbmcgaW4gb3IgZm9jdXMpLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2VudGVySGFuZGxlciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgIGlmICh0aGlzLl9za2lwTmV4dEZvY3VzICYmIGV2ZW50LnR5cGUgPT09ICdmb2N1cycpIHtcclxuICAgICAgdGhpcy5fc2tpcE5leHRGb2N1cyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2Ugb25seSBuZWVkIHRvIGhpdCB0aGUgem9uZSB3aGVuIHdlJ3JlIHNlbGVjdGluZyBhIHJhbmdlLlxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCAmJiB0aGlzLmlzUmFuZ2UpIHtcclxuICAgICAgY29uc3QgY2VsbCA9IHRoaXMuX2dldENlbGxGcm9tRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xyXG5cclxuICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMucHJldmlld0NoYW5nZS5lbWl0KHt2YWx1ZTogY2VsbC5lbmFibGVkID8gY2VsbCA6IG51bGwsIGV2ZW50fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgaGFuZGxlciBmb3Igd2hlbiB0aGUgdXNlcidzIHBvaW50ZXIgbGVhdmVzIGFuIGVsZW1lbnRcclxuICAgKiBpbnNpZGUgdGhlIGNhbGVuZGFyIGJvZHkgKGUuZy4gYnkgaG92ZXJpbmcgb3V0IG9yIGJsdXJyaW5nKS5cclxuICAgKi9cclxuICBwcml2YXRlIF9sZWF2ZUhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAvLyBXZSBvbmx5IG5lZWQgdG8gaGl0IHRoZSB6b25lIHdoZW4gd2UncmUgc2VsZWN0aW5nIGEgcmFuZ2UuXHJcbiAgICBpZiAodGhpcy5wcmV2aWV3RW5kICE9PSBudWxsICYmIHRoaXMuaXNSYW5nZSkge1xyXG4gICAgICAvLyBPbmx5IHJlc2V0IHRoZSBwcmV2aWV3IGVuZCB2YWx1ZSB3aGVuIGxlYXZpbmcgY2VsbHMuIFRoaXMgbG9va3MgYmV0dGVyLCBiZWNhdXNlXHJcbiAgICAgIC8vIHdlIGhhdmUgYSBnYXAgYmV0d2VlbiB0aGUgY2VsbHMgYW5kIHRoZSByb3dzIGFuZCB3ZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGVcclxuICAgICAgLy8gcmFuZ2UganVzdCBmb3IgaXQgdG8gc2hvdyB1cCBhZ2FpbiB3aGVuIHRoZSB1c2VyIG1vdmVzIGEgZmV3IHBpeGVscyB0byB0aGUgc2lkZS5cclxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBpc1RhYmxlQ2VsbChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLnByZXZpZXdDaGFuZ2UuZW1pdCh7dmFsdWU6IG51bGwsIGV2ZW50fSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqIEZpbmRzIHRoZSBNYXRDYWxlbmRhckNlbGwgdGhhdCBjb3JyZXNwb25kcyB0byBhIERPTSBub2RlLiAqL1xyXG4gIHByaXZhdGUgX2dldENlbGxGcm9tRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IE1hdENhbGVuZGFyQ2VsbCB8IG51bGwge1xyXG4gICAgbGV0IGNlbGw6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChpc1RhYmxlQ2VsbChlbGVtZW50KSkge1xyXG4gICAgICBjZWxsID0gZWxlbWVudDtcclxuICAgIH0gZWxzZSBpZiAoaXNUYWJsZUNlbGwoZWxlbWVudC5wYXJlbnROb2RlISkpIHtcclxuICAgICAgY2VsbCA9IGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2VsbCkge1xyXG4gICAgICBjb25zdCByb3cgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXQtcm93Jyk7XHJcbiAgICAgIGNvbnN0IGNvbCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLW1hdC1jb2wnKTtcclxuXHJcbiAgICAgIGlmIChyb3cgJiYgY29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1twYXJzZUludChyb3cpXVtwYXJzZUludChjb2wpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIENoZWNrcyB3aGV0aGVyIGEgbm9kZSBpcyBhIHRhYmxlIGNlbGwgZWxlbWVudC4gKi9cclxuZnVuY3Rpb24gaXNUYWJsZUNlbGwobm9kZTogTm9kZSk6IG5vZGUgaXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQge1xyXG4gIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnVEQnO1xyXG59XHJcblxyXG4vKiogQ2hlY2tzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0aGUgc3RhcnQgb2YgYSByYW5nZS4gKi9cclxuZnVuY3Rpb24gaXNTdGFydCh2YWx1ZTogbnVtYmVyLCBzdGFydDogbnVtYmVyIHwgbnVsbCwgZW5kOiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGVuZCAhPT0gbnVsbCAmJiBzdGFydCAhPT0gZW5kICYmIHZhbHVlIDwgZW5kICYmIHZhbHVlID09PSBzdGFydDtcclxufVxyXG5cclxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgdGhlIGVuZCBvZiBhIHJhbmdlLiAqL1xyXG5mdW5jdGlvbiBpc0VuZCh2YWx1ZTogbnVtYmVyLCBzdGFydDogbnVtYmVyIHwgbnVsbCwgZW5kOiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHN0YXJ0ICE9PSBudWxsICYmIHN0YXJ0ICE9PSBlbmQgJiYgdmFsdWUgPj0gc3RhcnQgJiYgdmFsdWUgPT09IGVuZDtcclxufVxyXG5cclxuLyoqIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgaW5zaWRlIG9mIGEgcmFuZ2UuICovXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShcclxuICB2YWx1ZTogbnVtYmVyLFxyXG4gIHN0YXJ0OiBudW1iZXIgfCBudWxsLFxyXG4gIGVuZDogbnVtYmVyIHwgbnVsbCxcclxuICByYW5nZUVuYWJsZWQ6IGJvb2xlYW4sXHJcbik6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoXHJcbiAgICByYW5nZUVuYWJsZWQgJiZcclxuICAgIHN0YXJ0ICE9PSBudWxsICYmXHJcbiAgICBlbmQgIT09IG51bGwgJiZcclxuICAgIHN0YXJ0ICE9PSBlbmQgJiZcclxuICAgIHZhbHVlID49IHN0YXJ0ICYmXHJcbiAgICB2YWx1ZSA8PSBlbmRcclxuICApO1xyXG59XHJcbiIsIjwhLS1cclxuICBJZiB0aGVyZSdzIG5vdCBlbm91Z2ggc3BhY2UgaW4gdGhlIGZpcnN0IHJvdywgY3JlYXRlIGEgc2VwYXJhdGUgbGFiZWwgcm93LiBXZSBtYXJrIHRoaXMgcm93IGFzXHJcbiAgYXJpYS1oaWRkZW4gYmVjYXVzZSB3ZSBkb24ndCB3YW50IGl0IHRvIGJlIHJlYWQgb3V0IGFzIG9uZSBvZiB0aGUgd2Vla3MgaW4gdGhlIG1vbnRoLlxyXG4tLT5cclxuPCEtLXRyICpuZ0lmPVwiX2ZpcnN0Um93T2Zmc2V0IDwgbGFiZWxNaW5SZXF1aXJlZENlbGxzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgPHRkIGNsYXNzPVwibWF0LWNhbGVuZGFyLWJvZHktbGFiZWxcIlxyXG4gICAgICBbYXR0ci5jb2xzcGFuXT1cIm51bUNvbHNcIlxyXG4gICAgICBbc3R5bGUucGFkZGluZ1RvcF09XCJfY2VsbFBhZGRpbmdcIlxyXG4gICAgICBbc3R5bGUucGFkZGluZ0JvdHRvbV09XCJfY2VsbFBhZGRpbmdcIj5cclxuICAgIHt7bGFiZWx9fVxyXG4gIDwvdGQ+XHJcbjwvdHItLT5cclxuXHJcbjwhLS0gQ3JlYXRlIHRoZSBmaXJzdCByb3cgc2VwYXJhdGVseSBzbyB3ZSBjYW4gaW5jbHVkZSBhIHNwZWNpYWwgc3BhY2VyIGNlbGwuIC0tPlxyXG48dHIgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgcm93SW5kZXggPSBpbmRleFwiIHJvbGU9XCJyb3dcIj5cclxuICA8IS0tXHJcbiAgICBXZSBtYXJrIHRoaXMgY2VsbCBhcyBhcmlhLWhpZGRlbiBzbyBpdCBkb2Vzbid0IGdldCByZWFkIG91dCBhcyBvbmUgb2YgdGhlIGRheXMgaW4gdGhlIHdlZWsuXHJcbiAgICBUaGUgYXNwZWN0IHJhdGlvIG9mIHRoZSB0YWJsZSBjZWxscyBpcyBtYWludGFpbmVkIGJ5IHNldHRpbmcgdGhlIHRvcCBhbmQgYm90dG9tIHBhZGRpbmcgYXMgYVxyXG4gICAgcGVyY2VudGFnZSBvZiB0aGUgd2lkdGggKGEgdmFyaWFudCBvZiB0aGUgdHJpY2sgZGVzY3JpYmVkIGhlcmU6XHJcbiAgICBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2hvd3RvL2hvd3RvX2Nzc19hc3BlY3RfcmF0aW8uYXNwKS5cclxuICAtLT5cclxuICA8dGQgKm5nSWY9XCJyb3dJbmRleCA9PT0gMCAmJiBfZmlyc3RSb3dPZmZzZXRcIlxyXG4gICAgICBjbGFzcz1cIm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsXCJcclxuICAgICAgW2F0dHIuY29sc3Bhbl09XCJfZmlyc3RSb3dPZmZzZXRcIlxyXG4gICAgICBbc3R5bGUucGFkZGluZ1RvcF09XCJfY2VsbFBhZGRpbmdcIlxyXG4gICAgICBbc3R5bGUucGFkZGluZ0JvdHRvbV09XCJfY2VsbFBhZGRpbmdcIj5cclxuICAgIHt7X2ZpcnN0Um93T2Zmc2V0ID49IGxhYmVsTWluUmVxdWlyZWRDZWxscyA/IGxhYmVsIDogJyd9fVxyXG4gIDwvdGQ+XHJcbiAgPHRkICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIlxyXG4gICAgICByb2xlPVwiZ3JpZGNlbGxcIlxyXG4gICAgICBjbGFzcz1cIm1hdC1jYWxlbmRhci1ib2R5LWNlbGxcIlxyXG4gICAgICBbbmdDbGFzc109XCJpdGVtLmNzc0NsYXNzZXNcIlxyXG4gICAgICBbdGFiaW5kZXhdPVwiX2lzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpID8gMCA6IC0xXCJcclxuICAgICAgW2F0dHIuZGF0YS1tYXQtcm93XT1cInJvd0luZGV4XCJcclxuICAgICAgW2F0dHIuZGF0YS1tYXQtY29sXT1cImNvbEluZGV4XCJcclxuICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxyXG4gICAgICBbY2xhc3MubWF0LWNhbGVuZGFyLWJvZHktYWN0aXZlXT1cIl9pc0FjdGl2ZUNlbGwocm93SW5kZXgsIGNvbEluZGV4KVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2FsZW5kYXItYm9keS1yYW5nZS1zdGFydF09XCJfaXNSYW5nZVN0YXJ0KGl0ZW0uY29tcGFyZVZhbHVlKVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2FsZW5kYXItYm9keS1yYW5nZS1lbmRdPVwiX2lzUmFuZ2VFbmQoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LWluLXJhbmdlXT1cIl9pc0luUmFuZ2UoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLXN0YXJ0XT1cIl9pc0NvbXBhcmlzb25CcmlkZ2VTdGFydChpdGVtLmNvbXBhcmVWYWx1ZSwgcm93SW5kZXgsIGNvbEluZGV4KVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1lbmRdPVwiX2lzQ29tcGFyaXNvbkJyaWRnZUVuZChpdGVtLmNvbXBhcmVWYWx1ZSwgcm93SW5kZXgsIGNvbEluZGV4KVwiXHJcbiAgICAgIFtjbGFzcy5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLXN0YXJ0XT1cIl9pc0NvbXBhcmlzb25TdGFydChpdGVtLmNvbXBhcmVWYWx1ZSlcIlxyXG4gICAgICBbY2xhc3MubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1lbmRdPVwiX2lzQ29tcGFyaXNvbkVuZChpdGVtLmNvbXBhcmVWYWx1ZSlcIlxyXG4gICAgICBbY2xhc3MubWF0LWNhbGVuZGFyLWJvZHktaW4tY29tcGFyaXNvbi1yYW5nZV09XCJfaXNJbkNvbXBhcmlzb25SYW5nZShpdGVtLmNvbXBhcmVWYWx1ZSlcIlxyXG4gICAgICBbY2xhc3MubWF0LWNhbGVuZGFyLWJvZHktcHJldmlldy1zdGFydF09XCJfaXNQcmV2aWV3U3RhcnQoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LXByZXZpZXctZW5kXT1cIl9pc1ByZXZpZXdFbmQoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LWluLXByZXZpZXddPVwiX2lzSW5QcmV2aWV3KGl0ZW0uY29tcGFyZVZhbHVlKVwiXHJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbS5hcmlhTGFiZWxcIlxyXG4gICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWQgfHwgbnVsbFwiXHJcbiAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgW2F0dHIuYXJpYS1jdXJyZW50XT1cInRvZGF5VmFsdWUgPT09IGl0ZW0uY29tcGFyZVZhbHVlID8gJ2RhdGUnIDogbnVsbFwiXHJcbiAgICAgIChjbGljayk9XCJfY2VsbENsaWNrZWQoaXRlbSwgJGV2ZW50KVwiXHJcbiAgICAgIFtzdHlsZS53aWR0aF09XCJfY2VsbFdpZHRoXCJcclxuICAgICAgW3N0eWxlLnBhZGRpbmdUb3BdPVwiX2NlbGxQYWRkaW5nXCJcclxuICAgICAgW3N0eWxlLnBhZGRpbmdCb3R0b21dPVwiX2NlbGxQYWRkaW5nXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQgbWF0LWZvY3VzLWluZGljYXRvclwiXHJcbiAgICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKGl0ZW0uY29tcGFyZVZhbHVlKVwiXHJcbiAgICAgICAgW2NsYXNzLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsXT1cIl9pc0NvbXBhcmlzb25JZGVudGljYWwoaXRlbS5jb21wYXJlVmFsdWUpXCJcclxuICAgICAgICBbY2xhc3MubWF0LWNhbGVuZGFyLWJvZHktdG9kYXldPVwidG9kYXlWYWx1ZSA9PT0gaXRlbS5jb21wYXJlVmFsdWVcIj5cclxuICAgICAgICB7e2l0ZW0uZGlzcGxheVZhbHVlfX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtY2FsZW5kYXItYm9keS1jZWxsLXByZXZpZXdcIj48L2Rpdj5cclxuICA8L3RkPlxyXG48L3RyPlxyXG4iXX0=