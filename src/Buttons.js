import React, { Component } from "react";
import Adjustments from "./Adjustments";

const Buttons = props => {
  return (
    <div>
      <div>
        <button onClick={() => props.onPrevClick(props.generation)}>Previous Generation</button>
        <button onClick={props.onPlayClick}>Play</button>
        <button onClick={props.onPauseClick}>Pause</button>
        <button onClick={() => props.onNextClick()}>Next Generation</button>
      </div>
      <br/>
      <Adjustments speed={props.speed} cols={props.cols} rows={props.rows} onSizeSpeedEdit={props.onSizeSpeedEdit}/>
      <br />
      <div>
        <button onClick={() => props.onClearBoardClick()}>Clear Board</button>
        <button onClick={() => props.onRandomBoardClick()}>Random Board</button>
      </div>
    </div>
  );
};

export default Buttons;
