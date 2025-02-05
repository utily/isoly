import { isly } from "isly"
import { Numeric as YearNumeric } from "./Numeric"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type Year = `${Digit}${Digit}${Digit}${Digit}`

export namespace Year {
	export import Numeric = YearNumeric
	export const type = isly<Year>("string", "value", /^[0-9]{4}$/)
		.rename("isoly.Date.Year")
		.describe("Year in a 4-digit form (YYYY).")
	export const is = type.is.bind(type)
	export const flawed = type.flawed.bind(type)
	export function create(value: Numeric): Year
	export function create(value: number): Year | undefined
	export function create(value: number | Numeric): Year | undefined {
		return Numeric.is(value) ? (value.toString().padStart(4, "0") as Year) : undefined
	}
	export function isLeapYear(year: Year | Numeric): boolean {
		return Numeric.isLeapYear(typeof year == "number" ? year : Numeric.parse(year))
	}
}
