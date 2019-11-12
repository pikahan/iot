import React from 'react';
import './style.css';

export default class ColorView extends React.Component {
  static defaultProps = {
    title: 'title'
  }
  render() {
    const { title } = this.props;

    return (
      <div className="panel-wrapper">
        <p className="panel-title">{ title }</p>
        {this.props.children}
      </div>
    )
  }
}