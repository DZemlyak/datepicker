/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { DateAdapter } from './core';
import { DateRange } from './date-selection-model';
import * as i0 from "@angular/core";
import * as i1 from "./core";
/** Injection token used to customize the date range selection behavior. */
export const MAT_DATE_RANGE_SELECTION_STRATEGY = new InjectionToken('MAT_DATE_RANGE_SELECTION_STRATEGY');
/** Provides the default date range selection behavior. */
export class DefaultMatCalendarRangeStrategy {
    constructor(_dateAdapter) {
        this._dateAdapter = _dateAdapter;
    }
    selectionFinished(date, currentRange) {
        let { start, end } = currentRange;
        if (start == null) {
            start = date;
        }
        else if (end == null && date && this._dateAdapter.compareDate(date, start) >= 0) {
            end = date;
        }
        else {
            start = date;
            end = null;
        }
        return new DateRange(start, end);
    }
    createPreview(activeDate, currentRange) {
        let start = null;
        let end = null;
        if (currentRange.start && !currentRange.end && activeDate) {
            start = currentRange.start;
            end = activeDate;
        }
        return new DateRange(start, end);
    }
}
/** @nocollapse */ /** @nocollapse */ DefaultMatCalendarRangeStrategy.ɵfac = function DefaultMatCalendarRangeStrategy_Factory(t) { return new (t || DefaultMatCalendarRangeStrategy)(i0.ɵɵinject(i1.DateAdapter)); };
/** @nocollapse */ /** @nocollapse */ DefaultMatCalendarRangeStrategy.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: DefaultMatCalendarRangeStrategy, factory: DefaultMatCalendarRangeStrategy.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DefaultMatCalendarRangeStrategy, [{
        type: Injectable
    }], function () { return [{ type: i1.DateAdapter }]; }, null); })();
