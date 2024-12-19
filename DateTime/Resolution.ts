import { isly } from "isly"

export type Resolution = typeof Resolution.values[number]

export namespace Resolution {
	export const values = ["days", "hours", "minutes", "seconds", "milliseconds"] as const
	export const type = isly.named("isoly.DateTime.Resolution", isly.string(values))
	export const is = type.is
	export const flaw = type.flaw
}
