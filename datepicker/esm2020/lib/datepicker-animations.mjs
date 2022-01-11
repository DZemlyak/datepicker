/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, keyframes, } from '@angular/animations';
/**
 * Animations used by the Material datepicker.
 * @docs-private
 */
export const matDatepickerAnimations = {
    /** Transforms the height of the datepicker's calendar. */
    transformPanel: trigger('transformPanel', [
        transition('void => enter-dropdown', animate('120ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
            style({ opacity: 0, transform: 'scale(1, 0.8)' }),
            style({ opacity: 1, transform: 'scale(1, 1)' }),
        ]))),
        transition('void => enter-dialog', animate('150ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
            style({ opacity: 0, transform: 'scale(0.7)' }),
            style({ transform: 'none', opacity: 1 }),
        ]))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 }))),
    ]),
    /** Fades in the content of the calendar. */
    fadeInCalendar: trigger('fadeInCalendar', [
        state('void', style({ opacity: 0 })),
        state('enter', style({ opacity: 1 })),
        // TODO(crisbeto): this animation should be removed since it isn't quite on spec, but we
        // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
        transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
    ]),
    /* Active control */
    controlActive: trigger('controlActive', [
        transition('* => active', [
            animate('0.4s linear', keyframes([
                style({ transform: 'scale(0.9)' }),
                style({ transform: 'scale(1.1)' }),
                style({ transform: 'scale(1)' })
            ]))
        ])
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRlcGlja2VyL3NyYy9saWIvZGF0ZXBpY2tlci1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFNBQVMsR0FFVixNQUFNLHFCQUFxQixDQUFDO0FBRTdCOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUloQztJQUNGLDBEQUEwRDtJQUMxRCxjQUFjLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQ3hDLFVBQVUsQ0FDUix3QkFBd0IsRUFDeEIsT0FBTyxDQUNMLGtDQUFrQyxFQUNsQyxTQUFTLENBQUM7WUFDUixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUMsQ0FBQztZQUMvQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUMsQ0FBQztTQUM5QyxDQUFDLENBQ0gsQ0FDRjtRQUNELFVBQVUsQ0FDUixzQkFBc0IsRUFDdEIsT0FBTyxDQUNMLGtDQUFrQyxFQUNsQyxTQUFTLENBQUM7WUFDUixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQztZQUM1QyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQztTQUN2QyxDQUFDLENBQ0gsQ0FDRjtRQUNELFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RFLENBQUM7SUFFRiw0Q0FBNEM7SUFDNUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN4QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFFbkMsd0ZBQXdGO1FBQ3hGLHdGQUF3RjtRQUN4RixVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ2pGLENBQUM7SUFFRixvQkFBb0I7SUFDcEIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUU7UUFDdEMsVUFBVSxDQUFDLGFBQWEsRUFBRTtZQUN4QixPQUFPLENBQ0wsYUFBYSxFQUNiLFNBQVMsQ0FBQztnQkFDUixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ2pDLENBQUMsQ0FDSDtTQUNGLENBQUM7S0FDSCxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIGFuaW1hdGUsXHJcbiAgc3RhdGUsXHJcbiAgc3R5bGUsXHJcbiAgdHJhbnNpdGlvbixcclxuICB0cmlnZ2VyLFxyXG4gIGtleWZyYW1lcyxcclxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG4vKipcclxuICogQW5pbWF0aW9ucyB1c2VkIGJ5IHRoZSBNYXRlcmlhbCBkYXRlcGlja2VyLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWF0RGF0ZXBpY2tlckFuaW1hdGlvbnM6IHtcclxuICByZWFkb25seSB0cmFuc2Zvcm1QYW5lbDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xyXG4gIHJlYWRvbmx5IGZhZGVJbkNhbGVuZGFyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XHJcbiAgcmVhZG9ubHkgY29udHJvbEFjdGl2ZTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xyXG59ID0ge1xyXG4gIC8qKiBUcmFuc2Zvcm1zIHRoZSBoZWlnaHQgb2YgdGhlIGRhdGVwaWNrZXIncyBjYWxlbmRhci4gKi9cclxuICB0cmFuc2Zvcm1QYW5lbDogdHJpZ2dlcigndHJhbnNmb3JtUGFuZWwnLCBbXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAndm9pZCA9PiBlbnRlci1kcm9wZG93bicsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzEyMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDAuOCknfSksXHJcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMSknfSksXHJcbiAgICAgICAgXSksXHJcbiAgICAgICksXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJ3ZvaWQgPT4gZW50ZXItZGlhbG9nJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMC43KSd9KSxcclxuICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdub25lJywgb3BhY2l0eTogMX0pLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICApLFxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKSxcclxuICBdKSxcclxuXHJcbiAgLyoqIEZhZGVzIGluIHRoZSBjb250ZW50IG9mIHRoZSBjYWxlbmRhci4gKi9cclxuICBmYWRlSW5DYWxlbmRhcjogdHJpZ2dlcignZmFkZUluQ2FsZW5kYXInLCBbXHJcbiAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtvcGFjaXR5OiAwfSkpLFxyXG4gICAgc3RhdGUoJ2VudGVyJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXHJcblxyXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoaXMgYW5pbWF0aW9uIHNob3VsZCBiZSByZW1vdmVkIHNpbmNlIGl0IGlzbid0IHF1aXRlIG9uIHNwZWMsIGJ1dCB3ZVxyXG4gICAgLy8gbmVlZCB0byBrZWVwIGl0IHVudGlsICMxMjQ0MCBnZXRzIGluLCBvdGhlcndpc2UgdGhlIGV4aXQgYW5pbWF0aW9uIHdpbGwgbG9vayBnbGl0Y2h5LlxyXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgnMTIwbXMgMTAwbXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAsIDAuNTUsIDAuMiknKSksXHJcbiAgXSksXHJcblxyXG4gIC8qIEFjdGl2ZSBjb250cm9sICovXHJcbiAgY29udHJvbEFjdGl2ZTogdHJpZ2dlcignY29udHJvbEFjdGl2ZScsIFtcclxuICAgIHRyYW5zaXRpb24oJyogPT4gYWN0aXZlJywgW1xyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICcwLjRzIGxpbmVhcicsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMC45KScgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEuMSknIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxKScgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICBdKVxyXG4gIF0pLFxyXG59O1xyXG4iXX0=