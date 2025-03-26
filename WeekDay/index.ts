import { isly } from "isly"
import { Date } from "../Date"
import { Week } from "../Week"
import { Name as _Name } from "./Name"
import { Number as _Number } from "./Number"
import { Numeric as _Numeric } from "./Numeric"

export type WeekDay = `${Week}-${WeekDay.Number}`
export namespace WeekDay {
	export import Name = _Name
	export import Number = _Number
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<WeekDay>("value", /^[1-7]$/)
		.rename("isoly.WeekDay")
		.describe("Weekday number in a 1-digit form (1-7).")
		.bind()
	export function from(date: Date): WeekDay {
		return Number.from(date).toString()
	}
	export function toNumber(value: WeekDay): number {
		return Number.from(value)
	}
}
