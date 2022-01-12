/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDatepickerBase } from './datepicker-base';
import { MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';
import * as i0 from "@angular/core";
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
export class MatDatepicker extends MatDatepickerBase {
}
/** @nocollapse */ /** @nocollapse */ MatDatepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepicker, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatDatepicker.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepicker, selector: "mat-datepicker", providers: [
        MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
        { provide: MatDatepickerBase, useExisting: MatDatepicker },
    ], exportAs: ["matDatepicker"], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-datepicker',
                    template: '',
                    exportAs: 'matDatepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
                        { provide: MatDatepickerBase, useExisting: MatDatepicker },
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sbUJBQW1CLENBQUM7QUFDMUUsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRWhGLDhGQUE4RjtBQUM5RixrR0FBa0c7QUFDbEcscUVBQXFFO0FBQ3JFLHNFQUFzRTtBQVl0RSxNQUFNLE9BQU8sYUFBaUIsU0FBUSxpQkFBdUQ7O2dKQUFoRixhQUFhO29JQUFiLGFBQWEseUNBTGI7UUFDVCx3Q0FBd0M7UUFDeEMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBQztLQUN6RCw4RUFQUyxFQUFFOzJGQVNELGFBQWE7a0JBWHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFO3dCQUNULHdDQUF3Qzt3QkFDeEMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxlQUFlLEVBQUM7cUJBQ3pEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyQmFzZSwgTWF0RGF0ZXBpY2tlckNvbnRyb2x9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuaW1wb3J0IHtNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSfSBmcm9tICcuL2RhdGUtc2VsZWN0aW9uLW1vZGVsJztcclxuXHJcbi8vIFRPRE8obW1hbGVyYmEpOiBXZSB1c2UgYSBjb21wb25lbnQgaW5zdGVhZCBvZiBhIGRpcmVjdGl2ZSBoZXJlIHNvIHRoZSB1c2VyIGNhbiB1c2UgaW1wbGljaXRcclxuLy8gdGVtcGxhdGUgcmVmZXJlbmNlIHZhcmlhYmxlcyAoZS5nLiAjZCB2cyAjZD1cIm1hdERhdGVwaWNrZXJcIikuIFdlIGNhbiBjaGFuZ2UgdGhpcyB0byBhIGRpcmVjdGl2ZVxyXG4vLyBpZiBhbmd1bGFyIGFkZHMgc3VwcG9ydCBmb3IgYGV4cG9ydEFzOiAnJGltcGxpY2l0J2Agb24gZGlyZWN0aXZlcy5cclxuLyoqIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgdGhlIGRhdGVwaWNrZXIgcG9wdXAvZGlhbG9nLiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyJyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbiAgZXhwb3J0QXM6ICdtYXREYXRlcGlja2VyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTUFUX1NJTkdMRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUixcclxuICAgIHtwcm92aWRlOiBNYXREYXRlcGlja2VyQmFzZSwgdXNlRXhpc3Rpbmc6IE1hdERhdGVwaWNrZXJ9LFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXI8RD4gZXh0ZW5kcyBNYXREYXRlcGlja2VyQmFzZTxNYXREYXRlcGlja2VyQ29udHJvbDxEPiwgRCB8IG51bGwsIEQ+IHtcclxufVxyXG4iXX0=