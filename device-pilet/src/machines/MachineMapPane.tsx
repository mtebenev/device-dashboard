import * as React from 'react';
import { Map, Marker, Popup, TileLayer, } from 'react-leaflet';
import L from 'leaflet';
import { IMachineInfo } from './IMachineInfo';

interface IProps {
  machines: IMachineInfo[];
}

const position = [51.505, -0.09];

export const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/marker-icon.png'),
  shadowUrl: require('../../assets/marker-shadow.png'),
});



export const MachineMapPane: React.FC<IProps> = (props) => (

  <Map center={position} zoom={12}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {props.machines.map(m => (
      <Marker position={[m.longitude, m.latitude]} icon={pointerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
    ))}
  </Map>
);

