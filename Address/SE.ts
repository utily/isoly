import { isly } from "isly"

export type SE = {
	countryCode: "SE"
	street: string
	zipCode: string
	city: string
}

export namespace SE {
	export const type = isly.object<SE>(
		{
			countryCode: isly.string<"SE">("SE"),
			street: isly.string(),
			zipCode: isly.string(),
			city: isly.string(),
		},
		"isoly.Address.SE"
	)
	export const is = type.is
	export const flaw = type.flaw
}
