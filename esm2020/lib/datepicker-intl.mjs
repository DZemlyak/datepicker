/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/** Datepicker data that requires internationalization. */
export class MatDatepickerIntl {
    constructor() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /** A label for the calendar popup (used by screen readers). */
        this.calendarLabel = 'Calendar';
        /** A label for the button used to open the calendar popup (used by screen readers). */
        this.openCalendarLabel = 'Open calendar';
        /** Label for the button used to close the calendar popup. */
        this.closeCalendarLabel = 'Close calendar';
        /** A label for the previous month button (used by screen readers). */
        this.prevMonthLabel = 'Previous month';
        /** A label for the next month button (used by screen readers). */
        this.nextMonthLabel = 'Next month';
        /** A label for the previous year button (used by screen readers). */
        this.prevYearLabel = 'Previous year';
        /** A label for the next year button (used by screen readers). */
        this.nextYearLabel = 'Next year';
        /** A label for the previous multi-year button (used by screen readers). */
        this.prevMultiYearLabel = 'Previous 24 years';
        /** A label for the next multi-year button (used by screen readers). */
        this.nextMultiYearLabel = 'Next 24 years';
        /** A label for the 'AM' button (used by screen readers). */
        this.setToAMLabel = 'Set date to AM';
        /** A label for the 'PM' button (used by screen readers). */
        this.setToPMLabel = 'Set date to PM';
        /** A label for the 'switch to minute view' button (used by screen readers). */
        this.switchToMinuteViewLabel = 'Change to minute view';
        /** A label for the 'switch to hour view' button (used by screen readers). */
        this.switchToHourViewLabel = 'Change to hour view';
        /** A label for the 'switch to month view' button (used by screen readers). */
        this.switchToMonthViewLabel = 'Choose date';
        /** A label for the 'switch to year view' button (used by screen readers). */
        this.switchToYearViewLabel = 'Change to year view';
        /** A label for the 'switch to years view' button (used by screen readers). */
        this.switchToMultiYearViewLabel = 'Change to years view';
    }
    /** Formats a range of years. */
    formatYearRange(start, end) {
        return `${start} \u2013 ${end}`;
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerIntl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MatDatepickerIntl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerIntl, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerIntl, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnRsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFN0IsMERBQTBEO0FBRTFELE1BQU0sT0FBTyxpQkFBaUI7SUFEOUI7UUFFRTs7O1dBR0c7UUFDTSxZQUFPLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFFdEQsK0RBQStEO1FBQy9ELGtCQUFhLEdBQVcsVUFBVSxDQUFDO1FBRW5DLHVGQUF1RjtRQUN2RixzQkFBaUIsR0FBVyxlQUFlLENBQUM7UUFFNUMsNkRBQTZEO1FBQzdELHVCQUFrQixHQUFXLGdCQUFnQixDQUFDO1FBRTlDLHNFQUFzRTtRQUN0RSxtQkFBYyxHQUFXLGdCQUFnQixDQUFDO1FBRTFDLGtFQUFrRTtRQUNsRSxtQkFBYyxHQUFXLFlBQVksQ0FBQztRQUV0QyxxRUFBcUU7UUFDckUsa0JBQWEsR0FBVyxlQUFlLENBQUM7UUFFeEMsaUVBQWlFO1FBQ2pFLGtCQUFhLEdBQVcsV0FBVyxDQUFDO1FBRXBDLDJFQUEyRTtRQUMzRSx1QkFBa0IsR0FBVyxtQkFBbUIsQ0FBQztRQUVqRCx1RUFBdUU7UUFDdkUsdUJBQWtCLEdBQVcsZUFBZSxDQUFDO1FBRTdDLDREQUE0RDtRQUM1RCxpQkFBWSxHQUFXLGdCQUFnQixDQUFDO1FBRXhDLDREQUE0RDtRQUM1RCxpQkFBWSxHQUFXLGdCQUFnQixDQUFDO1FBRXhDLCtFQUErRTtRQUMvRSw0QkFBdUIsR0FBVyx1QkFBdUIsQ0FBQztRQUUxRCw2RUFBNkU7UUFDN0UsMEJBQXFCLEdBQVcscUJBQXFCLENBQUM7UUFFdEQsOEVBQThFO1FBQzlFLDJCQUFzQixHQUFXLGFBQWEsQ0FBQztRQUUvQyw2RUFBNkU7UUFDN0UsMEJBQXFCLEdBQVcscUJBQXFCLENBQUM7UUFFdEQsOEVBQThFO1FBQzlFLCtCQUEwQixHQUFXLHNCQUFzQixDQUFDO0tBTTdEO0lBSkMsZ0NBQWdDO0lBQ2hDLGVBQWUsQ0FBQyxLQUFhLEVBQUUsR0FBVztRQUN4QyxPQUFPLEdBQUcsS0FBSyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O29KQTFEVSxpQkFBaUI7d0pBQWpCLGlCQUFpQixjQURMLE1BQU07MkZBQ2xCLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogRGF0ZXBpY2tlciBkYXRhIHRoYXQgcmVxdWlyZXMgaW50ZXJuYXRpb25hbGl6YXRpb24uICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckludGwge1xyXG4gIC8qKlxyXG4gICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XHJcbiAgICogY29tcG9uZW50cyBpZiB0aGUgbGFiZWxzIGhhdmUgY2hhbmdlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cclxuICAgKi9cclxuICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBjYWxlbmRhciBwb3B1cCAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgY2FsZW5kYXJMYWJlbDogc3RyaW5nID0gJ0NhbGVuZGFyJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBidXR0b24gdXNlZCB0byBvcGVuIHRoZSBjYWxlbmRhciBwb3B1cCAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgb3BlbkNhbGVuZGFyTGFiZWw6IHN0cmluZyA9ICdPcGVuIGNhbGVuZGFyJztcclxuXHJcbiAgLyoqIExhYmVsIGZvciB0aGUgYnV0dG9uIHVzZWQgdG8gY2xvc2UgdGhlIGNhbGVuZGFyIHBvcHVwLiAqL1xyXG4gIGNsb3NlQ2FsZW5kYXJMYWJlbDogc3RyaW5nID0gJ0Nsb3NlIGNhbGVuZGFyJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBtb250aCBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHByZXZNb250aExhYmVsOiBzdHJpbmcgPSAnUHJldmlvdXMgbW9udGgnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nID0gJ05leHQgbW9udGgnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIHllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBwcmV2WWVhckxhYmVsOiBzdHJpbmcgPSAnUHJldmlvdXMgeWVhcic7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgbmV4dCB5ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgbmV4dFllYXJMYWJlbDogc3RyaW5nID0gJ05leHQgeWVhcic7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHByZXZNdWx0aVllYXJMYWJlbDogc3RyaW5nID0gJ1ByZXZpb3VzIDI0IHllYXJzJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IG11bHRpLXllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBuZXh0TXVsdGlZZWFyTGFiZWw6IHN0cmluZyA9ICdOZXh0IDI0IHllYXJzJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnQU0nIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc2V0VG9BTUxhYmVsOiBzdHJpbmcgPSAnU2V0IGRhdGUgdG8gQU0nO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdQTScgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzZXRUb1BNTGFiZWw6IHN0cmluZyA9ICdTZXQgZGF0ZSB0byBQTSc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBtaW51dGUgdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzd2l0Y2hUb01pbnV0ZVZpZXdMYWJlbDogc3RyaW5nID0gJ0NoYW5nZSB0byBtaW51dGUgdmlldyc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBob3VyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9Ib3VyVmlld0xhYmVsOiBzdHJpbmcgPSAnQ2hhbmdlIHRvIGhvdXIgdmlldyc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBtb250aCB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHN3aXRjaFRvTW9udGhWaWV3TGFiZWw6IHN0cmluZyA9ICdDaG9vc2UgZGF0ZSc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9ZZWFyVmlld0xhYmVsOiBzdHJpbmcgPSAnQ2hhbmdlIHRvIHllYXIgdmlldyc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFycyB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsOiBzdHJpbmcgPSAnQ2hhbmdlIHRvIHllYXJzIHZpZXcnO1xyXG5cclxuICAvKiogRm9ybWF0cyBhIHJhbmdlIG9mIHllYXJzLiAqL1xyXG4gIGZvcm1hdFllYXJSYW5nZShzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7c3RhcnR9IFxcdTIwMTMgJHtlbmR9YDtcclxuICB9XHJcbn1cclxuIl19