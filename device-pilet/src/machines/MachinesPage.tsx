import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo, IMachineEvent } from './Machine.interfaces';
import { MachineListPane } from './MachineListPane';
import { MachineMapPane } from './MachineMapPane';
import { MachineDetailsPane } from './MachineDetailsPane';
import { MachineNoteService } from './MachineNoteService';
import { PiletFeedsApi } from 'piral-feeds';
import { PageComponentProps } from 'piral-core';
import { MachineStatusLabel } from './MachineStatusLabel';
import { MachineFilterService } from './MachineFilterService';

interface IProps {
  pilet: PiletFeedsApi;
  machines: IMachineInfo[];
  machineEvents: IMachineEvent[];
  machineNoteService: MachineNoteService;
  machineFilterService: MachineFilterService;
}

interface IState {
  selectedMachine?: IMachineInfo;
  mode: 'overview' | 'details';
}

export class MachinesPage extends React.Component<IProps & PageComponentProps, IState> {

  constructor(props: IProps & PageComponentProps) {
    super(props);

    const selectedMachine = this.getSelectedMachine();
    const mode = selectedMachine ? 'details' : 'overview';
    this.state = { selectedMachine, mode };
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div className="machines-page">
        <MachineListPane
          machines={this.props.machines}
          selectedMachineId={this.state.selectedMachine ? this.state.selectedMachine.id : undefined}
        />
        {(
          <div className="details">
            {this.state.selectedMachine && (
              <>
                {this.state.mode === 'overview'
                  ? <button onClick={() => { this.setState({ ...this.state, mode: 'details' }) }}>Show Details</button>
                  : <button onClick={() => { this.setState({ ...this.state, mode: 'overview' }) }}>Show Overview</button>
                }
                <div className="title">
                  <Typography variant="h4">
                    {this.state.selectedMachine.machine_type}
                  </Typography>
                </div>
                <MachineStatusLabel status={this.state.selectedMachine.status} variant="h5" />
              </>
            )}
            <div className="details-container">
              {(this.state.mode === 'overview' || !this.state.selectedMachine)
                ? <MachineMapPane pilet={this.props.pilet} machineFilterService={this.props.machineFilterService} />
                : <MachineDetailsPane
                  pilet={this.props.pilet}
                  machine={this.state.selectedMachine}
                  notes={this.props.machineNoteService.getNotes(this.state.selectedMachine.id)}
                  machineNoteService={this.props.machineNoteService} />
              }
            </div>
          </div>
        )
        }
      </div>
    );
  }

  public componentDidUpdate() {
    // Update machine selection on route change
    const selectedMachine = this.getSelectedMachine();
    if ((this.state.selectedMachine && selectedMachine && this.state.selectedMachine.id !== selectedMachine.id) ||
      (selectedMachine != this.state.selectedMachine)) {
      const newState = { ...this.state, selectedMachine: selectedMachine };

      // Auto enter the details mode if a new machine selected.
      if (selectedMachine) {
        newState.mode = 'details';
      }
      this.setState(newState);
    }
  }

  /**
   * Checks for the selected machine in route params.
   */
  private getSelectedMachine(): IMachineInfo | undefined {
    const paramId = this.props.match.params.id;
    const selectedMachine = this.props.machines.length > 0
      && paramId
      && this.props.machines.find(m => m.id === paramId);

    return selectedMachine;
  }
}
