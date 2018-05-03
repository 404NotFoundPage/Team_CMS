<template>
  <div id="hello">
    <div class='content'>
      <div class='icon el-icon-document'></div>
      <div class='title'>内容管理</div>
      <!--<ul>-->
        <!--<li><router-link to="/index/ContentManagement/RecomForBur">爆款推荐</router-link></li>-->
        <!--<li class='li2'><router-link to="/index/ContentManagement/NewArrivals">新品推荐</router-link></li>-->
        <!--<li><router-link to="/index/ContentManagement/UserCase">用户案例</router-link></li>-->
      <!--</ul>-->
      <el-tabs v-model="activeName" class="contenttag" @tab-click="toggleTab">
        <el-tab-pane label="爆款推荐" name="first" ></el-tab-pane>
        <el-tab-pane label="新品推荐" name="second"></el-tab-pane>
        <el-tab-pane label="用户案例" name="third" ></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <router-view name="body"></router-view>
    </div>
  </div>
</template>

<script>
  import baokuan from './Content/RecomForBur'
  import xinping from './Content/NewArrivals'
  import anli from './Content/UserCase'
export default {
  name: 'ContentManagement',   //内容管理
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {  // 声明子组件
//    baokuan,
//    xinping,
//    anli
  },
  methods:{
    toggleTab: function(tab) {
      console.log(this.activeName);
      if(this.activeName=='first'){
        console.log("爆款")
        this.$router.push({path:'/index/ContentManagement/RecomForBur'});

      }else if(this.activeName=='second'){
        console.log("新品")
        this.$router.push({path:'/index/ContentManagement/NewArrivals'});

      }else if(this.activeName=='third'){
        console.log("用户案例")
        this.$router.push({path:'/index/ContentManagement/UserCase'});

      }
    }
  },
  created() {
    this.toggleTab();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	#hello{
		width: 1088px;
		height: 560px;
    margin-top: 30px;
    margin-left:230px;
		background-color: white;
	}
	#hello .content{
		width: 1088px;
		height: 42px;
		border-bottom: 1px solid #d6d6d6;
	}
	#hello .content .icon{
		width: 24px;
		height: 24px;
		float: left;
		margin: 13px 0 0px 30px;
    font-size: 18px;
		color: #088EC3;
    line-height: 24px;
	}
  .title{
    font-size: 18px;
    font-weight: 700;
  }
	#hello .content .title{
		/*width: 65px;*/
		height: 21px;
		float: left;
		margin: 10.5px 0 10.5px 5px;
		/*overflow: hidden;*/
		color: #088EC3;
	}
	#hello .content ul{
		float: left;
		margin: 14px 0 14px 80px;
		font-weight: 700;
	}
	#hello .content ul>li{
		list-style-type: none;
		font-size: 12px;
		float: left;
		padding: 0 15px	;
		height: 14px;
		cursor: pointer;
		position: relative;
	}
	#hello .content ul>li:after{
		content: "";
		width: 48px;
		height: 3px;
		background-color: #FF6C00;
		/*position: absolute;*/
		/*left:15px;*/
		/*bottom: -14px;*/
		display: none;
	}
	#hello .content ul .li2{
		border-left:1px solid white;
		border-right:1px solid white;
	}
  .contenttag{
    overflow: hidden;
  }
  .content:after{
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    clear: both;
  }

	.newArrival{
		width: 1088px;
		height: 528px;
	}
	.frame{
		width: 1088px;
		height: 86px;
	}
	.Button{
		width: 90px;
		height: 34px;
		color: white;
		background-color: #4F9ACD;
		float:left;
		line-height: 34px;
		transition: all .2s linear;
		cursor:pointer;
		margin: 26px 0 26px 0;
		text-align: center;
	}
	.Button:hover{
		background-color:#FF9000;
	}
	.tubiaoqian{
		padding-right: 5px;
	}
	.kubox{
		width:1050px;
		height: 56px;
		color: #224D83;
		margin-left: 20px;
		text-align: center;
		line-height: 56px;
		background-color: #F9F9F9;
	}
	.box{
		width: 1050px;
		margin-left: 20px;
	}
</style>
