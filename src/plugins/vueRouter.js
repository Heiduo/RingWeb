import router from '@/router/index'
import '@/router/routerGuard'

export default (app) => {
  app.use(router)
}
