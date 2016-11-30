/* global casper */
const pages = require('./pages')
const page = pages.makeAPledge

const tests = {
  onLoad: [
    (test) => test.assertVisible(page.selectors.step1),
    (test) => test.assertNotVisible(page.selectors.step2),
    (test) => test.assertNotVisible(page.selectors.step3)
  ],
  step2: [
    (test) => test.assertNotVisible(page.selectors.step1),
    (test) => test.assertNotVisible(page.selectors.step3)
  ],
  step3: [
    (test) => test.assertNotVisible(page.selectors.step1, 'Step 1 is hidden'),
    (test) => test.assertNotVisible(page.selectors.step2, 'Step 2 is hidden'),
    (test) => test.assertSelectorHasText(page.selectors.successTitle, 'Thank you for making a pledge.', 'Thank you message appears')
  ]
}

const totalTests = tests.onLoad.length + tests.step2.length + tests.step3.length

casper.test.begin('Make a Pledge', totalTests, function (test) {
  casper.start(page.url, function () {
    casper.capture('./captures/make-a-pledge/initial-load.png')
    tests.onLoad.forEach(t => t(test))
  })

  casper.then(() => {
    const nameFormFields = {}
    nameFormFields[page.selectors.firstName] = 'Liz'
    nameFormFields[page.selectors.lastName] = 'Lemon'
    casper.fillSelectors(page.selectors.form, nameFormFields, false)
    casper.capture('./captures/make-a-pledge/name-filled-in.png')
  })

  casper.then(() => {
    const emailFormFields = {}
    casper.click(page.selectors.haveExperienceOfHomelessnessButton)
    casper.waitUntilVisible('.accordion__item.is-active .accordion__inner', () => {
      casper.capture('./captures/make-a-pledge/category-selected.png')
      emailFormFields[page.selectors.customPledge] = 'my custom pledge'
      casper.fillSelectors(page.selectors.form, emailFormFields, false)
      casper.capture('./captures/make-a-pledge/custom-pledge-filled-in.png')
    })
  })

  casper.then(() => {
    casper.click(page.selectors.makeCustomPledgeButton)
    casper.waitUntilVisible(page.selectors.step2, () => {
      casper.capture('./captures/make-a-pledge/step2.png')
      const otherFormFields = {}
      otherFormFields[page.selectors.email] = 'liz.lemon@tgs.com'
      casper.fillSelectors(page.selectors.form, otherFormFields, false)
      casper.capture('./captures/make-a-pledge/email-filled-in.png')
      casper.click(page.selectors.submitPledgeButton)
      casper.capture('./captures/make-a-pledge/pledge-submitted.png')
      tests.step2.forEach(t => t(test))
    })
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.step3, () => {
      casper.capture('./captures/make-a-pledge/step3.png')
      tests.step3.forEach(t => t(test))
    })
  })

  casper.run(() => {
    test.done()
  })
})
