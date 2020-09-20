const { globalData } = require('./data')
const path = require('path')

// 节流函数
const throttle = (function (delay = 1500) {
    const wait = []
    let canCall = true
    return function throttle(callback) {
        if (!canCall) {
            if (callback) wait.push(callback)
            return
        }

        callback()
        canCall = false
        setTimeout(() => {
            canCall = true
            if (wait.length) {
                throttle(wait.shift())
            }
        }, delay)
    }
}(globalData.delay))

async function setDefaultData(config = {}) {
    globalData.appid = config.appid
    globalData.key = config.key
    if (config.translation !== undefined) {
        if (config.translation && (!config.appid || !config.key)) {
            console.error('请设置百度翻译 API 的 appid 和密钥')
            globalData.translation = false
        } else {
            globalData.translation = config.translation
        }
    }

    if (config.pluginPrefix !== undefined && config.pluginPrefix) globalData.pluginPrefix = config.pluginPrefix
    if (config.mode !== undefined) globalData.mode = config.mode
    if (config.to !== undefined && config.to) globalData.to = config.to
    if (config.delay !== undefined) globalData.delay = ~~config.delay
    if (config.prefix !== undefined) globalData.prefix = config.prefix
    if (config.suffix !== undefined) globalData.suffix = config.suffix
    if (config.id !== undefined) globalData.id = ~~config.id
    if (config.mapFile !== undefined && config.mapFile) {
        let load
        if (config.loader) {
            load = require(path.resolve(process.cwd(), config.loader))
        } else {
            load = require('./loader')
        }
        
        globalData.i18nMap = await new Promise(reslove => {
            load(path.resolve(process.cwd(), config.mapFile), reslove)
        })
    }
}

function isInclude(include, file = '') {
    if (!include || include.includes(file)) return true
    for (let i = 0, len = include.length; i < len; i++) {
        if (include[i].split('/').pop().includes(file)) return true
    }

    return false
}

function isExclude(exclude = [], file = '') {
    if (exclude.includes(file)) return true
    for (let i = 0, len = exclude.length; i < len; i++) {
        if (exclude[i].split('/').pop().includes(file)) return true
    }

    return false
}

module.exports = {
    throttle,
    setDefaultData,
    isInclude,
    isExclude,
}