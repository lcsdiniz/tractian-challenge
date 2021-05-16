import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AssetType } from '../../types/types';

interface TotalUptimeBarChartProps {
  chartData: AssetType[];
}

export default function TotalUptimeBarChart({ chartData }: TotalUptimeBarChartProps) {
  const totalUptimeBarChartData = chartData.map(asset => {
    return {
      name: asset.name,
      y: Math.floor(asset.metrics.totalUptime*100)/100,
    }
  });

  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Assets Total Uptime'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total Uptime'
        }
    },
    legend: {
      enabled: false,
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    series: [{
      name: 'Total Uptime',
      colorByPoint: true,
      data: totalUptimeBarChartData,
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}