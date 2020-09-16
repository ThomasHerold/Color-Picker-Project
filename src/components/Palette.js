import React, { Component } from 'react'
import Slider from 'rc-slider'
import ColorBox from './Colorbox';
import "../styles/palette.css";
import 'rc-slider/assets/index.css';

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = { level: 500 };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    render() {
    
    const { level } = this.state;
    const { colors } = this.props.palette;
    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color.hex} name={color.name} />
    ));

    return (
        <div className="Palette">
            <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel} />
            {/* Navbar goes here */}
                <div className="Palette-colors" >{colorBoxes}</div>
            {/* Footer */}
        </div>
        );
    }
}

export default Palette;