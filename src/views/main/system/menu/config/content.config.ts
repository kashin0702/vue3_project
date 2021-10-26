/* eslint-disable prettier/prettier */
const propList = [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60'},
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单图标', minWidth: '60' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { label: '操作', minWidth: '200', slotName: 'buttons' }
  ]
  const isShowIndex = false
  const isShowSelect = false
  const title = '菜单列表'
  
  // table列展开的数据配置在这里
  const childrenProps = {
      rowKey: 'id',
      treeProps: {
          children: 'children'
      }
  }

  export const tableContentConfig = {
    propList,
    isShowIndex,
    isShowSelect,
    title,
    childrenProps
  }