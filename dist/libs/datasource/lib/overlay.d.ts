import { AfterContentInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDataSource } from './datasource';
import * as i0 from "@angular/core";
export declare class DataSourceOverlay<REQ, RAW, RES> implements AfterContentInit, OnDestroy {
    private readonly cdr;
    dataSource: MatDataSource<REQ, RAW, RES>;
    diameter: number;
    strokeWidth: number;
    _display: string;
    private onDestroy;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    private _validateSource;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceOverlay<any, any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceOverlay<any, any, any>, "mat-datasource-overlay", never, { "dataSource": "dataSource"; "diameter": "diameter"; "strokeWidth": "strokeWidth"; }, {}, never, ["mat-datasource-loading", "mat-datasource-error", "mat-datasource-empty"]>;
}
//# sourceMappingURL=overlay.d.ts.map