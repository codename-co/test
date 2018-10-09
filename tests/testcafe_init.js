const fs = require('fs')
const createTestCafe = require('testcafe')
const testControllerHolder = require('./test_controller_holder')

function createTestFile () {
  fs.writeFileSync('test.js',
    'import testControllerHolder from "./tests/test_controller_holder.js"\n' +
    'fixture("fixture")\n' +
    'test("test", testControllerHolder.capture)')
}

function runTest () {
  let runner = null

  createTestCafe('localhost', 1337, 1338)
    .then((tc) => {
      testcafe = tc
      runner = tc.createRunner()

      return runner
        .src('./test.js')
        .browsers('chrome')
        .run()
        .catch((error) => {
          console.log(error)
        })
    })
    .then((report) => {
      console.log(report)
    })
}

beforeSuite(() => {
  createTestFile()
  runTest()
})

afterSuite(() => {
  testControllerHolder.free()
  fs.unlinkSync('test.js')
})
