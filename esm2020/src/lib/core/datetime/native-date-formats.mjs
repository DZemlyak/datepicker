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
            minute: 'numeric',
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
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2NvcmUvZGF0ZXRpbWUvbmF0aXZlLWRhdGUtZm9ybWF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBbUI7SUFDckQsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDaEUsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsU0FBUztZQUNoQixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLFNBQVM7U0FDbEI7UUFDRCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7UUFDakQsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1FBQy9DLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7UUFDOUIsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDakUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUM5QixhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDakQsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDcEQsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1FBQ25ELGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1FBQ3RELFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtLQUNwRDtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuL2RhdGUtZm9ybWF0cyc7XG5cbmV4cG9ydCBjb25zdCBNQVRfTkFUSVZFX0RBVEVfRk9STUFUUzogTWF0RGF0ZUZvcm1hdHMgPSB7XG4gIHBhcnNlOiB7XG4gICAgZGF0ZUlucHV0OiBudWxsLFxuICAgIGRhdGV0aW1lSW5wdXQ6IG51bGwsXG4gICAgdGltZUlucHV0OiBudWxsLFxuICAgIG1vbnRoSW5wdXQ6IG51bGwsXG4gICAgeWVhcklucHV0OiBudWxsLFxuICB9LFxuICBkaXNwbGF5OiB7XG4gICAgZGF0ZUlucHV0OiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcbiAgICBkYXRldGltZUlucHV0OiB7XG4gICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJ251bWVyaWMnLFxuICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICB9LFxuICAgIHRpbWVJbnB1dDogeyBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnIH0sXG4gICAgbW9udGhJbnB1dDogeyBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0sXG4gICAgeWVhcklucHV0OiB7IHllYXI6ICdudW1lcmljJyB9LFxuICAgIGRhdGVBMTF5TGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJyB9LFxuICAgIG1vbnRoTGFiZWw6IHsgbW9udGg6ICdzaG9ydCcgfSxcbiAgICBtb250aERheUxhYmVsOiB7IG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJyB9LFxuICAgIG1vbnRoRGF5QTExeUxhYmVsOiB7IG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0sXG4gICAgbW9udGhZZWFyTGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ3Nob3J0JyB9LFxuICAgIG1vbnRoWWVhckExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycgfSxcbiAgICB0aW1lTGFiZWw6IHsgaG91cnM6ICdudW1lcmljJywgbWludXRlczogJ251bWVyaWMnIH0sXG4gIH0sXG59O1xuIl19