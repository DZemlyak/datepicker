/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export const MAT_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
        datetimeInput: null,
        timeInput: null,
        monthInput: null,
        yearInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        datetimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        },
        timeInput: { hour: 'numeric', minute: 'numeric' },
        monthInput: { month: 'short', year: 'numeric' },
        yearInput: { year: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthLabel: { month: 'short' },
        monthDayLabel: { month: 'short', day: 'numeric' },
        monthDayA11yLabel: { month: 'long', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
        timeLabel: { hours: 'numeric', minutes: 'numeric' },
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9jb3JlL2RhdGV0aW1lL25hdGl2ZS1kYXRlLWZvcm1hdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBS0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQW1CO0lBQ3JELEtBQUssRUFBRTtRQUNMLFNBQVMsRUFBRSxJQUFJO1FBQ2YsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtRQUNoQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO1FBQzlELGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxTQUFTO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDO1FBQy9DLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUM3QyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQzVCLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO1FBQy9ELFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7UUFDNUIsYUFBYSxFQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO1FBQy9DLGlCQUFpQixFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO1FBQ2xELGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztRQUNqRCxrQkFBa0IsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztRQUNwRCxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUM7S0FDbEQ7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge01hdERhdGVGb3JtYXRzfSBmcm9tICcuL2RhdGUtZm9ybWF0cyc7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IE1BVF9OQVRJVkVfREFURV9GT1JNQVRTOiBNYXREYXRlRm9ybWF0cyA9IHtcclxuICBwYXJzZToge1xyXG4gICAgZGF0ZUlucHV0OiBudWxsLFxyXG4gICAgZGF0ZXRpbWVJbnB1dDogbnVsbCxcclxuICAgIHRpbWVJbnB1dDogbnVsbCxcclxuICAgIG1vbnRoSW5wdXQ6IG51bGwsXHJcbiAgICB5ZWFySW5wdXQ6IG51bGwsXHJcbiAgfSxcclxuICBkaXNwbGF5OiB7XHJcbiAgICBkYXRlSW5wdXQ6IHt5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnfSxcclxuICAgIGRhdGV0aW1lSW5wdXQ6IHtcclxuICAgICAgeWVhcjogJ251bWVyaWMnLFxyXG4gICAgICBtb250aDogJ251bWVyaWMnLFxyXG4gICAgICBkYXk6ICdudW1lcmljJyxcclxuICAgICAgaG91cjogJ251bWVyaWMnLFxyXG4gICAgICBtaW51dGU6ICdudW1lcmljJ1xyXG4gICAgfSxcclxuICAgIHRpbWVJbnB1dDoge2hvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYyd9LFxyXG4gICAgbW9udGhJbnB1dDoge21vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYyd9LFxyXG4gICAgeWVhcklucHV0OiB7eWVhcjogJ251bWVyaWMnfSxcclxuICAgIGRhdGVBMTF5TGFiZWw6IHt5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnfSxcclxuICAgIG1vbnRoTGFiZWw6IHttb250aDogJ3Nob3J0J30sXHJcbiAgICBtb250aERheUxhYmVsOiB7bW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnfSxcclxuICAgIG1vbnRoRGF5QTExeUxhYmVsOiB7bW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYyd9LFxyXG4gICAgbW9udGhZZWFyTGFiZWw6IHt5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnc2hvcnQnfSxcclxuICAgIG1vbnRoWWVhckExMXlMYWJlbDoge3llYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJ30sXHJcbiAgICB0aW1lTGFiZWw6IHtob3VyczogJ251bWVyaWMnLCBtaW51dGVzOiAnbnVtZXJpYyd9LFxyXG4gIH1cclxufTtcclxuIl19