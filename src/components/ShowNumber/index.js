import React from 'react';
import { Statistic, Icon } from 'antd';
import Panel from '../../components/Panel'

export default class ShowNumber extends React.Component {
  static defaultProps = {
    value: 0,
    title: 'temp',
    iconType: 'heart'
  }

  render() {
    return (
      <Panel title={this.props.title}>
        <Statistic value={this.props.value} prefix={<Icon type={this.props.iconType} />} />
      </Panel>
    )
  }
}

