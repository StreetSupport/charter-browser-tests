const local = 'http://localhost:3000/' // eslint-disable-line
const ci = 'https://dev-charter-streetsupport.azurewebsites.net/' // eslint-disable-line
const uat = 'https://uat-charter-streetsupport.azurewebsites.net/' // eslint-disable-line
const prod = 'https://charter.streetsupport.net/' // eslint-disable-line
const root = ci
const domain = root.match(/^https?:\/\/(.*):?.*\/$/)[1]

const pages = {
  domain: domain,
  home: {
    url: root
  }
}

module.exports = pages
