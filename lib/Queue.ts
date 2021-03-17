import EventEmitter from './EventEmitter';

class Task<T> {
    constructor(public data: T, public date: Date = new Date()) {
    }
}

const enum QueueEvents {
    enqueue = 'enqueue',
    dequeue = 'dequeue',
}

export default class Queue<T> extends EventEmitter {
    private readonly list:Task<T>[] = [];
    private interval:number|null = null;

    constructor(private readonly timeout:number = 0) {
        super();
    }

    enqueue(...items:any) {
        const date = new Date();
        for (const item of items) {
            this.list.push(new Task(item, date));
            this.emit(QueueEvents.enqueue, this.list[this.list.length - 1]);
        }
        if (!this.interval) {
            this.start();
        }
    }

    dequeue():any {
        if(!this.list.length) {
            this.stop();
            return;
        }

        this.emit(QueueEvents.dequeue, this.list.shift());
    }

    addWorker(worker:(task:Task<T>) => void):void {
        this.on(QueueEvents.dequeue, worker);
    }

    start():void {
        if (this.interval) this.stop();
        this.interval = window.setInterval(() => this.dequeue(), this.timeout);
    }

    stop():void {
        window.clearInterval(this.interval ? this.interval : undefined);
        this.interval = null;
    }

    * [Symbol.iterator]() {
        for (const item of this.list) {
            yield item;
        }
    }

    some(predicate:(task:Task<T>) => boolean) {
        return this.list.some(predicate);
    }
}
