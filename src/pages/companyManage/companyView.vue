<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单采购系统</el-breadcrumb-item>
            <el-breadcrumb-item>公司管理</el-breadcrumb-item>
            <el-breadcrumb-item>公司查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <el-row class="companyDiv">
          <el-col :span="3" class="DivLeft">
            <el-button type="info" size="medium">图片<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
          <el-col :span="16" class="DivCenter">
            福建华融尚福黄金珠宝有限公司
          </el-col>
          <el-col :span="5" class="DivRight">
            <el-button type="primary" size="small" @click="editCompany">编辑</el-button>
          </el-col>
        </el-row>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础资料" name="first" class="tab">
              <el-row>
                <el-col :span="4" class="tabLeft">
                  公司负责人
                </el-col>
                <el-col :span="20" class="tabRight">
                  与志明
                </el-col>
                <el-col :span="4" class="tabLeft">
                  法人代表
                </el-col>
                <el-col :span="20" class="tabRight">
                  与志明
                </el-col>
                <el-col :span="4" class="tabLeft">
                  公司电话
                </el-col>
                <el-col :span="20" class="tabRight">
                  0755-55555555
                </el-col>
                <el-col :span="4" class="tabLeft">
                  公司传真
                </el-col>
                <el-col :span="20" class="tabRight">
                  0755-555555
                </el-col>
                <el-col :span="4" class="tabLeft">
                  公司邮箱
                </el-col>
                <el-col :span="20" class="tabRight">
                  XXX@163.com
                </el-col>
                <el-col :span="4" class="tabLeft">
                  公司地址
                </el-col>
                <el-col :span="20" class="tabRight">
                  福建省XXXXXXXX 
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="下属部门" name="second" class="tab">
              <el-row>
                <el-col :span="12" class="branchD">
                  业务部<br/>
                  <div class="DepartD" @click="branchView(index)">
                    部门成员共12人
                  </div>
                </el-col>
                <el-col :span="12" v-for="index in 6" :key="index" class="branchD">
                  业务部<br/>
                  <div class="DepartD" @click="branchView(index)">
                    部门成员共12人
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-dialog
              title="查看部门信息"
              :visible.sync="branchVisible"
              width="700px">
              <div>
                <div>部门名称：
                  <el-input
                    placeholder="请输入内容"
                    v-model="companyName"
                    class="input50"
                    size="small">
                  </el-input>
                  <el-input
                    placeholder="请输入人名查找成员"
                    v-model="companyName"
                    class="input50"
                    size="small">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>              
                <div class="selectManDiv">
                  <div v-for="man in branchMan"  :key="man.id" class="checkboxDiv">
                    {{man.value}}
                  </div>
                </div>              
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="branchVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="selectManFun" size="small">确 定</el-button>
              </span>
            </el-dialog>
            <el-tab-pane label="下属团队" name="third" class="tab">
              <el-row>
                <el-col :span="12" class="branchD">
                  华南团队<br/>
                  <div class="DepartD" @click="branchView(index)">
                    团队成员共12人
                  </div>
                </el-col>
                <el-col :span="12" v-for="index in 6" :key="index" class="branchD">
                  华北团队<br/>
                  <div class="DepartD" @click="branchView(index)">
                    团队成员共12人
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first", //选项卡默认第几项
      //下属部门数据
      branchMan: [
        { id: 1, value: "张三" },
        { id: 2, value: "李四" },
        { id: 3, value: "张三三" },
        { id: 4, value: "李四四" }
      ], //部门人员信息
      valueNum: 0,
      branchVisible: false
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {},
    //编辑跳转页面
    editCompany() {
      var self = this;
      self.$router.push("companyEdit");
    },
    //部分信息查看
    branchView(elem) {
      var self = this;
      console.log(elem);
      self.branchVisible = true;
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
  .companyDiv
    .DivLeft
      text-align left
    .DivCenter
      font-size 24px
      color #2E3033
      font-family '黑体'
    .DivRight
      text-align right
  .tab
    padding 20px 50px
    line-height 36px
    .tabLeft
      color #8A9199
      font-size 14px
    .tabRight
      color #2E3033
      font-size 14px
  .branchD
    margin-top 20px
    color #8A9199
    font-size 14px
  .selectD
    width 96%
  .input50
    width 38%
    margin-right 5%
  .selectManDiv
    margin-top 20px
    border-top 1px #f0f0f0 solid
    padding-top 20px
    .checkboxDiv
      width 25%
      float left
  .DepartD
    width 70%
    border-radius 5px
    border 1px #CFD4E5 solid
    padding-left 15px
    cursor pointer
</style>