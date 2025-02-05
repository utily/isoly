import { isly } from "isly"

export type Precision = typeof Precision.values[number]
export namespace Precision {
	export const values = ["hours", "minutes", "seconds", "milliseconds"] as const
	export const type = isly<Precision>("string", "value", ...values).rename("isoly.Time.Minute.Numeric")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export const factor = {
		hours: 3600000,
		minutes: 60000,
		seconds: 1000,
		milliseconds: 1,
	} as const
}
