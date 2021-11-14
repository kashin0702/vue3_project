import ajax from '../../index'

enum dashboardURL {
  categoryCount = '/goods/category/count',
  categorySale = '/goods/category/sale',
  categoryFavor = '/goods/category/favor',
  addressSale = '/goods/address/sale'
}

export function getCatgoryGoodsCount(): any {
  return ajax.get({
    url: dashboardURL.categoryCount
  })
}
export function getCatgoryGoodsSale(): any {
  return ajax.get({
    url: dashboardURL.categorySale
  })
}
export function getCatgoryGoodsFavor(): any {
  return ajax.get({
    url: dashboardURL.categoryFavor
  })
}
export function getAddressSale(): any {
  return ajax.get({
    url: dashboardURL.addressSale
  })
}
