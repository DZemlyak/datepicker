import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Directive, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding, ɵstringify, ɵisObservable, Pipe, NgModule } from '@angular/core';
import * as i2 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataSource } from '@angular/cdk/table';
import { isEqual } from 'lodash';
import { isObservable, combineLatest, merge, of, BehaviorSubject, Subject, timer, pipe } from 'rxjs';
import { map, first, switchMap, startWith, scan, tap, takeUntil, take, filter, catchError, throttleTime, skipWhile, distinctUntilChanged } from 'rxjs/operators';

/**
 * Config Texts
 */
function emptyMsg() {
    return 'No data available';
}
function waitMsg() {
    return 'Please wait...';
}
function delayMsg() {
    return 'The data is still loading...';
}
function timeoutMsg() {
    return 'Loading has timed out, please try again.';
}
/**
 * Debug Messages
 */
function removingStream() {
    return `SETUP Removing stream`;
}
function setValue(name) {
    return `SETUP ${name} =`;
}
function srcAdding(src) {
    return [`SETUP Adding stream`, src];
}
function srcEmpty(name) {
    return `SETUP Adding empty stream '${name}'`;
}
function srcInvalid() {
    return `SETUP Empty stream provided!`;
}
function srcConnect() {
    return `REQ Connected`;
}
function srcEmitted(src) {
    return `REQ Stream ${src} emitted`;
}
function srcOutput() {
    return `REQ Streams output`;
}
function isAutoStarting() {
    return `REQ DataSource starting automatically`;
}
function notAutoStarting(length) {
    return `REQ DataSource not auto starting with ${length} streams`;
}
function resolvedArgs(distinct) {
    return `REQ Resolved ${distinct ? 'the SAME' : ''} request`;
}
function queryResponse() {
    return 'RAW Query response:';
}
function queryTimeout() {
    return 'RAW Query timeout count:';
}
function responseTotal() {
    return 'RAW Calculated total:';
}
function responseSuccess(result) {
    const len = result.length;
    return [`RES succeed with ${len} item${len === 1 ? '' : 's'}`, result];
}
function responseError(errors) {
    return ['RES failed', errors];
}
function disconnecting() {
    return 'Disconnecting';
}
/**
 * Error Messages
 */
function addWhenRunning(item) {
    return `Adding "${item}" after the DataSource is already running.`;
}
function rmWhenRunning(item) {
    return `Trying to remove "${item}" after the DataSource is already running.`;
}
function nonNumeric(name) {
    return 'Non numeric ${name} passed';
}
function missingDataSourceInput() {
    return 'mat-datasource must receive a dataSource input';
}
function resException() {
    return 'Exception processing the result';
}

const defaultConfig = {
    debug: false,
    autoStart: true,
    showErrors: true,
    emptyMsg: emptyMsg,
    waitMsg: waitMsg(),
    delayMsg: delayMsg(),
    timeoutMsg: timeoutMsg(),
    waitMs: 5000,
    intervalMs: 10000,
    progressMode: 'indeterminate',
};

/** DataSource messages that requires internationalization. */
class MatDataSourceIntl {
    constructor() {
        /** A message to show when there's no resulting data. */
        this.emptyMsg = 'No data available';
        /** A waiting message to show while loading the data. */
        this.waitMsg = 'Please wait...';
        /** A waiting message when the data is taking too long. */
        this.delayMsg = 'The data is still loading...';
        /** A timeout message if there's no response. */
        this.timeoutMsg = 'Loading has timed out, please try again.';
    }
}
MatDataSourceIntl.ɵfac = function MatDataSourceIntl_Factory(t) { return new (t || MatDataSourceIntl)(); };
MatDataSourceIntl.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MatDataSourceIntl, factory: MatDataSourceIntl.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDataSourceIntl, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

/**
 * Logging Handler
 */
