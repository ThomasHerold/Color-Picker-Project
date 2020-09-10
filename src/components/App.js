import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from '../utils/seedColors'

class App extends Component {

// ...seedColors is passing entire array of palettes as props
  render() {
   return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
   );
  }
}

export default App;
