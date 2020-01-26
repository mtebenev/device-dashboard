import * as React from 'react';
import { PiletApi } from 'sample-piral';
import { PiletModalsApi } from 'piral-modals';
import 'leaflet/dist/leaflet.css';
import { MachinesPage } from './machines/MachinesPage';
import { withMachineEventsConnector } from './machines/MachineEventsConnector';
import { withMachinesConnector } from './machines/MachinesConnector';
import { MachineNoteService } from './machines/MachineNoteService';
import { Link } from 'react-router-dom';
import { IMachineInfo, IMachineEvent } from './machines/Machine.interfaces';
import { compose, renameProp, withProps } from 'recompose';
import { PageComponentProps, PiletCoreApi } from 'piral-core';
import { PiletSearchApi } from 'piral-search';
import { MachineFilterService } from './machines/MachineFilterService';
import { withMachinesFilter } from './machines/MachinesFilter';
import { PiletMenuApi } from 'piral-menu';
import { PiletDashboardApi } from 'piral-dashboard';
import { MachineStatusTile } from './machines/MachineStatusTile';
import './styles.scss';

export function setup(app: PiletApi) {

  // Modal
  const modalApi = app as PiletModalsApi;
  const noteService = new MachineNoteService(modalApi);

  // Search
  const searchApi: PiletSearchApi = app;
  const machineFilterService = new MachineFilterService();
  machineFilterService.register(searchApi);

  // Connect & register machine page
  const enhance = compose<{ machines: IMachineInfo[], events: IMachineEvent[] } & PageComponentProps, { machines: IMachineInfo[], events: IMachineEvent[] }>(
    withMachineEventsConnector(app),
    renameProp('data', 'events'),
    withMachinesConnector(app),
    renameProp('data', 'machines'),
    withProps(props => { return { machineFilterService: machineFilterService } }),
    withMachinesFilter
  );

  const MachinesPageWithData = enhance((props) => (
    <MachinesPage
      pilet={app}
      machines={props.machines}
      machineEvents={props.events}
      machineNoteService={noteService}
      {...props}
    />
  ));

  // The page
  const piletCoreApi: PiletCoreApi = app as PiletCoreApi;
  piletCoreApi.registerPage('/machines', MachinesPageWithData as any);
  piletCoreApi.registerPage('/machines/:id', MachinesPageWithData as any);

  // The menu
  const MachinesMenu: React.FC = () => (
    <Link to="/machines">Machines</Link>
  );
  const piletMenuApi: PiletMenuApi = app as PiletMenuApi;
  piletMenuApi.registerMenu(MachinesMenu);

  // The tile
  const piletDashboardApi: PiletDashboardApi = app as PiletDashboardApi;
  piletDashboardApi.registerTile(MachineStatusTile, {
    initialColumns: 4,
    initialRows: 8,

  });
}
