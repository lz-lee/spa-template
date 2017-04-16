import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Test from '@/pages/test'
import star from '@/pages/star-rating'
import tree from '@/pages/tree'
import treelink from '@/pages/prov-city-tree'
import treetab from '@/pages/prov-city-county'
import pagination from '@/pages/pagination-view'
import csssecret from '@/pages/css-secrets'

import Frame from '@/components/frame'
import Login from '@/pages/common/login'
import ErrorPage from '@/pages/common/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '',
      component: Frame,
      children: [
        {
          path: '/hello',
          component: Hello
        },
        {
          path: '/test',
          component: Test
        },
        {
          path: '/star',
          component: star
        },
        {
          path: '/tree',
          component: tree,
          children: [
            {
              path: 'link',
              component: treelink
            },
            {
              path: 'tab',
              component: treetab
            }
          ],
        redirect: '/tree/link'
        },
        {
          path: '/cssSecret',
          component: csssecret
        },
        {
          path: '/pagination',
          component: pagination
        }
      ],
      redirect: '/hello'
    },
    {
      path: '*',
      component: ErrorPage,
      meta: {auth: false}
    }
  ]
})
