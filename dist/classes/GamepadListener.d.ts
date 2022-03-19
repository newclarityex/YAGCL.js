import EventEmitter from "./EventEmitter";
interface Options {
    deadzone: number;
    precision: number;
    pollInterval: number;
    analog: boolean;
}
export default class GamepadListener extends EventEmitter {
    options: Options;
    gamepads: Gamepad[];
    listenerInterval: null | number;
    axesTracker: number[][];
    constructor(options?: {});
    onConnected(e: GamepadEvent): void;
    onDisconnected(e: GamepadEvent): void;
    start(): void;
    stop(): void;
    checkGamepads(): void;
    checkButtonUpdates(newGamepad: Gamepad, oldGamepad: Gamepad): void;
    checkAxisUpdates(newGamepad: Gamepad): void;
}
export {};
