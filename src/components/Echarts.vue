<template>
  <div ref="echart" echart></div>
</template>

<script>
import * as echart from "echarts";
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      echart: null, //判断当前echart是否已经渲染的标志

      axisOption: {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category", //类目轴
          data: {},
          axisLine: {
            lineStyle: { color: "#17b3a3" },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          { type: "value", axisLine: { lineStyle: { color: "#17b3a3" } } },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          // "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
    };
  },
  //对传入数据进行判断，是否为“有轴”图表（饼图是无轴的）
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption; //axisOption是由轴的图表配置，normalOption是无轴的图表配置。
    },
  },
  //需要对传入的数据进行监听，实时更新
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
      deep: true, //首次初始化也需要监听
    },
  },
  methods: {
    //需要对echarts进行初始化操作，并且处理好数据
    initChart() {
      this.initChartData(); //处理数据
      //判断当前echarts是否已经渲染
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echart.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    //处理数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
      // console.log(this.chartData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
