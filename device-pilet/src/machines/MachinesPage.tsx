import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';
import { MachineListPane } from './MachineListPane';
import { MachineMapPane } from './MachineMapPane';

interface IProps {
  machines: IMachineInfo[]
}

export class MachinesPage extends React.Component<IProps> {
  public render(): React.ReactNode {
    return (
      <div className="machines-page">
        <MachineListPane machines={this.props.machines} onMachineSelected={(machineId) => {
          alert(`Clicked2: ${machineId}`);
        }} />
        <MachineMapPane machines={this.props.machines} />
      </div>
    );
  }
}
