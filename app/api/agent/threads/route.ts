import { AgentClient } from "@21st-sdk/node"
import { NextResponse } from "next/server"

const client = new AgentClient({ apiKey: process.env.API_KEY_21ST! })

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    if (!sandboxId) {
      return NextResponse.json({ error: "sandboxId is required" }, { status: 400 })
    }
    const thread = await client.threads.create({ sandboxId })
    return NextResponse.json(thread)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create thread" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sandboxId = searchParams.get("sandboxId")
    if (!sandboxId) {
      return NextResponse.json({ error: "sandboxId is required" }, { status: 400 })
    }
    const threads = await client.threads.list({ sandboxId })
    return NextResponse.json(threads)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list threads" },
      { status: 500 }
    )
  }
}
