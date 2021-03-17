type TErrorHandler = (error: THttpError) => void;
type THttpError = Error & {
    response?: any;
    request?: any;
}

type errorStatusCodes = 301|302|303|304|305|307|308|400|401|402|403|404|405|406|
    407|408|409|410|411|412|413|414|415|416|417|418|421|422|423|424|426|428|429|
    431|444|451|499|500|501|502|503|504|505|506|507|508|510|511|599;



export class ErrorLogger {
    protected prefix = '';

    public errorLogger(message: string, info?: any) {
        const prefix = this.prefix ? `[${this.prefix}] ` : '';
        console.error(prefix + message, info);
        console.error(info);
    }
}



export default class HttpErrorHandler extends ErrorLogger {
    private onResponse: TErrorHandler | null = null;
    private onFailure: TErrorHandler | null = null;
    private on404: TErrorHandler | null = null;
    private onUnexpected: TErrorHandler | null = null;
    private statusHandlers: { [key: number]: TErrorHandler } = {};

    constructor(private readonly error: THttpError, private readonly catchError = false) {
        super();
    }

    /**
     * @description Adds prefix to all error messages
     */
    public addMessagePrefix(prefix: string) {
        this.prefix = prefix;
        return this;
    }

    /**
     * @description The request was made and server responded with a status code
     */
    addOnResponse(handler: TErrorHandler) {
        this.onResponse = handler;
        return this;
    }

    /**
     * @description The request was made but no response received
     */
    addOnFailure(handler: TErrorHandler) {
        this.onFailure = handler;
        return this;
    }

    /**
     * @description Handle by response status code
     */
    onStatus(status: errorStatusCodes, handler: TErrorHandler) {
        this.statusHandlers[status] = handler;
    }

    /**
     * @description 404 code received
     */
    addOn404(handler: TErrorHandler) {
        this.onStatus(404, handler);
        return this;
    }

    /**
     * @description Something happened in setting up the request that triggered an Error
     */
    addUnexpected(handler: TErrorHandler) {
        this.onUnexpected = handler;
        return this;
    }

    addToRestOfCases(h: TErrorHandler) {
        if (!this.onResponse) this.onResponse = h;
        if (!this.onFailure) this.onFailure = h;
        if (!this.on404) this.on404 = h;
        if (!this.onUnexpected) this.onUnexpected = h;
        return this;
    }

    private callHandler(handler: TErrorHandler | null) {
        if (handler) handler(this.error);
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
            this.errorLogger(`Response fetched, but with error code: ${this.error.response.status}.`, {error: this.error});

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
