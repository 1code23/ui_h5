<template>
  <div class="myPage">
    <div class="top">
      <div class="searchArea">
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
        <el-button type="primary" @click="handleDownload()">下载</el-button>
        <el-button
          type="primary"
          @click="handleExport()"
          id="downloadHtmlBtn"
          v-if="isDownload"
          >导出整个页面</el-button
        >
      </div>
    </div>
    <MultTable
      v-if="!loading"
      ref="multTableRef"
      :columns="columns"
      :tableData="tableData"
    ></MultTable>
    <div ref="myEchartRef">
      <div class="mt40">
        <StackedLineEchart
          v-if="chartData.totalIncomeChart"
          title="总收入"
          saveImgName="1.总收入"
          :refreshNum="refreshNum"
          :showSaveAsImage="!isDownload"
          :echartData="{ totalIncome: chartData.totalIncomeChart }"
          :showKeyList="['totalIncome']"
          yKey="settle_money"
        ></StackedLineEchart>
      </div>
      <el-row class="mt40">
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="各产品收入（桌面、负一屏、手机管家）"
            saveImgName="2.各产品收入（桌面、负一屏、手机管家）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="['desktop', 'one_screen', 'phone_guardian']"
            yKey="income"
          ></StackedLineEchart>
        </el-col>
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="日活（桌面、负一屏、手机管家）"
            saveImgName="3.日活（桌面、负一屏、手机管家）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="['desktop', 'one_screen', 'phone_guardian']"
            yKey="active"
          ></StackedLineEchart>
        </el-col>
      </el-row>
      <el-row class="mt40">
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="各产品收入（搜搜、分身有术、万年历）"
            saveImgName="4.各产品收入（搜搜、分身有术、万年历）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="['soso', 'doppelganger', 'beautiful_calendar']"
            yKey="income"
          ></StackedLineEchart>
        </el-col>
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="日活（搜搜、分身有术、万年历）"
            saveImgName="5.日活（搜搜、分身有术、万年历）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="['soso', 'doppelganger', 'beautiful_calendar']"
            yKey="active"
          ></StackedLineEchart>
        </el-col>
      </el-row>
      <el-row class="mt40">
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="日活arpu（桌面、负一屏、手机管家、万年历）"
            saveImgName="6.日活arpu（桌面、负一屏、手机管家、万年历）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="[
              'desktop',
              'one_screen',
              'phone_guardian',
              'beautiful_calendar',
            ]"
            yKey="arpu"
          ></StackedLineEchart>
        </el-col>
        <el-col :span="12">
          <StackedLineEchart
            v-if="chartData.dayChart"
            title="日活arpu（搜搜、分身有术）"
            saveImgName="7.日活arpu（搜搜、分身有术）"
            :refreshNum="refreshNum"
            :showSaveAsImage="!isDownload"
            :echartData="chartData.dayChart"
            :showKeyList="['soso', 'doppelganger']"
            yKey="arpu"
          ></StackedLineEchart>
        </el-col>
      </el-row>
      <div class="mt40">
        <StackedBar
          v-if="chartData.adIncomeChart"
          title="各广告位收入 （昨日收入前80%）"
          saveImgName="8.各广告位收入 （昨日收入前80%）"
          :yKeys="['settle_money', 'money_rate']"
          :xKeys="['slotname']"
          :showKeyList="['adIncomeChart']"
          :refreshNum="refreshNum"
          :showSaveAsImage="!isDownload"
          :echartData="chartData"
        ></StackedBar>
      </div>
    </div>
  </div>
</template>
<script>
import StackedLineEchart from "@/components/StackedLineEchart";
import StackedBar from "@/components/StackedBar";
export default {
  components: { StackedLineEchart, StackedBar },
  data() {
    return {
      htmlUrl: "",
      loading: false,
      columns: [],
      tableData: [],
      chartData: {},
      isDownload: true, // 是否为下载路由
      refreshNum: 1,
      searchForm: {
        dateRange: "",
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleSearch() {
      this.getTableData();
    },
    async handleExport() {
      if (this.$refs.multTableRef && this.$refs.myEchartRef) {
        const tableHtml = await this.$refs.multTableRef.getTableHtml(); // 获取表格html
        const echartImgUrl = await this.$utils.toImage(this.$refs.myEchartRef); // 获取图片区域的截图
        const imgHtml = `<img src="${echartImgUrl}" alt="">`; // 组装echart图片显示的html
        const bodyHtml = `${tableHtml}<br/>${imgHtml}`; // 组装显示的html
        // import()引入含有html代码的js文件,因为vue不支持引入html文件,只能将html代码写成字符串放到js文件中;
        const exportTemplate = await import("@/common/utils/exportTemplate.js");
        const fileName = "收入汇总";
        const content = exportTemplate.generateHtml(bodyHtml, fileName); // 生成完整的html
        console.info(content); // 打印在控制台，让无头浏览器获取数据；触发打印事件的元素id必须是 downloadHtmlBtn
      } else {
        this.$message.warning("请等待图表渲染完成后下载");
      }
    },
    handleDownload() {
      const fileName = "收入汇总";
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
      const res = await this.$commonApi.totalIncomeData(_params);
      this.loading = false;
      let list = [];
      if (res.code == 200) {
        const data = res.data;
        // 组装需要显示的数据
        dataKeys.forEach((key) => {
          const itemData = data.list[key];
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
        this.columns = data.tableTitleData;
        this.chartData = data.chart;
        this.tableData = list;
        this.refreshNum += 1;
        return data;
      }
    },
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(query) {
        const { download = false } = query;
        if (download == "true") {
          // 导出页面的表格和图表时，不需要显示echart下载图标
          this.isDownload = true;
        } else {
          this.isDownload = false;
        }
      },
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
    margin-bottom: 30px;
  }
  .mt40 {
    margin-top: 40px;
  }
}
</style>
