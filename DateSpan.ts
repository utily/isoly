export interface DateSpan {
	years?: number
	months?: number
	days?: number
}

export namespace DateSpan {
	export function is(value: DateSpan | any): value is DateSpan {
		return (
			typeof value == "object" &&
			!!value &&
			!Array.isArray(value) &&
			(typeof value.years == "number" || value.years == undefined) &&
			(typeof value.months == "number" || value.months == undefined) &&
			(typeof value.days == "number" || value.days == undefined)
		)
	}
}
