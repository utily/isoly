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
	export import ar = NameAr
	export import az = NameAz
	export import be = NameBe
	export import bg = NameBg
	export import bs = NameBs
	export import ca = NameCa
	export import cs = NameCs
	export import da = NameDa
	export import de = NameDe
	export import el = NameEl
	export import en = NameEn
	export import es = NameEs
	export import et = NameEt
	export import fa = NameFa
	export import fi = NameFi
	export import fr = NameFr
	export import he = NameHe
	export import hr = NameHr
	export import hu = NameHu
	export import hy = NameHy
	export import id = NameId
	export import it = NameIt
	export import ja = NameJa
	export import ka = NameKa
	export import kk = NameKk
	export import ko = NameKo
	export import ky = NameKy
	export import lt = NameLt
	export import lv = NameLv
	export import mk = NameMk
	export import mn = NameMn
	export import nb = NameNb
	export import nl = NameNl
	export import nn = NameNn
	export import pl = NamePl
	export import pt = NamePt
	export import ro = NameRo
	export import ru = NameRu
	export import sk = NameSk
	export import sl = NameSl
	export import sr = NameSr
	export import sv = NameSv
	export import tr = NameTr
	export import uk = NameUk
	export import uz = NameUz
	export import zh = NameZh
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
	export function from(language: Language, country: Alpha2 | Alpha3 | Numeric): string {
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
			} as Record<Language, (country: Alpha2 | Alpha3 | Numeric) => string>
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
