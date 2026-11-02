"use client";

import { Card, createTheme, Table } from "@mantine/core";

export const theme = createTheme({
  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
      },
    }),
    Table: Table.extend({
      defaultProps: {
        striped: true,
        highlightOnHover: true,
      },
    }),
  },
});
