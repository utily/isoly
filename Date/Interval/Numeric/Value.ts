import { isly } from "isly"
import { Numeric as DateNumeric } from "../../Numeric"

export interface Value {
	start: DateNumeric.Value
	end: DateNumeric.Value
}

export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({
			start: DateNumeric.Value.type,
			end: DateNumeric.Value.type,
		})
		.rename("isoly.Date.Interval.Value")
		.describe("Interval value with start and end dates.")
		.bind()
}
