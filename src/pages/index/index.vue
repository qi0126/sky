<template>
  <div class="index">
    <div class="headerWrapper">
      <div class="headerLeft">
        <span class="title">尚金缘订单销售系统</span>
        <el-menu :default-active="menuIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="">
          <el-menu-item v-for="item in mainMenu" :index="item.id+''" :key="item.id+''">
            {{item.menuName}}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="headerRight">
        <span class="accoutName" @click="editUser">欢迎你，{{ accountData.concat }}</span>
        <i class="el-icon-menu" @click="loginOut"></i>
        <el-dialog
          title="个人资料"
          :visible.sync="editDialogTF"
          width="780px">
          <div class="editUserDiv">
            <el-row>
              <el-col :span="4" class="editUserLeft">
                用户名称
              </el-col>
              <el-col :span="20" class="editUserRight">
                {{accountData.username}}
              </el-col>
              <el-col :span="4" class="editUserLeft">
                用户姓名
              </el-col>
              <el-col :span="20" class="editUserRight">
                {{accountData.concat}}
              </el-col>
              <el-col :span="4" class="editUserLeft">
                用户状态
              </el-col>
              <el-col :span="20" class="editUserRight">
                <span v-if="accountData.statu == 'E'">已启用</span>
                <span v-else-if="accountData.statu == 'D'">已禁用</span>
              </el-col>
              <el-col :span="4" class="editUserLeft">
                密码设置
              </el-col>
              <el-col :span="20" class="editUserRight">
                <span v-if="!editUserState">******</span>
                <span v-else>
                  <el-input type="password" v-model="accountData.oldPassword" placeholder="请输入原始密码" size="small" class="userInp"></el-input><br/>
                  <el-input type="password" v-model="accountData.password" placeholder="请输入新密码" size="small" class="userInp"></el-input>
                  <el-input type="password" v-model="accountData.passwordTwo" placeholder="再输入一遍新密码" size="small" class="userInp"></el-input><br/>
                </span>
              </el-col>
              <el-col :span="4" class="editUserLeft">
                联系电话
              </el-col>
              <el-col :span="20" class="editUserRight">
                <span v-if="!editUserState">{{accountData.telephone}}</span>
                <span v-else>
                  <el-input v-model="accountData.telephone" placeholder="请输入联系电话" size="small" class="userInp"></el-input>
                </span>
              </el-col>
              <el-col :span="4" class="editUserLeft">
                邮箱地址
              </el-col>
              <el-col :span="20" class="editUserRight">
                <span v-if="!editUserState">{{accountData.mail}}</span>
                <span v-else>
                  <el-input v-model="accountData.mail" placeholder="请输入邮箱地址" size="small" class="userInp"></el-input>
                </span>
              </el-col>
              <el-col :span="4" class="editUserLeft">
                所属角色
              </el-col>
              <el-col :span="20" class="editUserRight">
                {{accountData.roleName}}
              </el-col>
              <el-col :span="4" class="editUserLeft">
                所属部门
              </el-col>
              <el-col :span="20" class="editUserRight">
                {{accountData.deptName}}
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUserFun" size="small"  v-if="!editUserState">修 改</el-button>
            <el-button @click="editDialogTF = false" size="small" v-if="editUserState">取 消</el-button>
            <el-button type="primary" @click="saveUser" size="small" v-if="editUserState">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="buttomWrapper">
      <div class="leftWrapper">
        <el-row class="menu">
          <el-col style="margin-top: 13px;">
            <el-menu
              :router="true"
              :unique-opened="true"
              @select="handleSelect"
              default-active="activeIndex">
              <div v-for="(item,index) in menus.menu" :key="index+''">
                <template v-if="item.childs.length > 0">
                  <el-submenu :index="index+''">
                    <template slot="title">
                      <!-- <el-badge :value="12" :max="99" class="item"> -->
                        <span>{{item.menuName}}</span>
                      <!-- </el-badge> -->
                    </template>
                    <el-menu-item v-for="child in item.childs" :index="child.menuUrl" :key="child.menuUrl">
                      {{child.menuName}}
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="item.menuUrl+''"> 
                    <i class="iconfont" :class="item.icon"></i>
                    <span slot="title">{{item.menuName}}</span>
                  </el-menu-item>
                </template>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="rightWrapper">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      menuIndex: "2",
      activeIndex: "50",
      tempData: "暂无",
      mainMenu: [
        {
          id: 1,
          menuName: "金库",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        {
          id: 2,
          menuName: "采购",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        {
          id: 3,
          menuName: "销售",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        {
          id: 4,
          menuName: "原料管理",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        {
          id: 5,
          menuName: "库存管理",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        {
          id: 6,
          menuName: "财务管理",
          menuUrl: "/index/test",
          companyId: 1,
          parentId: 0,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        }
      ],
      menus: {
        default: {
          id: 44,
          menuName: "产品库",
          menuUrl: "/index/checkGoldWare",
          companyId: 1,
          parentId: 43,
          icon: null,
          isDefault: 1,
          createTime: "2018-01-29 05:25:41",
          childs: []
        },
        menu: [
          {
            id: 50,
            menuName: "原料管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "验料（金库）",
                menuUrl: "/Index/checkGoldWare",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 52,
                menuName: "验料（测金）",
                menuUrl: "/Index/checkGoldTest",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 53,
                menuName: "收料",
                menuUrl: "/Index/checkReceiveMater",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 54,
                menuName: "发料",
                menuUrl: "/Index/checkSendMater",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 55,
                menuName: "提纯",
                menuUrl: "/Index/checkPurify",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 56,
                menuName: "金料库存列表",
                menuUrl: "/Index/checkGoldStock",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 57,
                menuName: "料转饰",
                menuUrl: "/Index/checkMaterToOrna",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 58,
                menuName: "饰转料",
                menuUrl: "/Index/checkOrnaToMater",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "库存管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "入库单",
                menuUrl: "/Index/stockEnterDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 52,
                menuName: "出库单",
                menuUrl: "/Index/stockLeaveDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 53,
                menuName: "调拨单",
                menuUrl: "/Index/stockAllotDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 53,
                menuName: "存欠表",
                menuUrl: "/Index/saveOweDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "客户管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "客户管理",
                menuUrl: "/Index/customerManageDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 52,
                menuName: "客户审核",
                menuUrl: "/index/checkGoldTest",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 53,
                menuName: "正式客户",
                menuUrl: "/index/checkReceiveMater",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "供应商管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "供应商管理",
                menuUrl: "/index/checkGoldWare",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 52,
                menuName: "供应商审核",
                menuUrl: "/index/checkGoldTest",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 53,
                menuName: "正式供应商",
                menuUrl: "/index/checkReceiveMater",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "用户管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "用户管理",
                menuUrl: "/index/userManageDisp",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              },
              {
                id: 52,
                menuName: "角色权限管理",
                menuUrl: "/index/roleAuthoManage",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "产品管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "产品库",
                menuUrl: "/index/productView",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "财务管理",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            icon: "bt-proManagerIcon",
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 51,
                menuName: "金价变更记录",
                menuUrl: "/index/goldPriceView",
                companyId: 1,
                parentId: 43,
                icon: null,
                isDefault: 1,
                createTime: "2018-01-29 05:25:41",
                childs: []
              }
            ]
          },
          {
            id: 50,
            menuName: "公司管理",
            menuUrl: "/index/companyView",
            companyId: 1,
            parentId: null,
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: []
          },
          {
            id: 50,
            menuName: "系统设置",
            menuUrl: null,
            companyId: 1,
            parentId: null,
            isDefault: null,
            createTime: "2018-01-29 05:25:09",
            childs: [
              {
                id: 50,
                menuName: "编码规则",
                menuUrl: "/index/codeRuleView",
                companyId: 1,
                parentId: null,
                isDefault: null,
                createTime: "2018-01-29 05:25:09",
                childs: []
              },
              {
                id: 50,
                menuName: "库位表",
                menuUrl: "/index/dataBase",
                companyId: 1,
                parentId: null,
                isDefault: null,
                createTime: "2018-01-29 05:25:09",
                childs: []
              },
              {
                id: 50,
                menuName: "库位移动记录",
                menuUrl: "/index/materMoveView",
                companyId: 1,
                parentId: null,
                isDefault: null,
                createTime: "2018-01-29 05:25:09",
                childs: []
              }
            ]
          }
        ]
      },
      accountIcon: null,
      accountName: "系统用户",
      accountData: {}, //当前用户
      editDialogTF: false, //编辑用户弹出框属性
      editUserState: false //编辑用户状态（false为查看状态，true为编辑状态）
    };
  },
  methods: {
    //获取用户基本信息
    getBaseInfo() {
      var self = this;
      let params = {
        PRS: {
          accessToken: localStorage.accessToken
        }
      };
      self.$axios
        .get(this.portUser + "/account/myinfo", params)
        .then(function(res) {
          if (res.data.code == 200) {
            self.accountData = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        });
      localStorage.getItem("accountName")
        ? (this.accountName = localStorage.getItem("accountName"))
        : (this.accountName = "暂无");
    },
    //修改当前用户按钮
    editUser() {
      var self = this;
      self.editUserState = false;
      self.editDialogTF = true;
    },
    //编辑用户信息
    editUserFun() {
      var self = this;
      this.$confirm("确认修改当前用户？", "提示", {
        type: "warning"
      })
        .then(() => {
          self.editUserState = true;
        })
        .catch(() => {});
    },
    //修改当前用户信息保存按钮
    saveUser() {
      var self = this;
      //密码校验
      if (self.accountData.password != undefined) {
        if (self.accountData.oldPassword == undefined) {
          self.accountData.oldPassword = "";
        }
        if (
          self.accountData.password != self.accountData.passwordTwo ||
          !self.$v.verifyPassword(self.accountData.password) ||
          !self.$v.verifyPassword(self.accountData.oldPassword)
        ) {
          self.$message.error(
            "两个新密码输入不相同或密码少于6位，请重新输入！"
          );
          return;
        }
      }

      this.$axios
        .post(this.portUser + "/account/updateInfo", self.accountData)
        .then(function(res) {
          if (res.data.code == 200) {
            console.log(res.data.data);
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });

    },

    //退出登录
    loginOut() {
      var self = this;
      let params = {
        PRS: {
          accessToken: localStorage.accessToken
        }
      };
      this.$confirm("确认退出登录？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(this.portUser + "/account/logout", params)
            .then(function(res) {
              if (res.data.code == 200) {
                // console.log(res.data);
                localStorage.accessToken = "";
              } else {
                self.$message.error(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
          self.$router.push("/login");
        })
        .catch(() => {});
    },
    handleSelect(key, keyPath) {
      sessionStorage.setItem("currentPath", key);
    },
    //用户初始化
    initPath() {
      let currentPath = sessionStorage.getItem("currentPath");
      if (currentPath && currentPath != "") {
        this.activeIndex = currentPath;
      } else {
        this.activeIndex = this.menus.default.menuUrl;
      }
    },
    //菜单数据读取
    getMenus() {}
  },
  created() {
    this.getMenus();
    this.getBaseInfo();
  }
};
</script>
<style>
.el-badge__content.is-fixed {
  top: 14px;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50)
body
  background-color #f3f3f3
.index
  overflow hidden
  .title
    background-color $base-color
    color #ffffff
    height 33px
    width 195px
    text-align center
    padding-top 17px
    font-size 14px
  .headerWrapper
    background #ffffff
    margin-bottom 15px
    box-shadow 0 1px 5px #EBEBEB
    height 50px
    display flex
    justify-content space-between
    align-items center
    .headerLeft
      color $base-color
      margin-left 0px
      display flex
      align-items center
      i.logoIcon:after
        content '\e61a'
        font-size 1.5rem
        margin-right 5px
    .headerRight
      color #2D2F33
      margin-right 25px
      display flex
      align-items center
      font-size 0.6rem
      .noLoginIcon
        width 25px
        height 25px
        border-radius 50%
      i
        cursor pointer
      i.outLoginIcon:after
        content '\e654'
        transition color 0.5s
      i.outLoginIcon
        &:hover
          color $base-color
      .accoutName
        margin 0 50px 0 5px
        font-size 14px
        cursor pointer
  .el-menu-demo
    height 50px
    li
      height 50px
      line-height 49px
  .buttomWrapper
    display flex
    .leftWrapper
      width 200px
      box-shadow 1px 0 5px #EBEBEB
      background #ffffff
      overflow auto
      overflow-x hidden
      position absolute
      top 60px
      left 0
      right 0
      bottom 0
      border-top-right-radius 8px
      .iconfont
        margin-right 0.5rem
    .rightWrapper
      border-top-left-radius 8px
      padding 15px 15px 0 15px
      flex 1
      box-shadow -1px 0 5px #EBEBEB
      background #ffffff
      overflow auto
      overflow-x hidden
      box-sizing border-box
      position absolute
      top 60px
      left 210px
      right 0
      bottom 0
  .editUserDiv
    line-height 40px
    .editUserLeft
      color #999999
    .editUserRight
      color #333333
      .userInp
        width 200px
        margin-right 30px
        float left
i.bt-proManagerIcon:after
  content '\e601'
i.bt-genManagerIcon:after
  content '\e650'
i.bt-genColumnIcon:after
  content '\e61c'
i.bt-homePageCmIcon:after
  content '\e608'
i.bt-sellManagerIcon:after
  content '\e604'
i.bt-custManagerIcon:after
  content '\e607'
i.bt-orderManagerIcon:after
  content '\e602'
i.bt-systemManagerIcon:after
  content '\e61b'
i.bt-dataStatisticsIcon:after
  content '\e603'
i.bt-userFeedBackIcon:after
  content '\e60d'
i.bt-userManagerIcon:after
  content '\e61d'
i.bt-companyManagerIcon:after
  content '\e606'
.item
  margin-top 10px
  margin-right 40px
</style>
