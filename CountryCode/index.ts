import { isly } from "isly"
import { Alpha2 as CountryCodeAlpha2 } from "./Alpha2"
import { Alpha3 as CountryCodeAlpha3 } from "./Alpha3"
import { Name as CountryCodeName } from "./Name"
import { Numeric as CountryCodeNumeric } from "./Numeric"

export type CountryCode = CountryCode.Alpha2 | CountryCode.Alpha3 | CountryCode.Numeric

export namespace CountryCode {
	export import Alpha2 = CountryCodeAlpha2
	export import Alpha3 = CountryCodeAlpha3
	export import Name = CountryCodeName
	export import Numeric = CountryCodeNumeric
	export const { type, is, flawed } = isly
		.union<CountryCode>(Alpha2.type, Alpha3.type, Numeric.type)
		.rename("isoly.CountryCode")
		.bind()
}