class DataSourceLogger {
    constructor(sourceName, _intl) {
        this.sourceName = sourceName;
        this._intl = _intl;
        /**
         * Errors Collection
         */
        this._errors = {};
    }
    set config(config) {
        this._config = config;
    }
    /**
     * Error Management Methods
     */
    getErrors() {
        return this._errors;
    }
    addError(errorCode, error) {
        this._errors[errorCode] = typeof error === 'string' ? error : error.message;
    }
    handleError(errorCode, error) {
        this._config.errorHandler
            ? this.addError(errorCode, this._config.errorHandler(error))
            : this.addError(errorCode, error);
    }
    hasError(errorCode) {
        return this._errors.hasOwnProperty(errorCode);
    }
    hasErrors(force = false) {
        return ((this._config.showErrors || force) && !!Object.keys(this._errors).length);
    }
    getTimeoutError(attempt) {
        switch (attempt) {
            case 0:
                return this._intl?.waitMsg || this._config.waitMsg;
            case 1:
                return this._intl?.delayMsg || this._config.delayMsg;
            default:
                throw new Error(this._intl?.timeoutMsg || this._config.timeoutMsg);
        }
    }
    clearErrors() {
        this._errors = {};
    }
    /**
     * Debug Utils
     */
    // display a message according a condition
    debug(truthy, falsy, condition = true) {
        if (this._config.debug) {
            if (condition) {
                truthy = Array.isArray(truthy) ? truthy : [truthy];
                console.log(`${this.sourceName}:`, ...truthy);
            }
            else if (falsy) {
                falsy = Array.isArray(falsy) ? falsy : [falsy];
                console.log(`${this.sourceName}:`, ...falsy);
            }
        }
    }
    // logs an object if debug mode is enabled
    print(message, obj) {
        if (this._config.debug) {
            console.log(`${this.sourceName}:`, message, obj);
        }
    }
    // throw an error if the condition is truthy
    check(condition, message) {
        if (condition) {
            throw new Error(`${this.sourceName}: ${message}`);
        }
    }
}

class DataSourceStreamer {
    constructor(logger) {
        this.logger = logger;
        // streams to listen
        this.streams = [];
    }
    get length() {
        return this.streams.length;
    }
    add(src) {
        this.logger.check(!src.stream, srcInvalid());
        if (src.stream && isObservable(src.stream)) {
            this.streams.push(src);
        }
        return src.name;
    }
    remove(name) {
        this.streams = this.streams.filter((s) => s.name !== name);
    }
    connect() {
        this.logger.print(srcConnect(), this.streams.map((src, i) => src.name || i));
        const required = this.streams
            .filter((src) => !src.optional)
            .sort((a, b) => ((a.weight || 0) < (b.weight || 0) ? -1 : 1))
            .map(this.logEmittedValue());
        const optional = this.streams
            .filter((src) => src.optional)
            .map(this.logEmittedValue());
        return combineLatest([
            required.length
                ? combineLatest(required).pipe(
                // waits the first emission of the required ones
                map((args) => args.reduce(this.reducePartials, {})), first(), 
                // and from there it accumulates the emissions
                switchMap((args) => merge(...required).pipe(startWith(args), scan(this.reducePartials, {}))))
                : of({}),
            optional.length
                ? merge(...optional).pipe(startWith({}), scan(this.reducePartials, {}))
                : of({}),
        ]).pipe(map((args) => args.reduce(this.reducePartials, {})), tap((v) => this.logger.print(srcOutput(), v)));
    }
    logEmittedValue() {
        return (src, i) => src.stream.pipe(tap((output) => this.logger.print(srcEmitted(src.name || i), output)));
    }
    reducePartials(a, b) {
        return { ...a, ...b };
    }
}

