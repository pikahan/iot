export const initialData = [
  {
    title: 'temperature',
    option: {
      title: {
        text: '温度'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [],
        type: 'line'
      }]
    }
  },
  {
    title: 'humidity',
    option: {
      title: {
        text: '湿度'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [],
        type: 'line'
      }]
    }
  }
]