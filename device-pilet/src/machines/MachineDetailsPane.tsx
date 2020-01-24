import * as React from 'react';
import { IMachineInfo } from './IMachineInfo';

interface IProps {
  machine: IMachineInfo;
}

export const MachineDetailsPane: React.FC<IProps> = (props) => (
  <div>
    I am the details pane.
  </div>
);

