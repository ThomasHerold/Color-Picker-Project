import React, { Component } from 'react'
import ColorBox from './Colorbox';
import PaletteFooter from './PaletteFooter';
import styles from '../styles/PaletteStyles';
import NavBar from './NavBar';
import { withStyles } from '@material-ui/styles';


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
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} key={color.id} moreUrl={`/palette/${id}/${color.id}`} showingFullPalette={true} />
    ));

    return (
    <div className={classes.Palette}>
        <NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showSlider />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
        );
    }
}

export default withStyles(styles)(Palette);