<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>库位移动记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="8">
              <!-- <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="createMoveFun">新建</el-button>
              <el-dialog
                title="创建新库位移动记录"
                :visible.sync="createMateMoveTF"
                width="700px"
                :before-close="handleClose">
                <div>
                  <el-row>
                    <el-col :span="6" class="inputBigD">
                      源库位名称
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.source_stock_name" placeholder="请输入源库位名称" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      源库位ID
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.source_stock_id" placeholder="请输入源库位ID" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      目标库位名称
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.target_stock_name" placeholder="请输入目标库位名称" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      目标库位ID
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.target_stock_id" placeholder="请输入目标库位ID" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      产品名称
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.product_name" placeholder="请输入产品名称" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      产品ID
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.product_id" placeholder="请输入产品ID" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      移动净重
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.net_weight" placeholder="请输入移动净重" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      备注
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.note" placeholder="请输入备注" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      创建时间
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-date-picker
                        v-model="newMoveData.create_time"
                        type="date"
                        size="small"
                        class="inputD"
                        placeholder="选择创建时间">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      修改时间
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-date-picker
                        v-model="newMoveData.update_time"
                        type="date"
                        size="small"
                        class="inputD"
                        placeholder="选择修改时间">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      制单人名称
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.order_uid_name" placeholder="请输入制单人名称" size="small" class="inputD"></el-input>
                    </el-col>
                    <el-col :span="6" class="inputBigD">
                      制单人ID
                    </el-col>
                    <el-col :span="18" class="inputBigD">
                      <el-input v-model="newMoveData.order_uid" placeholder="请输入制单人ID" size="small" class="inputD"></el-input>
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="createMateMoveTF = false" size="small" >取 消</el-button>
                  <el-button type="primary" @click="createMateMoveFun" size="small" >确 定</el-button>
                </span>
              </el-dialog> -->
            </el-col>
            <el-col :span="16">
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
            :data="materMoveData"
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
              prop="source_stock_name"
              label="源库位名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="source_stock_id"
              label="源库位ID"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="target_stock_name"
              label="目标库位名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="target_stock_id"
              label="目标库位ID"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="产品名称"
              >
            </el-table-column>
            <el-table-column
              prop="product_id"
              label="产品ID"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="net_weight"
              label="移动净重"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="update_time"
              label="修改时间"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="order_uid_name"
              label="制单人名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="order_uid"
              label="制单人ID"
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
      materMoveData: [], //库存移动数据记录
      newMoveData: {}, //创建新移动数据记录
      createMateMoveTF: false, //创建库位移动数据弹出框
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
        .get(this.portUrl + "/batar-sjy-manage/stock/stockposition/move/list")
        .then(function(res) {
          if (res.data.code == 200) {
            self.materMoveData = res.data.data;
            for (var i = 0; i < self.materMoveData.length; i++) {
              self.materMoveData[i].create_time = self.$api.dateGetDay(
                self.materMoveData[i].create_time
              );
              self.materMoveData[i].update_time = self.$api.dateGetDay(
                self.materMoveData[i].update_time
              );
            }
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
      this.$router.push({ path: "materMoveEdit", query: { editId: elem.id } });
    },
    //创建新库位移动记录弹框
    // createMoveFun() {
    //   var self = this;
    //   self.newMoveData = {};
    //   self.createMateMoveTF = true;
    // },
    //创建新库位移动记录确认按钮
    // createMateMoveFun() {
    //   var self = this;
    //   console.log(self.newMoveData);

    //   this.$axios
    //     .post(
    //       this.portUser + "/batar-sjy-manage/stock/stockposition/move/create",
    //       self.newMoveData
    //     )
    //     .then(function(res) {
    //       if (res.data.code == 200) {
    //         self.$message.success("已经创建库位移动记录成功，现在正在刷新！");
    //         setTimeout(function() {
    //           self.created_fun()
    //         }, 1000);
    //       } else {
    //         self.$message.error(res.data.msg);
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // }
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
  .inputBigD
    margin-top 20px
  .inputD
    width 80%
</style>