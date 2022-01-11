import { ChangeDetectorRef, OnDestroy, PipeTransform, Type } from '@angular/core';
import * as i0 from "@angular/core";
export declare function invalidPipeArgumentError(type: Type<any>, value: Object): Error;
/**
 * Unwraps a value from an asynchronous primitive.
 *
 * The `dataSource` pipe subscribes to a `DataSource` and returns the latest value it has
 * emitted. When a new value is emitted, the `dataSource` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `dataSource` pipe disconnects automatically to avoid
 * potential memory leaks.
 */
export declare class DataSourcePipe implements OnDestroy, PipeTransform {
    private _ref;
    private _latestValue;
    private _subscription;
    private _obj;
    private _strategy;
    constructor(_ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    transform<T>(obj: null): null;
    transform<T>(obj: undefined): undefined;
    private _subscribe;
    private _selectStrategy;
    private _dispose;
    private _updateLatestValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourcePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DataSourcePipe, "dataSource">;
}
//# sourceMappingURL=datasource-pipe.d.ts.map