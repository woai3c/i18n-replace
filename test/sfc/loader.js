const fs = require('fs')

function loader(file, done) {
    fs.readFile(file, 'utf-8', (err, source) => {
        if (err) throw err
        done(JSON.parse(source))
    })
}

module.exports = loader