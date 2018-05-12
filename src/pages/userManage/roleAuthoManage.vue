<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单采购系统</el-breadcrumb-item>
            <el-breadcrumb-item>推广栏目</el-breadcrumb-item>
            <el-breadcrumb-item>文字推广</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <div class="hr"/>
	      </div>
        <div>
          <el-row>
            <el-col :span="6" class="leftMenu">
              <div class="topMenu">
                角色列表
              </div>
              <div class="createRoleDiv">
                <el-button plain class="createRoleBtn" icon="el-icon-circle-plus-outline">创建新角色</el-button>
              </div>
              <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo userMenu">
                  <el-menu-item v-for='userList in userLists' :key="userList.id" :index="userList.id+''"  @mouseover.native="teamManOver(userList.id)" @mouseout.native="teamManOut(userList.id)" class="userDiv">
                    <span slot="title">{{userList.name}} <i class="iconfont icon-xingzhuang red_font" v-show="roleOverId == userList.id" ></i></span>
                    <span v-show="roleOverId == userList.id" class="roleRightBtnSpan">
                       <i class="iconfont icon-xingzhuang red_font"></i>
                       <i class="iconfont icon-xingzhuangkaobei red_font"></i>
                       <i class="iconfont icon-bianji red_font" @click="editUserTF(userList)"></i>
                       <i class="iconfont icon-xingzhuang1 red_font"></i>
                    </span>
                  </el-menu-item>
                </el-menu>
            </el-col>
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
                    xiaoming
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    用户姓名
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    李木子
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    用户状态
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    启用
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    密码设置
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    <span v-if="!editUserState">*******</span>
                    <span v-else>
                      <el-input v-model="input" placeholder="请输入原始密码" size="small" class="userInp"></el-input>
                      <el-input v-model="input" placeholder="请再次输认密码" size="small" class="userInp"></el-input>
                    </span>
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    联系电话
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    <span v-if="!editUserState">1381111111</span>
                    <span v-else>
                      <el-input v-model="input" placeholder="请输入联系电话" size="small" class="userInp"></el-input>
                    </span>
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    邮箱地址
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    <span v-if="!editUserState">1381111111</span>
                    <span v-else>
                      <el-input v-model="input" placeholder="请输入邮箱地址" size="small" class="userInp"></el-input>
                    </span>
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    所属角色
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    业务员
                  </el-col>
                  <el-col :span="4" class="editUserLeft">
                    所属部门
                  </el-col>
                  <el-col :span="20" class="editUserRight">
                    业务部
                  </el-col>
                </el-row>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editUserFun" size="small"  v-if="!editUserState">修 改</el-button>
                <el-button @click="editDialogTF = false" size="small" v-if="editUserState">取 消</el-button>
                <el-button type="primary" @click="editDialogTF = false" size="small" v-if="editUserState">保 存</el-button>
              </span>
            </el-dialog>
            <el-col :span="18">
              <div class="topMenu">
                角色权限设置
              </div>
              <div>
                <el-row>
                  <el-col :span="4">
                    <el-menu
                      default-active="1"
                      class="el-menu-vertical-demo">
                      <el-menu-item v-for='authoList in authoLists' :key="authoList.id" :index="authoList.id+''">
                        <span slot="title">{{authoList.name}}</span>
                      </el-menu-item>
                    </el-menu>
                  </el-col>
                  <el-col :span="20" class="rightBottomMenu">
                    <div class="roleAuthoDiv" v-for='authoList in authoLists' :key="authoList.id">
                      <div :id="authoList.name">{{authoList.name}}</div>
                      <div>
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="临时学习" v-for="i in 6" class="checkboxClass" :key="i"></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </el-col>
                </el-row>
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
      tableData: [
        {
          id: "2",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "4",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: "6",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: "8",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      editDialogTF:false,//编辑用户弹出框属性
      editUserState:false,//编辑用户状态（false为查看状态，true为编辑状态）
      input:'',//暂时输入框数据
      userLists: [
        //角色列表
        { id: 1, name: "业务员" },
        { id: 2, name: "业务员" },
        { id: 3, name: "业务经理" },
        { id: 4, name: "业务助理" },
        { id: 5, name: "销售经理" },
        { id: 6, name: "区域经理" }
      ],
      roleOverId: "", //鼠标移动到哪个角色
      authoLists: [
        //角色权限列表
        { id: 1, name: "原料管理" },
        { id: 2, name: "库存管理" },
        { id: 3, name: "财务管理" },
        { id: 4, name: "销售管理" },
        { id: 5, name: "采购" },
        { id: 6, name: "账号" },
        { id: 7, name: "业务管理" },
        { id: 8, name: "数据管理" }
      ],
      checkList: [] //权限列表
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {},
    //创建新用户
    createUserFun() {
      this.$router.push("/Index/userManageCreate");
    },
    //改变多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      if (val.length == 0) {
        this.delBtnTF = false;
      } else {
        this.delBtnTF = true;
      }
    },
    //用户详细查看
    viewUser(elem) {
      this.$router.push({
        path: "/Index/userManageView",
        query: { userId: elem.id }
      });
    },
    //用户详细编辑
    editUser(elem) {
      this.$router.push({
        path: "/Index/userManageEdit",
        query: { userId: elem.id }
      });
    },
    //鼠标移动移入事件
    teamManOver(elem) {
      var self = this;
      self.roleOverId = elem;
    },
    //鼠标移动移出事件
    teamManOut(elem) {
      var self = this;
      self.roleOverId = "";
    },
    //编辑用户信息
    editUserTF(elem) {
      var self = this
      self.editUserState = false
      self.editDialogTF = true
      console.log(elem);
    },
    //点击编辑事件
    editUserFun(){
      var self = this
      self.editUserState = true
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
    margin-left 10px
  .topBtn
    text-align right
  .createRoleDiv
    text-align center
    padding 10px
    .createRoleBtn
      width 90%
  .topMenu
    height 30px
    font-size 16px
    padding 10px
    border-top 1px solid #e9eef5
  .leftMenu
    border 1px solid #e9eef5
    border-top 0
    .roleRightBtnSpan
      color $base-color
      float right
    .userMenu
      height 700px
      border-top 1px #f0f0f0 solid
      .userDiv
        border-bottom 1px #f0f0f0 solid
  .rightBottomMenu
    height 750px
    overflow-x auto
  .roleAuthoDiv
    padding 10px
    line-height 40px
    color #2E3033
    font-size 14px
  .checkboxClass
    width 20%
    margin-left 20px
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
</style>