<template>
  <div class="conBigDiv" id="prodedit">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="topnav">
      <el-breadcrumb-item :to="{ path: '/' }">尚金缘订单销售系统</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hr"></div>

    <div class="proimg">
      <div class="proimg-tit">
        <p>产品图片</p>
        <div class="probtn">
          <el-button type="primary" plain size="small">取消</el-button>
          <el-button type="primary" size="small">保存</el-button>
        </div>
      </div>
      <div class="proimg-img">
        <div class="proii-i iactive" v-for="(index, item) in 4">
          <img class="proii-img" src="">
          <img class="proii-badge" v-show="true" src="@/../static/images/icon-dele.png" @click="deleImg(index)">
        </div>
        <div class="proii-bor" @click="uploadImg">
          <p class="prob-t">点击上传图片建议图片</p>
          <p>尺寸比例为4:3</p>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-row :gutter="20">
          <el-col :span="6" :offset="1">
            <div class="select-item">
              <p>一级品目<span>*</span></p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>二级品目 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>产品名称<span>*</span></p>
              <el-input placeholder="请输入产品名称" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>产品编码<span>*</span></p>
              <el-input placeholder="请输入产品编码" size="small"></el-input>
            </div>
            <div class="select-item">
              <p>所属系列 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>所属主题 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>供应商编号 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>是否上架 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="select-item">
              <p>是否可定制 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>产品类型 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>销售一口价 </p>
              <el-input placeholder="请设置销售价格" size="small"></el-input>
            </div>
            <div class="select-item">
              <p>销售类型 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>基本工费 </p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>附加工费 </p>
              <el-input placeholder="请输入附加费用" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>生产周期</p>
              <el-input placeholder="请输入成产周期" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>产品描述</p>
              <el-input placeholder="请输入产品描述" type="textarea" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="产品属性" name="second">
        <el-row :gutter="20">
          <el-col :span="6" :offset="1">
            <div class="select-item">
              <p>产品材质 <span>*</span></p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>产品成色 <span>*</span></p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>生产工艺 <span>*</span></p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>表面工艺 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-item">
              <p>外观形态 </p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>车花描述 </p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
            <div class="select-item">
              <p>适合人群 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>适合年龄</p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="产品规格" name="third">
        <el-row :gutter="20" v-if="proType === 1">
          <el-col :span="6" :offset="1">
            <div class="select-item">
              <p>标准克重 <span>*</span> </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-range-item">
              <p>克重范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="克重起" size="small"></el-input>
                <el-input placeholder="克重止" size="small"></el-input>
              </div>
            </div>
            <div class="input-item">
              <p>字印 </p>
              <el-input placeholder="请输入字印" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-item">
              <p>标准长度 </p>
              <el-input placeholder="请输入产品的标准长度" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>长度范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="长度起" size="small"></el-input>
                <el-input placeholder="长度止" size="small"></el-input>
              </div>
            </div>
            <div class="select-item">
              <p>链扣类型 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="proType === 2">
          <el-col :span="6" :offset="1">
            <div class="input-item">
              <p>标准克重 </p>
              <el-input placeholder="请输入标准克重" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>克重范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="请输入储位下限量" size="small"></el-input>
                <el-input placeholder="请输入储位上限量" size="small"></el-input>
              </div>
            </div>
            <div class="input-item">
              <p>字印 </p>
              <el-input placeholder="请输入字印" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>标准内径长 </p>
              <el-input placeholder="请输入标准内径长" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-range-item">
              <p>内径长度范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="长度起" size="small"></el-input>
                <el-input placeholder="长度止" size="small"></el-input>
              </div>
            </div>
            <div class="input-item">
              <p>标准内径宽 </p>
              <el-input placeholder="请输入标准内径宽" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>内径宽范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="内径款起" size="small"></el-input>
                <el-input placeholder="内径款止" size="small"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="proType === 3">
          <el-col :span="6" :offset="1">
            <div class="input-item">
              <p>标准克重 <span>*</span> </p>
              <el-input placeholder="请输入标准克重" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>克重范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="克重起" size="small"></el-input>
                <el-input placeholder="克重止" size="small"></el-input>
              </div>
            </div>
            <div class="input-item">
              <p>字印 <span>*</span> </p>
              <el-input placeholder="请输入字印" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-item">
              <p>标准高 </p>
              <el-input placeholder="请输入标准高度" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>高度范围</p>
              <div class="inpurai-info">
                <el-input placeholder="高度起" size="small"></el-input>
                <el-input placeholder="高度止" size="small"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="proType === 4">
          <el-col :span="6" :offset="1">
            <div class="input-item">
              <p>标准克重 <span>*</span> </p>
              <el-input placeholder="请输入标准克重" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>克重范围 <span>*</span></p>
              <div class="inpurai-info">
                <el-input placeholder="克重起" size="small"></el-input>
                <el-input placeholder="克重止" size="small"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-item">
              <p>字印 </p>
              <el-input placeholder="请输入字印" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>手寸 <span>*</span> </p>
              <el-input placeholder="请输入产品的手寸大小" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="proType === 5">
        <el-col :span="6" :offset="1">
          <div class="input-item">
            <p>标准克重 <span>*</span> </p>
            <el-input placeholder="请输入标准克重" size="small"></el-input>
          </div>
          <div class="input-range-item">
            <p>克重范围 <span>*</span></p>
            <div class="inpurai-info">
              <el-input placeholder="克重起" size="small"></el-input>
              <el-input placeholder="克重止" size="small"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="input-item">
            <p>字印 </p>
            <el-input placeholder="请输入字印" size="small"></el-input>
          </div>
          <div class="input-item">
            <p>长宽高 </p>
            <el-input placeholder="请输入产品的长宽高" size="small"></el-input>
          </div>
        </el-col>
      </el-row>
        <el-row :gutter="20" v-if="false">
          <el-col :span="6" :offset="1">
            <div class="select-item">
              <p>产品材质 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>产品成色 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>生产工艺 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select-item">
              <p>表面工艺 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="input-item">
              <p>外观形态 </p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>车花描述 </p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
            <div class="select-item">
              <p>适合人群 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>适合年龄</p>
              <el-input placeholder="请输入基本工费" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="其他参数" name="fourth">
        <el-row :gutter="20">
          <el-col :span="6" :offset="1">
            <div class="input-item">
              <p>中央编号 <span>*</span></p>
              <el-input placeholder="请输入中央编号" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>工厂模号 <span>*</span></p>
              <el-input placeholder="请输入工厂模号" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>工厂编号 <span>*</span></p>
              <el-input placeholder="请输入工厂编号" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>专利号 </p>
              <el-input placeholder="请输入专利号" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>赚利截止日期 </p>
              <el-input placeholder="请输入赚利截止日期" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>上市时间 </p>
              <el-input placeholder="请输入上市时间" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>设计师编号 </p>
              <el-input placeholder="请输入设计师编号" size="small"></el-input>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div class="select-item">
              <p>开票名称 </p>
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="input-item">
              <p>营销属性1</p>
              <el-input placeholder="请输入营销属性1" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>营销属性2 </p>
              <el-input placeholder="请输入营销属性2" size="small"></el-input>
            </div>
            <div class="input-item">
              <p>套装编号</p>
              <el-input placeholder="请输入套装编号" size="small"></el-input>
            </div>
            <div class="input-range-item">
              <p>销售渠道</p>
              <div class="inpurai-info">
                <el-input placeholder="请输入储位下限量" size="small"></el-input>
                <el-input placeholder="请输入储位上限量" size="small"></el-input>
              </div>
            </div>
            <div class="input-item">
              <p>销售渠道</p>
              <el-input placeholder="请输入销售渠道" size="small"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "first",
        proType: 3,
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: ""
      };
    },
    created() {
      this.created_fun();
    },
    methods: {
      created_fun() {
        const self = this;
        this.$axios
          .get(this.portPro + "/batar-sjy-manage/batar-sjy-manage/product/list")
          .then(function (res) {
            if (res.data.code == 200) {
              self.checkGoldData = res.data.data;
            } else {
              self.$message.error(res.data.msg);
            }
          });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      deleImg() {
      },
      uploadImg() {
      }
    }
  };
