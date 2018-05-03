<template>
    <div class='newArrival'>
		<div class='frame'>
			<div style='margin-left: 20px;' class='Button'><span class='tubiaoqian el-icon-circle-plus-outline' ></span>添加</div>
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
	<el-dialog title="添加" :visible.sync="dialogFormVisible">
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
			Obtainshop:[]
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
	 }
    }
}
</script>
<style scoped>
.newArrival{
	height: 515px;
}
</style>
