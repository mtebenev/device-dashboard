import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo } from './IMachineInfo';
import { MachineNoteService, IMachineNote } from './MachineNoteService';

interface IProps {
  machine: IMachineInfo;
  machineNoteService: MachineNoteService;
  notes: IMachineNote[];
}

export class MachineDetailsPane extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.state = { notes: props.machineNoteService.getNotes(props.machine.id) };

  }
  public render(): React.ReactNode {
    return (
      <div className="machine-details-pane">
        <div className="header">
          <Typography variant="h5">
            Notes
            </Typography>
          <button
            className="btn-add-note"
            onClick={() => {
              this.props.machineNoteService.addNote(this.props.machine.id);
            }}>
            Add Note
          </button>
        </div>
        <div>
          {this.props.notes.map(n => (
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
      </div>
    );
  }
}

