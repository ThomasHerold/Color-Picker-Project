import React, { Component } from 'react'
import Slider from 'rc-slider'
import ColorBox from './Colorbox';
import "rc-slider/assets/index.css";
import "../styles/palette.css";

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
      <div className="slider"> 
      <Slider
            defaultValue={level}
            min={100}
            max={900}
            onAfterChange={this.changeLevel}
            step={100}
            trackStyle={{ backgroundColor: "transparent" }}
            handleStyle={{ backgroundColor: 'green', outline: 'none', border: '2px solid green', boxShadow: 'none', width: '13px', height: '13px', marginTop: '-3px'  }}
            railStyle={{ height: 8 }}

        />
      </div>
        {/* Navbar goes here */}
            <div className="Palette-colors" >{colorBoxes}</div>
        {/* Footer */}
    </div>
        );
    }
}

export default Palette;