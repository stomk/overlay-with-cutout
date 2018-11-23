import React, { Component } from "react";
import "./App.css";
import OverlayWithCutout from "./components/OverlayWithCutout";

class App extends Component {
  render() {
    return (
      <main>
        <OverlayWithCutout>
          {({ setRef }) => <button ref={setRef}>Click me!</button>}
        </OverlayWithCutout>
        <div id="portal-root" style={{ position: "relative" }} />
      </main>
    );
  }
}

export default App;
