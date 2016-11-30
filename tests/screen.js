function Screen (casper, testConfig) {
  const self = this
  self.captureIndex = 0
  self.testConfig = testConfig

  const lpad = (str, maxLength = 3) => {
    if (str.length >= maxLength) return str
    let padding = ''
    for (let i = 0; i < maxLength - str.length; i++) {
      padding += '0'
    }
    return `${padding + str}`
  }

  self.capture = (name) => {
    casper.capture(`./captures/${self.testConfig.name.replace(' ', '-')}/${lpad(`${self.captureIndex}`)}_${name.replace(' ', '-')}.png`)
    self.captureIndex++
  }
}

module.exports = Screen
