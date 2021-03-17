import EventEmitter from './EventEmitter';
declare class Task<T> {
    data: T;
    date: Date;
    constructor(data: T, date?: Date);
}
export default class Queue<T> extends EventEmitter {
    private readonly timeout;
    private readonly list;
    private interval;
    constructor(timeout?: number);
    enqueue(...items: any): void;
    dequeue(): any;
    addWorker(worker: (task: Task<T>) => void): void;
    start(): void;
    stop(): void;
    [Symbol.iterator](): Generator<Task<T>, void, unknown>;
    some(predicate: (task: Task<T>) => boolean): boolean;
}
export {};
//# sourceMappingURL=Queue.d.ts.map