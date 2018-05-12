<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单采购系统</el-breadcrumb-item>
            <el-breadcrumb-item>库位移动记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div class="tabD">
          <el-row>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                源库位名称
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.source_stock_name}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                源库位ID
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.source_stock_id}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                目标库位名称
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.target_stock_name}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                目标库位ID
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.target_stock_id}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                产品名称
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.product_name}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                产品ID
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.product_id}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                移动净重
              </el-col>
              <el-col :span="8">
                <span class="blackFont">{{codeAllData.net_weight}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                创建时间
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.create_time}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                修改时间
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.update_time}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                制单人名称
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.order_uid_name}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                制单人ID
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.order_uid}}</span>
              </el-col>
            </el-col>
            <el-col :span="12" class="tabTop">
              <el-col :span="8">
                备注
              </el-col>
              <el-col :span="16">
                <span class="blackFont">{{codeAllData.note}}</span>
              </el-col>
            </el-col>
          </el-row>
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      codeData: "", //当前查看编辑id
      activeName: "first", //选项卡默认第几项
      codeAllData: {}, //当前编辑规则的所有数据
      createTf: false, //创建状态（“创建新规则”）
      modeList: [
        //模式数据列表
        { key: "1", value: "非智能" },
        { key: "2", value: "智能" }
      ]
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      self.codeData = window.location.hash.split("=")[1];
      if (self.codeData == "createCode") {
        self.codeAllData = {};
        self.codeAllData.mode = "1";
        self.codeAllData.code_format = "X+YYMMDD+NUM";
        self.codeAllData.auto_count = 0;
        self.codeAllData.current_count = 0;
      } else {
        let params = {
          PRS: {
            orderId: self.codeData
          }
        };
        this.$axios
          .get(
            this.portUrl + "/batar-sjy-manage/stock/stockposition/move/form",
            params
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.codeAllData = res.data.data;
              self.codeAllData.create_time = self.$api.dateGetDay(self.codeAllData.create_time)
              self.codeAllData.update_time = self.$api.dateGetDay(self.codeAllData.update_time)
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
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
    padding-left 8px
  .tabD
    padding 20px 80px
    .tabTop
      margin-top 20px
      color #8A9199
      font-size 14px
      padding-bottom 10px
    .blackFont
      color #333333
</style>