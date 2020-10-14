import { Transcoder } from "./Transcoder"
import { Utf8 } from "./Utf8"
import { Iso88591 } from "./Iso88591"

export type Encoding =
	| "UTF-8"
	| "UTF-16"
	| "UTF-32"
	| "ASCII"
	| "CP037"
	| "CP930"
	| "CP1047"
	| "ISO-8859-1" // Western Europe
	| "ISO-8859-2" // Western and Central Europe
	| "ISO-8859-3" // Western Europe and South European (Turkish, Maltese plus Esperanto)
	| "ISO-8859-4" // Western Europe and Baltic countries (Lithuania, Estonia, Latvia and Lapp)
	| "ISO-8859-5" // Cyrillic alphabet
	| "ISO-8859-6" // Arabic
	| "ISO-8859-7" // Greek
	| "ISO-8859-8" // Hebrew
	| "ISO-8859-9" // Western Europe with amended Turkish character set
	| "ISO-8859-10" //  Western Europe with rationalised character set for Nordic languages, including complete Icelandic set
	| "ISO-8859-11" // Thai
	| "ISO-8859-13" // Baltic languages plus Polish
	| "ISO-8859-14" // Celtic languages (Irish Gaelic, Scottish, Welsh)
	| "ISO-8859-15" // Added the Euro sign and other rationalisations to ISO 8859-1
	| "ISO-8859-16" // Central, Eastern and Southern European languages (Albanian, Bosnian, Croatian, Hungarian, Polish, Romanian, Serbian and Slovenian, but also French, German, Italian and Irish Gaelic)
	| "CP437"
	| "CP720"
	| "CP737"
	| "CP850"
	| "CP852"
	| "CP855"
	| "CP857"
	| "CP858"
	| "CP860"
	| "CP861"
	| "CP862"
	| "CP863"
	| "CP865"
	| "CP866"
	| "CP869"
	| "CP872"
	| "Windows-1250" // Central European languages that use Latin script, (Polish, Czech, Slovak, Hungarian, Slovene, Serbian, Croatian, Bosnian, Romanian and Albanian)
	| "Windows-1251" // Cyrillic alphabets
	| "Windows-1252" // Western languages
	| "Windows-1253" // Greek
	| "Windows-1254" // Turkish
	| "Windows-1255" // Hebrew
	| "Windows-1256" // Arabic
	| "Windows-1257" // Baltic languages
	| "Windows-1258" // Vietnamese
	| "Mac OS Roman"
	| "KOI8-R"
	| "KOI8-U"
	| "KOI7"
	| "MIK"
	| "ISCII"
	| "TSCII"
	| "VISCII"
	| "Shift_JIS"
	| "EUC-JP"
	| "ISO-2022-JP"
	| "Shift_JIS-2004"
	| "EUC-JIS-2004"
	| "ISO-2022-2004"
	| "GB 2312"
	| "GBK"
	| "GB 18030"
	| "Big5"
	| "HKSCS"
	| "KS X 1001"
	| "EUC-KR"
	| "ISO-2022-KR"
	| "T.51"
