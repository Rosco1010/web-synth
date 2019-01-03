import { INITIAL_MASTER_GAIN } from './constants';

export const audioContext = AudioContext ? new AudioContext() : new webkitAudioContext();

export const masterGainNode = audioContext.createGain();
masterGainNode.gain.value = INITIAL_MASTER_GAIN;


export class Tone {
  osc: OscillatorNode;

  constructor(
    public frequency: number = 440,
    public detune: number = 0,
    public type: any = 'sine',
  ) {

    this.osc = new OscillatorNode(audioContext, {
      frequency,
      detune,
      type,
    });
  }
}
