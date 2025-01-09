import { isly } from "isly"
import { Date } from "../Date"
import { Numeric as DayOfWeekNumeric } from "./Numeric"

export type DayOfWeek = typeof DayOfWeek.values[number]

export namespace DayOfWeek {
	export import Numeric = DayOfWeekNumeric
	export const values = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
	export const type = isly.named<DayOfWeek>("isoly.DayOfWeek", isly.string(values))
	export const is = type.is
	export const flaw = type.flaw

	export function from(value: Numeric | Date): DayOfWeek {
		return Numeric.is(value) ? values[value - 1] : from(Numeric.from(value))
	}
	export function toNumeric(value: DayOfWeek): Numeric {
		return (values.indexOf(value) + 1) as Numeric
	}
}
