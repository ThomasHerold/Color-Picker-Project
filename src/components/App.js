import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from '../utils/seedColors'
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from '../utils/colorHelpers';
import '../App.css';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette'

class App extends Component {

// ...seedColors is passing entire array of palettes as props
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }

  render() {
    
    // passing routeProps gives PaletteList access to history object 
   return (
     <Switch>
      <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} />
      <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
          colorId={routeProps.match.params.colorId} />} 
      />
    </Switch>
   );
  }
}

export default App;
