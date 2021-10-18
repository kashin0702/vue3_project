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
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '篮球', value: 1 },
        { label: '足球', value: 2 }
      ]
    },
    {
      field: 'createdTime',
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