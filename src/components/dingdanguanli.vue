<template>
  <div class="dingdanguanli">
    <section class="ddhead">
      <p><span>&#xe6bd;</span>订单管理</p>
    </section>
    <section class="funOption">
      <el-input class="searchInput" size="medium" clearable placeholder="请输入订单编号" v-model="searchInput"></el-input>
      <el-select class="ddselect" v-model="ddselectzfstadus" @change="zfstadus" clearable placeholder="支付状态选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-row class="searButton1">
        <el-button class="searButtonSon1" type="warning" plain @click="searchName">搜索</el-button>
      </el-row>
      <el-row class="searButton2">
        <el-button class="searButtonSon2" type="warning" plain>重置</el-button>
      </el-row>
      <div class="ddstadus">
        <span>订单状态:</span>
        <el-select class="ddselectfahuo" v-model="ddstadusval" clearable @change="zfstadus" placeholder="订单状态选择">
          <el-option v-for="item in ddselectfahuo"
             :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </section>
    <section class="ddtable">
      <el-table  v-loading="loading"  class="ddtablehead" :data="tableData"  stripe border style="width: 1090px">
        <el-table-column  prop="order_id" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="user_name"  label="会员姓名" width="80">
        </el-table-column>
        <el-table-column  prop="order_time"  label="日期" width="80">
        </el-table-column>
        <el-table-column
          prop="order_postmethod" label="快递方式"></el-table-column>
        <el-table-column
          prop="order_paymethod"
          label="支付方式">
        </el-table-column>
        <el-table-column
          prop="order_bill"
          label="发票">
        </el-table-column>
        <el-table-column
          prop="order_name"
          label="收货人"
          width="70">
        </el-table-column>
        <el-table-column
          prop="order_addr"
          label="收货地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="order_remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="order_pay"
          label="支付状态">
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="发货状态">
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="交易金额">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dddetails(scope.$index,scope.row)">详情</el-button><el-button type="text" size="small" @click="ddatend(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="dddialog">
      <el-dialog
        title="表单修改"
        :visible.sync="centerDialogVisible"
        width="35%"
        center>
        <div class="atendcommon">
          配送方式:
          <el-select v-model="peisongxuanxiang" class="ddinputad1" placeholder="请选择配送方式">
            <el-option
              v-for="item in peisongfangshi"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="atendcommon">
          开具发票:
          <el-select v-model="fapiaoxuanxiang" class="ddinputad2" placeholder="是否开具发票">
            <el-option
              v-for="item in fapiao"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="atendcommon">
          收货人:
          <el-input placeholder="请修改收货人" class="ddinputad3" v-model="shouhuoren" clearable></el-input>
        </div>
        <div class="atendcommon">
          收货地址:
          <el-input placeholder="请修改收货地址" class="ddinputad4" v-model="shouhuodizhi" clearable></el-input>
        </div>
        <div class="atendcommon">
          修改备注:
          <el-input placeholder="请修改备注" class="ddinputad5" v-model="beizhu" clearable></el-input>
        </div>
        <div class="atendcommon">
          发货状态:
          <el-select v-model="fahuozhuangtai" class="ddinputad6" placeholder="修改发货状态">
            <el-option
              v-for="item in fahuo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAttend">确 定</el-button>
      </span>
      </el-dialog>
    </section>
    <section class="dddialogdetails">
      <el-dialog
        title="订单详情"
        :visible.sync="dddialogdetails"
        width="45%">
        <table cellspacing="1">
          <tbody class="dddetailLeft">
            <tr>
              <td>订单编号:</td>
              <td>{{ddbianhao}}</td>
            </tr>
            <tr>
              <td>商品编号:</td>
              <td>{{ddspbianhao}}</td>
            </tr>
            <tr>
              <td>单价&数量:</td>
              <td>{{dddanjia}} * {{ddshuliang}}</td>
            </tr>
            <tr>
              <td>收货人:</td>
              <td>{{ddshouhuoren}}</td>
            </tr>
            <tr>
              <td>订单状态:</td>
              <td>{{ddddzhungtai}}</td>
            </tr>
          </tbody>
          <tbody class="dddetailRight">
            <tr>
              <td>下单时间:</td>
              <td>{{ddxiadanshijian}}</td>
            </tr>
            <tr>
              <td>商品名称:</td>
              <td>{{ddspmingcheng}}</td>
            </tr>
            <tr>
              <td>总金额:</td>
              <td>{{ddtotalmoney}}</td>
            </tr>
            <tr>
              <td>手机号码:</td>
              <td>{{ddiphone}}</td>
            </tr>
            <tr>
              <td>订单来源:</td>
              <td>{{ddlaiyuan}}</td>
            </tr>
          </tbody>
        </table>
        <div class="clear"></div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dddialogdetails = false">确 定</el-button>
        </span>
      </el-dialog>
    </section>
    <section class="ddpagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change"
        @prev-click="prev_click"
        @next-click="next_click"
        style="margin-top:-35px">
      </el-pagination>
    </section>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'dingdanguanli',
    data () {
      return {
        searchInput: '',
        total: 0,
        pageshow: 5,
        currentPage: 1,
        centerDialogVisible: false, //修改对话框
        dddialogdetails: false,//详情对话框
        loading: false,//加载效果
        //支付状态选择
        options: [{
          value: 1,
          label: '未支付'
        }, {
          value: 0,
          label: '已支付'
        }],
        ddselectzfstadus: '',
        //订单状态选择
        ddstadusval: '',
        ddselectfahuo: [{
          value: 1,
          label: '未发货'
        }, {
          value: 0,
          label: '已发货'
        }],
        tableData: [],
        //修改表单内容
        trIndex: '',
        peisongfangshi: [{
          value: '货到付款',
          label: '顺丰快递'
        }, {
          value: '送货上门',
          label: '邮政快递'
        }],
        peisongxuanxiang: '',
        fapiao: [{
          value: '0',
          label: '不开发票'
        }, {
          value: '1',
          label: '开具发票'
        }],
        fapiaoxuanxiang: '',
        shouhuoren: '',
        shouhuodizhi: '',
        beizhu: '',
        fahuo: [{
          value: '0',
          label: '未发货'
        }, {
          value: '1',
          label: '已发货'
        }],
        fahuozhuangtai: '',
        //订单详情数据;
        ddbianhao:'',
        ddspbianhao:'',
        dddanjia:'',
        ddshuliang:'',
        ddshouhuoren:'',
        ddddzhungtai:'',
        ddxiadanshijian:'',
        ddspmingcheng:'',
        ddtotalmoney:'',
        ddiphone:'',
        ddlaiyuan:'',
      }
    },
    methods: {
      //订单详情
      dddetails: function (index, data) {
        this.trIndex = index;
        let xuhao = this.trIndex;
        xuhao = (this.currentPage - 1) * this.pageshow + this.trIndex;
//        console.log(xuhao);
//        console.log(data);
        this.dddialogdetails = true;
        let self = this;
        let postData = qs.stringify({order_id: xuhao});
        this.$axios.post("/api/dddetails.do", postData).then(function (resData) {
//          console.log(resData.data[0]);
          let data = resData.data[0];
          self.detailsArr = resData.data[0];
//          console.log(self.detailsArr);
          self.ddbianhao=data['order_id'];
          self.ddspbianhao=data['pro_id'];
          self.dddanjia=data['pro_price'];
          self.ddshuliang=data['order_detail_amount'];
          self.ddshouhuoren=data['order_name'];
          if(data['order_pay']==1){
            self.ddddzhungtai='已支付'
          }else{
            self.ddddzhungtai='未支付'
          }
          //时间格式处理
          // let str = data["order_time"].substring(0, data["order_time"].length - 5);
          // data["order_time"] = str.split('T').toString().replace(/,/, ' ');
          self.ddxiadanshijian=self.formatDate(new Date(data['order_time']));
          console.log( self.ddxiadanshijian)
          self.ddspmingcheng = data['pro_name'];
          self.ddtotalmoney = self.ddshuliang*self.dddanjia;
          self.ddiphone=data['user_tel'];
          self.ddlaiyuan=data['user_name'];
        }).catch(function (err) {
          console.log(err);
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
      //修改订单
      ddatend: function (index, row) {
//        console.log(row);
//        console.log(index)
        this.trIndex = index;
        this.peisongxuanxiang = row['order_postmethod'];
        this.fapiaoxuanxiang = row['order_bill'];
        this.shouhuoren = row['order_name'];
        this.shouhuodizhi = row['order_addr'];
        this.beizhu = row['order_remark'];
        this.fahuozhuangtai = row['order_status']
        this.centerDialogVisible = true;
      },
      //确定修改
      confirmAttend: function () {
//        console.log(this.trIndex);
        let self = this;
        let fapiao;
        let fhzt;
        let xuhao = self.trIndex;
        xuhao = (self.currentPage - 1) * self.pageshow + self.trIndex;
//        console.log(xuhao);
        if (self.fapiaoxuanxiang == '不开发票' || self.fapiaoxuanxiang == 0) {
          fapiao = 0;
        } else {
          fapiao = 1;
        }
        if (self.fahuozhuangtai == '未发货' || self.fahuozhuangtai == 0) {
          fhzt = 0;
        } else {
          fhzt = 1;
        }
        ;
        let postData = qs.stringify({
          order_postmethod: self.peisongxuanxiang,
          order_bill: fapiao,
          order_addr: self.shouhuodizhi,
          order_remark: self.beizhu,
          order_status: fhzt,
          order_name: self.shouhuoren,
          order_id: xuhao,
        })
        this.$axios.post('/api/AmendTheOrder.do', postData).then(function (resData) {
//          console.log(resData);
          if (resData.data['flag'] == 1) {
            self.ddsuccess();
            self.zfstadus();
          }
        }).catch(function (err) {
          console.log(err);
        });
        this.centerDialogVisible = false;
      },
      //操作成功提示
      ddsuccess: function () {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      },
      //支付状态选择
      zfstadus: function () {
        let self = this;
        self.loading = true;
        let postData = qs.stringify({
          number: self.pageshow,
          Pagenumber: self.currentPage,
          OrderQuerysend: self.ddstadusval,
          OrderQuerypay: self.ddselectzfstadus,
        });
        let psotData2 = qs.stringify({
          OrderQuerysend: self.ddstadusval,
          OrderQuerypay: self.ddselectzfstadus,
        })
        this.$axios.post('/api/readTheOrder.do', postData).then(function (resData) {
//          console.log(resData.data);
          let data = resData.data;
          //处理时间格式
          for (let i = 0, len = data.length; i < len; i++) {
            let str = data[i]["order_time"].substring(0, data[i]["order_time"].length - 5);
            data[i]["order_time"] = str.split('T').toString().replace(/,/, ' ');
            //处理发票数据;
            if (data[i]["order_bill"] == 0) {
              data[i]["order_bill"] = '不开发票'
            } else {
              data[i]["order_bill"] = '开具发票'
            }
            ;
            //处理支付状态数据;
            if (data[i]["order_pay"] == 0) {
              data[i]["order_pay"] = '未付款'
            } else {
              data[i]["order_pay"] = '已付款'
            }
            ;
            //处理发货状态;
            if (data[i]["order_status"] == 0) {
              data[i]["order_status"] = '未发货'
            } else {
              data[i]["order_status"] = '已发货'
            }
            ;
          }
          self.tableData = resData.data;
          self.loading = false;
        }).catch(function (err) {
          console.log(err);
        })
        //页码
        this.$axios.post('/api/totalNumber.do', psotData2).then(function (resData) {
          let changdu = resData.data[0]['count(1)'];
          self.total = Math.ceil(changdu / parseInt(self.pageshow)) * 10;
        }).catch(function (err) {
          console.log(err);
        })
      },
      //搜索
      searchName: function () {
        if (this.searchInput != '') {
          let self = this;
          self.loading = true;
          let content = parseInt(this.searchInput);
          let postData = qs.stringify({
            order_id: content
          })
          this.$axios.post('/api/readOneOrder.do', postData).then(function (resData) {
            let data = resData.data;
            //计算页数
            let changdu = parseInt(data.length);
            self.total = Math.ceil(changdu / parseInt(self.pageshow)) * 10;
            //处理时间格式
            for (let i = 0, len = data.length; i < len; i++) {
              let str = data[i]["order_time"].substring(0, data[i]["order_time"].length - 5);
              data[i]["order_time"] = str.split('T').toString().replace(/,/, ' ');
              //处理发票数据;
              if (data[i]["order_bill"] == 0) {
                data[i]["order_bill"] = '不开发票'
              } else {
                data[i]["order_bill"] = '开具发票'
              }
              ;
              //处理支付状态数据;
              if (data[i]["order_pay"] == 0) {
                data[i]["order_pay"] = '未付款'
              } else {
                data[i]["order_pay"] = '已付款'
              }
              ;
              //处理发货状态;
              if (data[i]["order_status"] == 0) {
                data[i]["order_status"] = '未发货'
              } else {
                data[i]["order_status"] = '已发货'
              }
              ;
            }
            self.tableData = resData.data;
            self.loading = false;
          }).catch(function (err) {
            console.log(err);
          })
        } else {
          this.zfstadus();
        }

      },
      //页码
      current_change: function (currentPage) {
        this.currentPage = currentPage;
        this.fanye(currentPage);
      },
      prev_click: function () {
      },
      next_click: function () {
      },
      //翻页
      fanye: function (i) {
        let self = this;
        self.loading = true;
        let postData2 = qs.stringify({
          number: parseInt(self.pageshow),
          Pagenumber: i,
        });
        this.$axios.post('/api/readTheOrder.do', postData2).then(function (resData) {
//          console.log(resData.data);
          let data = resData.data;
          for (let i = 0, len = data.length; i < len; i++) {
            //处理时间
            let str = data[i]["order_time"].substring(0, data[i]["order_time"].length - 5);
            data[i]["order_time"] = str.split('T').toString().replace(/,/, ' ');
            //处理发票数据;
            if (data[i]["order_bill"] == 0) {
              data[i]["order_bill"] = '不开发票'
            } else {
              data[i]["order_bill"] = '开具发票'
            }
            ;
            //处理支付状态数据;
            if (data[i]["order_pay"] == 0) {
              data[i]["order_pay"] = '未付款'
            } else {
              data[i]["order_pay"] = '已付款'
            }
            ;
            //处理发货状态;
            if (data[i]["order_status"] == 0) {
              data[i]["order_status"] = '未发货'
            } else {
              data[i]["order_status"] = '已发货'
            }
            ;
          }
          self.tableData = resData.data;
          self.loading = false;
        }).catch(function (err) {
          console.log(err);
        })
      }
    },
    created: function () {
      //订单数据请求;
      this.loading = true;
      let self = this;
      let postData = qs.stringify({});
      let postData2 = qs.stringify({
        number: parseInt(self.pageshow),
        Pagenumber: self.currentPage | 1,
      });
      this.$axios.post('/api/totalNumber.do', postData).then(function (resData) {
        self.total = Math.ceil((resData.data[0]["count(1)"]) / parseInt(self.pageshow)) * 10;
      }).catch(function (err) {
      });
      this.$axios.post('/api/readTheOrder.do', postData2).then(function (resData) {
        let data = resData.data;
//        console.log(data);
        for (let i = 0, len = data.length; i < len; i++) {
          //处理时间
          let str = data[i]["order_time"].substring(0, data[i]["order_time"].length - 5);
          data[i]["order_time"] = str.split('T').toString().replace(/,/, ' ');
          //处理发票数据;
          if (data[i]["order_bill"] == 0) {
            data[i]["order_bill"] = '不开发票'
          } else {
            data[i]["order_bill"] = '开具发票'
          }
          ;
          //处理支付状态数据;
          if (data[i]["order_pay"] == 0) {
            data[i]["order_pay"] = '未付款'
          } else {
            data[i]["order_pay"] = '已付款'
          }
          ;
          //处理发货状态;
          if (data[i]["order_status"] == 0) {
            data[i]["order_status"] = '未发货'
          } else {
            data[i]["order_status"] = '已发货'
          }
          ;
        }
        self.tableData = resData.data;
        self.loading = false;
      }).catch(function (err) {
        console.log(err);
      })
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 642232 */
    src: url('//at.alicdn.com/t/font_642232_0tyoaxd973xlayvi.eot');
    src: url('//at.alicdn.com/t/font_642232_0tyoaxd973xlayvi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_642232_0tyoaxd973xlayvi.woff') format('woff'),
    url('//at.alicdn.com/t/font_642232_0tyoaxd973xlayvi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_642232_0tyoaxd973xlayvi.svg#iconfont') format('svg');
  }
  .clear{
    clear: both;
  }
  .dddetailLeft{
    float: left;
  }
  .dddetailLeft,.dddetailRight{
    background-color: #ececec;
  }
  .dddetailLeft td:nth-of-type(1),.dddetailRight td:nth-of-type(1){
    background-color: #f9f9f9;
    text-align: right;
    padding-right: 10px;
    width: 110px;
    height: 60px;
  }
  .dddetailLeft td:nth-of-type(2),.dddetailRight td:nth-of-type(2){
    text-align: center;
    width: 140px;
    height: 60px;
    background-color: white;
  }
  .dddetailRight{
    float: left;
    margin-left: -1px;
  }
  .dingdanguanli {
    position: relative;
    left: 30px;
    top: 30px;
    width: 1090px;
    height: 560px;
    background-color: white;
  }
  .ddhead {
    text-align: left !important;
    color: #088ec3;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }

  .ddhead span {
    font-family: iconfont;
    margin-right: 10px;
    background-color: #088ec3;
    color: white;
    border-radius: 50%;
    display: inline-block;
    height: 25px;
    width: 25px;
    text-align: center;
    line-height: 25px;
  }

  .funOption {
    height: 40px;
    padding: 20px;
  }

  .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .searchInput,.ddselect,.searButton1,.searButton2,.ddstadus {
    position: absolute;
    top: 55px;
  }
  .searchInput {
    width: 170px;
    left: 0px;
  }

  .ddselect {
    line-height: 36px;
    left:180px;
  }
  .searButton1,.searButton2 {
    display: inline-block;
    width: 100px;
    height: 36px;
    left: 410px;
  }
  .searButton2 {
    left: 520px;
  }
  .searButtonSon1 {
    width: 100%;
    height: 100%;
    background-color: #ff9600;
    color: white;
  }

  .searButtonSon1:hover {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .searButtonSon1:active {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .searButtonSon1:focus {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .searButtonSon2 {
    width: 100%;
    height: 100%;
    background-color: #ff9600;
    color: white;
  }

  .searButtonSon2:hover {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .searButtonSon2:active {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .searButtonSon2:focus {
    background-color: #ff8803;
    border-color: #ff8803;
    color: #fff;
  }

  .ddstadus {
    /* float: right; */
    left:700px;
  }

  .ddstadus > span {
    font-size: 13px;
  }

  .ddtable {
    position: relative;
    top:-25px;
    text-align: center;
  }

  .ddpagination {
    margin-top: 30px;
  }

  .atendcommon {
    padding-left: 40px;
    margin-top: 10px;
  }

  .atendcommon .ddinputad1 {
    margin-left: 20px;
  }

  .atendcommon .ddinputad2 {
    margin-left: 20px;
  }

  .ddinputad3 {
    display: inline-block;
    width: 217px;
    margin-left: 35px;
  }

  .ddinputad4 {
    display: inline-block;
    width: 217px;
    margin-left: 20px;
  }

  .ddinputad5 {
    display: inline-block;
    width: 217px;
    margin-left: 20px;
  }

  .ddinputad6 {
    display: inline-block;
    margin-left: 20px;
  }
</style>
