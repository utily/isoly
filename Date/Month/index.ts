import { isly } from "isly"
import { Year } from "../Year"
import { Numeric as MonthNumeric } from "./Numeric"

export type Month = typeof Month.values[number]

export namespace Month {
	export import Numeric = MonthNumeric
	export const values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const
	export const { type, is, flawed } = isly
		.string<Month>("value", ...values)
		.rename("isoly.Date.Month")
		.bind()
	export function create(value: Numeric): Month
	export function create(value: number): Month | undefined
	export function create(value: number): string | undefined {
		return Month.type.get(value.toString().padStart(2, "0"))
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
}
