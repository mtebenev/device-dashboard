import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';

interface IProps {
  machine: IMachineInfo;
}

export const MachineListItem: React.FC<IProps> = (props) => (
  <>
    <div>
      {props.machine.machine_type}
    </div>
    <div>
      Status: {props.machine.status}
    </div>
  </>
);
