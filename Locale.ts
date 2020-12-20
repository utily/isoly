import { Alpha2 } from "./CountryCode"
import { Language } from "./Language"
export type Locale =
	| "af-ZA"
	| "am-ET"
	| "ar-AE"
	| "ar-BH"
	| "ar-DZ"
	| "ar-EG"
	| "ar-IQ"
	| "ar-JO"
	| "ar-KW"
	| "ar-LB"
	| "ar-LY"
	| "ar-MA"
	| "arn-CL"
	| "ar-OM"
	| "ar-QA"
	| "ar-SA"
	| "ar-SY"
	| "ar-TN"
	| "ar-YE"
	| "as-IN"
	| "az-Cyrl-AZ"
	| "az-Latn-AZ"
	| "ba-RU"
	| "be-BY"
	| "bg-BG"
	| "bn-BD"
	| "bn-IN"
	| "bo-CN"
	| "br-FR"
	| "bs-Cyrl-BA"
	| "bs-Latn-BA"
	| "ca-ES"
	| "co-FR"
	| "cs-CZ"
	| "cy-GB"
	| "da-DK"
	| "de-AT"
	| "de-CH"
	| "de-DE"
	| "de-LI"
	| "de-LU"
	| "dsb-DE"
	| "dv-MV"
	| "el-GR"
	| "en-029"
	| "en-AU"
	| "en-BZ"
	| "en-CA"
	| "en-GB"
	| "en-IE"
	| "en-IN"
	| "en-JM"
	| "en-MY"
	| "en-NZ"
	| "en-PH"
	| "en-SG"
	| "en-TT"
	| "en-US"
	| "en-ZA"
	| "en-ZW"
	| "es-AR"
	| "es-BO"
	| "es-CL"
	| "es-CO"
	| "es-CR"
	| "es-DO"
	| "es-EC"
	| "es-ES"
	| "es-GT"
	| "es-HN"
	| "es-MX"
	| "es-NI"
	| "es-PA"
	| "es-PE"
	| "es-PR"
	| "es-PY"
	| "es-SV"
	| "es-US"
	| "es-UY"
	| "es-VE"
	| "et-EE"
	| "eu-ES"
	| "fa-IR"
	| "fi-FI"
	| "fil-PH"
	| "fo-FO"
	| "fr-BE"
	| "fr-CA"
	| "fr-CH"
	| "fr-FR"
	| "fr-LU"
	| "fr-MC"
	| "fy-NL"
	| "ga-IE"
	| "gd-GB"
	| "gl-ES"
	| "gsw-FR"
	| "gu-IN"
	| "ha-Latn-NG"
	| "he-IL"
	| "hi-IN"
	| "hr-BA"
	| "hr-HR"
	| "hsb-DE"
	| "hu-HU"
	| "hy-AM"
	| "id-ID"
	| "ig-NG"
	| "ii-CN"
	| "is-IS"
	| "it-CH"
	| "it-IT"
	| "iu-Cans-CA"
	| "iu-Latn-CA"
	| "ja-JP"
	| "ka-GE"
	| "kk-KZ"
	| "kl-GL"
	| "km-KH"
	| "kn-IN"
	| "kok-IN"
	| "ko-KR"
	| "ky-KG"
	| "lb-LU"
	| "lo-LA"
	| "lt-LT"
	| "lv-LV"
	| "mi-NZ"
	| "mk-MK"
	| "ml-IN"
	| "mn-MN"
	| "mn-Mong-CN"
	| "moh-CA"
	| "mr-IN"
	| "ms-BN"
	| "ms-MY"
	| "mt-MT"
	| "nb-NO"
	| "ne-NP"
	| "nl-BE"
	| "nl-NL"
	| "nn-NO"
	| "nso-ZA"
	| "oc-FR"
	| "or-IN"
	| "pa-IN"
	| "pl-PL"
	| "prs-AF"
	| "ps-AF"
	| "pt-BR"
	| "pt-PT"
	| "qut-GT"
	| "quz-BO"
	| "quz-EC"
	| "quz-PE"
	| "rm-CH"
	| "ro-RO"
	| "ru-RU"
	| "rw-RW"
	| "sah-RU"
	| "sa-IN"
	| "se-FI"
	| "se-NO"
	| "se-SE"
	| "si-LK"
	| "sk-SK"
	| "sl-SI"
	| "sma-NO"
	| "sma-SE"
	| "smj-NO"
	| "smj-SE"
	| "smn-FI"
	| "sms-FI"
	| "sq-AL"
	| "sr-Cyrl-BA"
	| "sr-Cyrl-CS"
	| "sr-Cyrl-ME"
	| "sr-Cyrl-RS"
	| "sr-Latn-BA"
	| "sr-Latn-CS"
	| "sr-Latn-ME"
	| "sr-Latn-RS"
	| "sv-FI"
	| "sv-SE"
	| "sw-KE"
	| "syr-SY"
	| "ta-IN"
	| "te-IN"
	| "tg-Cyrl-TJ"
	| "th-TH"
	| "tk-TM"
	| "tn-ZA"
	| "tr-TR"
	| "tt-RU"
	| "tzm-Latn-DZ"
	| "ug-CN"
	| "uk-UA"
	| "ur-PK"
	| "uz-Cyrl-UZ"
	| "uz-Latn-UZ"
	| "vi-VN"
	| "wo-SN"
	| "xh-ZA"
	| "yo-NG"
	| "zh-CN"
	| "zh-HK"
	| "zh-MO"
	| "zh-SG"
	| "zh-TW"
	| "zu-ZA"

