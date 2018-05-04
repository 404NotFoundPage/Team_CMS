<!-- 订单折线图 -->
<template>
  <div>
      <h3>订单数量折线图</h3>
      <div id="oLine"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return{
    }
  },

  components: {},

  computed: {},
  mounted(){
    this.drawoLine();
  },
   methods: {
        drawoLine(){
        let myorderline = this.$echarts.init(document.getElementById('oLine'))
        myorderline.setOption({
            title: { text: '数量' },
            tooltip: {},
            xAxis: {
                data: ['2017年12月','2018年01月','2018年02月','2018年03月','2018年04月']
            },
            yAxis: {},
            series: [
            {
              name:'数量',
              type:'line',
              data:[10,45,20,38,55,72,32,46,88,35,44,56,24],
              smooth:true,
              hoverAnimation:false,
              symbol:'rect',
              itemStyle:{
                normal:{
                  color:"pink"
                }
              },
              lineStyle:{
                normal:{
                  color:"pink",
                  type:"solid"
                }
              },
              areaStyle:{
                normal:{
                  color:"pink",
                  opacity:'0.3'
                }
              }
            }]
        });
    }
}
}
</script>
<style scoped>
#oLine{
  width:700px;
  height: 328px;
}
h3{
  /* margin-top:10px; */
  font-family: 微软雅黑;
  width: 700px;
}
</style>