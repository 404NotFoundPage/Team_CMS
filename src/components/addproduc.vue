<template>
  <div id="addproduc_box">
    <div class="addproduc_fbox">
      <p><span>&#xe67b;</span>添加商品</p>
    </div>
    <table border="1" cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
        <td class="firstlie">商品名称:</td>
        <td class="secondlie"> <input type="text" v-model="shopdata.addshopname"></td>
      </tr>
      <tr>
        <td class="firstlie">商品编号:</td>
        <td class="secondlie"><input type="text" v-model="shopdata.addshopid"></td>
      </tr>
      <tr>
        <td class="firstlie">商品类型:</td>
        <td class="secondlie">
          <select  v-model="shopdata.shopclass" name="" id="splxsx">
            <option value="1">花瓶</option>
            <option value="2">茶具</option>
            <option value="3">摆件</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="firstlie">入库时间:</td>
        <td class="secondlie"><input v-model="shopdata.shopdate" type="text"></td>
      </tr>
      <tr>
        <td class="firstlie">商品规格:</td>
        <td class="secondlie"><input  v-model="shopdata.shopsize" type="text"></td>
      </tr>
      <tr>
        <td class="firstlie">供货量:</td>
        <td class="secondlie"><input  v-model="shopdata.shopnum" type="text"></td>
      </tr>
      <tr>
        <td class="firstlie">商品单价:</td>
        <td class="secondlie"><input  v-model="shopdata.shopmu" type="text"></td>
      </tr>
      <tr>
        <td class="firstlie">是否爆款:</td>
        <td class="secondlie">
          <select v-model="shopdata.isHot" name="" id="spbk">
            <option value="0">是</option>
            <option value="1">否</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="firstlie">是否新品:</td>
        <td class="secondlie"><p>是</p></td>
      </tr>
      <tr>
        <td class="firstlie">商品折扣:</td>
        <td class="secondlie"><input v-model="shopdata.shopzk" type="text"></td>
      </tr>
      <tr>
        <td class="firstlie" id="adddqtp">添加图片:</td>
        <td class="adddqtp1">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            v-model="shopdata.addshopimg">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </td>
      </tr>
      <tr>
        <td class="firstlie" id="adddqms">添加描述:</td>
        <td>
          <textarea name="" id="adddqms1" v-model="shopdata.addshoptext" cols="30" rows="10" placeholder="添加当前商品描述......"></textarea>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="lastbtn_box">
      <button class="left_baocun" @click="open">保存</button>
      <button class="right_chongzhi" @click="Eliminate">重置</button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
    export default {
        name: "addproduc",
        data: function () {
            return {
              //图片添加框
              dialogImageUrl: '',
              dialogVisible: false,
              shopdata:{
                addshopname:"",//商品名称
                addshopid:"",  //商品编号
                shopclass:"",  //商品类型
                shopdate:"",   //入库时间
                shopsize:"",   //商品规格
                shopnum:"",    //供货量
                shopmu:"",     //商品单价
                isHot:"",      //是否爆款
                isnew:"1",     //是否爆款
                shopzk:"",     //商品折扣
                addshopimg:"",// 添加图片
                addshoptext:"",//商品描述
              },
            }
        },
        methods:{
          postAxiosaddProduct:function () {
            //其他商品信息
            var postData =qs.stringify({
              pro_name: addshopname,
              pro_id:addshopid,
              pro_type_id:shopclass,
              pro_storetime:shopdate,
              pro_size:shopsize,
              pro_amount:shopnum,
              pro_price:shopmu,
              pro_hot:isHot,
              pro_discount:shopzk,
            });
            //商品内容描述
            var postmiaos = qs.stringify({
              pro_text_discribe:addshoptext,
            })
            //商品添加图片
            var postaddimg = qs.stringify({
              pro_img_url:addshopimg,
            })
            //其他商品信息
            this.$axios.post('http://localhost:9999/addProduct.do',postData)
              .then(function (resp) {
                console.log(resp)
              }).catch(function (err) {
              console.log(err)
            }),
            //商品内容描述
            this.$axios.post('http://localhost:9999/addProductText.do',postmiaos)
              .then(function (resp) {
                console.log(resp)
              }).catch(function (err) {
              console.log(err)
            }),
            //商品添加图片
            this.$axios.post('http://localhost:9999/addProductImg.do',postaddimg)
              .then(function (resp) {
                console.log(resp)
              }).catch(function (err) {
              console.log(err)
            })
          },
          open(){
            console.log(this.shopdata)
          },
          //重置
          Eliminate(){
            this.shopdata={
              addshopname:"",//商品名称
                addshopid:"",  //商品编号
                shopclass:"",  //商品类型
                shopdate:"",   //入库时间
                shopsize:"",   //商品规格
                shopnum:"",    //供货量
                shopmu:"",     //商品单价
                isHot:"",      //是否爆款
                isnew:"1",     //是否爆款
                shopzk:"",     //商品折扣
                addshopimg:"",// 添加图片
                addshoptext:""//商品描述
            }
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          }
        },
    }