export namespace Encoding {
	export const values: Encoding[] = [
		"UTF-8",
		"UTF-16",
		"UTF-32",
		"ASCII",
		"CP037",
		"CP930",
		"CP1047",
		"ISO-8859-1", // Western Europe
		"ISO-8859-2", // Western and Central Europe
		"ISO-8859-3", // Western Europe and South European (Turkish, Maltese plus Esperanto)
		"ISO-8859-4", // Western Europe and Baltic countries (Lithuania, Estonia, Latvia and Lapp)
		"ISO-8859-5", // Cyrillic alphabet
		"ISO-8859-6", // Arabic
		"ISO-8859-7", // Greek
		"ISO-8859-8", // Hebrew
		"ISO-8859-9", // Western Europe with amended Turkish character set
		"ISO-8859-10", //  Western Europe with rationalised character set for Nordic languages, including complete Icelandic set
		"ISO-8859-11", // Thai
		"ISO-8859-13", // Baltic languages plus Polish
		"ISO-8859-14", // Celtic languages (Irish Gaelic, Scottish, Welsh)
		"ISO-8859-15", // Added the Euro sign and other rationalisations to ISO 8859-1
		"ISO-8859-16", // Central, Eastern and Southern European languages (Albanian, Bosnian, Croatian, Hungarian, Polish, Romanian, Serbian and Slovenian, but also French, German, Italian and Irish Gaelic)
		"CP437",
		"CP720",
		"CP737",
		"CP850",
		"CP852",
		"CP855",
		"CP857",
		"CP858",
		"CP860",
		"CP861",
		"CP862",
		"CP863",
		"CP865",
		"CP866",
		"CP869",
		"CP872",
		"Windows-1250", // Central European languages that use Latin script, (Polish, Czech, Slovak, Hungarian, Slovene, Serbian, Croatian, Bosnian, Romanian and Albanian)
		"Windows-1251", // Cyrillic alphabets
		"Windows-1252", // Western languages
		"Windows-1253", // Greek
		"Windows-1254", // Turkish
		"Windows-1255", // Hebrew
		"Windows-1256", // Arabic
		"Windows-1257", // Baltic languages
		"Windows-1258", // Vietnamese
		"Mac OS Roman",
		"KOI8-R",
		"KOI8-U",
		"KOI7",
		"MIK",
		"ISCII",
		"TSCII",
		"VISCII",
		"Shift_JIS",
		"EUC-JP",
		"ISO-2022-JP",
		"Shift_JIS-2004",
		"EUC-JIS-2004",
		"ISO-2022-2004",
		"GB 2312",
		"GBK",
		"GB 18030",
		"Big5",
		"HKSCS",
		"KS X 1001",
		"EUC-KR",
		"ISO-2022-KR",
		"T.51",
	]
	export function is(value: Encoding | any): value is Encoding {
		return typeof value == "string" && values.some(v => v == value)
	}
	export function parse(value: string): Encoding | undefined {
		let result: Encoding | undefined
		switch (value.toUpperCase()) {
			case "UTF-8":
			case "UTF8":
			case "UTF 8":
				result = "UTF-8"
				break
			case "UTF-16":
				result = "UTF-16"
				break
			case "UTF-32":
				result = "UTF-32"
				break
			case "US-ASCII":
			case "ASCII":
				result = "ASCII"
				break
			case "CP037":
				result = "CP037"
				break
			case "CP930":
				result = "CP930"
				break
			case "CP1047":
				result = "CP1047"
				break
			case "ISO-IR-100":
			case "CSISOLATIN1":
			case "LATIN1":
			case "LATIN-1":
			case "L1":
			case "IBM819":
			case "CODE PAGE 28591":
			case "WINDOWS-28591":
			case "CODE PAGE 819":
			case "CP819":
			case "CCSID 819":
			case "WE8ISO8859P1":
			case "ISO 8859-1":
			case "ISO-8859-1": // Western Europe
				result = "ISO-8859-1"
				break
			case "ISO-8859-2":
				result = "ISO-8859-2"
				break // Western and Central Europe
			case "ISO-8859-3":
				result = "ISO-8859-3"
				break // Western Europe and South European (Turkish, Maltese plus Esperanto)
			case "ISO-8859-4":
				result = "ISO-8859-4"
				break // Western Europe and Baltic countries (Lithuania, Estonia, Latvia and Lapp)
			case "ISO-8859-5":
				result = "ISO-8859-5"
				break // Cyrillic alphabet
			case "ISO-8859-6":
				result = "ISO-8859-6"
				break // Arabic
			case "ISO-8859-7":
				result = "ISO-8859-7"
				break // Greek
			case "ISO-8859-8":
				result = "ISO-8859-8"
				break // Hebrew
			case "ISO-8859-9":
				result = "ISO-8859-9"
				break // Western Europe with amended Turkish character set
			case "ISO-8859-10":
				result = "ISO-8859-10"
				break //  Western Europe with rationalised character set for Nordic languages, including complete Icelandic set
			case "ISO-8859-11":
				result = "ISO-8859-11"
				break // Thai
			case "ISO-8859-13":
				result = "ISO-8859-13"
				break // Baltic languages plus Polish
			case "ISO-8859-14":
				result = "ISO-8859-14"
				break // Celtic languages (Irish Gaelic, Scottish, Welsh)
			case "ISO-8859-15":
				result = "ISO-8859-15"
				break // Added the Euro sign and other rationalisations to ISO 8859-1
			case "ISO-8859-16":
				result = "ISO-8859-16"
				break // Central, Eastern and Southern European languages (Albanian, Bosnian, Croatian, Hungarian, Polish, Romanian, Serbian and Slovenian, but also French, German, Italian and Irish Gaelic)
			case "CP437":
				result = "CP437"
				break
			case "CP720":
				result = "CP720"
				break
			case "CP737":
				result = "CP737"
				break
			case "CP850":
				result = "CP850"
				break
			case "CP852":
				result = "CP852"
				break
			case "CP855":
				result = "CP855"
				break
			case "CP857":
				result = "CP857"
				break
			case "CP858":
				result = "CP858"
				break
			case "CP860":
				result = "CP860"
				break
			case "CP861":
				result = "CP861"
				break
			case "CP862":
				result = "CP862"
				break
			case "CP863":
				result = "CP863"
				break
			case "CP865":
				result = "CP865"
				break
			case "CP866":
				result = "CP866"
				break
			case "CP869":
				result = "CP869"
				break
			case "CP872":
				result = "CP872"
				break
			case "WINDOWS-1250":
				result = "Windows-1250"
				break // Central European languages that use Latin script, (Polish, Czech, Slovak, Hungarian, Slovene, Serbian, Croatian, Bosnian, Romanian and Albanian)
			case "WINDOWS-1251":
				result = "Windows-1251"
				break // Cyrillic alphabets
			case "WINDOWS-1252":
				result = "Windows-1252"
				break // Western languages
			case "WINDOWS-1253":
				result = "Windows-1253"
				break // Greek
			case "WINDOWS-1254":
				result = "Windows-1254"
				break // Turkish
			case "WINDOWS-1255":
				result = "Windows-1255"
				break // Hebrew
			case "WINDOWS-1256":
				result = "Windows-1256"
				break // Arabic
			case "WINDOWS-1257":
				result = "Windows-1257"
				break // Baltic languages
			case "WINDOWS-1258":
				result = "Windows-1258"
				break // Vietnamese
			case "MAC OS ROMAN":
				result = "Mac OS Roman"
				break
			case "KOI8-R":
				result = "KOI8-R"
				break
			case "KOI8-U":
				result = "KOI8-U"
				break
			case "KOI7":
				result = "KOI7"
				break
			case "MIK":
				result = "MIK"
				break
			case "ISCII":
				result = "ISCII"
				break
			case "TSCII":
				result = "TSCII"
				break
			case "VISCII":
				result = "VISCII"
				break
			case "SHIFT_JIS":
				result = "Shift_JIS"
				break
			case "EUC-JP":
				result = "EUC-JP"
				break
			case "ISO-2022-JP":
				result = "ISO-2022-JP"
				break
			case "SHIFT_JIS-2004":
				result = "Shift_JIS-2004"
				break
			case "EUC-JIS-2004":
				result = "EUC-JIS-2004"
				break
			case "ISO-2022-2004":
				result = "ISO-2022-2004"
				break
			case "GB 2312":
				result = "GB 2312"
				break
			case "GBK":
				result = "GBK"
				break
			case "GB 18030":
				result = "GB 18030"
				break
			case "BIG5":
				result = "Big5"
				break
			case "HKSCS":
				result = "HKSCS"
				break
			case "KS X 1001":
				result = "KS X 1001"
				break
			case "EUC-KR":
				result = "EUC-KR"
				break
			case "ISO-2022-KR":
				result = "ISO-2022-KR"
				break
			case "T.51":
				result = "T.51"
				break
		}
		return result
	}
	export function encode(encoding: "ISO-8859-1" | "UTF-8", data: string): Uint8Array {
		return transcoders[encoding].encode(data)
	}
	export function decode(encoding: "ISO-8859-1" | "UTF-8", data: Uint8Array): string {
		return transcoders[encoding].decode(data)
	}
	const transcoders: { [encoding in "ISO-8859-1" | "UTF-8"]: Transcoder } = {
		"ISO-8859-1": new Iso88591(),
		"UTF-8": new Utf8(),
	}
}
