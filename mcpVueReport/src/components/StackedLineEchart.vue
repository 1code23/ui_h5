<template>
  <div class="myEchart" ref="myEchartRef"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    // 数字改变时重新刷新图表
    refreshNum: {
      type: Number,
      default: 1,
    },
    // 对象显示的图表数据
    echartData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    // 需要显示条目对应的echartData的key
    showKeyList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    // 需显示y轴的key
    yKey: {
      type: String,
      required: true,
      default: "",
    },
    // 图标标题
    title: {
      type: String,
      default: "",
    },
    // 是否显示保存为图片的按钮
    showSaveAsImage: {
      type: Boolean,
      default: true,
    },
    // 下载图片的名字
    saveImgName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      myChart: null,
      option: {
        title: {
          left: "center",
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          bottom: "0",
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: this.showSaveAsImage,
              name: this.saveImgName || this.title,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [],
      },
    };
  },
  methods: {
    initChart() {
      const showKeyList = this.showKeyList;
      const yKey = this.yKey; // y轴显示的key
      const series = [];
      const xAxisData = [];
      const legendData = [];
      showKeyList.forEach((key, index) => {
        const obj = {
          name: "",
          type: "line",
          data: [],
        };
        (this.echartData[key] || []).forEach((item, index1) => {
          // 第一次外循环将日期写入x轴
          if (index == 0) {
            xAxisData.push(item.pt);
          }
          // 第一次内循环取出每条折线图的标题名称
          if (index1 == 0) {
            const name = item.appname;
            legendData.push(name);
            obj.name = name;
          }
          // 每次内循环都取出y轴的值
          obj.data.push(item[yKey]);
        });
        series.push(obj);
      });
      this.option.legend.data = legendData;
      this.option.xAxis.data = xAxisData;
      this.option.series = series;
      this.option.toolbox.feature.saveAsImage.show = this.showSaveAsImage;
      if (this.myChart == null) {
        this.myChart = echarts.init(this.$refs.myEchartRef);
      }
      this.myChart.setOption(this.option);
    },
  },
  watch: {
    refreshNum: {
      immediate: true,
      handler(val, oldVal) {
        if (val != oldVal) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
    },
  },
};
</script>
<style scoped>
.myEchart {
  width: 95%;
  height: 500px;
}
</style>
