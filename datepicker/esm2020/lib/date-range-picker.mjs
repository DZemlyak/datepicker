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
/** @nocollapse */ /** @nocollapse */ MatDateRangePicker.ɵfac = /** @pureOrBreakMyCode */ function () { let ɵMatDateRangePicker_BaseFactory; return function MatDateRangePicker_Factory(t) { return (ɵMatDateRangePicker_BaseFactory || (ɵMatDateRangePicker_BaseFactory = i0.ɵɵgetInheritedFactory(MatDateRangePicker)))(t || MatDateRangePicker); }; }();
/** @nocollapse */ /** @nocollapse */ MatDateRangePicker.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: MatDateRangePicker, selectors: [["mat-date-range-picker"]], exportAs: ["matDateRangePicker"], features: [i0.ɵɵProvidersFeature([
            MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
            MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
            { provide: MatDatepickerBase, useExisting: MatDateRangePicker },
        ]), i0.ɵɵInheritDefinitionFeature], decls: 0, vars: 0, template: function MatDateRangePicker_Template(rf, ctx) { }, encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDateRangePicker, [{
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
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlLXJhbmdlLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxpQkFBaUIsRUFBNkMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsdUNBQXVDLEVBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUMxRixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFXckYsOEZBQThGO0FBQzlGLDZGQUE2RjtBQUM3RiwrRUFBK0U7QUFDL0UsNkVBQTZFO0FBYTdFLE1BQU0sT0FBTyxrQkFBc0IsU0FBUSxpQkFJMUM7SUFDb0IscUJBQXFCLENBQUMsUUFBK0M7UUFDdEYsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFbkMsSUFBSSxLQUFLLEVBQUU7WUFDVCxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDakQsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7b1NBZFUsa0JBQWtCLFNBQWxCLGtCQUFrQjt1SEFBbEIsa0JBQWtCLDZHQU5sQjtZQUNULHVDQUF1QztZQUN2QyxvQ0FBb0M7WUFDcEMsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDO1NBQzlEO3VGQUVVLGtCQUFrQjtjQVo5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUU7b0JBQ1QsdUNBQXVDO29CQUN2QyxvQ0FBb0M7b0JBQ3BDLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsb0JBQW9CLEVBQUM7aUJBQzlEO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJCYXNlLCBNYXREYXRlcGlja2VyQ29udGVudCwgTWF0RGF0ZXBpY2tlckNvbnRyb2x9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuaW1wb3J0IHtNQVRfUkFOR0VfREFURV9TRUxFQ1RJT05fTU9ERUxfUFJPVklERVIsIERhdGVSYW5nZX0gZnJvbSAnLi9kYXRlLXNlbGVjdGlvbi1tb2RlbCc7XHJcbmltcG9ydCB7TUFUX0NBTEVOREFSX1JBTkdFX1NUUkFURUdZX1BST1ZJREVSfSBmcm9tICcuL2RhdGUtcmFuZ2Utc2VsZWN0aW9uLXN0cmF0ZWd5JztcclxuXHJcbi8qKlxyXG4gKiBJbnB1dCB0aGF0IGNhbiBiZSBhc3NvY2lhdGVkIHdpdGggYSBkYXRlIHJhbmdlIHBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNYXREYXRlUmFuZ2VQaWNrZXJJbnB1dDxEPiBleHRlbmRzIE1hdERhdGVwaWNrZXJDb250cm9sPEQ+IHtcclxuICBjb21wYXJpc29uU3RhcnQ6IEQgfCBudWxsO1xyXG4gIGNvbXBhcmlzb25FbmQ6IEQgfCBudWxsO1xyXG59XHJcblxyXG4vLyBUT0RPKG1tYWxlcmJhKTogV2UgdXNlIGEgY29tcG9uZW50IGluc3RlYWQgb2YgYSBkaXJlY3RpdmUgaGVyZSBzbyB0aGUgdXNlciBjYW4gdXNlIGltcGxpY2l0XHJcbi8vIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZXMgKGUuZy4gI2QgdnMgI2Q9XCJtYXREYXRlUmFuZ2VQaWNrZXJcIikuIFdlIGNhbiBjaGFuZ2UgdGhpcyB0byBhXHJcbi8vIGRpcmVjdGl2ZSBpZiBhbmd1bGFyIGFkZHMgc3VwcG9ydCBmb3IgYGV4cG9ydEFzOiAnJGltcGxpY2l0J2Agb24gZGlyZWN0aXZlcy5cclxuLyoqIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgdGhlIGRhdGUgcmFuZ2UgcGlja2VyIHBvcHVwL2RpYWxvZy4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtZGF0ZS1yYW5nZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBleHBvcnRBczogJ21hdERhdGVSYW5nZVBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE1BVF9SQU5HRV9EQVRFX1NFTEVDVElPTl9NT0RFTF9QUk9WSURFUixcclxuICAgIE1BVF9DQUxFTkRBUl9SQU5HRV9TVFJBVEVHWV9QUk9WSURFUixcclxuICAgIHtwcm92aWRlOiBNYXREYXRlcGlja2VyQmFzZSwgdXNlRXhpc3Rpbmc6IE1hdERhdGVSYW5nZVBpY2tlcn0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVSYW5nZVBpY2tlcjxEPiBleHRlbmRzIE1hdERhdGVwaWNrZXJCYXNlPFxyXG4gIE1hdERhdGVSYW5nZVBpY2tlcklucHV0PEQ+LFxyXG4gIERhdGVSYW5nZTxEPixcclxuICBEXHJcbj4ge1xyXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfZm9yd2FyZENvbnRlbnRWYWx1ZXMoaW5zdGFuY2U6IE1hdERhdGVwaWNrZXJDb250ZW50PERhdGVSYW5nZTxEPiwgRD4pIHtcclxuICAgIHN1cGVyLl9mb3J3YXJkQ29udGVudFZhbHVlcyhpbnN0YW5jZSk7XHJcblxyXG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmRhdGVwaWNrZXJJbnB1dDtcclxuXHJcbiAgICBpZiAoaW5wdXQpIHtcclxuICAgICAgaW5zdGFuY2UuY29tcGFyaXNvblN0YXJ0ID0gaW5wdXQuY29tcGFyaXNvblN0YXJ0O1xyXG4gICAgICBpbnN0YW5jZS5jb21wYXJpc29uRW5kID0gaW5wdXQuY29tcGFyaXNvbkVuZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19