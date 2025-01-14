import { isly } from "isly"
import type { Month } from "./index"

export type Numeric = typeof Numeric.values[number]

export namespace Numeric {
	export const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
	export const type = isly.named("isoly.Date.Month.Numeric", isly.number<Numeric>(values))
	export const is = type.is
	export const flaw = type.flaw

	export function parse(value: Month): Numeric
	export function parse(value: string): Numeric | undefined
	export function parse(value: string): Numeric | undefined {
		return Numeric.type.get(Number.parseInt(value))
	}
}
