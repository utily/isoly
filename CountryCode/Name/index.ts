import { Language } from "../../Language"
import { Alpha2 } from "../Alpha2"
import { Alpha3 } from "../Alpha3"
import { Numeric } from "../Numeric"

import * as ar from "./ar"
import * as az from "./az"
import * as be from "./be"
import * as bg from "./bg"
import * as bs from "./bs"
import * as ca from "./ca"
import * as cs from "./cs"
import * as da from "./da"
import * as de from "./de"
import * as el from "./el"
import * as en from "./en"
import * as es from "./es"
import * as et from "./et"
import * as fa from "./fa"
import * as fi from "./fi"
import * as fr from "./fr"
import * as he from "./he"
import * as hr from "./hr"
import * as hu from "./hu"
import * as hy from "./hy"
import * as id from "./id"
import * as it from "./it"
import * as ja from "./ja"
import * as ka from "./ka"
import * as kk from "./kk"
import * as ko from "./ko"
import * as ky from "./ky"
import * as lt from "./lt"
import * as lv from "./lv"
import * as mk from "./mk"
import * as mn from "./mn"
import * as nb from "./nb"
import * as nl from "./nl"
import * as nn from "./nn"
import * as pl from "./pl"
import * as pt from "./pt"
import * as ro from "./ro"
import * as ru from "./ru"
import * as sk from "./sk"
import * as sl from "./sl"
import * as sr from "./sr"
import * as sv from "./sv"
import * as tr from "./tr"
import * as uk from "./uk"
import * as uz from "./uz"
import * as zh from "./zh"

function parse(country: string): Alpha2 | undefined {
	return (
		ar.parse(country) ||
		az.parse(country) ||
		be.parse(country) ||
		bg.parse(country) ||
		bs.parse(country) ||
		ca.parse(country) ||
		cs.parse(country) ||
		da.parse(country) ||
		de.parse(country) ||
		el.parse(country) ||
		en.parse(country) ||
		es.parse(country) ||
		et.parse(country) ||
		fa.parse(country) ||
		fi.parse(country) ||
		fr.parse(country) ||
		he.parse(country) ||
		hr.parse(country) ||
		hu.parse(country) ||
		hy.parse(country) ||
		id.parse(country) ||
		it.parse(country) ||
		ja.parse(country) ||
		ka.parse(country) ||
		kk.parse(country) ||
		ko.parse(country) ||
		ky.parse(country) ||
		lt.parse(country) ||
		lv.parse(country) ||
		mk.parse(country) ||
		mn.parse(country) ||
		nb.parse(country) ||
		nl.parse(country) ||
		nn.parse(country) ||
		pl.parse(country) ||
		pt.parse(country) ||
		ro.parse(country) ||
		ru.parse(country) ||
		sk.parse(country) ||
		sl.parse(country) ||
		sr.parse(country) ||
		sv.parse(country) ||
		tr.parse(country) ||
		uk.parse(country) ||
		uz.parse(country) ||
		zh.parse(country)
	)
}
function from(language: Language, country: Alpha2 | Alpha3 | Numeric): string {
	let result: string
	switch (language) {
		case "ar":
			result = ar.from(country)
			break
		case "az":
			result = az.from(country)
			break
		case "be":
			result = be.from(country)
			break
		case "bg":
			result = bg.from(country)
			break
		case "bs":
			result = bs.from(country)
			break
		case "ca":
			result = ca.from(country)
			break
		case "cs":
			result = cs.from(country)
			break
		case "da":
			result = da.from(country)
			break
		case "de":
			result = de.from(country)
			break
		case "el":
			result = el.from(country)
			break
		default:
		case "en":
			result = en.from(country)
			break
		case "es":
			result = es.from(country)
			break
		case "et":
			result = et.from(country)
			break
		case "fa":
			result = fa.from(country)
			break
		case "fi":
			result = fi.from(country)
			break
		case "fr":
			result = fr.from(country)
			break
		case "he":
			result = he.from(country)
			break
		case "hr":
			result = hr.from(country)
			break
		case "hu":
			result = hu.from(country)
			break
		case "hy":
			result = hy.from(country)
			break
		case "id":
			result = id.from(country)
			break
		case "it":
			result = it.from(country)
			break
		case "ja":
			result = ja.from(country)
			break
		case "ka":
			result = ka.from(country)
			break
		case "kk":
			result = kk.from(country)
			break
		case "ko":
			result = ko.from(country)
			break
		case "ky":
			result = ky.from(country)
			break
		case "lt":
			result = lt.from(country)
			break
		case "lv":
			result = lv.from(country)
			break
		case "mk":
			result = mk.from(country)
			break
		case "mn":
			result = mn.from(country)
			break
		case "nb":
			result = nb.from(country)
			break
		case "nl":
			result = nl.from(country)
			break
		case "nn":
			result = nn.from(country)
			break
		case "pl":
			result = pl.from(country)
			break
		case "pt":
			result = pt.from(country)
			break
		case "ro":
			result = ro.from(country)
			break
		case "ru":
			result = ru.from(country)
			break
		case "sk":
			result = sk.from(country)
			break
		case "sl":
			result = sl.from(country)
			break
		case "sr":
			result = sr.from(country)
			break
		case "sv":
			result = sv.from(country)
			break
		case "tr":
			result = tr.from(country)
			break
		case "uk":
			result = uk.from(country)
			break
		case "uz":
			result = uz.from(country)
			break
		case "zh":
			result = zh.from(country)
			break
	}
	return result
}
export {
	ar,
	az,
	be,
	bg,
	bs,
	ca,
	cs,
	da,
	de,
	el,
	en,
	es,
	et,
	fa,
	fi,
	fr,
	he,
	hr,
	hu,
	hy,
	id,
	it,
	ja,
	ka,
	kk,
	ko,
	ky,
	lt,
	lv,
	mk,
	mn,
	nb,
	nl,
	nn,
	pl,
	pt,
	ro,
	ru,
	sk,
	sl,
	sr,
	sv,
	tr,
	uk,
	uz,
	zh,
	from,
	parse,
}
