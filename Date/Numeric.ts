import { isly } from "isly"
import type { Date } from "./index"

export interface Numeric {
	years?: number
	months?: number
	days?: number
}

export namespace Numeric {
	export const type = isly.object<Numeric>(
		{ years: isly.number().optional(), months: isly.number().optional(), days: isly.number().optional() },
		"isoly.Date.Numeric"
	)
	export const is = type.is
	export const flaw = type.flaw
	export function parse(value: Date | string | undefined): Numeric {
		const [year, month, day] =
			value
				?.split("-", 3)
				.map(v => Number.parseInt(v))
				.map(v => (Number.isSafeInteger(v) ? v : undefined)) ?? []
		return {
			...(year ? { years: year } : {}),
			...(month ? { months: month - 1 } : {}),
			...(day ? { days: day - 1 } : {}),
		}
	}
	export function format(value: Numeric): Date {
		return new globalThis.Date(globalThis.Date.UTC(value.years ?? 0, value.months ?? 0, (value.days ?? 0) + 1, 12))
			.toISOString()
			.substring(0, 10)
	}
}
