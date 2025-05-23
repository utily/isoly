import { isly } from "isly"

export type SE = {
	countryCode: "SE"
	street: string
	zipCode: string
	city: string
}

export namespace SE {
	export const { type, is, flawed } = isly
		.object<SE>(
			{
				countryCode: isly.string<"SE">("value", "SE"),
				street: isly.string(),
				zipCode: isly.string(),
				city: isly.string(),
			},
			"isoly.Address.SE"
		)
		.bind()
}
