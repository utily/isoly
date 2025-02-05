import { isly } from "isly"

export type SE = {
	countryCode: "SE"
	street: string
	zipCode: string
	city: string
}

export namespace SE {
	export const type = isly<SE>(
		"object",
		{
			countryCode: isly<"SE">("string", "value", "SE"),
			street: isly("string"),
			zipCode: isly("string"),
			city: isly("string"),
		},
		"isoly.Address.SE"
	)
}
