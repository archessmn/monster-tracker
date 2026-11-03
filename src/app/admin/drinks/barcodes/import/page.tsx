"use client";

import { Alert, Button, Stack, Table, Text, Textarea } from "@mantine/core";
import { parse } from "csv-parse/sync";
import { useState } from "react";
import z from "zod";

import { api } from "@/trpc/react";

export default function DrinkTypesBarcodesImportPage() {
  const types = api.drinkTypes.list.useQuery();
  const barcodes = api.drinkBarcodes.list.useQuery({});
  const createTypeBarcode = api.drinkBarcodes.create.useMutation().mutateAsync;

  const [importInput, setImportInput] = useState<string>("");
  const importParsed: {
    type: string;
    barcode: string;
  }[] = z
    .array(
      z.object({
        type: z.string(),
        barcode: z.string(),
      }),
    )
    .parse(
      parse(importInput, {
        delimiter: ",",
        columns: ["type", "barcode", "description"],
      }),
    );

  console.log(importParsed);

  return (
    <Stack>
      <Alert color="orange" title="Warning">
        This import interface is rather hard-coded to work with a specific
        format of CSV
      </Alert>
      <Textarea
        autosize
        onChange={(v) => setImportInput(v.currentTarget.value)}
      />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Type</Table.Th>
            <Table.Th>Barcode</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {importParsed.map((row) => {
            return (
              <Table.Tr key={row.barcode}>
                <Table.Td>
                  <Text
                    c={
                      !!types.data?.find((v) => v.name == row.type)
                        ? "green"
                        : undefined
                    }
                  >
                    {row.type}
                  </Text>
                </Table.Td>
                <Table.Td>{row.barcode}</Table.Td>
                <Table.Td>
                  {types.data &&
                  barcodes.data &&
                  !!!barcodes.data?.find((v) => v.barcode == row.barcode) ? (
                    <Button
                      size="xs"
                      onClick={async () => {
                        const type = types.data!.find(
                          (v) => v.name == row.type,
                        )!;

                        const res = await createTypeBarcode({
                          type_id: type.id,
                          barcode: row.barcode,
                        });

                        if (res.ok) barcodes.refetch();
                      }}
                      ml={"auto"}
                    >
                      Import
                    </Button>
                  ) : (
                    <Button size="xs" disabled ml={"auto"}>
                      Import
                    </Button>
                  )}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
