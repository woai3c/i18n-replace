const replace = require('../replace')
const fs = require('fs')

const config = {
    entry: __dirname + '/page.js',
    id: 0,
    prefix: 'pre',
    suffix: 'suf',
}

let pageContent

beforeAll(() => {
    pageContent = fs.readFileSync(config.entry, 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(config.entry, pageContent)
})

describe('variable', () => {
    test('', done => {
        replace(config).then(() => {
            fs.readFile(config.entry, 'utf-8', (err, source) => {
                if (err) throw err
                fs.readFile(__dirname + '/result.js', 'utf-8', (err, result) => {
                    if (err) throw err
                    expect(source).toBe(result)
                    done()
                })
            })
        })
    })
})