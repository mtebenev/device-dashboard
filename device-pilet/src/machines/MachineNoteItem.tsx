import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineNote } from './MachineNoteService';

interface IProps {
  note: IMachineNote;
}

export const MachineNoteItem: React.FC<IProps & React.HTMLProps<HTMLElement>> = (props) => (
  <div className="note-item">
    <div>
      <Typography variant="h6">
        [{formatDate(props.note.date)}]
      </Typography>
    </div>
    <div>
      <Typography variant="body1">
        {props.note.text}
      </Typography>
    </div>
  </div>
);

function formatDate(jsonString: string): string {
  let result = 'N/A';
  try {
    result = new Date(JSON.parse(jsonString)).toLocaleDateString()
  } catch (e) {}

  return result;
}
