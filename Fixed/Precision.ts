import { isly } from "isly"

export type Precision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export namespace Precision {
	export const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
	export const { type, is, flawed } = isly
		.number<Precision>("value", ...values)
		.rename("isoly.Fixed.Precision")
		.bind()
}
