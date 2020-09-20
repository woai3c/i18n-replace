const replace = require('../replace')
const fs = require('fs')

const config = {
    entry: __dirname + '/pages',
    include: [__dirname + '/pages/page1.js'],
}

const config2 = {
    entry: __dirname + '/pages2',
    include: ['b'],
}

let pageContent
let pageContent2

beforeAll(() => {
    pageContent = fs.readFileSync(__dirname + '/pages/page1.js', 'utf-8')
    pageContent2 = fs.readFileSync(__dirname + '/pages2/b/b.js', 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(__dirname + '/pages/page1.js', pageContent)
    fs.writeFileSync(__dirname + '/pages2/b/b.js', pageContent2)
})

describe('include', () => {
    test('include', done => {
        replace(config).then(() => {
            fs.readFile(__dirname + '/pages/page1.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done()
            })
        })
    })

    test('uninclude', done => {
        replace(config).then(() => {
            fs.readFile(__dirname + '/pages/page2.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = '测试'`)
                done()
            })
        })
    })

    test('mix', done => {
        replace(config2).then(() => {
            let done1, done2
            fs.readFile(__dirname + '/pages2/b/b.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done1 = true
                if (done1 && done2) done()
            })

            fs.readFile(__dirname + '/pages2/a.js', 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = '测试'`)
                done2 = true
                if (done1 && done2) done()
            })
        })
    })
})