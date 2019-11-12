const fs = require('fs')
const faker = require('faker')
const moment = require('moment')
const csv = require('papaparse')

const rows = 1500000
const csvStream = fs.createWriteStream('data/data100.csv')
for (const rowNumber of Array(rows).keys()) {
  const string = faker.name.findName()
  const integer = faker.random.number(rows)
  const number = parseFloat(faker.finance.amount(0, 1000, 3))
  const booleans = faker.random.boolean()
  const datetime = moment(faker.date.past(100)).format('YYYY-MM-DDThh:mm:ss') + 'Z'
  const date = moment(faker.date.past(100)).format('YYYY-MM-DD')
  const time = moment(faker.date.past(100)).format('hh:mm:ss')
  const row = [string, integer, number, booleans, datetime, date, time]
  csvStream.write(csv.unparse([row]) + "\n")
}