class MatDataSource extends DataSource {
    /**
     * DataSource.
     */
    constructor(intl) {
        super();
        this.intl = intl;
        /**
         * State to control outside behavior like css classes and components.
         * Updated by pre/postQuery to show/hide the loading overlay and empty message.
         */
        this._reloading = true;
        this._loading = true;
        this._loaded = false;
        this._empty = true;
        this._skip = false;
        this._total = 0;
        this._data = [];
        this._progress = 0;
        this._config = defaultConfig;
        /**
         * Control members for the datasource processing.
         */
        this.defaults = {};
        this.overrides = {};
        /**
         * Error control vars.
         */
        this._logger = new DataSourceLogger(this.constructor.name, this.intl);
        /**
         * Stream only used to trigger a refresh on the data.
         * Can receive some Criteria overrides for a temporary update.
         * It has to be used outside the datasource to prevent infinite loops.
         */
        this._trigger$ = new BehaviorSubject({});
        /** Executions counter */
        this._triggered = 0;
        /** Registered streams */
        this._streams = new DataSourceStreamer(this._logger);
        /** Output Emitter to refresh the UI. */
        this._change$ = new BehaviorSubject({});
        /** Output Emitter of the latest Data. */
        this._data$ = new Subject();
        /** Disconnect internal observable. */
        this._disconnect$ = new Subject();
        // update i18n if present
        if (this.intl) {
            this.config = this.intl;
        }
        // initial config sync
        this._logger.config = this._config;
        // listen the internal trigger
        this.addStream(this._trigger$);
    }
    get isLoading() {
        return this._loading;
    }
    get isLoaded() {
        return this._loaded;
    }
    get isEmpty() {
        return this._empty;
    }
    set skipSave(val) {
        this._skip = !!val;
    }
    /**
     * Number used to calculate the pagination length.
     * Updated after the rawResult method according to the response data.
     */
    get total() {
        return this._total;
    }
    get data() {
        return this._data ? this._data : [];
    }
    /**
     * Number used to calculate the loading progress.
     * Updated while loading the query and triggering change$.
     */
    get progress() {
        return this._progress;
    }
    /**
     * Output message getter.
     */
    get outputMsg() {
        return this._outputMsg;
    }
    /**
     * Accessors
     */
    get args() {
        return this.arguments || {};
    }
    get progressMode() {
        return this._config.progressMode;
    }
    get change$() {
        return this._change$.asObservable();
    }
    get data$() {
        return this._data$.asObservable();
    }
    get hasErrors() {
        return this._logger.hasErrors(true);
    }
    get getErrors() {
        return this._logger.getErrors();
    }
    /**
     * Setters
     */
    // config settings
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = {
            ...this._config,
            ...config,
        };
        this._logger.config = this._config;
    }
    ngOnDestroy() {
        this._logger.print(disconnecting(), '');
        this.disconnect();
    }
    /**
     * Streams
     */
    addArguments(args) {
        this.defaults = { ...this.defaults, ...args };
    }
    addStream(stream) {
        const src = isObservable(stream)
            ? {
                name: this._streams.length.toString(),
                stream,
            }
            : stream;
        this._logger.check(this._triggered, addWhenRunning(src.name || src.stream));
        this._logger.debug(srcAdding(src.name), srcEmpty(src.name), stream);
        return this._streams.add(src);
    }
    remStream(name) {
        this._logger.check(this._triggered, rmWhenRunning(name));
        this._logger.print(removingStream(), name);
        this._streams.remove(name);
    }
    /**
     * Triggers
     */
    refresh(overrides = {}) {
        this.overrides = overrides;
        this._trigger$.next(overrides);
    }
    reload() {
        this._reloading = true;
        this._trigger$.next({ forceReload: new Date().getTime() });
    }
    restart() {
        this._triggered = 0;
    }
    /**
     * Data processing that can be completely customized.
     */
    reqArguments(args) {
        return args;
    }
    rawFilter(result) {
        return true;
    }
    /**
     * Data Fetching Methods
     */
    _blockStart() {
        // check if it's not configured to start after the first trigger
        const block = this._triggered === 1 && !this._config.autoStart;
        if (this._triggered === 1) {
            this._logger.debug(isAutoStarting(), notAutoStarting(this._streams.length), !block);
        }
        if (block) {
            this._loading = false;
        }
        return block;
    }
    _getArgs(output) {
        // merge all the stream outputs
        this.arguments = {
            ...this.defaults,
            ...output,
            ...this.overrides,
        };
        delete this.arguments.forceReload;
        return this.arguments;
    }
    _isEqual() {
        return (prev, curr) => {
            const isDistinct = !this._reloading && isEqual(prev, curr);
            this._logger.print(resolvedArgs(isDistinct), curr);
            return isDistinct;
        };
    }
    _preQuery() {
        // state update
        this._loading = true;
        this._reloading = false;
        this._outputMsg = '';
        this._logger.clearErrors();
        this._change$.next({});
        this.overrides = {};
    }
    _execQuery(args) {
        const query = this.rawFetch(args);
        return merge(query, 
        // timers check
        timer(this.config.waitMs, this.config.intervalMs).pipe(takeUntil(query), take(3) // by default: 5s, 15s, 25s
        )).pipe(
        // delay check
        tap((val) => {
            if (typeof val !== 'number') {
                this._logger.print(queryResponse(), val);
            }
            else {
                this._logger.print(queryTimeout(), val);
                try {
                    this._outputMsg = this._logger.getTimeoutError(val);
                }
                catch (e) {
                    this._logger.addError('timeout', e.message);
                    this._loading = false;
                }
                this._change$.next({});
            }
        }), 
        // discard timer result
        filter((result) => typeof result !== 'number'), catchError((err) => {
            // isolate query error
            this._logger.handleError('query', err);
            return of(this.rawDefault());
        }));
    }
    _updateTotal(res) {
        if (!this.hasErrors) {
            // microtask as workaround for change detection
            this.rawTotal(res)
                .pipe(take(1), tap((total) => this._logger.print(responseTotal(), total)))
                .subscribe((total) => {
                this._total = total;
                this._change$.next({});
            });
        }
    }
    _processException(err) {
        console.error(`${this.constructor.name} Exception`, err);
        return of(false);
    }
    _postQuery(res) {
        const hasErrors = this.hasErrors;
        const data = !hasErrors ? this.rawResult(res) : [];
        this._logger.debug(responseSuccess(data), responseError(this.getErrors), !hasErrors);
        this._empty = !data || !data.length;
        if (!hasErrors && this._empty) {
            this._outputMsg = this._emptyMessage();
        }
        if (!this._skip) {
            this._data = data;
            this._data$.next(data);
        }
        this._loaded = !hasErrors;
        this._loading = false;
        this._skip = false;
        this._change$.next({});
        return data;
    }
    _emptyMessage() {
        if (this.intl?.emptyMsg) {
            if (typeof this.intl.emptyMsg === 'function') {
                return this.intl.emptyMsg(this.args);
            }
            else {
                return this.intl.emptyMsg;
            }
        }
        if (this._config.emptyMsg) {
            if (typeof this._config.emptyMsg === 'function') {
                return this._config.emptyMsg(this.args);
            }
            else {
                return this._config.emptyMsg;
            }
        }
        return emptyMsg();
    }
    /**
     * Data API
     */
    connect() {
        return this._streams.connect().pipe(takeUntil(this._disconnect$), throttleTime(10), tap(() => this._triggered++), skipWhile(() => this._blockStart()), map((args) => this._getArgs(args)), map((req) => this.reqArguments(req)), distinctUntilChanged(this._isEqual()), tap(() => this._preQuery()), switchMap((req) => this._execQuery(req)), takeUntil(this._disconnect$), filter((raw) => this.rawFilter(raw)), tap((raw) => this._updateTotal(raw)), catchError((err) => this._processException(err)), map((raw) => this._postQuery(raw)));
    }
    disconnect() {
        this._trigger$.complete();
        this._change$.complete();
        this._disconnect$.next();
        this._disconnect$.complete();
    }
}
MatDataSource.ɵfac = function MatDataSource_Factory(t) { return new (t || MatDataSource)(i0.ɵɵinject(MatDataSourceIntl)); };
MatDataSource.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MatDataSource, factory: MatDataSource.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDataSource, [{
        type: Injectable
    }], function () { return [{ type: MatDataSourceIntl }]; }, null); })();

