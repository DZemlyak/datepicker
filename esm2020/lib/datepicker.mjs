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
/** @nocollapse */ /** @nocollapse */ MatDatepicker.ɵfac = /** @pureOrBreakMyCode */ function () { let ɵMatDatepicker_BaseFactory; return function MatDatepicker_Factory(t) { return (ɵMatDatepicker_BaseFactory || (ɵMatDatepicker_BaseFactory = i0.ɵɵgetInheritedFactory(MatDatepicker)))(t || MatDatepicker); }; }();
/** @nocollapse */ /** @nocollapse */ MatDatepicker.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatDatepicker, selectors: [["mat-datepicker"]], exportAs: ["matDatepicker"], features: [i0.ɵɵProvidersFeature([
            MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
            { provide: MatDatepickerBase, useExisting: MatDatepicker },
        ]), i0.ɵɵInheritDefinitionFeature], decls: 0, vars: 0, template: function MatDatepicker_Template(rf, ctx) { }, encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDatepicker, [{
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
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sbUJBQW1CLENBQUM7QUFDMUUsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRWhGLDhGQUE4RjtBQUM5RixrR0FBa0c7QUFDbEcscUVBQXFFO0FBQ3JFLHNFQUFzRTtBQVl0RSxNQUFNLE9BQU8sYUFBaUIsU0FBUSxpQkFBdUQ7OzJRQUFoRixhQUFhLFNBQWIsYUFBYTtrSEFBYixhQUFhLGlHQUxiO1lBQ1Qsd0NBQXdDO1lBQ3hDLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUM7U0FDekQ7dUZBRVUsYUFBYTtjQVh6QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFO29CQUNULHdDQUF3QztvQkFDeEMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxlQUFlLEVBQUM7aUJBQ3pEO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJCYXNlLCBNYXREYXRlcGlja2VyQ29udHJvbH0gZnJvbSAnLi9kYXRlcGlja2VyLWJhc2UnO1xyXG5pbXBvcnQge01BVF9TSU5HTEVfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVJ9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xyXG5cclxuLy8gVE9ETyhtbWFsZXJiYSk6IFdlIHVzZSBhIGNvbXBvbmVudCBpbnN0ZWFkIG9mIGEgZGlyZWN0aXZlIGhlcmUgc28gdGhlIHVzZXIgY2FuIHVzZSBpbXBsaWNpdFxyXG4vLyB0ZW1wbGF0ZSByZWZlcmVuY2UgdmFyaWFibGVzIChlLmcuICNkIHZzICNkPVwibWF0RGF0ZXBpY2tlclwiKS4gV2UgY2FuIGNoYW5nZSB0aGlzIHRvIGEgZGlyZWN0aXZlXHJcbi8vIGlmIGFuZ3VsYXIgYWRkcyBzdXBwb3J0IGZvciBgZXhwb3J0QXM6ICckaW1wbGljaXQnYCBvbiBkaXJlY3RpdmVzLlxyXG4vKiogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0aGUgZGF0ZXBpY2tlciBwb3B1cC9kaWFsb2cuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBleHBvcnRBczogJ21hdERhdGVwaWNrZXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBNQVRfU0lOR0xFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSLFxyXG4gICAge3Byb3ZpZGU6IE1hdERhdGVwaWNrZXJCYXNlLCB1c2VFeGlzdGluZzogTWF0RGF0ZXBpY2tlcn0sXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlcjxEPiBleHRlbmRzIE1hdERhdGVwaWNrZXJCYXNlPE1hdERhdGVwaWNrZXJDb250cm9sPEQ+LCBEIHwgbnVsbCwgRD4ge1xyXG59XHJcbiJdfQ==