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
}
