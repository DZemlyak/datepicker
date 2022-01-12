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
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule });
/** @nocollapse */ /** @nocollapse */ LuxonDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LuxonDateModule, decorators: [{
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
        }] });
export class MatLuxonDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, imports: [LuxonDateModule] });
/** @nocollapse */ /** @nocollapse */ MatLuxonDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }], imports: [[LuxonDateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatLuxonDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [LuxonDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvbHV4b24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsV0FBVyxJQUFJLG1CQUFtQixFQUNsQyxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsOEJBQThCLEVBQzlCLGdCQUFnQixHQUNqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUU5RCxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsc0JBQXNCLENBQUM7QUFnQnJDLE1BQU0sT0FBTyxlQUFlOztrSkFBZixlQUFlO21KQUFmLGVBQWU7bUpBQWYsZUFBZSxhQWJmO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSw4QkFBOEIsQ0FBQztTQUN4RDtRQUNEO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSw4QkFBOEIsQ0FBQztTQUN4RDtLQUNGOzJGQUVVLGVBQWU7a0JBZDNCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixRQUFRLEVBQUUsZ0JBQWdCOzRCQUMxQixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsOEJBQThCLENBQUM7eUJBQ3hEO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7NEJBQzFCLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRSw4QkFBOEIsQ0FBQzt5QkFDeEQ7cUJBQ0Y7aUJBQ0Y7O0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7cUpBQWxCLGtCQUFrQjtzSkFBbEIsa0JBQWtCLFlBTmxCLGVBQWU7c0pBTWYsa0JBQWtCLGFBRmxCLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLENBQUMsWUFEbkUsQ0FBQyxlQUFlLENBQUM7MkZBR2Ysa0JBQWtCO2tCQUo5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLENBQUM7aUJBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIERhdGVBZGFwdGVyIGFzIE1hdGVyaWFsRGF0ZUFkYXB0ZXIsXHJcbiAgTUFUX0RBVEVfRk9STUFUUyxcclxuICBNQVRfREFURV9MT0NBTEUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQG1hdGhlby9kYXRlcGlja2VyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIE1BVF9MVVhPTl9EQVRFX0FEQVBURVJfT1BUSU9OUyxcclxuICBMdXhvbkRhdGVBZGFwdGVyLFxyXG59IGZyb20gJy4vbHV4b24tZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgTUFUX0xVWE9OX0RBVEVfRk9STUFUUyB9IGZyb20gJy4vbHV4b24tZGF0ZS1mb3JtYXRzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbHV4b24tZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9sdXhvbi1kYXRlLWZvcm1hdHMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXHJcbiAgICAgIHVzZUNsYXNzOiBMdXhvbkRhdGVBZGFwdGVyLFxyXG4gICAgICBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFLCBNQVRfTFVYT05fREFURV9BREFQVEVSX09QVElPTlNdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTWF0ZXJpYWxEYXRlQWRhcHRlcixcclxuICAgICAgdXNlQ2xhc3M6IEx1eG9uRGF0ZUFkYXB0ZXIsXHJcbiAgICAgIGRlcHM6IFtNQVRfREFURV9MT0NBTEUsIE1BVF9MVVhPTl9EQVRFX0FEQVBURVJfT1BUSU9OU10sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMdXhvbkRhdGVNb2R1bGUge31cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0x1eG9uRGF0ZU1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX0xVWE9OX0RBVEVfRk9STUFUUyB9XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdEx1eG9uRGF0ZU1vZHVsZSB7fVxyXG4iXX0=