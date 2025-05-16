import { isly } from "isly"

export type Weekday = typeof Weekday.values[number]
export namespace Weekday {
	export const values = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
	export const { type, is, flawed } = isly
		.string<Weekday>("value", ...values)
		.rename("isoly.Weekday")
		.describe("A lower case day of week in English.")
		.bind()
	export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6
	export namespace Index {
		export const values = [0, 1, 2, 3, 4, 5, 6] as const
		export const { type, is, flawed } = isly
			.number<Index>("value", ...values)
			.rename("isoly.Weekday.Index")
			.describe("A number representing the index of a weekday.")
			.bind()
	}
	export function from(value: Index | Weekday): Weekday
	export function from(value: number | string | undefined): Weekday | undefined
	export function from(value: number | string | undefined): Weekday | undefined {
		return typeof value == "number"
			? value >= 0 && value <= 6
				? Weekday.values[value]
				: undefined
			: (lower => (lower && lower.length > 1 ? values.find(v => v.startsWith(lower)) : undefined))(value?.toLowerCase())
	}
	export function parse(value: Weekday): Index
	export function parse(value: Weekday | string | undefined): Index | undefined
	export function parse(value: Weekday | string | undefined): Index | undefined {
		const lower = from(value)
		return (
			lower && ({ monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6 } as const)[lower]
		)
	}
}
