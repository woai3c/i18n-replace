const replace = require('../replace')
const fs = require('fs')

const config = {
    entry: __dirname + '/page.vue',
}

let pageContent

beforeAll(() => {
    pageContent = fs.readFileSync(config.entry, 'utf-8')
})

afterAll(() => {
    fs.writeFileSync(config.entry, pageContent)
})

describe('note', () => {
    test('', done => {
        replace(config).then(() => {
            fs.readFile(config.entry, 'utf-8', (err, source) => {
                if (err) throw err
                fs.readFile(__dirname + '/result.vue', 'utf-8', (err, result) => {
                    if (err) throw err
                    expect(source).toBe(result)
                    done()
                })
            })
        })
    })
})