import EventEmitter from './EventEmitter';
class Task {
    constructor(data, date = new Date()) {
        this.data = data;
        this.date = date;
    }
}
export default class Queue extends EventEmitter {
    constructor(timeout = 0) {
        super();
        this.timeout = timeout;
        this.list = [];
        this.interval = null;
    }
    enqueue(...items) {
        const date = new Date();
        for (const item of items) {
            this.list.push(new Task(item, date));
            this.emit("enqueue" /* enqueue */, this.list[this.list.length - 1]);
        }
        if (!this.interval) {
            this.start();
        }
    }
    dequeue() {
        if (!this.list.length) {
            this.stop();
            return;
        }
        this.emit("dequeue" /* dequeue */, this.list.shift());
    }
    addWorker(worker) {
        this.on("dequeue" /* dequeue */, worker);
    }
    start() {
        if (this.interval)
            this.stop();
        this.interval = window.setInterval(() => this.dequeue(), this.timeout);
    }
    stop() {
        window.clearInterval(this.interval ? this.interval : undefined);
        this.interval = null;
    }
    *[Symbol.iterator]() {
        for (const item of this.list) {
            yield item;
        }
    }
    some(predicate) {
        return this.list.some(predicate);
    }
}
//# sourceMappingURL=Queue.js.map