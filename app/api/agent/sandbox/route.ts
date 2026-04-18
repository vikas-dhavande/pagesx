import { AgentClient } from "@21st-sdk/agent"
import { NextResponse } from "next/server"

const client = new AgentClient({ apiKey: process.env.API_KEY_21ST! })

export async function POST() {
  try {
    const sandbox = await client.createSandbox({
      template: "nextjs-starter", // Default template
    })
    return NextResponse.json(sandbox)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create sandbox" },
      { status: 500 }
    )
  }
}
