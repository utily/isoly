import { isly } from "isly"

export type GB = {
	country: "GB"
	street: string
	building: string
	zipCode: string
	city: string
}

export namespace GB {
	export const { type, is, flawed } = isly
		.object<GB>(
			{
				country: isly.string("value", "GB"),
				street: isly.string(),
				building: isly.string(),
				zipCode: isly.string(),
				city: isly.string(),
			},
			"isoly.Address.GB"
		)
		.bind()
}
