import { isly } from "isly"
import { Date } from "../../Date"

export type Number = typeof Number.values[number]

export namespace Number {
	export const values = [1, 2, 3, 4, 5, 6, 7] as const
	export const { type, is, flawed } = isly
		.number<Number>("value", ...values)
		.rename("isoly.WeekDay.Number")
		.bind()
	export function from(date: Date): Number {
		return (((Date.getWeekDay(date) + 7 - 1) % 7) + 1) as Number
	}
}
