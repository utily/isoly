import { isly } from "isly"
import { Year } from "./Year"

export type Month = typeof Month.values[number]

export namespace Month {
	export const values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const
	export const type = isly.named("isoly.Date.Month", isly.string<Month>(values))
	export const is = type.is
	export const flaw = type.flaw
	export type Numeric = typeof Numeric.values[number]
	export namespace Numeric {
		export const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
		export const type = isly.named("isoly.Date.Month.Numeric", isly.number<Numeric>(values))
		export const is = type.is
		export const flaw = type.flaw
	}
	export function length(month: Month, year?: Year): 28 | 29 | 30 | 31 {
		return (
			{
				"01": 31,
				"02": year != undefined && Year.isLeapYear(year) ? 29 : 28,
				"03": 31,
				"04": 30,
				"05": 31,
				"06": 30,
				"07": 31,
				"08": 31,
				"09": 30,
				"10": 31,
				"11": 30,
				"12": 31,
			} as const
		)[month]
	}
	export function parse(value: Month): Month.Numeric
	export function parse(value: string): Month.Numeric | undefined
	export function parse(value: string): Month.Numeric | undefined {
		return Month.Numeric.type.get(Number.parseInt(value))
	}
	export function create(value: Month.Numeric): Month
	export function create(value: number): Month | undefined
	export function create(value: number): string | undefined {
		return Month.type.get(value.toString().padStart(2, "0"))
	}
}
