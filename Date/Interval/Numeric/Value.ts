import { isly } from "isly"
import { Date } from "../../Date"

export interface Value {
	start: Date.Numeric.Value
	end: Date.Numeric.Value
}

export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({
			start: Date.Numeric.type,
			end: Date.Numeric.type,
		})
		.rename("isoly.Date.Interval.Value")
		.describe("Interval value with start and end dates.")
		.bind()
}
