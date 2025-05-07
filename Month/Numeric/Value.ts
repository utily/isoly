import { isly } from "isly"
import { Year } from "../../Year"

export interface Value extends Year.Numeric.Value {
	readonly months?: number
}
export namespace Value {
	export const { type, is, flawed } = Year.Numeric.Value.type
		.extend<Value>({ months: isly.number().optional() }, "isoly.Month.Numeric.Value")
		.describe("Value of year and month.")
		.bind()
	export interface Normalized {
		years: number
		months: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
	}
	export namespace Normalized {
		export const { type, is, flawed } = isly
			.object<Normalized>({
				years: isly.number("integer").restrict("positive"),
				months: isly.number("value", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11),
			})
			.bind()
	}
}
