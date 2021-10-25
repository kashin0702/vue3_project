import type { Form } from '@/base-ui/ProForm/types'

export const searchFormConfig: Form = {
  formItems: [
    // 关键字段field 和formData[key]关联 实现双向绑定value
    {
      field: 'id',
      type: 'input',
      label: '用户id',
      placeholder: '请输入用户id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}