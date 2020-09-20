const replace = require('../replace')
const fs = require('fs')

const config = {
    loader: __dirname + '/loader.js',
    mapFile: __dirname + '/data.json',
    entry: __dirname + '/page.js',
}

const config2 = {
    mapFile: __dirname + '/data.js',
    entry: __dirname + '/page2.js',
}

let pageContent
let pageContent2

beforeAll(() => {
    pageContent = fs.readFileSync(config.entry, 'utf-8')
    pageContent2 = fs.readFileSync(config2.entry, 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(config.entry, pageContent)
    fs.writeFileSync(config2.entry, pageContent2)
})

describe('loader', () => {
    test('specified loader', done => {
        replace(config).then(() => {
            fs.readFile(config.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('10000')`)
                done()
            })
        })
    })

    test('default loader', done => {
        replace(config2).then(() => {
            fs.readFile(config2.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('10000')`)
                done()
            })
        })
    })
})