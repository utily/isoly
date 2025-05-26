import { isly } from "isly"
import { Year } from "Year"
import type { Date } from "../Date/Date"
import { Digits as _Digits } from "./Digits"
import { Numeric as _Numeric } from "./Numeric"

export type Month = `${number}-${number}` // `${number}-${Month.Digits}`

export namespace Month {
	export import Digits = _Digits
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Month>(value => {
			const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value)
			return !!match && Year.is(match[1]) && Digits.is(match[2])
		}, "YYYY-MM")
		.rename("isoly.Month")
		.describe("ISO 8601 month in the format YYYY-MM.")
		.bind()
	export function parse(value: Month): Numeric
	export function parse(value: Month | string | undefined): Numeric | undefined
	export function parse(value: Month | string | undefined): Numeric | undefined {
		const result = value
			? /^(\d{4})-(\d{2})$/
					.exec(value)
					?.slice(1)
					.map(part => Number.parseInt(part))
			: undefined
		return result?.length == 2 && result.every(Number.isSafeInteger) ? new Numeric(result[0], result[1] - 1) : undefined
	}
	export function from(value: Date | Numeric | Month | string | undefined): Month | undefined {
		return value == undefined ? undefined : (typeof value == "string" ? parse(value) : Numeric.create(value))?.format()
	}
	export function now(): Month {
		return Numeric.now().format()
	}
	export function next(month: Month, months?: Numeric.Value | number): Month {
		return parse(month).next(months).format()
	}
	export function previous(month: Month, months?: Numeric.Value | number): Month {
		return parse(month).previous(months).format()
	}
	export function length(month: Month): 28 | 29 | 30 | 31 {
		return parse(month).length
	}
}
