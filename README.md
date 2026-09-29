# @stackline/signal-exit

> when you want to fire an event no matter how a process exits.

[![npm version](https://img.shields.io/npm/v/@stackline/signal-exit.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/signal-exit)
[![license](https://img.shields.io/npm/l/@stackline/signal-exit.svg?style=flat-square)](https://github.com/alexandroit/stackline-signal-exit)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-signal-exit-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-signal-exit)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/signal-exit/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/signal-exit/)** | **[npm](https://www.npmjs.com/package/@stackline/signal-exit)** | **[Issues](https://github.com/alexandroit/stackline-signal-exit/issues)** | **[Repository](https://github.com/alexandroit/stackline-signal-exit)**

**Current package version:** `1.0.1`

---

## Why this package?

`@stackline/signal-exit` is the Stackline-maintained distribution of `signal-exit@4.1.0`. It is an independent continuation of [signal-exit](https://github.com/tapjs/signal-exit); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/signal-exit@1.0.1` |
| API target | `signal-exit@4.1.0` |
| Supported Node.js | `>=14` |
| License | `ISC` |
| Main entry | `./dist/cjs/index.js` |
| Module entry | `./dist/mjs/index.js` |
| Types | `./dist/mjs/index.d.ts` |
| Runtime dependencies | `none` |

## Installation

```bash
npm install @stackline/signal-exit
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install signal-exit@npm:@stackline/signal-exit
```

## Usage and API reference

### signal-exit

When you want to fire an event no matter how a process exits:

- reaching the end of execution.
- explicitly having `process.exit(code)` called.
- having `process.kill(pid, sig)` called.
- receiving a fatal signal from outside the process

Use `signal-exit`.

```js
// Hybrid module, either works
import { onExit } from '@stackline/signal-exit'
// or:
// const { onExit } = require('@stackline/signal-exit')

onExit((code, signal) => {
  console.log('process exited!', code, signal)
})
```

## API

`remove = onExit((code, signal) => {}, options)`

The return value of the function is a function that will remove
the handler.

Note that the function _only_ fires for signals if the signal
would cause the process to exit. That is, there are no other
listeners, and it is a fatal signal.

If the global `process` object is not suitable for this purpose
(ie, it's unset, or doesn't have an `emit` method, etc.) then the
`onExit` function is a no-op that returns a no-op `remove` method.

### Options

- `alwaysLast`: Run this handler after any other signal or exit
  handlers. This causes `process.emit` to be monkeypatched.

### Capturing Signal Exits

If the handler returns an exact boolean `true`, and the exit is a
due to signal, then the signal will be considered handled, and
will _not_ trigger a synthetic `process.kill(process.pid,
signal)` after firing the `onExit` handlers.

In this case, it your responsibility as the caller to exit with a
signal (for example, by calling `process.kill()`) if you wish to
preserve the same exit status that would otherwise have occurred.
If you do not, then the process will likely exit gracefully with
status 0 at some point, assuming that no other terminating signal
or other exit trigger occurs.

Prior to calling handlers, the `onExit` machinery is unloaded, so
any subsequent exits or signals will not be handled, even if the
signal is captured and the exit is thus prevented.

Note that numeric code exits may indicate that the process is
already committed to exiting, for example due to a fatal
exception or unhandled promise rejection, and so there is no way to
prevent it safely.

### Browser Fallback

The `'signal-exit/browser'` module is the same fallback shim that
just doesn't do anything, but presents the same function
interface.

Patches welcome to add something that hooks onto
`window.onbeforeunload` or similar, but it might just not be a
thing that makes sense there.

## Credits and original authors

- Original project: [signal-exit](https://github.com/tapjs/signal-exit).
- Ben Coe.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## License

`ISC`. See the license and notice files in the [repository](https://github.com/alexandroit/stackline-signal-exit).

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
