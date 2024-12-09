export type Language =
	| "ab"
	| "aa"
	| "af"
	| "ak"
	| "sq"
	| "am"
	| "ar"
	| "an"
	| "hy"
	| "as"
	| "av"
	| "ae"
	| "ay"
	| "az"
	| "bm"
	| "ba"
	| "eu"
	| "be"
	| "bn"
	| "bh"
	| "bi"
	| "bs"
	| "br"
	| "bg"
	| "my"
	| "ca"
	| "ch"
	| "ce"
	| "ny"
	| "zh"
	| "cv"
	| "kw"
	| "co"
	| "cr"
	| "hr"
	| "cs"
	| "da"
	| "dv"
	| "nl"
	| "dz"
	| "en"
	| "eo"
	| "et"
	| "ee"
	| "fo"
	| "fj"
	| "fi"
	| "fr"
	| "ff"
	| "gl"
	| "ka"
	| "de"
	| "el"
	| "gn"
	| "gu"
	| "ht"
	| "ha"
	| "he"
	| "hz"
	| "hi"
	| "ho"
	| "hu"
	| "ia"
	| "id"
	| "ie"
	| "ga"
	| "ig"
	| "ik"
	| "io"
	| "is"
	| "it"
	| "iu"
	| "ja"
	| "jv"
	| "kl"
	| "kn"
	| "kr"
	| "ks"
	| "kk"
	| "km"
	| "ki"
	| "rw"
	| "ky"
	| "kv"
	| "kg"
	| "ko"
	| "ku"
	| "kj"
	| "la"
	| "lb"
	| "lg"
	| "li"
	| "ln"
	| "lo"
	| "lt"
	| "lu"
	| "lv"
	| "gv"
	| "mk"
	| "mg"
	| "ms"
	| "ml"
	| "mt"
	| "mi"
	| "mr"
	| "mh"
	| "mn"
	| "na"
	| "nv"
	| "nd"
	| "ne"
	| "ng"
	| "nb"
	| "nn"
	| "no"
	| "ii"
	| "nr"
	| "oc"
	| "oj"
	| "cu"
	| "om"
	| "or"
	| "os"
	| "pa"
	| "pi"
	| "fa"
	| "pl"
	| "ps"
	| "pt"
	| "qu"
	| "rm"
	| "rn"
	| "ro"
	| "ru"
	| "sa"
	| "sc"
	| "sd"
	| "se"
	| "sm"
	| "sg"
	| "sr"
	| "gd"
	| "sn"
	| "si"
	| "sk"
	| "sl"
	| "so"
	| "st"
	| "es"
	| "su"
	| "sw"
	| "ss"
	| "sv"
	| "ta"
	| "te"
	| "tg"
	| "th"
	| "ti"
	| "bo"
	| "tk"
	| "tl"
	| "tn"
	| "to"
	| "tr"
	| "ts"
	| "tt"
	| "tw"
	| "ty"
	| "ug"
	| "uk"
	| "ur"
	| "uz"
	| "ve"
	| "vi"
	| "vo"
	| "wa"
	| "cy"
	| "wo"
	| "fy"
	| "xh"
	| "yi"
	| "yo"
	| "za"
	| "zu"

