"use client";

import { Stack, Table, Title } from "@mantine/core";

import { api } from "@/trpc/react";

export default function DrinkTypesBarcodesPage() {
  const barcodesMissingTypes =
    api.drinkBarcodes.listMissingLinksAdmin.useQuery();
  return (
    <Stack>
      <Title>Barcode scans missing types</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Barcode</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {barcodesMissingTypes.data?.map((barcode) => (
            <Table.Tr key={barcode.id}>
              <Table.Td>{barcode.barcode}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
