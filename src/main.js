import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import "@/assets/styles/reset.less"
import "@/network/request"
import router from "./router"
import store from "./store"
import "./permission"
import 'nprogress/nprogress.css'

import pagination from "./components/pagination.vue"
import upload from './components/upload.vue'
import image from './components/image.vue'

const app = createApp(App)
app.use(router);
app.use(store);
app.use(ElementPlus,{
    locale: zhCn
});

app.component("pagination",pagination)
app.component("upload",upload)
app.component("preImage",image)

app.mount('#app')
