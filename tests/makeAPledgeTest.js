/* global casper */
const pages = require('./pages')
const page = pages.makeAPledge

const config = {
  name: 'make-a-pledge'
}

const Screen = require('./Screen')
const screen = new Screen(casper, config)

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
    screen.capture('initial-load')
    tests.onLoad.forEach(t => t(test))
  })

  casper.then(() => {
    const nameFormFields = {}
    nameFormFields[page.selectors.firstName] = 'Liz'
    nameFormFields[page.selectors.lastName] = 'Lemon'
    casper.fillSelectors(page.selectors.form, nameFormFields, false)
    screen.capture('name-filled-in')
  })

  casper.then(() => {
    const emailFormFields = {}
    casper.click(page.selectors.haveExperienceOfHomelessnessButton)
    casper.waitUntilVisible('.accordion__item.is-active .accordion__inner', () => {
      screen.capture('category-selected')
      emailFormFields[page.selectors.customPledge] = 'my custom pledge'
      casper.fillSelectors(page.selectors.form, emailFormFields, false)
      screen.capture('custom-pledge-filled-in')
    })
  })

  casper.then(() => {
    casper.click(page.selectors.makeCustomPledgeButton)
    casper.waitUntilVisible(page.selectors.step2, () => {
      screen.capture('step2')
      const otherFormFields = {}
      otherFormFields[page.selectors.email] = 'liz.lemon@tgs.com'
      casper.fillSelectors(page.selectors.form, otherFormFields, false)
      screen.capture('email-filled-in')
      casper.click(page.selectors.submitPledgeButton)
      screen.capture('pledge-submitted')
      tests.step2.forEach(t => t(test))
    })
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.step3, () => {
      screen.capture('step3')
      tests.step3.forEach(t => t(test))
    })
  })

  casper.run(() => {
    test.done()
  })
})
