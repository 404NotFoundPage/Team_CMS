<template>
  <div id="hello">
    <div class='content'>
      <div class='icon '>&#xe656;</div>
      <div class='title'>内容管理</div>
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

  },
  methods:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 642232 */
    src: url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.eot');
    src: url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.woff') format('woff'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.svg#iconfont') format('svg');
  }
	*{
		margin: 0;
		padding: 0;
	}
  .icon{
    font-family: iconfont;
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
		margin: 12px 0 0px 30px;
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
		height: 60px;
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
		margin: 11px 0 15px 0;

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
