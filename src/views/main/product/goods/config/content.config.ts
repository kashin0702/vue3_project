/* eslint-disable prettier/prettier */
const propList = [
  { prop: 'name', label: '商品名称', minWidth: '100' },
  { prop: 'oldPrice', label: '原价格', minWidth: '80' },
  { prop: 'newPrice', label: '优惠价格', minWidth: '80' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '100' },
  { prop: 'status', label: '状态', minWidth: '80', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' }
]
const isShowIndex = true
const isShowSelect = true
const title = '商品列表'

export const tableContentConfig = {
  propList,
  isShowIndex,
  isShowSelect,
  title
}
