/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { DateTime, Info } from 'luxon';
import * as i0 from "@angular/core";
/** InjectionToken for LuxonDateAdapter to configure options. */
export const MAT_LUXON_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_LUXON_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY,
});
/** @docs-private */
export function MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
    };
}
/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, (i) => String(i + 1));
/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, (i) => (i === 0 ? '00' : String(i)));
/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, String);
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/** Adapts Luxon Dates for use with Angular Material. */
export class LuxonDateAdapter extends DateAdapter {
    constructor(dateLocale, options) {
        super();
        this._useUTC = options ? !!options.useUtc : false;
        this._getFirstDayOfWeek = options?.firstDayOfWeek;
        this.setLocale(dateLocale || DateTime.local().locale);
    }
    setLocale(locale) {
        super.setLocale(locale);
    }
    getYear(date) {
        return date.year;
    }
    getMonth(date) {
        // Luxon works with 1-indexed months whereas our code expects 0-indexed.
        return date.month - 1;
    }
    getDate(date) {
        return date.day;
    }
    getHours(date) {
        return date.hour;
    }
    setHours(date, hour) {
        return date.set({ hour });
    }
    getMinutes(date) {
        return date.minute;
    }
    setMinutes(date, minute) {
        return date.set({ minute });
    }
    getSeconds(date) {
        return date.second;
    }
    setSeconds(date, second, ms) {
        return date.set({ second, millisecond: ms });
    }
    getMilliseconds(date) {
        return date.millisecond;
    }
    getDayOfWeek(date) {
        return date.weekday === 7 ? 0 : date.weekday;
    }
    getMonthNames(style) {
        return Info.months(style, { locale: this.locale });
    }
    getDateNames() {
        if (Info.features().intl) {
            // At the time of writing, Luxon doesn't offer similar
            // functionality so we have to fall back to the Intl API.
            const dtf = new Intl.DateTimeFormat(this.locale, {
                day: 'numeric',
                timeZone: 'utc',
            });
            return range(31, (i) => {
                // Format a UTC date in order to avoid DST issues.
                const date = DateTime.utc(2017, 1, i + 1).toJSDate();
                // Strip the directionality characters from the formatted date.
                return dtf.format(date).replace(/[\u200e\u200f]/g, '');
            });
        }
        return DEFAULT_DATE_NAMES;
    }
    getHourNames() {
        return DEFAULT_HOUR_NAMES;
    }
    getMinuteNames() {
        return DEFAULT_MINUTE_NAMES;
    }
    getDayOfWeekNames(style) {
        const luxonWeekdays = [...Info.weekdays(style, { locale: this.locale })];
        // luxon returns the first day of week as Monday
        // but angular material expects Sunday, so we rotate the array
        luxonWeekdays.unshift(luxonWeekdays.pop());
        return luxonWeekdays;
    }
    getYearName(date) {
        return date.toFormat('yyyy');
    }
    getFirstDayOfWeek() {
        // Luxon doesn't have support for getting the first day of the week.
        if (this._getFirstDayOfWeek) {
            return this._getFirstDayOfWeek(this.locale);
        }
        return 0;
    }
    getNumDaysInMonth(date) {
        return date.daysInMonth;
    }
    clone(date) {
        return DateTime.fromObject(date.toObject({ includeConfig: true }));
    }
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        // Luxon uses 1-indexed months so we need to add one to the month.
        const result = this._useUTC
            ? DateTime.utc(year, month + 1, date, hours, minutes, seconds, ms)
            : DateTime.local(year, month + 1, date, hours, minutes, seconds, ms);
        if (!this.isValid(result)) {
            throw Error(`Invalid date "${date}". Reason: "${result.invalidReason}".`);
        }
        return result.setLocale(this.locale);
    }
    today() {
        return (this._useUTC ? DateTime.utc() : DateTime.local()).setLocale(this.locale);
    }
    parse(value, parseFormat) {
        const options = this._getOptions();
        if (typeof value == 'string' && value.length > 0) {
            const iso8601Date = DateTime.fromISO(value, options);
            if (this.isValid(iso8601Date)) {
                return iso8601Date;
            }
            const parseFormats = Array.isArray(parseFormat)
                ? parseFormat
                : [parseFormat];
            for (const format of parseFormats) {
                const fromFormat = DateTime.fromFormat(value, format, options);
                if (this.isValid(fromFormat)) {
                    return fromFormat;
                }
            }
            return this.invalid();
        }
        else if (typeof value === 'number') {
            return DateTime.fromMillis(value, options);
        }
        else if (value instanceof Date) {
            return DateTime.fromJSDate(value, options);
        }
        else if (value instanceof DateTime) {
            return DateTime.fromMillis(value.toMillis(), options);
        }
        return null;
    }
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('LuxonDateAdapter: Cannot format invalid date.');
        }
        return date
            .setLocale(this.locale)
            .toFormat(displayFormat, { timeZone: this._useUTC ? 'utc' : undefined });
    }
    addCalendarYears(date, years) {
        return date.plus({ years }).setLocale(this.locale);
    }
    addCalendarMonths(date, months) {
        return date.plus({ months }).setLocale(this.locale);
    }
    addCalendarDays(date, days) {
        return date.plus({ days }).setLocale(this.locale);
    }
    addCalendarHours(date, hours) {
        return date.plus({ hours });
    }
    addCalendarMinutes(date, minutes) {
        return date.plus({ minutes });
    }
    addCalendarSeconds(date, seconds, ms) {
        return date.plus({ seconds, milliseconds: ms });
    }
    toIso8601(date) {
        return date.toISO();
    }
    /**
     * Returns the given value if given a valid Luxon or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid DateTime and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value) {
        const options = this._getOptions();
        let date;
        if (value instanceof Date) {
            date = DateTime.fromJSDate(value, options);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = DateTime.fromISO(value, options);
        }
        if (date && this.isValid(date)) {
            return date;
        }
        return super.deserialize(value);
    }
    isDateInstance(obj) {
        return obj instanceof DateTime;
    }
    isValid(date) {
        return date.isValid;
    }
    invalid() {
        return DateTime.invalid('Invalid Luxon DateTime object.');
    }
    /** Gets the options that should be used when constructing a new `DateTime` object. */
    _getOptions() {
        return {
            zone: this._useUTC ? 'utc' : undefined,
            locale: this.locale,
        };
    }
}
/** @nocollapse */ /** @nocollapse */ LuxonDateAdapter.ɵfac = function LuxonDateAdapter_Factory(t) { return new (t || LuxonDateAdapter)(i0.ɵɵinject(MAT_DATE_LOCALE, 8), i0.ɵɵinject(MAT_LUXON_DATE_ADAPTER_OPTIONS, 8)); };
/** @nocollapse */ /** @nocollapse */ LuxonDateAdapter.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: LuxonDateAdapter, factory: LuxonDateAdapter.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LuxonDateAdapter, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_LOCALE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_LUXON_DATE_ADAPTER_OPTIONS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHV4b24tZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL2x1eG9uL2x1eG9uLWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQW1CLE1BQU0sT0FBTyxDQUFDOztBQW1CeEQsZ0VBQWdFO0FBQ2hFLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUM5RCxnQ0FBZ0MsRUFDaEM7SUFDRSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0NBQXNDO0NBQ2hELENBQ0YsQ0FBQztBQUVGLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsc0NBQXNDO0lBQ3BELE9BQU87UUFDTCxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUM7QUFDSixDQUFDO0FBRUQsa0VBQWtFO0FBQ2xFLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNELGtFQUFrRTtBQUNsRSxNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTFFLG9F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UUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGNBQWMsQ0FBQyxHQUFRO1FBQ3JCLE9BQU8sR0FBRyxZQUFZLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNGQUFzRjtJQUM5RSxXQUFXO1FBQ2pCLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQzs7c0hBalJVLGdCQUFnQixjQUtMLGVBQWUsa0JBRTNCLDhCQUE4Qjt3SEFQN0IsZ0JBQWdCLFdBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O3NCQU1OLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsZUFBZTs7c0JBQ2xDLFFBQVE7O3NCQUNSLE1BQU07dUJBQUMsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9MT0NBTEUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAbWF0aGVvL2RhdGVwaWNrZXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lLCBJbmZvLCBEYXRlVGltZU9wdGlvbnMgfSBmcm9tICdsdXhvbic7XHJcblxyXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIEx1eG9uRGF0ZUFkYXB0ZXJ9LiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1hdEx1eG9uRGF0ZUFkYXB0ZXJPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXHJcbiAgICogQ2hhbmdpbmcgdGhpcyB3aWxsIGNoYW5nZSBob3cgQW5ndWxhciBNYXRlcmlhbCBjb21wb25lbnRzIGxpa2UgRGF0ZVBpY2tlciBvdXRwdXQgZGF0ZXMuXHJcbiAgICoge0BkZWZhdWx0IGZhbHNlfVxyXG4gICAqL1xyXG4gIHVzZVV0YzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTHV4b24gZG9lcyBub3QgaGF2ZSBzdXBwb3J0IGZvciByZXRyaWV2aW5nIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICogVGhpcyBhbGxvd3Mgc3VwcGx5aW5nIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIG92ZXJyaWRlIGl0LlxyXG4gICAqIFJlbWVtYmVyIHRoYXQgeW91IG5lZWQgdG8gcmV0dXJuIDAgPSBTdW5kYXksIDEgPSBNb25kYXlcclxuICAgKi9cclxuICBmaXJzdERheU9mV2Vlaz86IChsb2NhbGU6IHN0cmluZykgPT4gbnVtYmVyO1xyXG59XHJcblxyXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIEx1eG9uRGF0ZUFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXHJcbmV4cG9ydCBjb25zdCBNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0THV4b25EYXRlQWRhcHRlck9wdGlvbnM+KFxyXG4gICdNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlMnLFxyXG4gIHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290JyxcclxuICAgIGZhY3Rvcnk6IE1BVF9MVVhPTl9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZLFxyXG4gIH1cclxuKTtcclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBNYXRMdXhvbkRhdGVBZGFwdGVyT3B0aW9ucyB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZVV0YzogZmFsc2UsXHJcbiAgfTtcclxufVxyXG5cclxuLyoqIFRoZSBkZWZhdWx0IGRhdGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfREFURV9OQU1FUyA9IHJhbmdlKDMxLCAoaSkgPT4gU3RyaW5nKGkgKyAxKSk7XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgaG91ciBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9IT1VSX05BTUVTID0gcmFuZ2UoMjQsIChpKSA9PiAoaSA9PT0gMCA/ICcwMCcgOiBTdHJpbmcoaSkpKTtcclxuXHJcbi8qKiBUaGUgZGVmYXVsdCBtaW51dGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfTUlOVVRFX05BTUVTID0gcmFuZ2UoNjAsIFN0cmluZyk7XHJcblxyXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXHJcbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XHJcbiAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlc0FycmF5O1xyXG59XHJcblxyXG4vKiogQWRhcHRzIEx1eG9uIERhdGVzIGZvciB1c2Ugd2l0aCBBbmd1bGFyIE1hdGVyaWFsLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMdXhvbkRhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8RGF0ZVRpbWU+IHtcclxuICBwcml2YXRlIF91c2VVVEM6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZ2V0Rmlyc3REYXlPZldlZWs6IE1hdEx1eG9uRGF0ZUFkYXB0ZXJPcHRpb25zWydmaXJzdERheU9mV2VlayddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBzdHJpbmcsXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlMpXHJcbiAgICBvcHRpb25zPzogTWF0THV4b25EYXRlQWRhcHRlck9wdGlvbnNcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLl91c2VVVEMgPSBvcHRpb25zID8gISFvcHRpb25zLnVzZVV0YyA6IGZhbHNlO1xyXG4gICAgdGhpcy5fZ2V0Rmlyc3REYXlPZldlZWsgPSBvcHRpb25zPy5maXJzdERheU9mV2VlaztcclxuICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgRGF0ZVRpbWUubG9jYWwoKS5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcclxuICB9XHJcblxyXG4gIGdldFllYXIoZGF0ZTogRGF0ZVRpbWUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUueWVhcjtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoKGRhdGU6IERhdGVUaW1lKTogbnVtYmVyIHtcclxuICAgIC8vIEx1eG9uIHdvcmtzIHdpdGggMS1pbmRleGVkIG1vbnRocyB3aGVyZWFzIG91ciBjb2RlIGV4cGVjdHMgMC1pbmRleGVkLlxyXG4gICAgcmV0dXJuIGRhdGUubW9udGggLSAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZShkYXRlOiBEYXRlVGltZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5kYXk7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VycyhkYXRlOiBEYXRlVGltZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5ob3VyO1xyXG4gIH1cclxuXHJcbiAgc2V0SG91cnMoZGF0ZTogRGF0ZVRpbWUsIGhvdXI6IG51bWJlcik6IERhdGVUaW1lIHtcclxuICAgIHJldHVybiBkYXRlLnNldCh7IGhvdXIgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRNaW51dGVzKGRhdGU6IERhdGVUaW1lKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLm1pbnV0ZTtcclxuICB9XHJcblxyXG4gIHNldE1pbnV0ZXMoZGF0ZTogRGF0ZVRpbWUsIG1pbnV0ZTogbnVtYmVyKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIGRhdGUuc2V0KHsgbWludXRlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2Vjb25kcyhkYXRlOiBEYXRlVGltZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5zZWNvbmQ7XHJcbiAgfVxyXG5cclxuICBzZXRTZWNvbmRzKGRhdGU6IERhdGVUaW1lLCBzZWNvbmQ6IG51bWJlciwgbXM/OiBudW1iZXIpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gZGF0ZS5zZXQoeyBzZWNvbmQsIG1pbGxpc2Vjb25kOiBtcyB9KTtcclxuICB9XHJcblxyXG4gIGdldE1pbGxpc2Vjb25kcyhkYXRlOiBEYXRlVGltZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5taWxsaXNlY29uZDtcclxuICB9XHJcblxyXG4gIGdldERheU9mV2VlayhkYXRlOiBEYXRlVGltZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS53ZWVrZGF5ID09PSA3ID8gMCA6IGRhdGUud2Vla2RheTtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBJbmZvLm1vbnRocyhzdHlsZSwgeyBsb2NhbGU6IHRoaXMubG9jYWxlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChJbmZvLmZlYXR1cmVzKCkuaW50bCkge1xyXG4gICAgICAvLyBBdCB0aGUgdGltZSBvZiB3cml0aW5nLCBMdXhvbiBkb2Vzbid0IG9mZmVyIHNpbWlsYXJcclxuICAgICAgLy8gZnVuY3Rpb25hbGl0eSBzbyB3ZSBoYXZlIHRvIGZhbGwgYmFjayB0byB0aGUgSW50bCBBUEkuXHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XHJcbiAgICAgICAgZGF5OiAnbnVtZXJpYycsXHJcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByYW5nZSgzMSwgKGkpID0+IHtcclxuICAgICAgICAvLyBGb3JtYXQgYSBVVEMgZGF0ZSBpbiBvcmRlciB0byBhdm9pZCBEU1QgaXNzdWVzLlxyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBEYXRlVGltZS51dGMoMjAxNywgMSwgaSArIDEpLnRvSlNEYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIFN0cmlwIHRoZSBkaXJlY3Rpb25hbGl0eSBjaGFyYWN0ZXJzIGZyb20gdGhlIGZvcm1hdHRlZCBkYXRlLlxyXG4gICAgICAgIHJldHVybiBkdGYuZm9ybWF0KGRhdGUpLnJlcGxhY2UoL1tcXHUyMDBlXFx1MjAwZl0vZywgJycpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBERUZBVUxUX0RBVEVfTkFNRVM7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIERFRkFVTFRfSE9VUl9OQU1FUztcclxuICB9XHJcblxyXG4gIGdldE1pbnV0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBERUZBVUxUX01JTlVURV9OQU1FUztcclxuICB9XHJcblxyXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBsdXhvbldlZWtkYXlzID0gWy4uLkluZm8ud2Vla2RheXMoc3R5bGUsIHsgbG9jYWxlOiB0aGlzLmxvY2FsZSB9KV07XHJcbiAgICAvLyBsdXhvbiByZXR1cm5zIHRoZSBmaXJzdCBkYXkgb2Ygd2VlayBhcyBNb25kYXlcclxuICAgIC8vIGJ1dCBhbmd1bGFyIG1hdGVyaWFsIGV4cGVjdHMgU3VuZGF5LCBzbyB3ZSByb3RhdGUgdGhlIGFycmF5XHJcbiAgICBsdXhvbldlZWtkYXlzLnVuc2hpZnQobHV4b25XZWVrZGF5cy5wb3AoKSEpO1xyXG4gICAgcmV0dXJuIGx1eG9uV2Vla2RheXM7XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlVGltZSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZGF0ZS50b0Zvcm1hdCgneXl5eScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcclxuICAgIC8vIEx1eG9uIGRvZXNuJ3QgaGF2ZSBzdXBwb3J0IGZvciBnZXR0aW5nIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBpZiAodGhpcy5fZ2V0Rmlyc3REYXlPZldlZWspIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2dldEZpcnN0RGF5T2ZXZWVrKHRoaXMubG9jYWxlKTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRGF0ZVRpbWUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZGF5c0luTW9udGg7XHJcbiAgfVxyXG5cclxuICBjbG9uZShkYXRlOiBEYXRlVGltZSk6IERhdGVUaW1lIHtcclxuICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KGRhdGUudG9PYmplY3QoeyBpbmNsdWRlQ29uZmlnOiB0cnVlIH0pKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURhdGUoXHJcbiAgICB5ZWFyOiBudW1iZXIsXHJcbiAgICBtb250aDogbnVtYmVyLFxyXG4gICAgZGF0ZTogbnVtYmVyLFxyXG4gICAgaG91cnM6IG51bWJlciA9IDAsXHJcbiAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxyXG4gICAgc2Vjb25kczogbnVtYmVyID0gMCxcclxuICAgIG1zOiBudW1iZXIgPSAwXHJcbiAgKTogRGF0ZVRpbWUge1xyXG4gICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XHJcbiAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRlIDwgMSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMdXhvbiB1c2VzIDEtaW5kZXhlZCBtb250aHMgc28gd2UgbmVlZCB0byBhZGQgb25lIHRvIHRoZSBtb250aC5cclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3VzZVVUQ1xyXG4gICAgICA/IERhdGVUaW1lLnV0Yyh5ZWFyLCBtb250aCArIDEsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtcylcclxuICAgICAgOiBEYXRlVGltZS5sb2NhbCh5ZWFyLCBtb250aCArIDEsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtcyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQocmVzdWx0KSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBSZWFzb246IFwiJHtyZXN1bHQuaW52YWxpZFJlYXNvbn1cIi5gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0LnNldExvY2FsZSh0aGlzLmxvY2FsZSk7XHJcbiAgfVxyXG5cclxuICB0b2RheSgpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX3VzZVVUQyA/IERhdGVUaW1lLnV0YygpIDogRGF0ZVRpbWUubG9jYWwoKSkuc2V0TG9jYWxlKFxyXG4gICAgICB0aGlzLmxvY2FsZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IERhdGVUaW1lIHwgbnVsbCB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBEYXRlVGltZU9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGlzbzg2MDFEYXRlID0gRGF0ZVRpbWUuZnJvbUlTTyh2YWx1ZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5pc1ZhbGlkKGlzbzg2MDFEYXRlKSkge1xyXG4gICAgICAgIHJldHVybiBpc284NjAxRGF0ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGFyc2VGb3JtYXRzID0gQXJyYXkuaXNBcnJheShwYXJzZUZvcm1hdClcclxuICAgICAgICA/IHBhcnNlRm9ybWF0XHJcbiAgICAgICAgOiBbcGFyc2VGb3JtYXRdO1xyXG4gICAgICBmb3IgKGNvbnN0IGZvcm1hdCBvZiBwYXJzZUZvcm1hdHMpIHtcclxuICAgICAgICBjb25zdCBmcm9tRm9ybWF0ID0gRGF0ZVRpbWUuZnJvbUZvcm1hdCh2YWx1ZSwgZm9ybWF0LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChmcm9tRm9ybWF0KSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZyb21Gb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkKCk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21NaWxsaXModmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21KU0RhdGUodmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lKSB7XHJcbiAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tTWlsbGlzKHZhbHVlLnRvTWlsbGlzKCksIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0KGRhdGU6IERhdGVUaW1lLCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0x1eG9uRGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGVcclxuICAgICAgLnNldExvY2FsZSh0aGlzLmxvY2FsZSlcclxuICAgICAgLnRvRm9ybWF0KGRpc3BsYXlGb3JtYXQsIHsgdGltZVpvbmU6IHRoaXMuX3VzZVVUQyA/ICd1dGMnIDogdW5kZWZpbmVkIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBEYXRlVGltZSwgeWVhcnM6IG51bWJlcik6IERhdGVUaW1lIHtcclxuICAgIHJldHVybiBkYXRlLnBsdXMoeyB5ZWFycyB9KS5zZXRMb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZVRpbWUsIG1vbnRoczogbnVtYmVyKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIGRhdGUucGx1cyh7IG1vbnRocyB9KS5zZXRMb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IERhdGVUaW1lLCBkYXlzOiBudW1iZXIpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gZGF0ZS5wbHVzKHsgZGF5cyB9KS5zZXRMb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJIb3VycyhkYXRlOiBEYXRlVGltZSwgaG91cnM6IG51bWJlcik6IERhdGVUaW1lIHtcclxuICAgIHJldHVybiBkYXRlLnBsdXMoeyBob3VycyB9KTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBEYXRlVGltZSwgbWludXRlczogbnVtYmVyKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIGRhdGUucGx1cyh7IG1pbnV0ZXMgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhclNlY29uZHMoZGF0ZTogRGF0ZVRpbWUsIHNlY29uZHM6IG51bWJlciwgbXM/OiBudW1iZXIpOiBEYXRlVGltZSB7XHJcbiAgICByZXR1cm4gZGF0ZS5wbHVzKHsgc2Vjb25kcywgbWlsbGlzZWNvbmRzOiBtcyB9KTtcclxuICB9XHJcblxyXG4gIHRvSXNvODYwMShkYXRlOiBEYXRlVGltZSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZGF0ZS50b0lTTygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgZ2l2ZW4gYSB2YWxpZCBMdXhvbiBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xyXG4gICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGFuZCB2YWxpZCBEYXRlIG9iamVjdHMgaW50byB2YWxpZCBEYXRlVGltZSBhbmQgZW1wdHlcclxuICAgKiBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cclxuICAgKi9cclxuICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRGF0ZVRpbWUgfCBudWxsIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XHJcbiAgICBsZXQgZGF0ZTtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgZGF0ZSA9IERhdGVUaW1lLmZyb21KU0RhdGUodmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGUgPSBEYXRlVGltZS5mcm9tSVNPKHZhbHVlLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGVUaW1lO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBEYXRlVGltZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGRhdGUuaXNWYWxpZDtcclxuICB9XHJcblxyXG4gIGludmFsaWQoKTogRGF0ZVRpbWUge1xyXG4gICAgcmV0dXJuIERhdGVUaW1lLmludmFsaWQoJ0ludmFsaWQgTHV4b24gRGF0ZVRpbWUgb2JqZWN0LicpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHMgdGhlIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB3aGVuIGNvbnN0cnVjdGluZyBhIG5ldyBgRGF0ZVRpbWVgIG9iamVjdC4gKi9cclxuICBwcml2YXRlIF9nZXRPcHRpb25zKCk6IERhdGVUaW1lT3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB6b25lOiB0aGlzLl91c2VVVEMgPyAndXRjJyA6IHVuZGVmaW5lZCxcclxuICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==