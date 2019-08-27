import * as React from "react";
import * as styles from "./style.scss";
import Test from "@components/Test";

export interface HelloProps {
    compiler: string;
    framework: string;
}

export const Hello: React.SFC<HelloProps>  = (props: HelloProps):JSX.Element=> (
    <h1 className={styles.text}>
    Hello from {props.compiler} {props.framework}!<Test></Test>
    </h1>
);