import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface IProps {
  status: string;
  variant: Variant;
}

/**
 * Displays color label for a machine status
 */
export const MachineStatusLabel: React.FC<IProps> = (props) => (
  <Typography variant={props.variant} className="machine-status-label">
    Status:&nbsp;
      <span className={getClassNameFromStatus(props.status)}>
      {props.status}
    </span>
  </Typography>
);

function getClassNameFromStatus(status: string): string {
  return status === 'running'
    ? 'ok'
    : status === 'errored' ? 'error' : ''
}
