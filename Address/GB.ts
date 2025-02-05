import { isly } from "isly"

export type GB = {
	countryCode: "GB"
	street: string
	building: string
	zipCode: string
	city: string
}

export namespace GB {
	export const type = isly<GB>(
		"object",
		{
			countryCode: isly<"GB">("string", "value", "GB"),
			street: isly("string"),
			building: isly("string"),
			zipCode: isly("string"),
			city: isly("string"),
		},
		"isoly.Address.GB"
	)
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
}
