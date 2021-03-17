function isIE8(): boolean {
    // @ts-ignore
    return 'attachEvent' in window.document && typeof window.document.attachEvent === 'function';
}


export default new Promise(resolve => {
    if (document.readyState !== 'loading') {
        resolve();
    } else if (!isIE8()) {
        document.addEventListener('DOMContentLoaded', () => {
            resolve(true);
        });
    } else {
        // @ts-ignore
        window.document.attachEvent('onreadystatechange', () => {
            if (window.document.readyState === 'complete') {
                resolve(true);
            }
        });
    }
});
