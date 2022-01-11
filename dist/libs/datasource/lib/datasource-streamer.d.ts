import { DataSourceLogger } from './datasource-logger';
import { DataSourceStream } from './types';
export declare class DataSourceStreamer<T> {
    private logger;
    streams: Array<DataSourceStream<T>>;
    get length(): number;
    constructor(logger: DataSourceLogger);
    add(src: DataSourceStream<T>): string;
    remove(name: string): void;
    connect(): import("rxjs").Observable<Partial<T>>;
    private logEmittedValue;
    private reducePartials;
}
//# sourceMappingURL=datasource-streamer.d.ts.map