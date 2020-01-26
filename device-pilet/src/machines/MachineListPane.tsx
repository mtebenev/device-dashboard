import * as React from 'react';
import { IMachineInfo } from './Machine.interfaces';
import { MachineListItem } from './MachineListItem';

interface IProps {
  machines: IMachineInfo[];
  selectedMachineId: string;
}

export const MachineListPane: React.FC<IProps> = (props) =>
  (
    <div className="machine-list-pane">
      {props.machines && props.machines.map(m => (
        <MachineListItem
          machine={m}
          isSelected={props.selectedMachineId && props.selectedMachineId === m.id}
        />
      ))}
    </div>
  );
