import { Alpha2 } from "../Alpha2"
import { Alpha3 } from "../Alpha3"
import { Numeric } from "../Numeric"
export function from(country: Alpha2 | Alpha3 | Numeric): string {
	return names[country] || from(Alpha2.from(country as Alpha3 | Numeric))
}
export function parse(country: string): Alpha2 | undefined {
	const result = Object.entries(names).find(entry => (entry[1] && entry[1].toLowerCase()) == country.toLowerCase())
	return result && (result[0] as Alpha2)
}

const names: { [country: string]: string | undefined } = {
	AF: "Afganisztán",
	AL: "Albánia",
	DZ: "Algéria",
	AS: "Amerikai Szamoa",
	AD: "Andorra",
	AO: "Angola",
	AI: "Anguilla",
	AQ: "Antarktisz",
	AG: "Antigua és Barbuda",
	AR: "Argentína",
	AM: "Örményország",
	AW: "Aruba",
	AU: "Ausztrália",
	AT: "Ausztria",
	AZ: "Azerbajdzsán",
	BS: "Bahama-szigetek",
	BH: "Bahrein",
	BD: "Banglades",
	BB: "Barbados",
	BY: "Fehéroroszország",
	BE: "Belgium",
	BZ: "Belize",
	BJ: "Benin",
	BM: "Bermuda",
	BT: "Bhután",
	BO: "Bolívia",
	BA: "Bosznia-Hercegovina",
	BW: "Botswana",
	BV: "Bouvet-sziget",
	BR: "Brazília",
	IO: "Brit Indiai-óceáni Terület",
	BN: "Brunei",
	BG: "Bulgária",
	BF: "Burkina Faso",
	BI: "Burundi",
	KH: "Kambodzsa",
	CM: "Kamerun",
	CA: "Kanada",
	CV: "Zöld-foki Köztársaság",
	KY: "Kajmán-szigetek",
	CF: "Közép-afrikai Köztársaság",
	TD: "Csád",
	CL: "Chile",
	CN: "Kína",
	CX: "Karácsony-sziget",
	CC: "Kókusz (Keeling)-szigetek",
	CO: "Kolumbia",
	KM: "Comore-szigetek",
	CG: "Kongói Köztársaság",
	CD: "Kongói Demokratikus Köztársaság",
	CK: "Cook-szigetek",
	CR: "Costa Rica",
	CI: "Elefántcsontpart",
	HR: "Horvátország",
	CU: "Kuba",
	CY: "Ciprus",
	CZ: "Csehország",
	DK: "Dánia",
	DJ: "Dzsibuti",
	DM: "Dominikai Közösség",
	DO: "Dominikai Köztársaság",
	EC: "Ecuador",
	EG: "Egyiptom",
	SV: "Salvador",
	GQ: "Egyenlítői-Guinea",
	ER: "Eritrea",
	EE: "Észtország",
	ET: "Etiópia",
	FK: "Falkland-szigetek",
	FO: "Feröer",
	FJ: "Fidzsi-szigetek",
	FI: "Finnország",
	FR: "Franciaország",
	GF: "Francia Guyana",
	PF: "Francia Polinézia",
	TF: "Francia déli területek",
	GA: "Gabon",
	GM: "Gambia",
	GE: "Grúzia",
	DE: "Németország",
	GH: "Ghána",
	GI: "Gibraltár",
	GR: "Görögország",
	GL: "Grönland",
	GD: "Grenada",
	GP: "Guadeloupe",
	GU: "Guam",
	GT: "Guatemala",
	GN: "Guinea",
	GW: "Bissau-Guinea",
	GY: "Guyana",
	HT: "Haiti",
	HM: "Heard-sziget és McDonald-szigetek",
	VA: "Vatikán",
	HN: "Honduras",
	HK: "Hong Kong",
	HU: "Magyarország",
	IS: "Izland",
	IN: "India",
	ID: "Indonézia",
	IR: "Irán",
	IQ: "Irak",
	IE: "Írország",
	IL: "Izrael",
	IT: "Olaszország",
	JM: "Jamaica",
	JP: "Japán",
	JO: "Jordánia",
	KZ: "Kazahsztán",
	KE: "Kenya",
	KI: "Kiribati",
	KP: "Észak-Korea",
	KR: "Dél-Korea",
	KW: "Kuvait",
	KG: "Kirgizisztán",
	LA: "Laosz",
	LV: "Lettország",
	LB: "Libanon",
	LS: "Lesotho",
	LR: "Libéria",
	LY: "Líbia",
	LI: "Liechtenstein",
	LT: "Litvánia",
	LU: "Luxemburg",
	MO: "Makao",
	MK: "Macedónia",
	MG: "Madagaszkár",
	MW: "Malawi",
	MY: "Malajzia",
	MV: "Maldív-szigetek",
	ML: "Mali",
	MT: "Málta",
	MH: "Marshall-szigetek",
	MQ: "Martinique",
	MR: "Mauritánia",
	MU: "Mauritius",
	YT: "Mayotte",
	MX: "Mexikó",
	FM: "Mikronéziai Szövetségi Államok",
	MD: "Moldova",
	MC: "Monaco",
	MN: "Mongólia",
	MS: "Montserrat",
	MA: "Marokkó",
	MZ: "Mozambik",
	MM: "Mianmar",
	NA: "Namíbia",
	NR: "Nauru",
	NP: "Nepál",
	NL: "Hollandia",
	NC: "Új-Kaledónia",
	NZ: "Új-Zéland",
	NI: "Nicaragua",
	NE: "Niger",
	NG: "Nigéria",
	NU: "Niue",
	NF: "Norfolk-sziget",
	MP: "Északi-Mariana-szigetek",
	NO: "Norvégia",
	OM: "Omán",
	PK: "Pakisztán",
	PW: "Palau",
	PS: "Palesztina",
	PA: "Panama",
	PG: "Pápua Új-Guinea",
	PY: "Paraguay",
	PE: "Peru",
	PH: "Fülöp-szigetek",
	PN: "Pitcairn-szigetek",
	PL: "Lengyelország",
	PT: "Portugália",
	PR: "Puerto Rico",
	QA: "Katar",
	RE: "Réunion",
	RO: "Románia",
	RU: "Oroszország",
	RW: "Ruanda",
	SH: "Saint Helena",
	KN: "Saint Kitts és Nevis",
	LC: "Saint Lucia",
	PM: "Saint Pierre and Miquelon",
	VC: "Saint Vincent és a Grenadine-szigetek",
	WS: "Szamoa",
	SM: "San Marino",
	ST: "São Tomé és Príncipe",
	SA: "Szaudi-Arábia",
	SN: "Szenegál",
	SC: "Seychelle-szigetek",
	SL: "Sierra Leone",
	SG: "Szingapúr",
	SK: "Szlovákia",
	SI: "Szlovénia",
	SB: "Salamon-szigetek",
	SO: "Szomália",
	ZA: "Dél-Afrika",
	GS: "Déli-Georgia és Déli-Sandwich-szigetek",
	ES: "Spanyolország",
	LK: "Sri Lanka",
	SD: "Szudán",
	SR: "Suriname",
	SJ: "Spitzbergák és Jan Mayen",
	SZ: "Szváziföld",
	SE: "Svédország",
	CH: "Svájc",
	SY: "Szíria",
	TW: "Tajvan",
	TJ: "Tádzsikisztán",
	TZ: "Tanzánia",
	TH: "Thaiföld",
	TL: "Kelet-Timor",
	TG: "Togo",
	TK: "Tokelau-szigetek",
	TO: "Tonga",
	TT: "Trinidad és Tobago",
	TN: "Tunézia",
	TR: "Törökország",
	TM: "Türkmenisztán",
	TC: "Turks- és Caicos-szigetek",
	TV: "Tuvalu",
	UG: "Uganda",
	UA: "Ukrajna",
	AE: "Egyesült Arab Emírségek",
	GB: "Egyesült Királyság",
	US: "Amerikai Egyesült Államok",
	UM: "Az Amerikai Egyesült Államok lakatlan külbirtokai",
	UY: "Uruguay",
	UZ: "Üzbegisztán",
	VU: "Vanuatu",
	VE: "Venezuela",
	VN: "Vietnam",
	VG: "Brit Virgin-szigetek",
	VI: "Amerikai Virgin-szigetek",
	WF: "Wallis és Futuna",
	EH: "Nyugat-Szahara",
	YE: "Jemen",
	ZM: "Zambia",
	ZW: "Zimbabwe",
	AX: "Åland",
	BQ: "Karibi Hollandia",
	CW: "Curaçao",
	GG: "Guernsey",
	IM: "Man-sziget",
	JE: "Jersey",
	ME: "Montenegró",
	BL: "Saint Barthélemy",
	MF: "Szent Márton-sziget (francia rész)",
	RS: "Szerbia",
	SX: "Szent Márton-sziget (holland rész)",
	SS: "Dél-Szudán",
	XK: "Koszov",
}
