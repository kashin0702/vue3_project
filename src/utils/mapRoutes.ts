import { RouteRecordRaw } from 'vue-router'

// 定义一个初始页面 用于定位到main页面时路由跳转
let firstMenu: any = null

// 动态路由核心方法:将menus映射成路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1. 先加载默认的所有Allroutes
  const allRoutes: RouteRecordRaw[] = []
  // 这个require是webpack内部定义的对象，context方法获取文件路径
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 返回的routeFiles有一个keys()方法返回路径数组
  routeFiles.keys().forEach((key) => {
    console.log('我是路径', key)
    // 对路径进行切割，这里的require是comonJS的方法
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log('完整路由对象', allRoutes)

  //2. 根据menus获取需要添加的routes
  //定义一个递归函数对menus进行遍历
  const reduceGetMenus = (menus: any[]) => {
    for (const menu of menus) {
      // 表示当前是最底层 添加路由
      if (menu.type === 2) {
        // userMenus的url和全路由的Path相等表示有该菜单权限，添加到动态路由中
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 第一个符合条件的路由的值给firstMenu，即显示第一个菜单
        if (!firstMenu) firstMenu = menu
      } else {
        reduceGetMenus(menu.children)
      }
    }
  }
  // 调用该递归
  reduceGetMenus(userMenus)

  return routes //返回动态路由
}


// 根据当前页面路径获取对应的Menu菜单 用于保存当前选中的菜单 可选参数面包屑数组
export function pathToMenu(userMenus: any[], currentPath: string, breadcrumbs?: any[]): any {
  for (const menu of userMenus) {
    // 如果type=1右侧不会有路由效果，所以要递归
    if (menu.type === 1) {
      // 这里对入参判断 递归 若不存在menu.children传空数组,防止报错
      const findMenu = pathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 给可选参数breadcrumbs添加面包屑数据
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
      // menu.url和传入的路径相等，表示是当前菜单 返回该菜单
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 把路径转化成面包屑
export function pathToBreadcrumb(userMenus: any[], currentPath: string): any {
  const breadcrumbs: any[] = []
  // 利用pathToMenu方法，传入breadcrumbs获取面包屑数组
  pathToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
// 导出第一个菜单 在路由守卫内使用
export { firstMenu }