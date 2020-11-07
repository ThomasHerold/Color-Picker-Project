import sizes from '../utils/sizes';
import svg from '../utils/Polka-Dots.svg';

export default {
    "@global": {
        ".fade-exit": {
            opacity: "1"
        },
        ".fade-exit-active": {
            opacity: "0",
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: "#3b3b3b",
        backgroundImage: `url(${svg})`,
        [sizes.down("xs")]: {
            overflow: "scroll"
        }
    },
    title: {
        fontSize: "2rem"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)", // 3 items across at 30% width
        gridGap: "1.8rem",
        lineHeight: "1rem",
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%) !important"
        },
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        }
    }
}