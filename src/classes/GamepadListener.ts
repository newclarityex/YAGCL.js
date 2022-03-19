import EventEmitter from "./EventEmitter";

interface Options {
    deadzone: number;
    precision: number;
    pollInterval: number;
    analog: boolean;
}

const defaultOptions = { deadzone: .30, precision: 0.01, analog: true, pollInterval: 10 }

export default class GamepadListener extends EventEmitter {
    options: Options;
    gamepads: Gamepad[] = [];
    listenerInterval: null | number = null;
    axesTracker: number[][] = [];
    constructor(options: {} = defaultOptions) {
        super();
        this.options = { ...defaultOptions, ...options };
    }
    onConnected(e: GamepadEvent) {
        this.emit("connected", e);
        this.axesTracker.push(e.gamepad.axes.map(() => 0));
    }
    onDisconnected(e: GamepadEvent) {
        this.emit("disconnected", e);
    }
    start() {
        window.addEventListener("gamepadconnected", this.onConnected.bind(this));
        window.addEventListener("gamepaddisconnected", this.onDisconnected.bind(this));
        this.listenerInterval = window.setInterval(this.checkGamepads.bind(this), this.options.pollInterval);
        this.gamepads = navigator.getGamepads();
    }
    stop() {
        window.removeEventListener("gamepadconnected", this.onConnected.bind(this));
        window.removeEventListener("gamepaddisconnected", this.onDisconnected.bind(this));
        clearInterval(this.listenerInterval);
    }
    checkGamepads() {
        let updatedGamepads = navigator.getGamepads();
        for (let i = 0; i < updatedGamepads.length; i++) {
            let newGamepad = updatedGamepads[i];
            let oldGamepad = this.gamepads[i];
            if (newGamepad === null || oldGamepad === null) continue;
            this.checkButtonUpdates(newGamepad, oldGamepad);
            this.checkAxisUpdates(newGamepad);
        }
        this.gamepads = updatedGamepads;
    }
    checkButtonUpdates(newGamepad: Gamepad, oldGamepad: Gamepad) {
        for (let j = 0; j < newGamepad.buttons.length; j++) {
            let button = newGamepad.buttons[j];
            if (button.pressed && !oldGamepad.buttons[j].pressed) {
                this.emit("buttondown", {
                    gamepad: newGamepad,
                    index: j
                });
            } else if (!button.pressed && oldGamepad.buttons[j].pressed) {
                this.emit("buttonup", {
                    gamepad: newGamepad,
                    index: j
                });
            }
        }
    }
    checkAxisUpdates(newGamepad: Gamepad) {
        for (let j = 0; j < newGamepad.axes.length; j++) {
            let axis = newGamepad.axes[j];
            if (Math.abs(axis) <= this.options.deadzone) continue;
            let axisValue = axis;

            if (!this.options.analog) {
                axisValue = axis > 0 ? 1 : axis < 0 ? -1 : 0;
            }
            if (this.axesTracker[newGamepad.index] === null || Math.abs(axisValue - this.axesTracker[newGamepad.index][j]) >= this.options.precision) {
                this.axesTracker[newGamepad.index][j] = axisValue;
                this.emit("axis", {
                    gamepad: newGamepad,
                    index: j,
                    value: axisValue
                });
            } else {
                this.axesTracker[newGamepad.index][j] = axisValue;
            }
        }
    }