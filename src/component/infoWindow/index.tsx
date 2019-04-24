import * as React from 'react';
import "../utils/amap";

interface IInfoWindow {
  _map_: AMap.Map,
  option: IOptions,
  openPosition:Array<number>
}

/**
 * props数据option数据类型定义
 */
interface IOptions {
  content:string|HTMLElement,
  position?: AMap.LngLat,
  offset?:AMap.Pixel,
  closeWhenClickMap?: boolean
}

class InfoWindow extends React.Component<IInfoWindow> {
  map: AMap.Map
  constructor(props:IInfoWindow) {
    super(props);
    this.map = props._map_;
    this.createInfoWidow();
  }

  componentWillReceiveProps(nextProps:IInfoWindow) {
   this.createInfoWidow();
  }

  /**
   * 在地图上创建信息窗体
   */
  createInfoWidow=()=> {
    const {option , openPosition}=this.props;
    const infoWindow = new AMap.InfoWindow(option);
    let pos=this.map.getCenter();
    if(openPosition) pos=new AMap.LngLat(openPosition[0],openPosition[1]);
    infoWindow.open(this.map, pos);
  }

  render() {
    return (
      <div />
    );
  }
}

export default InfoWindow;
