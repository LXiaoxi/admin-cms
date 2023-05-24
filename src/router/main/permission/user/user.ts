const user = () => import('@/views/main/permission/user/user.vue')
export default {
  path: '/main/permission/user',
  name: 'user',
  component: user,
  children: []
}
