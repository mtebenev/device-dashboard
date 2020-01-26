import * as React from 'react';
import { Map, Marker, Popup, TileLayer, } from 'react-leaflet';
import { Icon, Bounds, Point } from 'leaflet';
import { PiletFeedsApi } from 'piral-feeds';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { compose, renameProp, withProps } from 'recompose';
import { IMachineInfo } from './Machine.interfaces';
import { withMachinesConnector } from './MachinesConnector';
import { MachineStatusLabel } from './MachineStatusLabel';
import { withMachinesFilter } from './MachinesFilter';
import { MachineFilterService } from './MachineFilterService';

interface IProps {
  machines: IMachineInfo[];
  machineFilterService: MachineFilterService;
}

export const pointerIcon = new Icon({
  iconUrl: require('../../assets/marker-icon.png'),
  shadowUrl: require('../../assets/marker-shadow.png'),
});

export const MachineMapPaneImpl: React.FC<IProps> = (props) => {

  const points = props.machines.map(m => new Point(m.longitude, m.latitude));
  const bounds = new Bounds(points);

  const position = [bounds.getCenter().x, bounds.getCenter().y];
  return (
    <Map center={position} zoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.machines.map(m => (
        <Marker position={[m.longitude, m.latitude]} icon={pointerIcon}>
          <Popup>
            <div>
              <Typography variant="body1">
                <Link to={`/machines/${m.id}`}>{m.machine_type}</Link>
              </Typography>
            </div>
            <div>
              <MachineStatusLabel status={m.status} variant="body2" />
            </div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

export const MachineMapPane = ({ pilet, machineFilterService }) => React.createElement(
  compose(
    withProps(() => {return {machineFilterService}}),
    withMachinesConnector(pilet),
    renameProp('data', 'machines'),
    withMachinesFilter
  )(MachineMapPaneImpl));


