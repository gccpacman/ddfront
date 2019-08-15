<template>
  <div class='container'>
    <div class="container" style="text-align: left;">
      <article>
        <p style="text-align: center;">
          <strong>命名规则</strong>
        </p>
        <p>
          每一条道路，都有它自己名字。像一个生命，有它的延续性。然而，给一座城市的每一条道路命名，不是一件简单的事情。
        </p>
        <p>
          因此，城市管理者在给马路起名字的时候往往会遵循一定的规则。仔细观察，不难发现其中的规律。
        </p>
        <p align="left">
          <img
            width="100%"
            src="../assets/district/第一张图.jpg"
          />
        </p>
        <p style="text-align: center;">
          <strong>地名</strong>
        </p>
        <p>
          为更方便记忆和利于管理，在英国领事麦特赫司脱的建议下，1862年，工部局重新命名英租界的马路，    <strong>南北向以中国省级地名命名，东西向则以中国城市地名命名</strong>。
        </p>
        <p>
          如南北方向的道路：新疆路、西藏路、云南路、广西路、四川路、浙江路、江西路、山西路、陕西路、江苏路、山东路、河南路、湖南路、贵州路、福建路。
        </p>
        <p>
          而东西走向的道路如：南京路、北京路、贵阳路、九江路、汉口路、福州路、延安路、南昌路。
        </p>
        <p align="left">
          <img
            width="100%"
            src="../assets/district/第二张图.jpg"
          />
        </p>
        <p>
          1949年以后，上海市对路名的设置，曾经有过统一的规定，    <strong>将上海各区与中国各个省区的方位，一一对应起来，并以各个省区所辖地的地名来命名</strong>。
        </p>
        <p>
          徐汇区处于上海市的西南部，对应着大西南的广西，那么，<strong>徐汇区的道路名称，大多取自广西下辖的各个县市</strong>
          。如南丹路、桂林路、柳州路、钦州路、田林路、桂平路、百色路……
        </p>
        <p>
          <strong>长宁区也在市西南位置，对应贵州地名</strong>
          ：镇宁路、遵义路、玉屏路、茅台路、娄山关路、威宁路、锦屏路、剑河路、平塘路、甘溪路、可乐路……
        </p>
        <p>
          而<strong>位于上海正东的浦东地区，原则上统一使用山东省地名</strong>
          ——崂山路、栖霞路、乳山路等；控江路到宝山地区位于上海东北，则统一使用中国东三省地名，如控江路、凤城路、靖宇路、打虎山路、长白路、图门路等。
        </p>
        <p align="left">
          <img
            width="100%"
            src="../assets/district/第三张图.jpg"
          />
        </p>
        <p style="text-align: center;">
          <strong>人名</strong>
        </p>
        <p>
          随着上海城区范围的扩展，新增的大小马路不计其数，全国各地现有的地名，大多都已被用来命名，于是    <strong>浦东张江高科技发展园区新建的道路，路名采用中外科学家的名字</strong>。且大致遵循以下的规律：
        </p>
        <p>
          <strong>横向（东西向）道路以中国古代著名科学家命名</strong>
          ，比如李冰路、华佗路、毕升路、祖冲之路、蔡伦路、张衡路、李时珍路、郭守敬路、沈括路……
        </p>
        <p>
          <strong>纵向（南北向）道路以外国著名科学家命名</strong>
          ，比如牛顿路、哈雷路、高斯路、居里路、爱迪生路、达尔文路、哥白尼路……
        </p>
        <p align="left">
          <img
            width="100%"
            src="../assets/district/第四张图.jpg"
          />
        </p>
        <p>
          行走在张江高科技发展园区，一不小心就可以偶遇牛顿，也可以邂逅蔡伦，古今中外的高科技人才汇聚于此，让这个高科技的“高地”变得名副其实。
        </p>
        <p>
          厦门大学传播学教授邹振东分析，《延禧攻略》的爆红原因是它满足了人们最迫切的心理：
        </p>
        <p style="text-align: center;">
          <strong>其他</strong>
        </p>
        <p>
          后来，闵行区出现了以植物的名字来命名的道路，如紫薇、银杏、黄桦、紫藤、百合花……长宁古北新区则以红宝石，蓝宝石，玛瑙……等名之。
        </p>
        <p>
          （此处插入Echart 动图）
        </p>
        <p>
          除去地名，上海市区还出现了一些以人名、植物、山川湖海、建筑物等命名的马路。（如上图示）
        </p>
        <p style="text-align: center;">
          <strong>新特点</strong>
        </p>
        <p>
          越来越多的马路，成为上海城市面貌大变样的标志之一，也呈现出了两个显著特点：
        </p>
        <p>
          一是随着宝山区、嘉定区、闵行区、浦东新区、松江区等新建区的设置，市区道路由老城区向新城区扩展；二是随着内环高架路、南北高架路的兴建，市区道路由地面向空中发展。
        </p>
      </article>
    </div>
    <div class="container">
      <div ref='chart' id='chart'></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

var option = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: false
  },
  dataset: {
    source: [
      [
        '城区',
        '浦东新区',
        '黄浦区',
        '徐汇区',
        '普陀区',
        '长宁区',
        '闵行区',
        '虹口区',
        '静安区'
      ],
      ['人名', 15, 3, 0, 0, 0, 0, 1, 0],
      ['建筑物', 1, 16, 2, 0, 1, 0, 0, 0],
      ['山川湖海', 7, 14, 5, 7, 3, 0, 7, 4],
      ['植物', 5, 2, 1, 1, 0, 2, 0, 0]
    ]
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 0,
      formatter: function (value) {
        var ret = ''
        var maxLength = 2
        var valLength = value.length
        var rowN = Math.ceil(valLength / maxLength)
        if (rowN > 1) {
          for (var i = 0; i < rowN; i++) {
            var temp = ''
            var start = i * maxLength
            var end = start + maxLength
            temp = value.substring(start, end) + '\n'
            ret += temp
          }
          return ret
        } else {
          return value
        }
      }
    }
  },
  yAxis: { gridIndex: 0 },
  grid: { top: '45%' },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      label: {
        formatter: '{b}: {@2012} ({d}%)'
      },
      encode: {
        itemName: '城区',
        value: '2012',
        tooltip: '2012'
      }
    }
  ]
}

export default {
  name: 'RelatedPlaceSankey',
  methods: {
    updateAxisPointer (event) {
      var xAxisInfo = event.axesInfo[0]
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1
        this.chart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        })
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(option)
    this.chart.on('updateAxisPointer', this.updateAxisPointer)
  },
  data () {
    return {
      chart: echarts.ECharts
    }
  }
}
</script>

<style scoped>
#chart {
  width: 100%;
  height: 500px;
}
</style>
