import React from 'react';
import ColorView from '../ColorView';
import Helm from '../Helm';
import { Button } from 'antd';
let timer = setTimeout(()=>{}, 0);
export default class Sending extends React.Component{
  static defaultProps = {
    onHandleSending: () => {
      console.log('will')
    }
  }

  state = {
    rgb: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    motor: 0,
  }
  sendingData = () => {
    clearTimeout(timer);
    timer = setTimeout(this.sending, 100);
  }

  sending = () => {
    const color = this.state.rgb;
    const colorArr = [color.r*1, color.g*1, color.b*1];
    this.props.onHandleSending({...this.state, rgb: colorArr});
  }

  handleSendingColorData = color => {
    this.setState({rgb: color});
    this.sendingData()
  }

  handleSendingMotorData = value => {
    this.setState({
      motor: value
    })
    this.sendingData()
  }

  render() {
    const {rgb, motor} = this.state;
    return (
      <div>
        <ColorView clickable={true} color={rgb} onSendingColorData={this.handleSendingColorData} />
        <Helm disabled={false} value={motor} onSendingMotorData={this.handleSendingMotorData} />
        <Button type="primary" onClick={this.sendingData}>发送</Button>
      </div>
    )
  }
}