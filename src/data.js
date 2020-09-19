const globalData = {
    i18nMap: {},
    i18nMap2: {}, // 用于 mode 1
    prefix: '',
    suffix: '',
    id: 0,
    appid: '',
    key: '',
    translation: false,
    delay: 1500,
    to: 'en',
    mode: 1, // 0 翻译所有 i18n 数据，1 只翻译新数据
    loader: './loader.js',
    pluginPrefix: '$t', // i18n 插件前缀 vue-i18n: $t， react-i18next: t
}

module.exports = {
    globalData,
}