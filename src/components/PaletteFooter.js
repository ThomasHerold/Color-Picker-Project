import React from 'react';
import "../styles/palette.css";

const PaletteFooter = (props) => {
    const { paletteName, emoji } = props;

    return (
        <div>
         <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
         </footer>
        </div>
    );
};

export default PaletteFooter;