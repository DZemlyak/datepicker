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
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, imports: [PlatformModule] });
/** @nocollapse */ /** @nocollapse */ NativeDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MaterialDateAdapter, useClass: NativeDateAdapter },
    ], imports: [[PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PlatformModule],
                    providers: [
                        { provide: DateAdapter, useClass: NativeDateAdapter },
                        { provide: MaterialDateAdapter, useClass: NativeDateAdapter },
                    ],
                }]
        }] });
export class MatNativeDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, imports: [NativeDateModule] });
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }], imports: [[NativeDateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvY29yZS9kYXRldGltZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxJQUFJLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUU5RCxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLHVCQUF1QixDQUFDO0FBVXRDLE1BQU0sT0FBTyxnQkFBZ0I7O21KQUFoQixnQkFBZ0I7b0pBQWhCLGdCQUFnQixZQU5qQixjQUFjO29KQU1iLGdCQUFnQixhQUxoQjtRQUNULEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7UUFDbkQsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO0tBQzVELFlBSlEsQ0FBQyxjQUFjLENBQUM7MkZBTWQsZ0JBQWdCO2tCQVA1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7d0JBQ25ELEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztxQkFDNUQ7aUJBQ0Y7O0FBUUQsTUFBTSxPQUFPLG1CQUFtQjs7c0pBQW5CLG1CQUFtQjt1SkFBbkIsbUJBQW1CLFlBUG5CLGdCQUFnQjt1SkFPaEIsbUJBQW1CLGFBRm5CLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDLENBQUMsWUFEbEUsQ0FBQyxnQkFBZ0IsQ0FBQzsyRkFHaEIsbUJBQW1CO2tCQUovQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztpQkFDNUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7UGxhdGZvcm1Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RhdGVBZGFwdGVyIGFzIE1hdGVyaWFsRGF0ZUFkYXB0ZXIsIE1BVF9EQVRFX0ZPUk1BVFN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQge0RhdGVBZGFwdGVyfSBmcm9tICcuL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TmF0aXZlRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vbmF0aXZlLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7TUFUX05BVElWRV9EQVRFX0ZPUk1BVFN9IGZyb20gJy4vbmF0aXZlLWRhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mb3JtYXRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7cHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlQWRhcHRlcn0sXHJcbiAgICB7cHJvdmlkZTogTWF0ZXJpYWxEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE5hdGl2ZURhdGVBZGFwdGVyfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZU1vZHVsZSB7fVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW05hdGl2ZURhdGVNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX05BVElWRV9EQVRFX0ZPUk1BVFN9XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdE5hdGl2ZURhdGVNb2R1bGUge31cclxuIl19