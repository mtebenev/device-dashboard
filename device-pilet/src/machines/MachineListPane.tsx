import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';
import { MachineListItem } from './MachineListItem';

interface IProps {
  machines: IMachineInfo[];
  onMachineSelected: (machineId: string) => void;
}

export const MachineListPane: React.FC<IProps> = (props) => (
  <div className="machine-list-pane">
    {props.machines && props.machines.map(m => (
      <div onClick={() => {
        props.onMachineSelected(m.id);
      }}>
        <MachineListItem machine={m} />
      </div>
    ))}
  </div>
);
