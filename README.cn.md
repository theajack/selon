<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
# [Selon](https://www.github.com/theajack/disable-devtool)

<p>
    <a href="https://www.github.com/theajack/disable-devtool/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/disable-devtool?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/disable-devtool/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/disable-devtool?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/disable-devtool" target="_black">
        <img src="https://img.shields.io/npm/v/disable-devtool?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/disable-devtool" target="_black">
        <img src="https://img.shields.io/npm/dm/disable-devtool?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/disable-devtool" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/disable-devtool/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/theajack/disable-devtool/issues"><img src="https://img.shields.io/github/issues-closed/theajack/disable-devtool.svg" alt="issue"></a>
</p>
<p>
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/disable-devtool/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/disable-devtool?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/disable-devtool"><img src="https://img.shields.io/bundlephobia/minzip/disable-devtool.svg" alt="Size"></a>
    <a href="https://github.com/theajack/disable-devtool/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/disable-devtool.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/librariesio/dependent-repos/npm/disable-devtool.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/disable-devtool/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

<h2>🚀 Select from Json: Json Query Language </h2>

**[English](https://github.com/theajack/disable-devtool/blob/master/README.md) | [在线试用](https://theajack.github.io/disable-devtool) | [更新日志](https://github.com/theajack/disable-devtool/blob/scripts/helper/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool) | [留言板](https://theajack.github.io/message-board?app=disable-devtool) ｜ QQ交流群: 720626970**

----


## 1. 快速使用

### 1.1 npm 引用

```
npm i selon
```

```js
import {selon} from 'disable-devtool';

selon([{name: 'user1', age: 15}, {name: 'user2', age: 20}])
    .select('name')
    .where('age<18')
    .run();
```

### 1.2 script属性配置

```html
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
```

或者通过版本引用:

```html
<!--使用指定版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x'></script>
<!--使用最新版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@latest'></script>
```