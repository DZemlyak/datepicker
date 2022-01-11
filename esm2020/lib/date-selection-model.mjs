/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { DateAdapter } from './core';
import * as i0 from "@angular/core";
import * as i1 from "./core";
/** A class representing a range of dates. */
export class DateRange {
    constructor(
    /** The start date of the range. */
    start, 
    /** The end date of the range. */
    end) {
        this.start = start;
        this.end = end;
    }
}
/**
 * A selection model containing a date selection.
 * @docs-private
 */
export class MatDateSelectionModel {
    constructor(
    /** The current selection. */
    selection, _adapter) {
        this.selection = selection;
        this._adapter = _adapter;
        this._selectionChanged = new Subject();
        /** Emits when the selection has changed. */
        this.selectionChanged = this._selectionChanged;
        this.selection = selection;
    }
    /**
     * Updates the current selection in the model.
     * @param value New selection that should be assigned.
     * @param source Object that triggered the selection change.
     */
    updateSelection(value, source) {
        const oldValue = this.selection;
        this.selection = value;
        this._selectionChanged.next({ selection: value, source, oldValue });
    }
    ngOnDestroy() {
        this._selectionChanged.complete();
    }
    _isValidDateInstance(date) {
        return this._adapter.isDateInstance(date) && this._adapter.isValid(date);
    }
}
/** @nocollapse */ /** @nocollapse */ MatDateSelectionModel.ɵfac = function MatDateSelectionModel_Factory(t) { i0.ɵɵinvalidFactory(); };
/** @nocollapse */ /** @nocollapse */ MatDateSelectionModel.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: MatDateSelectionModel });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDateSelectionModel, [{
        type: Directive
    }], function () { return [{ type: undefined }, { type: i1.DateAdapter }]; }, null); })();
/**
 * A selection model that contains a single date.
 * @docs-private
 */
export class MatSingleDateSelectionModel extends MatDateSelectionModel {
    constructor(adapter) {
        super(null, adapter);
    }
    /**
     * Adds a date to the current selection. In the case of a single date selection, the added date
     * simply overwrites the previous selection
     */
    add(date) {
        super.updateSelection(date, this);
    }
    /** Adds a date as pending to update if the user selects the date partially. */
    queue(date) {
        this.queuedValue = date;
    }
    processQueue() {
        if (this.queuedValue) {
            this.updateSelection(this.queuedValue, this);
        }
    }
    /** Checks whether the current selection is valid. */
    isValid() {
        return this.selection != null && this._isValidDateInstance(this.selection);
    }
    /**
     * Checks whether the current selection is complete. In the case of a single date selection, this
     * is true if the current selection is not null.
     */
    isComplete() {
        return this.selection != null;
    }
    /** Clones the selection model. */
    clone() {
        const clone = new MatSingleDateSelectionModel(this._adapter);
        clone.updateSelection(this.selection, this);
        if (this.queuedValue) {
            clone.queue(this.queuedValue);
        }
        return clone;
    }
}
/** @nocollapse */ /** @nocollapse */ MatSingleDateSelectionModel.ɵfac = function MatSingleDateSelectionModel_Factory(t) { return new (t || MatSingleDateSelectionModel)(i0.ɵɵinject(i1.DateAdapter)); };
/** @nocollapse */ /** @nocollapse */ MatSingleDateSelectionModel.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: MatSingleDateSelectionModel, factory: MatSingleDateSelectionModel.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatSingleDateSelectionModel, [{
        type: Injectable
    }], function () { return [{ type: i1.DateAdapter }]; }, null); })();
/**
 * A selection model that contains a date range.
 * @docs-private
 */
