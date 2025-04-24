import { isly } from "isly"

export type Digits = typeof Digits.values[number]
export namespace Digits {
	export const values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const
	export const { type, is, flawed } = isly
		.string<Digits>("value", ...values)
		.rename("isoly.Month.Digits")
		.bind()
}
