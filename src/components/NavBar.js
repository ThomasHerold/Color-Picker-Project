import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import "../styles/NavBar.css";


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = { format: "hex" }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ format: evt.target.value });
        this.props.handleChange(evt.target.value);
    }

    render() {
        const { format } = this.state;
        const { level, changeLevel } = this.props; 

        return (
        <header className="NavBar">
        <div className="logo"><a href="#">reactcolorpicker</a></div> 
         <div className="slider-container">
            <span>Level: {level}</span> 
            <div className="slider">
            <Slider
                defaultValue={level}
                min={100}
                max={900}
                onAfterChange={changeLevel}
                step={100}
                trackStyle={{ backgroundColor: "transparent" }}
                handleStyle={{ backgroundColor: 'green', outline: 'none', border: '2px solid green', boxShadow: 'none', width: '13px', height: '13px', marginTop: '-3px'  }}
                railStyle={{ height: 8 }}
            />
            </div>
           </div>
           <div className="select-container">
               <Select value={format} onChange={this.handleChange}>
                   <MenuItem value="hex">HEX - #ffffff</MenuItem>
                   <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                   <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
               </Select>
           </div>
        </header>
        );
    }
}

export default NavBar;