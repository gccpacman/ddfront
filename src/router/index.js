import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import FormCheck from '@/components/FormCheck'
import BaiduMapDemo from '@/components/BaiduMapDemo'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/baidumap/',
      name: 'BaiduMapDemo',
      component: BaiduMapDemo
    },
    {
      path: '/hello/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/form/',
      name: 'form-check',
      component: FormCheck
    },
    {
      path: '/blog/',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    }
  ]
})
