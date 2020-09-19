#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const processSource = require('../src/processSource')
const generateI18nData = require('../src/generate')
const i18nConfig = require(`${process.cwd()}/i18n.config`)
const { setDefaultData, isInclude, isExclude } = require('../src/utils')
const config = i18nConfig || {}
const exclude = i18nConfig.exclude || []
const include = i18nConfig.include
const done = [] // 用于标记文件处理情况
let id = -1

setDefaultData(config).then(() => {
    const entry = path.resolve(process.cwd(), config.entry? config.entry: 'src')

    if (fs.lstatSync(entry).isDirectory()) {
        readDir(entry)
    } else if (/(\.vue)|(\.js)$/.test(entry) || (config.extra && config.extra.test(entry))) {
        readFile(entry, ++id)
    }
})

function readDir(fileName, isRead) {
    fs.readdir(fileName, (err, files) => {
        if (err) throw err
        // 循环处理目录中的文件
        files.forEach(file => {
            const name = `${fileName}/${file}`
            if (fs.lstatSync(name).isDirectory()) {
                if (isExclude(exclude, file)) return
                if (isInclude(include, file) || isRead) {
                    readDir(name, true)
                } else {
                    readDir(name, false)
                }
            } else {
                if (isExclude(exclude, file)) return
                if (isInclude(include, file) || isRead) {
                    if (/(\.vue)|(\.js)$/.test(name) || (config.extra && config.extra.test(name))) {
                        readFile(`${fileName}/${file}`, ++id)
                    }
                }
            }
        })
    })
}

function readFile(fileName, curID) {
    done[curID] = false
    fs.readFile(fileName, 'utf-8', (err, source) => {
        if (err) throw err
        processSource(source).then(data => {
            fs.writeFile(fileName, data, 'utf-8', err => {
                if (err) throw err
                done[curID] = true
                // 处理完最后一个文件后，生成 i18n 数据
                if (!done.includes(false)) {
                    generateI18nData().then(data => {
                        fs.writeFile(
                            path.resolve(process.cwd(), config.output? config.output : 'i18n.data.js'), 
                            'module.exports = ' + JSON.stringify(data, null, config.indent? config.indent : 4), 
                            'utf-8', 
                            err => {
                                if (err) throw err
                            },
                        )
                    })
                }
            })
        })
    })
}