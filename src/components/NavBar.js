import React, { Component } from 'react';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import "rc-slider/assets/index.css";
import "../styles/NavBar.css";


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = { format: "hex", open: false }
        this.handleChange = this.handleChange.bind(this);
        this.toggleSnackbar = this.toggleSnackbar.bind(this);
    }

    handleChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }

    toggleSnackbar() {
        this.setState({ open: false })
    }

    render() {
        const { format } = this.state;
        const { level, changeLevel } = this.props; 

        return (
        <header className="NavBar">
        <div className="logo"><Link to={"/"}>reactcolorpicker</Link></div> 
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
           <Snackbar 
                anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
                open={this.state.open} 
                autoHideDuration={3000}
                onClose={this.toggleSnackbar} 
        message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton onClick={this.toggleSnackbar} color="inherit" key="close" aria-label="close">
                        <Close />
                    </IconButton>
                ]} 
            />
        </header>
        );
    }
}

export default NavBar;