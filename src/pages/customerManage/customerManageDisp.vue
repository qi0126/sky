<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="4">
              <el-button type="primary" size="small" @click="createCustomer">新建</el-button>
              <el-button type="primary" plain size="small">导入</el-button>
            </el-col>
            <el-col :span="20" class="topMenuRight">
              <el-input
                placeholder="请输入内容"
                style="width:320px"
                size="small"
                v-model="searchTxt">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              审核状态：
              <el-select v-model="stateValue" placeholder="请选择" size="small">
                <el-option
                  v-for="item in auditStateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              可用状态：
              <el-select v-model="statuValue" placeholder="请选择" size="small">
                <el-option
                  v-for="item in statuList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table
            :data="customerAllData.data"
            @row-click="editUser"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="companyId"
              label="客户ID">
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="companyCode"
              label="客户编码">
            </el-table-column>
            <el-table-column
              prop="date"
              label="财务编码">
            </el-table-column>
            <el-table-column
              prop="concat"
              label="公司负责人">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
              <template slot-scope="scope">
                {{$api.dateGetDay(scope.row.createTime)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="auditState"
              label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.auditState =='0'" class="red_font">未提交</span>
                <span v-else-if="scope.row.auditState =='1'" class="orange_font">待审核</span>
                <span v-else-if="scope.row.auditState =='2'" class="black_font">已通过</span>
                <span v-else-if="scope.row.auditState =='3'" class="hui_font">已驳回</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="statu"
              label="可用状态">
              <template slot-scope="scope">
                <span v-if="scope.row.statu =='E'" class="black_font">已启用</span>
                <span v-else-if="scope.row.statu =='D'" class="hui_font">已禁用</span>
              </template>              
            </el-table-column>
          </el-table>
        </div>
        <div class="pageD">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="customerSize">
          </el-pagination>
          <!-- <Pagination @result="getAllDate" :pageSizes="[10, 20, 50, 100]" :url="this.portUser + '/company/clients'" pagiMethod="post"></Pagination> -->
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchTxt: "",
      auditStateList: [
        {
          value: "0",
          label: "未提交"
        },
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "已通过"
        },
        {
          value: "3",
          label: "已驳回"
        },
      ],
      stateValue: "",
      statuList: [//公司状态列表
        {
          value: "E",
          label: "已启用"
        },
        {
          value: "D",
          label: "已禁用"
        }
      ], 
      statuValue: "", //公司状态状态值
      customerAllData: [], //客户数据列表
      customerSize: 23, //客户数据记录
      pageSize:10,//每页显示客户记录数
      pageNum: 1 //分页页码默认为1
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this
      self.viewCustomer()
    },
    //客户列表查询事件
    viewCustomer() {
      var self = this
      let params = {
        keyWord: self.searchTxt,
        statu:self.statuValue,
        auditState:self.stateValue,
        page:self.pageNum,
        rows:self.pageSize,
      };
      this.$axios
        .post(this.portUser + "/company/clients", params)
        .then(function(res) {
          if (res.data.code == 200) {
            self.customerAllData = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    editUser(elem) {
      this.$router.push({
        path: "customerManageView",
        query: elem
      });
    },
    //分页事件
    getAllDate(e) {
      console.log("aaaaa");
      console.log(e);

      // this.customerAllData = e
      // this.result = e;
    },
    createCustomer(){
      this.$router.push({path:'customerManageEdit',query:{customerId:'create'}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
$font-color = #999
.conBigDiv
  .title
    border-bottom 1px solid #d9d9d9
    padding-bottom 10px
    margin-bottom 10px
  .hr
    border-top 1px solid #d9d9d9
    height 3px
    margin 12px 0 12px 0
  .redfont
    margin-bottom 15px
    padding-left 10px
    border-left 3px solid #e60e32
    font-size 15px
  .red_font
    color $base-color
  .orange_font
    color #F2930F
  .black_font
    color #2E3033
  .hui_font
    color #8A9199
  .topMenuRight
    text-align right
    margin-bottom 20px
  .pageD
    margin-top 20px
    text-align center
</style>