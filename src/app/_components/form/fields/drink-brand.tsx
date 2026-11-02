import { api } from "@/trpc/react";
import { Select } from "@mantine/core";
import type { SelectProps } from "@mantine/core";
import { GetInputPropsReturnType, useField } from "@mantine/form";

export default function DrinkBrandField(
  props: {
    formInputProps: GetInputPropsReturnType;
  } & SelectProps,
) {
  const assetTypes = api.drinkBrands.list.useQuery();

  return (
    <Select
      {...{ ...props, formInputProps: undefined }}
      data={assetTypes.data?.map((a) => ({
        value: a.id,
        label: a.name,
      }))}
      searchable
      {...props.formInputProps}
    />
  );
}
