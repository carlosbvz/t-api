import { NextResponse, NextRequest } from "next/server";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: "identityPool" });

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = Number(searchParams.get("limit")) || 50;
    const nextTokenParam = searchParams.get("nextToken");

    const { data, errors, nextToken } =
      await client.models.Command.listCommandByTypeAndCreatedAt(
        {
          type: "command",
        },
        {
          limit: limitParam,
          nextToken: nextTokenParam,
          sortDirection: "ASC",
        }
      );

    if (errors) throw errors;

    const commands = data;

    return NextResponse.json({ data: { commands }, nextToken });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    const command = await request.json();
    const { action, value } = command;

    if (!client || !client.models || !client.models.Command) {
      throw new Error("Client or Command model is not defined");
    }

    const { data, errors } = await client.models.Command.create({
      value,
      action,
    });

    if (errors) throw errors;
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: "Cannot create action" });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (id) {
      const { errors } = await client.models.Command.delete({
        id,
      });

      if (errors) throw errors;
    } else {
      throw new Error("Cannot performe delete operation. Please provide an id");
    }

    return NextResponse.json({ message: `Delete command with id: ${id}` });
  } catch (error) {
    return NextResponse.json({ error: `Error` });
  }
}
