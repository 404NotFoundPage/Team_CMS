<!-- 主页面最新用户 -->
<template>
  <div id="newuser">
    <h5><span></span>最新用户</h5>
    <hr>
    <ul>
      <li v-for='item in reslist'>
        <img class='imgs' :src="'./../../../static/'+item.user_pic"/>
        <p>{{item.user_name | readMore(7,'..')}}</p>
        <span>{{item.user_birth}}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs'
  export default {
    data () {
      return {
        list:[
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'},
          {name:'krystal',imgurl:'static/user1.jpeg'},
          {name:'jimin',imgurl:'static/user2.jpg'}
        ],
        reslist:[]
      };
    },
    filters:{
      readMore:function(text,length,suffix){
        if(text.length>7){
          return text.substring(0,length)+suffix
        }else{
          return text
        }
      }
    },
    mounted(){
      this.getUserData()
    },
    methods:{
      getUserData: function () {
        let postData=qs.stringify({
          current:1,
          size:8
        })
        let _this=this;
        this.$axios.post('http://localhost:9999/user.do',postData).then(function (res) {
          let data = res.data.items
          for(let i=0;i<data.length;i++){
            let str = data[i]["user_birth"].substring(0, 10);
            data[i]["user_birth"] = str.split('T').toString().replace(/,/, ' ');
          }
          console.log(res.data.items)
          if(res.data){
            _this.reslist = res.data.items;
          }
        }, function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .imgs{
    width:45px;
    height:45px;
    border-radius: 40px;
    float: left;
  }
  ul>li{
    list-style: none;
    float: left;
    width: 145px;
    height: 45px;
    padding:5px;
    border: 1px solid #e9e9e9;
    margin-top:3px;
    margin-left:21px;
    margin-bottom: 15px;
    font-size: 12px;
    text-align: left;
  }
  ul>li:nth-child(1){
    margin-left: 20px;
  }
  ul li p{
    float: left;
    margin-left: 8px;
    margin-top:8px;
  }
  ul li span{
    float: left;
    margin-left: 8px;
    margin-top: 5px;
    color: rgb(187, 187, 187);
  }
  #newuser{
    clear: both;
    overflow: hidden;
    width: 1088px;
    background-color:rgba(255, 255, 255, 1);
    /* border-radius: 10px; */
    height: 96px;

    /* border: 1px solid red; */
  }
  h5{
    text-align: left;
    padding-left: 20px;
    padding-top:8px;
  }
  hr{
    border: white 1px solid
  }
</style>
