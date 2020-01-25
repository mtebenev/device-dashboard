import * as React from 'react';
import { IMachineInfo } from './Machine.interfaces';

interface IProps {
  machine: IMachineInfo;
  isSelected: boolean;
}

export const MachineListItem: React.FC<IProps & React.HTMLProps<HTMLElement>> = (props) => (
  <div
    className={props.isSelected ? 'list-item selected' : 'list-item'}
    onClick={props.onClick}
  >
    <div>
      {props.machine.machine_type}
    </div>
    <div>
      Status: {props.machine.status}
    </div>
  </div>
);
