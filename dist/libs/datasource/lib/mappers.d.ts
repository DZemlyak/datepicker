import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
/**
 * Premade Mappers
 */
export declare function mapPaginator(pageSize: number): import("rxjs").UnaryFunction<import("rxjs").Observable<PageEvent>, import("rxjs").Observable<{
    pageIndex: number;
    pageSize: number;
} | {
    pageIndex: number;
    pageSize: number;
}>>;
export declare function mapSort(): import("rxjs").UnaryFunction<import("rxjs").Observable<Sort>, import("rxjs").Observable<{
    orderBy: string;
    orderDir: "desc" | "asc";
} | {}>>;
//# sourceMappingURL=mappers.d.ts.map