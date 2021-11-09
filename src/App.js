import React, { Component } from 'react';
import './App.css';
import Clock from './components/Clock';
import cucoSound from './assets/sounds/cuco-clock.mp3';
import Swal from 'sweetalert2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      currentMinutes: 0,
      currentHours: 0,
      currentSeconds: 0,
    };
    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.intervalCleaner = this.intervalCleaner.bind(this);
    this.currentHour = this.currentHour.bind(this);
    this.startCount = this.startCount.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
  }

  handleInputChanges({target: {value, name}}) {
    this.intervalCleaner();
    this.setState({
      [name]: value
    });
  }

  startCount() {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (minutes === 0 && seconds === 0) {
        this.stopCounter();
      } else {
        this.setState(({seconds, minutes}) => ({
          minutes: seconds === 0 ? minutes - 1 : minutes,
          seconds: seconds === 0 ? 59 : seconds - 1
        }));
      }
    }, ONE_SECOND);
  }

  stopCounter() {
    clearInterval(this.countInterval);
    const sound = new Audio(cucoSound);
    sound.play();
    Swal.fire({
      imageUrl: 'https://c.tenor.com/mR3i-SxcBWQAAAAd/cuckoo-clock-cuckoo-bird.gif',
      imageAlt: 'Um passaro imitando um relógio cuco',
      padding: '20px',
      text: 'Seu contador terminou!',
      timer: 8500,
    });
    setTimeout(this.currentHour, 7000);
  }

  componentDidMount() {
    this.currentHour();
  }

  currentHour() {
    const ONE_SECOND = 1000;
    this.timerInterval = setInterval(() => {
      const date = new Date();
      const currentHours = date.getHours();
      const currentMinutes = date.getMinutes();
      const currentSeconds = date.getSeconds();
      this.setState({
        currentHours,
        currentMinutes,
        currentSeconds
      })
    }, ONE_SECOND);
  }

  intervalCleaner() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  render() {
    const {
      minutes,
      seconds,
      currentMinutes,
      currentHours,
      currentSeconds,
    } = this.state;
    const { handleInputChanges, timerInterval, startCount } = this;
    return (
      <>
        <Clock 
          seconds={timerInterval ? currentSeconds : seconds}
          minutes={timerInterval ? currentMinutes : minutes}
          hours={timerInterval ? currentHours : null}
        />
        <input
          type="number"
          max="60"
          min="0"
          name="seconds"
          value={seconds}
          onChange={handleInputChanges}
        />
        <input
          type="number"
          max="60"
          min="0"
          name="minutes"
          value={minutes}
          onChange={handleInputChanges}
        />
        <button onClick={startCount}>Começar contagem!</button>
      </>
    );
  }
}

export default App;
