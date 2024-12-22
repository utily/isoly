import { isly } from "isly"

export type Second = typeof Second.values[number]

export namespace Second {
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
		"60", // Added leap second
	] as const
	export const type = isly.named("isoly.Time.Second", isly.string<Second>(values))
	export const is = type.is
	export const flaw = type.flaw
	export type Numeric = typeof Numeric.values[number]
	export namespace Numeric {
		export const values = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			21,
			22,
			23,
			24,
			25,
			26,
			27,
			28,
			29,
			30,
			31,
			32,
			33,
			34,
			35,
			36,
			37,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			46,
			47,
			48,
			49,
			50,
			51,
			52,
			53,
			54,
			55,
			56,
			57,
			58,
			59,
			60, // Added leap second
		] as const
		export const type = isly.named("isoly.Time.Second.Numeric", isly.number<Numeric>(values))
		export const is = type.is
		export const flaw = type.flaw
	}
	export function parse(value: Second): Second.Numeric
	export function parse(value: string): Second.Numeric | undefined
	export function parse(value: string): Second.Numeric | undefined {
		return Second.Numeric.type.get(Number.parseInt(value))
	}
	export function create(value: Second.Numeric): Second
	export function create(value: number): Second | undefined
	export function create(value: number): string | undefined {
		return Second.type.get(value.toString().padStart(2, "0"))
	}
}
