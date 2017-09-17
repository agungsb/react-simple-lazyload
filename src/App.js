import React, { Component } from 'react';
import { ReactSimpleLazyLoad } from './lib';
import './App.css';

class App extends Component {
  render() {
    let images = [];
    for (let i = 0; i < 20; i++) {
      images.push({
        full: 'https://res.cloudinary.com/kumpar/image/upload/v1504701737/lcgoglclzembklveeyj5',
        tiny: 'https://res.cloudinary.com/kumpar/image/upload/q_1/v1504701737/lcgoglclzembklveeyj5'
      })
    }
    return (
      <div className="App">
        {images.map((image, key) =>
          <div style={{ height: 200, width: 200 }} key={key}>
            <ReactSimpleLazyLoad full={image.full} tiny={image.tiny} style={{ width: '100%' }} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
