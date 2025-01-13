import { Language } from "../../Language"
import { Alpha2 } from "../Alpha2"
import { Alpha3 } from "../Alpha3"
import { Numeric } from "../Numeric"
import { ar as NameAr } from "./ar"
import { az as NameAz } from "./az"
import { be as NameBe } from "./be"
import { bg as NameBg } from "./bg"
import { bs as NameBs } from "./bs"
import { ca as NameCa } from "./ca"
import { cs as NameCs } from "./cs"
import { da as NameDa } from "./da"
import { de as NameDe } from "./de"
import { el as NameEl } from "./el"
import { en as NameEn } from "./en"
import { es as NameEs } from "./es"
import { et as NameEt } from "./et"
import { fa as NameFa } from "./fa"
import { fi as NameFi } from "./fi"
import { fr as NameFr } from "./fr"
import { he as NameHe } from "./he"
import { hr as NameHr } from "./hr"
import { hu as NameHu } from "./hu"
import { hy as NameHy } from "./hy"
import { id as NameId } from "./id"
import { it as NameIt } from "./it"
import { ja as NameJa } from "./ja"
import { ka as NameKa } from "./ka"
import { kk as NameKk } from "./kk"
import { ko as NameKo } from "./ko"
import { ky as NameKy } from "./ky"
import { lt as NameLt } from "./lt"
import { lv as NameLv } from "./lv"
import { mk as NameMk } from "./mk"
import { mn as NameMn } from "./mn"
import { nb as NameNb } from "./nb"
import { nl as NameNl } from "./nl"
import { nn as NameNn } from "./nn"
import { pl as NamePl } from "./pl"
import { pt as NamePt } from "./pt"
import { ro as NameRo } from "./ro"
import { ru as NameRu } from "./ru"
import { sk as NameSk } from "./sk"
import { sl as NameSl } from "./sl"
import { sr as NameSr } from "./sr"
import { sv as NameSv } from "./sv"
import { tr as NameTr } from "./tr"
import { uk as NameUk } from "./uk"
import { uz as NameUz } from "./uz"
import { zh as NameZh } from "./zh"

