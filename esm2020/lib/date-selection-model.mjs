/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable, Optional, SkipSelf, } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zZWxlY3Rpb24tbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXNlbGVjdGlvbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7O0FBRXJDLDZDQUE2QztBQUM3QyxNQUFNLE9BQU8sU0FBUztJQVFwQjtJQUNFLG1DQUFtQztJQUMxQixLQUFlO0lBQ3hCLGlDQUFpQztJQUN4QixHQUFhO1FBRmIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUVmLFFBQUcsR0FBSCxHQUFHLENBQVU7SUFDckIsQ0FBQztDQUNMO0FBeUJEOzs7R0FHRztBQUVILE1BQU0sT0FBZ0IscUJBQXFCO0lBYXpDO0lBQ0UsNkJBQTZCO0lBQ3BCLFNBQVksRUFDWCxRQUF3QjtRQUR6QixjQUFTLEdBQVQsU0FBUyxDQUFHO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFYbkIsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBRTdDLENBQUM7UUFFSiw0Q0FBNEM7UUFDNUMscUJBQWdCLEdBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBT3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZUFBZSxDQUFDLEtBQVEsRUFBRSxNQUFlO1FBQ3ZDLE1BQU0sUUFBUSxHQUFJLElBQXlCLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQXlCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMs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OzZKQXJFVSwwQkFBMEI7aUtBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxVQUFVOztBQXlFWCxvQkFBb0I7QUFDcEIsTUFBTSxVQUFVLHVDQUF1QyxDQUNyRCxNQUE0QyxFQUM1QyxPQUE2QjtJQUU3QixPQUFPLE1BQU0sSUFBSSxJQUFJLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSx3Q0FBd0MsR0FBb0I7SUFDdkUsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQztJQUM1RSxVQUFVLEVBQUUsdUNBQXVDO0NBQ3BELENBQUM7QUFFRixvQkFBb0I7QUFDcEIsTUFBTSxVQUFVLHNDQUFzQyxDQUNwRCxNQUE0QyxFQUM1QyxPQUE2QjtJQUU3QixPQUFPLE1BQU0sSUFBSSxJQUFJLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSx1Q0FBdUMsR0FBb0I7SUFDdEUsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQztJQUM1RSxVQUFVLEVBQUUsc0NBQXNDO0NBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBGYWN0b3J5UHJvdmlkZXIsXG4gIEluamVjdGFibGUsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbiAgT25EZXN0cm95LFxuICBpc0Rldk1vZGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2NvcmUnO1xuXG4vKiogQSBjbGFzcyByZXByZXNlbnRpbmcgYSByYW5nZSBvZiBkYXRlcy4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2U8RD4ge1xuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IG9iamVjdHMgd2l0aCBhIGBzdGFydGAgYW5kIGBlbmRgIHByb3BlcnR5IGNhbid0IGJlIGFzc2lnbmVkIHRvIGEgdmFyaWFibGUgdGhhdFxuICAgKiBleHBlY3RzIGEgYERhdGVSYW5nZWBcbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtdmFyaWFibGVcbiAgcHJpdmF0ZSBfZGlzYWJsZVN0cnVjdHVyYWxFcXVpdmFsZW5jeTogbmV2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRoZSBzdGFydCBkYXRlIG9mIHRoZSByYW5nZS4gKi9cbiAgICByZWFkb25seSBzdGFydDogRCB8IG51bGwsXG4gICAgLyoqIFRoZSBlbmQgZGF0ZSBvZiB0aGUgcmFuZ2UuICovXG4gICAgcmVhZG9ubHkgZW5kOiBEIHwgbnVsbFxuICApIHt9XG59XG5cbi8qKlxuICogQ29uZGl0aW9uYWxseSBwaWNrcyB0aGUgZGF0ZSB0eXBlLCBpZiBhIERhdGVSYW5nZSBpcyBwYXNzZWQgaW4uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCB0eXBlIEV4dHJhY3REYXRlVHlwZUZyb21TZWxlY3Rpb248VD4gPSBUIGV4dGVuZHMgRGF0ZVJhbmdlPGluZmVyIEQ+XG4gID8gRFxuICA6IE5vbk51bGxhYmxlPFQ+O1xuXG4vKipcbiAqIEV2ZW50IGVtaXR0ZWQgYnkgdGhlIGRhdGUgc2VsZWN0aW9uIG1vZGVsIHdoZW4gaXRzIHNlbGVjdGlvbiBjaGFuZ2VzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxTPiB7XG4gIC8qKiBOZXcgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb24uICovXG4gIHNlbGVjdGlvbjogUztcblxuICAvKiogT2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBjaGFuZ2UuICovXG4gIHNvdXJjZTogdW5rbm93bjtcblxuICAvKiogUHJldmlvdXMgdmFsdWUgKi9cbiAgb2xkVmFsdWU/OiBTO1xufVxuXG4vKipcbiAqIEEgc2VsZWN0aW9uIG1vZGVsIGNvbnRhaW5pbmcgYSBkYXRlIHNlbGVjdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFxuICBTLFxuICBEID0gRXh0cmFjdERhdGVUeXBlRnJvbVNlbGVjdGlvbjxTPlxuPiBpbXBsZW1lbnRzIE9uRGVzdHJveVxue1xuICBwcml2YXRlIHJlYWRvbmx5IF9zZWxlY3Rpb25DaGFuZ2VkID0gbmV3IFN1YmplY3Q8XG4gICAgRGF0ZVNlbGVjdGlvbk1vZGVsQ2hhbmdlPFM+XG4gID4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xuICBzZWxlY3Rpb25DaGFuZ2VkOiBPYnNlcnZhYmxlPERhdGVTZWxlY3Rpb25Nb2RlbENoYW5nZTxTPj4gPVxuICAgIHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQ7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBUaGUgY3VycmVudCBzZWxlY3Rpb24uICovXG4gICAgcmVhZG9ubHkgc2VsZWN0aW9uOiBTLFxuICAgIHByb3RlY3RlZCBfYWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD5cbiAgKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY3VycmVudCBzZWxlY3Rpb24gaW4gdGhlIG1vZGVsLlxuICAgKiBAcGFyYW0gdmFsdWUgTmV3IHNlbGVjdGlvbiB0aGF0IHNob3VsZCBiZSBhc3NpZ25lZC5cbiAgICogQHBhcmFtIHNvdXJjZSBPYmplY3QgdGhhdCB0cmlnZ2VyZWQgdGhlIHNlbGVjdGlvbiBjaGFuZ2UuXG4gICAqL1xuICB1cGRhdGVTZWxlY3Rpb24odmFsdWU6IFMsIHNvdXJjZTogdW5rbm93bikge1xuICAgIGNvbnN0IG9sZFZhbHVlID0gKHRoaXMgYXMgeyBzZWxlY3Rpb246IFMgfSkuc2VsZWN0aW9uO1xuICAgICh0aGlzIGFzIHsgc2VsZWN0aW9uOiBTIH0pLnNlbGVjdGlvbiA9IHZhbHVlO1xuICAgIHRoaXMuX3NlbGVjdGlvbkNoYW5nZWQubmV4dCh7IHNlbGVjdGlvbjogdmFsdWUsIHNvdXJjZSwgb2xkVmFsdWUgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25DaGFuZ2VkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzVmFsaWREYXRlSW5zdGFuY2UoZGF0ZTogRCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGRhdGUpICYmIHRoaXMuX2FkYXB0ZXIuaXNWYWxpZChkYXRlKTtcbiAgfVxuXG4gIC8qKiBBZGRzIGEgZGF0ZSB0byB0aGUgY3VycmVudCBzZWxlY3Rpb24uICovXG4gIGFic3RyYWN0IGFkZChkYXRlOiBEIHwgbnVsbCk6IHZvaWQ7XG5cbiAgLyoqIEFkZHMgYSBkYXRlIGFzIHBlbmRpbmcgdG8gdXBkYXRlIGlmIHRoZSB1c2VyIHNlbGVjdHMgdGhlIGRhdGUgcGFydGlhbGx5LiAqL1xuICBhYnN0cmFjdCBxdWV1ZShkYXRlOiBEIHwgbnVsbCk6IHZvaWQ7XG4gIGFic3RyYWN0IHByb2Nlc3NRdWV1ZSgpOiB2b2lkO1xuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgdmFsaWQuICovXG4gIGFic3RyYWN0IGlzVmFsaWQoKTogYm9vbGVhbjtcblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIGNvbXBsZXRlLiAqL1xuICBhYnN0cmFjdCBpc0NvbXBsZXRlKCk6IGJvb2xlYW47XG5cbiAgLyoqIENsb25lcyB0aGUgc2VsZWN0aW9uIG1vZGVsLiAqL1xuICBhYnN0cmFjdCBjbG9uZSgpOiBNYXREYXRlU2VsZWN0aW9uTW9kZWw8UywgRD47XG59XG5cbi8qKlxuICogQSBzZWxlY3Rpb24gbW9kZWwgdGhhdCBjb250YWlucyBhIHNpbmdsZSBkYXRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPEQ+IGV4dGVuZHMgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFxuICBEIHwgbnVsbCxcbiAgRFxuPiB7XG4gIC8qKiBRdWV1ZSBzdG9yZSAqL1xuICBxdWV1ZWRWYWx1ZTogRDtcblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPikge1xuICAgIHN1cGVyKG51bGwsIGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBkYXRlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gSW4gdGhlIGNhc2Ugb2YgYSBzaW5nbGUgZGF0ZSBzZWxlY3Rpb24sIHRoZSBhZGRlZCBkYXRlXG4gICAqIHNpbXBseSBvdmVyd3JpdGVzIHRoZSBwcmV2aW91cyBzZWxlY3Rpb25cbiAgICovXG4gIGFkZChkYXRlOiBEIHwgbnVsbCkge1xuICAgIHN1cGVyLnVwZGF0ZVNlbGVjdGlvbihkYXRlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKiBBZGRzIGEgZGF0ZSBhcyBwZW5kaW5nIHRvIHVwZGF0ZSBpZiB0aGUgdXNlciBzZWxlY3RzIHRoZSBkYXRlIHBhcnRpYWxseS4gKi9cbiAgcXVldWUoZGF0ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLnF1ZXVlZFZhbHVlID0gZGF0ZTtcbiAgfVxuXG4gIHByb2Nlc3NRdWV1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5xdWV1ZWRWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb24odGhpcy5xdWV1ZWRWYWx1ZSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBpcyB2YWxpZC4gKi9cbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24gIT0gbnVsbCAmJiB0aGlzLl9pc1ZhbGlkRGF0ZUluc3RhbmNlKHRoaXMuc2VsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgY29tcGxldGUuIEluIHRoZSBjYXNlIG9mIGEgc2luZ2xlIGRhdGUgc2VsZWN0aW9uLCB0aGlzXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIG5vdCBudWxsLlxuICAgKi9cbiAgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24gIT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgY2xvbmUgPSBuZXcgTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPEQ+KHRoaXMuX2FkYXB0ZXIpO1xuICAgIGNsb25lLnVwZGF0ZVNlbGVjdGlvbih0aGlzLnNlbGVjdGlvbiwgdGhpcyk7XG4gICAgaWYgKHRoaXMucXVldWVkVmFsdWUpIHtcbiAgICAgIGNsb25lLnF1ZXVlKHRoaXMucXVldWVkVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCB0aGF0IGNvbnRhaW5zIGEgZGF0ZSByYW5nZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdFJhbmdlRGF0ZVNlbGVjdGlvbk1vZGVsPEQ+IGV4dGVuZHMgTWF0RGF0ZVNlbGVjdGlvbk1vZGVsPFxuICBEYXRlUmFuZ2U8RD4sXG4gIERcbj4ge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPikge1xuICAgIHN1cGVyKG5ldyBEYXRlUmFuZ2U8RD4obnVsbCwgbnVsbCksIGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBkYXRlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvbi4gSW4gdGhlIGNhc2Ugb2YgYSBkYXRlIHJhbmdlIHNlbGVjdGlvbiwgdGhlIGFkZGVkIGRhdGVcbiAgICogZmlsbHMgaW4gdGhlIG5leHQgYG51bGxgIHZhbHVlIGluIHRoZSByYW5nZS4gSWYgYm90aCB0aGUgc3RhcnQgYW5kIHRoZSBlbmQgYWxyZWFkeSBoYXZlIGEgZGF0ZSxcbiAgICogdGhlIHNlbGVjdGlvbiBpcyByZXNldCBzbyB0aGF0IHRoZSBnaXZlbiBkYXRlIGlzIHRoZSBuZXcgYHN0YXJ0YCBhbmQgdGhlIGBlbmRgIGlzIG51bGwuXG4gICAqL1xuICBhZGQoZGF0ZTogRCB8IG51bGwpOiB2b2lkIHtcbiAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSB0aGlzLnNlbGVjdGlvbjtcblxuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgfSBlbHNlIGlmIChlbmQgPT0gbnVsbCkge1xuICAgICAgZW5kID0gZGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSBkYXRlO1xuICAgICAgZW5kID0gbnVsbDtcbiAgICB9XG5cbiAgICBzdXBlci51cGRhdGVTZWxlY3Rpb24obmV3IERhdGVSYW5nZTxEPihzdGFydCwgZW5kKSwgdGhpcyk7XG4gIH1cblxuICBxdWV1ZShkYXRlOiBEIHwgbnVsbCkge31cbiAgcHJvY2Vzc1F1ZXVlKCkge31cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIHZhbGlkLiAqL1xuICBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5zZWxlY3Rpb247XG5cbiAgICAvLyBFbXB0eSByYW5nZXMgYXJlIHZhbGlkLlxuICAgIGlmIChzdGFydCA9PSBudWxsICYmIGVuZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBDb21wbGV0ZSByYW5nZXMgYXJlIG9ubHkgdmFsaWQgaWYgYm90aCBkYXRlcyBhcmUgdmFsaWQgYW5kIHRoZSBzdGFydCBpcyBiZWZvcmUgdGhlIGVuZC5cbiAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShzdGFydCkgJiZcbiAgICAgICAgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShlbmQpICYmXG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuY29tcGFyZURhdGUoc3RhcnQsIGVuZCkgPD0gMFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBQYXJ0aWFsIHJhbmdlcyBhcmUgdmFsaWQgaWYgdGhlIHN0YXJ0L2VuZCBpcyB2YWxpZC5cbiAgICByZXR1cm4gKFxuICAgICAgKHN0YXJ0ID09IG51bGwgfHwgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShzdGFydCkpICYmXG4gICAgICAoZW5kID09IG51bGwgfHwgdGhpcy5faXNWYWxpZERhdGVJbnN0YW5jZShlbmQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGlzIGNvbXBsZXRlLiBJbiB0aGUgY2FzZSBvZiBhIGRhdGUgcmFuZ2Ugc2VsZWN0aW9uLCB0aGlzXG4gICAqIGlzIHRydWUgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBhIG5vbi1udWxsIGBzdGFydGAgYW5kIGBlbmRgLlxuICAgKi9cbiAgaXNDb21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc3RhcnQgIT0gbnVsbCAmJiB0aGlzLnNlbGVjdGlvbi5lbmQgIT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBDbG9uZXMgdGhlIHNlbGVjdGlvbiBtb2RlbC4gKi9cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgY2xvbmUgPSBuZXcgTWF0UmFuZ2VEYXRlU2VsZWN0aW9uTW9kZWw8RD4odGhpcy5fYWRhcHRlcik7XG4gICAgY2xvbmUudXBkYXRlU2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uLCB0aGlzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkoXG4gIHBhcmVudDogTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPHVua25vd24+LFxuICBhZGFwdGVyOiBEYXRlQWRhcHRlcjx1bmtub3duPlxuKSB7XG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IE1hdFNpbmdsZURhdGVTZWxlY3Rpb25Nb2RlbChhZGFwdGVyKTtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSBzaW5nbGUgc2VsZWN0aW9uIG1vZGVsIHRvIGEgY29tcG9uZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1NJTkdMRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUjogRmFjdG9yeVByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBNYXREYXRlU2VsZWN0aW9uTW9kZWwsXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBNYXREYXRlU2VsZWN0aW9uTW9kZWxdLCBEYXRlQWRhcHRlcl0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9TSU5HTEVfREFURV9TRUxFQ1RJT05fTU9ERUxfRkFDVE9SWSxcbn07XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX1JBTkdFX0RBVEVfU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkoXG4gIHBhcmVudDogTWF0U2luZ2xlRGF0ZVNlbGVjdGlvbk1vZGVsPHVua25vd24+LFxuICBhZGFwdGVyOiBEYXRlQWRhcHRlcjx1bmtub3duPlxuKSB7XG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IE1hdFJhbmdlRGF0ZVNlbGVjdGlvbk1vZGVsKGFkYXB0ZXIpO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHJhbmdlIHNlbGVjdGlvbiBtb2RlbCB0byBhIGNvbXBvbmVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUjogRmFjdG9yeVByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBNYXREYXRlU2VsZWN0aW9uTW9kZWwsXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBNYXREYXRlU2VsZWN0aW9uTW9kZWxdLCBEYXRlQWRhcHRlcl0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9GQUNUT1JZLFxufTtcbiJdfQ==