<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>验料（金库）</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="16">
              <el-button type="success" icon="el-icon-sort" size="small" @click="saveGold" v-show="!saveTf">保存</el-button>
              <el-button type="primary" icon="el-icon-sort" size="small" @click="confirmGold" v-show="!saveTf||order_state == 2">确认</el-button>
              <el-button type="danger" icon="el-icon-sort" size="small" v-if="order_state == 3 && orderAllData.receive_material_order_code == ''" @click="cancel">作废</el-button>
              <el-button type="success" icon="el-icon-printer" size="small" @click="createReceiveList" v-if="order_state == 3 && orderAllData.receive_material_order_code == ''">生成收料单</el-button>
               &nbsp;
            </el-col>
            <el-col :span="8">
              <el-steps :space="200" :active="order_state" finish-status="success" size="small">
                <el-step title="创建"></el-step>
                <el-step title="检验中"></el-step>
                <el-step title="已检验"></el-step>
              </el-steps>
            </el-col>
          </el-row>
        </div>
        <div id="centerGoldList" >
          <el-row>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  客户<span class="red_font">*</span>
                </div>
                <div class="flexRightDiv">
                  <el-select v-model="orderAllData.partner_id" placeholder="请选择" size="small">
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
                  毛重<span class="red_font">*</span>
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.gross_weight" placeholder="请输入毛重" size="small"></el-input>
                </div>
                <div class="flexLeftDiv">
                  备注
                </div>
                <div class="flexRightDiv">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="orderAllData.note">
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
                  <el-input v-model="orderAllData.order_code" placeholder="请输入验料单号" size="small" disabled></el-input>
                </div>
                <div class="flexLeftDiv">
                  收料单
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.receive_material_order_code" placeholder="请输入收料单" size="small" disabled></el-input>
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
            :data="orderLineData"
            show-summary
            style="width: 100%">
            <el-table-column
              type="index"
              label="序"
              header-align='center'
              align='center'
              width="50">
            </el-table-column>
            <el-table-column
              label="金料名称">
              <template slot-scope="scope">
                <span v-if="scope.row.material_name == 1">足金料(杂料)</span>
                <span v-else-if="scope.row.material_name == 2">足金旧料</span>
                <span v-else-if="scope.row.material_name == 3">(手环)旧料</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="net_weight"
              sortable
              label="测后净重">
            </el-table-column>
            <el-table-column
              prop="average_quality"
              sortable
              label="实测成色平均值">
            </el-table-column>
            <el-table-column
              prop="quality"
              sortable
              label="实测成色列表">
            </el-table-column>
            <el-table-column
              prop="note"
              sortable
              label="备注">
            </el-table-column>
            
          </el-table>
        </div>
	    </div>
    </div>
