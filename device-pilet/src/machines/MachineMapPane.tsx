import * as React from 'react';
import { Map, Marker, Popup, TileLayer, } from 'react-leaflet';
import L from 'leaflet';
import { IMachineInfo } from './IMachineInfo';

interface IProps {
  machine: IMachineInfo;
}

export const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/marker-icon.png'),
  shadowUrl: require('../../assets/marker-shadow.png'),
});

export const MachineMapPane: React.FC<IProps> = (props) => {

  const position = [props.machine.longitude, props.machine.latitude];
  return (
    <Map center={position} zoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={pointerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
    </Map>
  );
}

