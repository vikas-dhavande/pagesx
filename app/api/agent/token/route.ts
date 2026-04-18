import { createTokenHandler } from "@21st-sdk/nextjs/server"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const handler = createTokenHandler({
  apiKey: process.env.API_KEY_21ST!,
})

export const POST = async (req: Request) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return handler(req)
}
