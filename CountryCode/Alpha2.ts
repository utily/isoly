import { Alpha3 } from "./Alpha3"
import { Numeric } from "./Numeric"

export type Alpha2 =
	| "AF"
	| "AX"
	| "AL"
	| "DZ"
	| "AS"
	| "AD"
	| "AO"
	| "AI"
	| "AQ"
	| "AG"
	| "AR"
	| "AM"
	| "AW"
	| "AU"
	| "AT"
	| "AZ"
	| "BS"
	| "BH"
	| "BD"
	| "BB"
	| "BY"
	| "BE"
	| "BZ"
	| "BJ"
	| "BM"
	| "BT"
	| "BO"
	| "BQ"
	| "BA"
	| "BW"
	| "BV"
	| "BR"
	| "IO"
	| "BN"
	| "BG"
	| "BF"
	| "BI"
	| "CV"
	| "KH"
	| "CM"
	| "CA"
	| "KY"
	| "CF"
	| "TD"
	| "CL"
	| "CN"
	| "CX"
	| "CC"
	| "CO"
	| "KM"
	| "CG"
	| "CD"
	| "CK"
	| "CR"
	| "CI"
	| "HR"
	| "CU"
	| "CW"
	| "CY"
	| "CZ"
	| "DK"
	| "DJ"
	| "DM"
	| "DO"
	| "EC"
	| "EG"
	| "SV"
	| "GQ"
	| "ER"
	| "EE"
	| "SZ"
	| "ET"
	| "FK"
	| "FO"
	| "FJ"
	| "FI"
	| "FR"
	| "GF"
	| "PF"
	| "TF"
	| "GA"
	| "GM"
	| "GE"
	| "DE"
	| "GH"
	| "GI"
	| "GR"
	| "GL"
	| "GD"
	| "GP"
	| "GU"
	| "GT"
	| "GG"
	| "GN"
	| "GW"
	| "GY"
	| "HT"
	| "HM"
	| "VA"
	| "HN"
	| "HK"
	| "HU"
	| "IS"
	| "IN"
	| "ID"
	| "IR"
	| "IQ"
	| "IE"
	| "IM"
	| "IL"
	| "IT"
	| "JM"
	| "JP"
	| "JE"
	| "JO"
	| "KZ"
	| "KE"
	| "KI"
	| "KP"
	| "KR"
	| "KW"
	| "KG"
	| "LA"
	| "LV"
	| "LB"
	| "LS"
	| "LR"
	| "LY"
	| "LI"
	| "LT"
	| "LU"
	| "MO"
	| "MG"
	| "MW"
	| "MY"
	| "MV"
	| "ML"
	| "MT"
	| "MH"
	| "MQ"
	| "MR"
	| "MU"
	| "YT"
	| "MX"
	| "FM"
	| "MD"
	| "MC"
	| "MN"
	| "ME"
	| "MS"
	| "MA"
	| "MZ"
	| "MM"
	| "NA"
	| "NR"
	| "NP"
	| "NL"
	| "NC"
	| "NZ"
	| "NI"
	| "NE"
	| "NG"
	| "NU"
	| "NF"
	| "MK"
	| "MP"
	| "NO"
	| "OM"
	| "PK"
	| "PW"
	| "PS"
	| "PA"
	| "PG"
	| "PY"
	| "PE"
	| "PH"
	| "PN"
	| "PL"
	| "PT"
	| "PR"
	| "QA"
	| "RE"
	| "RO"
	| "RU"
	| "RW"
	| "BL"
	| "SH"
	| "KN"
	| "LC"
	| "MF"
	| "PM"
	| "VC"
	| "WS"
	| "SM"
	| "ST"
	| "SA"
	| "SN"
	| "RS"
	| "SC"
	| "SL"
	| "SG"
	| "SX"
	| "SK"
	| "SI"
	| "SB"
	| "SO"
	| "ZA"
	| "GS"
	| "SS"
	| "ES"
	| "LK"
	| "SD"
	| "SR"
	| "SJ"
	| "SE"
	| "CH"
	| "SY"
	| "TW"
	| "TJ"
	| "TZ"
	| "TH"
	| "TL"
	| "TG"
	| "TK"
	| "TO"
	| "TT"
	| "TN"
	| "TR"
	| "TM"
	| "TC"
	| "TV"
	| "UG"
	| "UA"
	| "AE"
	| "GB"
	| "US"
	| "UM"
	| "UY"
	| "UZ"
	| "VU"
	| "VE"
	| "VN"
	| "VG"
	| "VI"
	| "WF"
	| "EH"
	| "YE"
	| "ZM"
	| "ZW"

