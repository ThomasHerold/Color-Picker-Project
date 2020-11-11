import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from '../styles/NewPaletteFormStyles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import seedColors from '../utils/seedColors';

const NewPaletteForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setColor] = useState("teal");
  const [colors, setColorList] = useState(seedColors[0].colors);
  const [colorName, setName] = useState("");
  const [newPaletteName, setPaletteName] = useState("");
  const isPaletteFull = colors.length >= 20;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setColor(newColor.hex);
  }

  const addNewColor = () => {

    const newColor = {
      color: currentColor,
      name: colorName
    };

    setColorList([...colors, newColor]);
    setName("");
  }

  const handleChange = (evt) => {
    evt.target.name === colorName ? setName(evt.target.value) : setPaletteName(evt.target.value);
  }

  const clearColors = () => {
    setColorList([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];

    setColorList([...colors, randomColor]);
  };

  const handleSubmit = (newPalette) => {
    
    newPalette.colors = colors;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");

    props.savePalette(newPalette);
    props.history.push("/");
  }

  const removeColor = (colorName) => {
    setColorList(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColorList(arrayMove(colors, oldIndex, newIndex));
  }

  // creating custom validation rule for the text field where we check if the added color is unique

  return (
    <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        palettes={props.palettes}
        newPaletteName={newPaletteName} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen} 
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button className={classes.button} variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={addRandomColor} disabled={isPaletteFull}>Random Color</Button>
          </div>
          <ColorPickerForm 
            isPaletteFull={isPaletteFull} 
            currentColor={currentColor}
            handleChange={handleChange}
            updateCurrentColor={updateCurrentColor}
            addNewColor={addNewColor}
            colorName={colorName}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
            <DraggableColorList colors={colors} removeColor={removeColor} axis='xy' onSortEnd={onSortEnd} distance={10} />
      </main>
    </div>
  );
 }

export default NewPaletteForm;