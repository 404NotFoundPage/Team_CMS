<template>
    <div class='newArrival'>
		<div class='frame'>
			<div style='margin-left: 20px;' @click="dialogFormVisibl = true;open2()" class='Button'><span class='tubiaoqian el-icon-circle-plus-outline'></span>添加</div>
			<div style='margin-left: 10px;' @click="dialogFormVisible = true" class='Button'><span class='tubiaoqian el-icon-edit-outline'></span>编辑</div>
		</div>
		<div class='kubox'>
			用户案列
		</div>
		<div class='box'>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
				  prop="date"
				  label="案例编号"
				  width="180">
				</el-table-column>
				<el-table-column
				  prop="address"
				  label="用户编号">
				</el-table-column>
				<el-table-column
				  prop="anlie"
				  label="案列标题">
				</el-table-column>
				<el-table-column
				  prop="anlievar"
				  label="案列类容"
				  width="380">
				</el-table-column>
				<el-table-column
				  prop="shangjiazt"
				  label="上架状态">
				</el-table-column>
			  </el-table>
		</div>


		<el-dialog title="编辑" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
			<el-form-item label="案例编号" :label-width="formLabelWidth">
			  <el-select @change='open' v-model="form.cass_id" placeholder="">
				<el-option
				v-for="item in tableData"
				:key="item.date"
				:label="item.date"
				:value="item.date"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="用户编号" :label-width="formLabelWidth">
			    <el-input
				  placeholder=""
				  v-model="form.user_id"
				  :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="案例标题" :label-width="formLabelWidth">
			    <el-input
				  placeholder=""
				  v-model="form.cass_title"
				  :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="" :label-width="formLabelWidth">
			  <el-input
				  type="textarea"
				  :rows="4"
				  placeholder=""
				  v-model="form.cass_total"
				  >
			  </el-input>
			</el-form-item>
			<el-form-item label="上架状态" :label-width="formLabelWidth">
			  <el-select v-model="form.cass_condition" placeholder="请选择是，否">
				<el-option label="已上架" value="0"></el-option>
				<el-option label="未上架" value="1"></el-option>
			  </el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogFormVisible = false;open1()">确 定</el-button>
		  </div>
		</el-dialog>


		<el-dialog title="添加" :visible.sync="dialogFormVisibl">
		  <el-form :model="form1">
			<el-form-item label="案例编号" :label-width="formLabelWidth">
				<div class='xz'>
					<el-input v-model="form1.anliebianhao" :disabled="true" placeholder="请输入内容"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="用户编号" :label-width="formLabelWidth">
			   <el-select v-model="form1.user_id" placeholder="请选择用户id">
				<el-option
				 v-for="item in user_id"
				:key="item.user_id"
				:label="item.user_id" :value="item.user_id"></el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="案例标题" :label-width="formLabelWidth">
			    <div class='xz'>
					<el-input v-model="form1.input" placeholder="请输入内容"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="案列类容" :label-width="formLabelWidth">
			  <el-input
				  type="textarea"
				  :rows="4"
				  placeholder=""
				  v-model="form1.textarea"
				  >
			  </el-input>
			</el-form-item>
			<el-form-item label="案例标题" :label-width="formLabelWidth">


				<el-upload
				  action="http://localhost:8080/imgurl"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>


			</el-form-item>
			<el-form-item label="上架状态" :label-width="formLabelWidth">
			  <el-select v-model="form1.cass_condition" placeholder="请选择是，否">
				<el-option label="已上架" value="0"></el-option>
				<el-option label="未上架" value="1"></el-option>
			  </el-select>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisibl = false">取 消</el-button>
			<el-button type="primary" @click="dialogFormVisibl = false;open3()">确 定</el-button>
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
				 dialogImageUrl: '',
				dialogVisible: false,
				user_id: [],
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
				  cass_id:"",
				  user_id:"",
				  cass_title:"",
				  cass_total:"",
				  cass_condition:"",
				  delivery: false,
				  type: [],
				  resource: '',
				  desc: ''
				},
				form1:{
					anliebianhao:"",
					user_id:"",
					input:"",
					textarea:"",
					cass_condition:""
				},

				 textarea: '222',
				formLabelWidth: '120px',
				dialogTableVisibl: false,
				dialogFormVisibl: false,
				input:"",
		}
    },
	beforeMount: function () {
		this.gatData()

	},
	methods: {
		gatData:function(){
			 var _this=this;
			 this.$axios.post("http://localhost:9999/UserCase.do").then(function(res){
			 console.log(res.data)
				_this.form.cass_id=res.data[0].cass_id
				_this.form.user_id = res.data[0].user_id
				_this.form.cass_title = res.data[0].cass_title
				_this.form.cass_total = res.data[0].cass_total
				for(var i=0;i<res.data.length;i++){
					_this.tableData.push({
					date:"",
					address:"",
					anlie:"",
					anlievar:"",
					shangjiazt:""
					})
					var ff;
					if(res.data[i].cass_condition==0){
						ff="已上架"
					}else{
						ff="未上架"
					}
					_this.tableData[i].date=res.data[i].cass_id;
					_this.tableData[i].address=res.data[i].user_id;
					_this.tableData[i].anlie=res.data[i].cass_title;
					_this.tableData[i].anlievar=res.data[i].cass_total;
					_this.tableData[i].shangjiazt=ff
				   }

			 }).catch(function(err){
				console.log(err)
			 })
		  },
		  open(){
			console.log(this.tableData)

			for(var i=0;i<this.tableData.length;i++){
					if(this.form.cass_id==this.tableData[i].date){
						this.form.user_id = this.tableData[i].address
						this.form.cass_title = this.tableData[i].anlie
						this.form.cass_total = this.tableData[i].anlievar
						this.form.cass_condition = this.tableData[i].shangjiazt
				}
			}

		  },
		  open1(){
			console.log(this.form.cass_id)
			console.log(this.form.cass_total)
			console.log(this.form.cass_condition)

			let _this=this

			let postdata=qs.stringify({
				cass_id:this.form.cass_id,
				cass_total:this.form.cass_total,
				cass_condition:this.form.cass_condition
			})
			if(this.form.cass_condition){
				this.$axios.post("http://localhost:9999/UpdataUserCase.do",postdata).then(function(res){
				console.log(res.data)
				_this.gatData() //重新刷新
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		open2(){

		let _this=this
			console.log(_this.form1.anliebianhao)
			_this.form1.anliebianhao=parseInt(_this.tableData[_this.tableData.length-1].date)+1

			_this.$axios.post("http://localhost:9999/queyruser.do").then(function(res){
				console.log(res.data)
				_this.user_id=res.data
			}).catch(function(err){
					console.log(err)
			})
		},
		open3(){
			let _this=this
			let postdata=qs.stringify({
				 cass_id:this.form1.anliebianhao,
				 user_id:this.form1.user_id,
				 cass_title:this.form1.input,
				 cass_total:this.form1.textarea,
				 cass_img_urll:this.dialogImageUrl,
				 cass_condition:this.form1.cass_condition
			})
			if(this.form1.anliebianhao&&this.form1.user_id&&this.form1.input&&this.form1.textarea&&this.form1.cass_condition){
				console.log(postdata)
				_this.$axios.post("http://localhost:9999/addprouser.do",postdata).then(function(res){

				}).catch(function(err){
					console.log(err)
				})
			}
		},
		handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        }
	}
}
</script>
<style scoped>
	.xz{
		width: 217px;
	}
	.newArrival{
	height: 515px;
}
</style>
