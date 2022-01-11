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
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵfac = function DateFnsModule_Factory(t) { return new (t || DateFnsModule)(); };
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: DateFnsModule });
/** @nocollapse */ /** @nocollapse */ DateFnsModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DateFnsModule, [{
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
    }], null, null); })();
export class MatDateFnsModule {
}
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵfac = function MatDateFnsModule_Factory(t) { return new (t || MatDateFnsModule)(); };
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: MatDateFnsModule });
/** @nocollapse */ /** @nocollapse */ MatDateFnsModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [
        { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
        { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
    ], imports: [[DateFnsModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDateFnsModule, [{
        type: NgModule,
        args: [{
                imports: [DateFnsModule],
                providers: [
                    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                    { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatDateFnsModule, { imports: [DateFnsModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvZGF0ZS1mbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsV0FBVyxJQUFJLG1CQUFtQixFQUNsQyxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLGNBQWMsR0FDZixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUUxRCxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxvQkFBb0IsQ0FBQztBQWdCbkMsTUFBTSxPQUFPLGFBQWE7O2dIQUFiLGFBQWE7aUhBQWIsYUFBYTtzSEFiYjtRQUNUO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLDRCQUE0QixDQUFDO1NBQzVFO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQztTQUM1RTtLQUNGO3VGQUVVLGFBQWE7Y0FkekIsUUFBUTtlQUFDO2dCQUNSLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsV0FBVzt3QkFDcEIsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQztxQkFDNUU7b0JBQ0Q7d0JBQ0UsT0FBTyxFQUFFLG1CQUFtQjt3QkFDNUIsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0QkFBNEIsQ0FBQztxQkFDNUU7aUJBQ0Y7YUFDRjs7QUFVRCxNQUFNLE9BQU8sZ0JBQWdCOztzSEFBaEIsZ0JBQWdCO29IQUFoQixnQkFBZ0I7eUhBTGhCO1FBQ1QsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFO1FBQzdELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7S0FDaEQsWUFKUSxDQUFDLGFBQWEsQ0FBQzt1RkFNYixnQkFBZ0I7Y0FQNUIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTtvQkFDN0QsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtpQkFDaEQ7YUFDRjs7d0ZBQ1ksZ0JBQWdCLGNBVGhCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgRGF0ZUFkYXB0ZXIgYXMgTWF0ZXJpYWxEYXRlQWRhcHRlcixcclxuICBNQVRfREFURV9GT1JNQVRTLFxyXG4gIE1BVF9EQVRFX0xPQ0FMRSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICdAbWF0aGVvL2RhdGVwaWNrZXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTUFUX0RBVEVfRk5TX0FEQVBURVJfT1BUSU9OUyxcclxuICBEYXRlRm5zQWRhcHRlcixcclxufSBmcm9tICcuL2RhdGUtZm5zLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GTlNfRk9STUFUUyB9IGZyb20gJy4vZGF0ZS1mbnMtZm9ybWF0cyc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZOU19MT0NBTEVTIH0gZnJvbSAnLi9kYXRlLWZucy1sb2NhbGVzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mbnMtYWRhcHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mbnMtZm9ybWF0cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mbnMtbG9jYWxlcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcclxuICAgICAgdXNlQ2xhc3M6IERhdGVGbnNBZGFwdGVyLFxyXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfREFURV9GTlNfTE9DQUxFUywgTUFUX0RBVEVfRk5TX0FEQVBURVJfT1BUSU9OU10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBNYXRlcmlhbERhdGVBZGFwdGVyLFxyXG4gICAgICB1c2VDbGFzczogRGF0ZUZuc0FkYXB0ZXIsXHJcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE1BVF9EQVRFX0ZOU19MT0NBTEVTLCBNQVRfREFURV9GTlNfQURBUFRFUl9PUFRJT05TXSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVGbnNNb2R1bGUge31cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0RhdGVGbnNNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX0RBVEVfRk5TX0ZPUk1BVFMgfSxcclxuICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk5TX0xPQ0FMRVMsIHVzZVZhbHVlOiBbXSB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlRm5zTW9kdWxlIHt9XHJcbiJdfQ==