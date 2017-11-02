export default [{
  path: '/statistics',
  component: () => import('@/components/Statistics/Index')
},{
  path: '/statistics/month',
  component: () => import('@/components/Statistics/checkMonthPrice')
},{
  path: '/statistics/year',
  component: () => import('@/components/Statistics/checkYearPrice')
}]