export namespace Name {
	interface LanguageObject {
		from(country: Alpha2 | Alpha3 | Numeric): string
		from(country: string | number): string | undefined
		parse(country: string): Alpha2 | undefined
	}
	function generate(names: Record<Alpha2, string>): LanguageObject {
		return {
			from: (country: string | number): string | undefined => {
				const c =
					(typeof country == "string" && country.length == 3) || typeof country == "number"
						? Alpha2.from(country)
						: country
				return c ? (names as Record<string | number, string | undefined>)[c] : undefined
			},
			parse: (country: string): Alpha2 | undefined => {
				return (Object.entries(names) as [Alpha2, string][]).find(
					entry => entry[1].toLowerCase() == country.toLowerCase()
				)?.[0]
			},
		} as LanguageObject
	}
	export const ar = generate(NameAr.names)
	export const az = generate(NameAz.names)
	export const be = generate(NameBe.names)
	export const bg = generate(NameBg.names)
	export const bs = generate(NameBs.names)
	export const ca = generate(NameCa.names)
	export const cs = generate(NameCs.names)
	export const da = generate(NameDa.names)
	export const de = generate(NameDe.names)
	export const el = generate(NameEl.names)
	export const en = generate(NameEn.names)
	export const es = generate(NameEs.names)
	export const et = generate(NameEt.names)
	export const fa = generate(NameFa.names)
	export const fi = generate(NameFi.names)
	export const fr = generate(NameFr.names)
	export const he = generate(NameHe.names)
	export const hr = generate(NameHr.names)
	export const hu = generate(NameHu.names)
	export const hy = generate(NameHy.names)
	export const id = generate(NameId.names)
	export const it = generate(NameIt.names)
	export const ja = generate(NameJa.names)
	export const ka = generate(NameKa.names)
	export const kk = generate(NameKk.names)
	export const ko = generate(NameKo.names)
	export const ky = generate(NameKy.names)
	export const lt = generate(NameLt.names)
	export const lv = generate(NameLv.names)
	export const mk = generate(NameMk.names)
	export const mn = generate(NameMn.names)
	export const nb = generate(NameNb.names)
	export const nl = generate(NameNl.names)
	export const nn = generate(NameNn.names)
	export const pl = generate(NamePl.names)
	export const pt = generate(NamePt.names)
	export const ro = generate(NameRo.names)
	export const ru = generate(NameRu.names)
	export const sk = generate(NameSk.names)
	export const sl = generate(NameSl.names)
	export const sr = generate(NameSr.names)
	export const sv = generate(NameSv.names)
	export const tr = generate(NameTr.names)
	export const uk = generate(NameUk.names)
	export const uz = generate(NameUz.names)
	export const zh = generate(NameZh.names)
	export function parse(country: string): Alpha2 | undefined {
		return (
			ar.parse(country) ??
			az.parse(country) ??
			be.parse(country) ??
			bg.parse(country) ??
			bs.parse(country) ??
			ca.parse(country) ??
			cs.parse(country) ??
			da.parse(country) ??
			de.parse(country) ??
			el.parse(country) ??
			en.parse(country) ??
			es.parse(country) ??
			et.parse(country) ??
			fa.parse(country) ??
			fi.parse(country) ??
			fr.parse(country) ??
			he.parse(country) ??
			hr.parse(country) ??
			hu.parse(country) ??
			hy.parse(country) ??
			id.parse(country) ??
			it.parse(country) ??
			ja.parse(country) ??
			ka.parse(country) ??
			kk.parse(country) ??
			ko.parse(country) ??
			ky.parse(country) ??
			lt.parse(country) ??
			lv.parse(country) ??
			mk.parse(country) ??
			mn.parse(country) ??
			nb.parse(country) ??
			nl.parse(country) ??
			nn.parse(country) ??
			pl.parse(country) ??
			pt.parse(country) ??
			ro.parse(country) ??
			ru.parse(country) ??
			sk.parse(country) ??
			sl.parse(country) ??
			sr.parse(country) ??
			sv.parse(country) ??
			tr.parse(country) ??
			uk.parse(country) ??
			uz.parse(country) ??
			zh.parse(country)
		)
	}
	export function from(language: Language, country: Alpha2 | Alpha3 | Numeric): string
	export function from(language: Language, country: string | number): string | undefined
	export function from(language: Language, country: string | number): string | undefined {
		return (
			{
				ar: ar.from,
				az: az.from,
				be: be.from,
				bg: bg.from,
				bs: bs.from,
				ca: ca.from,
				cs: cs.from,
				da: da.from,
				de: de.from,
				el: el.from,
				en: en.from,
				es: es.from,
				et: et.from,
				fa: fa.from,
				fi: fi.from,
				fr: fr.from,
				he: he.from,
				hr: hr.from,
				hu: hu.from,
				hy: hy.from,
				id: id.from,
				it: it.from,
				ja: ja.from,
				ka: ka.from,
				kk: kk.from,
				ko: ko.from,
				ky: ky.from,
				lt: lt.from,
				lv: lv.from,
				mk: mk.from,
				mn: mn.from,
				nb: nb.from,
				nl: nl.from,
				nn: nn.from,
				pl: pl.from,
				pt: pt.from,
				ro: ro.from,
				ru: ru.from,
				sk: sk.from,
				sl: sl.from,
				sr: sr.from,
				sv: sv.from,
				tr: tr.from,
				uk: uk.from,
				uz: uz.from,
				zh: zh.from,
			} as Record<Language, (country: string | number) => string | undefined>
		)[language](country)
	}
	export const languages = [
		"ar",
		"az",
		"be",
		"bg",
		"bs",
		"ca",
		"cs",
		"da",
		"de",
		"el",
		"en",
		"es",
		"et",
		"fa",
		"fi",
		"fr",
		"he",
		"hr",
		"hu",
		"hy",
		"id",
		"it",
		"ja",
		"ka",
		"kk",
		"ko",
		"ky",
		"lt",
		"lv",
		"mk",
		"mn",
		"nb",
		"nl",
		"nn",
		"pl",
		"pt",
		"ro",
		"ru",
		"sk",
		"sl",
		"sr",
		"sv",
		"tr",
		"uk",
		"uz",
		"zh",
	] as const
}
