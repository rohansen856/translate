export interface Alphabet {
  index: number
  character: string
  romanization: string
  pronunciation: string
  examples: Array<{
    word: string
    meaning: string
  }>
}

export interface Language {
  code: string
  name: string
  speakers: number
}

export interface Country {
  code: string
  name: string
  population: number
  primaryLanguage: Language
  otherLanguages: Language[]
}
