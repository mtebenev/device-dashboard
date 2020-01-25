import * as React from 'react';
import { PiletApi } from 'sample-piral';
import { PiletModalsApi } from 'piral-modals';
import 'leaflet/dist/leaflet.css';
import { MachinesPage } from './machines/MachinesPage';
import { withMachineEventsConnector } from './machines/MachineEventsConnector';
import { withMachinesConnector } from './machines/MachinesConnector';
import './styles.scss';
import { MachineNoteService } from './machines/MachineNoteService';
import { PiletRegistry } from './PiletRegistry';
import { IMachineInfo, IMachineEvent } from './machines/Machine.interfaces';
import { compose, renameProp } from 'recompose';
import { PageComponentProps } from 'piral-core';

export function setup(app: PiletApi) {

  // Modal
  const modalApi = app as PiletModalsApi;
  const noteService = new MachineNoteService(modalApi);

  // Connect & register machine page
  const connectorMachines = withMachinesConnector(app);
  const connectorEvents = withMachineEventsConnector(app);

  // Here the architecture challenge: how to make the page component depend on the data from 3 different sources:
  // machines, events, local storage notes.
  // If I would not be bound to pilet I would just pass 3 observables as properties.
  // But I would like to have all the data coming from Piral connectors. The FeedConnector passes the data
  // with property 'data'. If I have 3 connectors, they are getting 'hidden' by each of the following HoC.
  // Here's a simple example component that demonstrates the problem and how I thought about a solution:
  // Solution 1: I manually do the composition. It works and I don't like it.

  /*
  const EventedComponent = connectorEvents((propEvents: {machines: IMachineInfo[], data?: IMachineEvent[]}) => (
    <div>
      <div>{propEvents.machines.length}</div>
      <div>{propEvents.data.length}</div>
    </div>
  ));
  const MachinedComponent = connectorMachines(propsM => (
    <EventedComponent machines={propsM.data}></EventedComponent>
  ));
  PiletRegistry.registerMachinesUi(app, MachinedComponent);
  */

  // Solution 2: I introduce Recompose and simplify the code.
  // The outcome: much more cleaner code and no type checking :(
  /*
  const SimpleComponent = props => (
    <div>
      <div>{props.machines.length}</div>
      <div>{props.events.length}</div>
    </div>
  );

  const enhance = compose(
    connectorEvents,
    renameProp('data', 'events'),
    connectorMachines,
    renameProp('data', 'machines')
  );

  const EnhancedComponent = enhance(SimpleComponent);
  PiletRegistry.registerMachinesUi(app, EnhancedComponent);
  */

  const enhance = compose<{ machines: IMachineInfo[], events: IMachineEvent[] } & PageComponentProps, { machines: IMachineInfo[], events: IMachineEvent[] }>(
    connectorEvents,
    renameProp('data', 'events'),
    connectorMachines,
    renameProp('data', 'machines')
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
