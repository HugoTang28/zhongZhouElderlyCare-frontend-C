import { createSSRApp } from 'vue'
import App from './App.vue'
import zzPlaceholder from '@/components/zz-placeholder/zz-placeholder.vue'

export function createApp() {
  const app = createSSRApp(App)
  // 全局注册占位组件，确保 uni-app 编译器将其产出到产物中，
  // 供 app.json 的 componentPlaceholder（用时注入）解析使用。
  app.component('zz-placeholder', zzPlaceholder)
  return { app }
}
