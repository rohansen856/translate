import { z } from "zod"

export async function GET(req: Request) {
  try {
    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/countries/data.json`

    const response = await fetch(fileUrl)
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Data for countries not found.` }),
        { status: 403 }
      )
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 403,
      })
    }
    console.log(error)
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    })
  }
}