</script>

<style>
  #prodedit .el-tabs__nav-scroll {
    margin-left: 24px;
  }
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $base-color = #e60e32;
  $font-color = #999;

  .input-range-item {
    margin-bottom: 18px;

    & > p {
      padding: 8px 2px;
      font-size: 14px;
      color: #888;
    }
    & > .inpurai-info {
      display: flex;
      justify-content: space-between;
      width: 560px;
      & > .el-input {
        width: 260px
      }
    }
  }

  .select-item {
    margin-bottom: 18px;

    & > .el-select {
      width: 560px;
    }

    & > p {
      padding: 8px 2px;
      font-size: 14px;
      color: #888;

      & > span {
        color: red;
      }
    }
  }

  .input-item {
    margin-bottom: 18px;

    & > .el-input {
      width: 560px;
    }

    & > .el-textarea {
      width: 560px;
    }

    & > p {
      padding: 8px 2px;
      font-size: 14px;
      color: #888;

      & > span {
        color: red;
      }
    }
  }

  .proimg {
    padding: 24px;

    .proimg-tit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .proimg-img {
      display: flex;

      .proii-i {
        position: relative;
        margin-right: 20px;
        width: 240px;
        height: 180px;

        &.iactive {
          border: 1px solid $base-color;
        }

        .proii-img {
        }

        .proii-badge {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .proii-bor {
        box-sizing: border-box;
        padding-top: 86px;
        width: 240px;
        height: 180px;
        background: url('../../../static/images/img-addimg.png') no-repeat;
        background-size: 100% 100%;

        & > p {
          text-align: center;
          line-height: 1.5;
          color: $base-color;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .conBigDiv {
    padding-bottom: 80px;

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
  }
</style>
