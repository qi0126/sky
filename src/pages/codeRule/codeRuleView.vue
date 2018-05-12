<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>编码规则查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="createCode">创建编码规则</el-button>
            </el-col>
            <el-col :span="18">
              <div class="topMenuRight">
                <el-button size="small" icon="el-icon-printer" >打印</el-button>
                <el-button size="small" icon="el-icon-upload2" >导出</el-button>
                <el-date-picker
                  v-model="selectedDay"
                  type="daterange"
                  align="right"
                  unlink-panels
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="daySelectData">
                </el-date-picker>
                <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select searchTxt" size="small">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-table
            :data="checkGoldData"
            stripe
            height="700"
            @row-click="viewProd"
            style="width: 100%; margin-top: 20px">
            <el-table-column
              type="selection"
              header-align='center'
              align='center'
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              header-align='center'
              align='center'
              width="50"
              label="序"
              >
            </el-table-column>
            <el-table-column
              prop="data_name"
              label="编码名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="model_name"
              label="业务模块"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="where_condition"
              label="查询条件"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="code_format"
              label="编码格式"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="prefix"
              label="前缀"
              >
            </el-table-column>
            <el-table-column
              prop="suffix"
              label="后缀"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="digit"
              label="流水码位数"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="auto_count"
              label="自动计数"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="current_count"
              label="当前记录数"
              sortable
              >
            </el-table-column>
            <el-table-column
              label="操作"
              sortable
              >
              <template slot-scope="scope">
                <el-button @click="delCode(scope.row)" type="warning" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      checkGoldData: [],
      dialogTableVisible: false, //金料单弹出框
      selectedDay: "", //日期选择属性
      searchTxt: "" //搜索字段
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      this.$axios
        .get(this.portUrl + "/batar-sjy-manage/stock/coderule/order/list")
        .then(function(res) {
          if (res.data.code == 200) {
            self.checkGoldData = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //点击查看验料单
    viewProd(elem) {
      var self = this;
      this.$router.push({ path: "codeRuleEdit", query: { editId: elem.id } });
    },
    //创建新编码规则
    createCode() {
      var self = this;
      // this.$http.get('http://192.168.21.122:9091/batar-sjy-manage/stock/account/order/list')
          // .then(function (response) {
          //   console.log(response)
          // })
      self.$router.push({
        path: "codeRuleEdit",
        query: { editId: "createCode" }
      });
    },
    //删除编码规则
    delCode(elem) {
      var self = this;
      this.$confirm("此操作将永久删除该编码规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            PRS: {
              orderId: elem.id
            }
          };
          this.$axios
            .get(
              this.portUrl + "/batar-sjy-manage/stock/coderule/order/delete",
              params
            )
            .then(function(res) {
              if (res.data.code == 200) {
                self.$message.success("已经删除成功，现在正在刷新！");
                setTimeout(function() {
                  self.created_fun()
                }, 2000);
              } else {
                self.$message.error(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
  .topMenuRight
    text-align right
  .searchTxt
    width 200px
</style>