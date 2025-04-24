import { isly } from "isly"
import { Alpha2 as _Alpha2 } from "./Alpha2"
import { Alpha3 as _Alpha3 } from "./Alpha3"
import { Name as _Name } from "./Name"
import { Numeric as _Numeric } from "./Numeric"

export type Country = Country.Alpha2 | Country.Alpha3 | Country.Numeric

export namespace Country {
	export import Alpha2 = _Alpha2
	export import Alpha3 = _Alpha3
	export import Name = _Name
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.union<Country>(Alpha2.type, Alpha3.type, Numeric.type)
		.rename("isoly.Country")
		.bind()
}