class DataSourceContent {
}
DataSourceContent.ɵfac = function DataSourceContent_Factory(t) { return new (t || DataSourceContent)(); };
DataSourceContent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: DataSourceContent, selectors: [["mat-datasource-content"]], hostAttrs: [1, "mat-datasource-content"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceContent, [{
        type: Directive,
        args: [{
                selector: 'mat-datasource-content',
                host: {
                    class: 'mat-datasource-content'
                }
            }]
    }], null, null); })();
class DataSourceEmpty {
}
DataSourceEmpty.ɵfac = function DataSourceEmpty_Factory(t) { return new (t || DataSourceEmpty)(); };
DataSourceEmpty.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: DataSourceEmpty, selectors: [["mat-datasource-empty"]], hostAttrs: [1, "mat-datasource-empty"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceEmpty, [{
        type: Directive,
        args: [{
                selector: 'mat-datasource-empty',
                host: {
                    class: 'mat-datasource-empty'
                }
            }]
    }], null, null); })();
class DataSourceError {
}
DataSourceError.ɵfac = function DataSourceError_Factory(t) { return new (t || DataSourceError)(); };
DataSourceError.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: DataSourceError, selectors: [["mat-datasource-error"]], hostAttrs: [1, "mat-datasource-error"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceError, [{
        type: Directive,
        args: [{
                selector: 'mat-datasource-error',
                host: {
                    class: 'mat-datasource-error'
                }
            }]
    }], null, null); })();
