import { isly } from "isly"

export type GB = {
	countryCode: "GB"
	street: string
	building: string
	zipCode: string
	city: string
}

export namespace GB {
	export const { type, is, flawed } = isly
		.object<GB>(
			{
				countryCode: isly.string("value", "GB"),
				street: isly.string(),
				building: isly.string(),
				zipCode: isly.string(),
				city: isly.string(),
			},
			"isoly.Address.GB"
		)
		.bind()
}
