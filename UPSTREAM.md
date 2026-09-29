# Upstream and issue review

Base: [tapjs/signal-exit](https://github.com/tapjs/signal-exit), npm `signal-exit@4.1.0`, commit `458776d9cf8be89712aa1f7b45bb2163ce15ef4a`. Full Git history and upstream attribution are retained. Last npm publication: 2023-07-29T05:44:56.721Z. Release inactivity does not by itself prove abandonment.

Review: 2026-09-29T00:22:12.546517+00:00. Source coverage: Most recently updated 100 open and 30 closed issue/PR entries; PRs removed. This is triage evidence, not a claim of exhaustive review.

Confirmed #85: removing a listener from inside that callback mutated the active iteration and skipped the next listener. Iterate a snapshot and verify the exact A/B/alwaysLast sequence in a subprocess. Address #82 by normalizing a numeric string exitCode before delivering the documented numeric callback, with a subprocess regression. #80 asks for repeated captured signals, whereas 4.1.0 explicitly documents one-shot unloading; retain that contract. #78 involves simultaneous older-major copies; retain the upstream v3 coexistence workaround without claiming every host combination. #81 is optional tracing, not a confirmed defect. #84/#87 are unrelated content. Closed async-handler reports (#46/#70) are documented synchronous-exit limitations. Other closed engine/platform/debugger reports remain historical; real POSIX signal/exit subprocesses and Node14 compatibility are tested. Base license remains ISC; later upstream license changes are not imported.

## Reviewed issue entries

- [tapjs/signal-exit#87](https://github.com/tapjs/signal-exit/issues/87) (open): Scalping Robot
- [tapjs/signal-exit#85](https://github.com/tapjs/signal-exit/issues/85) (open): Cannot cleanup exit handler inside the handler itself
- [tapjs/signal-exit#84](https://github.com/tapjs/signal-exit/issues/84) (open): // Hybrid module, either works import { onExit } from 'signal-exit' // or: // const { onExit } = require('signal-exit')  onExit((code, signal) => {   console.lo
- [tapjs/signal-exit#82](https://github.com/tapjs/signal-exit/issues/82) (open): exitCode type does not match the one of nodejs 20 ?
- [tapjs/signal-exit#81](https://github.com/tapjs/signal-exit/issues/81) (open): Trace package lifecycle
- [tapjs/signal-exit#80](https://github.com/tapjs/signal-exit/issues/80) (open): Capture signal exits more than once
- [tapjs/signal-exit#78](https://github.com/tapjs/signal-exit/issues/78) (open): How to make v4 work if a v3 is loaded (not used) as a transitive dependency?
- [tapjs/signal-exit#76](https://github.com/tapjs/signal-exit/issues/76) (closed): kExitEmitter Symbol conflict
- [tapjs/signal-exit#68](https://github.com/tapjs/signal-exit/issues/68) (closed): `v3.0.4` and `v3.0.5` have a breaking change
- [tapjs/signal-exit#28](https://github.com/tapjs/signal-exit/issues/28) (closed): Tracking issue: detect if SIGPROF should or shouldn't be handled
- [tapjs/signal-exit#47](https://github.com/tapjs/signal-exit/issues/47) (closed): Node v8.x prebuild logs on SIGPROF listener
- [tapjs/signal-exit#49](https://github.com/tapjs/signal-exit/issues/49) (closed): using signal-exit in Electron causes Ctrl+C in terminal to stop working
- [tapjs/signal-exit#70](https://github.com/tapjs/signal-exit/issues/70) (closed): async onExit handler
- [tapjs/signal-exit#71](https://github.com/tapjs/signal-exit/issues/71) (closed): Cannot kill debug client after `onExit()` executed
- [tapjs/signal-exit#46](https://github.com/tapjs/signal-exit/issues/46) (closed): async onExit handler
- [tapjs/signal-exit#66](https://github.com/tapjs/signal-exit/issues/66) (closed): v3.0.4 has a breaking change
- [tapjs/signal-exit#54](https://github.com/tapjs/signal-exit/issues/54) (closed): `kill ENOSYS` error coming from this module on Windows
