# CMS Web FrameWork

## Todo

* [ ] 修复相互改角色的 bug
* [X] 修改密码 bug
* [ ] 后端 API 根据角色进行鉴权与授权
* [ ] 上传文件后 UI 应该发生变化，比如跳转到 list

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Storybook](https://raw.githubusercontent.com/storybooks/press/6baccd1d177c070b24503df97ccb1d790499626f/badges/storybook.svg)](https://andorlab.summit.com)
[![Build Status](https://travis-ci.org/guzhongren/CMS.svg?branch=master)](https://travis-ci.org/guzhongren/CMS)
[![codecov](https://codecov.io/gh/guzhongren/CMS/branch/master/graph/badge.svg)](https://codecov.io/gh/guzhongren/CMS)
[![GitHub stars](https://img.shields.io/github/stars/guzhongren/CMS.svg)](https://github.com/guzhongren/CMS/stargazers)

[![](https://img.shields.io/badge/Node-V10%2B-green.svg)](https://nodejs.org/zh-cn/)
[![](https://img.shields.io/badge/React-V16%2B-blue.svg)](https://reactjs.org/)
[![](https://img.shields.io/badge/Webpack-V4%2B-yellowgreen.svg)](https://webpack.js.org/)
[![](https://img.shields.io/badge/antd-v3.11.0-blue.svg)](https://ant.design/index-cn)

[![GitHub license](https://img.shields.io/github/license/guzhongren/CMS.svg)](https://github.com/guzhongren/CMS/blob/master/LICENSE)

## Node版本

|序号|名称|说明|
|:--:|--|--|
|1|Node|^10|

## 获取

```shell
$ git clone -b summitWeb https://github.com/guzhongren/CMS.git
...
```

## 安装依赖

```shell
# use npm
$ cd CMS && npm install
# use yarn
$ cd CMS && yarn
```

## 启动

```shell
$ yarn dev
...
```

## 生产

```shell
$ yarn build
...
# 将 dist下的文件 copy 到go 程序的 App 目录下
```

## 图标库

**[react-icon](https://react-icons.netlify.com/#/)**： 已集成[Font Awesome](ttps://fontawesome.com/ ), [Ionicons](https://ionicons.com/), [Material Design icons](http://google.github.io/material-design-icons/ ), [Typicons](http://s-ings.com/typicons/), [Github Octicons icons](https://octicons.github.com/ ),[Feather](https://feathericons.com/ )

## 别名引用

> 为节省组件目录搜索，已将**src**目录下的文件夹做了映射

### 之前

```typescript
// ./src/test/index.tsx
import AjaxTest from '../../components/Ajax'
```

### 之后

```typescript
// ./src/test/index.tsx
import AjaxTest from '@components/Ajax'
```

## 新特性

**[react-draggable](https://www.npmjs.com/package/react-draggable)**: 可拖动的React容器组件

**[classnames](https://www.npmjs.com/package/classnames)**: 方便在组件中控制样式, 使用[1](https://www.cnblogs.com/kugeliu/p/7339160.html), [2](https://www.npmjs.com/package/classnames)

测试框架使用[jest](https://jestjs.io/zh-Hans/)和axios模拟框架[axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter),　示例地址为./src/__test__/utils/HttpClient.spec.ts

## 设计图

[CMS UI](https://idoc.mockplus.cn/team/kthcspgrtk)

## 支持环境

* IE>9
* Edge>=15
* Chrome>=57
* FireFox>=55
