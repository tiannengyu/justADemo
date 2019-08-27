import React from "react";
import ReactDOM from "react-dom";
import { Hello } from "./demo";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("app")
);
