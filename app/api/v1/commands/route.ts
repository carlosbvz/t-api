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

    const { data, errors, nextToken } = await client.models.Command.list({
      limit: limitParam,
      nextToken: nextTokenParam,
    });
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
    const data = await request.json();
    const command = data.command;
    // commands.push(command)
  } catch (e) {
    /* you error message */
  }
  return NextResponse.json({ foo: "boo" });
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (id) {
      const {data, errors} = await client.models.Command.delete({
        id,
      });
      
      if (errors) throw errors
    } else {
      throw new Error("Cannot performe delete operation. Please provide an id");
    }

    return NextResponse.json({ message: `Delete command with id: ${id}` });
  } catch (error) {
    return NextResponse.json({ error: `Error` });
  }
}
