import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';

interface IProps {
  machines: IMachineInfo[];
  onMachineSelected: (machineId: string) => void;
}

export const MachineListPane: React.FC<IProps> = (props) => (
  <div>
    I am list
    {props.machines && props.machines.map(m => (
      <div onClick={() => {
        props.onMachineSelected(m.id);
      }}>
        Machine: {m.id}
      </div>
    ))}
  </div>
);
