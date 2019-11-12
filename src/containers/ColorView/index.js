import React from 'react';
import ColorPicker from '../../components/ColorPicker'
import Panel from '../../components/Panel'

export default class ColorView extends React.Component{

  render() {
    return (
      <Panel title="RGB">
        <ColorPicker {...this.props} />
      </Panel>
    )
  }
}