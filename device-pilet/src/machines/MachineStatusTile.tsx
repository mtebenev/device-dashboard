import * as React from 'react';
import { PiletFeedsApi } from 'piral-feeds';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { compose, renameProp } from 'recompose';
import IntlRelativeTimeFormat from '@formatjs/intl-relativetimeformat';
import { withMachineEventsConnector } from './MachineEventsConnector';
import { IMachineEvent, IMachineInfo } from './Machine.interfaces';
import { TileComponentProps } from 'piral-dashboard';
import { withMachinesConnector } from './MachinesConnector';
import { MachineStatusLabel } from './MachineStatusLabel';

interface IProps {
  piral: PiletFeedsApi;
  events: IMachineEvent[];
  machines: IMachineInfo[];
}

IntlRelativeTimeFormat.__addLocaleData(
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en.json')
);

const MachineStatusTileImpl: React.FC<IProps & TileComponentProps> = (props) => (
  <div>
    {props.events.length > 0 && (
      <StatusItem
        machine={props.machines.find(m => m.id === props.events[0].machineId)}
        machineEvent={props.events[0]}
        headingVariant="h5"
        subheadingVariant="h6"
      />
    )}
    {props.events.slice(1).map(evt =>
      <StatusItem
        machine={props.machines.find(m => m.id === evt.machineId)}
        machineEvent={evt}
        headingVariant="body1"
        subheadingVariant="body2"
      />
    )}
  </div>
);

const StatusItem: React.FC<{
  machine?: IMachineInfo,
  machineEvent: IMachineEvent,
  headingVariant: Variant,
  subheadingVariant: Variant
}> = (props) => (
  <div className="tile-item">
    <div>
      {props.machine
        ? (
          <Typography variant={props.headingVariant}>
            <Link to={`/machines/${props.machine.id}`}>{props.machine.machine_type}</Link>
          </Typography>
        )
        : 'UNKOWN MACHINE'
      }
    </div>
    <div>
      <MachineStatusLabel status={props.machineEvent.status} variant={props.subheadingVariant} />
    </div>
    <div>
      <Typography variant={props.subheadingVariant}>
        {new Date(props.machineEvent.timestamp).toLocaleDateString()}
      </Typography>
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


