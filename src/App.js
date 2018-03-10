import React, { Component } from "react";
import Grid from "./Grid";
import Buttons from "./Buttons";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.speed = 300;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generations: 0,
      // creating the grid by filling the array with rows
      // then going through each row and filling with columns
      // with false (a box that is off)
      gridFull: this.emptyBoard(this.rows, this.cols),
      speed: this.speed,
      rows: this.rows,
      cols: this.cols,
      generationHistory: []
    };
  }

  emptyBoard = (rows, cols) => {
    // creates a board array with all blank (fasle) boxes
    // updates state with a new blank board
    // ints -> array / -update state-
    let blankBoard = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
    this.setState({
      gridFull: blankBoard
    })
    return blankBoard;
  };

  arrayClone = array => {
    return JSON.parse(JSON.stringify(array));
  };

  handleBoxSelect = (row, col) => {
    // inversing a box on click
    let gridCopy = this.arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({ gridFull: gridCopy });
  };

  handlePlayButton = () => {
    // sets an iterval that will run the main play fxn
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.state.speed);
  };

  handlePauseButton = () => {
    // clears the interval for the play button
    clearInterval(this.intervalId);
  };

  play = async () => {
    // the main function that computes and plays out generations
    // checks every square with current grid, and creates a
    // new grid that will be used to update state
    // per each generation
    let grid = this.state.gridFull;
    // test if starting from a new empty/custom grid
    // update with the incoming grid before the later newGrid update
    if (this.state.generationHistory.length < 1) {
      await this.updateHistory(grid);
    }
    let newGrid = this.arrayClone(this.state.gridFull);

    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        let count = 0;
        if (row > 0) if (grid[row - 1][col]) count++;
        if (row > 0 && col > 0) if (grid[row - 1][col - 1]) count++;
        if (row > 0 && col < this.state.cols - 1)
          if (grid[row - 1][col + 1]) count++;
        if (col < this.state.cols - 1) if (grid[row][col + 1]) count++;
        if (col > 0) if (grid[row][col - 1]) count++;
        if (row < this.state.rows - 1) if (grid[row + 1][col]) count++;
        if (row < this.state.rows - 1 && col > 0)
          if (grid[row + 1][col - 1]) count++;
        if (row < this.state.rows - 1 && this.state.cols - 1)
          if (grid[row + 1][col + 1]) count++;
        if (grid[row][col] && (count < 2 || count > 3))
          newGrid[row][col] = false;
        if (!grid[row][col] && count === 3) newGrid[row][col] = true;
      }
    }
    this.updateHistory(newGrid);
    this.setState({
      gridFull: newGrid,
      generations: this.state.generations + 1
    });
  };

  seedGrid = async () => {
    // seed the grid with a 1/4 chance of a box being active
    // an empty array => -update state-
    let emptyGrid = this.emptyBoard(this.state.rows, this.state.cols);
    let gridCopy = await this.arrayClone(emptyGrid);
    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[row][col] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
      generationHistory: [gridCopy]
    });
  };

  updateHistory = (gridToUpdate) => {
    // updates the history of all generations
    // array of arrays => updates state
    let updatedHistory = this.arrayClone(this.state.generationHistory);
    updatedHistory.push(gridToUpdate);
    this.setState({
      generationHistory: updatedHistory
    });
  };

  handleNextGeneration = () => {
    if (this.intervalId) {
      this.handlePauseButton();
    }
    this.play();
  };

  handlePrevGeneration = generation => {
    // reverts the board to the most recent update in the history
    // int => --update state--
    this.handlePauseButton();
    if (generation === 0) {
      return null;
    }
    let newGenerationHistory = this.arrayClone(
      this.state.generationHistory
    ).slice(0, generation);
    this.setState({
      generations: generation - 1,
      gridFull: newGenerationHistory[generation - 1],
      generationHistory: newGenerationHistory
    });
  };

  handleClearBoard = () => {
    // clears the board and updates state
    this.handlePauseButton();
    let emptyGrid = this.emptyBoard(this.state.rows, this.state.cols);
    this.setState({
      gridFull: emptyGrid,
      generations: 0,
      generationHistory: []
    });
  };

  handleRandomBoard = () => {
    // randomizes board and updates state,
    this.handlePauseButton();
    this.setState({
      generations: 0,
      generationHistory: []
    });
    this.seedGrid();
  };

  handleSizeSpeedUpdate = async (rows, cols, speed) => {
    // async needed for <Grid /> when it's processed
    // ints -> -update state-
    this.setState({
      rows: rows,
      cols: cols,
      speed: speed
    });
    await this.emptyBoard(rows, cols);
    this.seedGrid();
  };

  componentDidMount() {
    this.seedGrid();
  }

  render() {
    return (
      <div>
        <h1>Game of Life </h1>
        <Buttons
          onPlayClick={this.handlePlayButton}
          onPauseClick={this.handlePauseButton}
          onNextClick={this.handleNextGeneration}
          onPrevClick={this.handlePrevGeneration}
          onClearBoardClick={this.handleClearBoard}
          onRandomBoardClick={this.handleRandomBoard}
          generation={this.state.generations}
          onSizeSpeedEdit={this.handleSizeSpeedUpdate}
          speed={this.state.speed}
          rows={this.state.rows}
          cols={this.state.cols}
        />
        <h2>
          Generations: {this.state.generations} | Rows: {this.state.rows} |
          Cols: {this.state.cols} | Speed (in ms): {this.state.speed}{" "}
        </h2>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.state.rows}
          cols={this.state.cols}
          onBoxSelect={this.handleBoxSelect}
        />
      </div>
    );
  }
}

export default App;