class DataSourceLoading {
}
DataSourceLoading.ɵfac = function DataSourceLoading_Factory(t) { return new (t || DataSourceLoading)(); };
DataSourceLoading.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: DataSourceLoading, selectors: [["mat-datasource-loading"]], hostAttrs: [1, "mat-datasource-loading"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceLoading, [{
        type: Directive,
        args: [{
                selector: 'mat-datasource-loading',
                host: {
                    class: 'mat-datasource-loading'
                }
            }]
    }], null, null); })();

function DataSourceOverlay_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DataSourceOverlay_ng_template_1_ng_container_4_mat_datasource_loading_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-datasource-loading");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r7.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_1_ng_container_4_mat_datasource_loading_1_Template, 2, 1, "mat-datasource-loading", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-spinner", 3);
    i0.ɵɵelementStart(1, "div", null, 4);
    i0.ɵɵprojection(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, DataSourceOverlay_ng_template_1_ng_container_4_Template, 2, 1, "ng-container", 5);
} if (rf & 2) {
    const _r5 = i0.ɵɵreference(2);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("mode", ctx_r2.dataSource.progressMode)("value", ctx_r2.dataSource.progress)("diameter", ctx_r2.diameter)("strokeWidth", ctx_r2.strokeWidth);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !_r5.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_mat_datasource_error_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-datasource-error");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r16 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(error_r16.value);
} }
function DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_mat_datasource_error_1_Template, 2, 1, "mat-datasource-error", 10);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 1, ctx_r14.dataSource.getErrors));
} }
function DataSourceOverlay_ng_template_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 9);
    i0.ɵɵprojection(2, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_1_ng_container_3_Template, 3, 3, "ng-container", 5);
} if (rf & 2) {
    const _r13 = i0.ɵɵreference(1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !_r13.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_ng_template_3_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-datasource-empty");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r18.dataSource.outputMsg);
} }
function DataSourceOverlay_ng_template_3_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8, 11);
    i0.ɵɵprojection(2, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_3_ng_container_3_Template, 3, 1, "ng-container", 5);
} if (rf & 2) {
    const _r17 = i0.ɵɵreference(1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !_r17.childNodes.length);
} }
function DataSourceOverlay_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DataSourceOverlay_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 0);
    i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_3_ng_template_1_Template, 4, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_ng_template_3_Template, 4, 1, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const _r9 = i0.ɵɵreference(2);
    const _r11 = i0.ɵɵreference(4);
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r4.dataSource.hasErrors)("ngIfThen", _r9)("ngIfElse", _r11);
} }
const _c0$1 = [[["mat-datasource-loading"]], [["mat-datasource-error"]], [["mat-datasource-empty"]]];
const _c1$1 = ["mat-datasource-loading", "mat-datasource-error", "mat-datasource-empty"];
class DataSourceOverlay {
    constructor(cdr) {
        this.cdr = cdr;
        this.onDestroy = new Subject();
    }
    ngAfterContentInit() {
        this._validateSource();
        // listen source changes
        this.dataSource.change$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this._display =
                this.dataSource.isLoading ||
                    this.dataSource.hasErrors ||
                    this.dataSource.isEmpty
                    ? 'flex'
                    : 'none';
            this.cdr.markForCheck();
        });
    }
    _validateSource() {
        if (!this.dataSource) {
            throw Error(missingDataSourceInput());
        }
    }
    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
