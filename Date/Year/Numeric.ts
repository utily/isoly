import { isly } from "isly"
import type { Year } from "./index"

export type Numeric = number
export namespace Numeric {
	export const type = isly.named(
		"isoly.Date.Year.Numeric",
		isly.number<Numeric>(value => value >= 0 && value <= 9999 && Number.isInteger(value))
	)
	export const is = type.is
	export const flaw = type.flaw
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
