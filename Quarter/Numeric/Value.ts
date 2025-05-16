import { isly } from "isly"
import { Year } from "../../Year"

export interface Value extends Year.Numeric.Value {
	readonly quarters?: number
}
export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({ years: isly.number("integer"), quarters: isly.number("integer") })
		.rename("isoly.Quarter.Numeric.Value")
		.bind()
}
