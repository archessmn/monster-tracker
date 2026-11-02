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
import { useForm, schemaResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import z from "zod";

import { api } from "@/trpc/react";

export default function DrinkBrandsPage() {
  const brands = api.drinkBrands.list.useQuery();

  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);

  return (
    <Stack>
      <CreateDrinkBrandForm
        opened={createModalOpened}
        onClose={closeCreateModal}
        onSuccess={() => {
          closeCreateModal();
          brands.refetch();
        }}
      />
      <Group>
        <Title>Drink Brands</Title>
        <Button ml={"auto"} onClick={openCreateModal}>
          Create
        </Button>
      </Group>
      {brands.data && brands.data.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Slug</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {brands.data.map((brand) => {
              return (
                <Table.Tr key={brand.id}>
                  <Table.Td>{brand.name}</Table.Td>
                  <Table.Td>{brand.slug}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      ) : (
        <>No Brands yet :(</>
      )}
    </Stack>
  );
}

function CreateDrinkBrandForm(props: {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formError, setFormError] = useState<string>();

  const createDrinkBrand = api.drinkBrands.create.useMutation().mutateAsync;

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      slug: "",
    },
    validate: schemaResolver(
      z.object({
        name: z.string().min(2),
        slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      }),
      { sync: true },
    ),
    validateInputOnChange: true,
  });

  return (
    <Modal opened={props.opened} onClose={props.onClose}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = await createDrinkBrand(values);

          if (res.ok) {
            props.onSuccess();
            form.reset();
          } else {
            setFormError(res.error ?? "An unkown error occurred");
          }
        })}
      >
        {formError && (
          <Alert color="red" title="Error creating drink brand">
            {formError}
          </Alert>
        )}
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Red Bull"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Slug"
          placeholder="red-bull"
          key={form.key("slug")}
          {...form.getInputProps("slug")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