/** @docs-private */
export function MAT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(parent, adapter) {
    return parent || new DefaultMatCalendarRangeStrategy(adapter);
}
/** @docs-private */
export const MAT_CALENDAR_RANGE_STRATEGY_PROVIDER = {
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    deps: [[new Optional(), new SkipSelf(), MAT_DATE_RANGE_SELECTION_STRATEGY], DateAdapter],
    useFactory: MAT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1zZWxlY3Rpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXJhbmdlLXNlbGVjdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBRW5ELDJFQUEyRTtBQUMzRSxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBRyxJQUFJLGNBQWMsQ0FFakUsbUNBQW1DLENBQUMsQ0FBQztBQTBCdkMsMERBQTBEO0FBRTFELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFBb0IsWUFBNEI7UUFBNUIsaUJBQVksR0FBWixZQUFZLENBQWdCO0lBQUksQ0FBQztJQUVyRCxpQkFBaUIsQ0FBQyxJQUFPLEVBQUUsWUFBMEI7UUFDbkQsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxZQUFZLENBQUM7UUFFbEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRixHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7YUFBTTtZQUNMLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLElBQUksU0FBUyxDQUFJLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQW9CLEVBQUUsWUFBMEI7UUFDNUQsSUFBSSxLQUFLLEdBQWEsSUFBSSxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQztRQUV6QixJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFVBQVUsRUFBRTtZQUN6RCxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMzQixHQUFHLEdBQUcsVUFBVSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxJQUFJLFNBQVMsQ0FBSSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7b0pBNUJVLCtCQUErQjt1SUFBL0IsK0JBQStCLFdBQS9CLCtCQUErQjt1RkFBL0IsK0JBQStCO2NBRDNDLFVBQVU7O0FBZ0NYLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsNENBQTRDLENBQzFELE1BQThDLEVBQzlDLE9BQTZCO0lBRTdCLE9BQU8sTUFBTSxJQUFJLElBQUksK0JBQStCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSxvQ0FBb0MsR0FBb0I7SUFDbkUsT0FBTyxFQUFFLGlDQUFpQztJQUMxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxpQ0FBaUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztJQUN4RixVQUFVLEVBQUUsNENBQTRDO0NBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgU2tpcFNlbGYsIEZhY3RvcnlQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZSc7XHJcbmltcG9ydCB7IERhdGVSYW5nZSB9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xyXG5cclxuLyoqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIGN1c3RvbWl6ZSB0aGUgZGF0ZSByYW5nZSBzZWxlY3Rpb24gYmVoYXZpb3IuICovXHJcbmV4cG9ydCBjb25zdCBNQVRfREFURV9SQU5HRV9TRUxFQ1RJT05fU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48XHJcbiAgTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8YW55PlxyXG4+KCdNQVRfREFURV9SQU5HRV9TRUxFQ1RJT05fU1RSQVRFR1knKTtcclxuXHJcbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgcHJvdmlkZWQgaW4gb3JkZXIgdG8gY3VzdG9taXplIHRoZSBkYXRlIHJhbmdlIHNlbGVjdGlvbiBiZWhhdmlvci4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNYXREYXRlUmFuZ2VTZWxlY3Rpb25TdHJhdGVneTxEPiB7XHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIHNlbGVjdGluZyBhIHZhbHVlLlxyXG4gICAqIEBwYXJhbSBkYXRlIERhdGUgdGhhdCB3YXMgc2VsZWN0ZWQuIFdpbGwgYmUgbnVsbCBpZiB0aGUgdXNlciBjbGVhcmVkIHRoZSBzZWxlY3Rpb24uXHJcbiAgICogQHBhcmFtIGN1cnJlbnRSYW5nZSBSYW5nZSB0aGF0IGlzIGN1cnJlbnRseSBzaG93IGluIHRoZSBjYWxlbmRhci5cclxuICAgKiBAcGFyYW0gZXZlbnQgRE9NIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBzZWxlY3Rpb24uIEN1cnJlbnRseSBvbmx5IGNvcnJlc3BvbmRzIHRvIGEgYGNsaWNrYFxyXG4gICAqICAgIGV2ZW50LCBidXQgaXQgbWF5IGdldCBleHBhbmRlZCBpbiB0aGUgZnV0dXJlLlxyXG4gICAqL1xyXG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGU6IEQgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVSYW5nZTxEPiwgZXZlbnQ6IEV2ZW50KTogRGF0ZVJhbmdlPEQ+O1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgYWN0aXZhdGVkIGEgbmV3IGRhdGUgKGUuZy4gYnkgaG92ZXJpbmcgb3ZlclxyXG4gICAqIGl0IG9yIG1vdmluZyBmb2N1cykgYW5kIHRoZSBjYWxlbmRhciB0cmllcyB0byBkaXNwbGF5IGEgZGF0ZSByYW5nZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhY3RpdmVEYXRlIERhdGUgdGhhdCB0aGUgdXNlciBoYXMgYWN0aXZhdGVkLiBXaWxsIGJlIG51bGwgaWYgdGhlIHVzZXIgbW92ZWRcclxuICAgKiAgICBmb2N1cyB0byBhbiBlbGVtZW50IHRoYXQncyBubyBhIGNhbGVuZGFyIGNlbGwuXHJcbiAgICogQHBhcmFtIGN1cnJlbnRSYW5nZSBSYW5nZSB0aGF0IGlzIGN1cnJlbnRseSBzaG93biBpbiB0aGUgY2FsZW5kYXIuXHJcbiAgICogQHBhcmFtIGV2ZW50IERPTSBldmVudCB0aGF0IGNhdXNlZCB0aGUgcHJldmlldyB0byBiZSBjaGFuZ2VkLiBXaWxsIGJlIGVpdGhlciBhXHJcbiAgICogICAgYG1vdXNlZW50ZXJgL2Btb3VzZWxlYXZlYCBvciBgZm9jdXNgL2BibHVyYCBkZXBlbmRpbmcgb24gaG93IHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcuXHJcbiAgICovXHJcbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlUmFuZ2U8RD4sIGV2ZW50OiBFdmVudCk6IERhdGVSYW5nZTxEPjtcclxufVxyXG5cclxuLyoqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IGRhdGUgcmFuZ2Ugc2VsZWN0aW9uIGJlaGF2aW9yLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0TWF0Q2FsZW5kYXJSYW5nZVN0cmF0ZWd5PEQ+IGltcGxlbWVudHMgTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8RD4ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPikgeyB9XHJcblxyXG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGU6IEQsIGN1cnJlbnRSYW5nZTogRGF0ZVJhbmdlPEQ+KSB7XHJcbiAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSBjdXJyZW50UmFuZ2U7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09IG51bGwpIHtcclxuICAgICAgc3RhcnQgPSBkYXRlO1xyXG4gICAgfSBlbHNlIGlmIChlbmQgPT0gbnVsbCAmJiBkYXRlICYmIHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHN0YXJ0KSA+PSAwKSB7XHJcbiAgICAgIGVuZCA9IGRhdGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydCA9IGRhdGU7XHJcbiAgICAgIGVuZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2U8RD4oc3RhcnQsIGVuZCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcmV2aWV3KGFjdGl2ZURhdGU6IEQgfCBudWxsLCBjdXJyZW50UmFuZ2U6IERhdGVSYW5nZTxEPikge1xyXG4gICAgbGV0IHN0YXJ0OiBEIHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgZW5kOiBEIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRSYW5nZS5zdGFydCAmJiAhY3VycmVudFJhbmdlLmVuZCAmJiBhY3RpdmVEYXRlKSB7XHJcbiAgICAgIHN0YXJ0ID0gY3VycmVudFJhbmdlLnN0YXJ0O1xyXG4gICAgICBlbmQgPSBhY3RpdmVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlPEQ+KHN0YXJ0LCBlbmQpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1BVF9DQUxFTkRBUl9SQU5HRV9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxyXG4gIHBhcmVudDogTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8dW5rbm93bj4sXHJcbiAgYWRhcHRlcjogRGF0ZUFkYXB0ZXI8dW5rbm93bj4sXHJcbikge1xyXG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IERlZmF1bHRNYXRDYWxlbmRhclJhbmdlU3RyYXRlZ3koYWRhcHRlcik7XHJcbn1cclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBjb25zdCBNQVRfQ0FMRU5EQVJfUkFOR0VfU1RSQVRFR1lfUFJPVklERVI6IEZhY3RvcnlQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBNQVRfREFURV9SQU5HRV9TRUxFQ1RJT05fU1RSQVRFR1ksXHJcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIE1BVF9EQVRFX1JBTkdFX1NFTEVDVElPTl9TVFJBVEVHWV0sIERhdGVBZGFwdGVyXSxcclxuICB1c2VGYWN0b3J5OiBNQVRfQ0FMRU5EQVJfUkFOR0VfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWSxcclxufTtcclxuIl19