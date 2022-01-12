/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { DateAdapter as MaterialDateAdapter, MAT_DATE_FORMATS, } from '@angular/material/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9jb3JlL2RhdGV0aW1lL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLElBQUksbUJBQW1CLEVBQ2xDLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFaEUsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyx1QkFBdUIsQ0FBQztBQVN0QyxNQUFNLE9BQU8sZ0JBQWdCOzttSkFBaEIsZ0JBQWdCO29KQUFoQixnQkFBZ0IsWUFOakIsY0FBYztvSkFNYixnQkFBZ0IsYUFMaEI7UUFDVCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO1FBQ3JELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtLQUM5RCxZQUpRLENBQUMsY0FBYyxDQUFDOzJGQU1kLGdCQUFnQjtrQkFQNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO3dCQUNyRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7cUJBQzlEO2lCQUNGOztBQU9ELE1BQU0sT0FBTyxtQkFBbUI7O3NKQUFuQixtQkFBbUI7dUpBQW5CLG1CQUFtQixZQU5uQixnQkFBZ0I7dUpBTWhCLG1CQUFtQixhQUZuQixDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLFlBRHBFLENBQUMsZ0JBQWdCLENBQUM7MkZBR2hCLG1CQUFtQjtrQkFKL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLENBQUM7aUJBQzlFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEYXRlQWRhcHRlciBhcyBNYXRlcmlhbERhdGVBZGFwdGVyLFxuICBNQVRfREFURV9GT1JNQVRTLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgTUFUX05BVElWRV9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL25hdGl2ZS1kYXRlLWZvcm1hdHMnO1xuXG5leHBvcnQgKiBmcm9tICcuL2RhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL2RhdGUtZm9ybWF0cyc7XG5leHBvcnQgKiBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE5hdGl2ZURhdGVBZGFwdGVyIH0sXG4gICAgeyBwcm92aWRlOiBNYXRlcmlhbERhdGVBZGFwdGVyLCB1c2VDbGFzczogTmF0aXZlRGF0ZUFkYXB0ZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZU1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlRGF0ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1BVF9OQVRJVkVfREFURV9GT1JNQVRTIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXROYXRpdmVEYXRlTW9kdWxlIHt9XG4iXX0=