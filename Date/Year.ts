import { isly } from "isly"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type Year = `${Digit}${Digit}${Digit}${Digit}`

export namespace Year {
	export const type = isly.named(
		"isoly.Date.Year",
		isly.string<Year>((value: string) => /^[0-9]{4}$/.test(value), "YYYY")
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Numeric = number
	export namespace Numeric {
		export const type = isly.named(
			"isoly.Date.Year.Numeric",
			isly.number<Numeric>(value => value >= 0 && value <= 9999)
		)
		export const is = type.is
		export const flaw = type.flaw
	}
	export function parse(value: Year): Numeric
	export function parse(value: string): Numeric | undefined
	export function parse(value: string | Year): Numeric | undefined {
		const result = Number.parseInt(value)
		return Numeric.is(result) ? result : undefined
	}
	export function create(value: Numeric): Year
	export function create(value: number): Year | undefined
	export function create(value: number | Numeric): Year | undefined {
		return Numeric.is(value) ? (value.toString().padStart(4, "0") as Year) : undefined
	}
	export function isLeapYear(year: Year | Numeric): boolean {
		return Numeric.is(year) ? year % 4 === 0 && (year % 100 != 0 || year % 400 == 0) : isLeapYear(parse(year) ?? 0)
	}
}
