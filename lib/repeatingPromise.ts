import waitFor from './waitFor';


interface IOptions {
    delay: number,
    attempts: number,
    errorHandler?: (e:Error, attemptNumber:number) => void,
}


export default async function repeatingPromise<T>(
    promiseGenerator:(attempt?:number) => Promise<T>,
    { attempts, delay, errorHandler }: IOptions,
) {
    let attempt = 0;
    while (attempt < attempts) {
        try {
            return await promiseGenerator(attempt);
        } catch (err) {
            if (errorHandler) errorHandler(err, attempt);
            attempt++;
            if (delay > 0) await waitFor(delay)
        }
    }

    throw new Error('No attempts left.');
}
