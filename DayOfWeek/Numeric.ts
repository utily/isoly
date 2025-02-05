import { isly } from "isly"
import { Date } from "../Date"

export type Numeric = typeof Numeric.values[number]

export namespace Numeric {
	export const values = [1, 2, 3, 4, 5, 6, 7] as const
	export const type = isly<Numeric>("number", "value", ...values).rename("isoly.DayOfWeek.Numeric")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export function from(date: Date): Numeric {
		return (((Date.getWeekDay(date) + 7 - 1) % 7) + 1) as Numeric
	}
}
