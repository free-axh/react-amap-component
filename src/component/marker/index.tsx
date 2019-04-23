import * as React from 'react';

interface IMarker {
  _map_: AMap.Map,
}

class Marker extends React.Component<IMarker> {
  map: AMap.Map

  constructor(props:IMarker) {
    super(props);
    this.map = props._map_;
    this.createMarker();
  }
  
  createMarker() {
    const marker = new AMap.Marker({
      icon: "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      position: new AMap.LngLat(116.406315, 39.908775),
      offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(this.map);
    this.map.setCenter(new AMap.LngLat(116.406315, 39.908775));
  }

  render() {
    return (
      <div />
    );
  }
}

export default Marker;
