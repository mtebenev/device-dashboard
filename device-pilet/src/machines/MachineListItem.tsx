import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IMachineInfo } from './Machine.interfaces';
import { MachineStatusLabel } from './MachineStatusLabel';
import { Link } from 'react-router-dom';

interface IProps {
  machine: IMachineInfo;
  isSelected: boolean;
}

export const MachineListItem: React.FC<IProps> = (props) => (
  <div
    className={props.isSelected ? 'list-item selected' : 'list-item'}
  >
    <div>
      <Link to={`/machines/${props.machine.id}`}>
        <Typography variant="subtitle1">{props.machine.machine_type}</Typography>
      </Link>
    </div>
    <div>
      <MachineStatusLabel status={props.machine.status} variant="subtitle2" />
    </div>
  </div>
);
