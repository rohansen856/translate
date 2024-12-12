import { z } from "zod";

const requestSchema = z.object({
  lang: z.string().min(1, "Language parameter is required.").max(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { lang } = requestSchema.parse(body);

    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${lang}.json`;

    const response = await fetch(fileUrl);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Data for language '${lang}' not found.` }), {status: 403})
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {status: 200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {status: 403})
    }
    console.log(error)
    return new Response(JSON.stringify({ error: "Internal server error." }), {status: 500})
  }
}