export namespace Language {
	export function is(value: Language | any): value is Language {
		return (
			typeof value == "string" &&
			(value == "ab" ||
				value == "aa" ||
				value == "af" ||
				value == "ak" ||
				value == "sq" ||
				value == "am" ||
				value == "ar" ||
				value == "an" ||
				value == "hy" ||
				value == "as" ||
				value == "av" ||
				value == "ae" ||
				value == "ay" ||
				value == "az" ||
				value == "bm" ||
				value == "ba" ||
				value == "eu" ||
				value == "be" ||
				value == "bn" ||
				value == "bh" ||
				value == "bi" ||
				value == "bs" ||
				value == "br" ||
				value == "bg" ||
				value == "my" ||
				value == "ca" ||
				value == "ch" ||
				value == "ce" ||
				value == "ny" ||
				value == "zh" ||
				value == "cv" ||
				value == "kw" ||
				value == "co" ||
				value == "cr" ||
				value == "hr" ||
				value == "cs" ||
				value == "da" ||
				value == "dv" ||
				value == "nl" ||
				value == "dz" ||
				value == "en" ||
				value == "eo" ||
				value == "et" ||
				value == "ee" ||
				value == "fo" ||
				value == "fj" ||
				value == "fi" ||
				value == "fr" ||
				value == "ff" ||
				value == "gl" ||
				value == "ka" ||
				value == "de" ||
				value == "el" ||
				value == "gn" ||
				value == "gu" ||
				value == "ht" ||
				value == "ha" ||
				value == "he" ||
				value == "hz" ||
				value == "hi" ||
				value == "ho" ||
				value == "hu" ||
				value == "ia" ||
				value == "id" ||
				value == "ie" ||
				value == "ga" ||
				value == "ig" ||
				value == "ik" ||
				value == "io" ||
				value == "is" ||
				value == "it" ||
				value == "iu" ||
				value == "ja" ||
				value == "jv" ||
				value == "kl" ||
				value == "kn" ||
				value == "kr" ||
				value == "ks" ||
				value == "kk" ||
				value == "km" ||
				value == "ki" ||
				value == "rw" ||
				value == "ky" ||
				value == "kv" ||
				value == "kg" ||
				value == "ko" ||
				value == "ku" ||
				value == "kj" ||
				value == "la" ||
				value == "lb" ||
				value == "lg" ||
				value == "li" ||
				value == "ln" ||
				value == "lo" ||
				value == "lt" ||
				value == "lu" ||
				value == "lv" ||
				value == "gv" ||
				value == "mk" ||
				value == "mg" ||
				value == "ms" ||
				value == "ml" ||
				value == "mt" ||
				value == "mi" ||
				value == "mr" ||
				value == "mh" ||
				value == "mn" ||
				value == "na" ||
				value == "nv" ||
				value == "nd" ||
				value == "ne" ||
				value == "ng" ||
				value == "nb" ||
				value == "nn" ||
				value == "no" ||
				value == "ii" ||
				value == "nr" ||
				value == "oc" ||
				value == "oj" ||
				value == "cu" ||
				value == "om" ||
				value == "or" ||
				value == "os" ||
				value == "pa" ||
				value == "pi" ||
				value == "fa" ||
				value == "pl" ||
				value == "ps" ||
				value == "pt" ||
				value == "qu" ||
				value == "rm" ||
				value == "rn" ||
				value == "ro" ||
				value == "ru" ||
				value == "sa" ||
				value == "sc" ||
				value == "sd" ||
				value == "se" ||
				value == "sm" ||
				value == "sg" ||
				value == "sr" ||
				value == "gd" ||
				value == "sn" ||
				value == "si" ||
				value == "sk" ||
				value == "sl" ||
				value == "so" ||
				value == "st" ||
				value == "es" ||
				value == "su" ||
				value == "sw" ||
				value == "ss" ||
				value == "sv" ||
				value == "ta" ||
				value == "te" ||
				value == "tg" ||
				value == "th" ||
				value == "ti" ||
				value == "bo" ||
				value == "tk" ||
				value == "tl" ||
				value == "tn" ||
				value == "to" ||
				value == "tr" ||
				value == "ts" ||
				value == "tt" ||
				value == "tw" ||
				value == "ty" ||
				value == "ug" ||
				value == "uk" ||
				value == "ur" ||
				value == "uz" ||
				value == "ve" ||
				value == "vi" ||
				value == "vo" ||
				value == "wa" ||
				value == "cy" ||
				value == "wo" ||
				value == "fy" ||
				value == "xh" ||
				value == "yi" ||
				value == "yo" ||
				value == "za" ||
				value == "zu")
		)
	}
	export function toName(language: Language): string {
		return {
			ab: "Abkhazian",
			aa: "Afar",
			af: "Afrikaans",
			ak: "Akan",
			sq: "Albanian",
			am: "Amharic",
			ar: "Arabic",
			an: "Aragonese",
			hy: "Armenian",
			as: "Assamese",
			av: "Avaric",
			ae: "Avestan",
			ay: "Aymara",
			az: "Azerbaijani",
			bm: "Bambara",
			ba: "Bashkir",
			eu: "Basque",
			be: "Belarusian",
			bn: "Bengali",
			bh: "Bihari languages",
			bi: "Bislama",
			bs: "Bosnian",
			br: "Breton",
			bg: "Bulgarian",
			my: "Burmese",
			ca: "Catalan, Valencian",
			ch: "Chamorro",
			ce: "Chechen",
			ny: "Chichewa, Chewa, Nyanja",
			zh: "Chinese",
			cv: "Chuvash",
			kw: "Cornish",
			co: "Corsican",
			cr: "Cree",
			hr: "Croatian",
			cs: "Czech",
			da: "Danish",
			dv: "Divehi, Dhivehi, Maldivian",
			nl: "Dutch, Flemish",
			dz: "Dzongkha",
			en: "English",
			eo: "Esperanto",
			et: "Estonian",
			ee: "Ewe",
			fo: "Faroese",
			fj: "Fijian",
			fi: "Finnish",
			fr: "French",
			ff: "Fulah",
			gl: "Galician",
			ka: "Georgian",
			de: "German",
			el: "Greek, Modern (1453-)",
			gn: "Guarani",
			gu: "Gujarati",
			ht: "Haitian, Haitian Creole",
			ha: "Hausa",
			he: "Hebrew",
			hz: "Herero",
			hi: "Hindi",
			ho: "Hiri Motu",
			hu: "Hungarian",
			ia: "Interlingua (International Auxiliary Language Association)",
			id: "Indonesian",
			ie: "Interlingue, Occidental",
			ga: "Irish",
			ig: "Igbo",
			ik: "Inupiaq",
			io: "Ido",
			is: "Icelandic",
			it: "Italian",
			iu: "Inuktitut",
			ja: "Japanese",
			jv: "Javanese",
			kl: "Kalaallisut, Greenlandic",
			kn: "Kannada",
			kr: "Kanuri",
			ks: "Kashmiri",
			kk: "Kazakh",
			km: "Central Khmer",
			ki: "Kikuyu, Gikuyu",
			rw: "Kinyarwanda",
			ky: "Kirghiz, Kyrgyz",
			kv: "Komi",
			kg: "Kongo",
			ko: "Korean",
			ku: "Kurdish",
			kj: "Kuanyama, Kwanyama",
			la: "Latin",
			lb: "Luxembourgish, Letzeburgesch",
			lg: "Ganda",
			li: "Limburgan, Limburger, Limburgish",
			ln: "Lingala",
			lo: "Lao",
			lt: "Lithuanian",
			lu: "Luba-Katanga",
			lv: "Latvian",
			gv: "Manx",
			mk: "Macedonian",
			mg: "Malagasy",
			ms: "Malay",
			ml: "Malayalam",
			mt: "Maltese",
			mi: "Maori",
			mr: "Marathi",
			mh: "Marshallese",
			mn: "Mongolian",
			na: "Nauru",
			nv: "Navajo, Navaho",
			nd: "North Ndebele",
			ne: "Nepali",
			ng: "Ndonga",
			nb: "Norwegian Bokmål",
			nn: "Norwegian Nynorsk",
			no: "Norwegian",
			ii: "Sichuan Yi, Nuosu",
			nr: "South Ndebele",
			oc: "Occitan",
			oj: "Ojibwa",
			cu: "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic",
			om: "Oromo",
			or: "Oriya",
			os: "Ossetian, Ossetic",
			pa: "Panjabi, Punjabi",
			pi: "Pali",
			fa: "Persian",
			pl: "Polish",
			ps: "Pashto, Pushto",
			pt: "Portuguese",
			qu: "Quechua",
			rm: "Romansh",
			rn: "Rundi",
			ro: "Romanian, Moldavian, Moldovan",
			ru: "Russian",
			sa: "Sanskrit",
			sc: "Sardinian",
			sd: "Sindhi",
			se: "Northern Sami",
			sm: "Samoan",
			sg: "Sango",
			sr: "Serbian",
			gd: "Gaelic, Scottish Gaelic",
			sn: "Shona",
			si: "Sinhala, Sinhalese",
			sk: "Slovak",
			sl: "Slovenian",
			so: "Somali",
			st: "Southern Sotho",
			es: "Spanish, Castilian",
			su: "Sundanese",
			sw: "Swahili",
			ss: "Swati",
			sv: "Swedish",
			ta: "Tamil",
			te: "Telugu",
			tg: "Tajik",
			th: "Thai",
			ti: "Tigrinya",
			bo: "Tibetan",
			tk: "Turkmen",
			tl: "Tagalog",
			tn: "Tswana",
			to: "Tonga (Tonga Islands)",
			tr: "Turkish",
			ts: "Tsonga",
			tt: "Tatar",
			tw: "Twi",
			ty: "Tahitian",
			ug: "Uighur, Uyghur",
			uk: "Ukrainian",
			ur: "Urdu",
			uz: "Uzbek",
			ve: "Venda",
			vi: "Vietnamese",
			vo: "Volapük",
			wa: "Walloon",
			cy: "Welsh",
			wo: "Wolof",
			fy: "Western Frisian",
			xh: "Xhosa",
			yi: "Yiddish",
			yo: "Yoruba",
			za: "Zhuang, Chuang",
			zu: "Zulu",
		}[language]
	}
	export function toNativeName(language: Language): string {
		return {
			ab: "аҧсуа бызшәа, аҧсшәа",
			aa: "Afaraf",
			af: "Afrikaans",
			ak: "Akan",
			sq: "Shqip",
			am: "አማርኛ",
			ar: "العربية",
			an: "aragonés",
			hy: "Հայերեն",
			as: "অসমীয়া",
			av: "авар мацӀ, магӀарул мацӀ",
			ae: "avesta",
			ay: "aymar aru",
			az: "azərbaycan dili",
			bm: "bamanankan",
			ba: "башҡорт теле",
			eu: "euskara, euskera",
			be: "беларуская мова",
			bn: "বাংলা",
			bh: "ोजपुरी",
			bi: "Bislama",
			bs: "bosanski jezik",
			br: "brezhoneg",
			bg: "български език",
			my: "ဗမာစာ",
			ca: "català, valencià",
			ch: "Chamoru",
			ce: "нохчийн мотт",
			ny: "chiCheŵa, chinyanja",
			zh: "中文 (Zhōngwén), 汉语, 漢語",
			cv: "чӑваш чӗлхи",
			kw: "Kernewek",
			co: "corsu, lingua corsa",
			cr: "ᓀᐦᐃᔭᐍᐏᐣ",
			hr: "hrvatski jezik",
			cs: "čeština, český jazyk",
			da: "dansk",
			dv: "ދިވެހި",
			nl: "Nederlands, Vlaams",
			dz: "རྫོང་ཁ",
			en: "English",
			eo: "Esperanto",
			et: "eesti, eesti keel",
			ee: "Eʋegbe",
			fo: "føroyskt",
			fj: "vosa Vakaviti",
			fi: "suomi, suomen kieli",
			fr: "français, langue française",
			ff: "Fulfulde, Pulaar, Pular",
			gl: "Galego",
			ka: "ქართული",
			de: "Deutsch",
			el: "ελληνικά",
			gn: "Avañe'ẽ",
			gu: "ગુજરાતી",
			ht: "Kreyòl ayisyen",
			ha: "(Hausa) هَوُسَ",
			he: "עברית",
			hz: "Otjiherero",
			hi: "हिन्दी, हिंदी",
			ho: "Hiri Motu",
			hu: "magyar",
			ia: "Interlingua",
			id: "Bahasa Indonesia",
			ie: "Interlingue",
			ga: "Gaeilge",
			ig: "Asụsụ Igbo",
			ik: "Iñupiaq, Iñupiatun",
			io: "Ido",
			is: "Íslenska",
			it: "Italiano",
			iu: "ᐃᓄᒃᑎᑐᑦ",
			ja: "日本語 (にほんご)",
			jv: "ꦧꦱꦗꦮ, Basa Jawa",
			kl: "kalaallisut, kalaallit oqaasii",
			kn: "ಕನ್ನಡ",
			kr: "Kanuri",
			ks: "कश्मीरी, كشميري‎",
			kk: "қазақ тілі",
			km: "្មែរ, ខេមរភាសា, ភាសាខ្មែរ",
			ki: "Gĩkũyũ",
			rw: "Ikinyarwanda",
			ky: "Кыргызча, Кыргыз тили",
			kv: "коми кыв",
			kg: "Kikongo",
			ko: "한국어",
			ku: "Kurdî, کوردی‎",
			kj: "Kuanyama",
			la: "latine, lingua latina",
			lb: "Lëtzebuergesch",
			lg: "Luganda",
			li: "Limburgs",
			ln: "Lingála",
			lo: "ພາສາລາວ",
			lt: "lietuvių kalba",
			lu: "Kiluba",
			lv: "latviešu valoda",
			gv: "Gaelg, Gailck",
			mk: "македонски јазик",
			mg: "fiteny malagasy",
			ms: "Bahasa Melayu, بهاس ملايو‎",
			ml: "മലയാളം",
			mt: "Malti",
			mi: "te reo Māori",
			mr: "मराठी",
			mh: "Kajin M̧ajeļ",
			mn: "Монгол хэл",
			na: "Dorerin Naoero",
			nv: "Diné bizaad",
			nd: "isiNdebele",
			ne: "नेपाली",
			ng: "Owambo",
			nb: "Norsk Bokmål",
			nn: "Norsk Nynorsk",
			no: "Norsk",
			ii: "ꆈꌠ꒿ Nuosuhxop",
			nr: "isiNdebele",
			oc: "occitan, lenga d'òc",
			oj: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
			cu: "ѩзыкъ словѣньскъ",
			om: "Afaan Oromoo",
			or: "ଓଡ଼ିଆ",
			os: "ирон æвзаг",
			pa: "ਪੰਜਾਬੀ",
			pi: "पाऴि",
			fa: "فارسی",
			pl: "język polski, polszczyzna",
			ps: "پښتو",
			pt: "Português",
			qu: "Runa Simi, Kichwa",
			rm: "Rumantsch Grischun",
			rn: "Ikirundi",
			ro: "Română",
			ru: "русский",
			sa: "संस्कृतम्",
			sc: "sardu",
			sd: "सिन्धी, سنڌي، سندھی‎",
			se: "Davvisámegiella",
			sm: "gagana fa'a Samoa",
			sg: "yângâ tî sängö",
			sr: "српски језик",
			gd: "Gàidhlig",
			sn: "chiShona",
			si: "සිංහල",
			sk: "Slovenčina, Slovenský Jazyk",
			sl: "Slovenski Jezik, Slovenščina",
			so: "Soomaaliga, af Soomaali",
			st: "Sesotho",
			es: "Español",
			su: "Basa Sunda",
			sw: "Kiswahili",
			ss: "SiSwati",
			sv: "Svenska",
			ta: "தமிழ்",
			te: "తెలుగు",
			tg: "тоҷикӣ, toçikī, تاجیکی‎",
			th: "ไทย",
			ti: "ትግርኛ",
			bo: "བོད་ཡིག",
			tk: "Türkmen, Түркмен",
			tl: "Wikang Tagalog",
			tn: "Setswana",
			to: "Faka Tonga",
			tr: "Türkçe",
			ts: "Xitsonga",
			tt: "татар теле, tatar tele",
			tw: "Twi",
			ty: "Reo Tahiti",
			ug: "ئۇيغۇرچە‎, Uyghurche",
			uk: "Українська",
			ur: "اردو",
			uz: "Oʻzbek, Ўзбек, أۇزبېك‎",
			ve: "Tshivenḓa",
			vi: "Tiếng Việt",
			vo: "Volapük",
			wa: "Walon",
			cy: "Cymraeg",
			wo: "Wollof",
			fy: "Frysk",
			xh: "isiXhosa",
			yi: "ייִדיש",
			yo: "Yorùbá",
			za: "Saɯ cueŋƅ, Saw cuengh",
			zu: "isiZu",
		}[language]
	}
}
