import React, { Component } from "react";
import "./App.css";
import OverlayWithCutout from "./components/OverlayWithCutout";

class App extends Component {
  state = { byWidthAndHeight: true };

  toggle = () => {
    this.setState({ byWidthAndHeight: !this.state.byWidthAndHeight });
  };

  render() {
    return (
      <main>
        <button onClick={this.toggle}>Toggle</button>
        {this.state.byWidthAndHeight ? (
          <>
            width: 200px, height: 150px
            <OverlayWithCutout width={200} height={150}>
              {({ setRef }) => (
                <button className="main-button" ref={setRef}>
                  Click me!
                </button>
              )}
            </OverlayWithCutout>
          </>
        ) : (
          <>
            padding: 100px
            <OverlayWithCutout padding={100}>
              {({ setRef }) => (
                <button className="main-button" ref={setRef}>
                  Click me!
                </button>
              )}
            </OverlayWithCutout>
          </>
        )}
        <div id="portal-root" style={{ position: "relative" }} />
      </main>
    );
  }
}

export default App;
