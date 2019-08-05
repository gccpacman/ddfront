import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import FormCheck from '@/components/FormCheck'
import Road from '@/components/Road'
import Architecture from '@/components/Architecture'
import BaiduMapDemo from '@/components/BaiduMapDemo'
import Index from '@/components/Index'
import EChartsDemo from '@/components/EChartsDemo'
import EChartsMapDemo from '@/components/EChartsMapDemo'
import EChartsRoadDemo from '@/components/EChartsRoadDemo'

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
      path: '/architecture/:id',
      component: Architecture
    },
    {
      path: '/demo/baidumap/',
      name: 'BaiduMapDemo',
      component: BaiduMapDemo
    },
    {
      path: '/demo/echarts/',
      name: 'EChartsDemo',
      component: EChartsDemo
    },
    {
      path: '/demo/echartsmap/',
      name: 'EChartsMapDemo',
      component: EChartsMapDemo
    },
    {
      path: '/demo/echartsroad/',
      name: 'EChartsRoadDemo',
      component: EChartsRoadDemo
    },
    {
      path: '/demo/hello/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo/form/',
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
