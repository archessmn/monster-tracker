"use client";

import { DrinkBrand, DrinkType } from "@/db/generated/prisma/client";
import { Table } from "@mantine/core";
import Link from "next/link";

export default function DrinkTypesTable(props: {
  types: (DrinkType & { brand?: DrinkBrand })[];
  hideBrand?: boolean;
}) {
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            {!props.hideBrand && <Table.Th>Brand</Table.Th>}
            <Table.Th>Caffeine (mg) / 100ml</Table.Th>
            <Table.Th>Total ml</Table.Th>
            <Table.Th>Total caffeine (mg)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.types.map((type) => {
            return (
              <Table.Tr key={type.id}>
                <Table.Td>{type.name}</Table.Td>
                {!props.hideBrand && (
                  <Table.Td>
                    <Link href={`/admin/drinks/brands/${type.brand!.id}`}>
                      {type.brand!.name}
                    </Link>
                  </Table.Td>
                )}
                <Table.Td>{type.caffeine_100ml}</Table.Td>
                <Table.Td>{type.total_ml}</Table.Td>
                <Table.Td>
                  {Math.round(type.caffeine_100ml * (type.total_ml / 100))}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </>
  );
}