</template>
<script>
var newCheckGoldData = {
  id: "",
  order_code: "",
  gross_weight: "",
  net_weight: "",
  partner_id: "",
  partner_name: "",
  receive_material_order_id: "",
  receive_material_order_code: "",
  order_state: "",
  order_uid: 1,
  order_uid_name: "小明",
  note: "",
  check_material_order_line: "",
  is_active: "",
  order_line: [] //明细列表
};
export default {
  data() {
    return {
      goldListId: "", //金料单编号
      createGoldTF: false, //创建新金料单新窗口
      order_state: -1, //验料单状态
      companyList: [],
      value: 1,
      orderAllData: {}, //金料单全部数据
      weight: "", //净重
      backup: "备注", //备注
      orderLineData: [], //金料单明细行
      newOrderLineData: {}, //创建新金科单明细
      input: "", //创建新金料单数据,
      readTF: false, //輸入框只能读
      saveTf: false //状态为2时保存按钮禁用
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      // console.log(self.$router)
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

      if (self.goldListId == "createNewData") {
        self.orderAllData = {
          id: "",
          order_code: "",
          gross_weight: "",
          net_weight: "",
          partner_id: "",
          partner_name: "",
          receive_material_order_id: "",
          receive_material_order_code: "",
          order_state: "",
          order_uid: 1,
          order_uid_name: "小明",
          note: "",
          check_material_order_line: "",
          is_active: "",
          order_line: []
        };
        return;
      }

      if (window.location.hash.indexOf("editId=") >= 0) {
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
            // console.log(self.orderAllData.order_state)
            if (self.orderAllData.order_state != "1") {
              self.saveTf = true;
            }
            self.orderAllData.create_time = self.$api.dateGetDay(
              self.orderAllData.create_time
            );
            self.order_state = parseInt(res.data.data.order_state);
            self.orderLineData = res.data.data.order_line;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    saveGold() {
      //保存按钮
      var self = this;
      if (
        !self.$v.valiNull(self.orderAllData.partner_id) ||
        !self.$v.valiNull(self.orderAllData.gross_weight)
      ) {
        self.$message.error("客户和毛重输入不能为空，请重新输入！");
        return;
      }

      //创建新验料单
      if (self.goldListId == "createNewData") {
        for (var i = 0; i < self.companyList.length; i++) {
          if (self.companyList[i].id == self.orderAllData.partner_id) {
            self.orderAllData.partner_name = self.companyList[i].name;
            break;
          }
        }
        self.orderAllData.order_state = "1";
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/create",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message({
                message: "验料单已经创建,正在为你跳转到新的金料单！",
                type: "success"
              });
              setTimeout(function() {
                self.$router.push({
                  path: "editGoldWare?goldId=" + res.data.data.id
                });
                self.created_fun();
              }, 1000);

              return;
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      if (window.location.hash.indexOf("editId=") >= 0) {
        //编辑验料单
        self.orderAllData.order_state = "1";
        self.orderAllData.is_active = "1";
        self.orderAllData.id = self.goldListId;
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message({
                message: "验料单已经保存！",
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
    },
    confirmGold() {
      //确认按钮
      var self = this;
      if (
        !self.$v.valiNull(self.orderAllData.partner_id) ||
        !self.$v.valiNull(self.orderAllData.gross_weight)
      ) {
        self.$message.error("客户和毛重输入不能为空，请重新输入！");
        return;
      }
      if (self.goldListId == "createNewData") {
        newCheckGoldData.order_state = "2";
        self.orderAllData.order_state = "2";
        for (var i = 0; i < self.companyList.length; i++) {
          if (self.companyList[i].id == newCheckGoldData.partner_id) {
            newCheckGoldData.partner_name = self.companyList[i].name;
            break;
          }
        }
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/create",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              // self.companyList = res.data.data;
              self.$message({
                message: "验料单已经创建！",
                type: "success"
              });
              setTimeout(function() {
                self.$router.push({
                  path: "editGoldWare?goldId=" + res.data.data.id
                });
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
      if (window.location.hash.indexOf("editId=") >= 0) {
        //确认验料单
        self.orderAllData.order_state = "2";
        self.orderAllData.is_active = "1";
        self.orderAllData.id = self.goldListId;
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message({
                message: "验料单已经确认！",
                type: "success"
              });
              setTimeout(function() {
                self.created_fun();
              }, 1000);
              // self.$router.push("checkGoldWare");
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    createGoldFun() {
      //创建新金料单数据
      var self = this;
      self.newOrderLineData.orderId = self.goldListId;
      if (
        self.newOrderLineData.goldName &&
        self.newOrderLineData.net_weight &&
        self.newOrderLineData.average_quality &&
        self.newOrderLineData.quality
      ) {
        if (self.orderAllData.order_line) {
          self.orderAllData.order_line.push(self.newOrderLineData);
        } else {
          self.orderAllData.order_line = [];
          self.orderAllData.order_line.push(self.newOrderLineData);
        }
        self.orderLineData = self.orderAllData.order_line;
        self.newOrderLineData = {};
        self.createGoldTF = false;
      } else {
        this.$message.error("请填写完整数据！");
      }
    },
    createReceiveList() {
      //生成材料单
      var self = this;
      let params = {
        PRS: {
          orderId: self.goldListId
        }
      };
      this.$confirm("确认生成收料单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(
              this.portUrl +
                "/batar-sjy-manage/stock/checkmaterial/order/create_receive_material",
              params
            )
            .then(function(res) {
              if (res.data.code == 200) {
                self.$message({
                  type: "success",
                  message: "生成收料单成功！"
                });
                setTimeout(function() {
                  self.$router.push({
                    path: "editReceiveMater",
                    query: { goldId: res.data.data.id }
                  });
                }, 2000);
              } else {
                self.$message.error(res.data.msg);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //作废
    cancel() {
      var self = this;
      this.$axios
        .post(
          this.portUrl + "/batar-sjy-manage/stock/checkmaterial/order/abolish",
          self.orderAllData
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.companyList = res.data.data;
          } else {
            self.$message.error(res.data.message);
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
  .createGoldBtn
    margin 20px 0 10px 0
</style>