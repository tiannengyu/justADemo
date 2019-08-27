import React from "react";
import ReactDOM from "react-dom";
import { Hello } from "./demo";

ReactDOM.render(
    console.log('此为生产环境'),
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("app")
);
