"use client";

import { Card, createTheme } from "@mantine/core";

export const theme = createTheme({
  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
      },
    }),
  },
});
