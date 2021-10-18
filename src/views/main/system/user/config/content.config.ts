/* eslint-disable prettier/prettier */
const propList = [
  { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
  { prop: 'realname', label: '真实姓名', minWidth: '100', slotName: 'realname' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100', slotName: 'cellphone' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'enable' },
  { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  { label: '操作', minWidth: '200', slotName: 'buttons' }
]
const isShowIndex = true
const isShowSelect = true
const title = '用户列表'

export const tableContentConfig = {
  propList,
  isShowIndex,
  isShowSelect,
  title
}