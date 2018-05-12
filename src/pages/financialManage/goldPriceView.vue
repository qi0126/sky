<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>金价变更记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="24">
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
              label="千足金价(每克)"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="model_name"
              label="万足金价(每克)"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="where_condition"
              label="记录人"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="code_format"
              label="记录时间"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="prefix"
              label="创建人"
              >
            </el-table-column>
            <el-table-column
              prop="suffix"
              label="创建时间"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="auto_count"
              label="记录状态"
              sortable
              >
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
      this.$router.push({ path: "goldPriceEdit", query: { editId: elem.id } });
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
  .topMenuRight
    text-align right
  .searchTxt
    width 200px
</style>