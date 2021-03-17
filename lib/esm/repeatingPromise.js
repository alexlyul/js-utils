import waitFor from './waitFor';
export default async function repeatingPromise(promiseGenerator, { attempts, delay, errorHandler }) {
    let attempt = 0;
    while (attempt < attempts) {
        try {
            return await promiseGenerator(attempt);
        }
        catch (err) {
            if (errorHandler)
                errorHandler(err, attempt);
            attempt++;
            if (delay > 0)
                await waitFor(delay);
        }
    }
    throw new Error('No attempts left.');
}
//# sourceMappingURL=repeatingPromise.js.map