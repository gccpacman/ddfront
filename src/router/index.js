import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import BlogHome from '@/components/BlogHome'
// import BlogPost from '@/components/BlogPost'
// import FormCheck from '@/components/FormCheck'
// import BaiduMapDemo from '@/components/BaiduMapDemo'
// import EChartsDemo from '@/components/EChartsDemo'
// import EChartsMapDemo from '@/components/EChartsMapDemo'
// import EChartsRoadDemo from '@/components/EChartsRoadDemo'
import Road from '@/components/Road'
import Architecture from '@/components/Architecture'
import History from '@/components/History'
import BigShanghai from '@/components/BigShanghai'
import RoadNameDetail from '@/components/RoadNameDetail'
import RoadNameFun from '@/components/RoadNameFun'
import Rent from '@/components/Rent'
import Index from '@/components/Index'
import SearchResult from '@/components/SearchResult'
import ArchitectureMap from '@/components/ArchitectureMap'
import DistrictChart from '@/components/DistrictChart'
import RelatedPlaceMap from '@/components/RelatedPlaceMap'
import RelatedPlaceSankey from '@/components/RelatedPlaceSankey'

Vue.use(Router)

export default new Router({
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
      path: '/relatedplacesmap',
      name: 'RelatedPlaceMap',
      component: RelatedPlaceMap
    },
    {
      path: '/relatedplacesankey',
      name: 'RelatedPlaceSankey',
      component: RelatedPlaceSankey
    },
    {
      path: '/architecturesmap',
      name: 'ArchitecuteMap',
      component: ArchitectureMap
    },
    {
      path: '/districtchart',
      name: 'DistrictChart',
      component: DistrictChart
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
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/rent',
      name: 'Rent',
      component: Rent
    },
    {
      path: '/bigshanghai',
      name: 'BigShanghai',
      component: BigShanghai
    },
    {
      path: '/roadnamedetail',
      name: 'RoadNameDetail',
      component: RoadNameDetail
    },
    {
      path: '/roadnamefun',
      name: 'RoadNameFun',
      component: RoadNameFun
    }
    // ,
    // {
    //   path: '/demo/baidumap',
    //   name: 'BaiduMapDemo',
    //   component: BaiduMapDemo
    // },
    // {
    //   path: '/demo/echarts',
    //   name: 'EChartsDemo',
    //   component: EChartsDemo
    // },
    // {
    //   path: '/demo/echartsmap',
    //   name: 'EChartsMapDemo',
    //   component: EChartsMapDemo
    // },
    // {
    //   path: '/demo/echartsroad',
    //   name: 'EChartsRoadDemo',
    //   component: EChartsRoadDemo
    // },
    // {
    //   path: '/demo/hello',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/demo/form',
    //   name: 'form-check',
    //   component: FormCheck
    // },
    // {
    //   path: '/butter/blogs',
    //   name: 'blog-home',
    //   component: BlogHome
    // },
    // {
    //   path: '/butter/blog/:slug',
    //   name: 'blog-post',
    //   component: BlogPost
    // }
  ]
})
