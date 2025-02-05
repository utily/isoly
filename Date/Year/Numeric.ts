import { isly } from "isly"
import type { Year } from "./index"

export type Numeric = number
export namespace Numeric {
	export const type = isly<Numeric>("number", "range", 0, 9999)
		.restrict("integer")
		.rename("isoly.Date.Year.Numeric")
		.describe("Numeric year between 0 and 9999.")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export function parse(value: Year): Numeric
	export function parse(value: string): Numeric | undefined
	export function parse(value: string | Year): Numeric | undefined {
		const result = Number.parseInt(value)
		return Numeric.is(result) ? result : undefined
	}
	export function isLeapYear(year: Numeric): boolean {
		return !!year && year % 4 === 0 && (year % 100 != 0 || year % 400 == 0)
	}
}
