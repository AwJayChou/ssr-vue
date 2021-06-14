import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import { createStore } from './store'
Vue.config.productionTip = false

// 仅仅在首屏才会进行服务端渲染
// 非首屏 需要手动执行
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
})
// 需要返回一个应用程序工厂: 返回Vue实例和Router实例、Store实例
export default function createApp(context) {
  // 处理首屏，就要先处理路由跳转
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context,
    render: (h) => h(App),
  })
  return { app, router, store }
}
