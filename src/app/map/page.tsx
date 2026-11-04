"use client";

import "leaflet/dist/leaflet.css";

import { Stack } from "@mantine/core";
import dynamic from "next/dynamic";

import { api } from "@/trpc/react";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((v) => v.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((v) => v.TileLayer),
  { ssr: false },
);

const DrinkLogPlotter = dynamic(
  () => import("@/app/_components/drink-log-plotter"),
  {
    ssr: false,
  },
);

export default function SearchPage() {
  const drinkLogsQuery = api.drinkLogs.list.useQuery();

  return (
    <Stack>
      <DynamicMapContainer
        style={{ height: "90vh" }}
        center={[54.91, -3.43]}
        zoom={6}
        maxZoom={22}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.7}
          maxNativeZoom={18}
          maxZoom={40}
        />
        <DrinkLogPlotter drinkLogs={drinkLogsQuery.data} />
      </DynamicMapContainer>
    </Stack>
  );
}
