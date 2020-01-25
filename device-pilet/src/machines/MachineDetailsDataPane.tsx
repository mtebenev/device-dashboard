import * as React from 'react';
import { PiletFeedsApi } from 'piral-feeds';
import { withMachineDetailsConnector } from './MachineDetailsConnector';
import { DetailTilesFactory } from './detail-tiles/DetailTilesFactory';
import { IMachineDetails } from './Machine.interfaces';

interface IProps {
  data: IMachineDetails;
}

/**
 * Displays the machine details data.
 */
const MachineDetailsDataPaneImpl: React.FC<IProps> = (props) => (
  <div className="machine-details-data-pane">
    {DetailTilesFactory.createTiles(props.data)}
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
