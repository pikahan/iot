import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { serverIp } from '../../util/appConfig'
import Sending from '../Sending';
import DataPresentation from '../DataPresentation';
import { initialData } from '../../util/echartConfig';
import './style.css';

const { Header, Content, Sider } = Layout;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialChartData: [],
      collapsed: false,
      rgb: [120, 120, 120],
      motor: 0,
      heart_beat: 0,
      sensor_number: 0,
      device_id: 0,
      inf: 0,
      ws: null,
      id: '0'
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.setState({
      initialChartData: initialData
    })

    this.connectWithWebSocket();
  }

  dealData = data => {
    const { temp, hum, timestamp, ...otherData  } = data;
    this.dealWithHumAndTemp(hum, temp, timestamp);
    // console.log(otherData)
    this.setState({
      ...otherData
    })
  }

  dealWithHumAndTemp = (hum, temp, timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const min = date.getMinutes();
    const second = date.getSeconds();
    const dateStr = `${hours}:${min}:${second}`;
    this.updateData({
      temperature: {
        date: dateStr,
        value: temp
      },
      humidity: {
        date: dateStr,
        value: hum
      }
    })
  }

  connectWithWebSocket = () => {
    const ws = new WebSocket(`ws://192.168.123.140:8888`)
    this.setState({
      ws
    })
    ws.onopen = function(evt) {
      console.log("Connection open ...");
      // ws.send("Hello WebSockets!");
    };

    ws.onmessage = evt => {
      console.log(evt.data);
      try {
        const data = JSON.parse(evt.data);
        this.dealData(data);
      } catch (e) {
        console.error(e);
        ws.close();
      }
    };

    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  updateData = newData => {
    const initialData = this.state.initialChartData;
    initialData.forEach((data) => {

      const option = data.option;
      const title = data.title;
      // console.log(newData[title])
      const xAxis = option.xAxis.data;
      const series = option.series[0].data;
      if (xAxis.length > 7) {
        xAxis.shift();
        series.shift();
        xAxis.push("" + newData[title].date);
        series.push(newData[title].value);
      } else {
        xAxis.push("" + newData[title].date);
        series.push(newData[title].value);
      }
    })


    this.setState(state => ({
        initialChartData: state.initialChartData
      }))
  }
  handleSending = data => {
    console.log(data)
    this.state.ws.send(JSON.stringify({id: this.state.id,...data}));
  }


  render() {
    const { initialChartData, rgb, motor, heart_beat, device_id, sensor_number, inf } = this.state
    return (
      <Layout>
        <Router>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="user" />
                  <span>数据显示</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/send">
                  <Icon type="to-top" />
                  <span>数据发送</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route path="/" exact render={() => <DataPresentation initialData={initialChartData} rgb={rgb} motor={motor} heart_beat={heart_beat} device_id={device_id} inf={inf}/>} />
              <Route path="/send" render={() => <Sending onHandleSending={this.handleSending} />} />
            </Content>
          </Layout>
        </Router>
      </Layout>
    )
  }
}