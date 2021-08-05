# 从零开始搭建 基于vite + vue3 + ts + element-plus的管理系统

### 使用vite脚手架初始化项目

```npm init @vitejs/app vue-admin --template vue-ts```

```cd vue-admin```

```npm install```

### 安装scss依赖
```npm install -D sass```

```npm install -D scss```


### 按需引入element-plus

- 安装element-plus

```npm install element-plus```

- 在vite中按需引入
1. 使用 vite-plugin-style-import插件引入 .scss 样式

```npm install -D vite-plugin-style-import```
```ts
//vite.confing.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    })
  ]
})
```


2. 按需引入组件

新建element-config.ts文件。
```ts
import { App } from 'vue'
import { 
  ElButton, 
  ElSelect,
} from 'element-plus';

const components = [
  ElButton, 
  ElSelect,
]

const elOption = {
  size: 'small', 
  zIndex: 3000,
}

//用于vue使用插件形式全局注册组件
const elComponent = {
  install (app: App) {
    components.forEach(el => {
      app.component(el.name, ElButton);
    })
  }
}

export {
  elOption,
  elComponent,
}
```

在main.ts 中 :

调用 element-config.ts 导出的方法 实现 全局组件注册.

并引入'element-plus/packages/theme-chalk/src/base.scss'

设置语言环境为中文

```ts
//main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { locale } from 'element-plus';
import router from '@/router'
import {elOption, elComponent} from '@/config/element-config';
// 如果要使用.scss样式文件，则需要引入base.scss文件
import 'element-plus/packages/theme-chalk/src/base.scss'
//elementui默认语言为英文，需修改为中文。
import lang  from 'element-plus/lib/locale/lang/zh-cn'
locale(lang)

const app = createApp(App);
//设置默认尺寸
app.config.globalProperties.$ELEMENT = elOption

app.use(router)
.use(elComponent)
.mount('#app');
```


### 配置路径别名方便导入文件

- 在tsconfig.json 配置别名，用于引用文件是得到智能提示。
- 同时需要配置node声明文件，在vite.config.ts中会用到node的path模块，不配置node声明应用path模块会报错。

```npm install -D @types/node```
```ts
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["node"],
  },
}
```

- 在vite.config.ts中配置别名，用于打包后生成绝对路径。
```ts
import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
```

### 解决执行npm run build 打包构建项目时由于elemet-ui导致的报错 在tsconfig.json中加下面的配置
```"skipLibCheck": true, //第三方包不进行检查```
### 布局
此处省略。。。具体看项目源码