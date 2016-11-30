const local = 'http://localhost:3000/' // eslint-disable-line
const ci = 'https://dev-charter-streetsupport.azurewebsites.net/' // eslint-disable-line
const uat = 'https://uat-charter-streetsupport.azurewebsites.net/' // eslint-disable-line
const prod = 'https://charter.streetsupport.net/' // eslint-disable-line
const root = ci
const domain = root.match(/^https?:\/\/(.*):?.*\/$/)[1]

const pages = {
  domain: domain,
  home: {
    url: root,
    selectors: {
      mainTitle: '.block__header'
    }
  },
  makeAPledge: {
    url: root + 'pledge-your-support/',
    selectors: {
      step1: '.pledge-section--1 .pledge__highlight',
      step2: '.pledge-section--2 .pledge__highlight',
      step3: '.pledge-section--3 .h1',
      form: '.js-pledge-form',
      firstName: 'input#firstName',
      lastName: 'input#lastName',
      haveExperienceOfHomelessnessButton: '#i-have-experienced-homelessness',
      customPledge: 'textarea[data-bind="textInput: customPledge"]',
      makeCustomPledgeButton: 'button[data-bind="click: useCustomPledge"]',
      email: 'input#email',
      submitPledgeButton: 'button[data-bind="click: $parent.submitPledge"]',
      successTitle: '.pledge-section--3 .h1'
    }
  }
}

module.exports = pages
