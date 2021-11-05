const propList = [
  { prop: 'name', label: '角色名', minWidth: '100', slotName: 'name' },
  { prop: 'intro', label: '角色介绍', minWidth: '100', slotName: 'intro' },
  { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  { label: '操作', minWidth: '250', slotName: 'buttons' }
]
const isShowIndex = true
const isShowSelect = true
const title = '角色列表'

export const tableContentConfig = {
  propList,
  isShowIndex,
  isShowSelect,
  title
}
