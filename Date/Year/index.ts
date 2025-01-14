import { isly } from "isly"
import { Numeric as YearNumeric } from "./Numeric"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type Year = `${Digit}${Digit}${Digit}${Digit}`

export namespace Year {
	export import Numeric = YearNumeric
	export const type = isly.named(
		"isoly.Date.Year",
		isly.string<Year>((value: string) => /^[0-9]{4}$/.test(value), "YYYY")
	)
	export const is = type.is
	export const flaw = type.flaw
	export function create(value: Numeric): Year
	export function create(value: number): Year | undefined
	export function create(value: number | Numeric): Year | undefined {
		return Numeric.is(value) ? (value.toString().padStart(4, "0") as Year) : undefined
	}
	export function isLeapYear(year: Year | Numeric): boolean {
		return Numeric.isLeapYear(typeof year == "number" ? year : Numeric.parse(year))
	}
}
