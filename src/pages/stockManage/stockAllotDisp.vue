<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            <el-breadcrumb-item>调拨单</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="createReceive">创建</el-button>
              <el-button type="warning" icon="el-icon-circle-close-outline" size="small">作废</el-button>
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
            :data="receiveMaterData"
            stripe
            height="700"
            @row-click="editGold"
            :summary-method="getSummaries"
            show-summary
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
              prop="order_code"
              label="调拨单号"
              width="180"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="partner_name"
              label="客户/供应商"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="receive_material_time"
              label="调出库位"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="checkMan"
              label="调入库"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="net_weight"
              label="调拨时间"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="制单人"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="关联单号"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="出库净重"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="单据状态"
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
      receiveMaterData: [],
      selectedDay: "", //日期选择属性
      searchTxt: "", //搜索字段
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/allotstock/order/list",
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.receiveMaterData = res.data.data;
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
    //点击查看收料单
    viewGold(elem) {
      var self = this;
      // console.log(elem);
      this.$router.push("stockAllotEdit?view&goldId=" + elem.id);
    },
    //点击编辑收料单
    editGold(elem) {
      var self = this;
      // console.log(elem);
      this.$router.push({path:'stockAllotEdit',query:{editId:elem.id}});
      
    },
    //创建新收料单
    createReceive(){
      var self = this
      this.$router.push({path:'stockAllotEdit',query:{editId:'createData'}})
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