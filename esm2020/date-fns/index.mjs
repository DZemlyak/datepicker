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
import { MAT_DATE_FNS_ADAPTER_OPTIONS, DateFnsAdapter, } from './date-fns-adapter';
import { MAT_DATE_FNS_FORMATS } from './date-fns-formats';
import { MAT_DATE_FNS_LOCALES } from './date-fns-locales';
import * as i0 from "@angular/core";
export * from './date-fns-adapter';
export * from './date-fns-formats';
export * from './date-fns-locales';
export class DateFnsModule {
}
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule });
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, providers: [
        {
            provide: DateAdapter,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
        },
        {
            provide: MaterialDateAdapter,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DateFnsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: DateAdapter,
                            useClass: DateFnsAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
                        },
                        {
                            provide: MaterialDateAdapter,
                            useClass: DateFnsAdapter,
                            deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_LOCALES, MAT_DATE_FNS_ADAPTER_OPTIONS],
                        },
                    ],
                }]
        }] });
export class MatDateFnsModule {
}
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, imports: [DateFnsModule] });
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, providers: [
        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
        { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
    ], imports: [[DateFnsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateFnsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DateFnsModule],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                        { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvZGF0ZS1mbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsV0FBVyxJQUFJLG1CQUFtQixFQUNsQyxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLGNBQWMsR0FDZixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUUxRCxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxvQkFBb0IsQ0FBQztBQWdCbkMsTUFBTSxPQUFPLGFBQWE7O2dKQUFiLGFBQWE7aUpBQWIsYUFBYTtpSkFBYixhQUFhLGFBYmI7UUFDVDtZQUNFLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQztTQUM1RTtRQUNEO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsNEJBQTRCLENBQUM7U0FDNUU7S0FDRjsyRkFFVSxhQUFhO2tCQWR6QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsUUFBUSxFQUFFLGNBQWM7NEJBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQzt5QkFDNUU7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLG1CQUFtQjs0QkFDNUIsUUFBUSxFQUFFLGNBQWM7NEJBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQzt5QkFDNUU7cUJBQ0Y7aUJBQ0Y7O0FBVUQsTUFBTSxPQUFPLGdCQUFnQjs7bUpBQWhCLGdCQUFnQjtvSkFBaEIsZ0JBQWdCLFlBVGhCLGFBQWE7b0pBU2IsZ0JBQWdCLGFBTGhCO1FBQ1QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFO1FBQzdELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7S0FDaEQsWUFKUSxDQUFDLGFBQWEsQ0FBQzsyRkFNYixnQkFBZ0I7a0JBUDVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFO3dCQUM3RCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO3FCQUNoRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBEYXRlQWRhcHRlciBhcyBNYXRlcmlhbERhdGVBZGFwdGVyLFxyXG4gIE1BVF9EQVRFX0ZPUk1BVFMsXHJcbiAgTUFUX0RBVEVfTE9DQUxFLFxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BtYXRoZW8vZGF0ZXBpY2tlci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBNQVRfREFURV9GTlNfQURBUFRFUl9PUFRJT05TLFxyXG4gIERhdGVGbnNBZGFwdGVyLFxyXG59IGZyb20gJy4vZGF0ZS1mbnMtYWRhcHRlcic7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZOU19GT1JNQVRTIH0gZnJvbSAnLi9kYXRlLWZucy1mb3JtYXRzJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk5TX0xPQ0FMRVMgfSBmcm9tICcuL2RhdGUtZm5zLWxvY2FsZXMnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLWZucy1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLWZucy1mb3JtYXRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLWZucy1sb2NhbGVzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IERhdGVBZGFwdGVyLFxyXG4gICAgICB1c2VDbGFzczogRGF0ZUZuc0FkYXB0ZXIsXHJcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE1BVF9EQVRFX0ZOU19MT0NBTEVTLCBNQVRfREFURV9GTlNfQURBUFRFUl9PUFRJT05TXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE1hdGVyaWFsRGF0ZUFkYXB0ZXIsXHJcbiAgICAgIHVzZUNsYXNzOiBEYXRlRm5zQWRhcHRlcixcclxuICAgICAgZGVwczogW01BVF9EQVRFX0xPQ0FMRSwgTUFUX0RBVEVfRk5TX0xPQ0FMRVMsIE1BVF9EQVRFX0ZOU19BREFQVEVSX09QVElPTlNdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZUZuc01vZHVsZSB7fVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbRGF0ZUZuc01vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfREFURV9GTlNfRk9STUFUUyB9LFxyXG4gICAgeyBwcm92aWRlOiBNQVRfREFURV9GTlNfTE9DQUxFUywgdXNlVmFsdWU6IFtdIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVGbnNNb2R1bGUge31cclxuIl19