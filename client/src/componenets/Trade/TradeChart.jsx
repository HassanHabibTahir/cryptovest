import React from "react";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";

import {
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";

import { BarChart, CandlestickChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CandlestickChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const colorList = [
  "#c23531",
  "#2f4554",
  "#61a0a8",
  "#d48265",
  "#91c7ae",
  "#749f83",
  "#ca8622",
  "#bda29a",
  "#6e7074",
  "#546570",
  "#c4ccd3",
];
const labelFont = "bold 12px Sans-serif";

// function calculateMA(dayCount, data) {
//   const result = [];
//   for (let i = 0, len = data.length; i < len; i++) {
//     if (i < dayCount) {
//       result.push("-");
//       continue;
//     }
//     let sum = 0;
//     for (let j = 0; j < dayCount; j++) {
//       sum += +data[i - j][1];
//     }
//     result.push((sum / dayCount).toFixed(2));
//   }
//   return result;
// }
const dates = [
  "2016-03-29",
  "2016-03-30",
  "2016-03-31",
  "2016-04-01",
  "2016-04-04",
  "2016-04-05",
  "2016-04-06",
  "2016-04-07",
  "2016-04-08",
  "2016-04-11",
  "2016-04-12",
  "2016-04-13",
  "2016-04-14",
  "2016-04-15",
  "2016-04-18",
  "2016-04-19",
  "2016-04-20",
  "2016-04-21",
  "2016-04-22",
  "2016-04-25",
  "2016-04-26",
  "2016-04-27",
  "2016-04-28",
  "2016-04-29",
  "2016-05-02",
  "2016-05-03",
  "2016-05-04",
  "2016-05-05",
  "2016-05-06",
  "2016-05-09",
  "2016-05-10",
  "2016-05-11",
  "2016-05-12",
  "2016-05-13",
  "2016-05-16",
  "2016-05-17",
  "2016-05-18",
  "2016-05-19",
  "2016-05-20",
  "2016-05-23",
  "2016-05-24",
  "2016-05-25",
  "2016-05-26",
  "2016-05-27",
  "2016-05-31",
  "2016-06-01",
  "2016-06-02",
  "2016-06-03",
  "2016-06-06",
  "2016-06-07",
  "2016-06-08",
  "2016-06-09",
  "2016-06-10",
  "2016-06-13",
  "2016-06-14",
  "2016-06-15",
  "2016-06-16",
  "2016-06-17",
  "2016-06-20",
  "2016-06-21",
  "2016-06-22",
];

const data = [
  [17512.58, 17633.11, 17434.27, 17642.81, 86160000],
  [17652.36, 17716.66, 17652.36, 17790.11, 79330000],
  [17716.05, 17685.09, 17669.72, 17755.7, 102600000],
  [17661.74, 17792.75, 17568.02, 17811.48, 104890000],
  [17799.39, 17737, 17710.67, 17806.38, 85230000],
  [17718.03, 17603.32, 17579.56, 17718.03, 115230000],
  [17605.45, 17716.05, 17542.54, 17723.55, 99410000],
  [17687.28, 17541.96, 17484.23, 17687.28, 90120000],
  [17555.39, 17576.96, 17528.16, 17694.51, 79990000],
  [17586.48, 17556.41, 17555.9, 17731.63, 107100000],
  [17571.34, 17721.25, 17553.57, 17744.43, 81020000],
  [17741.66, 17908.28, 17741.66, 17918.35, 91710000],
  [17912.25, 17926.43, 17885.44, 17962.14, 84510000],
  [17925.95, 17897.46, 17867.41, 17937.65, 118160000],
  [17890.2, 18004.16, 17848.22, 18009.53, 89390000],
  [18012.1, 18053.6, 17984.43, 18103.46, 89820000],
  [18059.49, 18096.27, 18031.21, 18167.63, 100210000],
  [18092.84, 17982.52, 17963.89, 18107.29, 102720000],
  [17985.05, 18003.75, 17909.89, 18026.85, 134120000],
  [17990.94, 17977.24, 17855.55, 17990.94, 83770000],
  [17987.38, 17990.32, 17934.17, 18043.77, 92570000],
  [17996.14, 18041.55, 17920.26, 18084.66, 109090000],
  [18023.88, 17830.76, 17796.55, 18035.73, 100920000],
  [17813.09, 17773.64, 17651.98, 17814.83, 136670000],
  [17783.78, 17891.16, 17773.71, 17912.35, 80100000],
  [17870.75, 17750.91, 17670.88, 17870.75, 97060000],
  [17735.02, 17651.26, 17609.01, 17738.06, 95020000],
  [17664.48, 17660.71, 17615.82, 17736.11, 81530000],
  [17650.3, 17740.63, 17580.38, 17744.54, 80020000],
  [17743.85, 17705.91, 17668.38, 17783.16, 85590000],
  [17726.66, 17928.35, 17726.66, 17934.61, 75790000],
  [17919.03, 17711.12, 17711.05, 17919.03, 87390000],
  [17711.12, 17720.5, 17625.38, 17798.19, 88560000],
  [17711.12, 17535.32, 17512.48, 17734.74, 86640000],
  [17531.76, 17710.71, 17531.76, 17755.8, 88440000],
  [17701.46, 17529.98, 17469.92, 17701.46, 103260000],
  [17501.28, 17526.62, 17418.21, 17636.22, 79120000],
  [17514.16, 17435.4, 17331.07, 17514.16, 95530000],
  [17437.32, 17500.94, 17437.32, 17571.75, 111990000],
  [17507.04, 17492.93, 17480.05, 17550.7, 87790000],
  [17525.19, 17706.05, 17525.19, 17742.59, 86480000],
  [17735.09, 17851.51, 17735.09, 17891.71, 79180000],
  [17859.52, 17828.29, 17803.82, 17888.66, 68940000],
  [17826.85, 17873.22, 17824.73, 17873.22, 73190000],
  [17891.5, 17787.2, 17724.03, 17899.24, 147390000],
  [17754.55, 17789.67, 17664.79, 17809.18, 78530000],
  [17789.05, 17838.56, 17703.55, 17838.56, 75560000],
  [17799.8, 17807.06, 17689.68, 17833.17, 82270000],
  [17825.69, 17920.33, 17822.81, 17949.68, 71870000],
  [17936.22, 17938.28, 17936.22, 18003.23, 78750000],
  [17931.91, 18005.05, 17931.91, 18016, 71260000],
  [17969.98, 17985.19, 17915.88, 18005.22, 69690000],
  [17938.82, 17865.34, 17812.34, 17938.82, 90540000],
  [17830.5, 17732.48, 17731.35, 17893.28, 101690000],
  [17710.77, 17674.82, 17595.79, 17733.92, 93740000],
  [17703.65, 17640.17, 17629.01, 17762.96, 94130000],
  [17602.23, 17733.1, 17471.29, 17754.91, 91950000],
  [17733.44, 17675.16, 17602.78, 17733.44, 248680000],
  [17736.87, 17804.87, 17736.87, 17946.36, 99380000],
  [17827.33, 17829.73, 17799.8, 17877.84, 85130000],
  [17832.67, 17780.83, 17770.36, 17920.16, 89440000],
];
const volumes = [
  86160000, 79330000, 102600000, 104890000, 85230000, 115230000, 99410000,
  90120000, 79990000, 107100000, 81020000, 91710000, 84510000, 118160000,
  89390000, 89820000, 100210000, 102720000, 134120000, 83770000, 92570000,
  109090000, 100920000, 136670000, 80100000, 97060000, 95020000, 81530000,
  80020000, 85590000, 75790000, 87390000, 88560000, 86640000, 88440000,
  103260000, 79120000, 95530000, 111990000, 87790000, 86480000, 79180000,
  68940000, 73190000, 147390000, 78530000, 75560000, 82270000, 71870000,
  78750000, 71260000, 69690000, 90540000, 101690000, 93740000, 94130000,
  91950000, 248680000, 99380000, 85130000, 89440000,
];
// const dataMA5 = calculateMA(5, data);
// const dataMA10 = calculateMA(10, data);
// const dataMA20 = calculateMA(20, data);

const options = {
  animation: false,
  color: colorList,
  title: {
    text: "Price Chart",
    textStyle: {
      color: "#FFF8C4",
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: [0, 1],
      },
    ],
  },
  dataZoom: [
    {
      type: "slider",
      xAxisIndex: [0, 1],
      realtime: false,
      start: 20,
      end: 70,
      top: 65,
      height: 20,
      handleIcon:
        "path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
      handleSize: "120%",
    },
    {
      type: "inside",
      xAxisIndex: [0, 1],
      start: 40,
      end: 70,
      top: 30,
      height: 20,
    },
  ],
  xAxis: [
    {
      type: "category",
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#777" } },
      axisLabel: {
        formatter(value) {
          return echarts.format.formatTime("MM-dd", value);
        },
      },
      min: "dataMin",
      max: "dataMax",
      axisPointer: {
        show: true,
      },
    },
    {
      type: "category",
      gridIndex: 1,
      data: dates,
      scale: true,
      boundaryGap: false,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#777" } },
      min: "dataMin",
      max: "dataMax",
      // slider
      axisPointer: {
        type: "shadow",
        label: { show: false },
        triggerTooltip: true,
        handle: {
          show: true,
          margin: 30,
          color: "#B80C00",
        },
      },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitNumber: 2,
      axisLine: { lineStyle: { color: "#777" } },
      splitLine: { show: true },
      axisTick: { show: false },
      axisLabel: {
        inside: true,
        formatter: "{value}\n",
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  grid: [
    {
      left: 20,
      right: 20,
      top: 110,
      height: 120,
    },
    {
      left: 20,
      right: 20,
      height: 40,
      top: 260,
    },
  ],
  graphic: [
    {
      type: "group",
      left: "center",
      top: 70,
      width: 300,
      bounding: "raw",
      children: [
        {
          id: "MA5",
          type: "text",
          style: { fill: colorList[1], font: labelFont },
          left: 0,
        },
        {
          id: "MA10",
          type: "text",
          style: { fill: colorList[2], font: labelFont },
          left: "center",
        },
        {
          id: "MA20",
          type: "text",
          style: { fill: colorList[3], font: labelFont },
          right: 0,
        },
      ],
    },
  ],
  series: [
    {
      name: "Volume",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: "#7fbe9e",
      },
      emphasis: {
        itemStyle: {
          color: "#140",
        },
      },
      data: volumes,
    },
    {
      type: "candlestick",
      name: "日K",
      data,
      itemStyle: {
        color: "#ef232a",
        color0: "#14b143",
        borderColor: "#ef232a",
        borderColor0: "#14b143",
      },
      emphasis: {
        itemStyle: {
          color: "black",
          color0: "#444",
          borderColor: "black",
          borderColor0: "#444",
        },
      },
    },
  ],
};

export default function App() {
  return (
    <div>
      <ReactEChartsCore
        style={{ height: 500 }}
        opts={{ height: 500 }}
        echarts={echarts}
        option={options}
        notMerge
        lazyUpdate
      />
    </div>
  );
}
