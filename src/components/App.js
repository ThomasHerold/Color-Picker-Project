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
    
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

    this.state = {
      palettes: savedPalettes || seedColors
    }

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }

// ...seedColors is passing entire array of palettes as props
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }

  deletePalette(id) {
    this.setState(
      state => ({ palettes: state.palettes.filter(palette => palette.id !==  id) }),
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    }, 
    this.syncLocalStorage
    );
  }

  render() {
    
    // passing routeProps gives PaletteList access to history object 
   return (
     <Switch>
      <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />} />
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
