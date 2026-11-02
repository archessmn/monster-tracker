"use client";

import { Stack, Title } from "@mantine/core";
import { use } from "react";

import DrinkTypesTable from "@/app/_components/types-table";
import { api } from "@/trpc/react";

export default function DrinkBrandPage({
  params: paramsPromise,
}: {
  params: Promise<{ brandIdOrSlug: string }>;
}) {
  const params = use(paramsPromise);

  const brand = api.drinkBrands.readAdmin.useQuery({
    brand_id_or_slug: params.brandIdOrSlug,
  });

  return (
    <Stack>
      <Title>{brand.data?.name}</Title>
      <Title order={3}>Drink Types:</Title>
      {brand.data && <DrinkTypesTable hideBrand types={brand.data.types} />}
    </Stack>
  );
}
