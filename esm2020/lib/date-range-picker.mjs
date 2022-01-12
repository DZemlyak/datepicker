/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDatepickerBase } from './datepicker-base';
import { MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';
import { MAT_CALENDAR_RANGE_STRATEGY_PROVIDER } from './date-range-selection-strategy';
import * as i0 from "@angular/core";
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDateRangePicker"). We can change this to a
// directive if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the date range picker popup/dialog. */
export class MatDateRangePicker extends MatDatepickerBase {
    _forwardContentValues(instance) {
        super._forwardContentValues(instance);
        const input = this.datepickerInput;
        if (input) {
            instance.comparisonStart = input.comparisonStart;
            instance.comparisonEnd = input.comparisonEnd;
        }
    }
}
/** @nocollapse */ /** @nocollapse */ MatDateRangePicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateRangePicker, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatDateRangePicker.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatDateRangePicker, selector: "mat-date-range-picker", providers: [
        MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
        MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
        { provide: MatDatepickerBase, useExisting: MatDateRangePicker },
    ], exportAs: ["matDateRangePicker"], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDateRangePicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-date-range-picker',
                    template: '',
                    exportAs: 'matDateRangePicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
                        MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
                        { provide: MatDatepickerBase, useExisting: MatDateRangePicker },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXJhbmdlLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxpQkFBaUIsRUFBNkMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsdUNBQXVDLEVBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUMxRixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFXckYsOEZBQThGO0FBQzlGLDZGQUE2RjtBQUM3RiwrRUFBK0U7QUFDL0UsNkVBQTZFO0FBYTdFLE1BQU0sT0FBTyxrQkFBc0IsU0FBUSxpQkFJMUM7SUFDb0IscUJBQXFCLENBQUMsUUFBK0M7UUFDdEYsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFbkMsSUFBSSxLQUFLLEVBQUU7WUFDVCxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDakQsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7cUpBZFUsa0JBQWtCO3lJQUFsQixrQkFBa0IsZ0RBTmxCO1FBQ1QsdUNBQXVDO1FBQ3ZDLG9DQUFvQztRQUNwQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUM7S0FDOUQsbUZBUlMsRUFBRTsyRkFVRCxrQkFBa0I7a0JBWjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLEVBQUU7b0JBQ1osUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUU7d0JBQ1QsdUNBQXVDO3dCQUN2QyxvQ0FBb0M7d0JBQ3BDLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsb0JBQW9CLEVBQUM7cUJBQzlEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VyQmFzZSwgTWF0RGF0ZXBpY2tlckNvbnRlbnQsIE1hdERhdGVwaWNrZXJDb250cm9sfSBmcm9tICcuL2RhdGVwaWNrZXItYmFzZSc7XHJcbmltcG9ydCB7TUFUX1JBTkdFX0RBVEVfU0VMRUNUSU9OX01PREVMX1BST1ZJREVSLCBEYXRlUmFuZ2V9IGZyb20gJy4vZGF0ZS1zZWxlY3Rpb24tbW9kZWwnO1xyXG5pbXBvcnQge01BVF9DQUxFTkRBUl9SQU5HRV9TVFJBVEVHWV9QUk9WSURFUn0gZnJvbSAnLi9kYXRlLXJhbmdlLXNlbGVjdGlvbi1zdHJhdGVneSc7XHJcblxyXG4vKipcclxuICogSW5wdXQgdGhhdCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGEgZGF0ZSByYW5nZSBwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0RGF0ZVJhbmdlUGlja2VySW5wdXQ8RD4gZXh0ZW5kcyBNYXREYXRlcGlja2VyQ29udHJvbDxEPiB7XHJcbiAgY29tcGFyaXNvblN0YXJ0OiBEIHwgbnVsbDtcclxuICBjb21wYXJpc29uRW5kOiBEIHwgbnVsbDtcclxufVxyXG5cclxuLy8gVE9ETyhtbWFsZXJiYSk6IFdlIHVzZSBhIGNvbXBvbmVudCBpbnN0ZWFkIG9mIGEgZGlyZWN0aXZlIGhlcmUgc28gdGhlIHVzZXIgY2FuIHVzZSBpbXBsaWNpdFxyXG4vLyB0ZW1wbGF0ZSByZWZlcmVuY2UgdmFyaWFibGVzIChlLmcuICNkIHZzICNkPVwibWF0RGF0ZVJhbmdlUGlja2VyXCIpLiBXZSBjYW4gY2hhbmdlIHRoaXMgdG8gYVxyXG4vLyBkaXJlY3RpdmUgaWYgYW5ndWxhciBhZGRzIHN1cHBvcnQgZm9yIGBleHBvcnRBczogJyRpbXBsaWNpdCdgIG9uIGRpcmVjdGl2ZXMuXHJcbi8qKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBkYXRlIHJhbmdlIHBpY2tlciBwb3B1cC9kaWFsb2cuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWRhdGUtcmFuZ2UtcGlja2VyJyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbiAgZXhwb3J0QXM6ICdtYXREYXRlUmFuZ2VQaWNrZXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBNQVRfUkFOR0VfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVIsXHJcbiAgICBNQVRfQ0FMRU5EQVJfUkFOR0VfU1RSQVRFR1lfUFJPVklERVIsXHJcbiAgICB7cHJvdmlkZTogTWF0RGF0ZXBpY2tlckJhc2UsIHVzZUV4aXN0aW5nOiBNYXREYXRlUmFuZ2VQaWNrZXJ9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlUmFuZ2VQaWNrZXI8RD4gZXh0ZW5kcyBNYXREYXRlcGlja2VyQmFzZTxcclxuICBNYXREYXRlUmFuZ2VQaWNrZXJJbnB1dDxEPixcclxuICBEYXRlUmFuZ2U8RD4sXHJcbiAgRFxyXG4+IHtcclxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2ZvcndhcmRDb250ZW50VmFsdWVzKGluc3RhbmNlOiBNYXREYXRlcGlja2VyQ29udGVudDxEYXRlUmFuZ2U8RD4sIEQ+KSB7XHJcbiAgICBzdXBlci5fZm9yd2FyZENvbnRlbnRWYWx1ZXMoaW5zdGFuY2UpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5kYXRlcGlja2VySW5wdXQ7XHJcblxyXG4gICAgaWYgKGlucHV0KSB7XHJcbiAgICAgIGluc3RhbmNlLmNvbXBhcmlzb25TdGFydCA9IGlucHV0LmNvbXBhcmlzb25TdGFydDtcclxuICAgICAgaW5zdGFuY2UuY29tcGFyaXNvbkVuZCA9IGlucHV0LmNvbXBhcmlzb25FbmQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==