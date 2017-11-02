export default [{
  path: '/viewCalendar',
  component: () => import('@/components/ViewCalendar/Index')
},{
  path: '/viewCalendar/detail',
  component: () => import('@/components/ViewCalendar/Detail')
}]
