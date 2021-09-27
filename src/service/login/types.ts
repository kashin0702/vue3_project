export interface Account {
  name: string
  password: string
}

// 返回的数据类型
export interface LoginResult {
  id: number
  name: string
  token: string
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}
export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}

export interface UserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}

// 返回数据中data的类型 不能写死 可能是各种类型
export interface DataType<T = any> {
  code: number
  data: T
}
