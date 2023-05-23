import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { globalStyles, reset } from "./style/globalStyle";

reset();
globalStyles();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
