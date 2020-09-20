const replace = require('../replace')
const fs = require('fs')

const config1 = {
    entry: __dirname + '/page1.js',
    pluginPrefix: '$t',
}

const config2 = {
    entry: __dirname + '/page2.js',
    pluginPrefix: 't',
}

let pageContent1
let pageContent2

beforeAll(() => {
    pageContent1 = fs.readFileSync(config1.entry, 'utf-8')
    pageContent2 = fs.readFileSync(config2.entry, 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(config1.entry, pageContent1)
    fs.writeFileSync(config2.entry, pageContent2)
})

describe('plugin-prefix', () => {
    test('$t', done => {
        replace(config1).then(() => {
            fs.readFile(config1.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done()
            })
        })
    })

    test('t', done => {
        replace(config2).then(() => {
            fs.readFile(config2.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.t('0')`)
                done()
            })
        })
    })
})