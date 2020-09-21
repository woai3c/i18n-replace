# i18n-replace

![](https://img-blog.csdnimg.cn/20200921175659391.gif#pic_center)

i18n-replace 是一个能够自动替换中文并支持自动翻译的前端国际化辅助工具。

**它具有以下功能**：
1. 根据你提供的默认映射数据（{ 中文：变量 }），i18n-replace 会把中文替换成对应的变量。
2. 如果没有提供映射数据，则使用默认规则替换中文并生成变量。
3. 将替换出来的中文自动翻译成目标语言（默认为 en，即英语）。

自动翻译功能使用的是百度免费翻译 API，每秒只能调用一次，并且需要你注册百度翻译平台的账号。

然后将 appid 和密钥填入 i18n-replace 的配置文件 `i18n.config.js`，这个配置文件需要放置在你项目根目录下。

## 使用
安装
```
npm i -g i18n-replace
```
全局安装后，打开你的项目，建立一个 `i18n.config.js` 文件，配置项如下：
```js
module.exports = {
    delay: 1500, // 自动翻译延时，必须大于 1000 ms，否则调用百度翻译 API 会失败
    mapFile: '', // 需要生成默认 map 的文件
    appid: '', // 百度翻译 appid
    key: '', // 百度翻译密钥
    output: 'i18n.data.js', // i18n 输出文件
    indent: 4, // i18n 输出文件缩进
    entry: '', // 要翻译的入口目录或文件，默认为命令行当前的 src 目录
    prefix: '', // i18n 变量前缀  i18n 变量生成规则 prefix + id + suffix
    suffix: '', // i18n 变量后缀
    id: 0, // i18n 自增变量 id
    translation: false, // 是否需要自动翻译中文
    to: 'en', // 中文翻译的目标语言
    mode: 1, // 0 翻译所有 i18n 数据，1 只翻译新数据
    loader: 'loader.js',
    pluginPrefix: '$t', // i18n 插件前缀 例如 vue-i18n: $t， react-i18next: t
    include: [], // 需要翻译的目录或文件
    exclude: [], // 不需要翻译的目录或文件 如果 exclude include 同时存在同样的目录或文件 则 exclude 优先级高
    extra: /(\.a)|(\.b)$/, // 默认支持 .vue 和 .js 文件 如果需要支持其他类型的文件，请用正则描述 例如这个示例额外支持 .a .b 文件
}
```
上面是 i18n-replace 工具的配置项，具体说明请看[文档](#文档)。

这些配置项都不是必要的，如果你需要翻译功能，一般只需要填入 appid、key 并且将 translation 设为 true。

设置完配置项后，执行 `rep`（这是一个全局命令），i18n-replace 就会对你的入口目录进行递归替换、翻译。

i18n-replace 能识别以下中文：
```js
不能包含有空格，可以包含中文、中文符号，数字，-
测试123
测试-12-测试
几点了？12点。
```

## DEMO
更多测试用例，请查看项目下的 `test` 目录。
### jsx
翻译前
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
翻译后
```js
<div>
    <input
        type={this.$t('0')}
        placeholder={this.$t('1')}
        value={`s ${this.$t('2')} f`}
    />

    <MyComponent>
        {`${this.$t('3')} `}<header slot="header">{this.$t('4')}</header>{` ${this.$t('3')}`}
        {`${this.$t('3')} `}<footer slot="footer">{this.$t('5')}</footer>{` ${this.$t('3')}`}
    </MyComponent>
</div>
```
### sfc
翻译前
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
翻译后
```vue
<template>
    <div>
        {{ $t('0') }}<div :value="$t('1')" :val="abc + $t('2') + ' afb'">{{ $t('3') }}</div>{{ $t('4') }}
    </div>
</template>

<script>
export default {
    created() {
        const test = this.$t('5')
    }
}
</script>
```

## 文档
在你的项目根目录下建立一个 `i18n.config.js` 文件，i18n-replace 将会根据配置项来执行不同的操作。

注意，所有配置项均为选填。
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
    include: [],  // 需要翻译的目录或文件，如果为空，将不进行任何操作。
    exclude: [], // 不需要翻译的目录或文件 如果 exclude include 同时存在同样的目录或文件 则 exclude 优先级高
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
mapFile: 'data.js'
```
如果你提供一个默认的映射文件（中文和变量之间的映射），本工具将根据映射文件将中文替换为对应的变量。

例如有这样的映射关系：
```js
module.exports = {
    zh: {
        10000: '测试',
    },
    en: {},
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
i18n-replace 提供了一个内置的 loader，以便将下面的数据：
```js
module.exports = {
    zh: {
        10000: '测试',
    },
    en: {},
}
```
转换成 i18n-replace 要求的映射数据格式：
```json
{
    "测试": "10000",
}
```
所以为了能将其他文件翻译成这种格式，本工具提供了一个 loader 选项。

这个 loader 是一个本地文件地址，你提供的文件需要写一个转换函数，将其他格式的文件转换成 i18n-replace 要求的数据格式，就像下面这个函数一样：
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
如果你没有提供一个默认映射文件，i18n-replace 在将中文替换成变量时，将遵循下面的公式来生成变量：
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
是否需要自动翻译，默认为 `false`。

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
同时在替换过程中产生了两个新的变量，最后映射数据变成这样：
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

如果这个选项是一个空数组，将不会进行任何操作。

### exclude
`exclude` 优先级比 `include` 高，如果有文件包含在 `exclude` 里面，它将不会被翻译。

### indent
生成文件的缩进，默认为 `4`。

### extra
由于 i18n-replace 默认只支持 .vue 和 .js 文件。
所以提供了一个 extra 选项，以支持其他的文件格式，它的值为正则表达式。
```js
extra: /(\.a)|(\.b)$/
```

例如使用上述的正则表达式，i18n-replace 将额外支持 `.a` `.b` 文件
