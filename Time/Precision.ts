import { isly } from "isly"

export type Precision = typeof Precision.values[number]
export namespace Precision {
	export const values = ["hours", "minutes", "seconds", "milliseconds"] as const
	export const type = isly.string<Precision>(Precision.values)
	export const is = type.is
	export const flaw = type.flaw
	export const factor = {
		hours: 3600000,
		minutes: 60000,
		seconds: 1000,
		milliseconds: 1,
	} as const
}
