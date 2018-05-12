<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>发料</el-breadcrumb-item>
        </el-breadcrumb>
        <div> 
        <div class="hr"/>
        <div>
          <el-row>
            <el-col :span="8">
              <el-button type="success" size="small"  @click="veriAudit" v-if="saveStatus">发料</el-button> 
              <el-button type="warning" icon="el-icon-circle-close-outline" size="small" v-if="stepsActive === 1" @click="obsolete">作废</el-button>
            </el-col>
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
        </div>
        <div id="centerGoldList">
          <el-row>
            <el-col :span="12">
              <div class="flexDiv">
                <div class="flexLeftDiv" v-if="!createStatus">
                  发料编码
                </div>
                <div class="flexRightDiv" v-if="!createStatus">
                  {{result.store_issue_code}}
                </div>
                <div class="flexLeftDiv">
                  供应商
                </div>
                <div class="flexRightDiv">
                  <el-select v-model="result.client_id" :disabled="stepsActive !== 0" placeholder="请选择" size="small">
                    <el-option
                      size="small"
                      v-for="item in providerList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="flexLeftDiv">
                  备注
                </div>
                <div class="flexRightDiv">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    :disabled="stepsActive !== 0"
                    v-model="reMark">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flexDiv">
                <div class="flexLeftDiv" v-if="!createStatus">
                  发料时间
                </div>
                <div class="flexRightDiv" v-if="!createStatus">
                  {{this.$api.dateGetDay(result.update_time)}}
                </div>
                <div class="flexLeftDiv">
                  制单人
                </div>
                <div class="flexRightDiv">
                  {{result.order_uid_name}}
                </div>
              </div>
            </el-col>
            <el-col :span="24" >
              <div class="flexSaveBtn" >
                <el-button v-if="stepsActive === 0" type="primary" icon="el-icon-refresh" size="small" @click="saveGold">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <hr/>

        <div id="goldListTab">
          <el-table
            :data="result.storeIssueOrderLines"
            show-summary
            :summary-method="getSummaries"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序"
              header-align='center'
              align='center'
              width="50">
            </el-table-column>
            <el-table-column
              header-align='center'
              align='center'
              label="金料类型">
              <template slot-scope="scope">
                <div v-if="scope.row.store_issue_type == 1">足金9999</div>
                <div v-if="scope.row.store_issue_type == 2">足金99999</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="store_issue_net_weight"
              sortable
              header-align='center'
              align='center'
              label="净重">
              <template slot-scope="scope">
                <el-input size="small" :disabled="stepsActive !== 0" @input="netWeightChange(scope.row)" v-model="scope.row.store_issue_net_weight"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="wage"
              sortable
              header-align='center'
              align='center'
              label="加收工费">
              <template slot-scope="scope">
                <el-input size="small" :disabled="stepsActive !== 0" @input="netWeightChange(scope.row)" v-model="scope.row.wage"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="wage_total"
              sortable
              header-align='center'
              align='center'
              label="工费总计">
            </el-table-column>
          </el-table>
        </div>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      result: {
        storeIssueOrderLines: [{
          store_issue_type: 1,
          store_issue_net_weight: '0',
          wage: '0'
        },{
          store_issue_type: 2,
          store_issue_net_weight: '0',
          wage: 1.5
      }]
      },
      createStatus: false,
      saveStatus: false,
      stepsActive: 0,
      goldListId: "", // 金料单编号
      providerList: [], // 供应商列表
      reMark: "", // 备注
      saveData: "",
      judgeInvenStatus: true // 是否库存不足
    };
  },
  created() {
    this.created_fun()
    this.getState()
  },
  methods: {
    getState() {
      const query =  this.$route.query
      query.created && (this.createStatus = true)
    },
    async created_fun() {
      let self = this;
      this.goldListId = this.$route.query.goldId;
      // 获取供应商select
      this.$axios.get(this.portBYB + "purificationOrder/resPartnerList").then(res => {
        self.providerList = res.data.data;
      });
      await this.getMateriList()
      if (!self.goldListId) {
        return;
      }
      await this.getOrderFrom()
    },
    getMateriList() {
      let self = this;
      return Promise.resolve(
        this.$axios.get(this.portBYB + "storeIssueOrder/materialstockList").then(res => {
          this.result.storeIssueOrderLines[0].material_inventory_order_id = res.data.data[0].id
          this.result.storeIssueOrderLines[1].material_inventory_order_id = res.data.data[1].id
        })
      )
    },
    getOrderFrom() {
      let self = this;
      let orderFromParams = {
        PRS: {
          orderId: this.goldListId
        }
      }
      return Promise.resolve(
        this.$axios.get(this.portBYB + "storeIssueOrder/OrderFrom", orderFromParams).then(res => {
         self.disposeData(res)
        })
      )
    },
    changeType(item, value) {
      switch (Number(item[value])) {
        case 1:
          item[value] = "足金9999";
          break;
        case 2:
          item[value] = "足金99999";
          break;
      }
    },
    // 判断净重库存
    netWeightChange(row) {
      row.wage_total = this.$api.returnFloat(row.store_issue_net_weight * row.wage);
    },
    // 验证是否超过库存
    judgeInven(id, store_issue_net_weight) {
      console.log(id)
      let params = {
        PRS: {
          matrId: id,
          net_weight: store_issue_net_weight
        }
      }
      return Promise.resolve(
        this.$axios.get(this.portBYB + "storeIssueOrder/judgeSuttle", params).then(res => {
          if (res.data.code === 200) {
          } else {
            this.judgeInvenStatus = false
            this.$message.error(res.data.msg);
          }
        })
      )
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
              return this.$api.returnFloat(prev + curr);
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
    // 初始化参数
    async getParams() {
      // 供应商
      let proName
      this.providerList.forEach(item => {
        if(item.id == this.result.client_id) {
          proName = item.name
        }
      })

      if(!this.$v.valiNull(this.sumData[3])) { this.$message.error('净重不能为空'); return }
      if(!this.$v.valiNull(this.sumData[4])) { this.$message.error('工费不能为空'); return }
      this.result.storeOrderData = [];
      this.result.storeIssueOrderLines.forEach(item => {
      this.judgeInven(item.material_inventory_order_id, item.store_issue_net_weight)
        this.result.storeOrderData.push({
          id: item.id,
          material_inventory_order_id: item.material_inventory_order_id,
          store_issue_type: item.store_issue_type,
          store_issue_net_weight: item.store_issue_net_weight,
          wage: item.wage,
          wage_total: this.sumData[3],
          order_uid: item.order_uid ? item.order_uid: 1,
          order_uid_name: item.order_uid_name ? item.order_uid_name: 'a'
        });
      });

      this.saveData = {
        id: this.result.id,
        store_issue_code: this.result.store_issue_code,
        client_id: this.result.client_id,
        client_name: proName,
        store_issue_state: this.result.store_issue_state,
        store_issue_total_weight: this.sumData[3],
        store_issue_total_wage: this.sumData[4],
        order_uid: this.result.order_uid ? this.result.order_uid: 1,
        order_uid_name: this.result.order_uid_name ? this.result.order_uid_name: 'a',
        note: this.reMark,
        storeIssueOrderLines: this.result.storeOrderData
      };
      return true;
    },
    // 保存成功 以及编辑处理数据
    disposeData(res) {
      let resArr = [];
      res.data.data.storeIssueOrderLines.forEach(item => {
        resArr.push(Number(item.store_issue_type))
      })
      if(resArr.length === 1 && resArr[0] === 1) {
        res.data.data.storeIssueOrderLines.push(this.result.storeIssueOrderLines[1])
      }
      if(resArr.length === 1 && resArr[0] === 2) {
        res.data.data.storeIssueOrderLines.unshift(this.result.storeIssueOrderLines[0])
      }
      if(resArr.length === 0) {
        res.data.data.storeIssueOrderLines = this.result.storeIssueOrderLines
      }
      this.result = res.data.data
      this.stepsActive = Number(res.data.data.store_issue_state) - 1
    },
    saveGold() {
      if (!this.getParams() && !this.judgeInvenStatus) {
        return;
      }
      console.log(this.judgeInvenStatus)
      return
      if (this.createStatus) {
        this.$axios
          .post(this.portBYB + "storeIssueOrder/insert", this.saveData)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.disposeData(res)
              this.saveStatus = true
            } else {
              this.$message.error(res.data.msg)
            }
          });
      } else if (this.stepsActive === 0) {
        this.$axios
          .post(this.portBYB + "storeIssueOrder/update", this.saveData)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.saveStatus = true
            } else {
              this.$message.error(res.data.msg);
            }
          });
      }
    },
    obsolete() {
      if(!this.getParams() && !this.judgeInvenStatus) {
        return
      }
      this.$axios
      .post(this.portBYB + "storeIssueOrder/cancellationIssue", this.saveData).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        } else {
          this.$message.error(res.data.msg);
        }        
      })
    },
    veriAudit() {
      if(!this.getParams() && !this.judgeInvenStatus) {
        return
      }
      this.$axios.post(this.portBYB + "storeIssueOrder/alreadyIssue", this.saveData).then(res => {
        if(res.data.code === 200) {
          this.$message.success(res.data.msg);
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }else {
          this.$message.error(res.data.msg);
        }
      })
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$base-color = rgb(230, 14, 50);
$font-color = #999;

.table-bt {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.conBigDiv {
  .title {
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .hr {
    border-top: 1px solid #d9d9d9;
    height: 3px;
    margin: 12px 0 12px 0;
  }

  .redfont {
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 3px solid #e60e32;
    font-size: 15px;
  }

  .red_font {
    color: $base-color;
  }

  #centerGoldList {
    .flexSaveBtn {
      margin-top: 50px;
      text-align: right;
      padding-right: 50px;
    }

    .flexDiv {
      display: flex;
      flex-flow: row wrap;

      .flexLeftDiv {
        width: 30%;
        margin-top: 10px;
        height: 30px;
        padding: 15px 15px 0px 0px;
        // text-align right
      }

      .flexRightDiv {
        width: 50%;
        margin-top: 10px;
        height: 30px;
        padding: 15px 0 0 0;
      }
    }
  }

  .createGold {
    line-height: 50px;
  }

  .createGoldBtn {
    margin: 20px 0 10px 0;
  }
}
</style>
