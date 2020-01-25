import * as React from 'react';
import { IMachineInfo } from './Machine.interfaces';
import { MachineListItem } from './MachineListItem';

interface IProps {
  machines: IMachineInfo[];
  onMachineSelected: (machineId: string) => void;
}

interface IState {
  selectedMachineId?: string;
}

export class MachineListPane extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const selectedMachineId = props.machines.length > 0
      ? props.machines[0].id
      : undefined;
    this.state = { selectedMachineId };
  }
  public render(): React.ReactNode {
    return (
      <div className="machine-list-pane">
        {this.props.machines && this.props.machines.map(m => (
          <MachineListItem
            machine={m}
            isSelected={this.state.selectedMachineId && this.state.selectedMachineId===m.id}
            onClick={
              () => {
                this.setState({...this.state, selectedMachineId: m.id});
                this.props.onMachineSelected(m.id);
              }
            } />
        ))}
      </div>

    );
  }
}
