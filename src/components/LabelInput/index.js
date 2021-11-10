import React, { Component } from 'react';
import './style.css';

class LabelInput extends Component {
  render() { 
    const {name, value, callback, label} = this.props;
    return (
      <label className="label" htmlFor={`label-${name}`}>
        <span>{label}</span>
        <input
          className="input-user"
          type="number"
          max="60"
          min="0"
          name={name}
          value={value}
          onChange={callback}
          id={`label-${name}`}
        />
      </label>
    );
  }
}
 
export default LabelInput;