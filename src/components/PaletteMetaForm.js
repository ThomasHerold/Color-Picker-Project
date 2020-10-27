import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const PaletteMetaForm = (props) => {
  const [open, setOpen] = useState(true);
  const { handleChange, handleSubmit, newPaletteName, palettes, closeForm } = props;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
        return palettes.every(
          ({ paletteName }) =>
            paletteName.toLowerCase() !== value.toLowerCase()
        );
      });
    });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onClose={closeForm}>
    <DialogTitle id="form-dialog-title">Name Your Palette</DialogTitle>
    <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
    <DialogContent>
        <DialogContentText>
        Enter your palette name in the field below. Please make sure the name is unique to your other palettes.
        </DialogContentText>
        <Picker />
        <TextValidator 
            label="Palette Name" 
            value={newPaletteName}
            name="newPaletteName" 
            fullWidth
            margin="normal"
            onChange={handleChange}
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={['Enter a palette name', 'Name already in use']} 
        />  
    </DialogContent>
    <DialogActions>
        <Button onClick={closeForm} color="primary">
            Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">Save Palette</Button> 
    </DialogActions>
    </ValidatorForm>
    </Dialog>
  );
  };

export default PaletteMetaForm;