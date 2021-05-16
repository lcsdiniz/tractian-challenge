import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { AssetType } from '../../types/types';

interface ModelPieChartProps {
  chartData: AssetType[];
}

export default function ModelPieChart({ chartData }: ModelPieChartProps) {
  const modelPieChartData = structureData(chartData);

  function structureData(rawData: AssetType[]) {
    const assetsQuantity = rawData.length;
    const fansQuantity = rawData.filter(asset => asset.model === 'fan').length;
    const motorsQuantity = rawData.filter(asset => asset.model === 'motor').length;
    const modelPieChartData = [{ name: 'Fans', y: (fansQuantity/assetsQuantity)*100 }, { name: 'Motors', y: (motorsQuantity/assetsQuantity)*100 }];

    return modelPieChartData;
  }

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Assets by Model'
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
      name: 'Models',
      colorByPoint: true,
      data: modelPieChartData,
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}