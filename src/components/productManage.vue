<template>
      <!-- 商品详情模块 -->
    <div class="div1">
      <!-- 头部 -->
        <header>
          <div class="spxq">
              <h1><span>&#xe76f;</span> 商品详情 </h1>
          </div>
          <div class="hx"></div>
        </header>
        <!-- 内容 -->
        <section>
            <div class="section1">
              <!-- 搜索框 -->
              <el-input placeholder="商品名称" v-model="proName" style="width:170px;margin-left:-660px;margin-top:5px;font-size: 12px;" clearable ></el-input>
              <el-select v-model="proCondition" clearable placeholder="状态选择" style="margin-left:5px;width:170px;font-size: 12px;">
                <el-option label="生存" value="0"></el-option>
                <el-option label="死亡" value="1"></el-option>
              </el-select>
            <!-- 搜索按钮 -->
            <div class="anniu" @click="search()">搜索</div>
            <!-- 重置按钮 -->
            <div class="anniu2" @click="reset()">重置</div>
            <!-- 第二个线条 -->
            <div class="hx2"></div>
            <!-- 添加按钮 -->
            <div class="tianjia" @click="tankuang()">
             <i class="el-icon-circle-plus-outline" ></i> 添加
             </div>
             <!-- 删除 -->
             <div class="delete" @click="Delete()"><i class="el-icon-edit-outline" ></i>删除</div>
             <!-- 表格部分 -->
            <el-table :data="list.items"  stripe border style="width:100%;margin-left:20px;font-size:14px;margin-top:50px" >
              <el-table-column  label="编号"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_id}}</template>
              </el-table-column>
              <el-table-column   label="商品名称"  width="120px" >
              <template slot-scope="scope">{{scope.row.pro_name}}</template>
              </el-table-column>
              <el-table-column  label="图片" width="165" >
              <template slot-scope="scope">{{scope.row.pro_img_url}}</template>
              </el-table-column>
              <el-table-column   label="爆款"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_bao}}</template>
              </el-table-column>
              <el-table-column  label="新旧"  width="50" >
              <template slot-scope="scope">{{scope.row.pro_new}}</template>
              </el-table-column>
              <el-table-column   label="规格" width="70" >
              <template slot-scope="scope">{{scope.row.pro_size}}</template>
              </el-table-column>
              <el-table-column   label="供货量"  width="65">
              <template slot-scope="scope">{{scope.row.pro_amount}}</template>
              </el-table-column>
              <el-table-column label="折扣" width="60">
                <template slot-scope="scope">{{scope.row.pro_discount}}</template>
              </el-table-column>
              <el-table-column  label="成本价格" width="80" >
               <template slot-scope="scope">{{scope.row.pro_price}}</template>
              </el-table-column>
              <el-table-column  label="成交量" width="74">
               <template slot-scope="scope">{{scope.row.pro_deal_amount}}</template>
              </el-table-column>
              <el-table-column label="添加日期" width="100" >
               <template slot-scope="scope">{{addtime[scope.$index]}}</template>
              </el-table-column>
              <el-table-column label="状态" width="64" >
              <template slot-scope="scope">{{scope.row.pro_condition}}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="chakan(scope.row)" type="text" size="small">查看</el-button>
                  <el-button @click="editproduct(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div id="page">
              <el-pagination  background :page-size="5"
              @current-change='handleCurrentChange' layout="prev, pager, next" :total="totalnum.num"></el-pagination>
            </div>
          </div>
        </section>
        <!-- 添加按钮部分 -->
      <div id="beijing" v-show="isShow">
        <div id="tjbd">
          <!-- :rules="rules" ref="ruleForm"  -->
          <!-- :model="" -->
          <el-form :inline="true" :model="addData" label-width="100px">
                <div style=" margin-top: 20px;">添加商品</div>
                <el-form-item label="商品名称" style=" margin-top: 20px;">
                  <el-input v-model="addData.pro_name"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" >
                  <el-input v-model="addData.pro_size"></el-input>
                </el-form-item>
                <el-form-item label="供货量" >
                  <el-input v-model="addData.pro_amount"></el-input>
                </el-form-item>
                 <el-form-item label="折扣"  >
                   <el-input v-model="addData.pro_discount"></el-input>
                   </el-form-item>
                <el-form-item label="成本价格"  >
                   <el-input v-model="addData.pro_price"></el-input>
                   </el-form-item>
                <el-form-item label="创建时间" required>
                  <el-col :span="21">
                    <el-form-item>
                      <el-date-picker type="date"  v-model="addData.pro_storetime" placeholder="选择日期" style="margin-left:10px;width:200px;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="爆款状态" >
                  <el-select placeholder="请选择" v-model="addData.pro_bao" style="width:90px;">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="新旧状态">
                  <el-select  placeholder="请选择"  v-model="addData.pro_new" style="width:90px;">
                    <el-option label="新款" value="1"></el-option>
                    <el-option label="旧款" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品状态">
                  <el-select placeholder="请选择"  v-model="addData.pro_condition"  style="width:100px;">
                    <el-option label="生存" value="0"></el-option>
                    <el-option label="死亡" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="添加图片" required style=" margin-left:18px;">
                  <el-col :span="21">
                    <el-form-item v-model="addData.pro_img_url">
                      <td class="">
                        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
                        <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-change="changeFile">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                      </td>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <br>
                 <el-form-item>
                    <el-button type="primary" @click="addproduct()">创建</el-button>
                    <el-button @click="tankuang()">取消</el-button>
                  </el-form-item>
              </el-form>
        </div>
        </div>
    <!-- 编辑按钮部分 -->
      <div id="beijing2" v-show="isShow2">
        <div id="tjbd2">
          <el-form :inline="true" v-model="editData" label-width="100px" class="demo-ruleForm">
                <div style=" margin-top: 20px;">编辑商品</div>
                <el-form-item label="商品名称" style=" margin-top: 20px;">
                  <el-input v-model="editData.pro_name"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" style="margin-top: 20px;">
                  <el-input v-model="editData.pro_size" ></el-input>
                </el-form-item>
                <el-form-item label="供货量">
                  <el-input v-model="editData.pro_amount"></el-input>
                </el-form-item>
                 <el-form-item label="折扣">
                   <el-input v-model="editData.pro_discount"></el-input>
                   </el-form-item>
                <el-form-item label="成本价格">
                   <el-input v-model="editData.pro_price"></el-input>
                   </el-form-item>
                <el-form-item label="成交量">
                   <el-input v-model="editData.pro_deal_amount"></el-input>
                   </el-form-item>
                <el-form-item label="创建时间">
                  <el-col :span="21">
                    <el-form-item>
                      <el-date-picker type="date" v-model="currentRow.pro_storetime" placeholder="选择日期" style="width:202px;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="爆款状态"  style="margin-left:-10px;">
                  <el-select placeholder="请选择" v-model="currentRow.pro_bao"  style="width:202px;">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="新旧状态" >
                  <el-select  placeholder="请选择" v-model="currentRow.pro_new" style="width:202px;">
                    <el-option label="新款" value="1"></el-option>
                    <el-option label="旧款" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品状态">
                  <el-select  placeholder="请选择"  v-model="currentRow.pro_condition" style="width:202px;">
                    <el-option label="生存" value="0"></el-option>
                    <el-option label="死亡" value="1"></el-option>
                  </el-select>
                </el-form-item><br>
                 <el-form-item>
                    <el-button type="primary" @click="update()">立即更新</el-button>
                    <el-button @click="edit()">取消</el-button>
                  </el-form-item>
              </el-form>
        </div>
        </div>
    </div>
