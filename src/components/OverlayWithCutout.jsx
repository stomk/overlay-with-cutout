import React from "react";
import { createPortal } from "react-dom";

import styles from "./OverlayWithCutout.module.css";

class OverlayWithCutout extends React.Component {
  static defaultProps = {
    width: null,
    height: null,
    padding: 0
  };

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
    const width = this.props.width || targetRect.width;
    const height = this.props.height || targetRect.height;
    let top = targetRect.top - portalRect.top;
    let left = targetRect.left - portalRect.left;
    if (this.props.height) {
      top += (targetRect.height - this.props.height) / 2;
    }
    if (this.props.width) {
      left += (targetRect.width - this.props.width) / 2;
    }
    return { top, left, width, height };
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
