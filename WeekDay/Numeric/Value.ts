import { isly } from "isly"

export interface Value {
	readonly years?: number
	readonly weeks?: number
	readonly days?: number
}
export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({
			years: isly.number("integer").restrict("positive").rename("isoly.Year.Numeric.Value"),
			weeks: isly.number("integer").rename("isoly.Year.Numeric.Value"),
			days: isly.number("integer").rename("isoly.Year.Numeric.Value"),
		})
		.bind()
}
