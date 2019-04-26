import * as React from 'react';

/**
 * props数据类型定义
 */
interface IMarkerProps {
  _map_: AMap.Map,
  options: Array<IOptions>,
  fitView?: boolean,
  moving?: boolean,
  clearMarker?: Array<string> | boolean
}

/**
 * state数据类型定义
 */
interface IMarkerState {
  moving: boolean,
}

interface IOptions {
  key: string,
  option: AMap.MarkerOptions,
}

class Markers extends React.Component<IMarkerProps, IMarkerState> {
  map: AMap.Map = null;

  markers: Map<string, AMap.Marker> = new Map();

  markersData: Map<string, Array<AMap.MarkerOptions>> = new Map();

  constructor(props:IMarkerProps) {
    super(props);
    this.map = props._map_;
    const { options, moving } = props;
    this.state = {
      moving: moving === undefined ? true : moving,
    };

    if (!this.isValidation(options)) {
      this.optionsDecomposition(options);
    }
  }

  componentWillReceiveProps(nextProps:IMarkerProps) {
    const { options } = nextProps;
    if (this.isValidation(options)) {
      return;
    }

    this.optionsDecomposition(options);
  }

  /**
   * 判断点标记是否达到可移动或跳点的条件
   * this.markerData数据长度等于2满足条件
   * @param option
   */
  markerStateType(key:string) {
    const options = this.markersData.get(key);

    if (options.length === 2) {
      const { moving } = this.state;
      if (moving) {
        this.markerMoving(key);
      } else {
        this.markerJump(key);
      }
    }
  }

  /**
   * 点标记跳点
   * @param option
   */
  markerJump(key:string) {
    const options = this.markersData.get(key);
    this.markersData.delete(key);
    const info = options[1];
    const marker = this.markers.get(key);
    marker.setPosition(info.position);
    options.splice(0, 1);
    this.markersData.set(key, options);
    if (options.length >= 2) {
      this.markerJump(key);
    }
  }

  /**
   * 点标记平滑移动
   * @param option
   */
  markerMoving(key:string) {
    const options = this.markersData.get(key);
    this.markersData.delete(key);
    const info = options[1];
    const marker = this.markers.get(key);

    marker.moveTo(info.position, 80, (k:any) => k);
    marker.on('moveend', () => {
      this.markersData.set(key, options);
      if (options.length >= 2) {
        this.markerMoving(key);
      }
    });
  }

  /**
   * 分析数据，查看对应key是否已创建marker
   * 若未创建进行创建，已创建就进行跳点或平滑移动
   * @param options
   */
  optionsDecomposition(options:Array<IOptions>) {
    options.map((info) => {
      const { key, option } = info;
      if (!this.markersData.has(key)) {
        this.markersData.set(key, [option]);
      } else {
        const data = this.markersData.get(key);
        data.push(option);
        this.markersData.delete(key);
        this.markersData.set(key, data);
      }

      if (!this.markers.has(key)) {
        const marker = new AMap.Marker(option);
        marker.setMap(this.map);
        this.markers.set(key, marker);
      } else {
        this.markerStateType(key);
      }
      return null;
    });
  }

  /**
   * 判断数据是否为null或者undefined
   */
  isValidation(options:Array<IOptions>) {
    return options === null || options === undefined;
  }

  render():null {
    return null;
  }
}

export default Markers;
