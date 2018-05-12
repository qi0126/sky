<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            <el-breadcrumb-item>出库单</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="8">
              <!-- <el-button type="primary" icon="el-icon-sort" size="small" @click="saveGold" v-if="!readTF">保存</el-button> -->
              <!-- <el-button type="primary" icon="el-icon-sort" size="small" @click="confirmGold" v-if="!readTF">确认</el-button> -->
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
                  <el-select v-model="orderAllData.partner_name" placeholder="请选择" size="small" :disabled="readTF">
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
                  出库净重
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.net_weight" placeholder="请输入净重" size="small" :disabled="readTF"></el-input>
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
                  制单人
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.order_uid_name" placeholder="请输入净重" size="small" :disabled="readTF"></el-input>
                </div>
                <div class="flexLeftDiv">
                 源单号
                </div>
                <div class="flexRightDiv">
                  {{orderAllData.source_code}}
                </div>
                <div class="flexLeftDiv">
                  出库位
                </div>
                <div class="flexRightDiv">
                  <el-select v-model="orderAllData.stock_position_name" placeholder="请选择" size="small" :disabled="readTF">
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
                  出库单号
                </div>
                <div class="flexRightDiv">
                  <el-input v-model="orderAllData.order_code" placeholder="请输入净重" size="small" :disabled="readTF"></el-input>
                </div>
                <div class="flexLeftDiv">
                  出库时间
                </div>
                <div class="flexRightDiv">
                  {{this.$api.dateGetDay(orderAllData.update_time)}}
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
            :data="orderAllData.outputStockOrderLines"
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
            <!-- <el-button @click="createDeiVisTf = false" size='small'>取 消</el-button> -->
            <!-- <el-button type="primary" @click="createDeiVisFun" size='small'>确 定</el-button> -->
          </span>
        </el-dialog>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      goldListId: "", //收料单编号
      createGoldTF: false, //创建新收料单新窗口
      readTF: true, //查看只读属性
      companyList: [], //客戶列表
      orderAllData: {},
      orderLineData: [], //收料单明细数组
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
      note: "", //备注
      input: "", //创建新收料单数据
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
    this.getState()
    this.created_fun();
  },
  methods: {
    getState() {
      const query =  this.$route.query
      query.created && (self.readTF = true)
    },
    created_fun() {
      var self = this;
      this.goldListId = this.$route.query.goldId;
      let params = {
        PRS: {
          orderId: self.goldListId
        }
      };
      this.$axios.get(this.portBYB + "outputStock/orderFrom", params).then(function(res) {
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
  }
};

//保留两位小位方法
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
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
