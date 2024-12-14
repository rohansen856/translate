import { Translate } from "@google-cloud/translate/build/src/v2"
import { z } from "zod"

import { isValidLanguageCode } from "@/lib/validation"

const requestSchema = z.object({
  text: z.string().min(1, "Text to translate is required"),
  targetLang: z.string().length(2, "Invalid language code"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { text, targetLang } = requestSchema.parse(body)
    if (!isValidLanguageCode(targetLang)) {
      return new Response(JSON.stringify({ error: "Invalid language code" }), {
        status: 400,
      })
    }

    const translate = new Translate({
      key: process.env.GOOGLE_TRANSLATE_API_KEY,
    })

    const [translatedText] = await translate.translate(text, targetLang)
    console.log(translatedText)

    return new Response(JSON.stringify({ translatedText }), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.errors,
        }),
        { status: 400 }
      )
    }

    console.error("Error during translation:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    })
  }
}
