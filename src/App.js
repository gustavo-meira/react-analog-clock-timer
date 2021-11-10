import React, { Component } from 'react';
import './App.css';
import Clock from './components/Clock';
import cucoSound from './assets/sounds/cuco-clock.mp3';
import Swal from 'sweetalert2';
import LabelInput from './components/LabelInput';

class App extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      counting: false,
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
    this.setState({counting: true});
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
    const cucoAudio = new Audio(cucoSound);
    cucoAudio.play();
    Swal.fire({
      imageUrl: 'https://c.tenor.com/mR3i-SxcBWQAAAAd/cuckoo-clock-cuckoo-bird.gif',
      imageAlt: 'Um passaro imitando um relógio cuco',
      padding: '20px',
      text: 'Seu contador terminou!',
      timer: 8500,
    });
    this.setState({counting: false});
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
      counting,
    } = this.state;
    const { handleInputChanges, timerInterval, startCount, currentHour } = this;
    return (
      <>
        <h1>Relógio temporizador</h1>
        <Clock 
          seconds={timerInterval ? currentSeconds : seconds}
          minutes={timerInterval ? currentMinutes : minutes}
          hours={timerInterval ? currentHours : null}
        />
        {counting ? <span className="remaining-time">{`Faltam ${minutes} minutos e ${seconds} segundos...`}</span> : (
          <section className="inputs">
            <LabelInput
            name="seconds"
            value={seconds}
            callback={handleInputChanges}
            label="Segundos:"
            />
            <LabelInput
              name="minutes"
              value={minutes}
              callback={handleInputChanges}
              label="Minutos:"
            />
          </section>
        )}
        <div className="start-button">
          <button disabled={counting} onClick={startCount}>Começar contagem</button>
          <button disabled={counting} onClick={currentHour}>Horario atual</button>
        </div>
      </>
    );
  }
}

export default App;
