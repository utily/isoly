import { isly } from "isly"
import { Numeric as DayNumeric } from "./Numeric"

export type Day = typeof Day.values[number]

export namespace Day {
	export import Numeric = DayNumeric
	export const values = [
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24",
		"25",
		"26",
		"27",
		"28",
		"29",
		"30",
		"31",
	] as const
	export const type = isly<Day>("string", "value", ...values).rename("isoly.Date.Day")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export function create(value: Day.Numeric): Day
	export function create(value: number): Day | undefined
	export function create(value: number): string | undefined {
		return Day.type.get(value.toString().padStart(2, "0"))
	}
}
