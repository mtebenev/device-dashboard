import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo, IMachineEvent } from './Machine.interfaces';
import { MachineListPane } from './MachineListPane';
import { MachineMapPane } from './MachineMapPane';
import { MachineDetailsPane } from './MachineDetailsPane';
import { MachineNoteService } from './MachineNoteService';
import { PiletFeedsApi } from 'piral-feeds';

interface IProps {
  pilet: PiletFeedsApi;
  machines: IMachineInfo[];
  machineEvents: IMachineEvent[];
  machineNoteService: MachineNoteService;
}

interface IState {
  selectedMachine?: IMachineInfo;
  mode: 'overview' | 'details';
}

export class MachinesPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const selectedMachine = props.machines.length > 0
      ? props.machines[0]
      : undefined;
    this.state = { selectedMachine, mode: 'details' };
  }
  public render(): React.ReactNode {
    return (
      <div className="machines-page">
        <MachineListPane machines={this.props.machines} onMachineSelected={(machineId) => {
          const machine = this.props.machines.find(m => m.id === machineId);
          this.setState({ ...this.state, selectedMachine: machine });
        }} />
        {this.state.selectedMachine && (
          <div className="details">
            <div className="title">
              <Typography variant="h4">
                {this.state.selectedMachine.machine_type}
              </Typography>
              {this.state.mode === 'overview'
                ? <button className="btn-mode" onClick={() => { this.setState({ ...this.state, mode: 'details' }) }}>Show Details</button>
                : <button className="btn-mode" onClick={() => { this.setState({ ...this.state, mode: 'overview' }) }}>Show Overview</button>
              }
            </div>
            <Typography variant="h5">
              {this.state.selectedMachine.status}
            </Typography>
            <div className="details-container">
              {this.state.mode === 'overview'
                ? <MachineMapPane machine={this.state.selectedMachine} />
                : <MachineDetailsPane
                  pilet={this.props.pilet}
                  machine={this.state.selectedMachine}
                  notes={this.props.machineNoteService.getNotes(this.state.selectedMachine.id)}
                  machineNoteService={this.props.machineNoteService} />
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}
