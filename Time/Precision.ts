import { isly } from "isly"

export type Precision = typeof Precision.values[number]
export namespace Precision {
	export const values = ["hours", "minutes", "seconds", "milliseconds"] as const
	export const { type, is, flawed } = isly
		.string<Precision>("value", ...values)
		.rename("isoly.Time.Minute.Numeric")
		.bind()
	export const factor = {
		hours: 3600000,
		minutes: 60000,
		seconds: 1000,
		milliseconds: 1,
	} as const
}
