/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, InjectionToken, Optional, SkipSelf, } from '@angular/core';
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
        else if (end == null &&
            date &&
            this._dateAdapter.compareDate(date, start) >= 0) {
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
/** @nocollapse */ /** @nocollapse */ DefaultMatCalendarRangeStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DefaultMatCalendarRangeStrategy, deps: [{ token: i1.DateAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ DefaultMatCalendarRangeStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DefaultMatCalendarRangeStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DefaultMatCalendarRangeStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }]; } });
/** @docs-private */
export function MAT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(parent, adapter) {
    return parent || new DefaultMatCalendarRangeStrategy(adapter);
}
/** @docs-private */
export const MAT_CALENDAR_RANGE_STRATEGY_PROVIDER = {
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    deps: [
        [new Optional(), new SkipSelf(), MAT_DATE_RANGE_SELECTION_STRATEGY],
        DateAdapter,
    ],
    useFactory: MAT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1zZWxlY3Rpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXJhbmdlLXNlbGVjdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFFbkQsMkVBQTJFO0FBQzNFLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFHLElBQUksY0FBYyxDQUVqRSxtQ0FBbUMsQ0FBQyxDQUFDO0FBa0N2QywwREFBMEQ7QUFFMUQsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUFvQixZQUE0QjtRQUE1QixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7SUFBRyxDQUFDO0lBRXBELGlCQUFpQixDQUFDLElBQU8sRUFBRSxZQUEwQjtRQUNuRCxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUVsQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNkO2FBQU0sSUFDTCxHQUFHLElBQUksSUFBSTtZQUNYLElBQUk7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMvQztZQUNBLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sSUFBSSxTQUFTLENBQUksS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBb0IsRUFBRSxZQUEwQjtRQUM1RCxJQUFJLEtBQUssR0FBYSxJQUFJLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDO1FBRXpCLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksVUFBVSxFQUFFO1lBQ3pELEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzNCLEdBQUcsR0FBRyxVQUFVLENBQUM7U0FDbEI7UUFFRCxPQUFPLElBQUksU0FBUyxDQUFJLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDOztrS0FsQ1UsK0JBQStCO3NLQUEvQiwrQkFBK0I7MkZBQS9CLCtCQUErQjtrQkFEM0MsVUFBVTs7QUFzQ1gsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSw0Q0FBNEMsQ0FDMUQsTUFBOEMsRUFDOUMsT0FBNkI7SUFFN0IsT0FBTyxNQUFNLElBQUksSUFBSSwrQkFBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLG9DQUFvQyxHQUFvQjtJQUNuRSxPQUFPLEVBQUUsaUNBQWlDO0lBQzFDLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLGlDQUFpQyxDQUFDO1FBQ25FLFdBQVc7S0FDWjtJQUNELFVBQVUsRUFBRSw0Q0FBNEM7Q0FDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBGYWN0b3J5UHJvdmlkZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlIH0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBjdXN0b21pemUgdGhlIGRhdGUgcmFuZ2Ugc2VsZWN0aW9uIGJlaGF2aW9yLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9EQVRFX1JBTkdFX1NFTEVDVElPTl9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8YW55PlxuPignTUFUX0RBVEVfUkFOR0VfU0VMRUNUSU9OX1NUUkFURUdZJyk7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgcHJvdmlkZWQgaW4gb3JkZXIgdG8gY3VzdG9taXplIHRoZSBkYXRlIHJhbmdlIHNlbGVjdGlvbiBiZWhhdmlvci4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8RD4ge1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIGZpbmlzaGVkIHNlbGVjdGluZyBhIHZhbHVlLlxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIHRoYXQgd2FzIHNlbGVjdGVkLiBXaWxsIGJlIG51bGwgaWYgdGhlIHVzZXIgY2xlYXJlZCB0aGUgc2VsZWN0aW9uLlxuICAgKiBAcGFyYW0gY3VycmVudFJhbmdlIFJhbmdlIHRoYXQgaXMgY3VycmVudGx5IHNob3cgaW4gdGhlIGNhbGVuZGFyLlxuICAgKiBAcGFyYW0gZXZlbnQgRE9NIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBzZWxlY3Rpb24uIEN1cnJlbnRseSBvbmx5IGNvcnJlc3BvbmRzIHRvIGEgYGNsaWNrYFxuICAgKiAgICBldmVudCwgYnV0IGl0IG1heSBnZXQgZXhwYW5kZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICovXG4gIHNlbGVjdGlvbkZpbmlzaGVkKFxuICAgIGRhdGU6IEQgfCBudWxsLFxuICAgIGN1cnJlbnRSYW5nZTogRGF0ZVJhbmdlPEQ+LFxuICAgIGV2ZW50OiBFdmVudFxuICApOiBEYXRlUmFuZ2U8RD47XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBhY3RpdmF0ZWQgYSBuZXcgZGF0ZSAoZS5nLiBieSBob3ZlcmluZyBvdmVyXG4gICAqIGl0IG9yIG1vdmluZyBmb2N1cykgYW5kIHRoZSBjYWxlbmRhciB0cmllcyB0byBkaXNwbGF5IGEgZGF0ZSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGFjdGl2ZURhdGUgRGF0ZSB0aGF0IHRoZSB1c2VyIGhhcyBhY3RpdmF0ZWQuIFdpbGwgYmUgbnVsbCBpZiB0aGUgdXNlciBtb3ZlZFxuICAgKiAgICBmb2N1cyB0byBhbiBlbGVtZW50IHRoYXQncyBubyBhIGNhbGVuZGFyIGNlbGwuXG4gICAqIEBwYXJhbSBjdXJyZW50UmFuZ2UgUmFuZ2UgdGhhdCBpcyBjdXJyZW50bHkgc2hvd24gaW4gdGhlIGNhbGVuZGFyLlxuICAgKiBAcGFyYW0gZXZlbnQgRE9NIGV2ZW50IHRoYXQgY2F1c2VkIHRoZSBwcmV2aWV3IHRvIGJlIGNoYW5nZWQuIFdpbGwgYmUgZWl0aGVyIGFcbiAgICogICAgYG1vdXNlZW50ZXJgL2Btb3VzZWxlYXZlYCBvciBgZm9jdXNgL2BibHVyYCBkZXBlbmRpbmcgb24gaG93IHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcuXG4gICAqL1xuICBjcmVhdGVQcmV2aWV3KFxuICAgIGFjdGl2ZURhdGU6IEQgfCBudWxsLFxuICAgIGN1cnJlbnRSYW5nZTogRGF0ZVJhbmdlPEQ+LFxuICAgIGV2ZW50OiBFdmVudFxuICApOiBEYXRlUmFuZ2U8RD47XG59XG5cbi8qKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBkYXRlIHJhbmdlIHNlbGVjdGlvbiBiZWhhdmlvci4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWZhdWx0TWF0Q2FsZW5kYXJSYW5nZVN0cmF0ZWd5PEQ+XG4gIGltcGxlbWVudHMgTWF0RGF0ZVJhbmdlU2VsZWN0aW9uU3RyYXRlZ3k8RD5cbntcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+KSB7fVxuXG4gIHNlbGVjdGlvbkZpbmlzaGVkKGRhdGU6IEQsIGN1cnJlbnRSYW5nZTogRGF0ZVJhbmdlPEQ+KSB7XG4gICAgbGV0IHsgc3RhcnQsIGVuZCB9ID0gY3VycmVudFJhbmdlO1xuXG4gICAgaWYgKHN0YXJ0ID09IG51bGwpIHtcbiAgICAgIHN0YXJ0ID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZW5kID09IG51bGwgJiZcbiAgICAgIGRhdGUgJiZcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHN0YXJ0KSA+PSAwXG4gICAgKSB7XG4gICAgICBlbmQgPSBkYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydCA9IGRhdGU7XG4gICAgICBlbmQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlPEQ+KHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgY3JlYXRlUHJldmlldyhhY3RpdmVEYXRlOiBEIHwgbnVsbCwgY3VycmVudFJhbmdlOiBEYXRlUmFuZ2U8RD4pIHtcbiAgICBsZXQgc3RhcnQ6IEQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgZW5kOiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAoY3VycmVudFJhbmdlLnN0YXJ0ICYmICFjdXJyZW50UmFuZ2UuZW5kICYmIGFjdGl2ZURhdGUpIHtcbiAgICAgIHN0YXJ0ID0gY3VycmVudFJhbmdlLnN0YXJ0O1xuICAgICAgZW5kID0gYWN0aXZlRGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGVSYW5nZTxEPihzdGFydCwgZW5kKTtcbiAgfVxufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BVF9DQUxFTkRBUl9SQU5HRV9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBwYXJlbnQ6IE1hdERhdGVSYW5nZVNlbGVjdGlvblN0cmF0ZWd5PHVua25vd24+LFxuICBhZGFwdGVyOiBEYXRlQWRhcHRlcjx1bmtub3duPlxuKSB7XG4gIHJldHVybiBwYXJlbnQgfHwgbmV3IERlZmF1bHRNYXRDYWxlbmRhclJhbmdlU3RyYXRlZ3koYWRhcHRlcik7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUFUX0NBTEVOREFSX1JBTkdFX1NUUkFURUdZX1BST1ZJREVSOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE1BVF9EQVRFX1JBTkdFX1NFTEVDVElPTl9TVFJBVEVHWSxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIE1BVF9EQVRFX1JBTkdFX1NFTEVDVElPTl9TVFJBVEVHWV0sXG4gICAgRGF0ZUFkYXB0ZXIsXG4gIF0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9DQUxFTkRBUl9SQU5HRV9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZLFxufTtcbiJdfQ==