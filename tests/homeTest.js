/* global casper */
const pages = require('./pages')

casper.test.begin('Home', 1, function (test) {
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png')
    test.assertSelectorHasText('.block__header', 'Manchester Homelessness Charter')
  })

  casper.run(() => {
    test.done()
  })
})
