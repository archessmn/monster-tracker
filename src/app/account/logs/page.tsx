"use client";

import { Stack, Table } from "@mantine/core";
import dayjs from "dayjs";

import { api } from "@/trpc/react";

export default function DrinkLogsPage() {
  const drinkLogs = api.drinkLogs.list.useQuery();

  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Barcode</Table.Th>
            <Table.Th>Datetime</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {drinkLogs.data?.map((drinkLog) => (
            <Table.Tr key={drinkLog.id}>
              <Table.Td>{drinkLog.barcode}</Table.Td>
              <Table.Td>
                {dayjs(drinkLog.datetime).format("YYYY-MM-DD HH:mm")}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
