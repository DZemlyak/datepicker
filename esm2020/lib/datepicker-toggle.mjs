/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild, } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { MatDatepickerIntl } from './datepicker-intl';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/common";
/** Can be used to override the icon of a `matDatepickerToggle`. */
export class MatDatepickerToggleIcon {
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerToggleIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerToggleIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MatDatepickerToggleIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerToggleIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matDatepickerToggleIcon]',
                }]
        }] });
export class MatDatepickerToggle {
    constructor(_intl, _changeDetectorRef, defaultTabIndex) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription.EMPTY;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.datepicker) {
            return this.datepicker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes['datepicker']) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    _open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    _watchStateChanges() {
        const datepickerStateChanged = this.datepicker ? this.datepicker.stateChanges : observableOf();
        const inputStateChanged = this.datepicker && this.datepicker.datepickerInput
            ? this.datepicker.datepickerInput.stateChanges
            : observableOf();
        const datepickerToggled = this.datepicker
            ? merge(this.datepicker.openedStream, this.datepicker.closedStream)
            : observableOf();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerStateChanged, inputStateChanged, datepickerToggled).subscribe(() => this._changeDetectorRef.markForCheck());
    }
}
/** @nocollapse */ /** @nocollapse */ MatDatepickerToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerToggle, deps: [{ token: i1.MatDatepickerIntl }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ MatDatepickerToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: { datepicker: ["for", "datepicker"], tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], disabled: "disabled", disableRipple: "disableRipple" }, host: { listeners: { "click": "_open($event)" }, properties: { "attr.tabindex": "null", "class.mat-datepicker-toggle-active": "datepicker && datepicker.opened", "class.mat-accent": "datepicker && datepicker.color === \"accent\"", "class.mat-warn": "datepicker && datepicker.color === \"warn\"", "attr.data-mat-calendar": "datepicker ? datepicker.id : null" }, classAttribute: "mat-datepicker-toggle" }, queries: [{ propertyName: "_customIcon", first: true, predicate: MatDatepickerToggleIcon, descendants: true }], viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }], exportAs: ["matDatepickerToggle"], usesOnChanges: true, ngImport: i0, template: "<button\r\n  #button\r\n  mat-icon-button\r\n  type=\"button\"\r\n  [attr.aria-haspopup]=\"datepicker ? 'dialog' : null\"\r\n  [attr.aria-label]=\"ariaLabel || _intl.openCalendarLabel\"\r\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\r\n  [disabled]=\"disabled\"\r\n  [disableRipple]=\"disableRipple\">\r\n\r\n  <svg\r\n    *ngIf=\"!_customIcon\"\r\n    class=\"mat-datepicker-toggle-default-icon\"\r\n    viewBox=\"0 0 24 24\"\r\n    width=\"24px\"\r\n    height=\"24px\"\r\n    fill=\"currentColor\"\r\n    focusable=\"false\">\r\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n  </svg>\r\n\r\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\r\n</button>", styles: [".mat-form-field-appearance-legacy .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-datepicker-toggle-default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-datepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-datepicker-toggle-default-icon{margin:auto}.cdk-high-contrast-active .mat-datepicker-toggle-default-icon{color:CanvasText}\n"], components: [{ type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatDatepickerToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mat-datepicker-toggle', host: {
                        'class': 'mat-datepicker-toggle',
                        '[attr.tabindex]': 'null',
                        '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened',
                        '[class.mat-accent]': 'datepicker && datepicker.color === "accent"',
                        '[class.mat-warn]': 'datepicker && datepicker.color === "warn"',
                        // Used by the test harness to tie this toggle to its datepicker.
                        '[attr.data-mat-calendar]': 'datepicker ? datepicker.id : null',
                        // Bind the `click` on the host, rather than the inner `button`, so that we can call
                        // `stopPropagation` on it without affecting the user's `click` handlers. We need to stop
                        // it so that the input doesn't get focused automatically by the form field (See #21836).
                        '(click)': '_open($event)',
                    }, exportAs: 'matDatepickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\r\n  #button\r\n  mat-icon-button\r\n  type=\"button\"\r\n  [attr.aria-haspopup]=\"datepicker ? 'dialog' : null\"\r\n  [attr.aria-label]=\"ariaLabel || _intl.openCalendarLabel\"\r\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\r\n  [disabled]=\"disabled\"\r\n  [disableRipple]=\"disableRipple\">\r\n\r\n  <svg\r\n    *ngIf=\"!_customIcon\"\r\n    class=\"mat-datepicker-toggle-default-icon\"\r\n    viewBox=\"0 0 24 24\"\r\n    width=\"24px\"\r\n    height=\"24px\"\r\n    fill=\"currentColor\"\r\n    focusable=\"false\">\r\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n  </svg>\r\n\r\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\r\n</button>", styles: [".mat-form-field-appearance-legacy .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-datepicker-toggle-default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-datepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-datepicker-toggle-default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-datepicker-toggle-default-icon{margin:auto}.cdk-high-contrast-active .mat-datepicker-toggle-default-icon{color:CanvasText}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDatepickerIntl }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { datepicker: [{
                type: Input,
                args: ['for']
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], disabled: [{
                type: Input
            }], disableRipple: [{
                type: Input
            }], _customIcon: [{
                type: ContentChild,
                args: [MatDatepickerToggleIcon]
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGVwaWNrZXIvc3JjL2xpYi9kYXRlcGlja2VyLXRvZ2dsZS50cyIsIi4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2RhdGVwaWNrZXItdG9nZ2xlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDakIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsS0FBSyxFQUFjLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUdwRCxtRUFBbUU7QUFJbkUsTUFBTSxPQUFPLHVCQUF1Qjs7MEpBQXZCLHVCQUF1Qjs4SUFBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBd0JELE1BQU0sT0FBTyxtQkFBbUI7SUFtQzlCLFlBQ1MsS0FBd0IsRUFDdkIsa0JBQXFDLEVBQ3RCLGVBQXVCO1FBRnZDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFwQ3ZDLGtCQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQXVDekMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGVBQWUs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QkFBcUIsaUJBQ2hCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQXdDNUMsU0FBUzsyQkFBQyxVQUFVOzRDQWxDVCxVQUFVO3NCQUF2QixLQUFLO3VCQUFDLEtBQUs7Z0JBR0gsUUFBUTtzQkFBaEIsS0FBSztnQkFHZSxTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBSWYsUUFBUTtzQkFEWCxLQUFLO2dCQWNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR2lDLFdBQVc7c0JBQWpELFlBQVk7dUJBQUMsdUJBQXVCO2dCQUdoQixPQUFPO3NCQUEzQixTQUFTO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBBdHRyaWJ1dGUsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXRCdXR0b259IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7bWVyZ2UsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtNYXREYXRlcGlja2VySW50bH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xyXG5pbXBvcnQge01hdERhdGVwaWNrZXJDb250cm9sLCBNYXREYXRlcGlja2VyUGFuZWx9IGZyb20gJy4vZGF0ZXBpY2tlci1iYXNlJztcclxuXHJcbi8qKiBDYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgaWNvbiBvZiBhIGBtYXREYXRlcGlja2VyVG9nZ2xlYC4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWF0RGF0ZXBpY2tlclRvZ2dsZUljb25dJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJUb2dnbGVJY29uIHt9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyLXRvZ2dsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICdkYXRlcGlja2VyLXRvZ2dsZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci10b2dnbGUuc2NzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdtYXQtZGF0ZXBpY2tlci10b2dnbGUnLFxyXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdudWxsJyxcclxuICAgICdbY2xhc3MubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCcsXHJcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2RhdGVwaWNrZXIgJiYgZGF0ZXBpY2tlci5jb2xvciA9PT0gXCJhY2NlbnRcIicsXHJcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdkYXRlcGlja2VyICYmIGRhdGVwaWNrZXIuY29sb3IgPT09IFwid2FyblwiJyxcclxuICAgIC8vIFVzZWQgYnkgdGhlIHRlc3QgaGFybmVzcyB0byB0aWUgdGhpcyB0b2dnbGUgdG8gaXRzIGRhdGVwaWNrZXIuXHJcbiAgICAnW2F0dHIuZGF0YS1tYXQtY2FsZW5kYXJdJzogJ2RhdGVwaWNrZXIgPyBkYXRlcGlja2VyLmlkIDogbnVsbCcsXHJcbiAgICAvLyBCaW5kIHRoZSBgY2xpY2tgIG9uIHRoZSBob3N0LCByYXRoZXIgdGhhbiB0aGUgaW5uZXIgYGJ1dHRvbmAsIHNvIHRoYXQgd2UgY2FuIGNhbGxcclxuICAgIC8vIGBzdG9wUHJvcGFnYXRpb25gIG9uIGl0IHdpdGhvdXQgYWZmZWN0aW5nIHRoZSB1c2VyJ3MgYGNsaWNrYCBoYW5kbGVycy4gV2UgbmVlZCB0byBzdG9wXHJcbiAgICAvLyBpdCBzbyB0aGF0IHRoZSBpbnB1dCBkb2Vzbid0IGdldCBmb2N1c2VkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGZvcm0gZmllbGQgKFNlZSAjMjE4MzYpLlxyXG4gICAgJyhjbGljayknOiAnX29wZW4oJGV2ZW50KScsXHJcbiAgfSxcclxuICBleHBvcnRBczogJ21hdERhdGVwaWNrZXJUb2dnbGUnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyVG9nZ2xlPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIERhdGVwaWNrZXIgaW5zdGFuY2UgdGhhdCB0aGUgYnV0dG9uIHdpbGwgdG9nZ2xlLiAqL1xyXG4gIEBJbnB1dCgnZm9yJykgZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlclBhbmVsPE1hdERhdGVwaWNrZXJDb250cm9sPGFueT4sIEQ+O1xyXG5cclxuICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXHJcbiAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBTY3JlZW5yZWFkZXIgbGFiZWwgZm9yIHRoZSBidXR0b24uICovXHJcbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5kYXRlcGlja2VyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoZXRoZXIgcmlwcGxlcyBvbiB0aGUgdG9nZ2xlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cclxuICBASW5wdXQoKSBkaXNhYmxlUmlwcGxlOiBib29sZWFuO1xyXG5cclxuICAvKiogQ3VzdG9tIGljb24gc2V0IGJ5IHRoZSBjb25zdW1lci4gKi9cclxuICBAQ29udGVudENoaWxkKE1hdERhdGVwaWNrZXJUb2dnbGVJY29uKSBfY3VzdG9tSWNvbjogTWF0RGF0ZXBpY2tlclRvZ2dsZUljb247XHJcblxyXG4gIC8qKiBVbmRlcmx5aW5nIGJ1dHRvbiBlbGVtZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoJ2J1dHRvbicpIF9idXR0b246IE1hdEJ1dHRvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgX2ludGw6IE1hdERhdGVwaWNrZXJJbnRsLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBkZWZhdWx0VGFiSW5kZXg6IHN0cmluZyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcnNlZFRhYkluZGV4ID0gTnVtYmVyKGRlZmF1bHRUYWJJbmRleCk7XHJcbiAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VkVGFiSW5kZXggfHwgcGFyc2VkVGFiSW5kZXggPT09IDAgPyBwYXJzZWRUYWJJbmRleCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snZGF0ZXBpY2tlciddKSB7XHJcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIF9vcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlciAmJiAhdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xyXG4gICAgY29uc3QgZGF0ZXBpY2tlclN0YXRlQ2hhbmdlZCA9IHRoaXMuZGF0ZXBpY2tlciA/IHRoaXMuZGF0ZXBpY2tlci5zdGF0ZUNoYW5nZXMgOiBvYnNlcnZhYmxlT2YoKTtcclxuICAgIGNvbnN0IGlucHV0U3RhdGVDaGFuZ2VkID1cclxuICAgICAgdGhpcy5kYXRlcGlja2VyICYmIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXRcclxuICAgICAgICA/IHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXQuc3RhdGVDaGFuZ2VzXHJcbiAgICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcclxuICAgIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGVkID0gdGhpcy5kYXRlcGlja2VyXHJcbiAgICAgID8gbWVyZ2UodGhpcy5kYXRlcGlja2VyLm9wZW5lZFN0cmVhbSwgdGhpcy5kYXRlcGlja2VyLmNsb3NlZFN0cmVhbSlcclxuICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcclxuXHJcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcyA9IG1lcmdlKFxyXG4gICAgICB0aGlzLl9pbnRsLmNoYW5nZXMsXHJcbiAgICAgIGRhdGVwaWNrZXJTdGF0ZUNoYW5nZWQgYXMgT2JzZXJ2YWJsZTx2b2lkPixcclxuICAgICAgaW5wdXRTdGF0ZUNoYW5nZWQsXHJcbiAgICAgIGRhdGVwaWNrZXJUb2dnbGVkLFxyXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XHJcbn1cclxuIiwiPGJ1dHRvblxyXG4gICNidXR0b25cclxuICBtYXQtaWNvbi1idXR0b25cclxuICB0eXBlPVwiYnV0dG9uXCJcclxuICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cImRhdGVwaWNrZXIgPyAnZGlhbG9nJyA6IG51bGxcIlxyXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsIHx8IF9pbnRsLm9wZW5DYWxlbmRhckxhYmVsXCJcclxuICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IC0xIDogdGFiSW5kZXhcIlxyXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgW2Rpc2FibGVSaXBwbGVdPVwiZGlzYWJsZVJpcHBsZVwiPlxyXG5cclxuICA8c3ZnXHJcbiAgICAqbmdJZj1cIiFfY3VzdG9tSWNvblwiXHJcbiAgICBjbGFzcz1cIm1hdC1kYXRlcGlja2VyLXRvZ2dsZS1kZWZhdWx0LWljb25cIlxyXG4gICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICB3aWR0aD1cIjI0cHhcIlxyXG4gICAgaGVpZ2h0PVwiMjRweFwiXHJcbiAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcclxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCI+XHJcbiAgICA8cGF0aCBkPVwiTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAxOWMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOGgxNHYxMXpNNyAxMGg1djVIN3pcIi8+XHJcbiAgPC9zdmc+XHJcblxyXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYXREYXRlcGlja2VyVG9nZ2xlSWNvbl1cIj48L25nLWNvbnRlbnQ+XHJcbjwvYnV0dG9uPiJdfQ==