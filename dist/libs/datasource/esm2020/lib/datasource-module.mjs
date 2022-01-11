import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataSourceContainer } from './container';
import { MatDataSourceIntl } from './datasource-intl';
import { DataSourcePipe } from './datasource-pipe';
import { DataSourceContent, DataSourceEmpty, DataSourceError, DataSourceLoading, } from './directives';
import { DataSourceOverlay } from './overlay';
import * as i0 from "@angular/core";
export class MatDataSourceModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGFzb3VyY2Uvc3JjL2xpYi9kYXRhc291cmNlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGVBQWUsRUFDZixpQkFBaUIsR0FDbEIsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDOztBQXdCOUMsTUFBTSxPQUFPLG1CQUFtQjs7c0ZBQW5CLG1CQUFtQjtxRUFBbkIsbUJBQW1COzBFQUZuQixDQUFDLGlCQUFpQixDQUFDLFlBbkJyQixDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxFQVcvQyx3QkFBd0I7dUZBVWYsbUJBQW1CO2NBdEIvQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixDQUFDO2dCQUNqRCxZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsY0FBYztpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asd0JBQXdCO29CQUN4QixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsY0FBYztpQkFDZjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUMvQjs7d0ZBQ1ksbUJBQW1CLG1CQW5CNUIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsY0FBYyxhQVJOLFlBQVksRUFBRSx3QkFBd0IsYUFXOUMsd0JBQXdCO1FBQ3hCLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZUNvbnRhaW5lciB9IGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IHsgTWF0RGF0YVNvdXJjZUludGwgfSBmcm9tICcuL2RhdGFzb3VyY2UtaW50bCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VQaXBlIH0gZnJvbSAnLi9kYXRhc291cmNlLXBpcGUnO1xyXG5pbXBvcnQge1xyXG4gIERhdGFTb3VyY2VDb250ZW50LFxyXG4gIERhdGFTb3VyY2VFbXB0eSxcclxuICBEYXRhU291cmNlRXJyb3IsXHJcbiAgRGF0YVNvdXJjZUxvYWRpbmcsXHJcbn0gZnJvbSAnLi9kaXJlY3RpdmVzJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZU92ZXJsYXkgfSBmcm9tICcuL292ZXJsYXknO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YVNvdXJjZUNvbnRhaW5lcixcclxuICAgIERhdGFTb3VyY2VDb250ZW50LFxyXG4gICAgRGF0YVNvdXJjZUVtcHR5LFxyXG4gICAgRGF0YVNvdXJjZUVycm9yLFxyXG4gICAgRGF0YVNvdXJjZUxvYWRpbmcsXHJcbiAgICBEYXRhU291cmNlT3ZlcmxheSxcclxuICAgIERhdGFTb3VyY2VQaXBlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxyXG4gICAgRGF0YVNvdXJjZUNvbnRhaW5lcixcclxuICAgIERhdGFTb3VyY2VDb250ZW50LFxyXG4gICAgRGF0YVNvdXJjZUVtcHR5LFxyXG4gICAgRGF0YVNvdXJjZUVycm9yLFxyXG4gICAgRGF0YVNvdXJjZUxvYWRpbmcsXHJcbiAgICBEYXRhU291cmNlUGlwZSxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW01hdERhdGFTb3VyY2VJbnRsXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGFTb3VyY2VNb2R1bGUge31cclxuIl19