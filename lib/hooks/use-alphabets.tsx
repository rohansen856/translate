"use client"

import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { toast } from "@/components/ui/use-toast"

interface Alphabet {
  index: number
  character: string
  romanization: string
  pronunciation: string
  examples: Array<{
    word: string
    meaning: string
  }>
}

export function useAlphabets(language: string) {
  const [alphabets, setAlphabets] = useState<Alphabet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if(language.length>=2) fetchAlphabets(language)
    setIsLoading(false)
  }, [language])

  async function fetchAlphabets(lang: string) {
    try {
      console.log(lang)
        const res = await axios.post<Alphabet[]>("/api/alphabets", {lang})
        console.log(res.data)
        if(res.status === 200) return setAlphabets(res.data)
        else toast({
            title: "Could not get alphabets",
            description: res.statusText,
            variant: "destructive"
        })
        setAlphabets([])
    } catch (error) {
        if(error instanceof AxiosError)
            toast({
                title: "Could not get alphabets",
                description: error.cause?.message,
                variant: "destructive"
            })
        setAlphabets([])
    }
  }

  return { alphabets, isLoading }
}
