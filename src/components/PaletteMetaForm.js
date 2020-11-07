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
  const [stage, setStage] = useState("form");
  const { handleChange, newPaletteName, palettes, closeForm, handleSubmit } = props;

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    }
    handleSubmit(newPalette);
    setStage("");
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
  <>
    <Dialog open={stage === "emoji"} onClose={closeForm}>
      <DialogTitle id="emoji-dialog-title">Pick an Emoji For Your Palette</DialogTitle>
      <Picker onSelect={savePalette} />
    </Dialog>
    <Dialog open={stage === "form"} aria-labelledby="form-dialog-title" onClose={closeForm}>
    <DialogTitle id="form-dialog-title">Name Your Palette</DialogTitle>
    <ValidatorForm onSubmit={showEmojiPicker} instantValidate={false}>
    <DialogContent>
        <DialogContentText>
        Enter your palette name in the field below. Please make sure the name is unique to your other palettes.
        </DialogContentText>
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
  </>
  );
  };

export default PaletteMetaForm;