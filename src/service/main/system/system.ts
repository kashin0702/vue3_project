import ajax from '../../index'

export function getPageListData(url: string, queryInfo: any = {}): any {
  return ajax.post({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string, id: number): any {
  return ajax.delete({
    url: `/${url}/${id}`
  })
}

// 新增数据
export function addNewPageData(url: string, newdata: any = {}): any {
  return ajax.post({
    url: url,
    data: newdata
  })
}

// 编辑数据
export function editPageData(url: string, editdata: any = {}): any {
  return ajax.patch({
    url: url,
    data: editdata
  })
}
