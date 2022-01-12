/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { DateAdapter } from '@matheo/datepicker/core';
import * as i0 from "@angular/core";
import * as i1 from "@matheo/datepicker/core";
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
/** @nocollapse */ /** @nocollapse */ MatDateSelectionModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateSelectionModel, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatDateSelectionModel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatDateSelectionModel, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateSelectionModel, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined }, { type: i1.DateAdapter }]; } });
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
/** @nocollapse */ /** @nocollapse */ MatSingleDateSelectionModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatSingleDateSelectionModel, deps: [{ token: i1.DateAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MatSingleDateSelectionModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatSingleDateSelectionModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatSingleDateSelectionModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }]; } });
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
/** @nocollapse */ /** @nocollapse */ MatRangeDateSelectionModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatRangeDateSelectionModel, deps: [{ token: i1.DateAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MatRangeDateSelectionModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatRangeDateSelectionModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatRangeDateSelectionModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }]; } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zZWxlY3Rpb24tbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXNlbGVjdGlvbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFtQixVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQUV0RCw2Q0FBNkM7QUFDN0MsTUFBTSxPQUFPLFNBQVM7SUFRcEI7SUFDRSxtQ0FBbUM7SUFDMUIsS0FBZTtJQUN4QixpQ0FBaUM7SUFDeEIsR0FBYTtRQUZiLFVBQUssR0FBTCxLQUFLLENBQVU7UUFFZixRQUFHLEdBQUgsR0FBRyxDQUFVO0lBQ3BCLENBQUM7Q0FDTjtBQXVCRDs7O0dBR0c7QUFFSCxNQUFNLE9BQWdCLHFCQUFxQjtJQU96QztJQUNFLDZCQUE2QjtJQUNwQixTQUFZLEVBQ1gsUUFBd0I7UUFEekIsY0FBUyxHQUFULFNBQVMsQ0FBRztRQUNYLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBUm5CLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUErQixDQUFDO1FBRWhGLDRDQUE0QztRQUM1QyxxQkFBZ0IsR0FBNEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBT2pGLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZUFBZSxDQUFDLEtBQVEsRUFBRSxNQUFlO1FBQ3ZDLE1BQU0sUUFBUSxHQUFJLElBQXlCLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQXlCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsaUJBQWlC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Q2YsQ0FBQzs7NkpBbEVVLDBCQUEwQjtpS0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVU7O0FBc0VYLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsdUNBQXVDLENBQ3JELE1BQTRDLEVBQzVDLE9BQTZCO0lBRTdCLE9BQU8sTUFBTSxJQUFJLElBQUksMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdDQUF3QyxHQUFvQjtJQUN2RSxPQUFPLEVBQUUscUJBQXFCO0lBQzlCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLHFCQUFxQixDQUFDLEVBQUUsV0FBVyxDQUFDO0lBQzVFLFVBQVUsRUFBRSx1Q0FBdUM7Q0FDcEQsQ0FBQztBQUVGLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsc0NBQXNDLENBQ3BELE1BQTRDLEVBQzVDLE9BQTZCO0lBRTdCLE9BQU8sTUFBTSxJQUFJLElBQUksMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVDQUF1QyxHQUFvQjtJQUN0RSxPQUFPLEVBQUUscUJBQXFCO0lBQzlCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLHFCQUFxQixDQUFDLEVBQUUsV0FBVyxDQUFDO0lBQzVFLFVBQVUsRUFBRSxzQ0FBc0M7Q0FDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBGYWN0b3J5UHJvdmlkZXIsIEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiwgT25EZXN0cm95LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BtYXRoZW8vZGF0ZXBpY2tlci9jb3JlJztcclxuXHJcbi8qKiBBIGNsYXNzIHJlcHJlc2VudGluZyBhIHJhbmdlIG9mIGRhdGVzLiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlPEQ+IHtcclxuICAvKipcclxuICAgKiBFbnN1cmVzIHRoYXQgb2JqZWN0cyB3aXRoIGEgYHN0YXJ0YCBhbmQgYGVuZGAgcHJvcGVydHkgY2FuJ3QgYmUgYXNzaWduZWQgdG8gYSB2YXJpYWJsZSB0aGF0XHJcbiAgICogZXhwZWN0cyBhIGBEYXRlUmFuZ2VgXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxyXG4gIHByaXZhdGUgX2Rpc2FibGVTdHJ1Y3R1cmFsRXF1aXZhbGVuY3k6IG5ldmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIC8qKiBUaGUgc3RhcnQgZGF0ZSBvZiB0aGUgcmFuZ2UuICovXHJcbiAgICByZWFkb25seSBzdGFydDogRCB8IG51bGwsXHJcbiAgICAvKiogVGhlIGVuZCBkYXRlIG9mIHRoZSByYW5nZS4gKi9cclxuICAgIHJlYWRvbmx5IGVuZDogRCB8IG51bGwsXHJcbiAgKSB7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmRpdGlvbmFsbHkgcGlja3MgdGhlIGRhdGUgdHlwZSwgaWYgYSBEYXRlUmFuZ2UgaXMgcGFzc2VkIGluLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBFeHRyYWN0RGF0ZVR5cGVGcm9tU2VsZWN0aW9uPFQ+ID0gVCBleHRlbmRzIERhdGVSYW5nZTxpbmZlciBEPiA/IEQgOiBOb25OdWxsYWJsZTxUPjtcclxuXHJcbi8qKlxyXG4gKiBFdmVudCBlbWl0dGVkIGJ5IHRoZSBkYXRlIHNlbGVjdGlvbiBtb2RlbCB3aGVuIGl0cyBzZWxlY3Rpb24gY2hhbmdlcy5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBEYXRlU2VsZWN0aW9uTW9kZWxDaGFuZ2U8Uz4ge1xyXG4gIC8qKiBOZXcgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb24uICovXHJcbiAgc2VsZWN0aW9uOiBTO1xyXG5cclxuICAvKiogT2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBjaGFuZ2UuICovXHJcbiAgc291cmNlOiB1bmtub3duO1xyXG5cclxuICAvKiogUHJldmlvdXMgdmFsdWUgKi9cclxuICBvbGRWYWx1ZT86IFM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCBjb250YWluaW5nIGEgZGF0ZSBzZWxlY3Rpb24uXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFMsIEQgPSBFeHRyYWN0RGF0ZVR5cGVGcm9tU2VsZWN0aW9uPFM+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9zZWxlY3Rpb25DaGFuZ2VkID0gbmV3IFN1YmplY3Q8RGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPFM+PigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xyXG4gIHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8RGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPFM+PiA9IHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQ7XHJcblxyXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgIC8qKiBUaGUgY3VycmVudCBzZWxlY3Rpb24uICovXHJcbiAgICByZWFkb25seSBzZWxlY3Rpb246IFMsXHJcbiAgICBwcm90ZWN0ZWQgX2FkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpbiB0aGUgbW9kZWwuXHJcbiAgICogQHBhcmFtIHZhbHVlIE5ldyBzZWxlY3Rpb24gdGhhdCBzaG91bGQgYmUgYXNzaWduZWQuXHJcbiAgICogQHBhcmFtIHNvdXJjZSBPYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhlIHNlbGVjdGlvbiBjaGFuZ2UuXHJcbiAgICovXHJcbiAgdXBkYXRlU2VsZWN0aW9uKHZhbHVlOiBTLCBzb3VyY2U6IHVua25vd24pIHtcclxuICAgIGNvbnN0IG9sZFZhbHVlID0gKHRoaXMgYXMgeyBzZWxlY3Rpb246IFMgfSkuc2VsZWN0aW9uO1xyXG4gICAgKHRoaXMgYXMgeyBzZWxlY3Rpb246IFMgfSkuc2VsZWN0aW9uID0gdmFsdWU7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLm5leHQoeyBzZWxlY3Rpb246IHZhbHVlLCBzb3VyY2UsIG9sZFZhbHVlIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2lzVmFsaWREYXRlSW5zdGFuY2UoZGF0ZTogRCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FkYXB0ZXIuaXNEYXRlSW5zdGFuY2UoZGF0ZSkgJiYgdGhpcy5fYWRhcHRlci5pc1ZhbGlkKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEFkZHMgYSBkYXRlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gKi9cclxuICBhYnN0cmFjdCBhZGQoZGF0ZTogRCB8IG51bGwpOiB2b2lkO1xyXG5cclxuICAvKiogQWRkcyBhIGRhdGUgYXMgcGVuZGluZyB0byB1cGRhdGUgaWYgdGhlIHVzZXIgc2VsZWN0cyB0aGUgZGF0ZSBwYXJ0aWFsbHkuICovXHJcbiAgYWJzdHJhY3QgcXVldWUoZGF0ZTogRCB8IG51bGwpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHByb2Nlc3NRdWV1ZSgpOiB2b2lkO1xyXG5cclxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIHZhbGlkLiAqL1xyXG4gIGFic3RyYWN0IGlzVmFsaWQoKTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpcyBjb21wbGV0ZS4gKi9cclxuICBhYnN0cmFjdCBpc0NvbXBsZXRlKCk6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBhYnN0cmFjdCBjbG9uZSgpOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCB0aGF0IGNvbnRhaW5zIGEgc2luZ2xlIGRhdGUuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbDxEPiBleHRlbmRzIE1hdERhdGVTZWxlY3Rpb25Nb2RlbDxEIHwgbnVsbCwgRD4ge1xyXG4gIC8qKiBRdWV1ZSBzdG9yZSAqL1xyXG4gIHF1ZXVlZFZhbHVlOiBEO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPikge1xyXG4gICAgc3VwZXIobnVsbCwgYWRhcHRlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgZGF0ZSB0byB0aGUgY3VycmVudCBzZWxlY3Rpb24uIEluIHRoZSBjYXNlIG9mIGEgc2luZ2xlIGRhdGUgc2VsZWN0aW9uLCB0aGUgYWRkZWQgZGF0ZVxyXG4gICAqIHNpbXBseSBvdmVyd3JpdGVzIHRoZSBwcmV2aW91cyBzZWxlY3Rpb25cclxuICAgKi9cclxuICBhZGQoZGF0ZTogRCB8IG51bGwpIHtcclxuICAgIHN1cGVyLnVwZGF0ZVNlbGVjdGlvbihkYXRlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKiBBZGRzIGEgZGF0ZSBhcyBwZW5kaW5nIHRvIHVwZGF0ZSBpZiB0aGUgdXNlciBzZWxlY3RzIHRoZSBkYXRlIHBhcnRpYWxseS4gKi9cclxuICBxdWV1ZShkYXRlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5xdWV1ZWRWYWx1ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzUXVldWUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5xdWV1ZWRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbih0aGlzLnF1ZXVlZFZhbHVlLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgdmFsaWQuICovXHJcbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbiAhPSBudWxsICYmIHRoaXMuX2lzVmFsaWREYXRlSW5zdGFuY2UodGhpcy5zZWxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIGNvbXBsZXRlLiBJbiB0aGUgY2FzZSBvZiBhIHNpbmdsZSBkYXRlIHNlbGVjdGlvbiwgdGhpc1xyXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIG5vdCBudWxsLlxyXG4gICAqL1xyXG4gIGlzQ29tcGxldGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24gIT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBjbG9uZSgpIHtcclxuICAgIGNvbnN0IGNsb25lID0gbmV3IE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbDxEPih0aGlzLl9hZGFwdGVyKTtcclxuICAgIGNsb25lLnVwZGF0ZVNlbGVjdGlvbih0aGlzLnNlbGVjdGlvbiwgdGhpcyk7XHJcbiAgICBpZiAodGhpcy5xdWV1ZWRWYWx1ZSkge1xyXG4gICAgICBjbG9uZS5xdWV1ZSh0aGlzLnF1ZXVlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCB0aGF0IGNvbnRhaW5zIGEgZGF0ZSByYW5nZS5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWF0UmFuZ2VEYXRlU2VsZWN0aW9uTW9kZWw8RD4gZXh0ZW5kcyBNYXREYXRlU2VsZWN0aW9uTW9kZWw8RGF0ZVJhbmdlPEQ+LCBEPiB7XHJcbiAgY29uc3RydWN0b3IoYWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4pIHtcclxuICAgIHN1cGVyKG5ldyBEYXRlUmFuZ2U8RD4obnVsbCwgbnVsbCksIGFkYXB0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIGRhdGUgdG8gdGhlIGN1cnJlbnQgc2VsZWN0aW9uLiBJbiB0aGUgY2FzZSBvZiBhIGRhdGUgcmFuZ2Ugc2VsZWN0aW9uLCB0aGUgYWRkZWQgZGF0ZVxyXG4gICAqIGZpbGxzIGluIHRoZSBuZXh0IGBudWxsYCB2YWx1ZSBpbiB0aGUgcmFuZ2UuIElmIGJvdGggdGhlIHN0YXJ0IGFuZCB0aGUgZW5kIGFscmVhZHkgaGF2ZSBhIGRhdGUsXHJcbiAgICogdGhlIHNlbGVjdGlvbiBpcyByZXNldCBzbyB0aGF0IHRoZSBnaXZlbiBkYXRlIGlzIHRoZSBuZXcgYHN0YXJ0YCBhbmQgdGhlIGBlbmRgIGlzIG51bGwuXHJcbiAgICovXHJcbiAgYWRkKGRhdGU6IEQgfCBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSB0aGlzLnNlbGVjdGlvbjtcclxuXHJcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xyXG4gICAgICBzdGFydCA9IGRhdGU7XHJcbiAgICB9IGVsc2UgaWYgKGVuZCA9PSBudWxsKSB7XHJcbiAgICAgIGVuZCA9IGRhdGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydCA9IGRhdGU7XHJcbiAgICAgIGVuZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3VwZXIudXBkYXRlU2VsZWN0aW9uKG5ldyBEYXRlUmFuZ2U8RD4oc3RhcnQsIGVuZCksIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcXVldWUoZGF0ZTogRCB8IG51bGwpIHsgfVxyXG4gIHByb2Nlc3NRdWV1ZSgpIHsgfVxyXG5cclxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIHZhbGlkLiAqL1xyXG4gIGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuc2VsZWN0aW9uO1xyXG5cclxuICAgIC8vIEVtcHR5IHJhbmdlcyBhcmUgdmFsaWQuXHJcbiAgICBpZiAoc3RhcnQgPT0gbnVsbCAmJiBlbmQgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wbGV0ZSByYW5nZXMgYXJlIG9ubHkgdmFsaWQgaWYgYm90aCBkYXRlcyBhcmUgdmFsaWQgYW5kIHRoZSBzdGFydCBpcyBiZWZvcmUgdGhlIGVuZC5cclxuICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShzdGFydCkgJiZcclxuICAgICAgICB0aGlzLl9pc1ZhbGlkRGF0ZUluc3RhbmNlKGVuZCkgJiZcclxuICAgICAgICB0aGlzLl9hZGFwdGVyLmNvbXBhcmVEYXRlKHN0YXJ0LCBlbmQpIDw9IDBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYXJ0aWFsIHJhbmdlcyBhcmUgdmFsaWQgaWYgdGhlIHN0YXJ0L2VuZCBpcyB2YWxpZC5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIChzdGFydCA9PSBudWxsIHx8IHRoaXMuX2lzVmFsaWREYXRlSW5zdGFuY2Uoc3RhcnQpKSAmJlxyXG4gICAgICAoZW5kID09IG51bGwgfHwgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShlbmQpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpcyBjb21wbGV0ZS4gSW4gdGhlIGNhc2Ugb2YgYSBkYXRlIHJhbmdlIHNlbGVjdGlvbiwgdGhpc1xyXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBhIG5vbi1udWxsIGBzdGFydGAgYW5kIGBlbmRgLlxyXG4gICAqL1xyXG4gIGlzQ29tcGxldGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc3RhcnQgIT0gbnVsbCAmJiB0aGlzLnNlbGVjdGlvbi5lbmQgIT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cclxuICBjbG9uZSgpIHtcclxuICAgIGNvbnN0IGNsb25lID0gbmV3IE1hdFJhbmdlRGF0ZVNlbGVjdGlvbk1vZGVsPEQ+KHRoaXMuX2FkYXB0ZXIpO1xyXG4gICAgY2xvbmUudXBkYXRlU2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uLCB0aGlzKTtcclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkoXHJcbiAgcGFyZW50OiBNYXRTaW5nbGVEYXRlU2VsZWN0aW9uTW9kZWw8dW5rbm93bj4sXHJcbiAgYWRhcHRlcjogRGF0ZUFkYXB0ZXI8dW5rbm93bj4sXHJcbikge1xyXG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbChhZGFwdGVyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHNpbmdsZSBzZWxlY3Rpb24gbW9kZWwgdG8gYSBjb21wb25lbnQuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCBjb25zdCBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSOiBGYWN0b3J5UHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogTWF0RGF0ZVNlbGVjdGlvbk1vZGVsLFxyXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBNYXREYXRlU2VsZWN0aW9uTW9kZWxdLCBEYXRlQWRhcHRlcl0sXHJcbiAgdXNlRmFjdG9yeTogTUFUX1NJTkdMRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZLFxyXG59O1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZKFxyXG4gIHBhcmVudDogTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPHVua25vd24+LFxyXG4gIGFkYXB0ZXI6IERhdGVBZGFwdGVyPHVua25vd24+LFxyXG4pIHtcclxuICByZXR1cm4gcGFyZW50IHx8IG5ldyBNYXRSYW5nZURhdGVTZWxlY3Rpb25Nb2RlbChhZGFwdGVyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHJhbmdlIHNlbGVjdGlvbiBtb2RlbCB0byBhIGNvbXBvbmVudC5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUjogRmFjdG9yeVByb3ZpZGVyID0ge1xyXG4gIHByb3ZpZGU6IE1hdERhdGVTZWxlY3Rpb25Nb2RlbCxcclxuICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsXSwgRGF0ZUFkYXB0ZXJdLFxyXG4gIHVzZUZhY3Rvcnk6IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZLFxyXG59O1xyXG4iXX0=