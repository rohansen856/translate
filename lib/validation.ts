export function isValidLanguageCode(code: string): boolean {
  const validLanguageCodes = new Set([
    "ab",
    "aa",
    "af",
    "ak",
    "sq",
    "am",
    "ar",
    "an",
    "hy",
    "as",
    "av",
    "ae",
    "ay",
    "az",
    "bm",
    "ba",
    "eu",
    "be",
    "bn",
    "bh",
    "bi",
    "bs",
    "br",
    "bg",
    "my",
    "ca",
    "ch",
    "ce",
    "zh",
    "cu",
    "cv",
    "kw",
    "co",
    "cr",
    "cs",
    "da",
    "dv",
    "nl",
    "dz",
    "en",
    "eo",
    "et",
    "ee",
    "fo",
    "fj",
    "fi",
    "fr",
    "fy",
    "ff",
    "gd",
    "gl",
    "lg",
    "ka",
    "de",
    "el",
    "kl",
    "gn",
    "gu",
    "ht",
    "ha",
    "he",
    "hz",
    "hi",
    "ho",
    "hr",
    "hu",
    "ig",
    "is",
    "io",
    "ii",
    "iu",
    "ie",
    "ia",
    "id",
    "ik",
    "it",
    "jv",
    "ja",
    "kn",
    "ks",
    "kr",
    "kk",
    "km",
    "ki",
    "rw",
    "ky",
    "kv",
    "kg",
    "ko",
    "kj",
    "ku",
    "lo",
    "la",
    "lv",
    "li",
    "ln",
    "lt",
    "lb",
    "lu",
    "mk",
    "mg",
    "ms",
    "ml",
    "mt",
    "mi",
    "mr",
    "mh",
    "mn",
    "na",
    "nv",
    "nd",
    "nr",
    "ng",
    "ne",
    "nn",
    "nb",
    "no",
    "ny",
    "oc",
    "oj",
    "or",
    "om",
    "os",
    "pa",
    "pi",
    "pl",
    "pt",
    "ps",
    "qu",
    "rm",
    "ro",
    "rn",
    "ru",
    "sg",
    "sa",
    "si",
    "sk",
    "sl",
    "se",
    "sm",
    "sn",
    "sd",
    "so",
    "st",
    "es",
    "sc",
    "sr",
    "ss",
    "su",
    "sw",
    "sv",
    "ty",
    "ta",
    "tt",
    "te",
    "tg",
    "tl",
    "th",
    "bo",
    "ti",
    "to",
    "tn",
    "ts",
    "tk",
    "tr",
    "tw",
    "ug",
    "uk",
    "ur",
    "uz",
    "ve",
    "vi",
    "vo",
    "wa",
    "cy",
    "wo",
    "xh",
    "yi",
    "yo",
    "za",
    "zu",
  ])

  return validLanguageCodes.has(code.toLowerCase())
}

function isValidCountryCode(code: string): boolean {
  const validCountryCodes = new Set([
    "AF",
    "AX",
    "AL",
    "DZ",
    "AS",
    "AD",
    "AO",
    "AI",
    "AQ",
    "AG",
    "AR",
    "AM",
    "AW",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BM",
    "BT",
    "BO",
    "BQ",
    "BA",
    "BW",
    "BV",
    "BR",
    "IO",
    "BN",
    "BG",
    "BF",
    "BI",
    "CV",
    "KH",
    "CM",
    "CA",
    "KY",
    "CF",
    "TD",
    "CL",
    "CN",
    "CX",
    "CC",
    "CO",
    "KM",
    "CD",
    "CG",
    "CK",
    "CR",
    "CI",
    "HR",
    "CU",
    "CW",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "SZ",
    "ET",
    "FK",
    "FO",
    "FJ",
    "FI",
    "FR",
    "GF",
    "PF",
    "TF",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GI",
    "GR",
    "GL",
    "GD",
    "GP",
    "GU",
    "GT",
    "GG",
    "GN",
    "GW",
    "GY",
    "HT",
    "HM",
    "VA",
    "HN",
    "HK",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IM",
    "IL",
    "IT",
    "JM",
    "JP",
    "JE",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KP",
    "KR",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MO",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MQ",
    "MR",
    "MU",
    "YT",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MS",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NC",
    "NZ",
    "NI",
    "NE",
    "NG",
    "NU",
    "NF",
    "MK",
    "MP",
    "NO",
    "OM",
    "PK",
    "PW",
    "PS",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PN",
    "PL",
    "PT",
    "PR",
    "QA",
    "RE",
    "RO",
    "RU",
    "RW",
    "BL",
    "SH",
    "KN",
    "LC",
    "MF",
    "PM",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SX",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "GS",
    "SS",
    "ES",
    "LK",
    "SD",
    "SR",
    "SJ",
    "SE",
    "CH",
    "SY",
    "TW",
    "TJ",
    "TZ",
    "TH",
    "TL",
    "TG",
    "TK",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TC",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UM",
    "UY",
    "UZ",
    "VU",
    "VE",
    "VN",
    "VG",
    "VI",
    "WF",
    "EH",
    "YE",
    "ZM",
    "ZW",
  ])

  return validCountryCodes.has(code.toUpperCase())
}
