import { isly } from "isly"

export type Numeric = typeof Numeric.values[number]
export namespace Numeric {
	export const values = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
	] as const
	export const type = isly.named<Numeric>("isoly.Week.Number.Numeric", isly.number(Numeric.values))
	export const is = type.is
	export const flaw = type.flaw

	export function parse(value: string): number | undefined {
		return type.get(globalThis.Number.parseInt(value))
	}
}
