import * as React from 'react';

/**
 * props数据类型定义
 */
interface IMarkerProps {
  _map_: AMap.Map,
  option: IOptions,
  fitView: boolean,
  moving: boolean,
}

/**
 * state数据类型定义
 */
interface IMarkerState {
  moving: boolean,
  fitView: boolean,
}

/**
 * props数据option数据类型定义
 */
interface IOptions {
  position?: Array<number>,
  icon?: string,
  offset?: Array<number>,
  angle?: number,
}

/**
 * 点标记数据类型定义
 */
interface IMarkerOptions {
  position?: AMap.LngLat,
  icon?: string,
  offset?: AMap.Pixel,
  angle?: number,
}

class Marker extends React.Component<IMarkerProps, IMarkerState> {
  map: AMap.Map
  marker: AMap.Marker
  markerData: Array<Array<number>>

  constructor(props:IMarkerProps) {
    super(props);
    this.map = props._map_;
    const { option, fitView, moving } = props;
    this.state = {
      moving: moving === undefined ? false : moving,
      fitView: fitView === undefined ? true : fitView,
    }
    if (option !== undefined) {
      this.createMarker(option);
    }
  }

  componentWillReceiveProps(nextProps:IMarkerProps) {
    const { option } = nextProps;
    if (option === undefined) {
      return;
    }
    if (this.marker === null) {
      this.createMarker(option);
    } else {
      this.markerStateType(option);
    }
  }

  /**
   * 判断点标记是否达到可移动或跳点的条件
   * this.markerData数据长度等于2满足条件
   * @param option 
   */
  markerStateType(option:IOptions) {
    const { position } = option;
    this.markerData.push(position);
    if (this.markerData.length === 2) {
      const { moving } = this.state;
      if (moving) {
        this.markerMoving();
      } else {
        this.markerJump();
      }
    }
  }

  /**
   * 点标记跳点
   * @param option 
   */
  markerJump() {
    const position = this.markerData[1];
    this.marker.setPosition(new AMap.LngLat(position[0], position[1]));
    this.markerData.splice(0, 1);
    if (this.markerData.length >= 2) {
      this.markerJump();
    }
  }

  /**
   * 点标记平滑移动
   * @param option 
   */
  markerMoving() {
    const position = this.markerData[1];
    this.marker.moveTo(new AMap.LngLat(position[0], position[1]), 80, () => {
      this.markerData.splice(0, 1);
      if (this.markerData.length >= 2) {
        this.markerMoving();
      }
    });
  }
  
  /**
   * 创建点标记
   * @param option 
   */
  createMarker(option:IOptions) {
    const { fitView } = this.state;
    const { position, icon, offset, angle } = option;
    const config:IMarkerOptions = {};
    if (position === undefined) { config.position = new AMap.LngLat(position[0], position[1]) };
    if (icon === undefined) { config.icon = icon };
    if (offset === undefined) { config.offset = new AMap.Pixel(offset[0], offset[1]) };
    if (angle === undefined) { config.angle = angle };
    this.marker = new AMap.Marker(config);
    this.marker.setMap(this.map);
    if (fitView) {
      this.map.setCenter(new AMap.LngLat(position[0], position[1]));
    }
    this.markerData.push(position);
  }

  

  render() {
    return (
      <div />
    );
  }
}

export default Marker;
