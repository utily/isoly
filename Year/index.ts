import { isly } from "isly"
import { Digit } from "../Digit"
import { Numeric as _Numeric } from "./Numeric"

export type Year = `${Digit.Double}${Digit.Double}`

export namespace Year {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Year>("value", /^[0-9]{4}$/)
		.rename("isoly.Year")
		.describe("Year in a 4-digit form (YYYY).")
		.bind()
	export function parse(value: Year): Numeric
	export function parse(value: Year | string | undefined): Numeric | undefined
	export function parse(value: Year | string | undefined): Numeric | undefined {
		const result = value == undefined ? undefined : Number.parseInt(value)
		return Number.isSafeInteger(result) ? new Numeric(result) : undefined
	}
	export function from(value: globalThis.Date | Numeric | number | Year | string | undefined): Year | undefined {
		return value == undefined ? undefined : (typeof value == "string" ? parse(value) : Numeric.create(value))?.format()
	}
	export function isLeapYear(year: Year | Numeric | number): boolean {
		return (typeof year == "string" ? parse(year) : Numeric.create(year))?.leapYear
	}
	export function length(year: Year | Numeric | number, precision: "weeks"): 52 | 53
	export function length(year: Year | Numeric | number, precision: "days"): 365 | 366
	export function length(year: Year | Numeric | number, precision: "weeks" | "days"): 52 | 53 | 365 | 366 {
		return (typeof year == "string" ? parse(year) : Numeric.create(year))?.length(precision)
	}
}
