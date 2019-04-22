import React, { Component } from 'react';
import { Map } from '../component/index';

export default class App extends Component {
  render() {
    return (
        <div>
          <span>Hello React!</span>
          <div style={{ width: '100%', height: '800px' }}>
            <Map />
          </div>
        </div>
    );
  }
}