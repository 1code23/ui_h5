<template>
  <div class="myPage">
    <div class="top">
      <div class="searchArea"></div>
      <div>
        <el-button type="primary" @click="handleDownload">下载</el-button>
      </div>
    </div>
    <MultTable
      v-if="!loading"
      ref="multTableRef"
      :columns="columns"
      :tableData="tableData"
    ></MultTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      columns: [],
      tableData: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleChangeApp() {
      this.getTableData();
    },
    handleDownload() {
      const fileName = "各产品版本更新率";
      this.$refs.multTableRef.downloadTable(fileName);
    },
    async getTableData(params) {
      this.loading = true;
      const res = await this.$commonApi.appVerActiveData(params);
      this.loading = false;
      if (res.code == 200) {
        const data = res.data;
        this.columns = data.tableTitleData;
        this.tableData = data.list;
      }
    },
  },
};
</script>
<style scoped lang="less">
.myPage {
  padding: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .searchArea {
    flex: 1;
  }
}
</style>