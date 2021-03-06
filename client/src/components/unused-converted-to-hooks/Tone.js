import { Component } from 'react';
import { audioContext } from '../../audio.tsx';

class Tone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      osc: null,
      gain: null,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detune !== this.props.detune && this.state.osc) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.osc.detune.value = this.props.detune;
    }
  }

  onKeyDown = (event) => {
    // TODO Refactor how the gain envelope works
    if (event.key === this.props.triggerKey && !this.state.osc) {
      const osc = new OscillatorNode(audioContext, {
        frequency: this.props.freq,
        detune: this.props.detune,
        type: this.props.waveType,
      });

      const adsrGain = audioContext.createGain();
      adsrGain.gain.value = 0;

      osc.start();
      osc.connect(adsrGain).connect(this.props.masterGainNode).connect(audioContext.destination);

      adsrGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + this.props.adsrEnvelope.attack); // Attack
      adsrGain.gain.linearRampToValueAtTime(this.props.adsrEnvelope.sustain, audioContext.currentTime + this.props.adsrEnvelope.attack + this.props.adsrEnvelope.decay); // Decay AND Sustain

      this.setState({ osc, adsrGain });
    }
  }

  onKeyUp = async (event) => {
    if (event.key === this.props.triggerKey && this.state.osc && this.state.adsrGain) {
      let releasePromise = new Promise((resolve, reject) => {
        this.state.adsrGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + this.props.adsrEnvelope.release); // Release
        window.setTimeout(() => resolve(true), this.props.adsrEnvelope.release * 1000);
      });

      await releasePromise;
      if (this.state.osc) {
        this.state.osc.stop();
        this.state.osc.disconnect();
        this.setState({ osc: null })
      }
    }
  }

  render() {
    return null;
  }
}

export default Tone;
