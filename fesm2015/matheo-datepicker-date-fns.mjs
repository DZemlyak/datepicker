import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter as DateAdapter$1, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { getYear, getMonth, getDate, getHours, setHours, getMinutes, setMinutes, getSeconds, setSeconds, getMilliseconds, getDay, format, setMonth, setDay, getDaysInMonth, toDate, parse, addYears, addMonths, addDays, addHours, addMinutes, addSeconds, parseJSON, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz/esm';
import { enUS } from 'date-fns/esm/locale';

const MAT_DATE_FNS_LOCALES = new InjectionToken('MAT_DATE_FNS_LOCALES');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const UTC_TIMEZONE = 'UTC';
/** InjectionToken for DateFnsAdapter to configure options. */
const MAT_DATE_FNS_ADAPTER_OPTIONS = new InjectionToken('MAT_DATE_FNS_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
    };
}
/** Creates an array of numbers. */
function range(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
}
/** Adapts date-fns Dates for use with Angular Material. */
class DateFnsAdapter extends DateAdapter {
    constructor(dateLocale, locales, options) {
        super();
        this.locales = locales;
        this.options = options;
        this.getLocale = (localeCodeOrLocale) => {
            if (localeCodeOrLocale && localeCodeOrLocale.code) {
                return localeCodeOrLocale;
            }
            if (!this.locales || !this.locales.length) {
                throw new Error('locales array does not provided or is empty');
            }
            const locale = this.locales.find((item) => item.code === localeCodeOrLocale);
            if (!locale) {
                throw new Error(`locale '${localeCodeOrLocale}' does not exist`);
            }
            return locale;
        };
        try {
            this.setLocale(dateLocale || enUS);
        }
        catch (err) {
            this.setLocale(enUS);
        }
    }
    setLocale(locale) {
        if (!locale) {
            throw new Error('setLocale should be called with the string locale code or date-fns Locale object');
        }
        this._dateFnsLocale = this.getLocale(locale);
        super.setLocale(locale);
    }
    getYear(date) {
        return getYear(date);
    }
    getMonth(date) {
        return getMonth(date);
    }
    getDate(date) {
        return getDate(date);
    }
    getHours(date) {
        return getHours(date);
    }
    setHours(date, hours) {
        return setHours(date, hours);
    }
    getMinutes(date) {
        return getMinutes(date);
    }
    setMinutes(date, minutes) {
        return setMinutes(date, minutes);
    }
    getSeconds(date) {
        return getSeconds(date);
    }
    setSeconds(date, seconds, ms) {
        return setSeconds(date, seconds);
    }
    getMilliseconds(date) {
        return getMilliseconds(date);
    }
    getDayOfWeek(date) {
        return getDay(date);
    }
    getMonthNames(style) {
        const map = {
            long: 'LLLL',
            short: 'LLL',
            narrow: 'LLLLL',
        };
        const formatStr = map[style];
        const date = new Date();
        return range(0, 11).map((month) => format(setMonth(date, month), formatStr, {
            locale: this._dateFnsLocale,
        }));
    }
    getDateNames() {
        return range(1, 31).map((day) => String(day));
    }
    getHourNames() {
        return range(0, 23).map((i) => (i === 0 ? '00' : String(i)));
    }
    getMinuteNames() {
        return range(0, 59).map(String);
    }
    getDayOfWeekNames(style) {
        const map = {
            long: 'EEEE',
            short: 'EEE',
            narrow: 'EEEEE',
        };
        const formatStr = map[style];
        const date = new Date();
        return range(0, 6).map((month) => format(setDay(date, month), formatStr, {
            locale: this._dateFnsLocale,
        }));
    }
    getYearName(date) {
        return format(date, 'yyyy', {
            locale: this._dateFnsLocale,
        });
    }
    getFirstDayOfWeek() {
        return this._dateFnsLocale.options.weekStartsOn;
    }
    getNumDaysInMonth(date) {
        return getDaysInMonth(date);
    }
    clone(date) {
        return toDate(date);
    }
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        const result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds, ms);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    today() {
        return new Date();
    }
    parse(value, parseFormat) {
        if (value) {
            if (typeof value === 'string') {
                if (this.options.useUtc) {
                    const d = parse(value.trim(), parseFormat, new Date(), {
                        locale: this._dateFnsLocale,
                    });
                    return zonedTimeToUtc(d, UTC_TIMEZONE);
                }
                return parse(value.trim(), parseFormat, new Date(), {
                    locale: this._dateFnsLocale,
                });
            }
            if (typeof value === 'number') {
                return toDate(value);
            }
            if (value instanceof Date) {
                return this.clone(value);
            }
            return null;
        }
        return null;
    }
    format(date, displayFormat) {
        return format(date, displayFormat, { locale: this._dateFnsLocale });
    }
    addCalendarYears(date, years) {
        return addYears(date, years);
    }
    addCalendarMonths(date, months) {
        return addMonths(date, months);
    }
    addCalendarDays(date, days) {
        return addDays(date, days);
    }
    addCalendarHours(date, hours) {
        return addHours(date, hours);
    }
    addCalendarMinutes(date, minutes) {
        return addMinutes(date, minutes);
    }
    addCalendarSeconds(date, seconds, ms) {
        return addSeconds(date, seconds);
    }
    toIso8601(date) {
        return date.toISOString();
    }
    deserialize(value) {
        if (value) {
            if (typeof value === 'string') {
                if (this.options.useUtc) {
                    return parseJSON(value);
                }
                return parseISO(value);
            }
            if (typeof value === 'number') {
                return toDate(value);
            }
            if (value instanceof Date) {
                return this.clone(value);
            }
            return null;
        }
        return null;
    }
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    isValid(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }
    invalid() {
        return new Date(NaN);
    }
    /** Creates a date but allows the month and date to overflow. */
    _createDateWithOverflow(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        const result = this._createDateInternal(year, month, date, hours, minutes, seconds, ms);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    _createDateInternal(year, month, date, hours, minutes, seconds, ms) {
        if (this.options.useUtc) {
            return zonedTimeToUtc(new Date(year, month, date, hours, minutes, seconds, ms), UTC_TIMEZONE);
        }
        return new Date(year, month, date, hours, minutes, seconds, ms);
    }
}
/** @nocollapse */ /** @nocollapse */ DateFnsAdapter.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsAdapter, deps: [{ token: MAT_DATE_LOCALE, optional: true }, { token: MAT_DATE_FNS_LOCALES }, { token: MAT_DATE_FNS_ADAPTER_OPTIONS, optional: true }], target: i0.????FactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ DateFnsAdapter.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsAdapter });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MAT_DATE_LOCALE]
                    }] }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_DATE_FNS_LOCALES]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MAT_DATE_FNS_ADAPTER_OPTIONS]
                    }] }];
    } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// https://date-fns.org/v2.21.3/docs/format
