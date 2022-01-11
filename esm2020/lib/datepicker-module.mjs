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
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵfac = function MatDatepickerModule_Factory(t) { return new (t || MatDatepickerModule)(); };
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: MatDatepickerModule });
/** @nocollapse */ /** @nocollapse */ MatDatepickerModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepickerModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatDatepickerModule, { declarations: [MatCalendar,
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
        MatDatepickerApply] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlcGlja2VyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwrQ0FBK0MsR0FDaEQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FB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ZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBMTF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XHJcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHtNYXRDYWxlbmRhciwgTWF0Q2FsZW5kYXJIZWFkZXJ9IGZyb20gJy4vY2FsZW5kYXInO1xyXG5pbXBvcnQge01hdENhbGVuZGFyQm9keX0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge1xyXG4gIE1hdERhdGVwaWNrZXJDb250ZW50LFxyXG4gIE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSLFxyXG59IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VySW5wdXR9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XHJcbmltcG9ydCB7TWF0RGF0ZXBpY2tlckludGx9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyVG9nZ2xlLCBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XHJcbmltcG9ydCB7TWF0Q2xvY2tWaWV3fSBmcm9tICcuL2Nsb2NrLXZpZXcnO1xyXG5pbXBvcnQge01hdE1vbnRoVmlld30gZnJvbSAnLi9tb250aC12aWV3JztcclxuaW1wb3J0IHtNYXRNdWx0aVllYXJWaWV3fSBmcm9tICcuL211bHRpLXllYXItdmlldyc7XHJcbmltcG9ydCB7TWF0WWVhclZpZXd9IGZyb20gJy4veWVhci12aWV3JztcclxuaW1wb3J0IHtNYXREYXRlUmFuZ2VJbnB1dH0gZnJvbSAnLi9kYXRlLXJhbmdlLWlucHV0JztcclxuaW1wb3J0IHtNYXRTdGFydERhdGUsIE1hdEVuZERhdGV9IGZyb20gJy4vZGF0ZS1yYW5nZS1pbnB1dC1wYXJ0cyc7XHJcbmltcG9ydCB7TWF0RGF0ZVJhbmdlUGlja2VyfSBmcm9tICcuL2RhdGUtcmFuZ2UtcGlja2VyJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyQWN0aW9ucywgTWF0RGF0ZXBpY2tlckFwcGx5LCBNYXREYXRlcGlja2VyQ2FuY2VsfSBmcm9tICcuL2RhdGVwaWNrZXItYWN0aW9ucyc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBPdmVybGF5TW9kdWxlLFxyXG4gICAgQTExeU1vZHVsZSxcclxuICAgIFBvcnRhbE1vZHVsZSxcclxuICAgIE1hdENvbW1vbk1vZHVsZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXHJcbiAgICBNYXRDYWxlbmRhcixcclxuICAgIE1hdENhbGVuZGFyQm9keSxcclxuICAgIE1hdERhdGVwaWNrZXIsXHJcbiAgICBNYXREYXRlcGlja2VyQ29udGVudCxcclxuICAgIE1hdERhdGVwaWNrZXJJbnB1dCxcclxuICAgIE1hdERhdGVwaWNrZXJUb2dnbGUsXHJcbiAgICBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbixcclxuICAgIE1hdENsb2NrVmlldyxcclxuICAgIE1hdE1vbnRoVmlldyxcclxuICAgIE1hdFllYXJWaWV3LFxyXG4gICAgTWF0TXVsdGlZZWFyVmlldyxcclxuICAgIE1hdENhbGVuZGFySGVhZGVyLFxyXG4gICAgTWF0RGF0ZVJhbmdlSW5wdXQsXHJcbiAgICBNYXRTdGFydERhdGUsXHJcbiAgICBNYXRFbmREYXRlLFxyXG4gICAgTWF0RGF0ZVJhbmdlUGlja2VyLFxyXG4gICAgTWF0RGF0ZXBpY2tlckFjdGlvbnMsXHJcbiAgICBNYXREYXRlcGlja2VyQ2FuY2VsLFxyXG4gICAgTWF0RGF0ZXBpY2tlckFwcGx5XHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE1hdENhbGVuZGFyLFxyXG4gICAgTWF0Q2FsZW5kYXJCb2R5LFxyXG4gICAgTWF0RGF0ZXBpY2tlcixcclxuICAgIE1hdERhdGVwaWNrZXJDb250ZW50LFxyXG4gICAgTWF0RGF0ZXBpY2tlcklucHV0LFxyXG4gICAgTWF0RGF0ZXBpY2tlclRvZ2dsZSxcclxuICAgIE1hdERhdGVwaWNrZXJUb2dnbGVJY29uLFxyXG4gICAgTWF0Q2xvY2tWaWV3LFxyXG4gICAgTWF0TW9udGhWaWV3LFxyXG4gICAgTWF0WWVhclZpZXcsXHJcbiAgICBNYXRNdWx0aVllYXJWaWV3LFxyXG4gICAgTWF0Q2FsZW5kYXJIZWFkZXIsXHJcbiAgICBNYXREYXRlUmFuZ2VJbnB1dCxcclxuICAgIE1hdFN0YXJ0RGF0ZSxcclxuICAgIE1hdEVuZERhdGUsXHJcbiAgICBNYXREYXRlUmFuZ2VQaWNrZXIsXHJcbiAgICBNYXREYXRlcGlja2VyQWN0aW9ucyxcclxuICAgIE1hdERhdGVwaWNrZXJDYW5jZWwsXHJcbiAgICBNYXREYXRlcGlja2VyQXBwbHlcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTWF0RGF0ZXBpY2tlckludGwsXHJcbiAgICBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUlxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJNb2R1bGUge31cclxuIl19