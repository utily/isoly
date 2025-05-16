import { isly } from "isly"
import { Year } from "../Year"
import { Numeric as _Numeric } from "./Numeric"

export type Quarter = `${Year}-Q${1 | 2 | 3 | 4}`
export namespace Quarter {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly.string<Quarter>("value", /^\d{4}-Q[1-4]$/).bind()
	export function parse(value: Quarter): Numeric
	export function parse(value: Quarter | string | undefined): Numeric | undefined
	export function parse(value: Quarter | string | undefined): Numeric | undefined {
		const result =
			typeof value == "string"
				? ([Number.parseInt(value.substring(0, 4)), Number.parseInt(value.substring(6, 7)) - 1] as const)
				: undefined
		return result && Number.isSafeInteger(result[0]) && Number.isSafeInteger(result[1])
			? new Numeric(result[0], result[1])
			: undefined
	}
	export function from(date: globalThis.Date | Numeric.Value | number): Quarter {
		return Numeric.create(date).format()
	}
	export function now(): Quarter {
		return Numeric.now().format()
	}
	export function next(quarter: Quarter, quarters = 1): Quarter {
		return parse(quarter).next(quarters).format()
	}
	export function previous(quarter: Quarter, quarters = 1): Quarter {
		return parse(quarter).previous(quarters).format()
	}
	export function getYear(quarter: Quarter): number {
		return Number.parseInt(quarter.substring(0, 4))
	}
	export function getQuarter(quarter: Quarter): number {
		return Number.parseInt(quarter.substring(6, 7))
	}
	export function length(quarter: Quarter): 90 | 91 | 92 {
		return parse(quarter).length
	}
}
