<template>
    <div class="conBigDiv">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
            <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
            <el-breadcrumb-item>库位列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
        <div class="hr"/>
          <el-row>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addDataBase">增加新库位</el-button>
              <el-dialog
                title="增加新库位"
                :visible.sync="createDataVidible"
                width="750px">
                <div>
                  <el-row class="elrowC">
                    <el-col :span="4">
                      库位名称
                    </el-col>
                    <el-col :span="12">
                      <el-input v-model="newDataBase.stock_name" placeholder="请输入库位名称" size="small"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <span class="red_font">*</span>
                    </el-col>
                  </el-row>
                  <el-row class="elrowC" v-if="newDataBase.is_root_position == false">
                    <el-col :span="4">
                      上一级库位
                    </el-col>
                    <el-col :span="12">
                      <el-select v-model="newDataBase.last_postition_id" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in lastPositionList"
                          :key="item.id"
                          :label="item.stock_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row class="elrowC">
                    <el-col :span="4">
                      &nbsp;
                    </el-col>
                    <el-col :span="12">
                      <el-checkbox v-model="newDataBase.is_root_position">是否为根库位</el-checkbox>
                    </el-col>
                  </el-row>
                  <el-row class="elrowC">
                    <el-col :span="4">
                      备注
                    </el-col>
                    <el-col :span="12">
                      <el-input v-model="newDataBase.note" placeholder="请输入备注" size="small"></el-input>
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="createDataVidible = false" size="small">取 消</el-button>
                  <el-button type="primary" @click="createData" size="small">确 定</el-button>
                </span>
              </el-dialog>
            </el-col>
            <el-col :span="18">
              <div class="topMenuRight">
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
            :data="dataBaseList"
            stripe
            @row-click="viewData"
            height="700"
            style="width: 100%; margin-top: 20px">
            <el-table-column
              type="index"
              header-align='center'
              align='center'
              width="50"
              label="序"
              >

            </el-table-column>
            <el-table-column
              prop="stock_name"
              label="库位名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="last_postition_id"
              label="上一级库位"
              sortable
              >
              <template slot-scope="scope">
                <span v-if="scope.row.is_root_position == 1">根</span>
                <span v-else>{{scope.row.last_postition_id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_root_position"
              label="是否为根库位"
              sortable
              >
              <template slot-scope="scope">
                <span v-if="scope.row.is_root_position == 0">否</span>
                <span v-if="scope.row.is_root_position == 1">是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
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
              label="公司"
              sortable
              >
              <template slot-scope="scope">
                <span v-if="scope.row.order_line.company_name != null">{{scope.row.order_line.company_name}}</span>
                <span v-else class="red_font">未绑定</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              sortable
              >
              <template slot-scope="scope">
                <span v-if="scope.row.order_line.company_id != null">
                  <el-button @click="bindData(scope.row)" type="warning" size="small">更换绑定</el-button>
                </span>
                <span v-else>
                  <el-button @click="createCompany(scope.row)" type="primary" size="small">添加绑定</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="查看修改库位"
            :visible.sync="editDataVidible"
            width="750px">
            <div>
              <el-row class="elrowC">
                <el-col :span="4">
                  库位名称
                </el-col>
                <el-col :span="12">
                  <el-input v-model="editData.stock_name" placeholder="请输入库位名称" size="small"></el-input>
                </el-col>
                <el-col :span="4">
                  <span class="red_font">*</span>
                </el-col>
              </el-row>
              <el-row class="elrowC" v-if="editData.is_root_position == false">
                <el-col :span="4">
                  上一级库位
                </el-col>
                <el-col :span="12">
                  <el-select v-model="editData.last_postition_id" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in lastPositionList"
                      :key="item.id"
                      :label="item.stock_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="elrowC">
                <el-col :span="4">
                  &nbsp;
                </el-col>
                <el-col :span="12">
                  <el-checkbox v-model="editData.is_root_position">是否为根库位</el-checkbox>
                </el-col>
              </el-row>
              <el-row class="elrowC">
                <el-col :span="4">
                  备注
                </el-col>
                <el-col :span="12">
                  <el-input v-model="editData.note" placeholder="请输入备注" size="small"></el-input>
                </el-col>
              </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDataVidible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="editDataFun" size="small">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="绑定公司选择"
            :visible.sync="bindDialogTf"
            width="750px">
            <div>
              <el-select v-model="companyId" placeholder="请选择" size="small" class="selectD">
                <el-option
                  size="small"
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="bindDialogTf = false" size="small">取 消</el-button>
              <el-button type="primary" @click="changeCompany" size="small" v-if="selectedCompany.order_line.id">确 定</el-button>
              <el-button type="primary" @click="createCompanyFun" size="small" v-else>创建绑定公司</el-button>
            </span>
          </el-dialog>
	    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataBaseList: [],
      dialogTableVisible: false, //金料单弹出框
      createDataVidible: false, //创建库位列表弹出框
      editDataVidible: false, //查看/编辑库位弹出框
      editData: {}, //当前库位数据
      selectedDay: "", //日期选择属性
      searchTxt: "", //搜索字段
      companyList: [], //公司属性
      companyId: "", //绑定公司ID
      companyName: "", //绑定公司名称
      bindDialogTf: false, //綁定公司彈框
      selectedCompany: {}, //绑定公司弹框
      dataBaseId: -1, //库位列表ID
      lastPositionList: [], //上一级库位数据列表
      newDataBase: { is_root_position: true } //新的库位草稿
    };
  },
  created() {
    this.created_fun();
  },
  methods: {
    created_fun() {
      var self = this;
      this.$axios
        .get(this.portUrl + "/batar-sjy-manage/stock/stockposition/order/list")
        .then(function(res) {
          if (res.data.code == 200) {
            self.dataBaseList = res.data.data;
            for (var i = 0; i < self.dataBaseList.length; i++) {
              if (self.dataBaseList[i].order_line == undefined) {
                self.dataBaseList[i].order_line = {};
              }
              self.dataBaseList[i].create_time = self.$api.dateGetDay(
                self.dataBaseList[i].create_time
              );
              self.dataBaseList[i].update_time = self.$api.dateGetDay(
                self.dataBaseList[i].update_time
              );
            }

            self.selectedCompany.order_line = {};
            self.companyId = "";
            self.companyName = "";
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
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
    },
    //创建一条新的库位
    addDataBase() {
      var self = this;
      var tempObj = {};
      this.$axios
        .post(
          this.portUrl +
            "/batar-sjy-manage/stock/stockposition/order/lastposition/list"
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.lastPositionList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      self.createDataVidible = true;
    },
    //绑定公司按钮
    bindData(elem) {
      var self = this;
      self.dataBaseId = elem.id;
      if (elem.order_line != undefined) {
        self.selectedCompany = elem;
        self.companyId = elem.order_line.company_id;
        self.companyName = elem.order_line.company_name;
      } else {
        elem.order_line = {};
        self.companyId = "";
        self.companyName = "";
        self.selectedCompany = elem;
      }
      self.bindDialogTf = true;
    },
    //改变绑定公司确认列表
    changeCompany() {
      var self = this;
      for (var i = 0; i < self.companyList.length; i++) {
        if (self.companyList[i].id == self.companyId) {
          self.companyName = self.companyList[i].name;
          break;
        }
      }
      let params = {
        stock_position_id: self.selectedCompany.id,
        stock_position_name: self.selectedCompany.stock_name,
        company_id: self.companyId,
        company_name: self.companyName
      };
      this.$axios
        .post(
          this.portUrl + "/batar-sjy-manage/stock/stockposition/orderline/edit",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.bindDialogTf = false;
            self.$message.success("绑定公司成功，现在正在刷新！");
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
    },
    //创建新绑定公司弹框
    createCompany(elem) {
      var self = this;
      self.companyId = "";
      self.companyName = "";
      self.selectedCompany = elem;
      self.bindDialogTf = true;
    },
    //创建新绑定公司“创建新绑定公司”按钮
    createCompanyFun() {
      var self = this;
      for (var i = 0; i < self.companyList.length; i++) {
        if (self.companyList[i].id == self.companyId) {
          self.companyName = self.companyList[i].name;
          break;
        }
      }
      let params = {
        stock_position_id: self.selectedCompany.id,
        stock_position_name: self.selectedCompany.stock_name,
        company_id: self.companyId,
        company_name: self.companyName
      };
      // console.log(params);
      this.$axios
        .post(
          this.portUrl +
            "/batar-sjy-manage/stock/stockposition/orderline/create",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.bindDialogTf = false;
            self.$message.success("创建绑定公司成功，现在正在刷新！");
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
    },
    //创建新库位确认按钮
    createData() {
      var self = this;
      if (
        self.newDataBase.stock_name == undefined ||
        self.newDataBase.stock_name == ""
      ) {
        self.$message.error("库位名称不能空");
      } else {
        if (self.newDataBase.is_root_position == true) {
          self.newDataBase.is_root_position = 1;
        }
        if (self.newDataBase.is_root_position == false) {
          self.newDataBase.is_root_position = 0;
        }
        this.$axios
          .post(
            this.portUrl + "/batar-sjy-manage/stock/stockposition/order/create",
            self.newDataBase
          )
          .then(function(res) {
            if (res.data.code == 200) {
              self.$message.success("库位成功，现在正在返回库位列表页！");
              setTimeout(function() {
                self.created_fun();
              }, 1000);
              self.createDataVidible = false;
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //查看公司数据弹框
    viewData(elem) {
      var self = this;
      let params = {
        PRS: {
          orderId: elem.id
        }
      };
      this.$axios
        .get(
          this.portUrl + "/batar-sjy-manage/stock/stockposition/order/form",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.editData = res.data.data;
            if (self.editData.is_root_position == "1") {
              self.editData.is_root_position = true;
            } else if (self.editData.is_root_position == "0") {
              self.editData.is_root_position = false;
            }
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });

      this.$axios
        .get(
          this.portUrl +
            "/batar-sjy-manage/stock/stockposition/order/lastposition/list",
          params
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.lastPositionList = res.data.data;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      self.editDataVidible = true;
    },
    //修改库位数据确认按钮
    editDataFun() {
      var self = this;
      if (self.editData.is_root_position == true) {
        self.editData.is_root_position = "1";
      } else if (self.editData.is_root_position == false) {
        self.editData.is_root_position = "0";
      }
      this.$axios
        .post(
          this.portUrl + "/batar-sjy-manage/stock/stockposition/order/edit",
          self.editData
        )
        .then(function(res) {
          if (res.data.code == 200) {
            self.editDataVidible = false;
            self.$message.success("库位成功，现在正在返回库位列表页！");
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
    padding-left 8px
  .topMenuRight
    text-align right
  .searchTxt
    width 200px
  .elrowC
    margin-top 20px
  .selectD
    width 70%
</style>