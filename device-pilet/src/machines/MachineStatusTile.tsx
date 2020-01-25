import * as React from 'react';
import { PiletFeedsApi } from 'piral-feeds';
import { Link } from 'react-router-dom';
import { compose, renameProp } from 'recompose';
import { withMachineEventsConnector } from './MachineEventsConnector';
import { IMachineEvent, IMachineInfo } from './Machine.interfaces';
import { TileComponentProps } from 'piral-dashboard';
import { withMachinesConnector } from './MachinesConnector';

interface IProps {
  piral: PiletFeedsApi;
  events: IMachineEvent[];
  machines: IMachineInfo[];
}

const MachineStatusTileImpl: React.FC<IProps & TileComponentProps> = (props) => (
  <div>
    This is the tile: {props.machines.length}
    <div>
      {props.events.map(evt => <StatusItem machine={props.machines.find(m => m.id === evt.machineId)} machineEvent={evt} />)}
    </div>
  </div>
);

const StatusItem: React.FC<{
  machine?: IMachineInfo,
  machineEvent: IMachineEvent
}> = (props) => (
  <div>
    <div>
      {props.machine
        ? <Link to={`/machines/${props.machine.id}`}>{props.machine.machine_type}</Link>
        : 'UNKOWN MACHINE'
      }
    </div>
    <div>
      EVENT DATA HERE
    </div>
    <div>
      EVENT TIME HERE
    </div>
  </div>
);

export const MachineStatusTile = ({ piral }) => React.createElement(
  compose(
    withMachineEventsConnector(piral, undefined, 4),
    renameProp('data', 'events'),
    withMachinesConnector(piral),
    renameProp('data', 'machines')
  )(MachineStatusTileImpl));


