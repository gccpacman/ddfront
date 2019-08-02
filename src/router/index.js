import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import FormCheck from '@/components/FormCheck'
import Road from '@/components/Road'
import BaiduMapDemo from '@/components/BaiduMapDemo'
import Index from '@/components/Index'
import EChartsDemo from '@/components/EChartsDemo'

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
      path: '/road/:id',
      component: Road
    },
    {
      path: '/baidumap/',
      name: 'BaiduMapDemo',
      component: BaiduMapDemo
    },
    {
      path: '/echarts/',
      name: 'EChartsDemo',
      component: EChartsDemo
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
      path: '/butter/blog/',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/butter/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    }
  ]
})
