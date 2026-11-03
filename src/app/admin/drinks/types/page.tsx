"use client";

import {
  Alert,
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import z from "zod";

import DrinkBrandField from "@/app/_components/form/fields/drink-brand";
import DrinkTypesTable from "@/app/_components/types-table";
import { api } from "@/trpc/react";

export default function DrinkTypesPage() {
  const types = api.drinkTypes.listAdmin.useQuery();

  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);

  return (
    <Stack>
      <CreateDrinkTypeForm
        opened={createModalOpened}
        onClose={closeCreateModal}
        onSuccess={() => {
          closeCreateModal();
          types.refetch();
        }}
      />
      <Group>
        <Title>Drink Types</Title>
        <Button
          ml={"auto"}
          component={Link}
          href={"/admin/drinks/types/import"}
        >
          Import
        </Button>
        <Button onClick={openCreateModal}>Create</Button>
      </Group>
      {types.data && types.data.length > 0 ? (
        <DrinkTypesTable types={types.data} />
      ) : (
        <>No types yet :(</>
      )}
    </Stack>
  );
}

function CreateDrinkTypeForm(props: {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formError, _setFormError] = useState<string>();

  const createDrinkType = api.drinkTypes.create.useMutation().mutateAsync;

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      caffeine_100ml: 0,
      total_ml: 0,
      brand_id: "",
    },
    validate: schemaResolver(
      z.object({
        name: z.string(),
        caffeine_100ml: z.number().min(0),
        total_ml: z.number().min(0),
        brand_id: z.cuid2(),
      }),
      { sync: true },
    ),
    validateInputOnChange: true,
  });

  return (
    <Modal opened={props.opened} onClose={props.onClose}>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const res = await createDrinkType(values);

          if (res.ok) {
            props.onSuccess();
            form.reset();
          }
        })}
      >
        {formError && (
          <Alert color="red" title="Error creating drink type">
            {formError}
          </Alert>
        )}

        <DrinkBrandField formInputProps={form.getInputProps("brand_id")} />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="Ultra"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <NumberInput
          withAsterisk
          label="Caffeine (mg) per 100ml"
          placeholder="30"
          key={form.key("caffeine_100ml")}
          {...form.getInputProps("caffeine_100ml")}
        />

        <NumberInput
          withAsterisk
          label="Total ml"
          placeholder="500"
          key={form.key("total_ml")}
          {...form.getInputProps("total_ml")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
