import * as React from 'react';
import { IDetailTileBulder, IDetailTileProps } from './DetailTilesFactory';
import { IMachineDetails } from '../Machine.interfaces';

/**
 * The tile displaying common info on the machine.
 */
export class DetailTileBuilderCommon implements IDetailTileBulder {

  /**
   * IDetailTileBulder
   */
  createTileComponent(machineDetails: IMachineDetails): React.ComponentType<IDetailTileProps> {
    return (props) => (
      <div className="detail-tile">
        <ValueItemCommon l="Floor" v={props.machineDetails.floor} />
        <ValueItemDate l="Install date" v={props.machineDetails.install_date} />
        <ValueItemDate l="Last maintenance" v={props.machineDetails.last_maintenance} />
      </div>
    );
  }
}

const ValueItemCommon: React.FC<{ l: string, v: any }> = props => (
  <>
    {props.v !== undefined ? <div>{props.l}: {props.v}</div> : undefined}
  </>
);

const ValueItemDate: React.FC<{ l: string, v: any }> = props => (
  <>
    {props.v !== undefined ? <div>{props.l}: {new Date(props.v).toLocaleDateString()}</div> : undefined}
  </>
);
