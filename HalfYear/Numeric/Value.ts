import { isly } from "isly"
import { Year } from "../../Year"

export interface Value extends Year.Numeric.Value {
	readonly halfYears?: number
}
export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({ years: isly.number("integer"), halfYears: isly.number("integer") })
		.rename("isoly.HalfYear.Numeric.Value")
		.bind()
}
