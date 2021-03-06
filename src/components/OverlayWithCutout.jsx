import React from "react";
import { createPortal } from "react-dom";

import styles from "./OverlayWithCutout.module.css";

class OverlayWithCutout extends React.Component {
  static defaultProps = {
    width: null,
    height: null,
    padding: 0,
    borderRadius: 0
  };

  constructor(props) {
    super(props);
    this.portalRoot = null;
    this.portal = null;
    this.targetRef = null;
  }
  componentDidMount() {
    this.portalRoot = document.getElementById("portal-root");
    this.portal = document.createElement("div");
    this.portal.style.position = "relative";
    this.portalRoot.appendChild(this.portal);
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.portalRoot.removeChild(this.portal);
  }

  getCutoutPosition = () => {
    const targetRect = this.targetRef.getBoundingClientRect();
    const portalRect = this.portal.getBoundingClientRect();
    let top = targetRect.top - portalRect.top;
    let left = targetRect.left - portalRect.left;
    let width = this.props.width || targetRect.width;
    let height = this.props.height || targetRect.height;
    if (this.props.height) {
      top += (targetRect.height - this.props.height) / 2;
    }
    if (this.props.width) {
      left += (targetRect.width - this.props.width) / 2;
    }
    if (this.props.padding) {
      top -= this.props.padding;
      left -= this.props.padding;
      width += 2 * this.props.padding;
      height += 2 * this.props.padding;
    }
    return { top, left, width, height };
  };

  render() {
    return (
      <>
        {this.props.children({ setRef: ref => (this.targetRef = ref) })}
        {this.portal &&
          this.targetRef &&
          createPortal(
            <div
              className={styles.base}
              style={{
                position: "absolute",
                ...this.getCutoutPosition(),
                borderRadius: this.props.borderRadius
              }}
            />,
            this.portal
          )}
      </>
    );
  }
}

export default OverlayWithCutout;
