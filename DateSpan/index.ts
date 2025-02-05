import { isly } from "isly"

export interface DateSpan {
	years?: number
	months?: number
	days?: number
}

export namespace DateSpan {
	export const type = isly<DateSpan>("object", {
		years: isly("number").optional(),
		months: isly("number").optional(),
		days: isly("number").optional(),
	})
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
}
