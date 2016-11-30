/* global casper */
const pages = require('./pages')
const page = pages.joinAnActionGroup

const config = {
  name: 'join-an-action-group'
}

const Screen = require('./Screen')
const screen = new Screen(casper, config)

const tests = {
  step1: [
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
    (test) => test.assertSelectorHasText(page.selectors.successTitle, 'Thank you for your interest', 'Thank you message appears')
  ]
}

const totalTests = tests.step1.length + tests.step2.length + tests.step3.length

casper.test.begin('Join an Action Group', totalTests, function (test) {
  casper.start(page.url, function () {
    screen.capture('initial-load')
    casper.waitUntilVisible(page.selectors.step1, () => {
      tests.step1.forEach(t => t(test))
      screen.capture('step 1')
    })
  })

  casper.then(() => {
    casper.click(page.selectors.firstActionGroupButton)
    screen.capture('action-group-selected')
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.step2, () => {
      const formFields = {}
      formFields[page.selectors.experience] = 'my experience'
      formFields[page.selectors.firstName] = 'first name'
      formFields[page.selectors.lastName] = 'last name'
      formFields[page.selectors.email] = 'test@test.com'
      casper.fillSelectors(page.selectors.form, formFields, false)
      screen.capture('form-filled-in')
      tests.step2.forEach(t => t(test))
    })
  })

  casper.then(() => {
    casper.click(page.selectors.submitButton)
    screen.capture('form submitted')
    casper.waitUntilVisible(page.selectors.step3, () => {
      screen.capture('success')
      tests.step3.forEach(t => t(test))
    }, (e) => { console.log('step 3 never appeared'); console.log(e) }, 10000)
  })

  casper.run(() => {
    test.done()
  })
})
