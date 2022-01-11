import { ChangeDetectorRef, Pipe, ɵisObservable, ɵstringify as stringify, } from '@angular/core';
import * as i0 from "@angular/core";
export function invalidPipeArgumentError(type, value) {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
class ObservableStrategy {
    createSubscription(async, updateLatestValue) {
        return async.subscribe({
            next: updateLatestValue,
            error: (e) => {
                throw e;
            },
        });
    }
    dispose(subscription) {
        subscription.unsubscribe();
    }
    onDestroy(subscription) {
        subscription.unsubscribe();
    }
}
const _observableStrategy = new ObservableStrategy();
/**
 * Unwraps a value from an asynchronous primitive.
 *
 * The `dataSource` pipe subscribes to a `DataSource` and returns the latest value it has
 * emitted. When a new value is emitted, the `dataSource` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `dataSource` pipe disconnects automatically to avoid
 * potential memory leaks.
 */
export class DataSourcePipe {
    constructor(_ref) {
        this._ref = _ref;
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = null;
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._dispose();
        }
    }
    transform(obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }
        return this._latestValue;
    }
    _subscribe(obj) {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        const stream = obj.connect();
        this._subscription = this._strategy.createSubscription(stream, (value) => this._updateLatestValue(obj, value));
    }
    _selectStrategy(obj) {
        if (ɵisObservable(obj.change$)) {
            return _observableStrategy;
        }
        throw invalidPipeArgumentError(DataSourcePipe, obj);
    }
    _dispose() {
        this._strategy.dispose(this._subscription);
        this._obj.disconnect();
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
    }
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    }
}
DataSourcePipe.ɵfac = function DataSourcePipe_Factory(t) { return new (t || DataSourcePipe)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef, 16)); };
DataSourcePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "dataSource", type: DataSourcePipe, pure: false });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourcePipe, [{
        type: Pipe,
        args: [{ name: 'dataSource', pure: false }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS1waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9kYXRhc291cmNlL3NyYy9saWIvZGF0YXNvdXJjZS1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsSUFBSSxFQUdKLGFBQWEsRUFDYixVQUFVLElBQUksU0FBUyxHQUN4QixNQUFNLGVBQWUsQ0FBQzs7QUFJdkIsTUFBTSxVQUFVLHdCQUF3QixDQUFDLElBQWUsRUFBRSxLQUFhO0lBQ3JFLE9BQU8sS0FBSyxDQUFDLHlCQUF5QixLQUFLLGVBQWUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBV0QsTUFBTSxrQkFBa0I7SUFDdEIsa0JBQWtCLENBQ2hCLEtBQXNCLEVBQ3RCLGlCQUFzQjtRQUV0QixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixLQUFLLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxDQUFDLENBQUM7WUFDVixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxZQUE4QjtRQUNwQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVMsQ0FBQyxZQUE4QjtRQUN0QyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFckQ7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyxjQUFjO0lBT3pCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBTm5DLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBRXpCLGtCQUFhLEdBQTRCLElBQUksQ0FBQztRQUM5QyxTQUFJLEdBQTZDLElBQUksQ0FBQztRQUN0RCxjQUFTLEdBQXlCLElBQUssQ0FBQztJQUVGLENBQUM7SUFFL0MsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBSUQsU0FBUyxDQUFDLEdBQXlEO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QjtZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtRQUVELElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFVLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU8sVUFBVSxDQUFDLEdBQXNDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUNwRCxNQUFNLEVBQ04sQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQ3ZELENBQUM7SUFDSixDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQXNDO1FBQzVELElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixPQUFPLG1CQUFtQixDQUFDO1NBQzVCO1FBRUQsTUFBTSx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU8sa0JBQWtCLENBQUMsS0FBVSxFQUFFLEtBQWE7UUFDbEQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7NEVBaEVVLGNBQWM7aUZBQWQsY0FBYzt1RkFBZCxjQUFjO2NBRDFCLElBQUk7ZUFBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIFBpcGUsXHJcbiAgUGlwZVRyYW5zZm9ybSxcclxuICBUeXBlLFxyXG4gIMm1aXNPYnNlcnZhYmxlLFxyXG4gIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uTGlrZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZURhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UtcmVhY3RpdmUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRQaXBlQXJndW1lbnRFcnJvcih0eXBlOiBUeXBlPGFueT4sIHZhbHVlOiBPYmplY3QpIHtcclxuICByZXR1cm4gRXJyb3IoYEludmFsaWRQaXBlQXJndW1lbnQ6ICcke3ZhbHVlfScgZm9yIHBpcGUgJyR7c3RyaW5naWZ5KHR5cGUpfSdgKTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFN1YnNjcmlwdGlvblN0cmF0ZWd5IHtcclxuICBjcmVhdGVTdWJzY3JpcHRpb24oXHJcbiAgICBhc3luYzogT2JzZXJ2YWJsZTxhbnk+LFxyXG4gICAgdXBkYXRlTGF0ZXN0VmFsdWU6IGFueVxyXG4gICk6IFN1YnNjcmlwdGlvbkxpa2U7XHJcbiAgZGlzcG9zZShzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbkxpa2UpOiB2b2lkO1xyXG4gIG9uRGVzdHJveShzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbkxpa2UpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBPYnNlcnZhYmxlU3RyYXRlZ3kgaW1wbGVtZW50cyBTdWJzY3JpcHRpb25TdHJhdGVneSB7XHJcbiAgY3JlYXRlU3Vic2NyaXB0aW9uKFxyXG4gICAgYXN5bmM6IE9ic2VydmFibGU8YW55PixcclxuICAgIHVwZGF0ZUxhdGVzdFZhbHVlOiBhbnlcclxuICApOiBTdWJzY3JpcHRpb25MaWtlIHtcclxuICAgIHJldHVybiBhc3luYy5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiB1cGRhdGVMYXRlc3RWYWx1ZSxcclxuICAgICAgZXJyb3I6IChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uTGlrZSk6IHZvaWQge1xyXG4gICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkRlc3Ryb3koc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb25MaWtlKTogdm9pZCB7XHJcbiAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IF9vYnNlcnZhYmxlU3RyYXRlZ3kgPSBuZXcgT2JzZXJ2YWJsZVN0cmF0ZWd5KCk7XHJcblxyXG4vKipcclxuICogVW53cmFwcyBhIHZhbHVlIGZyb20gYW4gYXN5bmNocm9ub3VzIHByaW1pdGl2ZS5cclxuICpcclxuICogVGhlIGBkYXRhU291cmNlYCBwaXBlIHN1YnNjcmliZXMgdG8gYSBgRGF0YVNvdXJjZWAgYW5kIHJldHVybnMgdGhlIGxhdGVzdCB2YWx1ZSBpdCBoYXNcclxuICogZW1pdHRlZC4gV2hlbiBhIG5ldyB2YWx1ZSBpcyBlbWl0dGVkLCB0aGUgYGRhdGFTb3VyY2VgIHBpcGUgbWFya3MgdGhlIGNvbXBvbmVudCB0byBiZSBjaGVja2VkIGZvclxyXG4gKiBjaGFuZ2VzLiBXaGVuIHRoZSBjb21wb25lbnQgZ2V0cyBkZXN0cm95ZWQsIHRoZSBgZGF0YVNvdXJjZWAgcGlwZSBkaXNjb25uZWN0cyBhdXRvbWF0aWNhbGx5IHRvIGF2b2lkXHJcbiAqIHBvdGVudGlhbCBtZW1vcnkgbGVha3MuXHJcbiAqL1xyXG5AUGlwZSh7IG5hbWU6ICdkYXRhU291cmNlJywgcHVyZTogZmFsc2UgfSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VQaXBlIGltcGxlbWVudHMgT25EZXN0cm95LCBQaXBlVHJhbnNmb3JtIHtcclxuICBwcml2YXRlIF9sYXRlc3RWYWx1ZTogYW55ID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb25MaWtlIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfb2JqOiBSZWFjdGl2ZURhdGFTb3VyY2U8YW55LCBhbnksIGFueT4gfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9zdHJhdGVneTogU3Vic2NyaXB0aW9uU3RyYXRlZ3kgPSBudWxsITtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybTxUPihvYmo6IG51bGwpOiBudWxsO1xyXG4gIHRyYW5zZm9ybTxUPihvYmo6IHVuZGVmaW5lZCk6IHVuZGVmaW5lZDtcclxuICB0cmFuc2Zvcm0ob2JqOiBSZWFjdGl2ZURhdGFTb3VyY2U8YW55LCBhbnksIGFueT4gfCBudWxsIHwgdW5kZWZpbmVkKTogYW55IHtcclxuICAgIGlmICghdGhpcy5fb2JqKSB7XHJcbiAgICAgIGlmIChvYmopIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpYmUob2JqKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9iaiAhPT0gdGhpcy5fb2JqKSB7XHJcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKG9iaiBhcyBhbnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9sYXRlc3RWYWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmliZShvYmo6IFJlYWN0aXZlRGF0YVNvdXJjZTxhbnksIGFueSwgYW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5fb2JqID0gb2JqO1xyXG4gICAgdGhpcy5fc3RyYXRlZ3kgPSB0aGlzLl9zZWxlY3RTdHJhdGVneShvYmopO1xyXG4gICAgY29uc3Qgc3RyZWFtID0gb2JqLmNvbm5lY3QoKTtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVN1YnNjcmlwdGlvbihcclxuICAgICAgc3RyZWFtLFxyXG4gICAgICAodmFsdWU6IE9iamVjdCkgPT4gdGhpcy5fdXBkYXRlTGF0ZXN0VmFsdWUob2JqLCB2YWx1ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RTdHJhdGVneShvYmo6IFJlYWN0aXZlRGF0YVNvdXJjZTxhbnksIGFueSwgYW55Pik6IGFueSB7XHJcbiAgICBpZiAoybVpc09ic2VydmFibGUob2JqLmNoYW5nZSQpKSB7XHJcbiAgICAgIHJldHVybiBfb2JzZXJ2YWJsZVN0cmF0ZWd5O1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IGludmFsaWRQaXBlQXJndW1lbnRFcnJvcihEYXRhU291cmNlUGlwZSwgb2JqKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdHJhdGVneS5kaXNwb3NlKHRoaXMuX3N1YnNjcmlwdGlvbiEpO1xyXG4gICAgdGhpcy5fb2JqLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuX2xhdGVzdFZhbHVlID0gbnVsbDtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLl9vYmogPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTGF0ZXN0VmFsdWUoYXN5bmM6IGFueSwgdmFsdWU6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgaWYgKGFzeW5jID09PSB0aGlzLl9vYmopIHtcclxuICAgICAgdGhpcy5fbGF0ZXN0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=