export default [{
  path: '/viewCalendar',
  component: () => import('@/components/ViewCalendar/Index'),
  meta: {
    keepAlive: true
  }
},{
  path: '/viewCalendar/detail',
  component: () => import('@/components/ViewCalendar/Detail'),
  meta: {
    keepAlive: true
  }
}]
