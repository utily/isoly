import { isly } from "isly"

export type Digit = typeof Digit.values[number]
export namespace Digit {
	export const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
	export const { type, is, flawed } = isly.string<Digit>("value", values).rename("isoly.Digit").bind()
}