export class MatRangeDateSelectionModel extends MatDateSelectionModel {
    constructor(adapter) {
        super(new DateRange(null, null), adapter);
    }
    /**
     * Adds a date to the current selection. In the case of a date range selection, the added date
     * fills in the next `null` value in the range. If both the start and the end already have a date,
     * the selection is reset so that the given date is the new `start` and the `end` is null.
     */
    add(date) {
        let { start, end } = this.selection;
        if (start == null) {
            start = date;
        }
        else if (end == null) {
            end = date;
        }
        else {
            start = date;
            end = null;
        }
        super.updateSelection(new DateRange(start, end), this);
    }
    queue(date) { }
    processQueue() { }
    /** Checks whether the current selection is valid. */
    isValid() {
        const { start, end } = this.selection;
        // Empty ranges are valid.
        if (start == null && end == null) {
            return true;
        }
        // Complete ranges are only valid if both dates are valid and the start is before the end.
        if (start != null && end != null) {
            return (this._isValidDateInstance(start) &&
                this._isValidDateInstance(end) &&
                this._adapter.compareDate(start, end) <= 0);
        }
        // Partial ranges are valid if the start/end is valid.
        return ((start == null || this._isValidDateInstance(start)) &&
            (end == null || this._isValidDateInstance(end)));
    }
    /**
     * Checks whether the current selection is complete. In the case of a date range selection, this
     * is true if the current selection has a non-null `start` and `end`.
     */
    isComplete() {
        return this.selection.start != null && this.selection.end != null;
    }
    /** Clones the selection model. */
    clone() {
        const clone = new MatRangeDateSelectionModel(this._adapter);
        clone.updateSelection(this.selection, this);
        return clone;
    }
}
/** @nocollapse */ /** @nocollapse */ MatRangeDateSelectionModel.ɵfac = function MatRangeDateSelectionModel_Factory(t) { return new (t || MatRangeDateSelectionModel)(i0.ɵɵinject(i1.DateAdapter)); };
/** @nocollapse */ /** @nocollapse */ MatRangeDateSelectionModel.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: MatRangeDateSelectionModel, factory: MatRangeDateSelectionModel.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatRangeDateSelectionModel, [{
        type: Injectable
    }], function () { return [{ type: i1.DateAdapter }]; }, null); })();
/** @docs-private */
export function MAT_SINGLE_DATE_SELECTION_MODEL_FACTORY(parent, adapter) {
    return parent || new MatSingleDateSelectionModel(adapter);
}
/**
 * Used to provide a single selection model to a component.
 * @docs-private
 */
export const MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER = {
    provide: MatDateSelectionModel,
    deps: [[new Optional(), new SkipSelf(), MatDateSelectionModel], DateAdapter],
    useFactory: MAT_SINGLE_DATE_SELECTION_MODEL_FACTORY,
};
/** @docs-private */
export function MAT_RANGE_DATE_SELECTION_MODEL_FACTORY(parent, adapter) {
    return parent || new MatRangeDateSelectionModel(adapter);
}
/**
 * Used to provide a range selection model to a component.
 * @docs-private
 */