const MAT_DATE_FNS_FORMATS = {
    parse: {
        dateInput: 'P',
        datetimeInput: 'f',
        timeInput: 'H:mm',
        monthInput: 'MMM',
        yearInput: 'yyyy',
    },
    display: {
        dateInput: 'P',
        datetimeInput: 'Pp',
        timeInput: 'p',
        monthInput: 'MMM yyyy',
        yearInput: 'yyyy',
        dateA11yLabel: 'PP',
        monthLabel: 'MMM',
        monthDayLabel: 'MMM d',
        monthDayA11yLabel: 'MMMM d',
        monthYearLabel: 'MMM yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
        timeLabel: 'p',
    },
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class DateFnsModule {
}
/** @nocollapse */ /** @nocollapse */ DateFnsModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ DateFnsModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule });
/** @nocollapse */ /** @nocollapse */ DateFnsModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, providers: [
        {
            provide: DateAdapter,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
        },
        {
            provide: DateAdapter$1,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
        },
    ] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: DateAdapter,
                            useClass: DateFnsAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
                        },
                        {
                            provide: DateAdapter$1,
                            useClass: DateFnsAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
                        },
                    ],
                }]
        }] });
class MatDateFnsModule {
}
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, imports: [DateFnsModule] });
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, providers: [
        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
        { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
    ], imports: [[DateFnsModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DateFnsModule],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                        { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DateFnsAdapter, DateFnsModule, MAT_DATE_FNS_ADAPTER_OPTIONS, MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY, MAT_DATE_FNS_FORMATS, MAT_DATE_FNS_LOCALES, MatDateFnsModule };
//# sourceMappingURL=matheo-datepicker-date-fns.mjs.map
