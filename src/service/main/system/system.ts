import ajax from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return ajax.post({
    url: url,
    data: queryInfo
  })
}