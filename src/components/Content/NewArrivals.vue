<template>
    <div class='newArrival'>
		<div class='frame'>
			<div style='margin-left: 20px;' @click='xianshi = true' class='Button'><span class='tubiaoqian el-icon-circle-plus-outline' ></span>添加</div>
			<div style='margin-left: 10px;' @click="dialogFormVisible = true"  class='Button'><span class='tubiaoqian el-icon-edit-outline'></span>编辑</div>
		</div>
		<div class='kubox'>
			新品推荐
		</div>
		<div class='box'>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
				  prop="date"
				  label="商品编号"
				  width="180">
				</el-table-column>
				<el-table-column
				  prop="address"
				  label="商品名称">
				</el-table-column>
			  </el-table>
		</div>
	<el-dialog title="编辑" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
			<el-form-item label="商品编号"   :label-width="formLabelWidth">
			  <el-select v-model="form.region"  placeholder="请选择商品编号">
				<el-option
				 v-for="item in Obtainshop"
				:key="item.pro_id"
			    :label="item.pro_id"
			    :value="item.pro_id"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="商品名称" :label-width="formLabelWidth">
			  <el-select v-model="form.region" placeholder="请选择商品名称">
				<el-option
				 v-for="item in Obtainshop"
				:key="item.pro_id"
			    :label="item.pro_name"
			    :value="item.pro_id"
				></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="是否推荐" :label-width="formLabelWidth">
			  <el-select v-model="form.date2" placeholder="请选择是，否">
				<el-option label="是" value="1"></el-option>
				<el-option label="否" value="0"></el-option>
			  </el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogFormVisible = false;open3()">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog title="新品添加" :visible.sync="xianshi">
		  <el-form :model="form1">
			<div class='divleft'>
				<el-form-item label="商品名称" :label-width="formLabelWidth">
				  <el-input v-model="form1.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="供  货  量" :label-width="formLabelWidth">
				  <el-input v-model="form1.gonghuoliang" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="成本价格" :label-width="formLabelWidth">
				  <el-input v-model="form1.jiage" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="爆款状态" :label-width="formLabelWidth">
				 <el-select v-model="form1.bkzt" placeholder="请选择是，否">
					<el-option label="是" value="0"></el-option>
					<el-option label="否" value="1"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="商品状态" :label-width="formLabelWidth">
				  <el-select v-model="form1.spzt" placeholder="请选择生存，死亡">
					<el-option label="生存" value="0"></el-option>
					<el-option label="死亡" value="1"></el-option>
				  </el-select>
				</el-form-item>
			</div>
			<div class='divleft'>
				<el-form-item label="商品规格" :label-width="formLabelWidth">
				  <el-input v-model="form1.spgg" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="折     扣" :label-width="formLabelWidth">
				  <el-input v-model="form1.spzk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" :label-width="formLabelWidth">
				  <el-date-picker
					  v-model="form1.value1"
					  type="date"
					  placeholder="选择日期">
				  </el-date-picker>
				</el-form-item>
				<el-form-item label="新旧状态" :label-width="formLabelWidth">
				  <el-select v-model="form1.xjzt" placeholder="请选择新，旧">
					<el-option label="新" value="0"></el-option>
					<el-option label="旧" value="1"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="商品类型" :label-width="formLabelWidth">
				  <el-select v-model="form1.splx" placeholder="请选择商品类型">
					<el-option label="花瓶" value="1"></el-option>
					<el-option label="茶器" value="2"></el-option>
					<el-option label="艺品" value="3"></el-option>
				  </el-select>
				</el-form-item>
			</div>
			<div class='divdic'>
				<form action="" id='form1' enctype="multipart/form-data" method="post">
				   <span class='uploadspan'>添加图片</span>
					<span class='wocalie'>
						<span class='ffffffff'>添加</span>
						<input class='uploaddata' type="file" name="txtFile" multiple="multiple"/>
					</span>
					<button  type='button' @click='formdata'  class='uploadbutton'>上传</button>
				</form>
			</div>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="xianshi = false;qingqiu()">创建</el-button>
			<el-button @click="xianshi = false">取 消</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>

	import qs from 'qs'
