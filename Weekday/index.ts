import { isly } from "isly"

export type Weekday = typeof Weekday.values[number]
export namespace Weekday {
	export const values = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
	export const { type, is, flawed } = isly
		.string<Weekday>("value", ...values)
		.rename("isoly.Weekday")
		.describe("A lower case day of week in English.")
		.bind()
}
