"use client";

import { CodeHighlight } from "@mantine/code-highlight";
import { Alert, Button, Stack, Table, Text, Textarea } from "@mantine/core";
import { parse } from "csv-parse/sync";
import { useEffect, useState } from "react";
import z from "zod";

import { api } from "@/trpc/react";

export default function DrinkTypesImportPage() {
  const brands = api.drinkBrands.list.useQuery();
  const types = api.drinkTypes.list.useQuery();
  const createType = api.drinkTypes.create.useMutation().mutateAsync;

  const [importInput, setImportInput] = useState<string>("");
  const importParsed: {
    name: string;
    brand: string;
    caff100ml: number;
    ml: number;
  }[] = z
    .array(
      z.object({
        name: z.string(),
        brand: z.string(),
        caff100ml: z.coerce.number(),
        ml: z.coerce.number(),
      }),
    )
    .parse(
      parse(importInput, {
        delimiter: ",",
        columns: ["name", "brand", "caff100ml", "ml", "caffTotal", "barcodes"],
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
            <Table.Th>Name</Table.Th>
            <Table.Th>Brand</Table.Th>
            <Table.Th>Caffeine / 100ml</Table.Th>
            <Table.Th>Total ml</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {importParsed.map((row) => {
            return (
              <Table.Tr key={row.name}>
                <Table.Td>
                  <Text
                    c={
                      !!types.data?.find((v) => v.name == row.name)
                        ? "dimmed"
                        : undefined
                    }
                  >
                    {row.name}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text
                    c={
                      !!brands.data?.find((v) => v.name == row.brand)
                        ? "green"
                        : undefined
                    }
                  >
                    {row.brand}
                  </Text>
                </Table.Td>
                <Table.Td>{row.caff100ml}</Table.Td>
                <Table.Td>{row.ml}</Table.Td>
                <Table.Td>
                  {brands.data &&
                  types.data &&
                  !!!types.data?.find((v) => v.name == row.name) &&
                  !!brands.data?.find((v) => v.name == row.brand) ? (
                    <Button
                      size="xs"
                      onClick={async () => {
                        const brand = brands.data!.find(
                          (v) => v.name == row.brand,
                        )!;

                        const res = await createType({
                          brand_id: brand.id,
                          caffeine_100ml: row.caff100ml,
                          name: row.name,
                          total_ml: row.ml,
                        });

                        if (res.ok) types.refetch();
                      }}
                      ml={"auto"}
                    >
                      Import
                    </Button>
                  ) : (
                    <Button disabled ml={"auto"}>
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
