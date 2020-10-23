import React, { useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useStyles } from '../styles/PaletteFormNavStyles';

const PaletteFormNav = (props) => { 
    const { open, handleChange, handleSubmit, handleDrawerOpen, newPaletteName } = props; 
    const classes = useStyles(); 

useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
        console.log(props.palettes);
        return props.palettes.every(
          ({ paletteName }) =>
            paletteName.toLowerCase() !== value.toLowerCase()
        );
      });
    });

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
                <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                <TextValidator 
                    label="Palette Name" 
                    value={newPaletteName}
                    name="newPaletteName" 
                    onChange={handleChange}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter a palette name', 'Name already in use']} 
                />
                <Button variant="contained" color="primary" type="submit">Save Palette</Button> 
                </ValidatorForm>
                <Link to="/" style={{ textDecoration: "none"}}>
                    <Button variant="contained" color="secondary">Go Back</Button>
                </Link>
            </div>
        </AppBar> 
    </div>  
    );
};

export default PaletteFormNav;