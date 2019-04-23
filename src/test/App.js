import React, { Component } from 'react';
import { Map, Maker } from '../component/index';

export default class App extends Component {
  render() {
    return (
        <div>
          <span>Hello React!</span>
          <div style={{ width: '100%', height: '800px' }}>
            <Map key="59ba5e8427f215f33f359b196119a1e2">
              <Maker />
            </Map>
          </div>
        </div>
    );
  }
}