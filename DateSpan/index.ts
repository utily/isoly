import { isly } from "isly"

export interface DateSpan {
	years?: number
	months?: number
	days?: number
}

export namespace DateSpan {
	export const type = isly.object<DateSpan>({
		years: isly.number().optional(),
		months: isly.number().optional(),
		days: isly.number().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
