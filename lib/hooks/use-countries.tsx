"use client"

import { useEffect, useState } from "react"
import { Country } from "@/types"
import axios, { AxiosError } from "axios"

import { toast } from "@/components/ui/use-toast"

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true)
        const res = await axios.get<Country[]>("/api/countries")
        if (res.status === 200) return setCountries(res.data)
        else
          toast({
            title: "Could not get countries",
            description: res.statusText,
            variant: "destructive",
          })
        setCountries([])
      } catch (error) {
        if (error instanceof AxiosError)
          toast({
            title: "Could not get countries",
            description: error.cause?.message,
            variant: "destructive",
          })
        setCountries([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, isLoading }
}
