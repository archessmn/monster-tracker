import { Icon, type LatLngExpression } from "leaflet";
import { Marker } from "react-leaflet";

export default function PointerIcon(props: { position: LatLngExpression }) {
  return (
    <Marker
      position={props.position}
      icon={
        new Icon({
          iconUrl: "/marker.svg",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        })
      }
    />
  );
}
