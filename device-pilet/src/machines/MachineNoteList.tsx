import * as React from 'react';
import { PiletFeedsApi } from 'piral-feeds';
import { MachineNoteItem } from './MachineNoteItem';
import { IMachineNote, MachineNoteService } from './MachineNoteService';
import { withMachineNotesConnector } from './MachineNotesConnector';

interface IProps {
  data: IMachineNote[];
}

/**
 * Displays the machine note list.
 */
const MachineNoteListImpl: React.FC<IProps> = (props) => (
  <div>
    {props.data.map(n => (<MachineNoteItem note={n} />))}
  </div>
);

interface IOuterProps {
  pilet: PiletFeedsApi;
  noteService: MachineNoteService;
  machineId: string;
}

export const MachineNoteList: React.FC<IOuterProps> = props =>
  React.createElement(
    withMachineNotesConnector(props.pilet, props.noteService, props.machineId)<IOuterProps>(MachineNoteListImpl),
    props
  );
