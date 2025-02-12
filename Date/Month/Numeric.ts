import { isly } from "isly"
import type { Month } from "./index"

export type Numeric = typeof Numeric.values[number]

export namespace Numeric {
	export const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
	export const { type, is, flawed } = isly
		.number<Numeric>("value", ...values)
		.rename("isoly.Date.Month.Numeric")
		.bind()

	export function parse(value: Month): Numeric
	export function parse(value: string): Numeric | undefined
	export function parse(value: string): Numeric | undefined {
		return Numeric.type.get(Number.parseInt(value))
	}
}
