import { Date as _Date } from "./Date"
import { Digits as _Digits } from "./Digits"
import { Duration as _Duration } from "./Duration"
import { Interval as _Interval } from "./Interval"
import { Numeric as _Numeric } from "./Numeric"
import { Ordinal as _Ordinal } from "./Ordinal"

export type Date = _Date

export namespace Date {
	export import Digits = _Digits
	export import Duration = _Duration
	export import Interval = _Interval
	export import Numeric = _Numeric
	export import Ordinal = _Ordinal
	export const { type, is, flawed } = _Date.type.bind()
	export const parse = _Date.parse
	export function now(): Date {
		return Numeric.now().format()
	}
	export function from(value: globalThis.Date | Date | Numeric | string | number | undefined): Date | undefined {
		const result = value == undefined ? undefined : typeof value == "string" ? parse(value) : Numeric.create(value)
		return result?.normalized ? result?.format() : undefined
	}
	export function next(date: Date, increment: Numeric.Value = { days: 1 }): Date {
		return parse(date).next(increment).format()
	}
	export function previous(date: Date, decrement: Numeric.Value = { days: 1 }): Date {
		return parse(date).previous(decrement).format()
	}
	export function first(date: Date): Date {
		return `${date.substring(0, 8)}01` as Date
	}
	export function last(date: Date): Date {
		return `${date.substring(0, 8)}${parse(date).month.length}` as Date
	}
}
