import { App } from 'vue'
import moment from 'moment'

const DATA_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function registerProperties(app: App) {
  // 调用app.config.globalProperties属性
  // 给该属性附加一个$filters属性，在里面添加各种过滤方法
  app.config.globalProperties.$filters = {
    formatUTCTime(utcTime: any, format: string = DATA_FORMAT) {
      const local = moment.utc(utcTime)
      const localTime = moment(local).format(format)
      return localTime
    }
  }
}