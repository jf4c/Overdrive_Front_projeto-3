import { globalCss } from "@stitches/react";

export const reset = globalCss({
    "*": {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: "100%",
        font: "inherit",
        verticalAlign: "baseline",
    },
});

export const globalStyles = globalCss({
    "*": {
        fontFamily: "sans-serif",
    },
});
