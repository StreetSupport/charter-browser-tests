/* global casper */
const pages = require('./pages')
const page = pages.home

casper.test.begin('Home', 1, function (test) {
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png')
    test.assertSelectorHasText(page.selectors.mainTitle, 'Manchester Homelessness Charter')
  })

  casper.run(() => {
    test.done()
  })
})
