import React, { Component } from "react";

const Box = props => {
  return (
    <div
      className={props.boxClass}
      id={props.id}
      onClick={() => props.onBoxSelect(props.row, props.col)}
    />
  );
};

export default Box;
