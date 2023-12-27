<template>
  <div class="stachedBar" ref="myEchartRef"></div>
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
    title: {
      type: String,
      default: "",
    },
    yKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    xKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    showKeyList: {
      type: Array,
      default() {
        return [];
      },
    },
    echartData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
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
          axisLabel: {
            rotate: 45,
          },
          data: [],
        },
        yAxis: [
          {
            type: "value",
            alignTicks: true,
          },
          {
            type: "value",
            alignTicks: true,
            min: 0,
            max: 1,
            axisLabel: {
              formatter: function (value) {
                return value.toFixed(2) + "%";
              },
            },
          },
        ],
        series: [],
      },
    };
  },
  methods: {
    initChart() {
      const showKeyList = this.showKeyList;
      const yKey = this.yKeys[0]; // y轴显示的key
      let ykey2 = this.yKeys[1];
      let series = [];
      let xAxisData = [];
      let yAxisData = [];
      showKeyList.forEach((key, index) => {
        const obj = {
          name: "收入",
          type: "bar",
          data: [],
        };
        this.echartData[key].forEach((item, index1) => {
          // 第一次外循环将日期写入x轴
          if (index == 0) {
            xAxisData.push(item[this.xKeys[0]]);
          }
          // 每次内循环都取出y轴的值
          obj.data.push(item[yKey]);
          yAxisData.push(Number(item[ykey2]));
        });
        series.push(obj);
      });
      //   this.option.yAxis[1].min = Math.min(...yAxisData);
      this.option.yAxis[1].max = Math.max(...yAxisData);
      this.option.xAxis.data = xAxisData;
      let that = this;
      series[0].label = {
        show: true,
        position: "top",
        valueAnimation: true,
        formatter(val) {
          return (
            that.echartData[that.showKeyList[0]][val.dataIndex][ykey2] + "%"
          );
        },
      };
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
.stachedBar {
  width: 95%;
  height: 500px;
}
</style>
