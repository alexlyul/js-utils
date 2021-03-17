interface IOptions {
    delay: number;
    attempts: number;
    errorHandler?: (e: Error, attemptNumber: number) => void;
}
export default function repeatingPromise<T>(promiseGenerator: (attempt?: number) => Promise<T>, { attempts, delay, errorHandler }: IOptions): Promise<T>;
export {};
//# sourceMappingURL=repeatingPromise.d.ts.map