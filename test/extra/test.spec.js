const replace = require('../replace')
const fs = require('fs')

const config = {
    entry: __dirname + '/page.a',
    extra: /(\.a)|(\.b)$/,
}

const config2 = {
    entry: __dirname + '/page.b',
    extra: /(\.a)|(\.b)$/,
}

const config3 = {
    entry: __dirname + '/page.c',
    extra: /(\.a)|(\.b)$/,
}

let pageContent
let pageContent2
let pageContent3

beforeAll(() => {
    pageContent = fs.readFileSync(config.entry, 'utf-8')
    pageContent2 = fs.readFileSync(config2.entry, 'utf-8')
    pageContent3 = fs.readFileSync(config3.entry, 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(config.entry, pageContent)
    fs.writeFileSync(config2.entry, pageContent2)
    fs.writeFileSync(config3.entry, pageContent3)
})

describe('extra', () => {
    test('.a', done => {
        replace(config).then(() => {
            fs.readFile(config.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done()
            })
        })
    })

    test('.b', done => {
        replace(config2).then(() => {
            fs.readFile(config2.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = this.$t('0')`)
                done()
            })
        })
    })

    test('.c', done => {
        replace(config3).then(() => {
            fs.readFile(config3.entry, 'utf-8', (err, source) => {
                if (err) throw err
                expect(source).toBe(`const test = '测试'`)
                done()
            })
        })
    })
})