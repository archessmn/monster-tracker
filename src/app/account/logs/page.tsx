"use client";

import { Stack, Table } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";

import { api } from "@/trpc/react";

export default function DrinkLogsPage() {
  const drinkLogs = api.drinkLogs.list.useQuery();
  const barcodes = api.drinkBarcodes.list.useQuery({});
  const types = api.drinkTypes.list.useQuery();

  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Type</Table.Th>
            <Table.Th>Barcode</Table.Th>
            <Table.Th>Datetime</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {drinkLogs.data?.map((drinkLog) => {
            const barcode = barcodes.data?.find(
              (v) => v.barcode == drinkLog.barcode,
            );
            const type = types.data?.find((v) => v.id == barcode?.type_id);

            return (
              <Table.Tr key={drinkLog.id}>
                {type ? (
                  <Table.Td>
                    <Link href={`/drinks/types/${type.id}`}>{type.name}</Link>
                  </Table.Td>
                ) : (
                  <Table.Td>Unknown</Table.Td>
                )}
                <Table.Td>{drinkLog.barcode}</Table.Td>
                <Table.Td>
                  {dayjs(drinkLog.datetime).format("YYYY-MM-DD HH:mm")}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
