/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export const MAT_LUXON_DATE_FORMATS = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHV4b24tZGF0ZS1mb3JtYXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL2x1eG9uL2x1eG9uLWRhdGUtZm9ybWF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBbUI7SUFDcEQsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLEdBQUc7UUFDZCxhQUFhLEVBQUUsR0FBRztRQUNsQixTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUUsS0FBSztRQUNqQixTQUFTLEVBQUUsTUFBTTtLQUNsQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxHQUFHO1FBQ2QsYUFBYSxFQUFFLEdBQUc7UUFDbEIsU0FBUyxFQUFFLEdBQUc7UUFDZCxVQUFVLEVBQUUsVUFBVTtRQUN0QixTQUFTLEVBQUUsTUFBTTtRQUNqQixhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixhQUFhLEVBQUUsT0FBTztRQUN0QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLGNBQWMsRUFBRSxVQUFVO1FBQzFCLGtCQUFrQixFQUFFLFdBQVc7UUFDL0IsU0FBUyxFQUFFLEdBQUc7S0FDZjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnQG1hdGhlby9kYXRlcGlja2VyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1BVF9MVVhPTl9EQVRFX0ZPUk1BVFM6IE1hdERhdGVGb3JtYXRzID0ge1xyXG4gIHBhcnNlOiB7XHJcbiAgICBkYXRlSW5wdXQ6ICdEJyxcclxuICAgIGRhdGV0aW1lSW5wdXQ6ICdmJyxcclxuICAgIHRpbWVJbnB1dDogJ2g6bW0nLFxyXG4gICAgbW9udGhJbnB1dDogJ0xMTCcsXHJcbiAgICB5ZWFySW5wdXQ6ICd5eXl5JyxcclxuICB9LFxyXG4gIGRpc3BsYXk6IHtcclxuICAgIGRhdGVJbnB1dDogJ0QnLFxyXG4gICAgZGF0ZXRpbWVJbnB1dDogJ2YnLFxyXG4gICAgdGltZUlucHV0OiAnVCcsXHJcbiAgICBtb250aElucHV0OiAnTExMIHl5eXknLFxyXG4gICAgeWVhcklucHV0OiAneXl5eScsXHJcbiAgICBkYXRlQTExeUxhYmVsOiAnREQnLFxyXG4gICAgbW9udGhMYWJlbDogJ0xMTCcsXHJcbiAgICBtb250aERheUxhYmVsOiAnTExMIGQnLFxyXG4gICAgbW9udGhEYXlBMTF5TGFiZWw6ICdMTExMIGQnLFxyXG4gICAgbW9udGhZZWFyTGFiZWw6ICdMTEwgeXl5eScsXHJcbiAgICBtb250aFllYXJBMTF5TGFiZWw6ICdMTExMIHl5eXknLFxyXG4gICAgdGltZUxhYmVsOiAnVCcsXHJcbiAgfSxcclxufTtcclxuIl19