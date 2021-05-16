import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AssetType } from '../../types/types';

interface HealthScoreBarChartProps {
  chartData: AssetType[];
}

export default function HealthScoreBarChart({ chartData }: HealthScoreBarChartProps) {
  const healthscoreBarChartData = chartData.map(asset => {
    return {
      name: asset.name,
      y: asset.healthscore,
    }
  });

  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Assets Healthscore'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        title: {
            text: 'Healthscore'
        }
    },
    legend: {
      enabled: false
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
      name: 'Healthscore',
      colorByPoint: true,
      data: healthscoreBarChartData,
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}