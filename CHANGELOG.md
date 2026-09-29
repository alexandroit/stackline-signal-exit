# Stackline changes

## 1.0.0 — 2026-09-28

Independent maintenance fork of signal-exit 4.1.0. Preserve published API, module exports and runtime engine compatibility. Confirmed #85: removing a listener from inside that callback mutated the active iteration and skipped the next listener. Iterate a snapshot and verify the exact A/B/alwaysLast sequence in a subprocess. Address #82 by normalizing a numeric string exitCode before delivering the documented numeric callback, with a subprocess regression. #80 asks for repeated captured signals, whereas 4.1.0 explicitly documents one-shot unloading; retain that contract. #78 involves simultaneous older-major copies; retain the upstream v3 coexistence workaround without claiming every host combination. #81 is optional tracing, not a confirmed defect. #84/#87 are unrelated content. Closed async-handler reports (#46/#70) are documented synchronous-exit limitations. Other closed engine/platform/debugger reports remain historical; real POSIX signal/exit subprocesses and Node14 compatibility are tested. Base license remains ISC; later upstream license changes are not imported.

Pinned development tools, real API and packed-consumer checks, GitHub CI/CodeQL gates, exact-artifact npm provenance and immutable release evidence are added. See UPSTREAM.md for limits of issue triage.

# Changelog

## 4.1

- Add the ability to capture signal exits by returning `true`
  from the `onExit` listener.

## 4.0

- Rewritten in TypeScript
- Default export replaced with named exports
- More securely hardened against multiple load and global process
  object mutation
- Removed `SIGUNUSED` from the list of Linux signals, as it no
  longer exists.
- `SIGABRT`, `SIGALRM` removed from list of Windows signals, as
  the are not supported.

## 3.0.3 (2020-03-26)

- patch SIGHUP to SIGINT when on Windows (cfd1046)
- ci: use Travis for Windows builds (007add7)

## 3.0.1 (2016-09-08)

- do not listen on SIGBUS, SIGFPE, SIGSEGV and SIGILL (#40) (5b105fb)

## 3.0.0 (2016-06-13)

- get our test suite running on Windows (#23) (6f3eda8)
- hooking SIGPROF was interfering with profilers see #21 (#24) (1248a4c)
- signal-exit no longer wires into SIGPROF
