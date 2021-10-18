type IType = 'input' | 'password' | 'select' | 'datepicker'

export interface FormItem {
  type: IType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  field?: any
}

export interface Form {
  formItems: FormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
