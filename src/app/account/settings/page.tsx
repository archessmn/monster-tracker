"use client";

import {
  Alert,
  Button,
  Card,
  Code,
  Group,
  Stack,
  Table,
  Title,
  Tooltip,
} from "@mantine/core";
import { UserCard } from "@/app/_components/user-card";
import { api } from "@/trpc/react";
import { authClient } from "@/server/auth/client";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegClipboard } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { useClipboard } from "@mantine/hooks";

export default function ProfilePage() {
  const apiKeys = api.apiKeys.list.useQuery();

  const [newApiKey, setNewApiKey] = useState<string>();

  const apiKeyClipboard = useClipboard();

  return (
    <Stack>
      <UserCard />
      <Card>
        {newApiKey && (
          <Alert
            color="orange"
            title={"New API Key"}
            withCloseButton
            onClose={() => setNewApiKey(undefined)}
            icon={<MdWarning size={32} />}
          >
            This is your new API Key, it will only be shown once so keep it
            safe!
            <br />
            <Tooltip label={apiKeyClipboard.copied ? "Copied!" : "Copy"}>
              <Button
                variant="transparent"
                color={apiKeyClipboard.copied ? "green" : "grey"}
                onClick={() => apiKeyClipboard.copy(newApiKey)}
              >
                <Code>
                  {newApiKey}
                  <FaRegClipboard size={10} />
                </Code>
              </Button>
            </Tooltip>
          </Alert>
        )}
        <Group>
          <Title order={4}>API Keys</Title>
          <Button
            ml={"auto"}
            onClick={async () => {
              const { data, error } = await authClient.apiKey.create({
                name: "Test",
              });

              if (!error) {
                setNewApiKey(data.key);
                notifications.show({
                  message: "API Key Created",
                  color: "green",
                });

                apiKeys.refetch();
              }
            }}
          >
            Create
          </Button>
        </Group>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Last Used</Table.Th>
              <Table.Th w={1}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {apiKeys.data &&
              apiKeys.data.apiKeys.map((apiKey) => (
                <Table.Tr key={apiKey.id}>
                  <Table.Td>{apiKey.name}</Table.Td>
                  <Table.Td>
                    {apiKey.lastRequest
                      ? dayjs(apiKey.lastRequest).format()
                      : "Never"}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      onClick={async () => {
                        const { data, error } = await authClient.apiKey.delete({
                          keyId: apiKey.id,
                        });

                        if (!error) {
                          notifications.show({
                            message: "Revoked API Key Successfully",
                            color: "green",
                          });
                          apiKeys.refetch();
                        }
                      }}
                      size="xs"
                      color="red"
                    >
                      Revoke
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}
