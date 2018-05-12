<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单采购系统</el-breadcrumb-item>
            <el-breadcrumb-item>编码规则</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <div>
            
            <el-button type="primary" icon="el-icon-plus" size="small" @click="createCode" v-if="createTf">创建</el-button>
            <el-button type="primary" icon="el-icon-sort" size="small" @click="saveCode" v-else>保存</el-button>
          </div>
          <el-row>
            <el-col :span="12" class="tabTop">
              数据库表名<span class="red_font">*</span>
            </el-col>
            <el-col :span="12" class="tabTop">
              类的全限定名<span class="red_font">*</span>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.data_name" placeholder="请输入数据库表名" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.class_name" placeholder="请输入类的全限定名" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              模块名称
            </el-col>
            <el-col :span="12" class="tabTop">
              编码格式
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.model_name" placeholder="请输入模块名称" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-select v-model="codeAllData.code_format" placeholder="请选择" size="small" class="selectD"  @change="codeFormat">
                <el-option
                  v-for="item in codeFormatList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="tabTop">
              前缀<span class="red_font" v-if="codeFormatPower.prefix">*</span>
            </el-col>
            <el-col :span="12" class="tabTop">
              后缀<span class="red_font" v-if="codeFormatPower.suffix">*</span>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.prefix" placeholder="请输入前缀" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.suffix" placeholder="请输入后缀" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabTop">
              位数<span class="red_font" v-if="codeFormatPower.digit">*</span>
            </el-col>
            <el-col :span="12" class="tabTop">
              模式
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input v-model="codeAllData.digit" placeholder="请输入位数" size="small"></el-input>
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-select v-model="codeAllData.mode" placeholder="请选择" size="small" class="selectD">
                <el-option
                  v-for="item in modeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="tabTop">
              自动计数
            </el-col>
            <el-col :span="12" class="tabTop">
              当前累计
            </el-col>
            <el-col :span="12" class="tabBottom">
              {{codeAllData.auto_count}}
            </el-col>
            <el-col :span="12" class="tabBottom">
              {{codeAllData.current_count}}
            </el-col>
            <el-col :span="24" class="tabTop">
              备注
            </el-col>
            <el-col :span="12" class="tabBottom">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="codeAllData.node">
              </el-input>
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
    },
    //编码规则保存
    saveCode() {
      var self = this;
      if (
        this.$v.valiNull(self.codeAllData.data_name) &&
        this.$v.valiNull(self.codeAllData.class_name)
      ) {
        // console.log(self.codeFormatPower);
        var codeFormatTF = true;
        if (self.codeFormatPower.prefix) {
          if (!this.$v.valiNull(self.codeAllData.prefix)) {
            codeFormatTF = false;
          }
        }
        if (self.codeFormatPower.suffix) {
          if (!this.$v.valiNull(self.codeAllData.suffix)) {
            codeFormatTF = false;
          }
        }
        if (self.codeFormatPower.digit) {
          if (!this.$v.valiNull(self.codeAllData.digit)) {
            codeFormatTF = false;
          }
        }
        if (codeFormatTF) {
          this.$axios
            .post(
              this.portUrl + "/batar-sjy-manage/stock/coderule/order/edit",
              self.codeAllData
            )
            .then(function(res) {
              if (res.data.code == 200) {
                self.$message.success("已经保存成功，现在正在返回编辑规则！");
                setTimeout(function() {
                  self.$router.push("codeRuleView");
                }, 2000);
              } else {
                self.$message.error(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          self.$message.error("有必填项未填，请重新填写提交！")
          return
        }
      } else {
        self.$message.error("有必填项未填，请重新填写提交！")
        return
      }
    },
    //创建新的编码规则
    createCode() {
      var self = this;
      if (
        this.$v.valiNull(self.codeAllData.data_name) &&
        this.$v.valiNull(self.codeAllData.class_name)
      ) {
        var codeFormatTF = true;
        if (self.codeFormatPower.prefix) {
          if (!this.$v.valiNull(self.codeAllData.prefix)) {
            codeFormatTF = false;
          }
        }
        if (self.codeFormatPower.suffix) {
          if (!this.$v.valiNull(self.codeAllData.suffix)) {
            codeFormatTF = false;
          }
        }
        if (self.codeFormatPower.digit) {
          if (!this.$v.valiNull(self.codeAllData.digit)) {
            codeFormatTF = false;
          }
        }
        if (codeFormatTF) {
          this.$axios
            .post(
              this.portUrl + "/batar-sjy-manage/stock/coderule/order/create",
              self.codeAllData
            )
            .then(function(res) {
              if (res.data.code == 200) {
                self.$message.success("已经创建成功，现在正在返回编辑规则！");
                setTimeout(function() {
                  self.$router.push("codeRuleView");
                }, 2000);
              } else {
                self.$message.error(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          self.$message.error("有必填项未填，请重新填写提交！")
          return
        }
      } else {
        self.$message.error("有必填项未填，请重新填写提交！")
        return
      }
    },
    //编码格式权限
    codeFormat() {
      var self = this;
      switch (self.codeAllData.code_format) {
        case "X+YYMMDD+NUM":
          // console.log("前缀+YYMMDD+流水码")
          self.codeFormatPower.prefix = true;
          self.codeFormatPower.suffix = false;
          self.codeFormatPower.digit = true;
          break;
        case "X+YYMMDD":
          // console.log("前缀+YYMMDD")
          self.codeFormatPower.prefix = true;
          self.codeFormatPower.suffix = false;
          self.codeFormatPower.digit = false;
          break;
        case "X+NUM":
          // console.log("前缀+流水码")
          self.codeFormatPower.prefix = true;
          self.codeFormatPower.suffix = false;
          self.codeFormatPower.digit = true;
          break;
        case "X+NUM+Z":
          // console.log("前缀+流水码+后缀")
          self.codeFormatPower.prefix = true;
          self.codeFormatPower.suffix = true;
          self.codeFormatPower.digit = true;
          break;
        case "NUM":
          // console.log("流水码")
          self.codeFormatPower.prefix = false;
          self.codeFormatPower.suffix = false;
          self.codeFormatPower.digit = true;
          break;
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
  .tabTop
    margin-top 20px
    color #8A9199
    font-size 14px
    padding-bottom 10px
  .tabBottom
    padding-right 10%
  .selectD
    width 100%
</style>