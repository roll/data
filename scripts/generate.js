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
      const string = faker.random.alphaNumeric(7)
      const integer = faker.random.number({min: 100000, max: 999999})
      const decimal = parseFloat(faker.finance.amount(100, 999, 3)).toFixed(3)
      const flt = parseFloat(faker.finance.amount(100, 999, 3)).toFixed(3)
      const bool = faker.random.boolean() ? '1' : '0'
      const datetime = moment(faker.date.past(100)).format('YYYY-MM-DDThh:mm:ss') + 'Z'
      const date = moment(faker.date.past(100)).format('YYYY-MM-DD')
      const time = moment(faker.date.past(100)).format('hh:mm:ss')
      const array = [faker.random.number({min: 1, max: 9}), faker.random.number({min: 1, max: 9})].join(',')
      const object = JSON.stringify({x: faker.random.number({min: 1, max: 9}), y: faker.random.number({min: 1, max: 9})})
      const row = [string, integer, decimal, flt, bool, datetime, date, time, array, object]
      csvStream.write(csv.unparse([row]) + "\n")
    }
    csvStream.end(resolve)
  })
}

main()
  .then(result => {})
  .catch(error => console.log(error))
