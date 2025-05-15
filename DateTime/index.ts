import { Date } from "../Date/Date"
import { Time } from "../Time"
import { TimeZone } from "../TimeZone"
import { DateTime as _DateTime } from "./DateTime"
import { Duration as _Duration } from "./Duration"
import { Interval as _Interval } from "./Interval"
import { Like as _Like } from "./Like"
import { Numeric as _Numeric } from "./Numeric"
import { Precision as _Precision } from "./Precision"

export type DateTime = _DateTime

export namespace DateTime {
	export import Duration = _Duration
	export import Interval = _Interval
	export import Like = _Like
	export import Numeric = _Numeric
	export import Precision = _Precision
	export const { type, is, flawed } = _DateTime.type.bind()
	export const parse = _DateTime.parse
	export function from(): DateTime
	export function from(date: globalThis.Date): DateTime
	export function from(epoch: number, precision?: Precision): DateTime
	export function from(value: Numeric.Value): DateTime
	export function from(date?: Date.Numeric.Value, time?: Time.Numeric.Value, zone?: TimeZone.Offset): DateTime
	export function from(value: DateTime | Like | string | undefined): DateTime | undefined
	export function from(
		...argument:
			| []
			| [date: globalThis.Date]
			| [epoch: number, precision?: Precision]
			| [value: Numeric.Value]
			| [date?: Date.Numeric.Value, time?: Time.Numeric.Value, zone?: TimeZone.Offset]
			| [value: DateTime | Like | string | undefined]
	): DateTime | undefined {
		return (typeof argument[0] == "string" ? parse(argument[0]) : Numeric.create(...(argument as any[])))?.format()
	}
	export function now(): DateTime {
		return from(new globalThis.Date())
	}
	export function system(value: DateTime): globalThis.Date {
		return parse(value).system
	}
	export function next(value: DateTime, increment: Numeric.Value): DateTime {
		return parse(value).next(increment).format()
	}
	export function previous(value: DateTime, decrement: Numeric.Value): DateTime {
		return parse(value).previous(decrement).format()
	}
	export function startOfDay(value: DateTime | Date): DateTime {
		return (value.slice(0, 10) +
			"T00:00:00.000" +
			(DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z")) as DateTime
	}
	export function endOfDay(value: DateTime | Date): DateTime {
		return `${value.slice(0, 10)}T23:59:59.999${DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z"}` as DateTime
	}
	export function timeZoneOffset(value: DateTime): TimeZone.Offset | undefined {
		return parse(value).zone
	}
	export function precision(value: DateTime): Precision {
		return parse(value).precision
	}
	export function truncate(value: DateTime, precision: Precision): DateTime {
		return parse(value).truncate(precision).format()
	}
	export function set(value: DateTime, changes: Date.Numeric.Value): DateTime {
		return parse(value).set(changes).format()
	}
	export function adjust(value: DateTime, zone: TimeZone.Offset): DateTime {
		return parse(value).adjust(zone).format()
	}
	export function invert(value: DateTime): DateTime {
		return parse(value).invert().format()
	}
	export function epoch(value: DateTime, precision: Precision = "seconds"): number {
		return parse(value).epoch(precision)
	}
	export const min: DateTime = "0000-01-01T00:00:00.000Z"
	export const max: DateTime = "9999-12-31T23:59:59.999Z"
}
