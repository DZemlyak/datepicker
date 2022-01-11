/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// https://date-fns.org/v2.21.3/docs/format
export const MAT_DATE_FNS_FORMATS = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mbnMtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9kYXRlLWZucy9kYXRlLWZucy1mb3JtYXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUlILDJDQUEyQztBQUUzQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBbUI7SUFDbEQsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLEdBQUc7UUFDZCxhQUFhLEVBQUUsR0FBRztRQUNsQixTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUUsS0FBSztRQUNqQixTQUFTLEVBQUUsTUFBTTtLQUNsQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxHQUFHO1FBQ2QsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLEdBQUc7UUFDZCxVQUFVLEVBQUUsVUFBVTtRQUN0QixTQUFTLEVBQUUsTUFBTTtRQUNqQixhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixhQUFhLEVBQUUsT0FBTztRQUN0QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLGNBQWMsRUFBRSxVQUFVO1FBQzFCLGtCQUFrQixFQUFFLFdBQVc7UUFDL0IsU0FBUyxFQUFFLEdBQUc7S0FDZjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnQG1hdGhlby9kYXRlcGlja2VyL2NvcmUnO1xyXG5cclxuLy8gaHR0cHM6Ly9kYXRlLWZucy5vcmcvdjIuMjEuMy9kb2NzL2Zvcm1hdFxyXG5cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFX0ZOU19GT1JNQVRTOiBNYXREYXRlRm9ybWF0cyA9IHtcclxuICBwYXJzZToge1xyXG4gICAgZGF0ZUlucHV0OiAnUCcsXHJcbiAgICBkYXRldGltZUlucHV0OiAnZicsXHJcbiAgICB0aW1lSW5wdXQ6ICdIOm1tJyxcclxuICAgIG1vbnRoSW5wdXQ6ICdNTU0nLFxyXG4gICAgeWVhcklucHV0OiAneXl5eScsXHJcbiAgfSxcclxuICBkaXNwbGF5OiB7XHJcbiAgICBkYXRlSW5wdXQ6ICdQJyxcclxuICAgIGRhdGV0aW1lSW5wdXQ6ICdQcCcsXHJcbiAgICB0aW1lSW5wdXQ6ICdwJyxcclxuICAgIG1vbnRoSW5wdXQ6ICdNTU0geXl5eScsXHJcbiAgICB5ZWFySW5wdXQ6ICd5eXl5JyxcclxuICAgIGRhdGVBMTF5TGFiZWw6ICdQUCcsXHJcbiAgICBtb250aExhYmVsOiAnTU1NJyxcclxuICAgIG1vbnRoRGF5TGFiZWw6ICdNTU0gZCcsXHJcbiAgICBtb250aERheUExMXlMYWJlbDogJ01NTU0gZCcsXHJcbiAgICBtb250aFllYXJMYWJlbDogJ01NTSB5eXl5JyxcclxuICAgIG1vbnRoWWVhckExMXlMYWJlbDogJ01NTU0geXl5eScsXHJcbiAgICB0aW1lTGFiZWw6ICdwJyxcclxuICB9LFxyXG59O1xyXG4iXX0=