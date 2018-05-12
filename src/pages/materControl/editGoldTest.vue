<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>验料（测金）</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="8">
              <el-button type="success" icon="el-icon-sort" size="small" @click="saveGold" v-if="!readTF">保存</el-button>
              <el-button type="primary" icon="el-icon-sort" size="small" @click="confirmGold" v-if="!readTF">确认</el-button>
            </el-col>
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
        </div>
        <div id="centerGoldList">
          <el-row>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  客户
                </div>
                <div class="flexRightDiv">
                  <el-select v-model="orderAllData.partner_id" placeholder="请选择" size="small" :disabled="readTF">
                    <el-option
                      size="small"
                      v-for="item in companyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="flexLeftDiv">
                  毛重
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.gross_weight}}
                </div>
                <div class="flexLeftDiv">
                  备注
                </div>
                <div class="flexRightDiv">
                  <el-input
                    type="textarea"
                    :disabled="readTF"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="backup">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  验料单号
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.order_code}}
                </div>
                <div class="flexLeftDiv">
                  收料单
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.receive_material_order_code}}
                </div>
                <div class="flexLeftDiv">
                  检验状态
                </div>
                <div class="flexRightDiv">
                  <span v-if="order_state == 1">创建</span>
                  <span v-else-if="order_state == 2">检验中</span>
                  <span v-else-if="order_state == 3">已检验</span>
                  <span v-else-if="order_state == 4">作废</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  创建时间
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.create_time}}
                </div>
                <div class="flexLeftDiv">
                  制单人
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.order_uid_name}}
                </div>
                <div class="flexLeftDiv">
                  验料时间
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.check_material_time}}
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="flexSaveBtn">
                
              </div>
            </el-col>
          </el-row>
        </div>
        <hr/>

        <div id="goldListTab">
          <el-table
            :data="goldListData"
            :summary-method="getSummaries"
            show-summary
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="index"
              type="index"
              label="序"
              header-align='center'
              align='center'
              width="50">
            </el-table-column>
            <el-table-column
              prop="material_name"
              label="金料名称">
              <template slot-scope="scope">
                <el-select v-model="scope.row.material_name" v-on:change="changeGoldList(scope.row)" placeholder="请选择" size="small" :disabled="readTF" >
                  <el-option
                    v-for="item in materialTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="net_weight"
              sortable
              label="测后净重">
              <template slot-scope="scope">
                <el-input v-model="scope.row.net_weight" placeholder="请输入内容"  v-on:change="changeGoldList(scope.row)" size="small" :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="average_quality"
              sortable
              label="实测成色平均值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.average_quality" placeholder="请输入内容"  v-on:change="changeGoldList(scope.row)" size="small" :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="quality"
              sortable
              label="实测成色列表">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quality" placeholder="请输入内容"  v-on:change="changeGoldList(scope.row)" size="small" :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" placeholder="请输入内容" size='small' :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="backup"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="delGoldDetail(scope.row)"><i class="el-icon-delete"></i></el-button>
              </template>
            </el-table-column>            
          </el-table>
          <el-button type="primary" class="createGoldBtn" plain size="small" @click="createGoldListFun" v-if="!readTF">创建新明细</el-button>
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      goldListId: "", //金料单编号
      createGoldTF: false, //创建新金料单新窗口
      companyList: [], //用户
      orderAllData: {},
      value: "", //选中用户
      weight: "105", //净重
      backup: "备注", //备注
      order_state: -1, //验料单状态码
      goldListData: [], //金料单列表数据
      newGoldData: {}, //创建新金料单数据
      readTF: true, //只读属性
      materialTypeList: [], //金料名称的数据列表
      options: [
        {
          value: "足金料(杂料)",
          label: "足金料(杂料)"
        },
        {
          value: "足金旧料",
          label: "足金旧料"
        },
        {
          value: "(手环)旧料",
          label: "(手环)旧料"
        }
      ],
      saveDataTF: true, //明细必填项保存
      sumData: [] //数据统计合计数组
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      if (window.location.hash.split("view").length == 2) {
        self.readTF = true;
      }
      self.goldListId = window.location.hash.split("=")[1];
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/checkmaterial/ResPartnerList"
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.companyList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });

      //金料名称
      this.$axios
        .get(this.portUrl + "/batar-sjy-manage/stock/materialtype/order/list")
        .then(function(res) {
          if (res.data.code == 200) {
            self.materialTypeList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });

      if (self.goldListId == "createNewData") {
        self.orderAllData = newCheckGoldData;
        self.readTF = false;
        return;
      }

      if (window.location.hash.indexOf("editId=") >= 0) {
        self.readTF = false;
      }
      let params = {
        PRS: {
          orderId: self.goldListId
        }
      };
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/form",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.orderAllData = res.data.data;
            self.orderAllData.create_time = self.$api.dateGetDay(
              self.orderAllData.create_time
            );
            self.orderAllData.check_material_time = self.$api.dateGetDay(
              self.orderAllData.check_material_time
            );
            self.order_state = parseInt(res.data.data.order_state);
            self.goldListData = res.data.data.order_line;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //明细表table统计合计功能
    getSummaries(param) {
      var self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
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
      self.sumData = sums;
      return sums;
    },
    //测金保存按钮
    saveGold() {
      var self = this;

      if (self.saveDataTF) {
        self.orderAllData.order_line = self.goldListData;
        self.orderAllData.net_weight = self.sumData[2];
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message({
                message: "资料已经保存，正在刷新中！",
                type: "success"
              });
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        self.$message({
          message: "还有必填项未填，未能保存！",
          type: "error"
        });
      }
      // self.$router.push("checkGoldTest")
    },
    //确认测金
    confirmGold() {
      var self = this;
      if (self.saveDataTF) {
        self.orderAllData.order_line = self.goldListData;
        self.orderAllData.net_weight = self.sumData[2];
        self.orderAllData.order_state = "3";
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message({
                message: "资料已经确认，正在刷新中！",
                type: "success"
              });
              setTimeout(function() {
                self.created_fun();
              }, 1000);
            } else {
              self.orderAllData.order_state = "2";
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        self.$router.push("checkGoldTest");
      } else {
        self.$message({
          message: "还有必填项未填！",
          type: "error"
        });
      }
    },
    //添加金料单弹出框
    createGoldListFun() {
      var self = this;
      self.saveDataTF = false;
      self.newGoldData = {};
      self.newGoldData.order_id = self.goldListId;
      self.newGoldData.order_uid = 1;
      self.newGoldData.order_uid_name = "小明";
      self.newGoldData.material_name = 1;
      self.newGoldData.net_weight = "";
      self.newGoldData.quality = "";
      self.newGoldData.note = "";
      self.goldListData.push(self.newGoldData);
      for (var i = 0; i < self.goldListData.length; i++) {
        self.goldListData[i].order_code = self.goldListId + "_" + (i + 1);
      }
    },
    //添加金料单
    changeGoldList(elem) {
      var self = this;

      for (let i = 0; i < self.goldListData.length; i++) {
        self.goldListData[i].order_code = self.goldListId + "_" + (i + 1);
      }
      let qualityList = elem.quality.split(",");
      let qualitySum = 0;
      for (let i = 0; i < qualityList.length; i++) {
        qualitySum += parseFloat(qualityList[i]);
      }

      setTimeout(function() {
        elem.average_quality = self.$api.returnFloat(
          qualitySum / qualityList.length
        );
      }, 500);
      if (elem.net_weight == "") {
        this.$message({
          message: "测后净重为必填!",
          type: "warning"
        });
        self.saveDataTF = false;
        return;
      } else if (elem.quality == "") {
        this.$message({
          message: "实测成色列表为必填!",
          type: "warning"
        });
        self.saveDataTF = false;
        return;
      } else if (elem.average_quality == "") {
        this.$message({
          message: "实测成色平均值为必填!",
          type: "warning"
        });
        self.saveDataTF = false;
        return;
      } else {
        self.saveDataTF = true;
      }
    },
    //删除验料单明细
    delGoldDetail(elem) {
      var self = this;
      this.$confirm("确认删除此明细？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (elem.id != undefined) {
            let params = {
              PRS: {
                orderId: elem.id
              }
            };
            this.$axios
              .get(
                this.portUrl +
                  "/batar-sjy-manage/stock/checkmaterial/orderline/delete",
                params
              )
              .then(function(res) {
                if (res.data.code == 200) {
                  self.$message({
                    type: "success",
                    message: "删除明细成功，正在刷新页面!"
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
          } else {
            for (var i = 0; i < self.goldListData.length; i++) {
              if (self.goldListData[i].order_code == elem.order_code) {
                self.goldListData.splice(i, 1);
                break;
              }
            }
          }
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
  #centerGoldList
    .flexSaveBtn
      margin-top 50px
      text-align right
      padding-right 50px
    .flexDiv
      display flex
      flex-flow row wrap
      .flexLeftDiv
        width 30%
        margin-top 10px
        height 30px
        padding 15px 15px 0px 0px
      .flexRightDiv
        width 50%
        margin-top 10px
        height 30px
        padding 15px 0 0 0
  .createGold
    line-height 50px
    .createInp
      width 90%
  .createGoldBtn
    margin 20px 0 10px 0
</style>