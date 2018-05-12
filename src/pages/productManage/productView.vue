<template>
  <div class="conBigDiv" id="proview">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
      <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
      <el-breadcrumb-item>原料管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品库</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div class="hr"/>
      <el-row style="margin-bottom: 16px">
        <el-col :span="24">
          <div class="topMenuRight">
            <el-button size="small" icon="el-icon-printer" >打印</el-button>
            <el-button size="small" icon="el-icon-upload2" >导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 16px">
        <el-col :span="4">
          <div class="top-select">
            <span>产品主题</span>
            <el-select v-model="allParams.theme" size="small" placeholder="请选择">
              <el-option
                v-for="item in codeObj.theme_code"
                :key="item.value"
                :label="item.code"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" >
          <div class="top-select">
            <span>产品系列</span>
            <el-select v-model="allParams.series" size="small" placeholder="请选择">
              <el-option
                v-for="item in codeObj.series_code"
                :key="item.value"
                :label="item.code"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="top-select">
            <span>产品类型</span>
            <el-select v-model="allParams.type" size="small" placeholder="请选择">
              <el-option
                v-for="item in codeObj.pro_type_code"
                :key="item.value"
                :label="item.code"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="top-select">
            <span>是否新品</span>
            <el-select v-model="allParams.isNew" size="small" placeholder="请选择">
              <el-option
                v-for="item in newProduct"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="top-select">
            <span>是否上架</span>
            <el-select v-model="allParams.isUp" size="small" placeholder="请选择">
              <el-option
                v-for="item in putawaySear"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="top-select">
            <span>上架时间</span>
            <el-date-picker
              v-model="searchTime"
              type="daterange"
              align="right"
              unlink-panels
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeChange"
              :picker-options="daySelectData">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 16px">
         <el-col :span="4">
          <div class="top-select">
            <span>产品名称</span>
            <el-input v-model="allParams.proName" size="small" placeholder="请输入产品名称"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="top-select">
            <span>产品编号</span>
            <el-input v-model="allParams.batarNum" size="small" placeholder="请输入产品名称"></el-input>
          </div>
        </el-col>       
      </el-row>
      <el-row style="margin-bottom: 16px">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="sureSear">确定查询</el-button>
          <el-button type="primary" plain size="small" @click="resetSear">重置条件</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" plain size="small" @click="createdOrder">新增产品</el-button>
          <el-button type="primary" plain size="small" @click="dlUpload = true">批量新增产品</el-button>
          <el-button type="primary" plain size="small" @click="dlAddSeries = true">批量添加到系列</el-button>
          <el-button type="primary" plain size="small" @click="dlChangeStatus = true" >批量上下架</el-button>
          <el-button type="primary" plain size="small" @click="dlSetClass = true">批设置产品类型</el-button>
          <el-button type="primary" plain size="small">设置图片水印</el-button>
          <el-button type="primary" plain size="small" @click="dlTime = true">设置新品时间</el-button>
          <el-button type="warning" size="small" @click="dlDeleClick">批量删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="result.data"
        stripe
        border
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
        show-summary
        style="width: 100%; margin-top: 20px">
        <el-table-column
          type="selection"
          header-align='center'
          align='center'
          width="55">
        </el-table-column>
        <el-table-column
          prop="pic"
          label="图片"
          header-align='center'
          align='center'
        >
          <template slot-scope="scope">
            <img class="imgcol" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="proName"
          label="名称"
          header-align='center'
          align='center'
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="batarNo"
          label="编号"
          header-align='center'
          align='center'
          :filters="[{ text: '张三', value: '张三' }, { text: '李四', value: '李四' }]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="theme"
          label="主题"
          header-align='center'
          align='center'
        >
        </el-table-column>
        <el-table-column
          prop="series"
          label="系列"
          header-align='center'
          align='center'
        >
        </el-table-column>
        <el-table-column
          prop="proType"
          label="类型"
          header-align='center'
          align='center'
        >
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label="产品状态"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.state === 0 ">未上架</p>
            <p v-if="scope.row.state === 1 ">已上架</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="upShelfDate"
          label="上架时间"
          header-align='center'
          align='center'
          :formatter="formatDate"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          header-align='center'
          align='center'
          width="340"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" v-if="scope.row.state == 0" @click="handleUpDown(scope.row, scope.$index)">上架</el-button>
            <el-button size="small" v-else  @click="handleUpDown(scope.row, scope.$index)">下架</el-button>
            <el-button type="primary" size="small" @click="handleNewpro">设为新品</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button plain size="small" @click="dlDeleClick(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination @result="getAllDate" :pageSizes="[10, 20, 50, 100]" :url="this.portPro + '/batar-sjy-manage/product/list'"></Pagination>
    </div>
    <el-dialog title="批量上传产品" width="60%" :visible.sync="dlUpload">
      <div class="upload-con">
        <p class="upc-tit">下载产品上传模版</p>
        <el-button class="upc-down" type="primary" plain size="small">下载数据模版</el-button>
        <p class="upc-tit">上传产品文件</p>
        <div class="upc-mi">
          <label for="exFile">上传产品数据<input id="exFile" type="file" @change="uploadPros"></label>
          <label for="zipFile">上传产品图包<input id="zipFile" type="file" @change="uploadImgs"></label>
        </div>
        <div class="upc-warn">
          <p class="upcw-t">注：</p>
          <p><span>*</span>上传款式图包（jpg或者png图片压缩包zip文件），压缩包内部目录不要含有中文字符</p>
          <p><span>*</span>上传图片文件命名与款号相同</p>
          <p><span>*</span>同一个款式的多张图片应使用相同的前缀。例：款号为123123的产品三张图可以分别命名为123123、123123(1)、</p>
          <p><span>*</span>图片建议尺寸：1200*900 图片尺寸统一</p>
        </div>
        <div class="hr"></div>
        <div class="dl-bt">
          <el-button  plain size="small" @click="dlUpload = false">取消</el-button>
          <el-button type="primary" size="small" @click="dlUploadClick">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="添加推广类别"  width="60%" :visible.sync="dlAddSeries">
      <div class="series-con">
        <el-row >
          <el-col class="clc-col">
            <el-radio-group v-model="seriesRadio">
              <el-radio :label="item.code" :key="item.value" v-for="item in codeObj.series_code"></el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <div class="dl-bt">
          <el-button  plain size="small" @click="dlAddSeries = false">取消</el-button>
          <el-button type="primary" size="small" @click="dlAddSeriesClick">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="批量调整状态"  width="40%" :visible.sync="dlChangeStatus">
      <div class="status-con">
        <div class="stc-radio">
          <el-radio-group v-model="statusRadio">
            <el-radio label="1">上架</el-radio>
            <el-radio label="0">下架</el-radio>
          </el-radio-group>
        </div>
        <div class="dl-bt">
          <el-button  plain size="small" @click="dlChangeStatus = false">取消</el-button>
          <el-button type="primary" size="small" @click="dlChangeStatusClick">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="设置产品类型"  width="40%" :visible.sync="dlSetClass">
      <div class="class-con">
        <div class="cls-radio">
          <el-radio-group v-model="classRadio">
            <el-radio :label="item.code" :key="item.value" v-for="item in codeObj.pro_type_code"></el-radio>
          </el-radio-group>
        </div>
        <div class="dl-bt">
          <el-button plain size="small" @click="dlSetClass = false">取消</el-button>
          <el-button type="primary" size="small" @click="dlSetClassClick">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="批量上传产品"  width="40%" :visible.sync="dlTime">
      <div class="time-con">
        <div class="tic-radio">
          <el-radio-group v-model="dayRadio">
            <el-radio label="7">7天</el-radio>
            <el-radio label="15">15天</el-radio>
            <el-radio label="30">30天</el-radio>
          </el-radio-group>
        </div>
        <div class="dl-bt">
          <el-button plain size="small" @click="dlTime = false">取消</el-button>
          <el-button type="primary" size="small" @click="dlTimeClick">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dlUpload: false,
        dlChangeStatus: false,
        dlAddSeries: false,
        dlSetClass: false,
        dlDele: false,
        dlTime: false,

        statusRadio: "1", // 批量上下架
        classRadio: "精品", // 批量设置产品类型
        seriesRadio: "", // 批量设置产品系列

        allParams: {}, // 搜索参数

        pageSize: 20,
        page: 1,

        tableSelectId: [], // 选择id
        dayRadio: '',
        result: [], // 页面列表展示
        codeObj: {}, //  select数据
        newProduct: [
          {
            value: 1,
            label: '是'
          },
          {
            value: 0,
            label: '否'
          }
        ],
        putawaySear: [
          {
            value: 1,
            label: '是'
          },
          {
            value: 0,
            label: '否'
          }
        ],
        daySelectData: {
          //日期选择期关键字
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        dialogTableVisible: false, //金料单弹出框
        searchTime: "", //时间
      };
    },
    created() {
      this.created_fun();
    },
    methods: {
      created_fun() {
        this.$axios
          .get(this.portPro + "/batar-sjy-manage/product/codeList")
          .then(res => {
            if (res.data.code == 200) {
              this.codeObj = res.data.data
            }
          });
      },
      // 上下架
      handleUpDown(row, index) {
        let params = {
          PRS: {
            t: row.state == 0 ? 1 : 0,
            ids: row.id
          }
        }
        this.upOrDown(params, index)
      },
      // 设为新品
      handleNewpro() {

      },
      // 编辑
      handleEdit(elem) {
        this.$router.push({ path: 'productEdit', query: { goldId: elem.id}})
      },
      // 时间改变
      timeChange() {
        this.allParams.startTime = this.$api.dateGetDay(this.searchTime[0])
        this.allParams.endTime = this.$api.dateGetDay(this.searchTime[1])
      },
      getAllDate(e) {
        this.result = e.data
        this.result.data.forEach(item => {
          item.pic = this.portImg + item.pic;
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
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
      uploadPros(e) {
        this.excelFile = e.target.files[0];
      },
      uploadImgs(e) {
        this.zipFile = e.target.files[0];
      },
      dlUploadClick() {
        let self = this;
        if (!this.excelFile) {
          this.$message.error("请上传excel");
          return;
        }
        if (!this.zipFile) {
          this.$message.error("请上传zip");
          return;
        }
        let param = new FormData(); // 创建form对象
        param.append("excelFile", this.excelFile); // 通过append向form对象添加数据
        param.append("zipFile", this.zipFile); // 添加form表单中其他数据
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        // 添加请求头
        this.$axios
          .post(
            this.portPro + "/batar-sjy-manage/product/uploadFile",
            param,
            config
          )
          .then(res => {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg);
              self.dlUpload = false;
            } else {
              self.$message.error(res.data.msg);
            }
          });
      },
      //批量新增系列
      dlAddSeriesClick() {    
        let self = this;
        if (!this.tableSelectId) {
          this.dlAddSeries = false;
          return;
        }
        let params = {
          PRS: {
            s: this.seriesRadio,
            ids: this.tableSelectId.toString()
          }
        };
        this.$axios.get(this.portPro + "/batar-sjy-manage/product/updateSeries", params).then(res => {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg);
              this.resetData(this.tableSelectId, {name: 'series', handle: params.PRS.s})
              this.dlAddSeries = false;
            } else {
              self.$message.error(res.data.msg);
            }
          });
      },
      //批量上下架
      dlChangeStatusClick() {
        let self = this;
        if (!this.tableSelectId) {
          this.dlChangeStatus = false;
          return;
        }
        let params = {
          PRS: {
            t: Number(this.statusRadio),
            ids: this.tableSelectId.toString()
          }
        };
        this.upOrDown(params)
      },
      //批量设置产品类型
      dlSetClassClick() {
        if (!this.tableSelectId) {
          this.dlSetClass = false;
          return;
        }
        let params = {
          PRS: {
            s: this.classRadio,
            ids: this.tableSelectId.toString()
          }
        };
        this.$axios
          .get(this.portPro + "/batar-sjy-manage/product/updateType", params)
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.resetData(this.tableSelectId, {name: 'proType', handle: params.PRS.s})
              this.dlSetClass = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
      },
      dlTimeClick() {
        this.dlTime = false;
      },
      dlDeleClick(row) {
        let self = this
        this.$confirm("确定要删除选中的产品?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (!this.tableSelectId) {
            this.dlDele = false;
            return;
          }
          let params = {
            PRS: {
              ids: row.id ? row.id : this.tableSelectId.toString()
            }
          };
          this.$axios
            .get(this.portPro + "/batar-sjy-manage/product/deletes", params)
            .then(res => {
              if (res.data.code == 200) {
                self.$message.success(res.data.msg);
                this.dlDele = false;
              } else {
                self.$message.error(res.data.msg);
              }
            });
        });
      },
      // 批量设置数据更改
      resetData(ids, options) {
        this.result.data.forEach(item => {
          ids.forEach(it => {
            if(item.id == it) {
              item[options.name] = options.handle
            }
          })
        })
      },
      // 上下架公共方法
      upOrDown(params, index) {
        this.$axios
          .get(this.portPro + "/batar-sjy-manage/product/upOrDown", params)
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.dlChangeStatus = false;
              if(index === undefined || index === null) {
                this.resetData(params.PRS.ids.split(','), {name: 'state', handle: params.PRS.t}) 
              } else {
                this.result.data[index].state = this.result.data[index].state == 0 ? 1 : 0
              }
            } else {
              this.$message.error(res.data.msg);
            }
          })
      },
      // 选中值
      handleSelectionChange(select) {
        this.tableSelectId = [];
        select.forEach(item => {
          this.tableSelectId.push(item.id);
        });
      },
      sureSear() {
        console.log(this.allParams)
      },
      resetSear() {
        this.allParams = {}
      },
      formatDate(row, column) {
        return this.$api.dateGetDay(row.update_time)
      },
      // 创建提纯单
      createdOrder() {
        this.$router.push({ path: "productEdit", query: { created: 1 } });
      },
      viewProd(elem) {
        this.$router.push({ path: "productEdit", query: { created: 1 } });
      },
      editProd(elem) {
        this.$router.push({ path: "productEdit", query: { created: 1 } });
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $base-color = rgb(230, 14, 50);
  $font-color = #999;

  .imgcol {
    width: 120px;
    max-height: 120px;
  }

  .top-select {
    & > span {
      color: #8A9199;
      font-size: 12px;
    }

    & > .el-select {
      width: 160px;
    }
    & > .el-input {
      width: 160px;
    }
    & > .el-date-editor {
      width: 188px;
    }
  }

  .conBigDiv {
    padding-bottom: 100px;
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

    .topMenuRight {
      text-align: right;
    }

    .searchTxt {
      width: 200px;
    }

    .dl-bt {
      display: flex;
      justify-content: flex-end;

      & > button {
        margin-left: 30px;
      }
    }

    .pageination {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }

  .upload-con {
    .upc-tit {
      margin-bottom: 15px;
    }

    .upc-down {
      margin-bottom: 40px;
    }

    .upc-mi {
      display: flex;
      margin-bottom: 40px;

      & > label {
        display: block;
        box-sizing: border-box;
        width: 100px;
        height: 60px;
        font-size: 12px;
        color: $base-color;
        text-align: center;
        background: url('../../../static/images/img-upload.png') no-repeat;
        background-size: 100% 100%;
        margin-right: 20px;
        padding-top: 28px;

        & > input {
          opacity: 0;
        }
      }

      & > div:hover {
        cursor: pointer;
      }
    }

    .upc-warn {
      color: #888;

      .upcw-t {
        color: $base-color;
      }

      > p > span {
        color: $base-color;
        margin-right: 8px;
      }
    }
  }

  .series-con {
    .clc-col {
      display: flex;
      flex-direction: column;

      > div {
        margin-left: 10px;

        label {
          width: 30%;
          margin-bottom: 20px;
          margin-left: 0;
        }
      }
    }

    .dl-bt {
      margin-top: 20px;
    }
  }

  .status-con {
    .stc-radio {
      & label {
        margin-right: 60px;
      }
    }

    .dl-bt {
      margin-top: 50px;
    }
  }

  .class-con {
    .cls-radio {
      & label {
        margin-right: 60px;
      }
    }

    .dl-bt {
      margin-top: 50px;
    }
  }

  .time-con {
    .tic-radio {
      & label {
        margin-right40px;
      }
    }

    .dl-bt {
      margin-top: 50px;
    }
  }

  .dele-con {
    .tic-radio {
      & label {
        margin-right40px;
      }
    }

    .dl-bt {
      margin-top: 50px;
    }
  }
</style>
