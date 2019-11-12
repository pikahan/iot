import React from 'react';
import Slider from '../../components/Slider'
import Panel from '../../components/Panel'

export default class Helm extends React.Component{

  render() {
    return (
      <Panel title="舵机">
        <Slider {...this.props} />
      </Panel>
    )
  }
}