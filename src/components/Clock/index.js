import React, { Component } from 'react';
import './style.css';

/* 
Site que eu usei de base para montar esse componente:
https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/
*/

class Clock extends Component {
  render() {
    const { minutes, hours, seconds } = this.props;
    const secondRotation = 6 * seconds;
    const minutesRotation = 6 * minutes;
    const hoursRotation = hours ? 30 * hours + minutes / 2 : 0;
    return (
      <section className="clock-container">
        <div id="hour" style={{transform: `rotate(${hoursRotation}deg)`}} />
        <div id="minute" style={{transform: `rotate(${minutesRotation}deg)`}} />
        <div id="second" style={{transform: `rotate(${secondRotation}deg)`}} />
      </section>
    );
  }
}
 
export default Clock;
