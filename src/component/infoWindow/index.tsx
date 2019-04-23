import * as React from 'react';
import { array } from '../../../node_modules/@types/prop-types';

interface IInfoWindow {
  _map_: AMap.Map,
}

class InfoWindow extends React.Component<IInfoWindow, { [index: string]: any }> {
  map: AMap.Map
  constructor(props:IInfoWindow) {
    super(props);

    this.map = props._map_;
    this.createInfoWidow();
  }

  /**
   * 在地图上创建线段
   */
  createInfoWidow=()=> {
    const infoWindow = new AMap.InfoWindow({
      content: '<div>我是一个信息窗体</div>',
      offset: new AMap.Pixel(-20, -13),
      closeWhenClickMap: true
    });
    infoWindow.open(this.map, new AMap.LngLat(106.512395, 29.533838));
  }

  render() {
    return (
      <div />
    );
  }
}

export default InfoWindow;
