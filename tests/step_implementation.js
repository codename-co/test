/* globals gauge*/

const testControllerHolder = require('./test_controller_holder')
const TestCafeSelector = require('testcafe').Selector

let Selector

// steps implementations

let _
let clipboard

beforeSpec(async () => {
  _ = await testControllerHolder.get()
  Selector = (str) => TestCafeSelector(str).with({ boundTestRun: _ })
})

// sample steps

step("Goto DuckDuckGo's search page", async () => {
  await _.navigateTo('https://duckduckgo.com/')
})

step("Search for <query>", async (query) => {
  const input = Selector('#search_form_input_homepage')
  await _.typeText(input, query)
  await _.pressKey('enter')
})

step("First link contains <text>", async (text) => {
  const firstLink = Selector('.result__a').find('b')
  await _.expect(firstLink.innerText).contains(text)
})

step("Goto the IMDB website", async () => {
  await _.navigateTo('https://www.imdb.com/')
})

step("Goto the top rated movies list", async () => {
  const topRatedMoviesLink = Selector('#footer').find('a').withText('Top Rated Movies').with({ boundTestRun: _ })
  await _.click(topRatedMoviesLink)
})

step("Ensure that <text> is present", async (text) => {
  const body = Selector('body')
  await _.expect(body.textContent).contains(text)
})

// low-level steps

step("Open <url>", async (url) => {
  await _.navigateTo(url)
})

step("Type <text> in <field>", async (text, field) => {
  await _.typeText(Selector('#' + field), text)
})

step("Click on <button>", async (button) => {
  await _.click(Selector('#' + button))
})

step("Copy <text>", (text) => {
  clipboard = text
})

step("Paste in <field>", async (field) => {
  await _.typeText(Selector('#' + field), clipboard, {paste: true})
})

step("Choose <option> in <select>", async (option, select) => {
  await _
    .click(Selector('#' + select))
    .click(Selector('option').withText(option))
})

step("Press <key>", async (key) => {
  await _.pressKey(key)
})

step("Wait <timeout>", async (timeout) => {
  const time = parseInt(timeout.replace(/ms$/, '').replace(/s$/, '000'))
  await _.wait(time)
})