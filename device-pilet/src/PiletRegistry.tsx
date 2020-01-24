import * as React from 'react';
import { Link } from 'react-router-dom';
import { PiletCoreApi, AnyComponent } from 'piral-core';
import { PiletMenuApi } from 'piral-menu';

/**
 * Utility class for integrating UI elements of the pilet.
 */
export class PiletRegistry {

  /**
   * Registers machine-related UI elements.
   */
  public static registerMachinesUi(piletApi: PiletCoreApi & PiletMenuApi, pageComponent: AnyComponent<any>): void {
    piletApi.registerPage('/machines', pageComponent);

    const MachinesMenu: React.FC = () => (
      <Link to="/machines">Machines</Link>
    );
    piletApi.registerMenu(MachinesMenu);
  }
}
