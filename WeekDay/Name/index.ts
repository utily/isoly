import { isly } from "isly"
import { Date } from "../../Date"
import { Number } from "../Number"

export type Name = typeof Name.values[number]
export namespace Name {
	export const values = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
	export const { type, is, flawed } = isly
		.string<Name>("value", ...values)
		.rename("isoly.WeekDay.Name")
		.describe("Lower case weekday name in English.")
		.bind()

	export function from(value: number | Date): Name {
		return typeof value == "number" ? values[value - 1] : from(Number.from(value))
	}
	export function toNumber(value: Name): Number {
		return (values.indexOf(value) + 1) as Number
	}
}
