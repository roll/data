const fs = require('fs')
const faker = require('faker')
const moment = require('moment')
const csv = require('papaparse')

const tasks = 10
const mBytes = process.argv[2]

const main = async () => {
  for (const index of Array(tasks).keys()) {
    const options = index ? {flags: 'a'} : {}
    await write(options)
  }
}

const write = async (options) => {
  return new Promise((resolve, reject) => {
    const rows = mBytes * 1000000 / tasks / 100
    const csvStream = fs.createWriteStream(`data/data${mBytes}.csv`, options)
    for (const rowNumber of Array(rows).keys()) {
      const string = faker.random.alphaNumeric(40)
      const integer = faker.random.number({min: 10000, max: 99999})
      const number = parseFloat(faker.finance.amount(10000, 99999, 3)).toFixed(3)
      const bool = faker.random.boolean() ? '1' : '0'
      const datetime = moment(faker.date.past(100)).format('YYYY-MM-DDThh:mm:ss') + 'Z'
      const date = moment(faker.date.past(100)).format('YYYY-MM-DD')
      const time = moment(faker.date.past(100)).format('hh:mm:ss')
      const row = [string, integer, number, bool, datetime, date, time]
      csvStream.write(row.join(',') + "\n")
    }
    csvStream.end(resolve)
  })
}

main()
  .then(result => {})
  .catch(error => console.log(error))
