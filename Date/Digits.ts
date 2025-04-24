import { isly } from "isly"

export type Digits = typeof Digits.values[number]
export namespace Digits {
	export const values = [
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24",
		"25",
		"26",
		"27",
		"28",
		"29",
		"30",
		"31",
	] as const
	export const { type, is, flawed } = isly
		.string<Digits>("value", ...values)
		.rename("isoly.Date.Digits")
		.describe("Digits of day of month.")
		.bind()
}
