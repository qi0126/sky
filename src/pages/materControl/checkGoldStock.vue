<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>金料库存列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-plus" size="small" v-if="createTestBtnTF" @click="checkMaterial">生成验料单</el-button>
              -
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
            :summary-method="getSummaries"
            show-summary
            @row-click="editGold"
            @selection-change="handleSelectionChange"
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
              prop="material_code"
              label="金料编号"
              >
            </el-table-column>
            <el-table-column
              prop="material_name"
              label="金料名称"
              >
            </el-table-column>
            <el-table-column
              label="类型"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.flow_type == '1'">先验后收</span>
                <span v-else-if="scope.row.flow_type == '2'">先收后验</span>
                <span v-else-if="scope.row.flow_type == '3'">免验</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="net_weight"
              label="总净重"
              >
            </el-table-column>
            <el-table-column
              prop="quality"
              label="成色"
              >
            </el-table-column>
            <el-table-column
              prop="is_check"
              label="是否验料"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.is_check == '0'">否</span>
                <span v-else-if="scope.row.is_check == '1'">是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock_state"
              label="库存状态"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.stock_state == '1'">在途</span>
                <span v-else-if="scope.row.stock_state == '2'">已入库</span>
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
      selectedDay: "", //日期选择属性
      searchTxt: "", //搜索字段
      createTestBtnTF: false //生成验料单按钮
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      this.$axios
        .get(this.portUrl + "/batar-sjy-manage/stock/materialstock/order/list")
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
    //表格底部数据统计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //点击检料单
    editGold(elem) {
      var self = this;
      this.$router.push({
        path: "editGoldStock",
        query: elem
      });
    },
    //多选框选择
    handleSelectionChange(val) {
      var self = this;
      self.multipleSelection = val;
      self.createTestBtnTF = false;
      for (var i = 0; i < val.length; i++) {
        if (val[i].flow_type == 2) {
          self.createTestBtnTF = true;
          break;
        }
      }
    },
    //生成验料
    checkMaterial() {
      var self = this;
      //只
      let selectList = [];
      for (var i = 0; i < self.multipleSelection.length; i++) {
        if (self.multipleSelection[i].flow_type == 2) {
          selectList.push(self.multipleSelection[i]);
        }
      }
      this.$axios
        .post(this.portUrl + "/batar-sjy-manage/stock/materialstock/order/createCheckmaterial", selectList)
        .then(function(res) {
          if (res.data.code == 200) {
              self.$message({
                message: "已经生成验料单成功，正在刷新中！",
                type: "success"
              });
              setTimeout(function() {
                self.created_fun();
              }, 1000);
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
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