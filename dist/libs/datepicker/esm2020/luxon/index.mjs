/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DateAdapter as MaterialDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { MAT_LUXON_DATE_ADAPTER_OPTIONS, LuxonDateAdapter, } from './luxon-date-adapter';
import { MAT_LUXON_DATE_FORMATS } from './luxon-date-formats';
import * as i0 from "@angular/core";
export * from './luxon-date-adapter';
export * from './luxon-date-formats';
export class LuxonDateModule {
}
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵfac = function LuxonDateModule_Factory(t) { return new (t || LuxonDateModule)(); };
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: LuxonDateModule });
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [
        {
            provide: DateAdapter,
            useClass: LuxonDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
        },
        {
            provide: MaterialDateAdapter,
            useClass: LuxonDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
        },
    ] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LuxonDateModule, [{
        type: NgModule,
        args: [{
                providers: [
                    {
                        provide: DateAdapter,
                        useClass: LuxonDateAdapter,
                        deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
                    },
                    {
                        provide: MaterialDateAdapter,
                        useClass: LuxonDateAdapter,
                        deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
                    },
                ],
            }]
    }], null, null); })();
export class MatLuxonDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵfac = function MatLuxonDateModule_Factory(t) { return new (t || MatLuxonDateModule)(); };
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: MatLuxonDateModule });
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }], imports: [[LuxonDateModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatLuxonDateModule, [{
        type: NgModule,
        args: [{
                imports: [LuxonDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatLuxonDateModule, { imports: [LuxonDateModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvbHV4b24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsV0FBVyxJQUFJLG1CQUFtQixFQUNsQyxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsOEJBQThCLEVBQzlCLGdCQUFnQixHQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUU5RCxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsc0JBQXNCLENBQUM7QUFnQnJDLE1BQU0sT0FBTyxlQUFlOztvSEFBZixlQUFlO21IQUFmLGVBQWU7d0hBYmY7UUFDVDtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLDhCQUE4QixDQUFDO1NBQ3hEO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLDhCQUE4QixDQUFDO1NBQ3hEO0tBQ0Y7dUZBRVUsZUFBZTtjQWQzQixRQUFRO2VBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixRQUFRLEVBQUUsZ0JBQWdCO3dCQUMxQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsOEJBQThCLENBQUM7cUJBQ3hEO29CQUNEO3dCQUNFLE9BQU8sRUFBRSxtQkFBbUI7d0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7d0JBQzFCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSw4QkFBOEIsQ0FBQztxQkFDeEQ7aUJBQ0Y7YUFDRjs7QUFPRCxNQUFNLE9BQU8sa0JBQWtCOzswSEFBbEIsa0JBQWtCO3NIQUFsQixrQkFBa0I7MkhBRmxCLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLENBQUMsWUFEbkUsQ0FBQyxlQUFlLENBQUM7dUZBR2Ysa0JBQWtCO2NBSjlCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxDQUFDO2FBQzdFOzt3RkFDWSxrQkFBa0IsY0FObEIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBEYXRlQWRhcHRlciBhcyBNYXRlcmlhbERhdGVBZGFwdGVyLFxyXG4gIE1BVF9EQVRFX0ZPUk1BVFMsXHJcbiAgTUFUX0RBVEVfTE9DQUxFLFxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BtYXRoZW8vZGF0ZXBpY2tlci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlMsXHJcbiAgTHV4b25EYXRlQWRhcHRlcixcclxufSBmcm9tICcuL2x1eG9uLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7IE1BVF9MVVhPTl9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL2x1eG9uLWRhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2x1eG9uLWRhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbHV4b24tZGF0ZS1mb3JtYXRzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IERhdGVBZGFwdGVyLFxyXG4gICAgICB1c2VDbGFzczogTHV4b25EYXRlQWRhcHRlcixcclxuICAgICAgZGVwczogW01BVF9EQVRFX0xPQ0FMRSwgTUFUX0xVWE9OX0RBVEVfQURBUFRFUl9PUFRJT05TXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE1hdGVyaWFsRGF0ZUFkYXB0ZXIsXHJcbiAgICAgIHVzZUNsYXNzOiBMdXhvbkRhdGVBZGFwdGVyLFxyXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlNdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTHV4b25EYXRlTW9kdWxlIHt9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtMdXhvbkRhdGVNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1BVF9MVVhPTl9EQVRFX0ZPUk1BVFMgfV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRMdXhvbkRhdGVNb2R1bGUge31cclxuIl19