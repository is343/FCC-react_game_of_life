import React, { Component } from "react";
import Box from "./Box";

const Grid = props => {
  // takes in the dimensions of the status of the boxes
  // and builds the grid based
  const width = props.cols * 16;
  let rowsArr = []; // to hold our jsx
  // let boxClass = ''; // a temp for each box's css

  // go through each number of rows and add fill with each number
  // of cols to make each box
  for (var row_index = 0; row_index < props.rows; row_index++) {
    for (var col_index = 0; col_index < props.cols; col_index++) {
      let boxId = `${row_index}-${col_index}`;
      // test the bool of each box and put the corresponding class
      let boxClass = props.gridFull[row_index][col_index]
        ? "box on"
        : "box off"; // spaces between classes for multiples
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={row_index}
          col={col_index}
          onBoxSelect={props.onBoxSelect}
        />
      );
    }
  }

  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  );
};

export default Grid;
