import * as React from 'react';

/**
 * props数据类型定义
 */
interface IMarkerProps {
  _map_: AMap.Map,
  option: AMap.MarkerOptions,
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
 * 存储点标记数据类型
 */
interface IMarkerData {
  position: AMap.LngLat,
}

class Marker extends React.Component<IMarkerProps, IMarkerState> {
  map: AMap.Map = null;

  marker: AMap.Marker = null;

  markerData:Array<IMarkerData> = [];

  constructor(props:IMarkerProps) {
    super(props);
    this.map = props._map_;
    const { option, fitView, moving } = props;
    this.state = {
      moving: moving === undefined ? true : moving,
      fitView: fitView === undefined ? true : fitView,
    };

    if (!this.isValidation(option)) {
      this.createMarker(option);
    }
  }

  componentWillReceiveProps(nextProps:IMarkerProps) {
    const { option } = nextProps;
    if (this.isValidation(option)) {
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
  markerStateType(option:AMap.MarkerOptions) {
    const { position } = option;
    this.markerData.push({ position });
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
    const data = this.markerData[1];
    this.marker.setPosition(data.position);
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
    const data = this.markerData[1];
    this.marker.moveTo(data.position, 80, (k:any) => k);
    this.marker.on('moveend', () => {
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
  createMarker(option:AMap.MarkerOptions) {
    const { fitView } = this.state;
    const { position } = option;
    const config = { position };
    this.marker = new AMap.Marker(option);
    this.marker.setMap(this.map);
    if (fitView) {
      this.map.setCenter(option.position);
    }
    this.markerData.push(config);
  }

  /**
   * 判断数据是否为null或者undefined
   */
  isValidation(option:AMap.MarkerOptions) {
    return option === null || option === undefined;
  }

  render():null {
    return null;
  }
}

export default Marker;
