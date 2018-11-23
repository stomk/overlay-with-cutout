import React, { Component } from "react";
import "./App.css";
import OverlayWithCutout from "./components/OverlayWithCutout";

class App extends Component {
  state = { byWidthAndHeight: true };

  toggle = () => {
    this.setState({ byWidthAndHeight: !this.state.byWidthAndHeight });
  };

  render() {
    const style = this.state.byWidthAndHeight
      ? { width: 200, height: 150 }
      : { padding: 100, borderRadius: 20 };
    return (
      <main>
        {JSON.stringify(style)}
        <OverlayWithCutout {...style}>
          {({ setRef }) => (
            <button ref={setRef} onClick={this.toggle}>
              Click me!
            </button>
          )}
        </OverlayWithCutout>
        <div id="portal-root" />
      </main>
    );
  }
}

export default App;
