import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';
import { MachineNoteService, IMachineNote } from './MachineNoteService';

interface IProps {
  machine: IMachineInfo;
  machineNoteService: MachineNoteService;
}

interface IState {
  notes: IMachineNote[];
}

export class MachineDetailsPane extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { notes: props.machineNoteService.getNotes(props.machine.id) };

  }
  public render(): React.ReactNode {
    return (
      <>
        <div>
          I am the details pane.
          <button onClick={() => {
            this.props.machineNoteService.addNote(this.props.machine.id);
          }}>
            Add Note
          </button>
        </div>
        <div>
          <h1>Notes</h1>
        </div>
        <div>
          {this.state.notes.map(n => (
            <>
              <div>
                {n.date}
              </div>
              <div>
                {n.text}
              </div>
            </>
          ))}
        </div>
      </>
    );
  }
}

