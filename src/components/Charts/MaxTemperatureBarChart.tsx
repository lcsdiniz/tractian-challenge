import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AssetType } from '../../types/types';

interface MaxTemperatureBarChartProps {
  chartData: AssetType[];
}

export default function MaxTemperatureBarChart({ chartData }: MaxTemperatureBarChartProps) {
  const maxTemperatureBarChartData = chartData.map(asset => {
    const temperature = asset.specifications.maxTemp;
    let color = '';

    if (temperature <= 60) {
      color = '#4cabff';
    } else if (temperature <= 70) {
      color = '#f9a54a';
    } else {
      color = '#f44952';
    }

    return {
      name: asset.name,
      y: asset.specifications.maxTemp,
      color,
    }
  });

  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Assets Max Temperature'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        title: {
            text: 'Temperature'
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
      name: 'Max Temperature',
      colorByPoint: true,
      data: maxTemperatureBarChartData,
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}