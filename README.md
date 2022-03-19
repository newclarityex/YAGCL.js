# YAGCL.js
Yet Another Game Controller Library is a simple library for managing the Gamepad API in HTML5 using events. Inspired by @Tom32i's gamepad.js library while smoothing out some bumps as well increasing simplicity.

## Getting Started
### Installation
Install with npm using 
```
npm install yagcl.js
```
or add directly in your HTML using the js file under dist.browser:
```
<script src="yagcl.js"></script>
```
### Importing
HTML5:
```
<script>const { GamepadListener } = yagcl;</script>
```

ES6:
```
import { GamepadListener } from 'yagcl.js';
```

Node:
```
const { GamepadListener } = require('yagcl.js');
```

## Usage
First create a listener:
```
const listener = new GamepadListener();
listener.start();
```
Optionally configure the listener using
```
const listener = new GamepadListener({
    deadzone: number;
    precision: number;
    pollInterval: number;
    analog: boolean;
});
```
Then, attach functions to different events
```
listener.on('buttondown', ({ gamepad, index, value }) => {
  console.log(`Button ${index} pressed on gamepad ${gamepad.index}.`);
});
```

## Events
### gamepadconnected
Triggered when a gamepad is connected.
<br>
Returns GamepadEvent object.
### gamepaddisconnected
Triggered when a gamepad is disconnected.
<br>
Returns GamepadEvent object.
### buttondown
Triggered when a button is pressed.
<br>
Returns `{ gamepad: Gamepad, index: number }`
### buttonup
Triggered when a button changes is released.
<br>
Returns `{ gamepad: Gamepad, index: number }`
### button
Triggered on button changing state.
<br>
Returns `{ gamepad: Gamepad, index: number, value: number }`
### axis
Triggered on a change in axis.
<br>
Returns `{ gamepad: Gamepad, index: number, value: number }`
