<template>
    <div class='newArrival'>
		<div class='frame'>
			<div style='margin-left: 20px;' class='Button' @click="dialogFormVisible = true"><span class='tubiaoqian el-icon-circle-plus-outline' ></span>添加</div>
			<div style='margin-left: 10px;' class='Button' @click="dialogFormVisibl = true"><span class='tubiaoqian el-icon-edit-outline'></span>编辑</div>
		</div>
		<div class='kubox'>
			爆款推荐
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
		<el-dialog title="添加" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
			<el-form-item label="商品编号" :label-width="formLabelWidth">
			  <el-select v-model="form.region" placeholder="请选择商品编号">
				<el-option
				v-for="item in labelData"
				:key="item.pro_id"
			    :label="item.pro_id"
			    :value="item.pro_id"
				></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="商品名称" :label-width="formLabelWidth">
			  <el-select v-model="form.region" placeholder="请选择商品名称">
				<el-option
			    v-for="item in labelData"
				:key="item.pro_id"
			    :label="item.pro_name"
			    :value="item.pro_id"
			 ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="是否爆款" :label-width="formLabelWidth">
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

		<el-dialog title="编辑" :visible.sync="dialogFormVisibl">
		  <el-form :model="form">
			<el-form-item label="商品编号" :label-width="formLabelWidth">
			  <el-select v-model="form1.region" placeholder="请选择商品编号">
				<el-option
				v-for="item in tableData"
				:key="item.date"
			    :label="item.date"
			    :value="item.date"
				></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="商品名称" :label-width="formLabelWidth">
			  <el-select v-model="form1.region" placeholder="请选择商品名称">
				<el-option
			    v-for="item in tableData"
				:key="item.date"
			    :label="item.address"
			    :value="item.date"
			 ></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="是否爆款" :label-width="formLabelWidth">
			  <el-select v-model="form1.date2" placeholder="请选择是，否">
				<el-option label="是" value="1"></el-option>
				<el-option label="否" value="0"></el-option>
			  </el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisibl = false">取 消</el-button>
			<el-button type="primary" @click="dialogFormVisibl = false;open4()">确 定</el-button>
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
			dialogTableVisible: false,
			dialogFormVisible: false,
			dialogTableVisibl: false,
			dialogFormVisibl: false,
			form: {
			  name: '',
			  region: '',
			  date1: '',
			  date2: '',
			  delivery: false,
			  type: [],
			  resource: '',
			  desc: ''
			},
			form1: {
			  name: '',
			  region: '',
			  date1: '',
			  date2: '',
			  delivery: false,
			  type: [],
			  resource: '',
			  desc: ''
			},
			formLabelWidth: '120px',
			labelData:[]
		}
    },
	beforeMount: function () {
		this.getData2();
		this.gatData()
	},
	methods: {
      open3() {//获取id 等等
		 console.log(this.form.region)
		 console.log(this.form.date2)
		 if(parseInt(this.form.date2)==1){
			this.getData3();
		 }
		},
	  open4() {
			let _this=this
		  console.log("2223333333333333333333333333444444444444444444444444444444")
		  console.log(this.form1.region)
		  console.log(this.form1.date2)
		  let postdata = qs.stringify({
					pro_bao:this.form1.date2,
					pro_id:this.form1.region
				})

				console.log(postdata)
		  this.$axios.post("http://localhost:9999/xiugaibaokuan.do",postdata).then(function(res){
				console.log(res.data)
		  }).then(function(){
				_this.gatData()
		  }).catch(function(err){
				console.log(err)
		  })

		},
		gatData:function(){ //获取爆款
		 var _this=this;
		 this.$axios.post("http://localhost:9999/Bursting.do").then(function(res){
			    _this.tableData=[]
			for(var i=0;i<res.data.length;i++){
				_this.tableData.push({
				date:"",
				addresss:""
				})
				_this.tableData[i].date=res.data[i].pro_id;
				_this.tableData[i].address=res.data[i].pro_name
			   }
		 }).catch(function(err){
			console.log(err)
		 })
		},
		getData2:function(){//获取不是爆款商品
			var _this=this;
			this.$axios.post("http://localhost:9999/ObtainGoods.do").then(function(res){
				console.log(res.data)
				for(var i=0;i<res.data.length;i++){
					_this.labelData.push({
						pro_id:'',
						pro_name:''
					})
					_this.labelData[i].pro_id=res.data[i].pro_id
					_this.labelData[i].pro_name=res.data[i].pro_name
				}
				console.log(_this.labelData)
			}).catch(function(err){
				console.log(err)
			})
		},
		getData3:function(){//添加爆款
			var _this=this;
			let postData=qs.stringify({
					pro_bao:this.form.date2,
					pro_id:this.form.region
				})

			if(_this.tableData.length<6){

				this.$axios.post("http://localhost:9999/AddBursting.do",postData).then(function(res){
							console.log(res.data)
						}).then(function(){
						_this.gatData()
					})

			}else{

					this.$axios.post("http://localhost:9999/UPDATABursting.do").then(
						this.$axios.post("http://localhost:9999/AddBursting.do",postData).then(function(res){
						console.log(res.data)
					}).then(function(){
						_this.gatData()
					}).catch(function(err){
						console.log(err)
					})
					)


			}
		}
    }
}
</script>
<style scoped>
.newArrival{
	height: 515px;
}
</style>
