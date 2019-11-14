import React from "react";
import { MAP } from "react-google-maps/src/constants";
import { render } from "react-dom";

export default class MapControl extends React.Component {
  componentDidMount() {
    this.map = this.context[MAP];
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    const { controlPosition } = this.props;
    const index = this.map.controls[controlPosition].getArray().indexOf(this.el);
    this.map.controls[controlPosition].removeAt(index);
  }

  _render() {
    const { controlPosition, children } = this.props;

    render(
      <div ref={el => {
        if (!this.renderedOnce) {
          this.el = el;
          this.map.controls[controlPosition].push(el);
        } else if (el && this.el && el !== this.el) {
          this.el.innerHTML = '';
          [].slice.call(el.childNodes).forEach(child => this.el.appendChild(child));
        }
        this.renderedOnce = true;
      }}>
        {children}
      </div>,
      document.createElement('div')
    );
  }

  render () {
    return <noscript />
  }
}
