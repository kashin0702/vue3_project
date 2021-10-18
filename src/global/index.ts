// 全局注册
import { App } from 'vue'
import registerProperties from './regitser-properties'

export function globalRegitser(app: App): void {
  app.use(registerProperties)
}