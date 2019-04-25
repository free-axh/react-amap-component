import * as React from 'react';
// import { PositionProperty } from "csstype";
import APILoader from '../utils/mapLoader';
import './mapCore.less';

// const Children = React.Children;

interface IBaseMap {
  key: string,
  config?: object,
  option?: object,
  amapFinish?: Function
}

interface IBaseMapState{
  mapLoaded:boolean
}

class BaseMap extends React.Component<IBaseMap, IBaseMapState> {
  mapWrapper:HTMLDivElement = null;

  map:AMap.Map = null;

  constructor(props:IBaseMap) {
    super(props);
    const { config, option, amapFinish } = props;
    const newConfig = Object.assign({}, config);
    new APILoader(newConfig).getMainPromise().then(() => {
      this.map = new AMap.Map(this.mapWrapper, option);
      if (amapFinish) {
        amapFinish();
      }
      this.map.on('complete', () => {
        this.mapComplete();
      });
    });
    this.state = {
      mapLoaded: false,
    };
  }

  mapComplete() {
    this.setState({ mapLoaded: true });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        const newChild = child as React.ReactElement;
        return React.cloneElement(newChild, {
          _map_: this.map,
        });
      }
      return child;
    });
  }

  render() {
    const { mapLoaded } = this.state;
    return (
      <div className="map-wrapperStyle">
        <div ref={((div) => { this.mapWrapper = div; })} className="map-area" />
        <div>{ mapLoaded ? this.renderChildren() : null }</div>
      </div>
    );
  }
}

export default BaseMap;
