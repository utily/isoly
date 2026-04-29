import { isly } from "isly"
import { Date } from "../Date"
import { Numeric as _Numeric } from "./Numeric"

export type Year = `${number}`

export namespace Year {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Year>(value => /^\d{4}$/.test(value), "YYYY")
		.rename("isoly.Year")
		.describe("ISO 8601 year in the format YYYY.")
		.bind()
	export function from(date: Date): Year {
		return date.substring(0, 4) as Year
	}
	export function next(year: Year, years = 1): Year {
		return Numeric.parse(year).next(years).toString()
	}
	export function previous(year: Year, years = 1): Year {
		return Numeric.parse(year).previous(years).toString()
	}
	export function getYear(year: Year): number {
		return Numeric.parse(year).value
	}
	export function length(year: Year): 365 | 366 {
		return Numeric.parse(year).length
	}
}