export namespace Locale {
	export function is(value: Locale | any): value is Locale {
		return (
			value == "af-ZA" ||
			value == "am-ET" ||
			value == "ar-AE" ||
			value == "ar-BH" ||
			value == "ar-DZ" ||
			value == "ar-EG" ||
			value == "ar-IQ" ||
			value == "ar-JO" ||
			value == "ar-KW" ||
			value == "ar-LB" ||
			value == "ar-LY" ||
			value == "ar-MA" ||
			value == "arn-CL" ||
			value == "ar-OM" ||
			value == "ar-QA" ||
			value == "ar-SA" ||
			value == "ar-SY" ||
			value == "ar-TN" ||
			value == "ar-YE" ||
			value == "as-IN" ||
			value == "az-AZ" ||
			value == "az-Cyrl-AZ" ||
			value == "az-Latn-AZ" ||
			value == "ba-RU" ||
			value == "be-BY" ||
			value == "bg-BG" ||
			value == "bn-BD" ||
			value == "bn-IN" ||
			value == "bo-CN" ||
			value == "br-FR" ||
			value == "bs-BA" ||
			value == "bs-Cyrl-BA" ||
			value == "bs-Latn-BA" ||
			value == "ca-ES" ||
			value == "co-FR" ||
			value == "cs-CZ" ||
			value == "cy-GB" ||
			value == "da-DK" ||
			value == "de-AT" ||
			value == "de-CH" ||
			value == "de-DE" ||
			value == "de-LI" ||
			value == "de-LU" ||
			value == "dsb-DE" ||
			value == "dv-MV" ||
			value == "el-GR" ||
			value == "en-029" ||
			value == "en-AU" ||
			value == "en-BZ" ||
			value == "en-CA" ||
			value == "en-GB" ||
			value == "en-IE" ||
			value == "en-IN" ||
			value == "en-JM" ||
			value == "en-MY" ||
			value == "en-NZ" ||
			value == "en-PH" ||
			value == "en-SG" ||
			value == "en-TT" ||
			value == "en-US" ||
			value == "en-ZA" ||
			value == "en-ZW" ||
			value == "es-AR" ||
			value == "es-BO" ||
			value == "es-CL" ||
			value == "es-CO" ||
			value == "es-CR" ||
			value == "es-DO" ||
			value == "es-EC" ||
			value == "es-ES" ||
			value == "es-GT" ||
			value == "es-HN" ||
			value == "es-MX" ||
			value == "es-NI" ||
			value == "es-PA" ||
			value == "es-PE" ||
			value == "es-PR" ||
			value == "es-PY" ||
			value == "es-SV" ||
			value == "es-US" ||
			value == "es-UY" ||
			value == "es-VE" ||
			value == "et-EE" ||
			value == "eu-ES" ||
			value == "fa-IR" ||
			value == "fi-FI" ||
			value == "fil-PH" ||
			value == "fo-FO" ||
			value == "fr-BE" ||
			value == "fr-CA" ||
			value == "fr-CH" ||
			value == "fr-FR" ||
			value == "fr-LU" ||
			value == "fr-MC" ||
			value == "fy-NL" ||
			value == "ga-IE" ||
			value == "gd-GB" ||
			value == "gl-ES" ||
			value == "gsw-FR" ||
			value == "gu-IN" ||
			value == "ha-Latn-NG" ||
			value == "he-IL" ||
			value == "hi-IN" ||
			value == "hr-BA" ||
			value == "hr-HR" ||
			value == "hsb-DE" ||
			value == "hu-HU" ||
			value == "hy-AM" ||
			value == "id-ID" ||
			value == "ig-NG" ||
			value == "ii-CN" ||
			value == "is-IS" ||
			value == "it-CH" ||
			value == "it-IT" ||
			value == "iu-Cans-CA" ||
			value == "iu-Latn-CA" ||
			value == "ja-JP" ||
			value == "ka-GE" ||
			value == "kk-KZ" ||
			value == "kl-GL" ||
			value == "km-KH" ||
			value == "kn-IN" ||
			value == "kok-IN" ||
			value == "ko-KR" ||
			value == "ky-KG" ||
			value == "lb-LU" ||
			value == "lo-LA" ||
			value == "lt-LT" ||
			value == "lv-LV" ||
			value == "mi-NZ" ||
			value == "mk-MK" ||
			value == "ml-IN" ||
			value == "mn-MN" ||
			value == "mn-Mong-CN" ||
			value == "moh-CA" ||
			value == "mr-IN" ||
			value == "ms-BN" ||
			value == "ms-MY" ||
			value == "mt-MT" ||
			value == "nb-NO" ||
			value == "ne-NP" ||
			value == "nl-BE" ||
			value == "nl-NL" ||
			value == "nn-NO" ||
			value == "nso-ZA" ||
			value == "oc-FR" ||
			value == "or-IN" ||
			value == "pa-IN" ||
			value == "pl-PL" ||
			value == "prs-AF" ||
			value == "ps-AF" ||
			value == "pt-BR" ||
			value == "pt-PT" ||
			value == "qut-GT" ||
			value == "quz-BO" ||
			value == "quz-EC" ||
			value == "quz-PE" ||
			value == "rm-CH" ||
			value == "ro-RO" ||
			value == "ru-RU" ||
			value == "rw-RW" ||
			value == "sah-RU" ||
			value == "sa-IN" ||
			value == "se-FI" ||
			value == "se-NO" ||
			value == "se-SE" ||
			value == "si-LK" ||
			value == "sk-SK" ||
			value == "sl-SI" ||
			value == "sma-NO" ||
			value == "sma-SE" ||
			value == "smj-NO" ||
			value == "smj-SE" ||
			value == "smn-FI" ||
			value == "sms-FI" ||
			value == "sq-AL" ||
			value == "sr-BA" ||
			value == "sr-CS" ||
			value == "sr-ME" ||
			value == "sr-RS" ||
			value == "sr-Cyrl-BA" ||
			value == "sr-Cyrl-CS" ||
			value == "sr-Cyrl-ME" ||
			value == "sr-Cyrl-RS" ||
			value == "sr-Latn-BA" ||
			value == "sr-Latn-CS" ||
			value == "sr-Latn-ME" ||
			value == "sr-Latn-RS" ||
			value == "sv-FI" ||
			value == "sv-SE" ||
			value == "sw-KE" ||
			value == "syr-SY" ||
			value == "ta-IN" ||
			value == "te-IN" ||
			value == "tg-TJ" ||
			value == "tg-Cyrl-TJ" ||
			value == "th-TH" ||
			value == "tk-TM" ||
			value == "tn-ZA" ||
			value == "tr-TR" ||
			value == "tt-RU" ||
			value == "tzm-DZ" ||
			value == "tzm-Latn-DZ" ||
			value == "ug-CN" ||
			value == "uk-UA" ||
			value == "ur-PK" ||
			value == "uz-UZ" ||
			value == "uz-Cyrl-UZ" ||
			value == "uz-Latn-UZ" ||
			value == "vi-VN" ||
			value == "wo-SN" ||
			value == "xh-ZA" ||
			value == "yo-NG" ||
			value == "zh-CN" ||
			value == "zh-HK" ||
			value == "zh-MO" ||
			value == "zh-SG" ||
			value == "zh-TW" ||
			value == "zu-ZA"
		)
	}
	export function toLanguage(locale: Locale): Language | undefined {
		const result = locale.split("-").shift()
		return Language.is(result) ? result : undefined
	}
	export function toAlpha2(locale: Locale): Alpha2 | undefined {
		const result = locale.split("-").pop()
		return Alpha2.is(result) ? result : undefined
	}
	export function toLocale(language: Language, alpha2: Alpha2): Locale | undefined {
		const result = language + "-" + alpha2
		return is(result) ? result : undefined
	}
}
