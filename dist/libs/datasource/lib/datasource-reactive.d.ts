import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, UnaryFunction } from 'rxjs';
import { MatDataSource } from './datasource';
import { DataSourceItem } from './types';
export declare abstract class ReactiveDataSource<REQ, RAW, RES> extends MatDataSource<REQ, RAW, RES> {
    /**
     * Pagination Settings
     */
    get pageIndex(): number;
    set pageIndex(size: number);
    private _pageIndex;
    get pageSize(): number;
    set pageSize(size: number);
    private _pageSize;
    setPaginator(paginator: MatPaginator, mapper?: (pageSize: number) => UnaryFunction<Observable<PageEvent>, Observable<any>>): void;
    setSort(sort: MatSort, mapper?: () => UnaryFunction<Observable<Sort>, Observable<any>>): void;
    /**
     * Attachs an autocompleter with this data source filtered. Note that
     * the stream provided will be accessed during change detection and should not directly change
     * values that are bound in template views.
     * @returns Observable that emits a new value when the data changes.
     */
    attach(): Observable<Array<DataSourceItem>>;
    abstract filter(query: string, limit: number): void;
    abstract resFilter(result: Array<RES>): Array<DataSourceItem>;
}
//# sourceMappingURL=datasource-reactive.d.ts.map