import { isly } from "isly"
import { Digit } from "../Digit"
import { Numeric as _Numeric } from "./Numeric"

export type Year = `${Digit}${Digit}${Digit}${Digit}`

export namespace Year {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Year>("value", /^[0-9]{4}$/)
		.rename("isoly.Year")
		.describe("Year in a 4-digit form (YYYY).")
		.bind()
	export function create(value: Numeric): Year
	export function create(value: number): Year | undefined
	export function create(value: number | Numeric): Year | undefined {
		return Numeric.is(value) ? (value.toString().padStart(4, "0") as Year) : undefined
	}
	export function isLeapYear(year: Year | Numeric): boolean {
		return Numeric.parse(year).leapYear
	}
	export function length(year: Year | Numeric | number, precision: "weeks"): 52 | 53
	export function length(year: Year | Numeric | number, precision: "days"): 365 | 366
	export function length(year: Year | Numeric | number, precision: "weeks" | "days"): 52 | 53 | 365 | 366 {
		return Numeric.parse(year).length(precision)
	}
}
