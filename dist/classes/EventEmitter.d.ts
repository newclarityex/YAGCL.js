export default class EventEmitter {
    callbacks: {
        [key: string]: Function[];
    };
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    addEventListener(event: string, callback: (...args: any[]) => void): void;
    removeEventListener(event: string, callback: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): void;
}
