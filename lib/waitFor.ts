export default function waitFor(t:number) {
    return new Promise(resolve => setTimeout(resolve, t));
}
