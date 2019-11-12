import { Radio } from 'antd';
import React from 'react';

export default class MyRadio extends React.Component {
  static defaultProps = {
    value: '0'
  }

  render() {
    return (
      <div>
        <Radio.Group defaultValue="0" size="large" value={""+this.props.value}>
          <Radio.Button value="1">检测到</Radio.Button>
          <Radio.Button value="0">未检测到</Radio.Button>
        </Radio.Group>
      </div>
    )
  }
}