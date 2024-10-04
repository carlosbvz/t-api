import { NextResponse } from "next/server";

const commands:any[] = []

export async function GET(request: Request) {
  return NextResponse.json({ data: {commands} })
}

export async function POST(request: Request) {
  try{
    const data = await request.json();
    const command = data.command
    commands.push(command)
 }
 catch(e) {
    /* you error message */
 }
 return NextResponse.json({ foo: "boo" });
}