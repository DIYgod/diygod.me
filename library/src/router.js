import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import About from '@/components/About'
import Video from '@/components/Video'

Vue.use(Router)

const router = new Router({
    routes: [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
        meta: {
          name: '关于'
        }
    },
    {
        path: '/video/:id',
        component: Video,
        props: true
    },
  ]
})

router.afterEach(route => {
  if (route.meta) {
    document.title = route.meta.name ? `${route.meta.name} | DIYgod 的媒体库` : 'DIYgod 的媒体库'
  }
})

export default router
