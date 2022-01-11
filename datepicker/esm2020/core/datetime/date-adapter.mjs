/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subject } from 'rxjs';
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
export class DateAdapter {
    constructor() {
        this._localeChanges = new Subject();
        /** A stream that emits when the locale changes. */
        this.localeChanges = this._localeChanges;
    }
    /**
     * Given a potential date object, returns that same date object if it is
     * a valid date, or `null` if it's not a valid date.
     * @param obj The object to check.
     * @returns A date or `null`.
     */
    getValidDateOrNull(obj) {
        return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
    }
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of its `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @param unit Unit deep of the comparision.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second, unit = 'minute') {
        let d1 = this.getYear(first).toString();
        let d2 = this.getYear(second).toString();
        if (['y', 'year', 'years'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getMonth(first).toString().padStart(2, '0');
        d2 += this.getMonth(second).toString().padStart(2, '0');
        if (['M', 'month', 'months'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getDate(first).toString().padStart(2, '0');
        d2 += this.getDate(second).toString().padStart(2, '0');
        if (['d', 'day', 'days'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getHours(first).toString().padStart(2, '0');
        d2 += this.getHours(second).toString().padStart(2, '0');
        if (['h', 'hour', 'hours'].indexOf(unit) >= 0) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getMinutes(first).toString().padStart(2, '0');
        d2 += this.getMinutes(second).toString().padStart(2, '0');
        return Number(d1) - Number(d2);
    }
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second, unit = 'minute') {
        if (first && second) {
            let firstValid = this.isValid(first);
            let secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second, unit);
            }
            return firstValid == secondValid;
        }
        return first == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max, unit = 'minute') {
        if (min && this.compareDate(date, min, unit) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max, unit) > 0) {
            return max;
        }
        return date;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL2NvcmUvZGF0ZXRpbWUvZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFTekMsMkZBQTJGO0FBQzNGLE1BQU0sT0FBZ0IsV0FBVztJQUFqQztRQUdZLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUUvQyxtREFBbUQ7UUFDMUMsa0JBQWEsR0FBcUIsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQTZUakUsQ0FBQztJQXJIQTs7Ozs7T0FLRztJQUNGLGtCQUFrQixDQUFDLEdBQVk7UUFDN0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTLENBQUMsTUFBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsV0FBVyxDQUFDLEtBQVEsRUFBRSxNQUFTLEVB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QUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksVUFBVSxJQUFJLFdBQVcsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sVUFBVSxJQUFJLFdBQVcsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxJQUFJLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFNBQVMsQ0FBQyxJQUFPLEVBQUUsR0FBYyxFQUFFLEdBQWMsRUFBRSxPQUFpQixRQUFRO1FBQzFFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0ZVVuaXQgPVxyXG4gIHwgJ3knIHwgJ3llYXInIHwgJ3llYXJzJ1xyXG4gIHwgJ00nIHwgJ21vbnRoJyB8ICdtb250aHMnXHJcbiAgfCAnZCcgfCAnZGF5JyB8ICdkYXlzJ1xyXG4gIHwgJ2gnIHwgJ2hvdXInIHwgJ2hvdXJzJ1xyXG4gIHwgJ20nIHwgJ21pbnV0ZScgfCAnbWludXRlcyc7XHJcblxyXG4vKiogQWRhcHRzIHR5cGUgYERgIHRvIGJlIHVzYWJsZSBhcyBhIGRhdGUgYnkgY2RrLWJhc2VkIGNvbXBvbmVudHMgdGhhdCB3b3JrIHdpdGggZGF0ZXMuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqIFRoZSBsb2NhbGUgdG8gdXNlIGZvciBhbGwgZGF0ZXMuICovXHJcbiAgcHJvdGVjdGVkIGxvY2FsZTogYW55O1xyXG4gIHByb3RlY3RlZCBfbG9jYWxlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xyXG4gIHJlYWRvbmx5IGxvY2FsZUNoYW5nZXM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9sb2NhbGVDaGFuZ2VzO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB5ZWFyIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSB5ZWFyIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIHllYXIgY29tcG9uZW50LlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFllYXIoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIG1vbnRoIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0SG91cnMoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3Qgc2V0SG91cnMoZGF0ZTogRCwgdmFsdWU6IG51bWJlcik6IEQ7XHJcblxyXG4gIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3Qgc2V0TWludXRlcyhkYXRlOiBELCB2YWx1ZTogbnVtYmVyKTogRDtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0U2Vjb25kcyhkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICBhYnN0cmFjdCBzZXRTZWNvbmRzKGRhdGU6IEQsIHZhbHVlOiBudW1iZXIsIG1zPzogbnVtYmVyKTogRDtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IEQpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXRlIG9mIHRoZSBtb250aCBmcm9tLlxyXG4gICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDEtaW5kZXhlZCwgMSA9IGZpcnN0IG9mIG1vbnRoKS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXRlKGRhdGU6IEQpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGRheSBvZiB0aGUgd2VlayBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gU3VuZGF5KS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlPZldlZWsoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBtb250aHMuXHJcbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdKYW51YXJ5Jywgc2hvcnQgPSAnSmFuJywgbmFycm93ID0gJ0onKS5cclxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoIEphbnVhcnkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxyXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgZGF0ZSBvZiB0aGUgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggJzEnLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0SG91ck5hbWVzKCk6IHN0cmluZ1tdO1xyXG5cclxuICBhYnN0cmFjdCBnZXRNaW51dGVOYW1lcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxyXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgbmFtaW5nIHN0eWxlIChlLmcuIGxvbmcgPSAnU3VuZGF5Jywgc2hvcnQgPSAnU3VuJywgbmFycm93ID0gJ1MnKS5cclxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIHdlZWtkYXkgbmFtZXMsIHN0YXJ0aW5nIHdpdGggU3VuZGF5LlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSB5ZWFyIG5hbWUgZm9yLlxyXG4gICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBnaXZlbiB5ZWFyIChlLmcuICcyMDE3JykuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAqIEByZXR1cm5zIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgd2hvc2UgbW9udGggc2hvdWxkIGJlIGNoZWNrZWQuXHJcbiAgICogQHJldHVybnMgVGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDbG9uZXMgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2xvbmVcclxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGNsb25lKGRhdGU6IEQpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgYW5kIGRhdGUuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcclxuICAgKiBtb250aCBhbmQgZGF0ZS5cclxuICAgKiBAcGFyYW0geWVhciBUaGUgZnVsbCB5ZWFyIG9mIHRoZSBkYXRlLiAoZS5nLiA4OSBtZWFucyB0aGUgeWVhciA4OSwgbm90IHRoZSB5ZWFyIDE5ODkpLlxyXG4gICAqIEBwYXJhbSBtb250aCBUaGUgbW9udGggb2YgdGhlIGRhdGUgKDAtaW5kZXhlZCwgMCA9IEphbnVhcnkpLiBNdXN0IGJlIGFuIGludGVnZXIgMCAtIDExLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXHJcbiAgICogQHJldHVybnMgVGhlIG5ldyBkYXRlLCBvciBudWxsIGlmIGludmFsaWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgY3JlYXRlRGF0ZShcclxuICAgIHllYXI6IG51bWJlcixcclxuICAgIG1vbnRoOiBudW1iZXIsXHJcbiAgICBkYXRlOiBudW1iZXIsXHJcbiAgICBob3Vycz86IG51bWJlcixcclxuICAgIG1pbnV0ZXM/OiBudW1iZXIsXHJcbiAgICBzZWNvbmRzPzogbnVtYmVyLFxyXG4gICAgbXM/OiBudW1iZXIsXHJcbiAgKTogRDtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0b2RheSdzIGRhdGUuXHJcbiAgICogQHJldHVybnMgVG9kYXkncyBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IHRvZGF5KCk6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyBhIGRhdGUgZnJvbSBhIHVzZXItcHJvdmlkZWQgdmFsdWUuXHJcbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBwYXJzZS5cclxuICAgKiBAcGFyYW0gcGFyc2VGb3JtYXQgVGhlIGV4cGVjdGVkIGZvcm1hdCBvZiB0aGUgdmFsdWUgYmVpbmcgcGFyc2VkXHJcbiAgICogICAgICh0eXBlIGlzIGltcGxlbWVudGF0aW9uLWRlcGVuZGVudCkuXHJcbiAgICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBmb3JtYXQuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIHZhbHVlIHRvIGZvcm1hdC5cclxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBUaGUgZm9ybWF0IHRvIHVzZSB0byBkaXNwbGF5IHRoZSBkYXRlIGFzIGEgc3RyaW5nLlxyXG4gICAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBkYXRlLiBZZWFycyBhcmUgY291bnRlZCBhcyBpZiBmbGlwcGluZyAxMiBwYWdlcyBvbiB0aGVcclxuICAgKiBjYWxlbmRhciBmb3IgZWFjaCB5ZWFyIGFuZCB0aGVuIGZpbmRpbmcgdGhlIGNsb3Nlc3QgZGF0ZSBpbiB0aGUgbmV3IG1vbnRoLiBGb3IgZXhhbXBsZSB3aGVuXHJcbiAgICogYWRkaW5nIDEgeWVhciB0byBGZWIgMjksIDIwMTYsIHRoZSByZXN1bHRpbmcgZGF0ZSB3aWxsIGJlIEZlYiAyOCwgMjAxNy5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgeWVhcnMgdG8uXHJcbiAgICogQHBhcmFtIHllYXJzIFRoZSBudW1iZXIgb2YgeWVhcnMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIGFkZGVkLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRCwgeWVhcnM6IG51bWJlcik6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiBtb250aHMgdG8gdGhlIGRhdGUuIE1vbnRocyBhcmUgY291bnRlZCBhcyBpZiBmbGlwcGluZyBhIHBhZ2Ugb24gdGhlXHJcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggbW9udGggYW5kIHRoZW4gZmluZGluZyB0aGUgY2xvc2VzdCBkYXRlIGluIHRoZSBuZXcgbW9udGguIEZvciBleGFtcGxlIHdoZW5cclxuICAgKiBhZGRpbmcgMSBtb250aCB0byBKYW4gMzEsIDIwMTcsIHRoZSByZXN1bHRpbmcgZGF0ZSB3aWxsIGJlIEZlYiAyOCwgMjAxNy5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgbW9udGhzIHRvLlxyXG4gICAqIEBwYXJhbSBtb250aHMgVGhlIG51bWJlciBvZiBtb250aHMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyBhZGRlZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBELCBtb250aHM6IG51bWJlcik6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiBkYXlzIHRvIHRoZSBkYXRlLiBEYXlzIGFyZSBjb3VudGVkIGFzIGlmIG1vdmluZyBvbmUgY2VsbCBvbiB0aGVcclxuICAgKiBjYWxlbmRhciBmb3IgZWFjaCBkYXkuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIGRheXMgdG8uXHJcbiAgICogQHBhcmFtIGRheXMgVGhlIG51bWJlciBvZiBkYXlzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cclxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGFkZGVkLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyRGF5cyhkYXRlOiBELCBkYXlzOiBudW1iZXIpOiBEO1xyXG5cclxuICBhYnN0cmFjdCBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IEQsIGhvdXJzOiBudW1iZXIpOiBEO1xyXG5cclxuICBhYnN0cmFjdCBhZGRDYWxlbmRhck1pbnV0ZXMoZGF0ZTogRCwgbWludXRlczogbnVtYmVyKTogRDtcclxuXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJTZWNvbmRzKGRhdGU6IEQsIHNlY29uZHM6IG51bWJlciwgbXM/OiBudW1iZXIpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBSRkMgMzMzOSBjb21wYXRpYmxlIHN0cmluZyAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGdlbmVyYXRlIGRhdGUgc3RyaW5ncyB0aGF0IGFyZSBjb21wYXRpYmxlIHdpdGggbmF0aXZlIEhUTUwgYXR0cmlidXRlc1xyXG4gICAqIHN1Y2ggYXMgdGhlIGBtaW5gIG9yIGBtYXhgIGF0dHJpYnV0ZSBvZiBhbiBgPGlucHV0PmAuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSBJU08gZGF0ZSBzdHJpbmcgZm9yLlxyXG4gICAqIEByZXR1cm5zIFRoZSBJU08gZGF0ZSBzdHJpbmcgZGF0ZSBzdHJpbmcuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgdG9Jc284NjAxKGRhdGU6IEQpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIGRhdGUgaW5zdGFuY2UgYnkgdGhpcyBEYXRlQWRhcHRlci5cclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2tcclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBvYmplY3QgaXMgYSBkYXRlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGUgaXMgdmFsaWQuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZGF0ZSBpcyB2YWxpZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IEQpOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGRhdGUgaW5zdGFuY2UgdGhhdCBpcyBub3QgdmFsaWQuXHJcbiAgICogQHJldHVybnMgQW4gaW52YWxpZCBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGludmFsaWQoKTogRDtcclxuXHJcbiAvKipcclxuICAqIEdpdmVuIGEgcG90ZW50aWFsIGRhdGUgb2JqZWN0LCByZXR1cm5zIHRoYXQgc2FtZSBkYXRlIG9iamVjdCBpZiBpdCBpc1xyXG4gICogYSB2YWxpZCBkYXRlLCBvciBgbnVsbGAgaWYgaXQncyBub3QgYSB2YWxpZCBkYXRlLlxyXG4gICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gICogQHJldHVybnMgQSBkYXRlIG9yIGBudWxsYC5cclxuICAqL1xyXG4gIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IHVua25vd24pOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuaXNWYWxpZChvYmogYXMgRCkgPyBvYmogYXMgRCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRlbXB0cyB0byBkZXNlcmlhbGl6ZSBhIHZhbHVlIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3QuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gcGFyc2luZyBpbiB0aGF0XHJcbiAgICogZGVzZXJpYWxpemUgc2hvdWxkIG9ubHkgYWNjZXB0IG5vbi1hbWJpZ3VvdXMsIGxvY2FsZS1pbmRlcGVuZGVudCBmb3JtYXRzIChlLmcuIGEgSVNPIDg2MDFcclxuICAgKiBzdHJpbmcpLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBhbGxvdyBhbnkgZGVzZXJpYWxpemF0aW9uLCBpdCBzaW1wbHkgY2hlY2tzIHRoYXRcclxuICAgKiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYWxyZWFkeSBhIHZhbGlkIGRhdGUgb2JqZWN0IG9yIG51bGwuIFRoZSBgPG1hdC1kYXRlcGlja2VyPmAgd2lsbCBjYWxsIHRoaXNcclxuICAgKiBtZXRob2Qgb24gYWxsIG9mIGl0cyBgQElucHV0KClgIHByb3BlcnRpZXMgdGhhdCBhY2NlcHQgZGF0ZXMuIEl0IGlzIHRoZXJlZm9yZSBwb3NzaWJsZSB0b1xyXG4gICAqIHN1cHBvcnQgcGFzc2luZyB2YWx1ZXMgZnJvbSB5b3VyIGJhY2tlbmQgZGlyZWN0bHkgdG8gdGhlc2UgcHJvcGVydGllcyBieSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kXHJcbiAgICogdG8gYWxzbyBkZXNlcmlhbGl6ZSB0aGUgZm9ybWF0IHVzZWQgYnkgeW91ciBiYWNrZW5kLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgZGVzZXJpYWxpemVkIGludG8gYSBkYXRlIG9iamVjdC5cclxuICAgKiBAcmV0dXJucyBUaGUgZGVzZXJpYWxpemVkIGRhdGUgb2JqZWN0LCBlaXRoZXIgYSB2YWxpZCBkYXRlLCBudWxsIGlmIHRoZSB2YWx1ZSBjYW4gYmVcclxuICAgKiAgICAgZGVzZXJpYWxpemVkIGludG8gYSBudWxsIGRhdGUgKGUuZy4gdGhlIGVtcHR5IHN0cmluZyksIG9yIGFuIGludmFsaWQgZGF0ZS5cclxuICAgKi9cclxuICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRCB8IG51bGwge1xyXG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgdGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkgJiYgdGhpcy5pc1ZhbGlkKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxyXG4gICAqIEBwYXJhbSBsb2NhbGUgVGhlIG5ldyBsb2NhbGUuXHJcbiAgICovXHJcbiAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XHJcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcclxuICAgIHRoaXMuX2xvY2FsZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGFyZXMgdHdvIGRhdGVzLlxyXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlLlxyXG4gICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmUuXHJcbiAgICogQHBhcmFtIHVuaXQgVW5pdCBkZWVwIG9mIHRoZSBjb21wYXJpc2lvbi5cclxuICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXHJcbiAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxyXG4gICAqL1xyXG4gIGNvbXBhcmVEYXRlKGZpcnN0OiBELCBzZWNvbmQ6IEQsIHVuaXQ6IERhdGVVbml0ID0gJ21pbnV0ZScpOiBudW1iZXIge1xyXG4gICAgbGV0IGQxID0gdGhpcy5nZXRZZWFyKGZpcnN0KS50b1N0cmluZygpO1xyXG4gICAgbGV0IGQyID0gdGhpcy5nZXRZZWFyKHNlY29uZCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICBpZiAoWyd5JywgJ3llYXInLCAneWVhcnMnXS5pbmNsdWRlcyh1bml0KSkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyKGQxKSAtIE51bWJlcihkMik7XHJcbiAgICB9XHJcblxyXG4gICAgZDEgKz0gdGhpcy5nZXRNb250aChmaXJzdCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgZDIgKz0gdGhpcy5nZXRNb250aChzZWNvbmQpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICBpZiAoWydNJywgJ21vbnRoJywgJ21vbnRocyddLmluY2x1ZGVzKHVuaXQpKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZDEpIC0gTnVtYmVyKGQyKTtcclxuICAgIH1cclxuXHJcbiAgICBkMSArPSB0aGlzLmdldERhdGUoZmlyc3QpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGQyICs9IHRoaXMuZ2V0RGF0ZShzZWNvbmQpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICBpZiAoWydkJywgJ2RheScsICdkYXlzJ10uaW5jbHVkZXModW5pdCkpIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihkMSkgLSBOdW1iZXIoZDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGQxICs9IHRoaXMuZ2V0SG91cnMoZmlyc3QpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGQyICs9IHRoaXMuZ2V0SG91cnMoc2Vjb25kKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgaWYgKFsnaCcsICdob3VyJywgJ2hvdXJzJ10uaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZDEpIC0gTnVtYmVyKGQyKTtcclxuICAgIH1cclxuXHJcbiAgICBkMSArPSB0aGlzLmdldE1pbnV0ZXMoZmlyc3QpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGQyICs9IHRoaXMuZ2V0TWludXRlcyhzZWNvbmQpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICByZXR1cm4gTnVtYmVyKGQxKSAtIE51bWJlcihkMik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgdHdvIGRhdGVzIGFyZSBlcXVhbC5cclxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2suXHJcbiAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgdHdvIGRhdGVzIGFyZSBlcXVhbC5cclxuICAgKiAgICAgTnVsbCBkYXRlcyBhcmUgY29uc2lkZXJlZCBlcXVhbCB0byBvdGhlciBudWxsIGRhdGVzLlxyXG4gICAqL1xyXG4gIHNhbWVEYXRlKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCwgdW5pdDogRGF0ZVVuaXQgPSAnbWludXRlJyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGZpcnN0ICYmIHNlY29uZCkge1xyXG4gICAgICBsZXQgZmlyc3RWYWxpZCA9IHRoaXMuaXNWYWxpZChmaXJzdCk7XHJcbiAgICAgIGxldCBzZWNvbmRWYWxpZCA9IHRoaXMuaXNWYWxpZChzZWNvbmQpO1xyXG4gICAgICBpZiAoZmlyc3RWYWxpZCAmJiBzZWNvbmRWYWxpZCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZShmaXJzdCwgc2Vjb25kLCB1bml0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmlyc3RWYWxpZCA9PSBzZWNvbmRWYWxpZDtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXJzdCA9PSBzZWNvbmQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGFtcCB0aGUgZ2l2ZW4gZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGRhdGVzLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNsYW1wLlxyXG4gICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gdmFsdWUgdG8gYWxsb3cuIElmIG51bGwgb3Igb21pdHRlZCBubyBtaW4gaXMgZW5mb3JjZWQuXHJcbiAgICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1heCBpcyBlbmZvcmNlZC5cclxuICAgKiBAcmV0dXJucyBgbWluYCBpZiBgZGF0ZWAgaXMgbGVzcyB0aGFuIGBtaW5gLCBgbWF4YCBpZiBkYXRlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCxcclxuICAgKiAgICAgb3RoZXJ3aXNlIGBkYXRlYC5cclxuICAgKi9cclxuICBjbGFtcERhdGUoZGF0ZTogRCwgbWluPzogRCB8IG51bGwsIG1heD86IEQgfCBudWxsLCB1bml0OiBEYXRlVW5pdCA9ICdtaW51dGUnKTogRCB7XHJcbiAgICBpZiAobWluICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWluLCB1bml0KSA8IDApIHtcclxuICAgICAgcmV0dXJuIG1pbjtcclxuICAgIH1cclxuICAgIGlmIChtYXggJiYgdGhpcy5jb21wYXJlRGF0ZShkYXRlLCBtYXgsIHVuaXQpID4gMCkge1xyXG4gICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==