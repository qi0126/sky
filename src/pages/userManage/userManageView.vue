<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户详细资料</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="12" class="topMenuTxt">基本资料</el-col>
            <el-col :span="12">
              <div class="textRight">
                <el-button type="primary" size="small" @click="editUser">编辑</el-button>
              </div>
              </el-col>
          </el-row>
          <div>
            <table class="viewTable" cellspacing="0" cellpadding="0">
              <tr>
                <td class="tdLeft">用户名</td>
                <td class="tdRight">周XX</td>
              </tr>
              <tr>
                <td class="tdLeft">密码</td>
                <td class="tdRight">******</td>
              </tr>
              <tr>
                <td class="tdLeft">用户姓名</td>
                <td class="tdRight">暂无</td>
              </tr>
              <tr>
                <td class="tdLeft">用户状态</td>
                <td class="tdRight">暂无</td>
              </tr>
              <tr>
                <td class="tdLeft">手机号码</td>
                <td class="tdRight">139111111111</td>
              </tr>
              <tr>
                <td class="tdLeft">办公电话</td>
                <td class="tdRight">0755-3123456</td>
              </tr>
              <tr>
                <td class="tdLeft">邮箱地址</td>
                <td class="tdRight">暂无</td>
              </tr>
              <tr>
                <td class="tdLeft">用户角色</td>
                <td class="tdRight">业务员</td>
              </tr>
              <tr>
                <td class="tdLeft">所属部门</td>
                <td class="tdRight">业务部</td>
              </tr>
            </table>
          </div>
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      userId: -1
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      self.userId = location.hash.split("=")[1];
    },
    //编辑用户按欣慰
    editUser() {
      var self = this;
      this.$router.push({
        path: "/Index/userManageEdit",
        query: { userId: self.userId }
      });
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
</style>