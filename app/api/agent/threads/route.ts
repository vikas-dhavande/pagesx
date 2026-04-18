import { AgentClient } from "@21st-sdk/agent"
import { NextResponse } from "next/server"

const client = new AgentClient({ apiKey: process.env.API_KEY_21ST! })

export async function POST() {
  try {
    const thread = await client.createThread()
    return NextResponse.json(thread)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create thread" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const threads = await client.listThreads()
    return NextResponse.json(threads)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list threads" },
      { status: 500 }
    )
  }
}
