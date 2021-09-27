class localCache {
  setCache(key: string, value: any) {
    // loclStorage保存的value类型必须是字符串，所以用json.stringify转换
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    // 先判断有没有值
    const value = window.localStorage.getItem(key)
    // 有值的话再转化回obj, 若本身就是string的话不会有变化
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清空所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new localCache()
