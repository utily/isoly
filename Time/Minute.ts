import { isly } from "isly"

export type Minute = typeof Minute.values[number]

export namespace Minute {
	export const values = [
		"00",
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
		"32",
		"33",
		"34",
		"35",
		"36",
		"37",
		"38",
		"39",
		"40",
		"41",
		"42",
		"43",
		"44",
		"45",
		"46",
		"47",
		"48",
		"49",
		"50",
		"51",
		"52",
		"53",
		"54",
		"55",
		"56",
		"57",
		"58",
		"59",
	] as const
	export const { type, is, flawed } = isly
		.string<Minute>("value", ...values)
		.rename("isoly.Time.Minute")
		.bind()
	export type Numeric = typeof Numeric.values[number]
	export namespace Numeric {
		export const values = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
			31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
			59,
		] as const
		export const { type, is, flawed } = isly
			.number<Numeric>("value", ...values)
			.rename("isoly.Time.Minute.Numeric")
			.bind()
	}
	export function parse(value: Minute): Minute.Numeric
	export function parse(value: string): Minute.Numeric | undefined
	export function parse(value: string): Minute.Numeric | undefined {
		return Minute.is(value) ? Minute.Numeric.type.get(Number.parseInt(value)) : undefined
	}
	export function create(value: Minute.Numeric): Minute
	export function create(value: number): Minute | undefined
	export function create(value: number): string | undefined {
		return Minute.type.get(value.toString().padStart(2, "0"))
	}
}
