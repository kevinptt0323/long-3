define(['react', 'react-dom', 'highcharts'], function(React, ReactDOM, ReactHighcharts) {
var config = 
{
  chart: {
    type: 'column'
  },
  title: {
    text: '各類運動消耗熱量表'
  },
  subtitle: {
    text: 'Source: <a href="http://www.hpa.gov.tw/BHPnet/Web/Service/FileCount.aspx?file=ThemeDocFile&TopicFile=201409251214042680&TopicFilename=%e5%90%84%e9%a1%9e%e9%81%8b%e5%8b%95%e6%b6%88%e8%80%97%e7%86%b1%e9%87%8f%e8%a1%a8.csv">各類運動消耗熱量表</a>'
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Calories per hour (kcals/hr)'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: 'Calories burnned per hour per kg: <b>{point.y:.1f} kcals</b>'
  },
  series: [{
    name: 'Kcal',
    data: [
      ['快走(6km/hr)', 5.5],
      ['慢跑', 8.2],
      ['快跑', 12.7],
      ['騎腳踏車(30km/hr)', 12.6],
      ['瑜珈', 3],
      ['國標舞', 5.3],
      ['飛盤', 3.2],
      ['排球', 3.6],
      ['保齡球', 3.6],
      ['乒乓球', 4.2],
      ['棒壘球', 4.7],
      ['高爾夫', 5],
      ['溜直排輪', 5.1],
      ['羽球', 5.1],
      ['長泳', 6.3],
      ['快泳', 10],
      ['籃球(半場)', 6.3],
      ['籃球(全場)', 8.3],
      ['有氧舞蹈', 6.8],
      ['網球', 6.6],
      ['足球', 7.7]
    ],
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: '#FFFFFF',
      align: 'right',
      format: '{point.y:.1f}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  }]
}

  ReactDOM.render(React.createElement(ReactHighcharts, { config: config }), document.getElementById('test'));
});
