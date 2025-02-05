import { isly } from "isly"
import { CountryCode } from "../CountryCode"

export type Generic = {
	countryCode: CountryCode.Alpha2
	street: string
	zipCode: string
	city: string
	county?: string
	state?: string
}

export namespace Generic {
	export const type = isly<Generic>(
		"object",
		{
			countryCode: CountryCode.Alpha2.type,
			street: isly("string"),
			zipCode: isly("string"),
			city: isly("string"),
			county: isly("string").optional(),
			state: isly("string").optional(),
		},
		"isoly.Address.Generic"
	)
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
}
