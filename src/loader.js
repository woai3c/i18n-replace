function loader(file, done) {
    const data = require(file)
    const result = {}
    if (data.zh) {
        const mapData = data.zh
        Object.keys(mapData).forEach(key => {
            result[mapData[key]] = key
        })
    }

    done(result)
}

module.exports = loader