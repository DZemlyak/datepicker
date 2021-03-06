import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter as DateAdapter$1, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { DateTime, Info } from 'luxon';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** InjectionToken for LuxonDateAdapter to configure options. */
const MAT_LUXON_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_LUXON_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY() {
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
class LuxonDateAdapter extends DateAdapter {
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
/** @nocollapse */ /** @nocollapse */ LuxonDateAdapter.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateAdapter, deps: [{ token: MAT_DATE_LOCALE, optional: true }, { token: MAT_LUXON_DATE_ADAPTER_OPTIONS, optional: true }], target: i0.????FactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ LuxonDateAdapter.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateAdapter });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_LOCALE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }] }]; } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_LUXON_DATE_FORMATS = {
    parse: {
        dateInput: 'D',
        datetimeInput: 'f',
        timeInput: 'h:mm',
        monthInput: 'LLL',
        yearInput: 'yyyy',
    },
    display: {
        dateInput: 'D',
        datetimeInput: 'f',
        timeInput: 'T',
        monthInput: 'LLL yyyy',
        yearInput: 'yyyy',
        dateA11yLabel: 'DD',
        monthLabel: 'LLL',
        monthDayLabel: 'LLL d',
        monthDayA11yLabel: 'LLLL d',
        monthYearLabel: 'LLL yyyy',
        monthYearA11yLabel: 'LLLL yyyy',
        timeLabel: 'T',
    },
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class LuxonDateModule {
}
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule });
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, providers: [
        {
            provide: DateAdapter,
            useClass: LuxonDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
        },
        {
            provide: DateAdapter$1,
            useClass: LuxonDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
        },
    ] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: DateAdapter,
                            useClass: LuxonDateAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
                        },
                        {
                            provide: DateAdapter$1,
                            useClass: LuxonDateAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
                        },
                    ],
                }]
        }] });
class MatLuxonDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, imports: [LuxonDateModule] });
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }], imports: [[LuxonDateModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [LuxonDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { LuxonDateAdapter, LuxonDateModule, MAT_LUXON_DATE_ADAPTER_OPTIONS, MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY, MAT_LUXON_DATE_FORMATS, MatLuxonDateModule };
//# sourceMappingURL=matheo-datepicker-luxon.mjs.map
