import { execFile } from 'child_process'
import t from 'tap'
const isWindows = process.platform === 'win32'
const node = process.execPath

import { isExecErr } from './fixtures/exec-err'

t.test('receives an exit event when a process exits normally', t => {
  execFile(node, ['./test/fixtures/end-of-execution.js'],
    function (err, stdout) {
      t.equal(err, null)
      t.match(stdout.toString(), /reached end of execution, 0, null/)
      t.end()
    }
  )
})

t.test('receives an exit event when process.exit() is called', t => {
  execFile(node, ['./test/fixtures/exit.js'], function (err, stdout) {
    if (!isWindows) {
      if (!isExecErr(err)) throw new Error('did not get expected error')
      t.equal(err.code, 32)
    }
    t.match(stdout.toString(), /exited with process\.exit\(\), 32, null/)
    t.end()
  })
})

t.test(
  'ensures that if alwaysLast=true, the handler is run last (signal)',
  { skip: process.platform === 'win32' },
  t => {
    execFile(node, ['./test/fixtures/signal-last.js'],
      function (err, stdout) {
        if (!isExecErr(err))
          throw new Error('did not receive expected error')
        t.match(stdout.toString(), /first counter=1/)
        t.match(stdout.toString(), /last counter=2/)
        t.end()
      }
    )
  }
)

t.test(
  'ensures that if alwaysLast=true, the handler is run last (normal exit)',
  t => {
    execFile(node, ['./test/fixtures/exit-last.js'],
      function (err, stdout) {
        if (err) throw err
        t.match(stdout.toString(), /first counter=1/)
        t.match(stdout.toString(), /last counter=2/)
        t.end()
      }
    )
  }
)

t.test(
  'works when loaded multiple times',
  { skip: process.platform === 'win32' },
  t => {
    execFile(node, ['./test/fixtures/multiple-load.js'],
      function (err, stdout) {
        if (!isExecErr(err))
          throw new Error('did not receive expected error')
        t.equal(err.signal, 'SIGTERM')
        t.match(stdout.toString(), /first counter=1/)
        t.match(stdout.toString(), /first counter=2/)
        t.match(stdout.toString(), /last counter=3/)
        t.match(stdout.toString(), /last counter=4/)
        t.end()
      }
    )
  }
)

t.test('removes handlers when fully unwrapped', t => {
  execFile(node, ['./test/fixtures/unwrap.js'], function (err) {
    if (!isExecErr(err)) throw new Error('did not receive expected error')
    if (!isWindows) {
      t.equal(err.signal, 'SIGTERM')
      t.equal(err.code, null)
    }
    t.end()
  })
})

t.test('does not load() or unload() more than once', t => {
  execFile(node, ['./test/fixtures/load-unload.js'], function (err) {
    if (err) throw err
    t.end()
  })
})

if (!isWindows) {
  t.test(
    'receives an exit event when a process is terminated with sigint',
    t => {
      execFile(node, ['./test/fixtures/sigint.js'],
        function (err, stdout) {
          if (!isExecErr(err))
            throw new Error('did not get expected error')
          t.match(stdout.toString(), /exited with sigint, null, SIGINT/)
          t.end()
        }
      )
    }
  )

  t.test(
    'receives an exit event when a process is terminated with sigterm',
    t => {
      execFile(node, ['./test/fixtures/sigterm.js'],
        function (err, stdout) {
          if (!isExecErr(err))
            throw new Error('did not get expected error')
          t.match(stdout.toString(), /exited with sigterm, null, SIGTERM/)
          t.end()
        }
      )
    }
  )

  t.test('does not exit on sigpipe', t => {
    execFile(node, ['./test/fixtures/sigpipe.js'],
      function (err, stdout, stderr) {
        if (err) throw err
        t.match(stdout.toString(), /hello/)
        t.match(stderr.toString(), /onExit\(0,null\)/)
        t.end()
      }
    )
  })

  t.test('handles uncatchable signals with grace and poise', t => {
    execFile(node, ['./test/fixtures/sigkill.js'], function (err) {
      if (err) throw err
      t.end()
    })
  })

  t.test('does not exit if user handles signal', t => {
    execFile(node, ['./test/fixtures/signal-listener.js'],
      function (err, stdout) {
        if (!isExecErr(err)) throw new Error('did not get expected error')

        t.equal(
          stdout.toString(),
          'exited calledListener=4, code=null, signal="SIGTERM"\n'
        )
        t.end()
      }
    )
  })
}
