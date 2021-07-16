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