import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from '../utils/seedColors'
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from '../utils/colorHelpers';
import '../App.css';
import PaletteList from './PaletteList';

class App extends Component {

// ...seedColors is passing entire array of palettes as props
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }

  render() {
    
   return (
     <Switch>
      <Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
      <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
    </Switch>
   );
  }
}

export default App;
