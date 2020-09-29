import React, { Component } from 'react';
import NavBar from './NavBar';
import Colorbox from './Colorbox';
import PaletteFooter from './PaletteFooter'; 

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);

        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex" };
        this.changeFormat = this.changeFormat.bind(this);
    }

    /* 
        Take generated newPalette and set allColors to the 'colors' object of arrays within the new palette.
        Each key in allColors (from 'colors') is the shade level.
        We are iterating over each shade level, and since it is an object of arrays, we can filter out the colors we don't need by
        selecting the key (color level) and concatenating the remaining color on the shades array
    */  
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
        };

        // above generates a level 50 value, which we don't need, so we can return the array from index 1 and onward
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji } = this.props.palette; 
        const colorBoxes = this._shades.map(color => (
            <Colorbox key={color.id} name={color.name} background={color[format]} showLink={false} />
        ));

        return (
            <div className="Palette">
                <NavBar handleChange={this.changeFormat} showSlider={false} />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default SingleColorPalette;