export namespace Alpha2 {
	export function is(value: any | Alpha2): value is Alpha2 {
		return (
			typeof value == "string" &&
			value.length == 2 &&
			(value == "AF" ||
				value == "AX" ||
				value == "AL" ||
				value == "DZ" ||
				value == "AS" ||
				value == "AD" ||
				value == "AO" ||
				value == "AI" ||
				value == "AQ" ||
				value == "AG" ||
				value == "AR" ||
				value == "AM" ||
				value == "AW" ||
				value == "AU" ||
				value == "AT" ||
				value == "AZ" ||
				value == "BS" ||
				value == "BH" ||
				value == "BD" ||
				value == "BB" ||
				value == "BY" ||
				value == "BE" ||
				value == "BZ" ||
				value == "BJ" ||
				value == "BM" ||
				value == "BT" ||
				value == "BO" ||
				value == "BQ" ||
				value == "BA" ||
				value == "BW" ||
				value == "BV" ||
				value == "BR" ||
				value == "IO" ||
				value == "BN" ||
				value == "BG" ||
				value == "BF" ||
				value == "BI" ||
				value == "CV" ||
				value == "KH" ||
				value == "CM" ||
				value == "CA" ||
				value == "KY" ||
				value == "CF" ||
				value == "TD" ||
				value == "CL" ||
				value == "CN" ||
				value == "CX" ||
				value == "CC" ||
				value == "CO" ||
				value == "KM" ||
				value == "CG" ||
				value == "CD" ||
				value == "CK" ||
				value == "CR" ||
				value == "CI" ||
				value == "HR" ||
				value == "CU" ||
				value == "CW" ||
				value == "CY" ||
				value == "CZ" ||
				value == "DK" ||
				value == "DJ" ||
				value == "DM" ||
				value == "DO" ||
				value == "EC" ||
				value == "EG" ||
				value == "SV" ||
				value == "GQ" ||
				value == "ER" ||
				value == "EE" ||
				value == "SZ" ||
				value == "ET" ||
				value == "FK" ||
				value == "FO" ||
				value == "FJ" ||
				value == "FI" ||
				value == "FR" ||
				value == "GF" ||
				value == "PF" ||
				value == "TF" ||
				value == "GA" ||
				value == "GM" ||
				value == "GE" ||
				value == "DE" ||
				value == "GH" ||
				value == "GI" ||
				value == "GR" ||
				value == "GL" ||
				value == "GD" ||
				value == "GP" ||
				value == "GU" ||
				value == "GT" ||
				value == "GG" ||
				value == "GN" ||
				value == "GW" ||
				value == "GY" ||
				value == "HT" ||
				value == "HM" ||
				value == "VA" ||
				value == "HN" ||
				value == "HK" ||
				value == "HU" ||
				value == "IS" ||
				value == "IN" ||
				value == "ID" ||
				value == "IR" ||
				value == "IQ" ||
				value == "IE" ||
				value == "IM" ||
				value == "IL" ||
				value == "IT" ||
				value == "JM" ||
				value == "JP" ||
				value == "JE" ||
				value == "JO" ||
				value == "KZ" ||
				value == "KE" ||
				value == "KI" ||
				value == "KP" ||
				value == "KR" ||
				value == "KW" ||
				value == "KG" ||
				value == "LA" ||
				value == "LV" ||
				value == "LB" ||
				value == "LS" ||
				value == "LR" ||
				value == "LY" ||
				value == "LI" ||
				value == "LT" ||
				value == "LU" ||
				value == "MO" ||
				value == "MG" ||
				value == "MW" ||
				value == "MY" ||
				value == "MV" ||
				value == "ML" ||
				value == "MT" ||
				value == "MH" ||
				value == "MQ" ||
				value == "MR" ||
				value == "MU" ||
				value == "YT" ||
				value == "MX" ||
				value == "FM" ||
				value == "MD" ||
				value == "MC" ||
				value == "MN" ||
				value == "ME" ||
				value == "MS" ||
				value == "MA" ||
				value == "MZ" ||
				value == "MM" ||
				value == "NA" ||
				value == "NR" ||
				value == "NP" ||
				value == "NL" ||
				value == "NC" ||
				value == "NZ" ||
				value == "NI" ||
				value == "NE" ||
				value == "NG" ||
				value == "NU" ||
				value == "NF" ||
				value == "MK" ||
				value == "MP" ||
				value == "NO" ||
				value == "OM" ||
				value == "PK" ||
				value == "PW" ||
				value == "PS" ||
				value == "PA" ||
				value == "PG" ||
				value == "PY" ||
				value == "PE" ||
				value == "PH" ||
				value == "PN" ||
				value == "PL" ||
				value == "PT" ||
				value == "PR" ||
				value == "QA" ||
				value == "RE" ||
				value == "RO" ||
				value == "RU" ||
				value == "RW" ||
				value == "BL" ||
				value == "SH" ||
				value == "KN" ||
				value == "LC" ||
				value == "MF" ||
				value == "PM" ||
				value == "VC" ||
				value == "WS" ||
				value == "SM" ||
				value == "ST" ||
				value == "SA" ||
				value == "SN" ||
				value == "RS" ||
				value == "SC" ||
				value == "SL" ||
				value == "SG" ||
				value == "SX" ||
				value == "SK" ||
				value == "SI" ||
				value == "SB" ||
				value == "SO" ||
				value == "ZA" ||
				value == "GS" ||
				value == "SS" ||
				value == "ES" ||
				value == "LK" ||
				value == "SD" ||
				value == "SR" ||
				value == "SJ" ||
				value == "SE" ||
				value == "CH" ||
				value == "SY" ||
				value == "TW" ||
				value == "TJ" ||
				value == "TZ" ||
				value == "TH" ||
				value == "TL" ||
				value == "TG" ||
				value == "TK" ||
				value == "TO" ||
				value == "TT" ||
				value == "TN" ||
				value == "TR" ||
				value == "TM" ||
				value == "TC" ||
				value == "TV" ||
				value == "UG" ||
				value == "UA" ||
				value == "AE" ||
				value == "GB" ||
				value == "US" ||
				value == "UM" ||
				value == "UY" ||
				value == "UZ" ||
				value == "VU" ||
				value == "VE" ||
				value == "VN" ||
				value == "VG" ||
				value == "VI" ||
				value == "WF" ||
				value == "EH" ||
				value == "YE" ||
				value == "ZM" ||
				value == "ZW")
		)
	}
	export function from(country: Alpha3 | Numeric): Alpha2 {
		return typeof country == "number" ? numericToAlpha2[country.toString()] : alpha3ToAlpha2[country]
	}
	export function isEEA(country: Alpha2): boolean {
		return [
			"AL",
			"AT",
			"BA",
			"BE",
			"BG",
			"CH",
			"CY",
			"DE",
			"DK",
			"EE",
			"ES",
			"FI",
			"FR",
			"GB",
			"GR",
			"HR",
			"HU",
			"IE",
			"IS",
			"IT",
			"LT",
			"LV",
			"MK",
			"MT",
			"NL",
			"NO",
			"PL",
			"PT",
			"RO",
			"RS",
			"SE",
			"SI",
		].some(c => c == country)
	}
}

