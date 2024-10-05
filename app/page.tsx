"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
// import CommandCreateForm from "@/custom-components/CommandCreateForm";
import CommandCreateForm from "@/ui-components/CommandCreateForm";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [commands, setCommands] = useState<Array<Schema["Command"]["type"]>>(
    []
  );

  function listCommands() {
    client?.models?.Command?.observeQuery()?.subscribe({
      next: (data) => {
        const sortedCommands = [...data?.items].sort(
          (a, b) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
        setCommands(sortedCommands);
      },
    });
  }

  useEffect(() => {
    listCommands();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Flex direction={'column'} paddingBottom={20}>
          <Grid justifyContent={"flex-end"}>
            <Button isFullWidth={false} onClick={signOut}>
              Sign out
            </Button>
          </Grid>

          <h2>Send Command</h2>
          <Flex maxWidth={'500px'}>
            <CommandCreateForm width={'100%'} />
          </Flex>

          <h2>Commands</h2>

          <pre>{JSON.stringify(commands, null, 2)}</pre>
          </Flex>
        </main>
      )}
    </Authenticator>
  );
}
