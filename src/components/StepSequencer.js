import React from 'react';

import SequencerPad from './SequencerPad';
import { StepSequencerWrapper, Label } from './styled';

function StepSequencer(props) {
  const notes = props.note.map((isChecked, index) => (
    <SequencerPad
      key={index}
      handleClick={() => props.handlePadChange(index, 'note')}
      checked={isChecked}
    />
  ));

  const oscNotes = props.oscNote.map((isChecked, index) => (
    <SequencerPad
      key={index}
      handleClick={() => props.handlePadChange(index, 'oscNote')}
      checked={isChecked}
    />
  ));

  return (
    <StepSequencerWrapper beatCount='4' instrumentCount='2'>
      <Label>Note: </Label>
      { notes }

      <Label>OscNote: </Label>
      { oscNotes }
    </StepSequencerWrapper>
  );
}

export default StepSequencer;
