export default function copyToClipboard(text, callback) {
    setTimeout(() => {
        const el = document.createElement('textarea');
        el.value = String(text);
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected = document.getSelection()?.rangeCount || 0 > 0 ? document.getSelection()?.getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            // @ts-ignore
            document.getSelection().removeAllRanges();
            // @ts-ignore
            document.getSelection().addRange(selected);
        }
        if (callback)
            callback();
    }, 0);
}
//# sourceMappingURL=toClipboard.js.map