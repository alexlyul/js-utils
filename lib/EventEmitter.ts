type TListener = (...data:any) => void;

export default class EventEmitter {
    private listeners: { [key: string]: TListener[]} = {};

    public on(event:string, listener:TListener) {
        if (event in this.listeners) {
            this.listeners[event].push(listener);
        } else {
            this.listeners[event] = [listener];
        }
    }

    public emit(event:string, ...data:any) {
        if (event in this.listeners) {
            this.listeners[event].forEach(listener => listener(...data))
        }
    }

    protected cleanListeners() {
        this.listeners = {};
    }
}