DataSourceOverlay.ɵfac = function DataSourceOverlay_Factory(t) { return new (t || DataSourceOverlay)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
DataSourceOverlay.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataSourceOverlay, selectors: [["mat-datasource-overlay"]], hostAttrs: [1, "mat-datasource-overlay"], hostVars: 2, hostBindings: function DataSourceOverlay_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("display", ctx._display);
    } }, inputs: { dataSource: "dataSource", diameter: "diameter", strokeWidth: "strokeWidth" }, ngContentSelectors: _c1$1, decls: 5, vars: 3, consts: [[4, "ngIf", "ngIfThen", "ngIfElse"], ["loading", ""], ["loaded", ""], [3, "mode", "value", "diameter", "strokeWidth"], ["out", ""], [4, "ngIf"], ["errors", ""], ["empty", ""], [1, "mat-datasource-overlay"], ["err", ""], [4, "ngFor", "ngForOf"], ["emp", ""]], template: function DataSourceOverlay_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0$1);
        i0.ɵɵtemplate(0, DataSourceOverlay_ng_container_0_Template, 1, 0, "ng-container", 0);
        i0.ɵɵtemplate(1, DataSourceOverlay_ng_template_1_Template, 5, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, DataSourceOverlay_ng_template_3_Template, 5, 3, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(2);
        const _r3 = i0.ɵɵreference(4);
        i0.ɵɵproperty("ngIf", ctx.dataSource.isLoading)("ngIfThen", _r1)("ngIfElse", _r3);
    } }, directives: [i1.NgIf, i2.MatProgressSpinner, DataSourceLoading, i1.NgForOf, DataSourceError, DataSourceEmpty], pipes: [i1.KeyValuePipe], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceOverlay, [{
        type: Component,
        args: [{ selector: 'mat-datasource-overlay', host: {
                    class: 'mat-datasource-overlay'
                }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"dataSource.isLoading then loading; else loaded\"></ng-container>\r\n\r\n<ng-template #loading>\r\n  <mat-progress-spinner\r\n    [mode]=\"dataSource.progressMode\"\r\n    [value]=\"dataSource.progress\"\r\n    [diameter]=\"diameter\"\r\n    [strokeWidth]=\"strokeWidth\"\r\n  ></mat-progress-spinner>\r\n\r\n  <div #out>\r\n    <ng-content select=\"mat-datasource-loading\"></ng-content>\r\n  </div>\r\n  <ng-container *ngIf=\"!out.childNodes.length\">\r\n    <mat-datasource-loading *ngIf=\"dataSource.outputMsg\">{{ dataSource.outputMsg }}</mat-datasource-loading>\r\n  </ng-container>\r\n</ng-template>\r\n\r\n<ng-template #loaded>\r\n  <ng-container *ngIf=\"dataSource.hasErrors then errors; else empty\"></ng-container>\r\n\r\n  <ng-template #errors>\r\n    <div class=\"mat-datasource-overlay\" #err>\r\n      <ng-content select=\"mat-datasource-error\"></ng-content>\r\n    </div>\r\n    <ng-container *ngIf=\"!err.childNodes.length\">\r\n      <mat-datasource-error *ngFor=\"let error of dataSource.getErrors | keyvalue\">{{ error.value }}</mat-datasource-error>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #empty>\r\n    <div class=\"mat-datasource-overlay\" #emp>\r\n      <ng-content select=\"mat-datasource-empty\"></ng-content>\r\n    </div>\r\n    <ng-container *ngIf=\"!emp.childNodes.length\">\r\n      <mat-datasource-empty>{{ dataSource.outputMsg }}</mat-datasource-empty>\r\n    </ng-container>\r\n  </ng-template>\r\n</ng-template>\r\n" }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { dataSource: [{
            type: Input
        }], diameter: [{
            type: Input
        }], strokeWidth: [{
            type: Input
        }], _display: [{
            type: HostBinding,
            args: ['style.display']
        }] }); })();

