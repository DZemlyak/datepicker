/**
 * Logging Handler
 */
export class DataSourceLogger {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNvdXJjZS1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL2RhdGFzb3VyY2Uvc3JjL2xpYi9kYXRhc291cmNlLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTs7R0FFRztBQUNILE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFBb0IsVUFBa0IsRUFBVSxLQUF5QjtRQUFyRCxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFWekU7O1dBRUc7UUFDSyxZQUFPLEdBQW9DLEVBQUUsQ0FBQztJQU9zQixDQUFDO0lBTDdFLElBQUksTUFBTSxDQUFDLE1BQXdCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFLRDs7T0FFRztJQUVILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFpQixFQUFFLEtBQW1DO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDOUUsQ0FBQztJQUVELFdBQVcsQ0FBQyxTQUFpQixFQUFFLEtBQVU7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFpQjtRQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUs7UUFDckIsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDekUsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsT0FBZTtRQUM3QixRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JELEtBQUssQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3ZEO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBRUgsMENBQTBDO0lBQzFDLEtBQUssQ0FBQyxNQUFXLEVBQUUsS0FBVyxFQUFFLFlBQWlCLElBQUk7UUFDbkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLFNBQVMsRUFBRTtnQkFDYixNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDL0M7aUJBQU0sSUFBSSxLQUFLLEVBQUU7Z0JBQ2hCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUM5QztTQUNGO0lBQ0gsQ0FBQztJQUVELDBDQUEwQztJQUMxQyxLQUFLLENBQUMsT0FBZSxFQUFFLEdBQVE7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsS0FBSyxDQUFDLFNBQWMsRUFBRSxPQUFlO1FBQ25DLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2VDb25maWcgfSBmcm9tICcuL2RhdGFzb3VyY2UtY29uZmlnJztcclxuaW1wb3J0IHsgTWF0RGF0YVNvdXJjZUludGwgfSBmcm9tICcuL2RhdGFzb3VyY2UtaW50bCc7XHJcblxyXG4vKipcclxuICogTG9nZ2luZyBIYW5kbGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZUxvZ2dlciB7XHJcbiAgLyoqXHJcbiAgICogRXJyb3JzIENvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9lcnJvcnM6IHsgW2Vycm9yQ29kZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuXHJcbiAgc2V0IGNvbmZpZyhjb25maWc6IERhdGFTb3VyY2VDb25maWcpIHtcclxuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29uZmlnOiBEYXRhU291cmNlQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZU5hbWU6IHN0cmluZywgcHJpdmF0ZSBfaW50bD86IE1hdERhdGFTb3VyY2VJbnRsKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBFcnJvciBNYW5hZ2VtZW50IE1ldGhvZHNcclxuICAgKi9cclxuXHJcbiAgZ2V0RXJyb3JzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Vycm9ycztcclxuICB9XHJcblxyXG4gIGFkZEVycm9yKGVycm9yQ29kZTogc3RyaW5nLCBlcnJvcjogc3RyaW5nIHwgeyBtZXNzYWdlOiBzdHJpbmcgfSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZXJyb3JzW2Vycm9yQ29kZV0gPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBlcnJvci5tZXNzYWdlO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIGVycm9yOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NvbmZpZy5lcnJvckhhbmRsZXJcclxuICAgICAgPyB0aGlzLmFkZEVycm9yKGVycm9yQ29kZSwgdGhpcy5fY29uZmlnLmVycm9ySGFuZGxlcihlcnJvcikpXHJcbiAgICAgIDogdGhpcy5hZGRFcnJvcihlcnJvckNvZGUsIGVycm9yKTtcclxuICB9XHJcblxyXG4gIGhhc0Vycm9yKGVycm9yQ29kZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzLmhhc093blByb3BlcnR5KGVycm9yQ29kZSk7XHJcbiAgfVxyXG5cclxuICBoYXNFcnJvcnMoZm9yY2UgPSBmYWxzZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgKHRoaXMuX2NvbmZpZy5zaG93RXJyb3JzIHx8IGZvcmNlKSAmJiAhIU9iamVjdC5rZXlzKHRoaXMuX2Vycm9ycykubGVuZ3RoXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZW91dEVycm9yKGF0dGVtcHQ6IG51bWJlcikge1xyXG4gICAgc3dpdGNoIChhdHRlbXB0KSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50bD8ud2FpdE1zZyB8fCB0aGlzLl9jb25maWcud2FpdE1zZztcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRsPy5kZWxheU1zZyB8fCB0aGlzLl9jb25maWcuZGVsYXlNc2c7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuX2ludGw/LnRpbWVvdXRNc2cgfHwgdGhpcy5fY29uZmlnLnRpbWVvdXRNc2cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXJFcnJvcnMoKSB7XHJcbiAgICB0aGlzLl9lcnJvcnMgPSB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYnVnIFV0aWxzXHJcbiAgICovXHJcblxyXG4gIC8vIGRpc3BsYXkgYSBtZXNzYWdlIGFjY29yZGluZyBhIGNvbmRpdGlvblxyXG4gIGRlYnVnKHRydXRoeTogYW55LCBmYWxzeT86IGFueSwgY29uZGl0aW9uOiBhbnkgPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmRlYnVnKSB7XHJcbiAgICAgIGlmIChjb25kaXRpb24pIHtcclxuICAgICAgICB0cnV0aHkgPSBBcnJheS5pc0FycmF5KHRydXRoeSkgPyB0cnV0aHkgOiBbdHJ1dGh5XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLnNvdXJjZU5hbWV9OmAsIC4uLnRydXRoeSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmFsc3kpIHtcclxuICAgICAgICBmYWxzeSA9IEFycmF5LmlzQXJyYXkoZmFsc3kpID8gZmFsc3kgOiBbZmFsc3ldO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuc291cmNlTmFtZX06YCwgLi4uZmFsc3kpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBsb2dzIGFuIG9iamVjdCBpZiBkZWJ1ZyBtb2RlIGlzIGVuYWJsZWRcclxuICBwcmludChtZXNzYWdlOiBzdHJpbmcsIG9iajogYW55KSB7XHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmRlYnVnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuc291cmNlTmFtZX06YCwgbWVzc2FnZSwgb2JqKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25kaXRpb24gaXMgdHJ1dGh5XHJcbiAgY2hlY2soY29uZGl0aW9uOiBhbnksIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5zb3VyY2VOYW1lfTogJHttZXNzYWdlfWApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=