import React, { Component } from 'react';
import Tone from './Tone';
import { INITIAL_MASTER_GAIN, INITIAL_DETUNE_AMT } from './constants.js';
import { audioContext, masterGainNode } from './audio';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waveType: 'sawtooth',
      masterGain: INITIAL_MASTER_GAIN,
      detune: INITIAL_DETUNE_AMT,
      attack: '0.5',
      decay: '0.5',
      sustain: '0.5',
      release: '0.5',
    };

    this.toneMap = [
      { triggerKey: 'a', frequency: 261.63, note:'C4' },
      { triggerKey: 's', frequency: 293.66, note:'D4' },
      { triggerKey: 'd', frequency: 329.63, note:'E4' },
      { triggerKey: 'f', frequency: 349.23, note:'F4' },
      { triggerKey: 'g', frequency: 392.00, note:'G4' },
      { triggerKey: 'h', frequency: 440.00, note:'A4' },
      { triggerKey: 'j', frequency: 493.88, note:'B4' },
      { triggerKey: 'k', frequency: 523.25, note:'C5' },
    ];
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGainChange = (e) => {
    masterGainNode.gain.value = e.target.value;
    this.setState({
      masterGain: e.target.value,
    });
  }

  handleDetuneChange = (e) => {
    this.setState({
      detune: e.target.value,
    });
  }

  handleADSRChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const Tones = this.toneMap.map((tone, index) => (
      <Tone
        key={index}
        triggerKey={tone.triggerKey}
        freq={tone.frequency}
        ctx={audioContext}
        waveType={this.state.waveType}
        masterGainNode={masterGainNode}
        detune={this.state.detune}
      />
    ));
    return (
      <section>
        { Tones }

        <select name='waveType' value={this.state.waveType} onChange={this.handleChange}>
          <option value='sine'>Sine</option>
          <option value='square'>Square</option>
          <option value='sawtooth'>Sawtooth</option>
          <option value='triangle'>Triangle</option>
        </select>

        <div>
          <input name='masterGain' type='range' min='0' max='1' step='0.1' value={this.state.masterGain} onChange={this.handleGainChange} />
          <p>Volume: {this.state.masterGain} dB</p>

          <input name='detune' type='range' min='-100' max='100' value={this.state.detune} onChange={this.handleDetuneChange} />
          <p>Detune: {this.state.detune} cents</p>

          <fieldset style={{display: 'flex', flexDirection: 'column'}}>
            <legend>ADSR Gain Envelope</legend>
            <label htmlFor='attack'>Attack: {this.state.attack} sec </label>
            <input
              id='attack'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={this.state.attack}
              onChange={this.handleADSRChange}
            />

            <label htmlFor='decay'>Decay: {this.state.decay} sec </label>
            <input
              id='decay'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={this.state.decay}
              onChange={this.handleADSRChange}
            />

            <label htmlFor='sustain'>Sustain: {this.state.sustain} dB </label>
            <input
              id='sustain'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={this.state.sustain}
              onChange={this.handleADSRChange}
            />

            <label htmlFor='release'>Release: {this.state.release} sec </label>
            <input
              id='release'
              type='range'
              min='0'
              max='1'
              step='0.1'
              value={this.state.release}
              onChange={this.handleADSRChange}
            />
          </fieldset>
        </div>
      </section>
    );
  }
}

export default Synth;
