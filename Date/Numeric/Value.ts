import { isly } from "isly"
import { Month } from "../../Month"

export interface Value extends Month.Numeric.Value {
	days?: number
}
export namespace Value {
	export const { type, is, flawed } = Month.Numeric.Value.type
		.extend<Value>({ days: isly.number().optional() }, "isoly.Date.Numeric.Value")
		.describe("Value of years, months, and days.")
		.bind()
	export interface Normalized extends Month.Numeric.Value.Normalized {
		days:
			| 0
			| 1
			| 2
			| 3
			| 4
			| 5
			| 6
			| 7
			| 8
			| 9
			| 10
			| 11
			| 12
			| 13
			| 14
			| 15
			| 16
			| 17
			| 18
			| 19
			| 20
			| 21
			| 22
			| 23
			| 24
			| 25
			| 26
			| 27
			| 28
			| 29
			| 30
	}
	export namespace Normalized {
		export const { type, is, flawed } = Month.Numeric.Value.Normalized.type
			.extend<Normalized>({
				days: isly.number<Normalized["days"]>("integer").restrict("integer").restrict("range", 0, 30),
			})
			.bind()
	}
}
