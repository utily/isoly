import { isly } from "isly"
import type { Day } from "./"

export type Numeric = typeof Numeric.values[number]

export namespace Numeric {
	export const values = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
	] as const
	export const type = isly<Numeric>("number", "value", ...values).rename("isoly.Date.Day.Numeric")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed

	export function parse(value: Day): Numeric
	export function parse(value: string): Numeric | undefined
	export function parse(value: string): Numeric | undefined {
		return Numeric.type.get(Number.parseInt(value))
	}
}
