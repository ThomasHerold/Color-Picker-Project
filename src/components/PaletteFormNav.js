import React from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles/PaletteFormNavStyles';

const PaletteFormNav = (props) => { 
    const { open, handleChange, handleSubmit, handleDrawerOpen, newPaletteName, palettes } = props;
    const [formShowing, toggleForm] = React.useState(false);
    const classes = useStyles(); 

    const handleClick = () => {
        toggleForm(!formShowing);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            color="default"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Create A Palette
            </Typography>
            </Toolbar>
            <div className={classes.navBtns}>
                <Link to="/" style={{ textDecoration: "none"}}>
                    <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
                </Link>
             <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>Save</Button>
            </div>
        </AppBar>
        {formShowing && (
         <PaletteMetaForm 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            newPaletteName={newPaletteName} 
            palettes={palettes}
            closeForm={handleClick}
        />
        )} 
    </div>  
    );
};

export default PaletteFormNav;