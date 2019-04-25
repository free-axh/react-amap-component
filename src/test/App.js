import React, { Component } from 'react';
import { Map, Maker } from '../component/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: null,
    };
  }

  mapFinish = () => {
    this.setState({
      option: {
        icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: new AMap.LngLat(116.406315, 39.908775),
        offset: new AMap.Pixel(-13, -30),
      },
    });

    setTimeout(() => {
      this.setState({
        option: {
          icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          position: new AMap.LngLat(116.466315, 39.908775),
          offset: new AMap.Pixel(-13, -30),
        },
      });
    }, 4000);
  }

  render() {
    const { option } = this.state;

    return (
      <div>
        <span>Hello React!</span>
        <div style={{ width: '100%', height: '800px' }}>
          <Map key="59ba5e8427f215f33f359b196119a1e2" amapFinish={this.mapFinish}>
            <Maker option={option} />
          </Map>
        </div>
      </div>
    );
  }
}
