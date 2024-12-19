import { Alpha2 as CountryCodeAlpha2 } from "./Alpha2"
import { Alpha3 as CountryCodeAlpha3 } from "./Alpha3"
import * as CountryCodeName from "./Name"
import { Numeric as CountryCodeNumeric } from "./Numeric"

export namespace CountryCode {
	export import Alpha2 = CountryCodeAlpha2
	export import Alpha3 = CountryCodeAlpha3
	export import Name = CountryCodeName
	export import Numeric = CountryCodeNumeric
}
