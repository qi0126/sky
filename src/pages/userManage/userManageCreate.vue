<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建新用户</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="12" class="topMenuTxt">基本资料</el-col>
            <el-col :span="12">
              <div class="textRight">
                <el-button type="primary" size="small" @click="saveUser">创建用户</el-button>
                <el-button size="small" @click="cancelUser" plain>取消</el-button>
              </div>
              </el-col>
          </el-row>
          <div class="editUserTab">
            <el-row>
              <el-col :span="11">
                <div class="inputName">
                  用户名
                </div>
                <div class="inputDiv">
                  <el-input v-model="userAllData.username" placeholder="请设置登录用户名" class="editInp" size="small"></el-input> <span class="red_font">*</span>
                </div>
                <div class="inputName">
                  密码
                </div>
                <div class="inputDiv">
                  <el-input type="password" v-model="userAllData.password" placeholder="请填写登录密码" class="editInp" size="small"></el-input> <span class="red_font">*</span>
                </div>
                <div class="inputName">
                  姓名
                </div>
                <div class="inputDiv">
                  <el-input v-model="userAllData.concat" placeholder="请输入用户姓名" class="editInp" size="small"></el-input> <span class="red_font">*</span>
                </div>
                <div class="inputName">
                  角色
                </div>
                <div class="inputDiv">
                  <el-select v-model="userAllData.roleId" placeholder="请选择角色" class="editInp" size="small">
                    <el-option
                      v-for="item in roleList"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId">
                    </el-option>
                  </el-select>
                </div>
                <div class="inputName">
                  所属部门
                </div>
                <div class="inputDiv">
                  <el-select v-model="userAllData.deptId" placeholder="请选择部门" class="editInp" size="small">
                    <el-option
                      v-for="item in DepartList"
                      :key="item.deptId"
                      :label="item.deptName"
                      :value="item.deptId">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="11">
                <div class="inputName">
                  状态
                </div>
                <div class="inputDiv">
                  <el-select v-model="userAllData.statu" placeholder="请选择用户状态" class="editInp" size="small">
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="inputName">
                  手机号码
                </div>
                <div class="inputDiv">
                  <el-input v-model="userAllData.telephone" placeholder="请填写手机号码" class="editInp" size="small"></el-input>
                </div>
                <div class="inputName">
                  办公电话
                </div>
                <div class="inputDiv">
                  <el-input v-model="userAllData.Phone" placeholder="请填写办公电话" class="editInp" size="small"></el-input>
                </div>
                <div class="inputName">
                  邮箱地址
                </div>
                <div class="inputDiv">
                  <el-input v-model="userAllData.mail" placeholder="请填写邮箱地址" class="editInp" size="small"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>        
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      userAllData: {
        //用户的所有信息
        statu: "E" //用户状态默认为“启用”
      },
      statusList: [
        //用户状态
        { value: "E", label: "启用" },
        { value: "D", label: "禁用" }
      ],
      DepartList: [], //部门列表
      DepartValue: "", //部门属性
      roleList: [], //角色列表
      roleId: "" //角色属性
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      var params = { accessToken: localStorage.accessToken };
      //部门信息接口
      this.$axios
        .get(self.portUser + "/company/deptLst", params)
        .then(function(res) {
          if (res.data.code == 200) {
            self.DepartList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      //角色列表接口
      this.$axios
        .get(self.portUser + "/company/queryRoles", params)
        .then(function(res) {
          if (res.data.code == 200) {
            self.roleList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //创建用户事件接口
    saveUser() {
      var self = this;
      self.userAllData.accessToken = localStorage.accessToken;
      if (
        self.userAllData.username == "" ||
        self.userAllData.username == undefined
      ) {
        self.$message.error("用户名不能为空！");
        return;
      }
      if (
        self.userAllData.password == "" ||
        self.userAllData.password == undefined
      ) {
        self.$message.error("密码不能为空！");
        return;
      }
      this.$axios
        .post(self.portUser + "/account/createSub", self.userAllData)
        .then(function(res) {
          if (res.data.code == 200) {
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //取消按钮
    cancelUser() {
      this.$router.push({ path: "userManageDisp" });
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
    padding-left 10px
    color $base-color
  .viewTable
    margin 30px 0 0 100px
    .tdLeft
      width 180px
      color #9198a0
      font-size 14px
      height 40px
    .tdRight
      color #000
  .topMenuTxt
    font-size 16px
    color #2E3033
    font-weight bold
  .textRight
    text-align right
  .editUserTab
    padding 50px
    line-height 30px
    .inputName
      margin-top 15px
      color #8A9199
    .inputDiv
      .editInp
        width 80%
</style>