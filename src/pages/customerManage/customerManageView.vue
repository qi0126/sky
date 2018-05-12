<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户详细资料</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="2">
              <div class="imgTemp">Logo</div>
            </el-col>
            <el-col :span="14">
              <div class="customerName">{{customerAllData.companyName}}</div>
              <div class="customerState">
                <span v-if="customerAllData.statu =='E'">启用状态</span>
                <span v-else-if="customerAllData.statu =='D'">禁用状态</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="menuDiv">
                <el-button type="primary" size="small">申请审核</el-button>
                <el-button plain size="small" @click="editCustomer">编辑</el-button>
                <el-button plain size="small">打印</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <hr/>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础资料" name="first">
              <table class="viewTable" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="tdLeft">公司编码</td>
                  <td class="tdRight">{{customerAllData.companyCode}}</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司ID</td>
                  <td class="tdRight">{{customerAllData.companyId}}</td>
                </tr>
                <tr>
                  <td class="tdLeft">财务负责人</td>
                  <td class="tdRight">{{customerAllData.concat}}</td>
                </tr>
                <tr>
                  <td class="tdLeft">财务联系电话</td>
                  <td class="tdRight">0755-123456(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">财务编码</td>
                  <td class="tdRight">{{customerAllData.financeCode}}</td>
                </tr>
                <tr>
                  <td class="tdLeft">财务传真</td>
                  <td class="tdRight">0755-123456(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司负责人</td>
                  <td class="tdRight">王XX(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">法人代表</td>
                  <td class="tdRight">王XX(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司电话</td>
                  <td class="tdRight">0755-123456(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司地址</td>
                  <td class="tdRight">深圳市罗湖区水贝一路(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">所属团队</td>
                  <td class="tdRight">尚金缘团队(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">信用代码证</td>
                  <td class="tdRight">456789(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司账户</td>
                  <td class="tdRight">admin(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">登录密码</td>
                  <td class="tdRight">******(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">所属国家</td>
                  <td class="tdRight">中国(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">所属省份/城市</td>
                  <td class="tdRight">广东/广州(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">所属区域</td>
                  <td class="tdRight">华南区(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">关联业务员</td>
                  <td class="tdRight">李XX(!!!)</td>
                </tr>
                <tr>
                  <td class="tdLeft">辅助业务员</td>
                  <td class="tdRight">张XX,陈XX(!!!)</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="合同书" name="second">
              <table class="viewTable" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="tdLeft">信用额度</td>
                  <td class="tdRight">10000</td>
                </tr>
                <tr>
                  <td class="tdLeft">额度审批人</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">信用等级</td>
                  <td class="tdRight">FJ321645</td>
                </tr>
                <tr>
                  <td class="tdLeft">产品购销合同编码</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">产品委托加工合同编码</td>
                  <td class="tdRight">王XX</td>
                </tr>
                <tr>
                  <td class="tdLeft">第一委托人</td>
                  <td class="tdRight">王XX</td>
                </tr>
                <tr>
                  <td class="tdLeft">身份证号</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">手机号码</td>
                  <td class="tdRight">深圳市罗湖区水贝一路</td>
                </tr>
                <tr>
                  <td class="tdLeft">第二委托人</td>
                  <td class="tdRight">尚金缘团队</td>
                </tr>
                <tr>
                  <td class="tdLeft">身份证号</td>
                  <td class="tdRight">456789</td>
                </tr>
                <tr>
                  <td class="tdLeft">备注</td>
                  <td class="tdRight">admin</td>
                </tr>
                <tr>
                  <td class="tdLeft">优惠政策</td>
                  <td class="tdRight">******</td>
                </tr>
                <tr>
                  <td class="tdLeft">委托方开户行</td>
                  <td class="tdRight">中国</td>
                </tr>
                <tr>
                  <td class="tdLeft">委托方银行账号</td>
                  <td class="tdRight">23432454613532452345</td>
                </tr>
                <tr>
                  <td class="tdLeft">开始时间~结束时间</td>
                  <td class="tdRight">(2018-01-01)~(2020-12-31)</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="授权书" name="third">
              <table class="viewTable" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="tdLeft">授权委托书编号</td>
                  <td class="tdRight">31214654</td>
                </tr>
                <tr>
                  <td class="tdLeft">客户委托人</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">委托项目</td>
                  <td class="tdRight">FJ321645</td>
                </tr>
                <tr>
                  <td class="tdLeft">传真机号</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">委托日期</td>
                  <td class="tdRight">2018-05-09</td>
                </tr>
                <tr>
                  <td class="tdLeft">受托日期</td>
                  <td class="tdRight">2018-05-09</td>
                </tr>
                <tr>
                  <td class="tdLeft">公司电话</td>
                  <td class="tdRight">0755-123456</td>
                </tr>
                <tr>
                  <td class="tdLeft">客户受托人</td>
                  <td class="tdRight">
                    周XX(45464786486461213)<br/>
                    周XX(45464786486461213)<br/>
                    周XX(45464786486461213)<br/>
                  </td>
                </tr>
              </table>
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
      activeName: "first",
      customerId: "", //客户ID
      customerAllData:{}//客户数据
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      console.log(this.$route.query)
      self.customerAllData = this.$route.query
      // self.customerId = window.location.hash.split("=")[1];
    },
    //选项卡切换事件
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    editCustomer() {
      var self = this;
      this.$router.push({
        path: "customerManageEdit",
        query:self.customerAllData
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
  .customerState
    font-size 14px
    color #2E3033
  .menuDiv
    text-align right
  .viewTable
    margin 30px 0 0 100px
    .tdLeft
      width 180px
      color #9198a0
      font-size 14px
      height 20px
    .tdRight
      color #000
      line-height 40px
      font-size 14px
</style>