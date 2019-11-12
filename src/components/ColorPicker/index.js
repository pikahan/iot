import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class ColorPicker extends React.Component {
  static defaultProps = {
    clickable: false,
    color: {
      r: '120',
      g: '120',
      b: '190',
      a: '1',
    },
    onSendingColorData: () => {
      // console.log('will send color data')
    }
  }


  state = {
    displayColorPicker: false,
    color: this.props.color,
  };

  handleClick = () => {
    if (!this.props.clickable) {
      return;
    }
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    if (!this.props.clickable) {
      return;
    }
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    if (!this.props.clickable) {
      return;
    }
    this.setState({ color: color.rgb });
    this.props.onSendingColorData(this.state.color);
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.props.color.r }, ${ this.props.color.g }, ${ this.props.color.b }, ${ this.props.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    console.log(this.props.color)

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.props.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}
