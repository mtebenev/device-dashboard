import * as React from 'react';
import { IMachineDetails } from '../Machine.interfaces';
import { DetailTileBuilderCommon } from './DetailTileBuilderCommon';
import { DetailTileBuilderErrors } from './DetailTileBuilderErrors';

export interface IDetailTileProps {
  machineDetails: IMachineDetails;
}
export type DetailTileComponent = React.ComponentType<IDetailTileProps>;

/**
 * Factory for detail tiles.
 */
export class DetailTilesFactory {

  public static createTiles(machineDetails: IMachineDetails): React.ReactElement[] {
    const builders = [
      new DetailTileBuilderCommon(),
      new DetailTileBuilderErrors()
    ];

    const components = builders.map(b => b.createTileComponent(machineDetails));
    const result = components.map(c => React.createElement(c, {machineDetails}));

    return result;
  }
}

/**
 * Each tile builder can build a specific tile depending on the machine details.
 */
export interface IDetailTileBulder {

  /**
   * Builds a tile component if supported. Otherwise returns undefined.
   * @param machineDetails The machine details.
   */
  createTileComponent(machineDetails: IMachineDetails): DetailTileComponent | undefined;
}
