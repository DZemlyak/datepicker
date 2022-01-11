import { AfterContentInit } from '@angular/core';
import { MatDataSource } from './datasource';
import * as i0 from "@angular/core";
export declare class DataSourceContainer<REQ, RAW, RES> implements AfterContentInit {
    dataSource: MatDataSource<REQ, RAW, RES>;
    diameter: number;
    strokeWidth: number;
    constructor();
    ngAfterContentInit(): void;
    private _validateSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceContainer<any, any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceContainer<any, any, any>, "mat-datasource", never, { "dataSource": "dataSource"; "diameter": "diameter"; "strokeWidth": "strokeWidth"; }, {}, never, ["mat-table,table,[mat-datasource-content]", "mat-datasource-empty", "mat-datasource-error", "mat-datasource-loading", "*"]>;
}
//# sourceMappingURL=container.d.ts.map