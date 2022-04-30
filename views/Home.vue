<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="userimg" :src="UserImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-4-9</span></p>
          <p>上次登录地点：<span>重庆</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" size="mini">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="name">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          ><div class="icon">
            <i
              :class="'el-icon-' + item.icon"
              :style="{
                background: item.color,
              }"
            ></i>
          </div>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; width: 100%">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :chart-data="this.echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px; width: 100%" ref="userEcharts"></div> -->
          <echart
            :chartData="this.echartData.user"
            style="height: 240px; width: 100%"
          />
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 240px; width: 100%" ref="videoEcharts"></div> -->
          <echart
            :chartData="this.echartData.video"
            :isAxisChart="false"
            style="height: 240px; width: 100%"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api/data.js";
// import * as echarts from "echarts";
import Echart from "../src/components/Echarts.vue";

export default {
  name: "home",
  components: { Echart },
  data() {
    return {
      UserImg: require("../src/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        //名称要与数据中列的名称保持一致
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      // console.log(res);
      // console.log(this);

      const { code, data } = res.data;
      // console.log(data);
      if (code === 20000) {
        this.tableData = data.tableData;
        this.countData = data.countData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // const option = {
        //   xAxis: { data: xData },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);
        // 用户图（柱状图）
        // const userOption = {
        //   legend: {
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   tooltip: { trigger: "axis" },
        //   xAxis: {
        //     type: "category", //类目轴
        //     data: data.userData.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: { color: "#17b3a3" },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     { type: "value", axisLine: { lineStyle: { color: "#17b3a3" } } },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: data.userData.map((item) => item.new),
        //       type: "bar",
        //     },
        //     {
        //       name: "活跃用户",
        //       data: data.userData.map((item) => item.active),
        //       type: "bar",
        //     },
        //   ],
        // };
        // console.log(userOption);
        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        // const U = echarts.init(this.$refs.userEcharts);
        // U.setOption(userOption);
        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     // "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [{ data: data.videoData, type: "pie" }],
        // };
        this.echartData.video.series = [{ data: data.videoData, type: "pie" }];

        // const V = echarts.init(this.$refs.videoEcharts);
        // console.dir(V);
        // V.setOption(videoOption);
        // console.log(this.echartData);
      }
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  justify-content: left;
  align-items: center;
  .userimg {
    width: 100px;
    height: 100px;
  }
  .userinfo {
    margin-left: 20px;
    .name {
      font-size: 18px;
    }
    .access {
      font-size: 12px;
      color: #9c9c9c;
    }
  }
}
.login-info {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  font-size: 12px;
  color: #9c9c9c;
  span {
    margin-left: 30px;
  }
}
.el-table {
  font-size: 12px;
  .el-table-column {
    color: #9c9c9c;
  }
}
.name {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  padding: 0;
  overflow: hidden;
  .el-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    // height: 80px;
    width: 30%;
    // .icon {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   width: 80px;
    //   height: 80px;
    //   align-self: center;
    //   i {
    //     display: block;
    //     width: 100%;
    //     height: 100%;
    //     line-height: 80px;
    //     &:before {
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       align-items: center;
    //       height: 100%; //这个高度设置很关键
    //     }
    // }
    // }
    .icon i {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .detail {
      margin-left: 20px;
      flex: 3;
      height: 80px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      text-align: center;

      .num {
        margin: 0;
        margin-top: 10px;
        padding: 0;
        font-size: 20;
        &:before {
          content: "￥";
        }
      }
      .txt {
        // margin: 0;
        // padding: 0;
        color: #9c9c9c;
        font-size: 12px;
      }
    }
  }
}
.graph {
  margin-top: 20px;

  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
