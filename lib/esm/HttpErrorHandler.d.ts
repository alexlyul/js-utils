declare type TErrorHandler = (error: THttpError) => void;
declare type THttpError = Error & {
    response?: any;
    request?: any;
};
declare type errorStatusCodes = 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 426 | 428 | 429 | 431 | 444 | 451 | 499 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 | 599;
export declare class ErrorLogger {
    protected prefix: string;
    errorLogger(message: string, info?: any): void;
}
export default class HttpErrorHandler extends ErrorLogger {
    private readonly error;
    private readonly catchError;
    private onResponse;
    private onFailure;
    private on404;
    private onUnexpected;
    private statusHandlers;
    constructor(error: THttpError, catchError?: boolean);
    /**
     * @description Adds prefix to all error messages
     */
    addMessagePrefix(prefix: string): this;
    /**
     * @description The request was made and server responded with a status code
     */
    addOnResponse(handler: TErrorHandler): this;
    /**
     * @description The request was made but no response received
     */
    addOnFailure(handler: TErrorHandler): this;
    /**
     * @description Handle by response status code
     */
    onStatus(status: errorStatusCodes, handler: TErrorHandler): void;
    /**
     * @description 404 code received
     */
    addOn404(handler: TErrorHandler): this;
    /**
     * @description Something happened in setting up the request that triggered an Error
     */
    addUnexpected(handler: TErrorHandler): this;
    addToRestOfCases(h: TErrorHandler): this;
    private callHandler;
    /**
     * @description Process error
     */
    run(): void;
}
export {};
//# sourceMappingURL=HttpErrorHandler.d.ts.map