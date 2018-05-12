<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单采购系统</el-breadcrumb-item>
            <el-breadcrumb-item>金价变更记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div class="tabD">
          <el-row>
            <el-col :span="12" class="tabTop">
              千足金价(每克):<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入千足金价" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              万足金价(每克)<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              记录人<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              记录时间<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              创建人<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              创建时间<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              备注<br/>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="请输入内容"
                class="inputD"
                v-model="codeAllData.class_name">
              </el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              记录状态<br/>
              <el-input v-model="codeAllData.class_name" placeholder="请输入内容" class="inputD"></el-input>
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
      codeFormatList: [
        //编辑格式数据列表
        { key: "X+YYMMDD+NUM", value: "前缀+YYMMDD+流水码" },
        { key: "X+YYMMDD", value: "前缀+YYMMDD" },
        { key: "X+NUM", value: "前缀+流水码" },
        { key: "X+NUM+Z", value: "前缀+流水码+后缀" },
        { key: "NUM", value: "流水码" }
      ],
      codeFormatPower: { prefix: true, suffix: true, digit: true }, //编辑格式权限列表
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
        self.createTf = true;
        self.codeAllData = {};
        self.codeAllData.mode = "1";
        self.codeAllData.code_format = "X+YYMMDD+NUM";
        self.codeAllData.auto_count = 0;
        self.codeAllData.current_count = 0;
      } else {
        self.createTf = false;
        let params = {
          PRS: {
            orderId: self.codeData
          }
        };
        this.$axios
          .get(
            this.portUrl + "/batar-sjy-manage/stock/coderule/order/form",
            params
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.codeAllData = res.data.data;
              self.codeFormat();
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
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
    padding-left 8px
  .tabD
    padding 20px 80px
    .tabTop
      margin-top 20px
      color #8A9199
      font-size 14px
      padding-bottom 10px
      line-height 30px
    .blackFont
      color #333333
  .inputD
    width 90%
</style>