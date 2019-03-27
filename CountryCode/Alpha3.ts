import { Alpha2 } from "./Alpha2"
import { Numeric } from "./Numeric"

export type Alpha3 =
	"AFG" | "ALA" | "ALB" | "DZA" | "ASM" | "AND" | "AGO" | "AIA" | "ATA" | "ATG" | "ARG" | "ARM" | "ABW" | "AUS" | "AUT" | "AZE" | "BHS" | "BHR" | "BGD" |
	"BRB" | "BLR" | "BEL" | "BLZ" | "BEN" | "BMU" | "BTN" | "BOL" | "BES" | "BIH" | "BWA" | "BVT" | "BRA" | "IOT" | "BRN" | "BGR" | "BFA" | "BDI" | "CPV" |
	"KHM" | "CMR" | "CAN" | "CYM" | "CAF" | "TCD" | "CHL" | "CHN" | "CXR" | "CCK" | "COL" | "COM" | "COG" | "COD" | "COK" | "CRI" | "CIV" | "HRV" | "CUB" |
	"CUW" | "CYP" | "CZE" | "DNK" | "DJI" | "DMA" | "DOM" | "ECU" | "EGY" | "SLV" | "GNQ" | "ERI" | "EST" | "SWZ" | "ETH" | "FLK" | "FRO" | "FJI" | "FIN" |
	"FRA" | "GUF" | "PYF" | "ATF" | "GAB" | "GMB" | "GEO" | "DEU" | "GHA" | "GIB" | "GRC" | "GRL" | "GRD" | "GLP" | "GUM" | "GTM" | "GGY" | "GIN" | "GNB" |
	"GUY" | "HTI" | "HMD" | "VAT" | "HND" | "HKG" | "HUN" | "ISL" | "IND" | "IDN" | "IRN" | "IRQ" | "IRL" | "IMN" | "ISR" | "ITA" | "JAM" | "JPN" | "JEY" |
	"JOR" | "KAZ" | "KEN" | "KIR" | "PRK" | "KOR" | "KWT" | "KGZ" | "LAO" | "LVA" | "LBN" | "LSO" | "LBR" | "LBY" | "LIE" | "LTU" | "LUX" | "MAC" | "MDG" |
	"MWI" | "MYS" | "MDV" | "MLI" | "MLT" | "MHL" | "MTQ" | "MRT" | "MUS" | "MYT" | "MEX" | "FSM" | "MDA" | "MCO" | "MNG" | "MNE" | "MSR" | "MAR" | "MOZ" |
	"MMR" | "NAM" | "NRU" | "NPL" | "NLD" | "NCL" | "NZL" | "NIC" | "NER" | "NGA" | "NIU" | "NFK" | "MKD" | "MNP" | "NOR" | "OMN" | "PAK" | "PLW" | "PSE" |
	"PAN" | "PNG" | "PRY" | "PER" | "PHL" | "PCN" | "POL" | "PRT" | "PRI" | "QAT" | "REU" | "ROU" | "RUS" | "RWA" | "BLM" | "SHN" | "KNA" | "LCA" | "MAF" |
	"SPM" | "VCT" | "WSM" | "SMR" | "STP" | "SAU" | "SEN" | "SRB" | "SYC" | "SLE" | "SGP" | "SXM" | "SVK" | "SVN" | "SLB" | "SOM" | "ZAF" | "SGS" | "SSD" |
	"ESP" | "LKA" | "SDN" | "SUR" | "SJM" | "SWE" | "CHE" | "SYR" | "TWN" | "TJK" | "TZA" | "THA" | "TLS" | "TGO" | "TKL" | "TON" | "TTO" | "TUN" | "TUR" |
	"TKM" | "TCA" | "TUV" | "UGA" | "UKR" | "ARE" | "GBR" | "USA" | "UMI" | "URY" | "UZB" | "VUT" | "VEN" | "VNM" | "VGB" | "VIR" | "WLF" | "ESH" | "YEM" |
	"ZMB" | "ZWE"

