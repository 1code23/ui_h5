<template>
  <div class="myPage">
    <div class="top">
      <div class="searchArea">
        <el-select
          v-model="searchForm.realname"
          placeholder="请选择应用"
          @change="handleSearch"
          class="mr10"
        >
          <el-option
            v-for="item in appList"
            :key="item.realname"
            :value="item.realname"
            >{{ item.realname }}</el-option
          >
        </el-select>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleSearch"
          align="center"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary" @click="handleDownload">下载</el-button>
      </div>
    </div>
    <div class="remark">{{ dataRemark }}</div>
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
      dataRemark: "",
      searchForm: {
        dateRange: "",
        realname: "桌面",
      },
      appList: [],
      columns: [],
      tableData: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleSearch() {
      this.getTableData();
    },
    handleDownload() {
      const fileName = this.searchForm.realname;
      this.$refs.multTableRef.downloadTable(fileName);
    },
    async getTableData(params) {
      const dataKeys = [
        "monthList",
        "weekList",
        "dayList",
        "dayRate",
        "weekRate",
      ];
      const { dateRange, ...rest } = this.searchForm;
      const _params = { ...rest, ...params };
      if (dateRange) {
        _params.startDate = dateRange[0];
        _params.endDate = dateRange[1];
      }
      this.loading = true;
      const res = await this.$commonApi.appAdData(_params);
      this.loading = false;
      let list = [];
      if (res.code == 200) {
        const data = res.data;
        // 组装需要显示的数据
        dataKeys.forEach((key) => {
          const itemData = data[key];
          if (!itemData) {
            // 没有取到值就直接进行下一轮循环
            return;
          }
          if (!["dayRate", "weekRate"].includes(key)) {
            if (key == "dayList") {
              // 给星期六和星期日标注特殊的类
              itemData.forEach((item) => {
                if (["星期六", "星期日"].includes(item.w_pt)) {
                  item.rowClass = "rowRedColor";
                }
                list.push(item);
              });
            } else {
              list = list.concat(itemData);
            }
          } else {
            // 给日环比和周环比添加特殊的类和标识
            itemData.rowClass = "rowGreyBg";
            itemData.rowDataType = "specialNumber"; // 需标识正负值
            list.push(itemData);
          }
        });
        this.appList = data.selectData;
        this.columns = data.tableTitleData;
        this.tableData = list;
        this.dataRemark = data.remark;
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
  .remark {
    color: red;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>
