import "react-leaflet-markercluster/styles";

import { Icon } from "leaflet";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { type DrinkLog } from "@/db/generated/prisma/client";

export default function DrinkLogPlotter(props: { drinkLogs?: DrinkLog[] }) {
  return (
    <MarkerClusterGroup disableClusteringAtZoom={21}>
      {props.drinkLogs
        ?.filter((v) => v.latitude && v.longitude)
        .map((v) => (
          <Marker
            key={v.id}
            position={[v.latitude!, v.longitude!]}
            icon={
              new Icon({
                iconUrl: "/marker.svg",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
              })
            }
          />
        ))}
    </MarkerClusterGroup>
  );
}
