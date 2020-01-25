import * as React from 'react';
import { Typography } from '@material-ui/core';
import { IDetailTileBulder, IDetailTileProps } from './DetailTilesFactory';
import { IMachineDetails } from '../Machine.interfaces';

/**
 * The tile displaying error summary for the machine.
 */
export class DetailTileBuilderErrors implements IDetailTileBulder {

  /**
   * IDetailTileBulder
   */
  createTileComponent(machineDetails: IMachineDetails): React.ComponentType<IDetailTileProps> {
    return (props) => (
      <div className="detail-tile">
        <Typography variant="h3">
          {props.machineDetails.events ? props.machineDetails.events.filter(e => e.status === 'errored').length : 0}
        </Typography>
        <div>Errors seen</div>
      </div>
    );
  }
}
