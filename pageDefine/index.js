const a = require('./pages_a.js')
const b = require('./pages_b.js')
const c = require('./pages_c.js')
const d = require('./pages_d.js')

const entrys = {...a.entrys,...b.entrys,...c.entrys,...d.entrys}
const pages = a.pages.concat(b.pages).concat(c.pages).concat(d.pages)

module.exports = {entrys,pages}
console.log(entrys,pages);