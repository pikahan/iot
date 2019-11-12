import React from 'react';
import Radio from '../../components/Radio'
import Panel from '../../components/Panel'

export default class Inf extends React.Component{

  render() {
    return (
      <Panel title="红外信号">
        <Radio {...this.props} />
      </Panel>
    )
  }
}