import React from "react";

type TChildren<T> = T & {
    children?: React.ReactNode;
}

export default TChildren