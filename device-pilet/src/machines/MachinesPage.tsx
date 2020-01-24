import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';
import { MachineListPane } from './MachineListPane';
import { MachineMapPane } from './MachineMapPane';
import { MachineDetailsPane } from './MachineDetailsPane';

interface IProps {
  machines: IMachineInfo[]
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
    this.state = { selectedMachine, mode: 'overview' };
  }
  public render(): React.ReactNode {
    return (
      <div className="machines-page">
        <MachineListPane machines={this.props.machines} onMachineSelected={(machineId) => {
          const machine = this.props.machines.find(m => m.id === machineId);
          this.setState({ ...this.state, selectedMachine: machine });
        }} />
        {this.state.selectedMachine && (
          <div>
            <div>
              {this.state.selectedMachine.machine_type}
            </div>
            <div>
              {this.state.selectedMachine.status}
            </div>
            <div>
              {this.state.mode === 'overview'
                ? <button onClick={() => {this.setState({...this.state, mode: 'details'})}}>Show Details</button>
                : <button onClick={() => {this.setState({...this.state, mode: 'overview'})}}>Show Overview</button>
              }

            </div>
            <div>
              {this.state.mode === 'overview'
                ? <MachineMapPane machine={this.state.selectedMachine} />
                : <MachineDetailsPane machine={this.state.selectedMachine} />
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}
