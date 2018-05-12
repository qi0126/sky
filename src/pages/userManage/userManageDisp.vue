<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="20">
              <el-input
                placeholder="请输入公司名/负责人/编号/ID/编码"
                style="width:320px"
                size="small"
                v-model="searchTxt">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              可用状态：
              <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="topBtn">
              <el-button type="primary" size="small" @click="createUserFun">新建</el-button>
              <el-button type="primary" plain size="small" v-show="delBtnTF">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table
            :data="userData"
            @row-click="editUser"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              header-align='center'
              align='center'            
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="concat"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="mail"
              label="邮箱地址">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="办公电话">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="用户角色">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="statu"
              label="可用状态">
              <template slot-scope="scope">
                <span v-if="scope.row.statu == 'E'">已启用</span>
                <span v-if="scope.row.statu == 'D'">被禁用</span>
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
          <!-- <Pagination @result="getAllDate" :pageSizes="[10, 20, 50, 100]" :url="this.portUser + '/account/sub'" pagiMethod="post"></Pagination> -->
        </div>

	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      userPortInfo: {}, //用户列表页
      searchTxt: "",
      options: [
        {
          value: "全部状态",
          label: "全部状态"
        },
        {
          value: "状态1",
          label: "状态1"
        },
        {
          value: "状态2",
          label: "状态2"
        }
      ],
      value: "全部状态",
      multipleSelection: [], //选择多选择框数据
      delBtnTF: false, //删除按钮显示/隐藏默认隐藏
      userData: [], //用户数据列表
      customerSize:-1, //客户数据记录
      pageSize: 10, //每页显示客户记录数
      pageNum: 1 //分页页码默认为1
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      self.userPortInfo.accessToken = localStorage.accessToken;
      this.$axios
        .post(self.portUser + "/account/sub", self.userPortInfo)
        .then(function(res) {
          if (res.data.code == 200) {
            self.userData = res.data.data.data;
            self.customerSize =  res.data.data.rowSize
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //创建新用户
    createUserFun() {
      this.$router.push("/Index/userManageCreate");
    },
    //改变多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length == 0) {
        this.delBtnTF = false;
      } else {
        this.delBtnTF = true;
      }
    },
    //用户详细编辑
    editUser(elem) {
      this.$router.push({
        path: "/Index/userManageEdit",
        query: elem
      });
    },
    //分页
    getAllDate(e) {
      console.log(e)
      var self = this
      self.userData = e
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
  .topBtn
    text-align right
  .pageD
    margin-top 20px
    text-align center
</style>