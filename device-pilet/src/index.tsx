import { PiletApi} from 'sample-piral';
import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import { MachinesPage } from './machines/MachinesPage';
import { createMachinesConnector } from './machines/MachinesConnector';
import './styles.scss';

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!');
  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>
  );
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

  app.registerTile(() => (
    <div className="tile">
      <b>This is the example tile from connector module.</b>
      <MachinesView />
    </div>
  ));

  const connectedPage = cn(props => (
    <MachinesPage machines={props.data}/>
  ));

  //app.registerPage('/machines', MachinesPage);
  app.registerPage('/machines', connectedPage);

}