export default class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (event in this.listeners) {
            this.listeners[event].push(listener);
        }
        else {
            this.listeners[event] = [listener];
        }
    }
    emit(event, ...data) {
        if (event in this.listeners) {
            this.listeners[event].forEach(listener => listener(...data));
        }
    }
    cleanListeners() {
        this.listeners = {};
    }
}
//# sourceMappingURL=EventEmitter.js.map