export namespace Alpha3 {
	export function is(value: any | Alpha3): value is Alpha3 {
		return typeof(value) == "string" && value.length == 3 && (
			value == "AFG" || value == "ALA" || value == "ALB" || value == "DZA" || value == "ASM" || value == "AND" || value == "AGO" || value == "AIA" ||
			value == "ATA" || value == "ATG" || value == "ARG" || value == "ARM" || value == "ABW" || value == "AUS" || value == "AUT" || value == "AZE" ||
			value == "BHS" || value == "BHR" || value == "BGD" || value == "BRB" || value == "BLR" || value == "BEL" || value == "BLZ" || value == "BEN" ||
			value == "BMU" || value == "BTN" || value == "BOL" || value == "BES" || value == "BIH" || value == "BWA" || value == "BVT" || value == "BRA" ||
			value == "IOT" || value == "BRN" || value == "BGR" || value == "BFA" || value == "BDI" || value == "CPV" || value == "KHM" || value == "CMR" ||
			value == "CAN" || value == "CYM" || value == "CAF" || value == "TCD" || value == "CHL" || value == "CHN" || value == "CXR" || value == "CCK" ||
			value == "COL" || value == "COM" || value == "COG" || value == "COD" || value == "COK" || value == "CRI" || value == "CIV" || value == "HRV" ||
			value == "CUB" || value == "CUW" || value == "CYP" || value == "CZE" || value == "DNK" || value == "DJI" || value == "DMA" || value == "DOM" ||
			value == "ECU" || value == "EGY" || value == "SLV" || value == "GNQ" || value == "ERI" || value == "EST" || value == "SWZ" || value == "ETH" ||
			value == "FLK" || value == "FRO" || value == "FJI" || value == "FIN" || value == "FRA" || value == "GUF" || value == "PYF" || value == "ATF" ||
			value == "GAB" || value == "GMB" || value == "GEO" || value == "DEU" || value == "GHA" || value == "GIB" || value == "GRC" || value == "GRL" ||
			value == "GRD" || value == "GLP" || value == "GUM" || value == "GTM" || value == "GGY" || value == "GIN" || value == "GNB" || value == "GUY" ||
			value == "HTI" || value == "HMD" || value == "VAT" || value == "HND" || value == "HKG" || value == "HUN" || value == "ISL" || value == "IND" ||
			value == "IDN" || value == "IRN" || value == "IRQ" || value == "IRL" || value == "IMN" || value == "ISR" || value == "ITA" || value == "JAM" ||
			value == "JPN" || value == "JEY" || value == "JOR" || value == "KAZ" || value == "KEN" || value == "KIR" || value == "PRK" || value == "KOR" ||
			value == "KWT" || value == "KGZ" || value == "LAO" || value == "LVA" || value == "LBN" || value == "LSO" || value == "LBR" || value == "LBY" ||
			value == "LIE" || value == "LTU" || value == "LUX" || value == "MAC" || value == "MDG" || value == "MWI" || value == "MYS" || value == "MDV" ||
			value == "MLI" || value == "MLT" || value == "MHL" || value == "MTQ" || value == "MRT" || value == "MUS" || value == "MYT" || value == "MEX" ||
			value == "FSM" || value == "MDA" || value == "MCO" || value == "MNG" || value == "MNE" || value == "MSR" || value == "MAR" || value == "MOZ" ||
			value == "MMR" || value == "NAM" || value == "NRU" || value == "NPL" || value == "NLD" || value == "NCL" || value == "NZL" || value == "NIC" ||
			value == "NER" || value == "NGA" || value == "NIU" || value == "NFK" || value == "MKD" || value == "MNP" || value == "NOR" || value == "OMN" ||
			value == "PAK" || value == "PLW" || value == "PSE" || value == "PAN" || value == "PNG" || value == "PRY" || value == "PER" || value == "PHL" ||
			value == "PCN" || value == "POL" || value == "PRT" || value == "PRI" || value == "QAT" || value == "REU" || value == "ROU" || value == "RUS" ||
			value == "RWA" || value == "BLM" || value == "SHN" || value == "KNA" || value == "LCA" || value == "MAF" || value == "SPM" || value == "VCT" ||
			value == "WSM" || value == "SMR" || value == "STP" || value == "SAU" || value == "SEN" || value == "SRB" || value == "SYC" || value == "SLE" ||
			value == "SGP" || value == "SXM" || value == "SVK" || value == "SVN" || value == "SLB" || value == "SOM" || value == "ZAF" || value == "SGS" ||
			value == "SSD" || value == "ESP" || value == "LKA" || value == "SDN" || value == "SUR" || value == "SJM" || value == "SWE" || value == "CHE" ||
			value == "SYR" || value == "TWN" || value == "TJK" || value == "TZA" || value == "THA" || value == "TLS" || value == "TGO" || value == "TKL" ||
			value == "TON" || value == "TTO" || value == "TUN" || value == "TUR" || value == "TKM" || value == "TCA" || value == "TUV" || value == "UGA" ||
			value == "UKR" || value == "ARE" || value == "GBR" || value == "USA" || value == "UMI" || value == "URY" || value == "UZB" || value == "VUT" ||
			value == "VEN" || value == "VNM" || value == "VGB" || value == "VIR" || value == "WLF" || value == "ESH" || value == "YEM" || value == "ZMB" ||
			value == "ZWE"
		)
	}
	export function from(country: Alpha2 | Numeric): Alpha3 {
		return typeof(country) == "number" ? from(Alpha2.from(country)) : alpha2ToAlpha3[country]
	}
}

