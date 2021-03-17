export default function arrayChunk(array, chunkSize) {
    const R = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        R.push(array.slice(i, i + chunkSize));
    }
    return R;
}
//# sourceMappingURL=arrayChunks.js.map