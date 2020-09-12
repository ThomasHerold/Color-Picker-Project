import React, { Component } from 'react'
import { generatePalette } from '../utils/colorHelpers';
import ColorBox from './Colorbox';
import "../styles/palette.css";

class Palette extends Component {
    render() {

        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ));

    return (
        <div className="Palette">
        {/* Navbar goes here */}
            <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer */}
        </div>
        );
    }
}

export default Palette;