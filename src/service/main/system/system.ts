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
