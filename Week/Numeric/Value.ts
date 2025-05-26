import { isly } from "isly"
import { Year } from "../../Year"

export interface Value extends Year.Numeric.Value {
	readonly weeks?: number
}
export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({ weeks: isly.number("integer").rename("isoly.Week.Numeric.Value") })
		.bind()
}
