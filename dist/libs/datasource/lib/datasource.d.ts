import { DataSource } from '@angular/cdk/table';
import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataSourceConfig } from './datasource-config';
import { MatDataSourceIntl } from './datasource-intl';
import { DataSourceLogger } from './datasource-logger';
import { DataSourceOpts, DataSourceStream } from './types';
import * as i0 from "@angular/core";
export declare abstract class MatDataSource<REQ = any, RAW = any, RES = any> extends DataSource<RES> implements OnDestroy {
    protected intl?: MatDataSourceIntl<REQ>;
    /**
     * State to control outside behavior like css classes and components.
     * Updated by pre/postQuery to show/hide the loading overlay and empty message.
     */
    private _reloading;
    get isLoading(): boolean;
    private _loading;
    get isLoaded(): boolean;
    private _loaded;
    get isEmpty(): boolean;
    private _empty;
    set skipSave(val: any);
    private _skip;
    /**
     * Number used to calculate the pagination length.
     * Updated after the rawResult method according to the response data.
     */
    get total(): number;
    private _total;
    get data(): RES[];
    private _data;
    /**
     * Number used to calculate the loading progress.
     * Updated while loading the query and triggering change$.
     */
    get progress(): number;
    protected _progress: number;
    /**
     * Output message getter.
     */
    get outputMsg(): string;
    protected _outputMsg: string;
    /**
     * Accessors
     */
    get args(): REQ;
    get progressMode(): import("@angular/material/progress-spinner").ProgressSpinnerMode;
    get change$(): Observable<any>;
    get data$(): Observable<RES[]>;
    get hasErrors(): boolean;
    get getErrors(): {
        [errorCode: string]: string;
    };
    /**
     * Setters
     */
    get config(): Partial<DataSourceConfig>;
    set config(config: Partial<DataSourceConfig>);
    protected _config: DataSourceConfig;
    /**
     * Control members for the datasource processing.
     */
    protected defaults: Partial<REQ>;
    protected overrides: Partial<REQ>;
    protected arguments: REQ & DataSourceOpts;
    /**
     * Error control vars.
     */
    protected readonly _logger: DataSourceLogger;
    /**
     * Stream only used to trigger a refresh on the data.
     * Can receive some Criteria overrides for a temporary update.
     * It has to be used outside the datasource to prevent infinite loops.
     */
    protected readonly _trigger$: BehaviorSubject<DataSourceOpts | Partial<REQ>>;
    /** Executions counter */
    private _triggered;
    /** Registered streams */
    private readonly _streams;
    /** Output Emitter to refresh the UI. */
    protected readonly _change$: BehaviorSubject<any>;
    /** Output Emitter of the latest Data. */
    protected readonly _data$: Subject<RES[]>;
    /** Disconnect internal observable. */
    protected readonly _disconnect$: Subject<void>;
    /**
     * DataSource.
     */
    constructor(intl?: MatDataSourceIntl<REQ>);
    ngOnDestroy(): void;
    /**
     * Streams
     */
    addArguments(args: Partial<REQ>): void;
    addStream(stream: Observable<Partial<REQ | DataSourceOpts>> | DataSourceStream<REQ>): string;
    remStream(name: string): void;
    /**
     * Triggers
     */
    refresh(overrides?: Partial<REQ>): void;
    reload(): void;
    restart(): void;
    /**
     * Data processing that can be completely customized.
     */
    reqArguments(args: REQ): REQ;
    abstract rawDefault(): RAW;
    abstract rawFetch(args: REQ): Observable<RAW>;
    abstract rawTotal(result: RAW): Observable<number>;
    rawFilter(result: RAW): boolean;
    abstract rawResult(result: RAW): Array<RES>;
    /**
     * Data Fetching Methods
     */
    private _blockStart;
    private _getArgs;
    private _isEqual;
    private _preQuery;
    private _execQuery;
    private _updateTotal;
    private _processException;
    private _postQuery;
    private _emptyMessage;
    /**
     * Data API
     */
    connect(): Observable<RES[]>;
    disconnect(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDataSource<any, any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatDataSource<any, any, any>>;
}
//# sourceMappingURL=datasource.d.ts.map