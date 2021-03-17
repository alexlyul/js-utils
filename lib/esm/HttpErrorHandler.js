export class ErrorLogger {
    constructor() {
        this.prefix = '';
    }
    errorLogger(message, info) {
        const prefix = this.prefix ? `[${this.prefix}] ` : '';
        console.error(prefix + message, info);
        console.error(info);
    }
}
export default class HttpErrorHandler extends ErrorLogger {
    constructor(error, catchError = false) {
        super();
        this.error = error;
        this.catchError = catchError;
        this.onResponse = null;
        this.onFailure = null;
        this.on404 = null;
        this.onUnexpected = null;
        this.statusHandlers = {};
    }
    /**
     * @description Adds prefix to all error messages
     */
    addMessagePrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    /**
     * @description The request was made and server responded with a status code
     */
    addOnResponse(handler) {
        this.onResponse = handler;
        return this;
    }
    /**
     * @description The request was made but no response received
     */
    addOnFailure(handler) {
        this.onFailure = handler;
        return this;
    }
    /**
     * @description Handle by response status code
     */
    onStatus(status, handler) {
        this.statusHandlers[status] = handler;
    }
    /**
     * @description 404 code received
     */
    addOn404(handler) {
        this.onStatus(404, handler);
        return this;
    }
    /**
     * @description Something happened in setting up the request that triggered an Error
     */
    addUnexpected(handler) {
        this.onUnexpected = handler;
        return this;
    }
    addToRestOfCases(h) {
        if (!this.onResponse)
            this.onResponse = h;
        if (!this.onFailure)
            this.onFailure = h;
        if (!this.on404)
            this.on404 = h;
        if (!this.onUnexpected)
            this.onUnexpected = h;
        return this;
    }
    callHandler(handler) {
        if (handler)
            handler(this.error);
    }
    /**
     * @description Process error
     */
    run() {
        if (this.error.response) {
            const status = Number(this.error.response.status);
            if (status && this.statusHandlers[status]) {
                this.callHandler(this.statusHandlers[status]);
                return;
            }
            this.callHandler(this.onResponse);
            this.errorLogger(`Response fetched, but with error code: ${this.error.response.status}.`, { error: this.error });
            if (!this.catchError) {
                throw this.error;
            }
            return;
        }
        if (this.error.request) {
            this.callHandler(this.onFailure);
            this.errorLogger('Response not loaded. Request is:', this.error.request);
            if (!this.catchError) {
                throw this.error;
            }
            return;
        }
        this.callHandler(this.onUnexpected);
        this.errorLogger('Request configuration error: ', this.error.message);
        throw this.error;
    }
}
//# sourceMappingURL=HttpErrorHandler.js.map