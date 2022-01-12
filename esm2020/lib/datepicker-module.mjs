/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatCommonModule } from '@angular/material/core';
import { MatCalendar, MatCalendarHeader } from './calendar';
import { MatCalendarBody } from './calendar-body';
import { MatDatepicker } from './datepicker';
import { MatDatepickerContent, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, } from './datepicker-base';
import { MatDatepickerInput } from './datepicker-input';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatDatepickerToggle, MatDatepickerToggleIcon } from './datepicker-toggle';
import { MatClockView } from './clock-view';
import { MatMonthView } from './month-view';
import { MatMultiYearView } from './multi-year-view';
import { MatYearView } from './year-view';
import { MatDateRangeInput } from './date-range-input';
import { MatStartDate, MatEndDate } from './date-range-input-parts';
import { MatDateRangePicker } from './date-range-picker';
import { MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel } from './datepicker-actions';
import * as i0 from "@angular/core";
export class MatDatepickerModule {
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerModule, declarations: [MatCalendar,
        MatCalendarBody,
        MatDatepicker,
        MatDatepickerContent,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepickerToggleIcon,
        MatClockView,
        MatMonthView,
        MatYearView,
        MatMultiYearView,
        MatCalendarHeader,
        MatDateRangeInput,
        MatStartDate,
        MatEndDate,
        MatDateRangePicker,
        MatDatepickerActions,
        MatDatepickerCancel,
        MatDatepickerApply], imports: [CommonModule,
        MatButtonModule,
        OverlayModule,
        A11yModule,
        PortalModule,
        MatCommonModule], exports: [CdkScrollableModule,
        MatCalendar,
        MatCalendarBody,
        MatDatepicker,
        MatDatepickerContent,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepickerToggleIcon,
        MatClockView,
        MatMonthView,
        MatYearView,
        MatMultiYearView,
        MatCalendarHeader,
        MatDateRangeInput,
        MatStartDate,
        MatEndDate,
        MatDateRangePicker,
        MatDatepickerActions,
        MatDatepickerCancel,
        MatDatepickerApply] });
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerModule, providers: [
        MatDatepickerIntl,
        MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
    ], imports: [[
            CommonModule,
            MatButtonModule,
            OverlayModule,
            A11yModule,
            PortalModule,
            MatCommonModule,
        ], CdkScrollableModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        OverlayModule,
                        A11yModule,
                        PortalModule,
                        MatCommonModule,
                    ],
                    exports: [
                        CdkScrollableModule,
                        MatCalendar,
                        MatCalendarBody,
                        MatDatepicker,
                        MatDatepickerContent,
                        MatDatepickerInput,
                        MatDatepickerToggle,
                        MatDatepickerToggleIcon,
                        MatClockView,
                        MatMonthView,
                        MatYearView,
                        MatMultiYearView,
                        MatCalendarHeader,
                        MatDateRangeInput,
                        MatStartDate,
                        MatEndDate,
                        MatDateRangePicker,
                        MatDatepickerActions,
                        MatDatepickerCancel,
                        MatDatepickerApply
                    ],
                    declarations: [
                        MatCalendar,
                        MatCalendarBody,
                        MatDatepicker,
                        MatDatepickerContent,
                        MatDatepickerInput,
                        MatDatepickerToggle,
                        MatDatepickerToggleIcon,
                        MatClockView,
                        MatMonthView,
                        MatYearView,
                        MatMultiYearView,
                        MatCalendarHeader,
                        MatDateRangeInput,
                        MatStartDate,
                        MatEndDate,
                        MatDateRangePicker,
                        MatDatepickerActions,
                        MatDatepickerCancel,
                        MatDatepickerApply
                    ],
                    providers: [
                        MatDatepickerIntl,
                        MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlcGlja2VyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwrQ0FBK0MsR0FDaEQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FB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aWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge0ExMXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcclxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuaW1wb3J0IHtDZGtTY3JvbGxhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQge01hdENhbGVuZGFyLCBNYXRDYWxlbmRhckhlYWRlcn0gZnJvbSAnLi9jYWxlbmRhcic7XHJcbmltcG9ydCB7TWF0Q2FsZW5kYXJCb2R5fSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJ9IGZyb20gJy4vZGF0ZXBpY2tlcic7XHJcbmltcG9ydCB7XHJcbiAgTWF0RGF0ZXBpY2tlckNvbnRlbnQsXHJcbiAgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsXHJcbn0gZnJvbSAnLi9kYXRlcGlja2VyLWJhc2UnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJJbnB1dH0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VySW50bH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJUb2dnbGUsIE1hdERhdGVwaWNrZXJUb2dnbGVJY29ufSBmcm9tICcuL2RhdGVwaWNrZXItdG9nZ2xlJztcclxuaW1wb3J0IHtNYXRDbG9ja1ZpZXd9IGZyb20gJy4vY2xvY2stdmlldyc7XHJcbmltcG9ydCB7TWF0TW9udGhWaWV3fSBmcm9tICcuL21vbnRoLXZpZXcnO1xyXG5pbXBvcnQge01hdE11bHRpWWVhclZpZXd9IGZyb20gJy4vbXVsdGkteWVhci12aWV3JztcclxuaW1wb3J0IHtNYXRZZWFyVmlld30gZnJvbSAnLi95ZWFyLXZpZXcnO1xyXG5pbXBvcnQge01hdERhdGVSYW5nZUlucHV0fSBmcm9tICcuL2RhdGUtcmFuZ2UtaW5wdXQnO1xyXG5pbXBvcnQge01hdFN0YXJ0RGF0ZSwgTWF0RW5kRGF0ZX0gZnJvbSAnLi9kYXRlLXJhbmdlLWlucHV0LXBhcnRzJztcclxuaW1wb3J0IHtNYXREYXRlUmFuZ2VQaWNrZXJ9IGZyb20gJy4vZGF0ZS1yYW5nZS1waWNrZXInO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJBY3Rpb25zLCBNYXREYXRlcGlja2VyQXBwbHksIE1hdERhdGVwaWNrZXJDYW5jZWx9IGZyb20gJy4vZGF0ZXBpY2tlci1hY3Rpb25zJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE92ZXJsYXlNb2R1bGUsXHJcbiAgICBBMTF5TW9kdWxlLFxyXG4gICAgUG9ydGFsTW9kdWxlLFxyXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcclxuICAgIE1hdENhbGVuZGFyLFxyXG4gICAgTWF0Q2FsZW5kYXJCb2R5LFxyXG4gICAgTWF0RGF0ZXBpY2tlcixcclxuICAgIE1hdERhdGVwaWNrZXJDb250ZW50LFxyXG4gICAgTWF0RGF0ZXBpY2tlcklucHV0LFxyXG4gICAgTWF0RGF0ZXBpY2tlclRvZ2dsZSxcclxuICAgIE1hdERhdGVwaWNrZXJUb2dnbGVJY29uLFxyXG4gICAgTWF0Q2xvY2tWaWV3LFxyXG4gICAgTWF0TW9udGhWaWV3LFxyXG4gICAgTWF0WWVhclZpZXcsXHJcbiAgICBNYXRNdWx0aVllYXJWaWV3LFxyXG4gICAgTWF0Q2FsZW5kYXJIZWFkZXIsXHJcbiAgICBNYXREYXRlUmFuZ2VJbnB1dCxcclxuICAgIE1hdFN0YXJ0RGF0ZSxcclxuICAgIE1hdEVuZERhdGUsXHJcbiAgICBNYXREYXRlUmFuZ2VQaWNrZXIsXHJcbiAgICBNYXREYXRlcGlja2VyQWN0aW9ucyxcclxuICAgIE1hdERhdGVwaWNrZXJDYW5jZWwsXHJcbiAgICBNYXREYXRlcGlja2VyQXBwbHlcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTWF0Q2FsZW5kYXIsXHJcbiAgICBNYXRDYWxlbmRhckJvZHksXHJcbiAgICBNYXREYXRlcGlja2VyLFxyXG4gICAgTWF0RGF0ZXBpY2tlckNvbnRlbnQsXHJcbiAgICBNYXREYXRlcGlja2VySW5wdXQsXHJcbiAgICBNYXREYXRlcGlja2VyVG9nZ2xlLFxyXG4gICAgTWF0RGF0ZXBpY2tlclRvZ2dsZUljb24sXHJcbiAgICBNYXRDbG9ja1ZpZXcsXHJcbiAgICBNYXRNb250aFZpZXcsXHJcbiAgICBNYXRZZWFyVmlldyxcclxuICAgIE1hdE11bHRpWWVhclZpZXcsXHJcbiAgICBNYXRDYWxlbmRhckhlYWRlcixcclxuICAgIE1hdERhdGVSYW5nZUlucHV0LFxyXG4gICAgTWF0U3RhcnREYXRlLFxyXG4gICAgTWF0RW5kRGF0ZSxcclxuICAgIE1hdERhdGVSYW5nZVBpY2tlcixcclxuICAgIE1hdERhdGVwaWNrZXJBY3Rpb25zLFxyXG4gICAgTWF0RGF0ZXBpY2tlckNhbmNlbCxcclxuICAgIE1hdERhdGVwaWNrZXJBcHBseVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBNYXREYXRlcGlja2VySW50bCxcclxuICAgIE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlck1vZHVsZSB7fVxyXG4iXX0=