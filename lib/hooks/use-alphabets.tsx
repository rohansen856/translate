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
const alphabetData: Record<string, Alphabet[]> = {
  ja: [
    { index: 1, character: "あ", romanization: "a", pronunciation: "ah", examples: [ { word: "あめ (ame)", meaning: "rain" }, { word: "あか (aka)", meaning: "red" } ] },
    { index: 2, character: "い", romanization: "i", pronunciation: "ee", examples: [ { word: "いぬ (inu)", meaning: "dog" }, { word: "いし (ishi)", meaning: "stone" } ] },
    { index: 3, character: "う", romanization: "u", pronunciation: "oo", examples: [ { word: "うみ (umi)", meaning: "sea" }, { word: "うた (uta)", meaning: "song" } ] },
    { index: 4, character: "え", romanization: "e", pronunciation: "eh", examples: [ { word: "えき (eki)", meaning: "station" }, { word: "えん (en)", meaning: "yen" } ] },
    { index: 5, character: "お", romanization: "o", pronunciation: "oh", examples: [ { word: "おか (oka)", meaning: "hill" }, { word: "おんがく (ongaku)", meaning: "music" } ] },
    { index: 6, character: "か", romanization: "ka", pronunciation: "kah", examples: [ { word: "かさ (kasa)", meaning: "umbrella" }, { word: "かわ (kawa)", meaning: "river" } ] },
    { index: 7, character: "き", romanization: "ki", pronunciation: "kee", examples: [ { word: "き (ki)", meaning: "tree" }, { word: "きもの (kimono)", meaning: "kimono" } ] },
    { index: 8, character: "く", romanization: "ku", pronunciation: "koo", examples: [ { word: "くも (kumo)", meaning: "cloud" }, { word: "くるま (kuruma)", meaning: "car" } ] },
    { index: 9, character: "け", romanization: "ke", pronunciation: "keh", examples: [ { word: "けむり (kemuri)", meaning: "smoke" }, { word: "けん (ken)", meaning: "sword" } ] },
    { index: 10, character: "こ", romanization: "ko", pronunciation: "koh", examples: [ { word: "こころ (kokoro)", meaning: "heart" }, { word: "こと (koto)", meaning: "thing" } ] },
    { index: 11, character: "さ", romanization: "sa", pronunciation: "sah", examples: [ { word: "さくら (sakura)", meaning: "cherry blossom" }, { word: "さけ (sake)", meaning: "alcohol" } ] },
    { index: 12, character: "し", romanization: "shi", pronunciation: "shee", examples: [ { word: "しま (shima)", meaning: "island" }, { word: "しお (shio)", meaning: "salt" } ] },
    { index: 13, character: "す", romanization: "su", pronunciation: "soo", examples: [ { word: "すいか (suika)", meaning: "watermelon" }, { word: "すし (sushi)", meaning: "sushi" } ] },
    { index: 14, character: "せ", romanization: "se", pronunciation: "seh", examples: [ { word: "せき (seki)", meaning: "cough" }, { word: "せんせい (sensei)", meaning: "teacher" } ] },
    { index: 15, character: "そ", romanization: "so", pronunciation: "soh", examples: [ { word: "そと (soto)", meaning: "outside" }, { word: "そば (soba)", meaning: "buckwheat noodles" } ] },
    { index: 92, character: "ン", romanization: "n", pronunciation: "n", examples: [ { word: "オン (on)", meaning: "sound" }, { word: "サン (san)", meaning: "three" } ] }
    ],
  ko: [
    {
      index: 1,
      character: "ㄱ",
      romanization: "g/k",
      pronunciation: "giyeok",
      examples: [
        { word: "강 (gang)", meaning: "river" },
        { word: "귤 (gyul)", meaning: "tangerine" },
      ],
    },
    {
      index: 2,
      character: "ㄴ",
      romanization: "n",
      pronunciation: "nieun",
      examples: [
        { word: "나무 (namu)", meaning: "tree" },
        { word: "눈 (nun)", meaning: "snow/eye" },
      ],
    },
  ],
  zh: [
    {
      index: 1,
      character: "爱",
      romanization: "ài",
      pronunciation: "eye",
      examples: [
        { word: "爱心 (àixīn)", meaning: "love" },
        { word: "可爱 (kě'ài)", meaning: "cute" },
      ],
    },
    {
      index: 2,
      character: "北",
      romanization: "běi",
      pronunciation: "bay",
      examples: [
        { word: "北京 (Běijīng)", meaning: "Beijing" },
        { word: "北方 (běifāng)", meaning: "north" },
      ],
    },
  ],
};

export function useAlphabets(language: string) {
  const [alphabets, setAlphabets] = useState<Alphabet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchAlphabets("ja")
    setIsLoading(false)
  }, [language])

  async function fetchAlphabets(lang: string) {
    try {
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
