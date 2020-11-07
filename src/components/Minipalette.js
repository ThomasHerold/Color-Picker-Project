import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const Minipalette = React.memo((props) => {
    const { classes, paletteName, emoji, colors, handleClick, openDialog } = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} style={{ backgroundColor: color.color}} key={color.name} />
    ));

    const deletePalette = (e) => {
        e.stopPropagation();
        openDialog(props.id);
    };

    return (
        <div className={classes.root} onClick={() => handleClick(props.id)}>
            <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
});

// HOC takes minipalette and makes new component that adds styles to our props
export default withStyles(styles)(Minipalette);