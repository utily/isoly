import { isly } from "isly"

export type Hour = typeof Hour.values[number]

export namespace Hour {
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
	] as const
	export const type = isly<Hour>("string", "value", ...values).rename("isoly.Time.Hour")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export type Numeric = typeof Numeric.values[number]
	export namespace Numeric {
		export const values = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
		] as const
		export const type = isly<Numeric>("number", "value", ...values).rename("isoly.Time.Hour.Numeric")
		export const is = type.is.bind(type) as typeof type.is
		export const flawed = type.flawed.bind(type) as typeof type.flawed
	}
	export function parse(value: Hour): Hour.Numeric
	export function parse(value: string): Hour.Numeric | undefined
	export function parse(value: string): Hour.Numeric | undefined {
		return Hour.Numeric.type.get(Number.parseInt(value))
	}
	export function create(value: Hour.Numeric): Hour
	export function create(value: number): Hour | undefined
	export function create(value: number): string | undefined {
		return Hour.type.get(value.toString().padStart(2, "0"))
	}
}
