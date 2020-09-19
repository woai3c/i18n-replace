## 使用
下载项目
```
git clone ssh://git@gitlab.weikle.com.cn:20022/hkm3/i18n-replace.git
```
安装
```js
npm i
```
全局注册命令
```
npm link
```
全局注册命令后可以在全局使用 `rep` 和 `upload` 命令。

* rep 命令，将根据配置项进行翻译。
* upload 命令，将翻译后的数据上传到服务器。

具体的使用例子请查看 `test` 目录下的单元测试。

## DEMO
### jsx
```js
<div>
    <input
        type="二"
        placeholder="一"
        value="s 四 f"
    />

    <MyComponent>
    非常好 <header slot="header">测试</header> 非常好
        非常好 <footer slot="footer">再一次测试</footer> 非常好
    </MyComponent>
</div>
```
```js
<div>
    <input
        type={this.$t('10001')}
        placeholder={this.$t('10000')}
        value={`s ${this.$t('10003')} f`}
    />

    <MyComponent>
    {`${this.$t('0')} `}<header slot="header">{this.$t('1')}</header>{` ${this.$t('0')}`}
        {`${this.$t('0')} `}<footer slot="footer">{this.$t('2')}</footer>{` ${this.$t('0')}`}
    </MyComponent>
</div>
```
### sfc
```vue
<template>
    <div>
        有人<div value="二" :val="abc + '三 afb'">一</div>在国
    </div>
</template>

<script>
export default {
    created() {
        const test = '测试'
    }
}
</script>
```
```vue
<template>
    <div>
        {{ $t('0') }}<div :value="$t('10001')" :val="abc + $t('10002') + ' afb'">{{ $t('10000') }}</div>{{ $t('1') }}
    </div>
</template>

<script>
export default {
    created() {
        const test = this.$t('2')
    }
}
</script>
```

## 文档
在你的项目根目录下建立一个 `i18n.config.js` 文件，本工具将会根据配置项来执行不同的操作。

注意，所有配置项均为选填，也就是说，配置文件不是必须的。
```js
module.exports = {
    delay: 1500, // 自动翻译延时，必须大于 1000 ms，否则调用百度翻译 API 会失败
    mapFile: '国际化资源管理.xlsx', // 需要生成默认 map 的文件
    appid: '', // 百度翻译 appid
    key: '', // 百度翻译密钥
    output: 'i18n.data.js', // i18n 输出文件
    indent: 4, // i18n 输出文件缩进
    entry: 'src', // 要翻译的入口目录或文件，默认为命令行当前的 src 目录
    prefix: '', // i18n 变量前缀  i18n 变量生成规则 prefix + id + suffix
    suffix: '', // i18n 变量后缀
    id: 0, // i18n 自增变量 id
    translation: true, // 是否需要自动翻译中文
    to: 'en', // 中文翻译的目标语言
    mode: 1, // 0 翻译所有 i18n 数据，1 只翻译新数据
    loader: 'loader.js',
    pluginPrefix: '$t', // i18n 插件前缀 例如 vue-i18n: $t， react-i18next: t
    include: [],  // 需要翻译的目录或文件
    exclude: [], // 不需要翻译的目录或文件 如果 exclude include 同时存在同样的目录或文件 则 exclude 优先级高
    url: 'http://192.168.150.244' // 服务器地址，将翻译后的数据传到服务器
}
```
### appid 和 key
```js
appid: '', // 百度翻译 appid
key: '', // 百度翻译密钥
```

这是百度免费翻译 API 的 appid 和密钥。

如果你需要自动翻译，这两个是必填项。

具体注册流程请看[官网](https://fanyi-api.baidu.com/)。

### entry
```js
entry: 'src'
```

入口目录或入口文件，默认为项目根目录下的 `src` 目录。

替换或翻译将从这里开始。

### delay
```js
delay: 1500
```
单位毫秒，默认 1500。

百度翻译 API 调用延时，由于免费的翻译 API 1 秒只能调用一次，所以该选项必须大于 1000。经过本人测试，该项设为 1500 比较稳定。

### mapFile
```js
mapFile: '国际化资源管理.xlsx'
```
如果你提供一个默认的映射文件（中文和变量之间的映射），本工具将根据映射文件将中文替换为对应的变量。

例如有这样的映射关系：
```json
{
    "一": "10000",
    "二": "10001",
    "三": "10002",
    "四": "10003"
}
```
和一个源码文件：
```js
const test = '一'
```
启用工具后，源码文件中的 `const test = '一'` 将会被替换为 `const test = this.$t('10000')`。

所以如果你有默认的映射文件，请提供它的地址。

### loader
```js
loader: 'src/loader.js'
```
由于默认的映射关系只支持下面这种格式：
```json
{
    "一": "10000",
    "二": "10001",
    "三": "10002",
    "四": "10003"
}
```
所以为了能将其他文件翻译成这种格式，本工具提供了一个 loader 选项。

这个 loader 是一个文件地址，你提供的文件需要写一个转换函数，将其他格式的文件转换成本工具要求的格式，就像下面这个函数一样：
```js
const excelToJson = require('convert-excel-to-json')

function translateExcelData(file, done) {
    const data = excelToJson({ sourceFile: file })
    const result = {}
    data.Sheet1.forEach(item => {
        if (item.C == '中文') {
            result[item.B] = item.A
        }
    })

    done(result)
}

module.exports = translateExcelData
```
它接收两个参数，分别是文件地址 `file` 和 完成函数 `done()`。

支持异步操作，只要在转换完成时调用 `done(result)` 即可。

### prefix、suffix、id
如果你没有提供一个默认映射文件，工具在将中文替换成变量时，将遵循下面的公式来生成变量：
```js
prefix + id + suffix
```
* id 默认为 `0`，自动递增。
* 变量前缀，默认为空。
* 变量后缀，默认为空。

### pluginPrefix
```js
pluginPrefix: '$t'
```
翻译前缀，默认为 `$t`。请根据应用场景配置。

例如 `vue-i18n` 国际化工具使用的是 `$t`，而 `react-i18next` 使用的是 `t`。

### translation
是否需要自动翻译，转为为 `false`。

如果设为 `true`，将会调用百度免费翻译 API 进行翻译。

### to
翻译的目标语言，默认为 `en`，即英语。

具体的配置项请查看[百度翻译 API 文档](https://fanyi-api.baidu.com/product/113)。

### mode
翻译模式，默认为 `1`。

翻译模式有两种：`0` 和 `1`。

如果你提供了一个默认的映射文件：
```json
{
    "一": "10000",
    "二": "10001",
}
```
同时在替换过程中产生了两个新的变量，最后映射关系变成这样：
```json
{
    "一": "10000",
    "二": "10001",
    "三": "10002",
    "四": "10003"
}
```
这时，翻译模式为 `0` 将会对所有数据进行翻译。而翻译模式为 `1` 只对新产生的数据进行翻译。

### output
翻译后的文件输出名称，默认为 `i18n.data.js`。

### include
工具默认翻译入口目录下所有的文件，如果你提供了 `include` 选项，将只会翻译 `include` 指定的目录或指定的文件。

### exclude
`exclude` 优先级比 `include` 高，如果有文件包含在 `exclude` 里面，它将不会被翻译。

### url
服务器地址，执行 `upload` 命令会将翻译后的文件上传到服务器。
