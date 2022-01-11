/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { DateAdapter as MaterialDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from './date-adapter';
import { NativeDateAdapter } from './native-date-adapter';
import { MAT_NATIVE_DATE_FORMATS } from './native-date-formats';
import * as i0 from "@angular/core";
export * from './date-adapter';
export * from './date-formats';
export * from './native-date-adapter';
export * from './native-date-formats';
export class NativeDateModule {
}
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵfac = function NativeDateModule_Factory(t) { return new (t || NativeDateModule)(); };
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: NativeDateModule });
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MaterialDateAdapter, useClass: NativeDateAdapter },
    ], imports: [[PlatformModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NativeDateModule, [{
        type: NgModule,
        args: [{
                imports: [PlatformModule],
                providers: [
                    { provide: DateAdapter, useClass: NativeDateAdapter },
                    { provide: MaterialDateAdapter, useClass: NativeDateAdapter },
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NativeDateModule, { imports: [PlatformModule] }); })();
export class MatNativeDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵfac = function MatNativeDateModule_Factory(t) { return new (t || MatNativeDateModule)(); };
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: MatNativeDateModule });
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }], imports: [[NativeDateModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatNativeDateModule, [{
        type: NgModule,
        args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatNativeDateModule, { imports: [NativeDateModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvY29yZS9kYXRldGltZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxJQUFJLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUU5RCxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLHVCQUF1QixDQUFDO0FBVXRDLE1BQU0sT0FBTyxnQkFBZ0I7O3NIQUFoQixnQkFBZ0I7b0hBQWhCLGdCQUFnQjt5SEFMaEI7UUFDVCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO1FBQ25ELEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztLQUM1RCxZQUpRLENBQUMsY0FBYyxDQUFDO3VGQU1kLGdCQUFnQjtjQVA1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztvQkFDbkQsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2lCQUM1RDthQUNGOzt3RkFDWSxnQkFBZ0IsY0FOakIsY0FBYztBQWExQixNQUFNLE9BQU8sbUJBQW1COzs0SEFBbkIsbUJBQW1CO3VIQUFuQixtQkFBbUI7NEhBRm5CLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUMsWUFEbEUsQ0FBQyxnQkFBZ0IsQ0FBQzt1RkFHaEIsbUJBQW1CO2NBSi9CLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUM7YUFDNUU7O3dGQUNZLG1CQUFtQixjQVBuQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7UGxhdGZvcm1Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RhdGVBZGFwdGVyIGFzIE1hdGVyaWFsRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQge0RhdGVBZGFwdGVyfSBmcm9tICcuL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmF0aXZlRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmF0aXZlLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TUFUX05BVElWRV9EQVRFX0ZPUk1BVFN9IGZyb20gJy4vbmF0aXZlLWRhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mb3JtYXRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7cHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlQWRhcHRlcn0sXHJcbiAgICB7cHJvdmlkZTogTWF0ZXJpYWxEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE5hdGl2ZURhdGVBZGFwdGVyfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZU1vZHVsZSB7fVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW05hdGl2ZURhdGVNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX05BVElWRV9EQVRFX0ZPUk1BVFN9XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdE5hdGl2ZURhdGVNb2R1bGUge31cclxuIl19