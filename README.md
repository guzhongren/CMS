
# CMS(社区管理系统)

## Node版本

|序号|名称|说明|
|:--:|--|--|
|1|Node|^10|

## 获取

```shell
$ git clone git@github.com:guzhongren/CMS.git
...
```

## 安装依赖

```shell
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
```

## 图标库


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

## 支持环境

* IE>9
* Edge>=15
* Chrome>=57
* FireFox>=55
