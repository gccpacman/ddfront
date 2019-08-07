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
import SearchResult from '@/components/SearchResult'
import ArchitectureMap from '@/components/ArchitectureMap'

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
      path: '/search',
      name: 'Search',
      component: SearchResult
    },
    {
      path: '/architectures',
      name: 'ArchitecuteMap',
      component: ArchitectureMap
    },
    {
      path: '/road/:id',
      name: 'Road',
      component: Road
    },
    {
      path: '/architecture/:id',
      name: 'Architecture',
      component: Architecture
    },
    {
      path: '/demo/baidumap',
      name: 'BaiduMapDemo',
      component: BaiduMapDemo
    },
    {
      path: '/demo/echarts',
      name: 'EChartsDemo',
      component: EChartsDemo
    },
    {
      path: '/demo/echartsmap',
      name: 'EChartsMapDemo',
      component: EChartsMapDemo
    },
    {
      path: '/demo/echartsroad',
      name: 'EChartsRoadDemo',
      component: EChartsRoadDemo
    },
    {
      path: '/demo/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo/form',
      name: 'form-check',
      component: FormCheck
    },
    {
      path: '/butter/blogs',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/butter/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    },
    {
      path: '*',
      component: Index
    }
  ]
})
