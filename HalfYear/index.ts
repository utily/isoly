import { isly } from "isly"
import { Year } from "../Year"
import { Numeric as _Numeric } from "./Numeric"

export type HalfYear = `${Year}-H${1 | 2}`
export namespace HalfYear {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly.string<HalfYear>("value", /^\d{4}-H[1-2]$/).bind()
	export function parse(value: HalfYear | string | undefined): Numeric | undefined {
		const result =
			typeof value == "string"
				? ([Number.parseInt(value.substring(0, 4)), Number.parseInt(value.substring(6, 7)) - 1] as const)
				: undefined
		return result ? new Numeric(result[0], result[1]) : undefined
	}
	export function from(
		value: globalThis.Date | Numeric.Value | number | HalfYear | string | undefined
	): HalfYear | undefined {
		return value == undefined
			? undefined
			: (typeof value == "string" ? parse(value) : Numeric.create(value))?.format() ?? undefined
	}
}
