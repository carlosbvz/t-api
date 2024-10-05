import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import type { Metadata } from "next";
import Commands from "@/components/commands/Commands";

export const metadata: Metadata = {
  title: "T-App",
};

Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: "identityPool" });

export default function App() {
  return (
    // <Authenticator>
    //  <Grid justifyContent={"flex-end"}>
    //   <Button isFullWidth={false} onClick={signOut}>
    //     Sign out
    //   </Button>
    // </Grid>
    // {({ signOut, user }) => (
    <main>
      <Commands />
    </main>
    // )}
    // </Authenticator>
  );
}