export const MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER = {
    provide: MatDateSelectionModel,
    deps: [[new Optional(), new SkipSelf(), MatDateSelectionModel], DateAdapter],
    useFactory: MAT_RANGE_DATE_SELECTION_MODEL_FACTORY,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zZWxlY3Rpb24tbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXNlbGVjdGlvbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFtQixVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7QUFFckMsNkNBQTZDO0FBQzdDLE1BQU0sT0FBTyxTQUFTO0lBUXBCO0lBQ0UsbUNBQW1DO0lBQzFCLEtBQWU7SUFDeEIsaUNBQWlDO0lBQ3hCLEdBQWE7UUFGYixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBRWYsUUFBRyxHQUFILEdBQUcsQ0FBVTtJQUNwQixDQUFDO0NBQ047QUF1QkQ7OztHQUdHO0FBRUgsTUFBTSxPQUFnQixxQkFBcUI7SUFPekM7SUFDRSw2QkFBNkI7SUFDcEIsU0FBWSxFQUNYLFFBQXdCO1FBRHpCLGNBQVMsR0FBVCxTQUFTLENBQUc7UUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQVJuQixzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBK0IsQ0FBQztRQUVoRiw0Q0FBNEM7UUFDNUMscUJBQWdCLEdBQTRDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQU9qRixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxLQUFRLEVBQUUsTUFBZTtRQUN2QyxNQUFNLFFBQVEsR0FBSSxJQUF5QixDQUFDLFNBQVMsQ0FBQztRQUNyRCxJQUF5QixDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixD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QUFDOzswSUFsRVUsMEJBQTBCO2tJQUExQiwwQkFBMEIsV0FBMUIsMEJBQTBCO3VGQUExQiwwQkFBMEI7Y0FEdEMsVUFBVTs7QUFzRVgsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSx1Q0FBdUMsQ0FDckQsTUFBNEMsRUFDNUMsT0FBNkI7SUFFN0IsT0FBTyxNQUFNLElBQUksSUFBSSwyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0NBQXdDLEdBQW9CO0lBQ3ZFLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUscUJBQXFCLENBQUMsRUFBRSxXQUFXLENBQUM7SUFDNUUsVUFBVSxFQUFFLHVDQUF1QztDQUNwRCxDQUFDO0FBRUYsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxzQ0FBc0MsQ0FDcEQsTUFBNEMsRUFDNUMsT0FBNkI7SUFFN0IsT0FBTyxNQUFNLElBQUksSUFBSSwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUNBQXVDLEdBQW9CO0lBQ3RFLE9BQU8sRUFBRSxxQkFBcUI7SUFDOUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUscUJBQXFCLENBQUMsRUFBRSxXQUFXLENBQUM7SUFDNUUsVUFBVSxFQUFFLHNDQUFzQztDQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEZhY3RvcnlQcm92aWRlciwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFNraXBTZWxmLCBPbkRlc3Ryb3ksIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlJztcclxuXHJcbi8qKiBBIGNsYXNzIHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIGRhdGVzLiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlPEQ+IHtcclxuICAvKipcclxuICAgKiBFbnN1cmVzIHRoYXQgb2JqZWN0cyB3aXRoIGEgYHN0YXJ0YCBhbmQgYGVuZGAgcHJvcGVydHkgY2FuJ3QgYmUgYXNzaWduZWQgdG8gYSB2YXJpYWJsZSB0aGF0XHJcbiAgICogZXhwZWN0cyBhIGBEYXRlUmFuZ2VgXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxyXG4gIHByaXZhdGUgX2Rpc2FibGVTdHJ1Y3R1cmFsRXF1aXZhbGVuY3k6IG5ldmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIC8qKiBUaGUgc3RhcnQgZGF0ZSBvZiB0aGUgcmFuZ2UuICovXHJcbiAgICByZWFkb25seSBzdGFydDogRCB8IG51bGwsXHJcbiAgICAvKiogVGhlIGVuZCBkYXRlIG9mIHRoZSByYW5nZS4gKi9cclxuICAgIHJlYWRvbmx5IGVuZDogRCB8IG51bGwsXHJcbiAgKSB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmRpdGlvbmFsbHkgcGlja3MgdGhlIGRhdGUgdHlwZSwgaWYgYSBEYXRlUmFuZ2UgaXMgcGFzc2VkIGluLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBFeHRyYWN0RGF0ZVR5cGVGcm9tU2VsZWN0aW9uPFQ+ID0gVCBleHRlbmRzIERhdGVSYW5nZTxpbmZlciBEPiA/IEQgOiBOb25OdWxsYWJsZTxUPjtcclxuXHJcbi8qKlxyXG4gKiBFdmVudCBlbWl0dGVkIGJ5IHRoZSBkYXRlIHNlbGVjdGlvbiBtb2RlbCB3aGVuIGl0cyBzZWxlY3Rpb24gY2hhbmdlcy5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8Uz4ge1xyXG4gIC8qKiBOZXcgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb24uICovXHJcbiAgc2VsZWN0aW9uOiBTO1xyXG5cclxuICAvKiogT2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBjaGFuZ2UuICovXHJcbiAgc291cmNlOiB1bmtub3duO1xyXG5cclxuICAvKiogUHJldmlvdXMgdmFsdWUgKi9cclxuICBvbGRWYWx1ZT86IFM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCBjb250YWluaW5nIGEgZGF0ZSBzZWxlY3Rpb24uXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFMsIEQgPSBFeHRyYWN0RGF0ZVR5cGVGcm9tU2VsZWN0aW9uPFM+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9zZWxlY3Rpb25DaGFuZ2VkID0gbmV3IFN1YmplY3Q8RGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPFM+PigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xyXG4gIHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8RGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPFM+PiA9IHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgIC8qKiBUaGUgY3VycmVudCBzZWxlY3Rpb24uICovXHJcbiAgICByZWFkb25seSBzZWxlY3Rpb246IFMsXHJcbiAgICBwcm90ZWN0ZWQgX2FkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpbiB0aGUgbW9kZWwuXHJcbiAgICogQHBhcmFtIHZhbHVlIE5ldyBzZWxlY3Rpb24gdGhhdCBzaG91bGQgYmUgYXNzaWduZWQuXHJcbiAgICogQHBhcmFtIHNvdXJjZSBPYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhlIHNlbGVjdGlvbiBjaGFuZ2UuXHJcbiAgICovXHJcbiAgdXBkYXRlU2VsZWN0aW9uKHZhbHVlOiBTLCBzb3VyY2U6IHVua25vd24pIHtcclxuICAgIGNvbnN0IG9sZFZhbHVlID0gKHRoaXMgYXMgeyBzZWxlY3Rpb246IFMgfSkuc2VsZWN0aW9uO1xyXG4gICAgKHRoaXMgYXMgeyBzZWxlY3Rpb246IFMgfSkuc2VsZWN0aW9uID0gdmFsdWU7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLm5leHQoeyBzZWxlY3Rpb246IHZhbHVlLCBzb3VyY2UsIG9sZFZhbHVlIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2lzVmFsaWREYXRlSW5zdGFuY2UoZGF0ZTogRCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZGF0ZSkgJiYgdGhpcy5fYWRhcHRlci5pc1ZhbGlkKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEFkZHMgYSBkYXRlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gKi9cclxuICBhYnN0cmFjdCBhZGQoZGF0ZTogRCB8IG51bGwpOiB2b2lkO1xyXG5cclxuICAvKiogQWRkcyBhIGRhdGUgYXMgcGVuZGluZyB0byB1cGRhdGUgaWYgdGhlIHVzZXIgc2VsZWN0cyB0aGUgZGF0ZSBwYXJ0aWFsbHkuICovXHJcbiAgYWJzdHJhY3QgcXVldWUoZGF0ZTogRCB8IG51bGwpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHByb2Nlc3NRdWV1ZSgpOiB2b2lkO1xyXG5cclxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIHZhbGlkLiAqL1xyXG4gIGFic3RyYWN0IGlzVmFsaWQoKTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpcyBjb21wbGV0ZS4gKi9cclxuICBhYnN0cmFjdCBpc0NvbXBsZXRlKCk6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBhYnN0cmFjdCBjbG9uZSgpOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCB0aGF0IGNvbnRhaW5zIGEgc2luZ2xlIGRhdGUuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbDxEPiBleHRlbmRzIE1hdERhdGVTZWxlY3Rpb25Nb2RlbDxEIHwgbnVsbCwgRD4ge1xyXG4gIC8qKiBRdWV1ZSBzdG9yZSAqL1xyXG4gIHF1ZXVlZFZhbHVlOiBEO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPikge1xyXG4gICAgc3VwZXIobnVsbCwgYWRhcHRlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgZGF0ZSB0byB0aGUgY3VycmVudCBzZWxlY3Rpb24uIEluIHRoZSBjYXNlIG9mIGEgc2luZ2xlIGRhdGUgc2VsZWN0aW9uLCB0aGUgYWRkZWQgZGF0ZVxyXG4gICAqIHNpbXBseSBvdmVyd3JpdGVzIHRoZSBwcmV2aW91cyBzZWxlY3Rpb25cclxuICAgKi9cclxuICBhZGQoZGF0ZTogRCB8IG51bGwpIHtcclxuICAgIHN1cGVyLnVwZGF0ZVNlbGVjdGlvbihkYXRlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKiBBZGRzIGEgZGF0ZSBhcyBwZW5kaW5nIHRvIHVwZGF0ZSBpZiB0aGUgdXNlciBzZWxlY3RzIHRoZSBkYXRlIHBhcnRpYWxseS4gKi9cclxuICBxdWV1ZShkYXRlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5xdWV1ZWRWYWx1ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzUXVldWUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5xdWV1ZWRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbih0aGlzLnF1ZXVlZFZhbHVlLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgdmFsaWQuICovXHJcbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbiAhPSBudWxsICYmIHRoaXMuX2lzVmFsaWREYXRlSW5zdGFuY2UodGhpcy5zZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIGNvbXBsZXRlLiBJbiB0aGUgY2FzZSBvZiBhIHNpbmdsZSBkYXRlIHNlbGVjdGlvbiwgdGhpc1xyXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIG5vdCBudWxsLlxyXG4gICAqL1xyXG4gIGlzQ29tcGxldGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24gIT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBjbG9uZSgpIHtcclxuICAgIGNvbnN0IGNsb25lID0gbmV3IE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbDxEPih0aGlzLl9hZGFwdGVyKTtcclxuICAgIGNsb25lLnVwZGF0ZVNlbGVjdGlvbih0aGlzLnNlbGVjdGlvbiwgdGhpcyk7XHJcbiAgICBpZiAodGhpcy5xdWV1ZWRWYWx1ZSkge1xyXG4gICAgICBjbG9uZS5xdWV1ZSh0aGlzLnF1ZXVlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCB0aGF0IGNvbnRhaW5zIGEgZGF0ZSByYW5nZS5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWF0UmFuZ2VEYXRlU2VsZWN0aW9uTW9kZWw8RD4gZXh0ZW5kcyBNYXREYXRlU2VsZWN0aW9uTW9kZWw8RGF0ZVJhbmdlPEQ+LCBEPiB7XHJcbiAgY29uc3RydWN0b3IoYWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4pIHtcclxuICAgIHN1cGVyKG5ldyBEYXRlUmFuZ2U8RD4obnVsbCwgbnVsbCksIGFkYXB0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGRhdGUgdG8gdGhlIGN1cnJlbnQgc2VsZWN0aW9uLiBJbiB0aGUgY2FzZSBvZiBhIGRhdGUgcmFuZ2Ugc2VsZWN0aW9uLCB0aGUgYWRkZWQgZGF0ZVxyXG4gICAqIGZpbGxzIGluIHRoZSBuZXh0IGBudWxsYCB2YWx1ZSBpbiB0aGUgcmFuZ2UuIElmIGJvdGggdGhlIHN0YXJ0IGFuZCB0aGUgZW5kIGFscmVhZHkgaGF2ZSBhIGRhdGUsXHJcbiAgICogdGhlIHNlbGVjdGlvbiBpcyByZXNldCBzbyB0aGF0IHRoZSBnaXZlbiBkYXRlIGlzIHRoZSBuZXcgYHN0YXJ0YCBhbmQgdGhlIGBlbmRgIGlzIG51bGwuXHJcbiAgICovXHJcbiAgYWRkKGRhdGU6IEQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSB0aGlzLnNlbGVjdGlvbjtcclxuXHJcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xyXG4gICAgICBzdGFydCA9IGRhdGU7XHJcbiAgICB9IGVsc2UgaWYgKGVuZCA9PSBudWxsKSB7XHJcbiAgICAgIGVuZCA9IGRhdGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydCA9IGRhdGU7XHJcbiAgICAgIGVuZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwZXIudXBkYXRlU2VsZWN0aW9uKG5ldyBEYXRlUmFuZ2U8RD4oc3RhcnQsIGVuZCksIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcXVldWUoZGF0ZTogRCB8IG51bGwpIHsgfVxyXG4gIHByb2Nlc3NRdWV1ZSgpIHsgfVxyXG5cclxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIHZhbGlkLiAqL1xyXG4gIGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuc2VsZWN0aW9uO1xyXG5cclxuICAgIC8vIEVtcHR5IHJhbmdlcyBhcmUgdmFsaWQuXHJcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCAmJiBlbmQgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wbGV0ZSByYW5nZXMgYXJlIG9ubHkgdmFsaWQgaWYgYm90aCBkYXRlcyBhcmUgdmFsaWQgYW5kIHRoZSBzdGFydCBpcyBiZWZvcmUgdGhlIGVuZC5cclxuICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShzdGFydCkgJiZcclxuICAgICAgICB0aGlzLl9pc1ZhbGlkRGF0ZUluc3RhbmNlKGVuZCkgJiZcclxuICAgICAgICB0aGlzLl9hZGFwdGVyLmNvbXBhcmVEYXRlKHN0YXJ0LCBlbmQpIDw9IDBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYXJ0aWFsIHJhbmdlcyBhcmUgdmFsaWQgaWYgdGhlIHN0YXJ0L2VuZCBpcyB2YWxpZC5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIChzdGFydCA9PSBudWxsIHx8IHRoaXMuX2lzVmFsaWREYXRlSW5zdGFuY2Uoc3RhcnQpKSAmJlxyXG4gICAgICAoZW5kID09IG51bGwgfHwgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShlbmQpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpcyBjb21wbGV0ZS4gSW4gdGhlIGNhc2Ugb2YgYSBkYXRlIHJhbmdlIHNlbGVjdGlvbiwgdGhpc1xyXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBhIG5vbi1udWxsIGBzdGFydGAgYW5kIGBlbmRgLlxyXG4gICAqL1xyXG4gIGlzQ29tcGxldGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc3RhcnQgIT0gbnVsbCAmJiB0aGlzLnNlbGVjdGlvbi5lbmQgIT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBjbG9uZSgpIHtcclxuICAgIGNvbnN0IGNsb25lID0gbmV3IE1hdFJhbmdlRGF0ZVNlbGVjdGlvbk1vZGVsPEQ+KHRoaXMuX2FkYXB0ZXIpO1xyXG4gICAgY2xvbmUudXBkYXRlU2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uLCB0aGlzKTtcclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkoXHJcbiAgcGFyZW50OiBNYXRTaW5nbGVEYXRlU2VsZWN0aW9uTW9kZWw8dW5rbm93bj4sXHJcbiAgYWRhcHRlcjogRGF0ZUFkYXB0ZXI8dW5rbm93bj4sXHJcbikge1xyXG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbChhZGFwdGVyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHNpbmdsZSBzZWxlY3Rpb24gbW9kZWwgdG8gYSBjb21wb25lbnQuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogTWF0RGF0ZVNlbGVjdGlvbk1vZGVsLFxyXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBNYXREYXRlU2VsZWN0aW9uTW9kZWxdLCBEYXRlQWRhcHRlcl0sXHJcbiAgdXNlRmFjdG9yeTogTUFUX1NJTkdMRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZLFxyXG59O1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZKFxyXG4gIHBhcmVudDogTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPHVua25vd24+LFxyXG4gIGFkYXB0ZXI6IERhdGVBZGFwdGVyPHVua25vd24+LFxyXG4pIHtcclxuICByZXR1cm4gcGFyZW50IHx8IG5ldyBNYXRSYW5nZURhdGVTZWxlY3Rpb25Nb2RlbChhZGFwdGVyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHJhbmdlIHNlbGVjdGlvbiBtb2RlbCB0byBhIGNvbXBvbmVudC5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IE1hdERhdGVTZWxlY3Rpb25Nb2RlbCxcclxuICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsXSwgRGF0ZUFkYXB0ZXJdLFxyXG4gIHVzZUZhY3Rvcnk6IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZLFxyXG59O1xyXG4iXX0=