export default{
    name: "",
    data: function () {
        return {
			tableData: [],
			dialogFormVisible: false,
			form: {
			  name: '',
			  region: '',
			  date2: '',
			  delivery: false,
			  type: [],
			  resource: '',
			  desc: ''
			},
			formLabelWidth: '120px',
			Obtainshop:[],

			// 添加 模块
			xianshi: false,
			dialogVisible: false,
			form1:{
				name:"",  //商品名称
				spgg:"",  //商品规格
				gonghuoliang:"",  //供货量
				spzk:"",// 商品折扣
				jiage:"",// 价格
				value1:"", //创建时间
				bkzt:"", //爆款状态
				xjzt:"", //新旧状态
				spzt:"", //商品状态
				tjtp:"", //添加图片
				splx:"" // 商品类型
			}
		}
    },
	beforeMount: function () {
		this.gatData()
		this.getData1()
	},
	methods: {
      open3() {//获取id 等等
		 console.log(this.form.region)
		 console.log(this.form.date2)
		 if(this.form.date2){
			this.getData2()
		 }else{
			console.log("www")
		 }
      },
	  gatData:function(){
		 var _this=this;
		 _this.tableData=[]
		 this.$axios.post("http://localhost:9999/NewProduct.do").then(function(res){
			for(var i=0;i<res.data.length;i++){
				_this.tableData.push({
				date:"",
				address:""
				})
				_this.tableData[i].date=res.data[i].pro_id;
				_this.tableData[i].address=res.data[i].pro_name
				console.log(_this.tableData[i])
			   }
		 }).catch(function(err){
			console.log(err)
		 })
	  },
	  getData1:function(){
		var _this=this;
		_this.$axios.post("http://localhost:9999/Obtainshop.do").then(function(res){
			console.log(res.data)
			for(var i=0;i<res.data.length;i++){
				_this.Obtainshop.push({
				pro_id:"",
				pro_name:""
				})
				_this.Obtainshop[i].pro_id=res.data[i].pro_id;
				_this.Obtainshop[i].pro_name=res.data[i].pro_name
			}
			console.log(_this.Obtainshop)
		}).catch(function(err){
		console.log(err)
		})
	  },
	 getData2:function(){
		var _this=this;
			let newshop = qs.stringify({
				pro_id:_this.form.region,
				pro_new:_this.form.date2
			})
			console.log(newshop)
		_this.$axios.post("http://localhost:9999/UPdateNewProduct.do",newshop).then(function(res){
			console.log(res.data)
			console.log("我去你妈的")
		}).then(function(){
			_this.gatData()
		}).catch(function(err){
			console.log(err)
		})
	 },
	 qingqiu:function(){

		console.log(this.form1)

		let shijian=this.form1.value1
		  shijian=shijian.getFullYear()+"-"+ (shijian.getMonth()+1)+"-"+shijian.getDate()
		  console.log(shijian)
		let postdata=qs.stringify({
		 pro_type_id:this.form1.splx,
		 pro_name:this.form1.name,
		 pro_amount:this.form1.gonghuoliang,
		 pro_price: this.form1.jiage,
		 pro_discount: this.form1.spzk,
		 pro_size:this.form1.spgg,
		 pro_storetime:shijian,
		 pro_id:""
		})
		console.log(postdata)
		this.$axios.post("http://localhost:9999/addProduct.do",postdata).then(function(res){
			console.log(res.data)
		}).catch(function(err){
			console.log(err)
		})


	 },
	 handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
	  formdata(){
				let _this=this
				 var xmlHttp;
				if(window.XMLHttpRequest){ //DOM
					xmlHttp = new XMLHttpRequest();
				}else if(window.ActiveXObject){ //IE
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				}

				xmlHttp.onreadystatechange=function(){
					if(xmlHttp.readyState==4&&xmlHttp.status==200){
					  _this.form1.tjtp=xmlHttp.responseText
					}
				}
				xmlHttp.open("post","http://localhost:9999/upload.do");
				//如果是post ，需要设置表头的编码
					var form = document.getElementById("form1");
					var formData = new FormData(form);
					xmlHttp.send(formData);
		console.log("123")
	   }

	}
}
</script>
<style scoped>
	.newArrival{
		height: 515px;
	}
	.divleft{
		float: left;
		width: 300px;
	}
	.divdic{
		clear: both;
		text-align: left;
	}
	.uploadspan{
		padding-left: 50px;
		padding-right: 10px;
	}

	.uploadbutton{
		border: none;
		outline: none;
		border-radius: 5px;
		cursor: pointer;
		background-color: #409EFF;
		width: 70px;
		height: 40px;
		color: white;
		transition: all .2s linear;
		margin-left: 200px;
	}
	.uploadbutton:hover{
		background-color: #66b1ff;
	}
	.wocalie{
		position: relative;
	}
	.uploaddata{
		position: absolute;
		top:0;
		width: 70px;
		height: 40px;
		left:0;
		opacity:0;
	}
	.ffffffff{
		position: absolute;
		border: none;
		outline: none;
		border-radius: 5px;
		cursor: pointer;
		background-color: #409EFF;
		width: 70px;
		height: 40px;
		color: white;
		text-align: center;
		line-height: 40px;
		transition: all .2s linear;
	}
</style>
