<template>
    <div class="pageination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resultAll.rowSize">
        </el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    pageSizes: {
      type: Array,
      required: true
    },
    pagiMethod: {
      type: String,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData(page) {
      let method = "get",
        config = "",
        params = {
          PRS: {
            page: this.page ? this.page : "",
            rows: this.pageSize ? this.pageSize : ""
          }
        };
      if (this.pagiMethod == "post") {
        method = "post";
        config = { "Content-Type": "application/x-www-form-urlencoded" };
        params = {
          page: this.page ? this.page : "",
          rows: this.pageSize ? this.pageSize : ""
        };
      }
      this.$axios[method](this.url, params, config).then(res => {
        if (res.data.code == 200) {
          this.result = res.data;
          this.resultAll = res.data.data;
          this.$emit("result", this.result);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData(val);
    }
  },
  data() {
    return {
      resultAll: {},
      pageSize: 20,
      page: 1
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.pageination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
