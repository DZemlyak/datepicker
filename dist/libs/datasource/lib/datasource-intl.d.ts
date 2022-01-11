import * as i0 from "@angular/core";
/** DataSource messages that requires internationalization. */
export declare class MatDataSourceIntl<REQ = any> {
    /** A message to show when there's no resulting data. */
    emptyMsg: ((args?: REQ) => string) | string;
    /** A waiting message to show while loading the data. */
    waitMsg: string;
    /** A waiting message when the data is taking too long. */
    delayMsg: string;
    /** A timeout message if there's no response. */
    timeoutMsg: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDataSourceIntl<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatDataSourceIntl<any>>;
}
//# sourceMappingURL=datasource-intl.d.ts.map