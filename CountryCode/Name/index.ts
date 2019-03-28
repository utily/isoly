import { Alpha2 } from ".."
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
	return ar.parse(country) || az.parse(country) || be.parse(country) || bg.parse(country) || bs.parse(country) || ca.parse(country) ||
		cs.parse(country) || da.parse(country) || de.parse(country) || el.parse(country) || en.parse(country) || es.parse(country) ||
		et.parse(country) || fa.parse(country) || fi.parse(country) || fr.parse(country) || he.parse(country) || hr.parse(country) ||
		hu.parse(country) || hy.parse(country) || id.parse(country) || it.parse(country) || ja.parse(country) || ka.parse(country) ||
		kk.parse(country) || ko.parse(country) || ky.parse(country) || lt.parse(country) || lv.parse(country) || mk.parse(country) ||
		mn.parse(country) || nb.parse(country) || nl.parse(country) || nn.parse(country) || pl.parse(country) || pt.parse(country) ||
		ro.parse(country) || ru.parse(country) || sk.parse(country) || sl.parse(country) || sr.parse(country) || sv.parse(country) ||
		tr.parse(country) || uk.parse(country) || uz.parse(country) || zh.parse(country)
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
	parse,
}
