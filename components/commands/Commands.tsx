"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import CommandCreateForm from "@/ui-components/CommandCreateForm";
import { Flex, Loader } from "@aws-amplify/ui-react";

Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: "identityPool" });

export default function Commands() {
  const [commands, setCommands] = useState<Array<Schema["Command"]["type"]>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function listCommands() {
    client?.models?.Command?.observeQuery()?.subscribe({
      next: (data) => {
        const sortedCommands = [...data?.items].sort(
          (a, b) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
        setCommands(sortedCommands);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listCommands();
  }, []);

  return (

    <Flex direction={"column"} paddingBottom={20}>


      <h2>Send Command</h2>
      <Flex maxWidth={"500px"}>
        <CommandCreateForm width={"100%"} />
      </Flex>

      <h2>Commands</h2>

      {isLoading ? <Loader /> : <pre>{JSON.stringify(commands, null, 2)}</pre>}
    </Flex>

  );
}
