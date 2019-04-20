import React, { Component } from 'react';
import APILoader from '../utils/mapLoader';

let mapWrapper = null;

class BaseMap extends Component {
  constructor(props) {
    super(props);

    const map = new APILoader();
    map.getMainPromise();
    setTimeout(() => {
      const mapView = new window.AMap.Map(mapWrapper);
      console.log(mapView);
    }, 2000);
  }

  render() {
    return (
      <div ref={((div) => { mapWrapper = div; })} style={{ width: '100%', height: '100%' }}>111</div>
    );
  }
}

export default BaseMap;