const _c0 = [[["mat-table"], ["table"], ["", "mat-datasource-content", ""]], [["mat-datasource-empty"]], [["mat-datasource-error"]], [["mat-datasource-loading"]], "*"];
const _c1 = ["mat-table,table,[mat-datasource-content]", "mat-datasource-empty", "mat-datasource-error", "mat-datasource-loading", "*"];
class DataSourceContainer {
    constructor() {
        this.diameter = 40;
        this.strokeWidth = 5;
    }
    ngAfterContentInit() {
        this._validateSource();
    }
    _validateSource() {
        if (!this.dataSource) {
            throw Error(missingDataSourceInput());
        }
    }
}
DataSourceContainer.ɵfac = function DataSourceContainer_Factory(t) { return new (t || DataSourceContainer)(); };
DataSourceContainer.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataSourceContainer, selectors: [["mat-datasource"]], hostAttrs: [1, "mat-datasource"], inputs: { dataSource: "dataSource", diameter: "diameter", strokeWidth: "strokeWidth" }, ngContentSelectors: _c1, decls: 9, vars: 5, consts: [[1, "mat-datasource-container"], [1, "mat-datasource-output"], [3, "dataSource", "diameter", "strokeWidth"]], template: function DataSourceContainer_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "mat-datasource-overlay", 2);
        i0.ɵɵprojection(4, 1, ["ngProjectAs", "mat-datasource-empty", 5, ["mat-datasource-empty"]]);
        i0.ɵɵprojection(5, 2, ["ngProjectAs", "mat-datasource-error", 5, ["mat-datasource-error"]]);
        i0.ɵɵprojection(6, 3, ["ngProjectAs", "mat-datasource-loading", 5, ["mat-datasource-loading"]]);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div");
        i0.ɵɵprojection(8, 4);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("hidden", ctx.dataSource.isLoading || ctx.dataSource.isEmpty ? "" : null);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("dataSource", ctx.dataSource)("diameter", ctx.diameter)("strokeWidth", ctx.strokeWidth);
        i0.ɵɵadvance(4);
        i0.ɵɵattribute("hidden", ctx.dataSource.isLoading || ctx.dataSource.isEmpty ? "" : null);
    } }, directives: [DataSourceOverlay], styles: [".mat-datasource-container{position:relative}.mat-datasource-container .mat-datasource-output{display:flex;flex-direction:column}.mat-datasource-container .mat-datasource-output:not(:empty){flex:1}\n", ".mat-datasource-empty,.mat-datasource-error,.mat-datasource-loading{display:block;text-align:center}\n", ".mat-datasource-overlay{display:flex;flex-direction:column;min-height:120px;width:100%;align-items:center;place-content:center}.mat-datasource-overlay>*{margin-bottom:15px}.mat-datasource-overlay>*:last-child{margin-bottom:0}.mat-datasource-overlay:empty{margin-bottom:0;min-height:0}\n"], encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataSourceContainer, [{
        type: Component,
        args: [{ selector: 'mat-datasource', host: {
                    class: 'mat-datasource'
                }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-datasource-container\">\r\n  <div class=\"mat-datasource-output\" [attr.hidden]=\"dataSource.isLoading || dataSource.isEmpty ? '' : null\">\r\n    <ng-content select=\"mat-table,table,[mat-datasource-content]\"></ng-content>\r\n  </div>\r\n\r\n  <mat-datasource-overlay [dataSource]=\"dataSource\" [diameter]=\"diameter\" [strokeWidth]=\"strokeWidth\">\r\n    <ng-content select=\"mat-datasource-empty\" ngProjectAs=\"mat-datasource-empty\"></ng-content>\r\n    <ng-content select=\"mat-datasource-error\" ngProjectAs=\"mat-datasource-error\"></ng-content>\r\n    <ng-content select=\"mat-datasource-loading\" ngProjectAs=\"mat-datasource-loading\"></ng-content>\r\n  </mat-datasource-overlay>\r\n</div>\r\n\r\n<div [attr.hidden]=\"dataSource.isLoading || dataSource.isEmpty ? '' : null\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [".mat-datasource-container{position:relative}.mat-datasource-container .mat-datasource-output{display:flex;flex-direction:column}.mat-datasource-container .mat-datasource-output:not(:empty){flex:1}\n", ".mat-datasource-empty,.mat-datasource-error,.mat-datasource-loading{display:block;text-align:center}\n", ".mat-datasource-overlay{display:flex;flex-direction:column;min-height:120px;width:100%;align-items:center;place-content:center}.mat-datasource-overlay>*{margin-bottom:15px}.mat-datasource-overlay>*:last-child{margin-bottom:0}.mat-datasource-overlay:empty{margin-bottom:0;min-height:0}\n"] }]
    }], function () { return []; }, { dataSource: [{
            type: Input
        }], diameter: [{
            type: Input
        }], strokeWidth: [{
            type: Input
        }] }); })();

