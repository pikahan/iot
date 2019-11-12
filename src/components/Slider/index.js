import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export default class MySlider extends React.Component {
  static defaultProps = {
    disabled: true,
    value: 0,
    onSendingMotorData: () => {}
  }
  state = {
    inputValue: this.props.value,
  };



  onChange = value => {
    this.setState({
      inputValue: value,
    });
    this.props.onSendingMotorData(value)
  };

  render() {
    // const { inputValue } = this.state;
    const { disabled, value } = this.props;
    return (
      <Row>
        <Col span={12}>
          <Slider
            disabled={disabled}
            min={0}
            max={100}
            onChange={this.onChange}
            value={typeof value === 'number' ? value : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            disabled={disabled}
            min={0}
            max={100}
            style={{ marginLeft: 16 }}
            value={this.props.value}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}
