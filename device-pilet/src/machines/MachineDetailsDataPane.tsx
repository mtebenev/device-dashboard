import * as React from 'react';
import { PiletFeedsApi } from 'piral-feeds';
import { withMachineDetailsConnector } from './MachineDetailsConnector';

interface IProps {
  data: any;
}

/**
 * Displays the machine details data.
 */
const MachineDetailsDataPaneImpl: React.FC<IProps> = (props) => (
  <div>
    I am the details
    <div>
      {JSON.stringify(props.data)}
    </div>
  </div>
);

interface IOuterProps {
  pilet: PiletFeedsApi;
  machineId: string;
}

export const MachineDetailsDataPane: React.FC<IOuterProps> = props =>
  React.createElement(
    withMachineDetailsConnector(props.pilet, props.machineId)<IOuterProps>(MachineDetailsDataPaneImpl),
    props
  );
