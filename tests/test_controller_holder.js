const testControllerHolder = {
  testController: null,
  captureResolver: null,
  getResolver: null,

  capture (t) {
    testControllerHolder.testController = t

    if (testControllerHolder.getResolver) {
      testControllerHolder.getResolver(t)
    }

    return new Promise((resolve) => {
      testControllerHolder.captureResolver = resolve
    })
  },

  free () {
    testControllerHolder.testController = null

    if (testControllerHolder.captureResolver) {
      testControllerHolder.captureResolver()
    }
  },

  get () {
    return new Promise((resolve) => {
      if (testControllerHolder.testController) {
        resolve(testControllerHolder.testController)
      } else {
        testControllerHolder.getResolver = resolve
      }
    })
  }
}

module.exports = testControllerHolder