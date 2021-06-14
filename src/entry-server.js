import createApp from './main'

// 测试非首屏渲染 
// 先访问about页面，再访问index

// 用于首屏渲染
// context有renderer传入
export default (context) => {
  return new Promise((resolve, reject) => {
    // 1.获取路由器和app实例
    const { app, router, store } = createApp(context)
    // 获取首屏地址
    router.push(context.url)
    router.onReady(() => {
      // 获取匹配路由数组的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用可能存在的`asyncData()`
      Promise.all(
        matchedComponents.map((Component) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            })
          }
        })
      ).then(() => {
        // 所有预取钩子 resolve 后，
        // store 已经填充入渲染应用所需状态
        // 将状态附加到上下文，且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML
        context.state = store.state
        resolve(app)
      })
      // resolve(app)
    }, reject)
  })
}
