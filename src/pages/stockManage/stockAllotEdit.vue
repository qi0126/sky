<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            <el-breadcrumb-item>调拨单</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-sort" size="small" @click="saveGold" v-if="!readTF">保存</el-button>
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
                  调出库位
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
                  调入库位
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
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  制单人
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.order_code" placeholder="请输入净重" size="small" :disabled="readTF"></el-input>
                </div>
                <div class="flexLeftDiv">
                 源单号
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.receive_material_time}}
                </div>
                <div class="flexLeftDiv">
                  备注
                </div>
                <div class="flexRightDiv">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    :disabled="readTF"
                    v-model="orderAllData.note">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flexDiv">
                <div class="flexLeftDiv">
                  调拨单号
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.order_code" placeholder="请输入净重" size="small" :disabled="readTF"></el-input>
                </div>
                <div class="flexLeftDiv">
                  调拨时间
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.receive_material_time}}
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
            style="width: 100%">
            <el-table-column
              type="index"
              label="序"
              header-align='center'
              align='center'
              width="50">
            </el-table-column>
            <el-table-column
              label="结算类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.account_type" placeholder="请选择" size="small" :disabled="readTF">
                  <el-option
                    v-for="item in accountTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              sortable
              label="产品名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.material_name" placeholder="请输入内容"  v-on:change="changeReceiveDei(scope.row)" size="small" :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="成色">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quality" placeholder="请输入内容"  v-on:change="changeReceiveDei(scope.row)" size="small" :disabled="readTF"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="净重">
              <template slot-scope="scope">
                {{scope.row.net_weight}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="折重">
              <template slot-scope="scope">
                {{scope.row.discount_weight}}
              </template>
            </el-table-column>
            <el-table-column
              header-align='center'
              align='center'
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-if="!readTF" @click="delMaterDeiFun(scope.row)"><i class="el-icon-delete"></i></el-button>
              </template>
            </el-table-column>
            
          </el-table>
          <el-button type="primary" class="createGoldBtn" plain size="small" @click="createDeiFun" v-if="!readTF">创建新一行</el-button>
          
        </div>
        <el-dialog
          title="添加新金料类型"
          :visible.sync="createDeiVisTf"
          width="30%">
          <div class="DeiVisDiv">
            <el-row>
              <el-col :span="5">
                金料名称
              </el-col>
              <el-col :span="19">
                <el-input v-model="newSelectProData.name" placeholder="请输入金料名称" size="small"></el-input>
              </el-col>
              <el-col :span="5">
                工费
              </el-col>
              <el-col :span="19">
                <el-input v-model="newSelectProData.fee" placeholder="请输入工费" size="small"></el-input>
              </el-col>
              <el-col :span="5">
                选择流程
              </el-col>
              <el-col :span="19">
                <el-select v-model="newSelectProData.flow_type" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in selectProList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                折重
              </el-col>
              <el-col :span="19">
                <el-select v-model="newSelectProData.is_discount" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in isDiscountlist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createDeiVisTf = false" size='small'>取 消</el-button>
            <el-button type="primary" @click="createDeiVisFun" size='small'>确 定</el-button>
          </span>
        </el-dialog>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      goldListId: "", //调拨单编号
      createGoldTF: false, //创建新调拨单新窗口
      readTF: true, //查看只读属性
      companyList: [], //客戶列表
      orderAllData: {},
      orderLineData: [], //调拨单明细数组
      accountTypeList: [
        {
          value: "0",
          label: "转存"
        },
        {
          value: "1",
          label: "结价"
        }
      ],
      materialTypeList: [], //金料类型的数据列表
      weight: "暂无", //暂时数据
      note: "备注", //备注
      input: "", //创建新调拨单数据
      createDeiVisTf: false, //创建新金料类型弹出框
      selectProList: [
        {
          //选择流程下拉框
          id: 1,
          value: "免检"
        },
        {
          id: 2,
          value: "先收后验"
        },
        {
          id: 3,
          value: "先验后收"
        }
      ],
      isDiscountlist: [
        {
          //选择流程下拉框
          id: "0",
          value: "否"
        },
        {
          id: "1",
          value: "是"
        }
      ],
      selectProId: 1, //选择流程默认“免检”
      newSelectProData: {} //创建新的金料类型数据
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      self.goldListId = window.location.hash.split("goldId=")[1];
      // console.log(self.goldListId)
      if (window.location.hash.split("view").length != -1) {
        self.readTF = true;
      }
      self.goldListId = window.location.hash.split("=")[1];
      //用户名称
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

      //金料类型
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

      if (self.goldListId == "createData") {
        //创建新调拨单数据
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
        self.readTF = false;
        return;
      }

      if (window.location.hash.indexOf("editId=") >= 0) {
        //调拨单号判断
        self.readTF = false;
      }
      let params = {
        PRS: {
          orderId: self.goldListId
        }
      };
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/allotstock/order/form",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.orderAllData = res.data.data;
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
    //编辑调拨单保存按钮
    saveGold() {
      var self = this;
      if (self.goldListId == "createData") {
        self.orderAllData.order_line = self.orderLineData;
        self.orderAllData.order_state = "1";
        for (var i = 0; i < self.orderAllData.order_line.length; i++) {
          self.orderAllData.order_line[i].order_code =
            self.orderAllData.order_code + "_" + (i + 1);
        }
        this.$axios
          .post(
            this.portUrl +
              "/batar-sjy-manage/stock/receivematerial/order/create",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        return;
      }
      if (window.location.hash.indexOf("editId=") >= 0) {
        self.orderAllData.order_state = "1";
        for (var i = 0; i < self.orderAllData.order_line.length; i++) {
          self.orderAllData.order_line[i].order_code =
            self.orderAllData.order_code + "_" + (i + 1);
        }
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/receivematerial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        return;
      }

      // self.$router.push("checkReceiveMater");
    },
    //编辑调拨单确认按钮
    confirmGold() {
      var self = this;
      if (self.goldListId == "createData") {
        self.orderAllData.order_line = self.orderLineData;
        self.orderAllData.order_state = "2";
        for (var i = 0; i < self.orderAllData.order_line.length; i++) {
          self.orderAllData.order_line[i].order_code =
            self.orderAllData.order_code + "_" + (i + 1);
        }
        this.$axios
          .post(
            this.portUrl +
              "/batar-sjy-manage/stock/receivematerial/order/create",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        return;
      }
      if (window.location.hash.indexOf("editId=") >= 0) {
        for (var i = 0; i < self.orderAllData.order_line.length; i++) {
          self.orderAllData.order_line[i].order_code =
            self.orderAllData.order_code + "_" + (i + 1);
        }
        self.orderAllData.order_state = "2";
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/receivematerial/order/edit",
            self.orderAllData
          )
          .then(function(res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        return;
      }

      // self.$router.push("checkReceiveMater");
    },
    //创建新的一行明细
    createDeiFun() {
      var self = this;
      // console.log(self.orderLineData);
      var newOrderLine = {
        order_id: "",
        order_code: "",
        account_type: "0",
        material_type_id: 1,
        material_type_name: "金料",
        quality: "",
        net_weight: 0,
        discount_weight: 0,
        check_net_weight: 0,
        check_quality: 0,
        quality_list: "",
        fee: 0,
        fee_total: 0,
        check_material_order_code: "0",
        create_time: "",
        update_time: "",
        order_uid: "",
        order_uid_name: "",
        is_active: ""
      };
      newOrderLine.material_type_id = self.materialTypeList[0].id; //默认第一个金料类型ID
      newOrderLine.material_type_name = self.materialTypeList[0].name; //默认第一个金料类型名称
      newOrderLine.fee = self.materialTypeList[0].fee; //默认第一个金料类型工费

      self.orderLineData.push(newOrderLine);
    },
    //创建新调拨类型
    createNewDei(elem) {
      var self = this;
      self.createDeiVisTf = true;
    },
    //改调拨明细的成色和净重
    changeReceiveDei(elem) {
      var self = this;
      //自动算出折重，折重=成色/100*调拨净重
      elem.discount_weight = self.$api.returnFloat(
        elem.net_weight * (elem.quality / 100)
      );
      elem.check_net_weight = elem.net_weight; //测后净重=调拨净重
      for (var i = 0; i < self.materialTypeList.length; i++) {
        if (elem.material_type_id == self.materialTypeList[i].id) {
          elem.fee = self.materialTypeList[i].fee;
          break;
        }
      }
      elem.fee_total = self.$api.returnFloat(elem.fee * elem.net_weight); //工费总计 = 加收工费 X 净重
    },
    //删除调拨单明细
    delMaterDeiFun(elem) {
      var self = this;
      this.$confirm("确认将此明细单删除, 是否继续?", "提示", {
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
              this.portUrl +
                "/batar-sjy-manage/stock/receivematerial/orderline/delete",
              params
            )
            .then(function(res) {
              if (res.data.code == 200) {
                self.$message("删除成功,正在刷新页面中");
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
        })
        .catch(() => {});
    },
    //创建新的金料类型
    createDeiVisFun() {
      var self = this;
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/checkmaterial/ResPartnerList"
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.$message.success("添加金料类型成功，正在刷新中！");
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
        // text-align right
      .flexRightDiv
        width 50%
        margin-top 10px
        height 30px
        padding 15px 0 0 0
  .createGold
    line-height 50px
  .createGoldBtn
    margin 20px 0 10px 0
  .DeiVisDiv
    line-height 50px
</style>