</template>
<script>
import qs  from 'qs'
export default {
  name: "",
  data() {
    return {
      list:[],//数据库中获取的数据
      totalnum:{},//数据库中数据总量
      current:1 ,//当前页码
      isShow:false,
      isShow2:false,
      proCondition:null,
      proName:'',
      imageUrl:'',
      checkedlist:[{checked:false},{checked:false},{checked:false},{checked:false},{checked:false}],
      //图片添加框
      dialogImageUrl: '',
      dialogVisible: false,
      currentSearch:1,//搜索列表页面
      currentRow:{},//选中行
      currentRowIndex:'',//当前行的编号
      checkboxchecked:[false,false,false,false,false],//默认的所有复选框都未选中
      addData:{
        pro_name:"",//商品名称
        pro_id:"",  //商品编号
        pro_type:"",  //商品类型
        pro_storetime:"",   //入库时间
        pro_size:"",   //商品规格
        pro_amount:"",    //供货量
        pro_price:"",     //商品单价
        pro_bao:"",        //是否爆款
        pro_new:"1",       //是否新品
        pro_discount:"",     //商品折扣
        pro_img_url:"",    // 添加图片
        pro_info:"",       //商品描述
        pro_condition:""   //商品状态
      },
      editData:{
        pro_name:"",//商品名称
        pro_id:"",  //商品编号
        pro_type:"",  //商品类型
        pro_storetime:"",   //入库时间
        pro_size:"",   //商品规格
        pro_amount:"",    //供货量
        pro_price:"",     //商品单价
        pro_bao:"",        //是否爆款
        pro_new:"1",       //是否新品
        pro_discount:"",     //商品折扣
        pro_img_url:"",    // 添加图片
        pro_info:"",       //商品描述
        pro_condition:""   //商品状态
      },
      addtime:[],
      };
    },
    components: {},
    mounted() {
      this.gettotalData()
      this.getData()
    },
    methods: {
      chakan(obj){   //查看
        console.log(obj);
      },
      reset(){  //重置搜索框
        this.proCondition='';
        this.proName='';
      },
      editproduct(index,row){//编辑
        this.isShow2=true;
        console.log(row);
        this.editData=row;

      },
      edit(){
        this.isShow2=false;
      },
      handleCurrentChange(val){
        this.current=val;
        this.getData();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      gettotalData:function(obj){//获取数据总量
        var _this=this;
        this.$axios.post('http://localhost:9999/getProductNum.do')
        .then(function(res){
//          console.log(res.data.items[0])
            _this.totalnum=res.data.items[0];
//            console.log(_this.totalnum)
        }).catch(function(err){
            console.log(err)
        })
      },
      getData:function(){//获取当前页数据
        var _this=this;
        let postData=qs.stringify({
          size:5,
          current:_this.current
        })
        this.$axios.post('http://localhost:9999/productDetails.do',postData)
        .then(function(res){
          for(var i=0;i<res.data.items.length;i++){
            var imgurl=(res.data.items[i].pro_img_url).split(',')
            res.data.items[i].pro_img_url=imgurl[0]
            var time=(new Date(res.data.items[i].pro_storetime))
            _this.addtime.push(_this.formatDate(time))
          }
          _this.list=res.data;
        }).catch(function(err){
            console.log(err)
        })
      },
      addproduct(){//新增商品
        console.log(this.addData)
      },
      Delete(){
        var j=0;
        for(var i=0;i<this.checkboxchecked.length;i++){
          if(this.checkboxchecked[i]==true){
            j++;
          }
        }
        if(j==0){
          let str1="请选择需要删除的数据"
          this.alert(str1)
        }else if(j==1){
          this.handleDelete()
        }else if(j>1){
          let str2="选择数据过多，请选择一条数据"
          this.alert(str2)
        }
      },
      handleDelete(){//删除商品
        let _this=this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
        for(var i=0;i<_this.list.items.length;i++){
          if(_this.checkboxchecked[i]==true){
            let postData=qs.stringify({
              pro_id:this.list.items[i].pro_id
            })
            _this.$axios.post('http://localhost:9999/deleteProduct.do',postData)
            .then(function(res){
            if(res.data.flag==1){
                _this.Message('success','删除成功！')
                _this.current=1;
                _this.getData();
                _this.gettotalData();
                _this.initChecked()
            }else{
                _this.getData();
                _this.Message('success','删除失败！')
            }
            _this.initChecked();
            }).catch(function(err){
                console.log(err)
            })
          }
        }

        }).catch(() => {
            _this.Message('info','取消删除！')
        });

      },
      initChecked(){//对复选框进行初始化
        this.checkboxchecked=[false,false,false,false,false]
        for(var i=0;i<this.checkedlist.length;i++){
          this.checkedlist[i].checked=false;
        }
      },
      Message(type1,message1){//操作的提示
          this.$message({
              type: type1,
              message:message1
          });
      },
      search(){
            let postData=qs.stringify({
              pro_condition:this.proCondition,
              pro_name:this.proName,
              size:5,
              current:this.currentSearch
            });
            let _this=this;
            this.$axios.post('http://localhost:9999/searchProduct.do',postData)
            .then(function(res){
              if(res.data.flag==1){
                for(var i=0;i<res.data.items.length;i++){
                  var imgurl=(res.data.items[i].pro_img_url).split(',')
                  res.data.items[i].pro_img_url=imgurl[0]
                  var time=(new Date(res.data.items[i].pro_storetime))
                  _this.addtime.push(_this.formatDate(time))
                }
                _this.list=res.data;
              }
            }).catch(function(err){
                console.log(err)
            })
            let postData1=qs.stringify({
              pro_condition:this.proCondition,
              pro_name:this.proName,
            });
            this.$axios.post('http://localhost:9999/getSearchProductNum.do',postData1)
            .then(function(res){
                _this.totalnum=res.data.items[0];
            }).catch(function(err){
                console.log(err)
            })
      },
      formatDate:function (date) { //日期转换
          var y = date.getFullYear()
          var m = date.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + '-' + m + '-' + d;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      tankuang(){
        if(this.isShow){
            this.isShow=false;
        }else{
            this.isShow=true;
        }
      },
      alert:function(str) {
          let _this=this;
          this.$alert(str, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              this.$message({
                  type: 'info',
                  message: `action: ${ action }`
              });
              }
          })
      },
      update(){//修改商品信息
          let time=this.formatDate(new Date(this.currentRow.pro_storetime))
          let _this=this;
          let postData=qs.stringify({
              pro_storetime:time, //入库时间
              pro_name:this.currentRow.pro_name,    //名称
              pro_amount:this.currentRow.pro_amount,//供货量
              pro_id:this.currentRow.pro_id,        //编号
              pro_size:this.currentRow.pro_size,    //商品规格
              pro_discount:this.currentRow.pro_discount,  //折扣
              pro_price:this.currentRow.pro_price,   //商品价格
              pro_deal_amount:this.currentRow.pro_deal_amount , //成交量
              pro_bao:this.currentRow.pro_bao,       //爆款状态
              pro_new:this.currentRow.pro_new,       //新旧状态
              pro_condition:this.currentRow.pro_condition //商品状态
          })
          this.addtime[this.currentRowIndex]=time;
          this.$axios.post('http://localhost:9999/updateProduct.do',postData)
          .then(function(res){
              _this.edit();
              if(res.data.flag==1){
                _this.getData();
                _this.alert('修改成功');
              }else{
                _this.alert('修改失败');
              }
              _this.initChecked();
          }).catch(function(err){
              console.log(err)
          })
      },
      changeFile(file, fileList) {
        var This = this;
        //this.imageUrl = URL.createObjectURL(file.raw);
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          This.imageUrl = this.result;// 这个就是base64编码了
          console.log(This.imageUrl )
          // console.log(This.dialogImageUrl)
        }
      }
    }
}
</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 642232 */
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot');
  src: url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_642232_b8n0zys80t5d0a4i.svg#iconfont') format('svg');
}
template{
  position:relative;
}
.chakan{
  width: 90px;
  height: 34px;
  background-color: #4f9acd;
  margin-left: 320px;
  color: white;
  line-height: 34px;
  font-size: 12px;
  float: left;
  margin-top: -6px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.chakan:hover{
  background-color:#FF9600;
}
.div1{
  position: absolute;
  width:1090px ;
  height: 570px;
  top:90px;
  left:230px;
  background-color:white;
}
.section1{
  width: 1050px;
  height: 520px;
  position: relative;
}
.spxq{
  width: 150px;
  height: 43px;
  margin-left: 10px;
}
.spxq>h1{
  font-size: 16px;
  line-height: 0px;
  float: left;
  margin-left: 10px;
  margin-top:23px;
  color: #0078A8;
  font-family: 'iconfont';
}
.spxq>h1>span{
  font-size: 16px;
}
.hx{
  width: 1090px;
  border: 0.5px solid #E3E3E3;
}

.anniu{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 375px;
  font-size: 12px;
  transition: all 0.1s linear;
  cursor: pointer;
}
.anniu2{
  width: 90px;
  height: 34px;
  background-color: #FF9600;
  color: white;
  line-height: 35px;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 470px;
  font-size: 12px;
  transition: all 0.1s linear;
  cursor: pointer;
}
.anniu2:hover,.anniu:hover{
  background-color:#ff7800;
}
.tianjia,.bianji,.delete{
  width: 90px;
  height: 34px;
  background-color: #4F9ACD;
  color: white;
  line-height: 35px;
  font-size: 12px;
  position: absolute;
  top: 60px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.tianjia{
  left:20px;
}
.tianjia:hover,.bianji:hover,.delete:hover{
  background-color:#FF9600;
}
.hx2{
  width: 1048px;
  margin: 10px auto;
  border: 0.5px solid #F2F2F2;
}
.bianji{
  left: 120px;
}
.delete{
  left: 120px;
}
#beijing,#beijing2{
  width: 1090px;
  background-color:rgba(0, 0, 0, 0.5);
  height: 565px;
  position: absolute;
  top:0px;
  z-index: 999;
}
#tjbd{
  overflow:auto;
}
#tjbd,#tjbd2{
  width:700px;
  height: 540px;
  float: left;
  background-color: white;
  position: absolute;
  top:15px;
  left: 180px;
}
#page{
  position: absolute;
  top:490px;
  width: 100%;
}
</style>
