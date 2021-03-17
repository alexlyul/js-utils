declare type TListener = (...data: any) => void;
export default class EventEmitter {
    private listeners;
    on(event: string, listener: TListener): void;
    emit(event: string, ...data: any): void;
    protected cleanListeners(): void;
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map