export default [
  {
    path: '/',
    name: 'dashboard',
    component: require('components/Dashboard')
  },
  {
    path: '*',
    redirect: '/'
  }
]
