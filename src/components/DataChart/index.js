import React from 'react'
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

export default class DataChart extends React.Component {
  constructor(props) {
    super(props);
  }

  getOptions = () => {
    const ret = {
      animation: false
    };
    Object.assign(ret, JSON.parse(JSON.stringify(this.props.option)))
    return ret;
  }

  render() {
    return (
      <div>
        <ReactEcharts option={this.getOptions()} lazyUpdate={true}  notMerge={true}/>
      </div>
    )
  }
}

DataChart.propTypes = {
  option: PropTypes.shape({
    xAxis: PropTypes.object,
    yAxis: PropTypes.object,
    series: PropTypes.array
  })
}