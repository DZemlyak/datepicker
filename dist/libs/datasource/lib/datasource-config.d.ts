import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
/**
 * DataSource Config
 */
export interface DataSourceConfig {
    debug?: boolean;
    autoStart: boolean;
    errorHandler?: (err: any) => string;
    showErrors: boolean;
    emptyMsg?: ((args?: any) => string) | string;
    waitMsg?: string;
    delayMsg?: string;
    timeoutMsg?: string;
    waitMs: number;
    intervalMs: number;
    progressMode: ProgressSpinnerMode;
}
export declare const defaultConfig: DataSourceConfig;
//# sourceMappingURL=datasource-config.d.ts.map