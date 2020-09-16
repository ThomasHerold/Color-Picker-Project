import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from '../utils/seedColors'
import { generatePalette } from '../utils/colorHelpers';
import '../App.css';

class App extends Component {

// ...seedColors is passing entire array of palettes as props
  render() {
   return (
    <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
   );
  }
}

export default App;
