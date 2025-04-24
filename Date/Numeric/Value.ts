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
}
