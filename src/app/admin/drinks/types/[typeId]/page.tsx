"use client";

import {
  Alert,
  Button,
  Group,
  Modal,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { use, useState } from "react";
import z from "zod";

import DrinkTypesTable from "@/app/_components/types-table";
import { api } from "@/trpc/react";

export default function DrinkBrandPage({
  params: paramsPromise,
}: {
  params: Promise<{ typeId: string }>;
}) {
  const params = use(paramsPromise);

  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);

  const type = api.drinkTypes.readAdmin.useQuery({
    type_id: params.typeId,
  });

  return (
    <Stack>
      {type.data && (
        <CreateDrinkTypeBarcodeForm
          onClose={closeCreateModal}
          onSuccess={() => {
            closeCreateModal();
            type.refetch();
          }}
          opened={createModalOpened}
          typeId={type.data.id}
        />
      )}
      <Title>{type.data?.name}</Title>
      <Group>
        <Title order={3}>Drink Type Barcodes:</Title>
        <Button ml="auto" onClick={openCreateModal}>
          Create
        </Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Barcode</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {type.data?.barcodes.map((barcode) => (
            <Table.Tr key={barcode.id}>
              <Table.Td>{barcode.barcode}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}

function CreateDrinkTypeBarcodeForm(props: {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
  typeId: string;
}) {
  const [formError, setFormError] = useState<string>();

  const createDrinkTypeBarcode =
    api.drinkBarcodes.create.useMutation().mutateAsync;

  const form = useForm({
    mode: "controlled",
    initialValues: {
      barcode: "",
    },
    validate: schemaResolver(
      z.object({
        barcode: z.string().min(1),
      }),
      { sync: true },
    ),
    validateInputOnChange: true,
  });

  return (
    <Modal opened={props.opened} onClose={props.onClose}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = await createDrinkTypeBarcode({
            barcode: values.barcode,
            type_id: props.typeId,
          });

          if (res.ok) {
            props.onSuccess();
            form.reset();
          } else {
            setFormError(res.error ?? "An unkown error occurred");
          }
        })}
      >
        {formError && (
          <Alert color="red" title="Error creating drink type barcode">
            {formError}
          </Alert>
        )}
        <TextInput
          withAsterisk
          label="Barcode"
          placeholder="0000000000"
          key={form.key("barcode")}
          {...form.getInputProps("barcode")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
