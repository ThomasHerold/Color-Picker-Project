import chroma from 'chroma-js';

// color shade levels from light to dark
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.name,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };

    // set key to level and assign empty array value
    for (let level of levels) {
        newPalette.colors[level] = [];
    }

    /* get your scale of colors by generate scale, then reverse the array. for each item in scale, push the corresponding color object into the new palette 
       based on the color level that we can match using the 'i' iterator. i.e. idx 0 is level 50, then so on. 
       We push the new color name, create id by replacing spaces in the name, take the hex value, generate rgb through chroma.js, 
       then use a combination of regex and chroma.js to change the rbg value to rgba.
    */
    for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase.replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css()
                    .replace("rgba", "rgb")
                    .replace(")", ",1.0)")
            });
        }
    }

    return newPalette;
}

// take a single color, darken it, set to hex value, then return the new color and end range (white)
function getRange(hexColor) {
    const end ="#fff";
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ];
}

// find range of colors, set to Lab color space, and generate 10 colors within that color space
function generateScale(hexColor, numberOfColors) {
   return chroma
            .scale(getRange(hexColor))
            .mode("lab")
            .colors(numberOfColors);
}

export { generatePalette };


// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" }
//     ]
//   }