import { isly } from "isly"

export interface Value {
	readonly years?: number
}
export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>({ years: isly.number("integer").optional() })
		.rename("isoly.Year.Numeric.Value")
		.bind()
}
