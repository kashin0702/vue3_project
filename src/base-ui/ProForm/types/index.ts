type IType = 'input' | 'password' | 'select' | 'datepicker'

export interface FormItem {
  type: IType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}