/* globals gauge*/

const testControllerHolder = require('./test_controller_holder')
const { Selector } = require('testcafe')

let _

beforeSpec(async () => {
  _ = await testControllerHolder.get()
})

step("Goto DuckDuckGo's search page", async () => {
  await _.navigateTo('https://duckduckgo.com/')
})

step("Search for <query>", async (query) => {
  const input = Selector('#search_form_input_homepage')
  await _.typeText(input, query)
  await _.pressKey('enter')
})

step("First link contains <text>", async (text) => {
  const firstLink = Selector('.result__a').find('b').with({ boundTestRun: _ })
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

step("Wait <timeout>", async (timeout) => {
  const time = timeout.remplace(/ms$/, '').replace(/s$/, '00')
  await _.wait(time)
})
