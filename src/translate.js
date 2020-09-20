const md5 = require('md5')
const axios = require('axios') 
const { globalData } = require('./data')

function translate(msg = '') {
    const q = msg
    const salt = parseInt(Math.random() * 1000000000)
    const sign = md5(globalData.appid + q + salt + globalData.key)
    const params = encodeURI(`q=${q}&from=zh&to=${globalData.to}&appid=${globalData.appid}&salt=${salt}&sign=${sign}`)
    const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?${params}`
    return axios.get(url).then(res => res.data.trans_result)
}

module.exports = {
    translate,
}