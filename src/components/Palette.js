import React, { Component } from 'react'
import ColorBox from './Colorbox';
import "../styles/palette.css";
import NavBar from './NavBar';

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    changeFormat(val) {
        this.setState({ format: val })
    }

    render() {
    
    const { level, format } = this.state;
    const { colors } = this.props.palette;

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} />
    ));

    return (
    <div className="Palette">
        <NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
        {/* Navbar goes here */}
        <div className="Palette-colors" >{colorBoxes}</div>
        {/* Footer */}
    </div>
        );
    }
}

export default Palette;