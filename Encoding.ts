export type Encoding =
	"UTF-8" |
	"UTF-16" |
	"UTF-32" |
	"ASCII" |
	"CP037" |
	"CP930" |
	"CP1047" |
	"ISO-8859-1" | // Western Europe
	"ISO-8859-2" | // Western and Central Europe
	"ISO-8859-3" | // Western Europe and South European (Turkish, Maltese plus Esperanto)
	"ISO-8859-4" | // Western Europe and Baltic countries (Lithuania, Estonia, Latvia and Lapp)
	"ISO-8859-5" | // Cyrillic alphabet
	"ISO-8859-6" | // Arabic
	"ISO-8859-7" | // Greek
	"ISO-8859-8" | // Hebrew
	"ISO-8859-9" | // Western Europe with amended Turkish character set
	"ISO-8859-10" | //  Western Europe with rationalised character set for Nordic languages, including complete Icelandic set
	"ISO-8859-11" | // Thai
	"ISO-8859-13" | // Baltic languages plus Polish
	"ISO-8859-14" | // Celtic languages (Irish Gaelic, Scottish, Welsh)
	"ISO-8859-15" | // Added the Euro sign and other rationalisations to ISO 8859-1
	"ISO-8859-16" | // Central, Eastern and Southern European languages (Albanian, Bosnian, Croatian, Hungarian, Polish, Romanian, Serbian and Slovenian, but also French, German, Italian and Irish Gaelic)
	"CP437" | "CP720" | "CP737" | "CP850" | "CP852" | "CP855" | "CP857" | "CP858" | "CP860" | "CP861" | "CP862" | "CP863" | "CP865" | "CP866" | "CP869" | "CP872" |
	"Windows-1250" | // Central European languages that use Latin script, (Polish, Czech, Slovak, Hungarian, Slovene, Serbian, Croatian, Bosnian, Romanian and Albanian)
	"Windows-1251" | // Cyrillic alphabets
	"Windows-1252" | // Western languages
	"Windows-1253" | // Greek
	"Windows-1254" | // Turkish
	"Windows-1255" | // Hebrew
	"Windows-1256" | // Arabic
	"Windows-1257" | // Baltic languages
	"Windows-1258" | // Vietnamese
	"Mac OS Roman" |
	"KOI8-R" | "KOI8-U" | "KOI7" |
	"MIK" |
	"ISCII" |
	"TSCII" |
	"VISCII" |
	"Shift_JIS" |
	"EUC-JP" |
	"ISO-2022-JP" |
	"Shift_JIS-2004" |
	"EUC-JIS-2004" |
	"ISO-2022-2004" |
	"GB 2312" |
	"GBK" |
	"GB 18030" |
	"Big5" |
	"HKSCS" |
	"KS X 1001" |
	"EUC-KR" |
	"ISO-2022-KR" |
	"T.51"

	export namespace Encoding {
		const encoding = [
			"UTF-8",
			"UTF-16",
			"UTF-32",
			"US-ASCII",
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
			"CP437", "CP720", "CP737", "CP850", "CP852", "CP855", "CP857", "CP858", "CP860", "CP861", "CP862", "CP863", "CP865", "CP866", "CP869", "CP872",
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
			"KOI8-R", "KOI8-U", "KOI7",
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
			"T.51"
		]
	export function is(value: Encoding | any): value is Encoding {
		return typeof value == "string" && encoding.some(e => e == value)
	}
	export function encode(value: string, encoding: "UTF-8"): Uint8Array {
		return Uint8Array.from(unescape(encodeURIComponent(value)).split(""), c => c.charCodeAt(0))
	}
	export function decode(value: ArrayBufferView | undefined, encoding: "UTF-8"): string {
		return !value ? "" : decodeURIComponent(escape(Array.from(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), c => String.fromCharCode(c)).join("")))
	}
}
