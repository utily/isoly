import { isly } from "isly"
import { Country } from "../Country"

export type Generic = {
	country: Country.Alpha2
	street: string
	zipCode: string
	city: string
	county?: string
	state?: string
}

export namespace Generic {
	export const { type, is, flawed } = isly
		.object<Generic>(
			{
				country: Country.Alpha2.type,
				street: isly.string(),
				zipCode: isly.string(),
				city: isly.string(),
				county: isly.string().optional(),
				state: isly.string().optional(),
			},
			"isoly.Address.Generic"
		)
		.bind()
}
