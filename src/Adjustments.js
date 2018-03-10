import React, { Component } from "react";

class Adjustments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows,
      cols: this.props.cols,
      speed: this.props.speed
    };
  }

  onRowsChange = e => {
    if (Number.isFinite(Number(e.target.value))) {
      this.setState({
        rows: Number(e.target.value)
      });
    }
  };

  onColsChange = e => {
    if (Number.isFinite(Number(e.target.value))) {
      this.setState({
        cols: Number(e.target.value)
      });
    }
  };

  onSpeedChange = e => {
    if (Number.isFinite(Number(e.target.value))) {
      this.setState({
        speed: Number(e.target.value)
      });
    }
  };
  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSizeSpeedEdit(
              this.state.rows,
              this.state.cols,
              this.state.speed
            );
          }}
        >
          <label>
            Rows:
            <input
              type="text"
              name="rows"
              value={this.state.rows}
              onChange={this.onRowsChange}
            />
          </label>
          <label>
            Cols:
            <input
              type="text"
              name="cols"
              value={this.state.cols}
              onChange={this.onColsChange}
            />
          </label>
          <label>
            Speed (in ms):
            <input
              type="text"
              name="speed"
              value={this.state.speed}
              onChange={this.onSpeedChange}
            />
          </label>
          <button type="submit"> Change </button>
        </form>
      </div>
    );
  }
}

export default Adjustments;
