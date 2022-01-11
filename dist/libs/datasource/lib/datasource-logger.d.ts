import { DataSourceConfig } from './datasource-config';
import { MatDataSourceIntl } from './datasource-intl';
/**
 * Logging Handler
 */
export declare class DataSourceLogger {
    private sourceName;
    private _intl?;
    /**
     * Errors Collection
     */
    private _errors;
    set config(config: DataSourceConfig);
    private _config;
    constructor(sourceName: string, _intl?: MatDataSourceIntl);
    /**
     * Error Management Methods
     */
    getErrors(): {
        [errorCode: string]: string;
    };
    addError(errorCode: string, error: string | {
        message: string;
    }): void;
    handleError(errorCode: string, error: any): void;
    hasError(errorCode: string): boolean;
    hasErrors(force?: boolean): boolean;
    getTimeoutError(attempt: number): string;
    clearErrors(): void;
    /**
     * Debug Utils
     */
    debug(truthy: any, falsy?: any, condition?: any): void;
    print(message: string, obj: any): void;
    check(condition: any, message: string): void;
}
//# sourceMappingURL=datasource-logger.d.ts.map