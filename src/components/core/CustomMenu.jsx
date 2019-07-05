import React from "react";
import { FormControl } from "react-bootstrap";

export class CustomToggle extends React.Component {
  handleClick = e => {
    e.preventDefault();

    this.props.onClick(e);
  };

  render() {
    let { value } = this.props;

    return (
      <div
        className={value === "" ? "menu-title" : "menu-title-hidden"}
        onClick={this.handleClick}
      >
        <span
          className={
            value !== "" ? "menu-title-floating" : "menu-title-floating-hidden"
          }
        >
          {this.props.children}
        </span>
        <a href="/">{value !== "" ? value : this.props.children}</a>
      </div>
    );
  }
}

export class CustomToggleMulti extends React.Component {
  handleClick = e => {
    e.preventDefault();

    this.props.onClick(e);
  };

  render() {
    let { value, handleRemoveClick, name } = this.props;

    let valComponents = [];
    for (let i in value) {
      valComponents.push(
        <div key={i} className="inline title-toggle">
          <span className="title-value">{value[i]}</span>
          <span
            className="title-value-remove"
            onClick={e => handleRemoveClick(e, name)}
          >
            X
          </span>
        </div>
      );
    }

    return (
      <div
        className={value.length === 0 ? "menu-title" : "menu-title-hidden"}
        onClick={e => this.handleClick(e)}
      >
        <span
          className={
            value.length !== 0
              ? "menu-title-floating"
              : "menu-title-floating-hidden"
          }
        >
          {this.props.children}
        </span>
        <a href="/">
          {value.length !== 0 ? valComponents : this.props.children}
        </a>
      </div>
    );
  }
}

export class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: "" };
  }

  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  };

  render() {
    const {
      children,
      style,
      className,
      "aria-labelledby": labeledBy
    } = this.props;

    let { value } = this.state;

    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => this.handleChange(e)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
}
