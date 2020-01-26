import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo } from './Machine.interfaces';
import { MachineStatusLabel } from './MachineStatusLabel';

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
      <Typography variant="subtitle1">{props.machine.machine_type}</Typography>
    </div>
    <div>
      <MachineStatusLabel status={props.machine.status} variant="subtitle2" />
    </div>
  </div>
);
