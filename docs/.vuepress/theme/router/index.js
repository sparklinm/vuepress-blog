import Layout from '../Layout'


const install = (Vue, { router }) => {
  const ru = ['/', '/:category', '/tag/', '/tag/:tag']
  const routes = []

  for (let i = 0, len = ru.length; i < len; i++) {
    routes.push({
      name: ru[i],
      path: ru[i],
      component: Layout
    })
  }

  router.addRoutes(routes)

}

export default {
  install
}
