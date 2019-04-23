import React, { Component } from 'react';
import { Map, Maker,Line,InfoWindow } from '../component/index';

export default class App extends Component {
  render() {
    const option={// 绘制线段所需参数
      path:[
        ["106.51185", "29.53366"],
        ["106.512395", "29.533838"],
        ["106.512638", "29.533763"],
        ["106.512627", "29.533925"]
       ],
      strokeColor:'red'
    }
    return (
        <div>
          <span>Hello React!</span>
          <div style={{ width: '100%', height: '800px' }}>
            <Map key="59ba5e8427f215f33f359b196119a1e2">
              <Maker />
              <Line
                option={option}
                mapZoom='18'
                mapCenter={[106.512395, 29.533838]}
              />
              <InfoWindow />
            </Map>
          </div>
        </div>
    );
  }
}