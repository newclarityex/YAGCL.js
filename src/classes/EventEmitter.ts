export default class EventEmitter {
    callbacks: { [key: string]: Function[] } = {};
    on(event: string, callback: (...args: any[]) => void) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }
    off(event: string, callback: (...args: any[]) => void) {
        if (!this.callbacks[event]) {
            return;
        }
        this.callbacks[event] = this.callbacks[event].filter(c => c !== callback);
    }
    addEventListener(event: string, callback: (...args: any[]) => void) {
        this.on(event, callback);
    }
    removeEventListener(event: string, callback: (...args: any[]) => void) {
        this.off(event, callback);
    }
    emit(event: string, ...args: any[]) {
        if (!this.callbacks[event]) {
            return;
        }
        this.callbacks[event].forEach(c => c(...args));
    }
}