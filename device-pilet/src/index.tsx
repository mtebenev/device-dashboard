import * as React from 'react';
import { PiletApi } from 'sample-piral';
import { PiletModalsApi } from 'piral-modals';
import 'leaflet/dist/leaflet.css';
import { MachinesPage } from './machines/MachinesPage';
import { createMachinesConnector } from './machines/MachinesConnector';
import './styles.scss';
import { MachineNoteService } from './machines/MachineNoteService';
import { PiletRegistry } from './PiletRegistry';

export function setup(app: PiletApi) {
  app.registerTile(() => <div>Welcome to Piral!</div>, {
    initialColumns: 2,
    initialRows: 1,
  });

  const cn = createMachinesConnector(app);
  const MachinesView = cn(props => (
    <ul>
      {props.data.map((item, i) => (
        <li key={i}>{item.id}</li>
      ))}
    </ul>
  ));


  const connect = app.createConnector(
    () => new Promise((resolve, reject) => setTimeout(() => resolve(['one', 'two', 'three']), 5000)),
  );

  const DataView = connect(props => (
    <ul>
      {props.data.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  ));
  app.registerTile(() => (
    <div className="tile">
      <b>This is the example tile from connector module.</b>
      <DataView />
    </div>
  ));

  // Modal
  const modalApi = app as PiletModalsApi;
  const noteService = new MachineNoteService(modalApi);

  app.registerTile(() => (
    <div className="tile">
      <b>This is the example tile from connector module.</b>
      <button onClick={() => {
        const api: PiletModalsApi = app;
        noteService.addNote('some_id');
      }}>Test</button>
      <MachinesView />
    </div>
  ));

  const connectedPage = cn(props => (
    <MachinesPage machines={props.data} machineNoteService={noteService} />
  ));
  PiletRegistry.registerMachinesUi(app, connectedPage);
}
