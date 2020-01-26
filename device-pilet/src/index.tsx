import * as React from 'react';
import { PiletApi } from 'sample-piral';
import { PiletModalsApi } from 'piral-modals';
import 'leaflet/dist/leaflet.css';
import { MachinesPage } from './machines/MachinesPage';
import { withMachineEventsConnector } from './machines/MachineEventsConnector';
import { withMachinesConnector } from './machines/MachinesConnector';
import { MachineNoteService } from './machines/MachineNoteService';
import { PiletRegistry } from './PiletRegistry';
import { IMachineInfo, IMachineEvent } from './machines/Machine.interfaces';
import { compose, renameProp, withProps } from 'recompose';
import { PageComponentProps } from 'piral-core';
import { PiletSearchApi } from 'piral-search';
import { MachineFilterService } from './machines/MachineFilterService';
import { withMachinesFilter } from './machines/MachinesFilter';
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

  PiletRegistry.registerMachinesUi(app, MachinesPageWithData);
}
