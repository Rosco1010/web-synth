import React from 'react';

import Sequencer from '../components/Sequencer';


export const sequencerChallenges = [
  {
    pathName: 'challenge1',
    title: 'Challenge 1',
    isComplete: false,
    tests: [
      {
        name: 'Pick Wave',
        description: 'Change the wave type of the synth to "sine"',
        func: () => {
          const wavePicker = document.getElementById('waveType');
          return wavePicker.value === 'sine';
        },
      },
      {
        name: 'Change Attack',
        description: 'Change the attack value to 0.5 seconds',
        func: () => {
          const attackSlider = document.getElementById('attack');
          return attackSlider.value === '0.5';
        }
      },
      {
        name: 'Adjust Release',
        description: 'Adjust the release value to 0.8 seconds',
        func: () => {
          const releaseSlider = document.getElementById('release');
          return releaseSlider.value === '0.8';
        },
      }
    ],
    content: <Sequencer />,
  },
  {
    pathName: 'challenge2',
    title: 'Second Challenge',
    isComplete: false,
    tests: [
      () => true,
      () => true,
      () => true,
    ],
    content: <Sequencer />,
  },
  {
    pathName: 'challenge3',
    title: 'Challenge The Third',
    isComplete: false,
    tests: [
      () => true,
      () => true,
      () => true,
    ],
    content: <Sequencer />,
  },
];
