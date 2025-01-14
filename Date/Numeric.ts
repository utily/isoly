import { isly } from "isly"
import type { Date } from "./index"

export interface Numeric {
	year?: number
	month?: number
	day?: number
}

export namespace Numeric {
	export const type = isly.object<Numeric>(
		{ year: isly.number().optional(), month: isly.number().optional(), day: isly.number().optional() },
		"isoly.Date.Numeric"
	)
	export const is = type.is
	export const flaw = type.flaw
	export function parse(value: Date | string | undefined): Numeric {
		const [year, month, day] = value?.split("-", 3).map(v => Number.parseInt(v)) ?? []
		return { ...(year ? { year } : {}), ...(month ? { month } : {}), ...(day ? { day } : {}) }
	}
	export function format(value: Numeric): Date {
		return new globalThis.Date(globalThis.Date.UTC(value.year ?? 0, (value.month ?? 1) - 1, value.day ?? 1, 12))
			.toISOString()
			.substring(0, 10)
	}
}
