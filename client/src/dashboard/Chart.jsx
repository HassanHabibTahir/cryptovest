import React from "react";

import ReactEcharts from "echarts-for-react";

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
// eslint-disable-next-line no-plusplus
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}
const options = {
  tooltip: {
    trigger: "axis",
    position(pt) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "center",
    text: "",
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: date,
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: "Fake Data",
      type: "line",
      symbol: "none",
      sampling: "lttb",
      itemStyle: {
        color: "rgb(255, 70, 131)",
      },

      data,
    },
  ],
};

const GradientLineChart = () => {
  return (
    <ReactEcharts option={options} style={{ width: "100%", height: "400px" }} />
  );
};

export default GradientLineChart;
