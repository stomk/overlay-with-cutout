import React from "react";
import { createPortal } from "react-dom";

import styles from "./OverlayWithCutout.module.css";

class OverlayWithCutout extends React.Component {
  constructor(props) {
    super(props);
    this.portalRoot = null;
    this.targetRef = null;
  }
  componentDidMount() {
    this.portalRoot = document.getElementById("portal-root");
    this.forceUpdate();
  }

  getCutoutPosition = () => {
    const targetRect = this.targetRef.getBoundingClientRect();
    const portalRect = this.portalRoot.getBoundingClientRect();
    const top = targetRect.top - portalRect.top;
    const left = targetRect.left - portalRect.left;
    return { top, left, width: targetRect.width, height: targetRect.height };
  };

  render() {
    return (
      <>
        {this.props.children({ setRef: ref => (this.targetRef = ref) })}
        {this.portalRoot &&
          this.targetRef &&
          createPortal(
            <div
              className={styles.base}
              style={{ position: "absolute", ...this.getCutoutPosition() }}
            />,
            this.portalRoot
          )}
      </>
    );
  }
}

export default OverlayWithCutout;