</script>

<style scoped>
    @font-face {
      font-family: 'iconfont';  /* project id 642232 */
      src: url('//at.alicdn.com/t/font_642232_khkxnn5bg31k0529.eot');
      src: url('//at.alicdn.com/t/font_642232_khkxnn5bg31k0529.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_642232_khkxnn5bg31k0529.woff') format('woff'),
      url('//at.alicdn.com/t/font_642232_khkxnn5bg31k0529.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_642232_khkxnn5bg31k0529.svg#iconfont') format('svg');
    }
    #addproduc_box{
      width:1090px;
      height: 1100px;
      outline: 1px solid red;
    }
    .addproduc_fbox{
      width: 1090px;
      height: 43px;
      border-bottom: 1px solid #8c8c8c;
    }
    .addproduc_fbox>p{
      font-family: iconfont;
      color:#0078A8;
      line-height: 43px;
      margin-left: 20px;
    }
    .addproduc_fbox>p>span{
      color:#2DA3D1;
      margin:0 10px 0 0;
    }
    table{
      width: 1050px;
      height:500px;
      border: 1px solid #f6f6f6;
      margin:20px 0 0 20px;
    }
    .firstlie{
      width: 180px;
      text-align: right;
      background-color: #f9f9f9;
    }
    input {
      width: 260px;
      height: 29px;
      border-radius: 3px;
      margin-left: 10px;
      padding: 0;
      border: 1px solid silver;
    }
    .secondlie{
      height: 55px;
    }
    .secondlie>p{
      margin-left: 10px;
      font-size: 13px;
    }

    /*商品类型筛选*/
    #splxsx{
      width: 264px;
      height: 35px;
      margin-left: 10px;
      border: 1px solid silver;
      border-radius: 3px;
    }

    /*商品是否为爆款*/
    #spbk{
      width: 264px;
      height: 35px;
      margin-left: 10px;
      border: 1px solid silver;
      border-radius: 3px;
    }

    /*按钮添加图片*/
    .adddqtp1{
      padding: 0 0 0 15px;
    }
    #adddqtp{
      height: 179px;
    }

    #adddqms{
      height:179px;
      text-align: right;
    }
    /*商品描述框*/
    #adddqms1{
      width: 831px;
      height: 160px;
      margin: 7px 0 0 15px;
      border-radius: 3px;
    }

    .lastbtn_box{
      margin-top: 25px;
    }

    /*保存*/
    .left_baocun{
      width: 90px;
      height: 34px;
      border-radius: 3px;
      background-color: #ff9600;
      border: none;
      margin-left: 390px;
    }
    .left_baocun:hover{
      background-color: #ff7800;
    }
    /*重置*/
    .right_chongzhi{
      width: 90px;
      height: 34px;
      border-radius: 3px;
      background-color: #ff9600;
      border: none;
      margin-left: 5px;
    }
    .right_chongzhi:hover{
      background-color: #ff7800;
    }
</style>
