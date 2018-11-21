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

  createTestCafe('localhost', 1332, 1333)
    .then((tc) => {
      testcafe = tc
      runner = tc.createRunner()

      return runner
        .src('./test.js')
        .browsers('chrome')
        // .browsers('puppeteer')
        // .reporter('json')
        .run()
        .catch((error) => {
          console.error(error)
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
