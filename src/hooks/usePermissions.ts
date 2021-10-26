import { useStore } from '@/store'

// 获取用户权限
export function usePermissions(pageName: string, handleName: string): any { //入参页面名称和权限名称
  const store = useStore()
  const permissions = store.state.login.permissions
  // console.log('permissions', permissions)
  const verifyPermission = `system:${pageName}:${handleName}` // 拼接后台定义的权限名字
  console.log('verifyPermission', verifyPermission)
  return !!permissions.find((el: any) => el === verifyPermission) //转化成布尔值返回
}