function invalidPipeArgumentError(type, value) {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${ɵstringify(type)}'`);
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
class DataSourcePipe {
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

class MatDataSourceModule {
}
MatDataSourceModule.ɵfac = function MatDataSourceModule_Factory(t) { return new (t || MatDataSourceModule)(); };
MatDataSourceModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: MatDataSourceModule });
MatDataSourceModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [MatDataSourceIntl], imports: [[CommonModule, MatProgressSpinnerModule], MatProgressSpinnerModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatDataSourceModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, MatProgressSpinnerModule],
                declarations: [
                    DataSourceContainer,
                    DataSourceContent,
                    DataSourceEmpty,
                    DataSourceError,
                    DataSourceLoading,
                    DataSourceOverlay,
                    DataSourcePipe,
                ],
                exports: [
                    MatProgressSpinnerModule,
                    DataSourceContainer,
                    DataSourceContent,
                    DataSourceEmpty,
                    DataSourceError,
                    DataSourceLoading,
                    DataSourcePipe,
                ],
                providers: [MatDataSourceIntl],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatDataSourceModule, { declarations: [DataSourceContainer,
        DataSourceContent,
        DataSourceEmpty,
        DataSourceError,
        DataSourceLoading,
        DataSourceOverlay,
        DataSourcePipe], imports: [CommonModule, MatProgressSpinnerModule], exports: [MatProgressSpinnerModule,
        DataSourceContainer,
        DataSourceContent,
        DataSourceEmpty,
        DataSourceError,
        DataSourceLoading,
        DataSourcePipe] }); })();

/**
 * Premade Mappers
 */
function mapPaginator(pageSize) {
    return pipe(map((page) => ({
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
    })), startWith({
        pageIndex: 0,
        pageSize,
    }));
}
function mapSort() {
    return pipe(map((sort) => ({
        orderBy: sort.active,
        orderDir: sort.direction || undefined,
    })), startWith({}));
}

class ReactiveDataSource extends MatDataSource {
    constructor() {
        super(...arguments);
        this._pageIndex = 0;
        this._pageSize = 10;
    }
    /**
     * Pagination Settings
     */
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(size) {
        this._logger.check(isNaN(Number(size)), nonNumeric('pageIndex'));
        this._logger.print(setValue('PageIndex'), Number(size));
        this._pageIndex = Number(size);
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(size) {
        if (size) {
            this._logger.check(isNaN(Number(size)), nonNumeric('pageSize'));
            this._logger.print(setValue('PageSize'), Number(size));
            this._pageSize = Number(size);
        }
    }
    // be sure the paginator's view has been initialized
    setPaginator(paginator, mapper) {
        this.addStream({
            name: 'MatPaginator',
            stream: paginator.page.pipe(mapper ? mapper(this.pageSize) : mapPaginator(this.pageSize)),
        });
    }
    // sort changes emitted will trigger an update
    setSort(sort, mapper) {
        this.addStream({
            name: 'MatSort',
            stream: sort.sortChange.pipe(mapper ? mapper() : mapSort()),
        });
    }
    /**
     * Attachs an autocompleter with this data source filtered. Note that
     * the stream provided will be accessed during change detection and should not directly change
     * values that are bound in template views.
     * @returns Observable that emits a new value when the data changes.
     */
    attach() {
        return this.connect().pipe(map((res) => this.resFilter(res)));
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { DataSourceContainer, DataSourceContent, DataSourceEmpty, DataSourceError, DataSourceLoading, DataSourceLogger, DataSourcePipe, MatDataSource, MatDataSourceIntl, MatDataSourceModule, ReactiveDataSource, invalidPipeArgumentError, mapPaginator, mapSort };
//# sourceMappingURL=matheo-datasource.mjs.map
