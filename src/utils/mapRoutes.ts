import { RouteRecordRaw } from 'vue-router'
// 将menus映射成路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1. 先加载默认的所有Allroutes
  const allRoutes: RouteRecordRaw[] = []
  // 这个require是webpack内部定义的对象，获取文件路径
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 返回的routeFiles有一个keys()方法返回路径数组
  routeFiles.keys().forEach((key) => {
    console.log('我是路径', key)
    // 对路径进行切割，这里的require是comonJS的方法
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log('全路由对象', allRoutes)

  //2. 根据menus获取需要添加的routes
  //定义一个递归函数对menus进行遍历
  const reduceGetMenus = (menus: any[]) => {
    for (const menu of menus) {
      // 表示当前是最底层 添加路由
      if (menu.type === 2) {
        // userMenus的url和全路由的Path相等表示有该菜单权限，添加到动态路由中
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        reduceGetMenus(menu.children)
      }
    }
  }
  // 调用该递归
  reduceGetMenus(userMenus)

  return routes
}