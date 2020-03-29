const fs = require('fs')
const faker = require('faker')
const moment = require('moment')
const csv = require('papaparse')

const tasks = 10
const mBytes = parseInt(process.argv[2])

const main = async () => {
  for (const index of Array(tasks).keys()) {
    const options = index ? { flags: 'a' } : {}
    await write(options)
  }
}

const write = async (options) => {
  return new Promise((resolve, reject) => {
    const isL = [1, 10, 100, 1000].includes(mBytes)
    const rows = (mBytes * 1000000) / tasks / (isL ? 100 : 50)
    const csvStream = fs.createWriteStream(`data/data${mBytes}.csv`, options)
    for (const rowNumber of Array(rows).keys()) {
      const isT = faker.random.boolean()
      const string1 = faker.random.alphaNumeric(6)
      const string2 = faker.random.alphaNumeric(9)
      const integer = faker.random.number({ min: 10000, max: 99999 })
      const decimal = parseFloat(faker.finance.amount(100, 999, 2)).toFixed(2)
      const float = parseFloat(faker.finance.amount(100, 999, isT ? 3 : 2)).toFixed(isT ? 3 : 2)
      const bool = isT ? 'true' : 'false'
      const datetime = moment(faker.date.past(100)).format('YYYY-MM-DDThh:mm:ss') + 'Z'
      const date = moment(faker.date.past(100)).format('YYYY-MM-DD')
      const time = moment(faker.date.past(100)).format('hh:mm:ss')
      const array = [
        faker.random.number({ min: 1, max: 9 }),
        faker.random.number({ min: 1, max: 9 }),
      ].join(',')
      const object = JSON.stringify({
        x: faker.random.number({ min: 1, max: 9 }),
        y: faker.random.number({ min: 1, max: 9 }),
      })
      const row = isL
        ? [string1, integer, decimal, float, bool, datetime, date, time, array, object]
        : [string2, integer, float, bool, datetime]
      csvStream.write(csv.unparse([row]).replace('" true"', ' true') + '\n')
    }
    csvStream.end(resolve)
  })
}

main()
  .then((result) => {})
  .catch((error) => console.log(error))
