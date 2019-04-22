import * as React from 'react';
import { PositionProperty } from "csstype";
import APILoader from '../utils/mapLoader';

const Children = React.Children;

interface IBaseMap {
  key: string,
  config?: object,
  option?: object,
}

interface IBaseMapState{
  mapLoaded:boolean
}

const styles = {
  wrapperStyle: {
    width: '100%',
    height: '100%',
    position: 'relative' as PositionProperty,
  },
  mapArea: {
    width: '100%',
    height: '100%',
  },
};

class BaseMap extends React.Component<IBaseMap, IBaseMapState> {
  mapWrapper:object
  map:object

  constructor(props:IBaseMap) {
    super(props);
    const { config, option } = props;
    const newConfig = Object.assign({}, config);
    new APILoader(newConfig).getMainPromise().then(() => {
      const mapView = new (window as any).AMap.Map(this.mapWrapper, option);
      mapView.on('complete', () => {
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
    return Children.map(this.props.children, (child) => {
      if (child) {
        return React.cloneElement(child as React.ReactElement, {
          __map__: this.map
        })
      }
      return child
    })
  }

  render() {
    const { mapLoaded } = this.state;
    return (
      <div style={styles.wrapperStyle}>
        <div ref={((div) => { this.mapWrapper = div; })} style={styles.mapArea} />
        <div>{ mapLoaded ? this.renderChildren() : null }</div>
      </div>
    );
  }
}

export default BaseMap;
