import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo } from './Machine.interfaces';
import { MachineNoteService, IMachineNote } from './MachineNoteService';
import { MachineNoteList } from './MachineNoteList';
import { PiletFeedsApi } from 'piral-feeds';
import { MachineDetailsDataPane } from './MachineDetailsDataPane';

interface IProps {
  pilet: PiletFeedsApi;
  machine: IMachineInfo;
  machineNoteService: MachineNoteService;
  notes: IMachineNote[];
}

/**
 * The pane displays information about a specific machine (notes and details)
 */
export class MachineDetailsPane extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

  }
  public render(): React.ReactNode {
    return (
      <div className="machine-details-pane">
        <Typography variant="h5">
          Details
        </Typography>
        <MachineDetailsDataPane pilet={this.props.pilet} machineId={this.props.machine.id}/>
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
        <MachineNoteList pilet={this.props.pilet} noteService={this.props.machineNoteService} machineId={this.props.machine.id} />
      </div>
    );
  }
}

