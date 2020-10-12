import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from '../utils/seedColors'
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from '../utils/colorHelpers';
import '../App.css';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      palettes: seedColors
    }

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

// ...seedColors is passing entire array of palettes as props
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    });
  }

  render() {
    
    // passing routeProps gives PaletteList access to history object 
   return (
     <Switch>
      <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />
      <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} />
      <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
          colorId={routeProps.match.params.colorId} />} 
      />
    </Switch>
   );
  }
}

export default App;