const alpha2ToAlpha3: { [country: string]: Alpha3 } = {
	AF: "AFG", AX: "ALA", AL: "ALB", DZ: "DZA", AS: "ASM", AD: "AND", AO: "AGO", AI: "AIA", AQ: "ATA", AG: "ATG", AR: "ARG", AM: "ARM", AW: "ABW", AU: "AUS",
	AT: "AUT", AZ: "AZE", BS: "BHS", BH: "BHR", BD: "BGD", BB: "BRB", BY: "BLR", BE: "BEL", BZ: "BLZ", BJ: "BEN", BM: "BMU", BT: "BTN", BO: "BOL", BQ: "BES",
	BA: "BIH", BW: "BWA", BV: "BVT", BR: "BRA", IO: "IOT", BN: "BRN", BG: "BGR", BF: "BFA", BI: "BDI", CV: "CPV", KH: "KHM", CM: "CMR", CA: "CAN", KY: "CYM",
	CF: "CAF", TD: "TCD", CL: "CHL", CN: "CHN", CX: "CXR", CC: "CCK", CO: "COL", KM: "COM", CG: "COG", CD: "COD", CK: "COK", CR: "CRI", CI: "CIV", HR: "HRV",
	CU: "CUB", CW: "CUW", CY: "CYP", CZ: "CZE", DK: "DNK", DJ: "DJI", DM: "DMA", DO: "DOM", EC: "ECU", EG: "EGY", SV: "SLV", GQ: "GNQ", ER: "ERI", EE: "EST",
	SZ: "SWZ", ET: "ETH", FK: "FLK", FO: "FRO", FJ: "FJI", FI: "FIN", FR: "FRA", GF: "GUF", PF: "PYF", TF: "ATF", GA: "GAB", GM: "GMB", GE: "GEO", DE: "DEU",
	GH: "GHA", GI: "GIB", GR: "GRC", GL: "GRL", GD: "GRD", GP: "GLP", GU: "GUM", GT: "GTM", GG: "GGY", GN: "GIN", GW: "GNB", GY: "GUY", HT: "HTI", HM: "HMD",
	VA: "VAT", HN: "HND", HK: "HKG", HU: "HUN", IS: "ISL", IN: "IND", ID: "IDN", IR: "IRN", IQ: "IRQ", IE: "IRL", IM: "IMN", IL: "ISR", IT: "ITA", JM: "JAM",
	JP: "JPN", JE: "JEY", JO: "JOR", KZ: "KAZ", KE: "KEN", KI: "KIR", KP: "PRK", KR: "KOR", KW: "KWT", KG: "KGZ", LA: "LAO", LV: "LVA", LB: "LBN", LS: "LSO",
	LR: "LBR", LY: "LBY", LI: "LIE", LT: "LTU", LU: "LUX", MO: "MAC", MG: "MDG", MW: "MWI", MY: "MYS", MV: "MDV", ML: "MLI", MT: "MLT", MH: "MHL", MQ: "MTQ",
	MR: "MRT", MU: "MUS", YT: "MYT", MX: "MEX", FM: "FSM", MD: "MDA", MC: "MCO", MN: "MNG", ME: "MNE", MS: "MSR", MA: "MAR", MZ: "MOZ", MM: "MMR", NA: "NAM",
	NR: "NRU", NP: "NPL", NL: "NLD", NC: "NCL", NZ: "NZL", NI: "NIC", NE: "NER", NG: "NGA", NU: "NIU", NF: "NFK", MK: "MKD", MP: "MNP", NO: "NOR", OM: "OMN",
	PK: "PAK", PW: "PLW", PS: "PSE", PA: "PAN", PG: "PNG", PY: "PRY", PE: "PER", PH: "PHL", PN: "PCN", PL: "POL", PT: "PRT", PR: "PRI", QA: "QAT", RE: "REU",
	RO: "ROU", RU: "RUS", RW: "RWA", BL: "BLM", SH: "SHN", KN: "KNA", LC: "LCA", MF: "MAF", PM: "SPM", VC: "VCT", WS: "WSM", SM: "SMR", ST: "STP", SA: "SAU",
	SN: "SEN", RS: "SRB", SC: "SYC", SL: "SLE", SG: "SGP", SX: "SXM", SK: "SVK", SI: "SVN", SB: "SLB", SO: "SOM", ZA: "ZAF", GS: "SGS", SS: "SSD", ES: "ESP",
	LK: "LKA", SD: "SDN", SR: "SUR", SJ: "SJM", SE: "SWE", CH: "CHE", SY: "SYR", TW: "TWN", TJ: "TJK", TZ: "TZA", TH: "THA", TL: "TLS", TG: "TGO", TK: "TKL",
	TO: "TON", TT: "TTO", TN: "TUN", TR: "TUR", TM: "TKM", TC: "TCA", TV: "TUV", UG: "UGA", UA: "UKR", AE: "ARE", GB: "GBR", US: "USA", UM: "UMI", UY: "URY",
	UZ: "UZB", VU: "VUT", VE: "VEN", VN: "VNM", VG: "VGB", VI: "VIR", WF: "WLF", EH: "ESH", YE: "YEM", ZM: "ZMB", ZW: "ZWE",
}
