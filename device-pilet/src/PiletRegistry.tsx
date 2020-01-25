import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletCoreApi, AnyComponent } from 'piral-core';
import { PiletMenuApi } from 'piral-menu';
import { PiletDashboardApi } from 'piral-dashboard';
import { MachineStatusTile } from './machines/MachineStatusTile';

/**
 * Utility class for integrating UI elements of the pilet.
 */
export class PiletRegistry {

  /**
   * Registers machine-related UI elements.
   */
  public static registerMachinesUi(piletApi: PiletCoreApi & PiletMenuApi & PiletDashboardApi, pageComponent: AnyComponent<any>): void {

    // The page
    piletApi.registerPage('/machines', pageComponent);

    // The menu
    const MachinesMenu: React.FC = () => (
      <Link to="/machines">Machines</Link>
    );
    piletApi.registerMenu(MachinesMenu);

    // The tile
    piletApi.registerTile(MachineStatusTile, {
      initialColumns: 4,
      initialRows: 2,
    });
  }
}
