import * as React from 'react';
import { MachineNoteItem } from './MachineNoteItem';
import { IMachineNote, MachineNoteService } from './MachineNoteService';
import { withMachineNotesConnector } from './MachineNotesConnector';
import { PiletFeedsApi } from 'piral-feeds';

interface IProps {
  data: IMachineNote[];
}

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
