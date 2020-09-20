const replace = require('../replace')
const fs = require('fs')

const config = {
    entry: __dirname + '/pages',
    exclude: [__dirname + '/pages/page2.js'],
}

let pageContent

beforeAll(() => {
    pageContent = fs.readFileSync(__dirname + '/pages/page1.js', 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(__dirname + '/pages/page1.js', pageContent)
})

describe('exclude', () => {
    test('page1', done => {
        replace(config).then(() => {
            fs.readFile(__dirname + '/pages/page1.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done()
            })
        })
    })

    test('page2', done => {
        replace(config).then(() => {
            fs.readFile(__dirname + '/pages/page2.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = '测试'`)
                done()
            })
        })
    })
})