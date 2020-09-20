const ProgressBar = require('progress')
const { translate } = require('./translate')
const { throttle } = require('./utils')
const { globalData } = require('./data')

function generateI18nData() {
    const { to, mode } = globalData
    let i18nMap
    if (mode == 1) {
        i18nMap = globalData.i18nMap2
    } else {
        i18nMap = globalData.i18nMap
    }

    const i18nData = {
        zh: {},
    }

    i18nData[to] = {}
    const messages = Object.keys(i18nMap)

    // 进度条
    const bar = new ProgressBar('translating [:bar] :percent :etas', { total: messages.length })

    return new Promise(resolve => {
        if (!messages.length) resolve(i18nData)
        messages.forEach((msg, i) => {
            const key = i18nMap[msg]
            i18nData.zh[key] = msg
            if (!globalData.translation) {
                if (i == messages.length - 1) {
                    resolve(i18nData)
                }

                return
            }

            throttle(() => {
                translate(msg).then(res => {
                    if (res) {
                        i18nData[to][key] = res[0].dst
                    } else {
                        // 翻译失败
                        i18nData[to][key] = null
                    }

                    // 增加进度条
                    bar.tick()
                    if (i == messages.length - 1) {
                        resolve(i18nData)
                    }
                })
            })
        })
    })
}

module.exports = generateI18nData