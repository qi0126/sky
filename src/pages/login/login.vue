<template>
    <div class="conBigDiv">
      <div id="loginBig">
        <el-row>
          <el-col :span="12">
              <img src="/static/images/loginImg/leftIco.png" class="leftIco"/>
          </el-col>
          <el-col :span="12">
            <div class="loginRight">
              <img src="/static/images/loginImg/logoIco.png" class="logoIco"/>
                <el-input
                  placeholder="请输入用户名"
                  v-model="userName"
                  size="large">
                  <template slot="prepend">
                    <i class="iconfont icon-yonghuming"></i>
                  </template>
                </el-input>
                <br/>
                <el-input
                  placeholder="请输入密码"
                  v-model="userPassword"
                  type="password"
                  size="large">
                  <template slot="prepend">
                    <i slot="prefix" class=" iconfont icon-mima"></i>
                  </template>
                </el-input>
                <br/>
                <el-button type="primary" class="loginBtn" @click="loginFun">登 录</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // userName: "sjyadmin",
      userName: "sjy1",
      userPassword: "123456"
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {},
    loginFun() {
      var self = this;
      let params = {
        loginName: self.userName,
        password: self.userPassword
      };
      this.$axios
        .post(this.portUser + "/account/login", params)
        .then(function(res) {
          if (res.data.code == 200) {
            localStorage.accessToken = res.data.data;
            self.$message.success("登录成功，正在跳转中！");
            setTimeout(function() {
              self.$router.push("/index/checkGoldWare");
            }, 1000);
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
$font-color = #999
.conBigDiv
  height 100%
  background-image url('/static/images/loginImg/background.png')
  text-align center
  padding-top 10%
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
  #loginBig
    background-color #ffffff
    width 1020px
    height 460px
    border-radius 10px
    margin 0 auto
    text-align center
    padding-top 100px
    .leftIco
      margin-left 100px
    .loginRight
      text-align left
      padding 0px 80px 20px 65px
      line-height 70px
      .loginBtn
        width 100%
        margin-top 86px
</style>