<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户详细编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="2">
              <div class="imgTemp">Logo</div>
            </el-col>
            <el-col :span="14">
              <div class="customerName">
                <el-input v-model="activeName" placeholder="请设置客户公司名" class="NameInput"></el-input>
                <span class="red_font">*</span>
              </div>
              <div class="customerState">
                <el-radio-group v-model="startTF">
                  <el-radio :label="true">启用</el-radio>
                  <el-radio :label="false">禁用</el-radio>
                 </el-radio-group>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="menuDiv">
                <el-button type="primary" size="small">申请审核</el-button>
                <el-button plain size="small" @click="saveCustomer">保存</el-button>
                <el-button plain size="small">打印</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础资料" name="first">
              <div class="tabDiv">
                <el-row>
                  <el-col :span="11" class="tdTop">
                    财务联系人<br/>
                    <el-input v-model="nullName" placeholder="请设置财务联系人" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    信用代码证<br/>
                    <el-input v-model="nullName" placeholder="请设置信用代码证" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    财务联系电话<br/>
                    <el-input v-model="nullName" placeholder="请设置财务联系电话" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    公司账户<br/>
                    <el-input v-model="nullName" placeholder="请设置公司账户" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    财务编码<br/>
                    <el-input v-model="nullName" placeholder="请设置财务编码" class="NameInput"></el-input>
                    <span class="red_font">*</span>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    登录密码<br/>
                    <el-input v-model="nullName" type="password" placeholder="请设置登录密码" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    财务传真<br/>
                    <el-input v-model="nullName" placeholder="请设置财务传真" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    <div class="cityDiv">
                      所属地区<br/>
                      <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker>
                    </div>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    公司负责人<br/>
                    <el-input v-model="nullName" placeholder="请设置公司负责人" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    所属区域<br/>
                    <el-select v-model="tempID" placeholder="请选择" class="NameInput">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    法人代表<br/>
                    <el-input v-model="nullName" placeholder="请设置法人代表" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    关联业务员<br/>
                    <el-select v-model="tempID" placeholder="请选择" class="NameInput">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    公司电话<br/>
                    <el-input v-model="nullName" placeholder="请设置公司电话" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                     
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    辅助业务员<br/>
                    <el-select v-model="tempID" placeholder="请选择" class="NameInput">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    公司地址<br/>
                    <el-input v-model="nullName" placeholder="请设置公司地址" class="NameInput"></el-input>
                  </el-col>

                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="合同书" name="second">
              <div class="tabDiv">
                <el-row>
                  <el-col :span="11" class="tdTop">
                    信用额度<br/>
                    <el-input v-model="nullName" placeholder="请设置信用额度" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    第二委托人<br/>
                    <el-input v-model="nullName" placeholder="请填写客户公司第二委托人" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    额度审批人<br/>
                    <el-input v-model="nullName" placeholder="请填写额度审批人" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    身份证号<br/>
                    <el-input v-model="nullName" placeholder="请填写第二委托人的身份证号" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    信用等级<br/>
                    <el-input v-model="nullName" placeholder="请设置客户的信用等级" class="NameInput"></el-input>
                    <span class="red_font">*</span>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    手机号码<br/>
                    <el-input v-model="nullName" placeholder="请设置第二委托人的手机号码" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    产品购销合同编码<br/>
                    <el-input v-model="nullName" placeholder="请填写客户产品购销合同编码" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    备注<br/>
                    <el-input v-model="nullName" placeholder="请填写相关备注" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    产品委托加工合同编码<br/>
                    <el-input v-model="nullName" placeholder="请填写客户产品委托加工合同编码" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    优惠政策<br/>
                    <el-input v-model="nullName" placeholder="请设置客户的优惠政策" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    第一委托人<br/>
                    <el-input v-model="nullName" placeholder="请填写客户公司的委托人" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    委托人开户行<br/>
                    <el-input v-model="nullName" placeholder="请填写客户开户行" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    身份证号<br/>
                    <el-input v-model="nullName" placeholder="请填写委托人的身份证号" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    委托方银行账号<br/>
                    <el-input v-model="nullName" placeholder="请填写委托方银行账号" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    手机号码<br/>
                    <el-input v-model="nullName" placeholder="请填写委托人的手机号码" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    开始日期~结束日期<br/>
                    <el-date-picker
                      v-model="timeData"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>

                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="授权书" name="third">
              <div class="tabDiv">
                <el-row>
                  <el-col :span="11" class="tdTop">
                    授权委托书编号<br/>
                    <el-input v-model="nullName" placeholder="请填写授权委托书编号" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    传真机号<br/>
                    <el-input v-model="nullName" placeholder="请填写传真机号" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    委托人<br/>
                    <el-input v-model="nullName" placeholder="请填写委托人姓名" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    委托日期<br/>
                    <el-date-picker
                      v-model="timeData"
                      type="date"
                      class="NameInput"
                      placeholder="请选择委托日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    委托项目<br/>
                    <el-input v-model="nullName" placeholder="请填写委托的项目" class="NameInput"></el-input>
                  </el-col>
                  <el-col :span="2" class="tdTop">
                  </el-col>
                  <el-col :span="11" class="tdTop">
                    受托日期<br/>
                    <el-date-picker
                      v-model="timeData"
                      type="date"
                      class="NameInput"
                      placeholder="请选择受托日期">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </div>
              <div>
                <div class="custManD">客户受托人</div>
                <div>
                  <el-row>
                    <el-col :span="6">
                      <div class="viewManD">
                        周晓屏（41242318802410552X）
                        <i class="el-icon-circle-close-outline red_font"></i>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <el-button size="small" class="addManD">
                        <i class="el-icon-circle-plus-outline"></i>
                        添加委托人
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
	    </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      placeholders: {
        province: "------- 省 --------",
        city: "--- 市 ---",
        area: "--- 区 ---"
      },
      customerId: "", //客户ID
      customerAllData: {}, //客戶完整數據
      activeName: "first",
      nullName: "",
      tempID: "选项1",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      startTF: true, //启用禁用
      timeData: ""
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      self.customerAllData = this.$route.query;
      console.log(self.customerAllData);
      // self.customerId = window.location.hash.split("customerId=")[1];
    },
    //选项卡切换事件
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //保存客户
    saveCustomer() {
      var self = this
      console.log(self.placeholders)
      // this.$router.push("customerManageDisp");
    },
    onSelected(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      console.log(data)
    },
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
    font-size 14px
  .imgTemp
    width 80px
    height 50px
    text-align center
    font-size 16px
    color #9198a0
    padding-top 30px
    background #e4e7f0
    font-size 16px
  .customerName
    font-size 24px
    color #2E3033
    padding-bottom 24px
    .NameInput
      width 400px
  .customerState
    font-size 14px
    color #2E3033
  .menuDiv
    text-align right
  .tabDiv
    padding 20px 100px
    .tdTop
      color #8A9199
      margin-top 10px
      font-size 14px
      line-height 30px
      .NameInput
        // max-width 560px
        width 85%
    .cityDiv
      width 85%
      .citySelect
        width 100%
  .custManD
    padding-top 50px
    font-size 16px
    color #2E3033
    margin-bottom 20px
  .viewManD
    padding 10px
    background-color #E9ECF5
    font-size 14px
    color #333333
    width 60%
    border-radius 5px
    text-align center
  .addManD
    padding 10px 40px
    font-size 14px
</style>