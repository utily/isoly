import { isly } from "isly"
import { Year } from "../Year"
import { Numeric as _Numeric } from "./Numeric"

export type HalfYear = `${Year}-H${1 | 2}`
export namespace HalfYear {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly.string<HalfYear>("value", /^\d{4}-H[1-2]$/).bind()
	export function parse(value: HalfYear): Numeric
	export function parse(value: HalfYear | string | undefined): Numeric | undefined
	export function parse(value: HalfYear | string | undefined): Numeric | undefined {
		const result =
			typeof value == "string"
				? value &&
				  /^(\d{4})-H([1-2])$/
						.exec(value)
						?.slice(1)
						.map(part => Number.parseInt(part))
				: undefined
		return result && Number.isSafeInteger(result[0]) && Number.isSafeInteger(result[1])
			? new Numeric(result[0], result[1] - 1)
			: undefined
	}
	export function from(
		value: globalThis.Date | Numeric.Value | number | HalfYear | string | undefined
	): HalfYear | undefined {
		return value == undefined
			? undefined
			: (typeof value == "string" ? parse(value) : Numeric.create(value))?.format() ?? undefined
	}
}
