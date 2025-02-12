import { isly } from "isly"

export interface DateSpan {
	years?: number
	months?: number
	days?: number
}

export namespace DateSpan {
	export const { type, is, flawed } = isly
		.object<DateSpan>({
			years: isly.number().optional(),
			months: isly.number().optional(),
			days: isly.number().optional(),
		})
		.bind()
}
