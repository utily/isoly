import { isly } from "isly"
import type { Year } from "./index"

export type Numeric = number
export namespace Numeric {
	export const { type, is, flawed } = isly
		.number<Numeric>("range", 0, 9999)
		.restrict("integer")
		.rename("isoly.Date.Year.Numeric")
		.describe("Numeric year between 0 and 9999.")
		.bind()
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
