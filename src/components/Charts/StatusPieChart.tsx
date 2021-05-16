import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AssetType } from '../../types/types';

interface StatusPieChartProps {
  chartData: AssetType[];
}

export default function StatusPieChart({ chartData }: StatusPieChartProps) {
  const statusPieChartData = structureData(chartData);

  function structureData(rawData: AssetType[]) {
    const assetsQuantity = rawData.length;
    const downTimeQuantity = rawData.filter(asset => asset.status === 'inDowntime').length;
    const operationQuantity = rawData.filter(asset => asset.status === 'inOperation').length;
    const alertQuantity = rawData.filter(asset => asset.status === 'inAlert').length;
    const statusPieChartData = [
      { name: 'In Operation', y: (downTimeQuantity/assetsQuantity) * 100 },
      { name: 'In Downtime', y: (operationQuantity/assetsQuantity) * 100 },
      { name: 'In Alert', y: (alertQuantity/assetsQuantity) * 100 },
    ];

    return statusPieChartData;
  }

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    colors: ['#4cabff', '#f44952', '#f9a54a'],
    title: {
      text: 'Assets by Status'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusPieChartData,
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}