import React from 'react';
import DataChart from '../../components/DataChart'
import ColorView from '../ColorView';
import Helm from '../Helm'
import ShowNumber from '../../components/ShowNumber'
import Inf from '../Inf'

export default class DataPresentation extends React.Component{

  render() {
    const { initialData, sensor_number, inf, device_id, heart_beat, rgb, motor } = this.props

    const formatRgbData = {
      r: "" + rgb[0],
      g:  "" + rgb[1],
      b: "" + rgb[2],
      a: '1'
    }

    return (
      <div>
        { initialData.length > 0 &&
        initialData.map((data, index) => <DataChart key={index} option={data.option} />)
        }
        <ColorView color={formatRgbData}/>
        <Helm value={motor}/>
        <ShowNumber title="心跳信号" iconType="heart" value={heart_beat}/>
        <ShowNumber title="设备编号" iconType="control" value={device_id}/>
        {/*<ShowNumber title="设备编号" iconType="control" value={device_id}/>*/}
        {/*<ShowNumber title="红外信号" iconType="shake" value={inf}/>*/}
        <Inf value={inf}/>
      </div>
    )
  }
}