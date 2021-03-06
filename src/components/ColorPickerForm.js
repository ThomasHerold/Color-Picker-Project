import React, { useEffect } from 'react';
import { styles } from '../styles/ColorPickerFormStyles';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ColorPickerForm = (props) => {
    const { isPaletteFull, addNewColor, updateCurrentColor, currentColor, colorName, handleChange, colors, classes } = props;

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
          return colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          );
        });
        ValidatorForm.addValidationRule("isColorUnique", () => {
          return colors.every(
            ({ color }) =>
              color.toLowerCase() !== currentColor.toLowerCase()
          );
        });
      });

    return (
    <div className={classes.root}>
      <ChromePicker 
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
        <TextValidator 
          className={classes.colorNameInput}
          placeholder="Color Name"
          variant="filled"
          margin="normal"
          name={colorName}
          onChange={handleChange}
          value={colorName}
          validators={['required','isColorNameUnique', 'isColorUnique']}
          errorMessages={['Enter a color name','Color name must be unique', 'Color already used']}
        />
          <Button 
            variant="contained" 
            color="primary" 
            style={{ backgroundColor: currentColor }}
            className={classes.addColor} 
            type="submit"
            disabled={isPaletteFull}
          > 
            {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm> 
    </div>
    );
};

export default withStyles(styles)(ColorPickerForm);