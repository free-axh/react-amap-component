import * as React from 'react';

interface ILine {
  _map_: AMap.Map,
  option:{
    path:Array<number>,
    [index: string]: any
  },
  mapZoom?:number,
  mapCenter?:Array<number>
}

class Line extends React.Component<ILine, { [index: string]: any }> {
  map: AMap.Map = null;

  constructor(props:ILine) {
    super(props);

    this.map = props._map_;
    this.state = {
      lineOption: {
        path: [],
        strokeColor: '#3366ff', // 线颜色
        strokeOpacity: 0.9, // 线透明度
        strokeWeight: 6, // 线宽
        strokeStyle: 'solid', // 线样式
        showDir: true,
      },
    };
  }

  componentDidMount() {
    this.refreshState(this.props);
  }

  componentWillReceiveProps(nextProps:object) {
    this.refreshState(nextProps);
  }

  /**
   * 更新state
   */
  refreshState=(target:{ [index: string]: any }) => {
    const { option } = target;
    if (typeof option === 'object') {
      const { lineOption } = this.state;
      this.setState({
        lineOption: {
          ...lineOption, ...option,
        },
      }, () => {
        this.createLine();
      });
    }
  }

  /**
   * 在地图上创建线段
   */
  createLine= () => {
    const { lineOption } = this.state;
    const { mapZoom, mapCenter } = this.props;
    const polyline = new AMap.Polyline({
      map: this.map,
      ...lineOption,
    });
    console.log(polyline);
    if (mapZoom) this.map.setZoom(mapZoom);
    if (mapCenter) this.map.setCenter(new AMap.LngLat(mapCenter[0], mapCenter[1]));
  }

  render() {
    return (
      <div />
    );
  }
}

export default Line;