const numericToAlpha2: { [country: string]: Alpha2 } = {
	"4": "AF",
	"248": "AX",
	"8": "AL",
	"12": "DZ",
	"16": "AS",
	"20": "AD",
	"24": "AO",
	"660": "AI",
	"10": "AQ",
	"28": "AG",
	"32": "AR",
	"51": "AM",
	"533": "AW",
	"36": "AU",
	"40": "AT",
	"31": "AZ",
	"44": "BS",
	"48": "BH",
	"50": "BD",
	"52": "BB",
	"112": "BY",
	"56": "BE",
	"84": "BZ",
	"204": "BJ",
	"60": "BM",
	"64": "BT",
	"68": "BO",
	"535": "BQ",
	"70": "BA",
	"72": "BW",
	"74": "BV",
	"76": "BR",
	"86": "IO",
	"96": "BN",
	"100": "BG",
	"854": "BF",
	"108": "BI",
	"132": "CV",
	"116": "KH",
	"120": "CM",
	"124": "CA",
	"136": "KY",
	"140": "CF",
	"148": "TD",
	"152": "CL",
	"156": "CN",
	"162": "CX",
	"166": "CC",
	"170": "CO",
	"174": "KM",
	"178": "CG",
	"180": "CD",
	"184": "CK",
	"188": "CR",
	"384": "CI",
	"191": "HR",
	"192": "CU",
	"531": "CW",
	"196": "CY",
	"203": "CZ",
	"208": "DK",
	"262": "DJ",
	"212": "DM",
	"214": "DO",
	"218": "EC",
	"818": "EG",
	"222": "SV",
	"226": "GQ",
	"232": "ER",
	"233": "EE",
	"748": "SZ",
	"231": "ET",
	"238": "FK",
	"234": "FO",
	"242": "FJ",
	"246": "FI",
	"250": "FR",
	"254": "GF",
	"258": "PF",
	"260": "TF",
	"266": "GA",
	"270": "GM",
	"268": "GE",
	"276": "DE",
	"288": "GH",
	"292": "GI",
	"300": "GR",
	"304": "GL",
	"308": "GD",
	"312": "GP",
	"316": "GU",
	"320": "GT",
	"831": "GG",
	"324": "GN",
	"624": "GW",
	"328": "GY",
	"332": "HT",
	"334": "HM",
	"336": "VA",
	"340": "HN",
	"344": "HK",
	"348": "HU",
	"352": "IS",
	"356": "IN",
	"360": "ID",
	"364": "IR",
	"368": "IQ",
	"372": "IE",
	"833": "IM",
	"376": "IL",
	"380": "IT",
	"388": "JM",
	"392": "JP",
	"832": "JE",
	"400": "JO",
	"398": "KZ",
	"404": "KE",
	"296": "KI",
	"408": "KP",
	"410": "KR",
	"414": "KW",
	"417": "KG",
	"418": "LA",
	"428": "LV",
	"422": "LB",
	"426": "LS",
	"430": "LR",
	"434": "LY",
	"438": "LI",
	"440": "LT",
	"442": "LU",
	"446": "MO",
	"450": "MG",
	"454": "MW",
	"458": "MY",
	"462": "MV",
	"466": "ML",
	"470": "MT",
	"584": "MH",
	"474": "MQ",
	"478": "MR",
	"480": "MU",
	"175": "YT",
	"484": "MX",
	"583": "FM",
	"498": "MD",
	"492": "MC",
	"496": "MN",
	"499": "ME",
	"500": "MS",
	"504": "MA",
	"508": "MZ",
	"104": "MM",
	"516": "NA",
	"520": "NR",
	"524": "NP",
	"528": "NL",
	"540": "NC",
	"554": "NZ",
	"558": "NI",
	"562": "NE",
	"566": "NG",
	"570": "NU",
	"574": "NF",
	"807": "MK",
	"580": "MP",
	"578": "NO",
	"512": "OM",
	"586": "PK",
	"585": "PW",
	"275": "PS",
	"591": "PA",
	"598": "PG",
	"600": "PY",
	"604": "PE",
	"608": "PH",
	"612": "PN",
	"616": "PL",
	"620": "PT",
	"630": "PR",
	"634": "QA",
	"638": "RE",
	"642": "RO",
	"643": "RU",
	"646": "RW",
	"652": "BL",
	"654": "SH",
	"659": "KN",
	"662": "LC",
	"663": "MF",
	"666": "PM",
	"670": "VC",
	"882": "WS",
	"674": "SM",
	"678": "ST",
	"682": "SA",
	"686": "SN",
	"688": "RS",
	"690": "SC",
	"694": "SL",
	"702": "SG",
	"534": "SX",
	"703": "SK",
	"705": "SI",
	"90": "SB",
	"706": "SO",
	"710": "ZA",
	"239": "GS",
	"728": "SS",
	"724": "ES",
	"144": "LK",
	"729": "SD",
	"740": "SR",
	"744": "SJ",
	"752": "SE",
	"756": "CH",
	"760": "SY",
	"158": "TW",
	"762": "TJ",
	"834": "TZ",
	"764": "TH",
	"626": "TL",
	"768": "TG",
	"772": "TK",
	"776": "TO",
	"780": "TT",
	"788": "TN",
	"792": "TR",
	"795": "TM",
	"796": "TC",
	"798": "TV",
	"800": "UG",
	"804": "UA",
	"784": "AE",
	"826": "GB",
	"840": "US",
	"581": "UM",
	"858": "UY",
	"860": "UZ",
	"548": "VU",
	"862": "VE",
	"704": "VN",
	"92": "VG",
	"850": "VI",
	"876": "WF",
	"732": "EH",
	"887": "YE",
	"894": "ZM",
	"716": "ZW",
}
const alpha3ToAlpha2: { [country: string]: Alpha2 } = {
	AFG: "AF",
	ALA: "AX",
	ALB: "AL",
	DZA: "DZ",
	ASM: "AS",
	AND: "AD",
	AGO: "AO",
	AIA: "AI",
	ATA: "AQ",
	ATG: "AG",
	ARG: "AR",
	ARM: "AM",
	ABW: "AW",
	AUS: "AU",
	AUT: "AT",
	AZE: "AZ",
	BHS: "BS",
	BHR: "BH",
	BGD: "BD",
	BRB: "BB",
	BLR: "BY",
	BEL: "BE",
	BLZ: "BZ",
	BEN: "BJ",
	BMU: "BM",
	BTN: "BT",
	BOL: "BO",
	BES: "BQ",
	BIH: "BA",
	BWA: "BW",
	BVT: "BV",
	BRA: "BR",
	IOT: "IO",
	BRN: "BN",
	BGR: "BG",
	BFA: "BF",
	BDI: "BI",
	CPV: "CV",
	KHM: "KH",
	CMR: "CM",
	CAN: "CA",
	CYM: "KY",
	CAF: "CF",
	TCD: "TD",
	CHL: "CL",
	CHN: "CN",
	CXR: "CX",
	CCK: "CC",
	COL: "CO",
	COM: "KM",
	COG: "CG",
	COD: "CD",
	COK: "CK",
	CRI: "CR",
	CIV: "CI",
	HRV: "HR",
	CUB: "CU",
	CUW: "CW",
	CYP: "CY",
	CZE: "CZ",
	DNK: "DK",
	DJI: "DJ",
	DMA: "DM",
	DOM: "DO",
	ECU: "EC",
	EGY: "EG",
	SLV: "SV",
	GNQ: "GQ",
	ERI: "ER",
	EST: "EE",
	SWZ: "SZ",
	ETH: "ET",
	FLK: "FK",
	FRO: "FO",
	FJI: "FJ",
	FIN: "FI",
	FRA: "FR",
	GUF: "GF",
	PYF: "PF",
	ATF: "TF",
	GAB: "GA",
	GMB: "GM",
	GEO: "GE",
	DEU: "DE",
	GHA: "GH",
	GIB: "GI",
	GRC: "GR",
	GRL: "GL",
	GRD: "GD",
	GLP: "GP",
	GUM: "GU",
	GTM: "GT",
	GGY: "GG",
	GIN: "GN",
	GNB: "GW",
	GUY: "GY",
	HTI: "HT",
	HMD: "HM",
	VAT: "VA",
	HND: "HN",
	HKG: "HK",
	HUN: "HU",
	ISL: "IS",
	IND: "IN",
	IDN: "ID",
	IRN: "IR",
	IRQ: "IQ",
	IRL: "IE",
	IMN: "IM",
	ISR: "IL",
	ITA: "IT",
	JAM: "JM",
	JPN: "JP",
	JEY: "JE",
	JOR: "JO",
	KAZ: "KZ",
	KEN: "KE",
	KIR: "KI",
	PRK: "KP",
	KOR: "KR",
	KWT: "KW",
	KGZ: "KG",
	LAO: "LA",
	LVA: "LV",
	LBN: "LB",
	LSO: "LS",
	LBR: "LR",
	LBY: "LY",
	LIE: "LI",
	LTU: "LT",
	LUX: "LU",
	MAC: "MO",
	MDG: "MG",
	MWI: "MW",
	MYS: "MY",
	MDV: "MV",
	MLI: "ML",
	MLT: "MT",
	MHL: "MH",
	MTQ: "MQ",
	MRT: "MR",
	MUS: "MU",
	MYT: "YT",
	MEX: "MX",
	FSM: "FM",
	MDA: "MD",
	MCO: "MC",
	MNG: "MN",
	MNE: "ME",
	MSR: "MS",
	MAR: "MA",
	MOZ: "MZ",
	MMR: "MM",
	NAM: "NA",
	NRU: "NR",
	NPL: "NP",
	NLD: "NL",
	NCL: "NC",
	NZL: "NZ",
	NIC: "NI",
	NER: "NE",
	NGA: "NG",
	NIU: "NU",
	NFK: "NF",
	MKD: "MK",
	MNP: "MP",
	NOR: "NO",
	OMN: "OM",
	PAK: "PK",
	PLW: "PW",
	PSE: "PS",
	PAN: "PA",
	PNG: "PG",
	PRY: "PY",
	PER: "PE",
	PHL: "PH",
	PCN: "PN",
	POL: "PL",
	PRT: "PT",
	PRI: "PR",
	QAT: "QA",
	REU: "RE",
	ROU: "RO",
	RUS: "RU",
	RWA: "RW",
	BLM: "BL",
	SHN: "SH",
	KNA: "KN",
	LCA: "LC",
	MAF: "MF",
	SPM: "PM",
	VCT: "VC",
	WSM: "WS",
	SMR: "SM",
	STP: "ST",
	SAU: "SA",
	SEN: "SN",
	SRB: "RS",
	SYC: "SC",
	SLE: "SL",
	SGP: "SG",
	SXM: "SX",
	SVK: "SK",
	SVN: "SI",
	SLB: "SB",
	SOM: "SO",
	ZAF: "ZA",
	SGS: "GS",
	SSD: "SS",
	ESP: "ES",
	LKA: "LK",
	SDN: "SD",
	SUR: "SR",
	SJM: "SJ",
	SWE: "SE",
	CHE: "CH",
	SYR: "SY",
	TWN: "TW",
	TJK: "TJ",
	TZA: "TZ",
	THA: "TH",
	TLS: "TL",
	TGO: "TG",
	TKL: "TK",
	TON: "TO",
	TTO: "TT",
	TUN: "TN",
	TUR: "TR",
	TKM: "TM",
	TCA: "TC",
	TUV: "TV",
	UGA: "UG",
	UKR: "UA",
	ARE: "AE",
	GBR: "GB",
	USA: "US",
	UMI: "UM",
	URY: "UY",
	UZB: "UZ",
	VUT: "VU",
	VEN: "VE",
	VNM: "VN",
	VGB: "VG",
	VIR: "VI",
	WLF: "WF",
	ESH: "EH",
	YEM: "YE",
	ZMB: "ZM",
	ZWE: "ZW",
}
