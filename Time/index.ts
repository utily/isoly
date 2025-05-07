import { isly } from "isly"
import { Hour as _Hour } from "./Hour"
import { Millisecond as _Millisecond } from "./Millisecond"
import { Minute as _Minute } from "./Minute"
import { Numeric as _Numeric } from "./Numeric"
import { Precision as _Precision } from "./Precision"
import { Second as _Second } from "./Second"

export type Time = string

export namespace Time {
	export import Hour = _Hour
	export import Millisecond = _Millisecond
	export import Minute = _Minute
	export import Numeric = _Numeric
	export import Precision = _Precision
	export import Second = _Second

	export const { type, is, flawed } = isly
		.string<Time>((value: string): boolean => {
			const match = /^(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?$/.exec(value)
			return (
				!!match &&
				Time.Hour.type.is(match[1]) &&
				Time.Minute.type.optional().is(match[2]) &&
				Time.Second.type.optional().is(match[3]) &&
				Time.Millisecond.type.optional().is(match[4]) &&
				(match[3] != "60" || (match[1] == "23" && match[2] == "59")) // only allow leap second at 23:59
			)
		}, "HH[:mm[:ss[.fff]]]")
		.rename("isoly.Time")
		.describe("ISO 8601 time in the format HH[:mm[:ss[.fff]]].")
		.bind()
	export function create(epoch: number): Time
	export function create(epoch: number, precision: Precision): Time
	export function create(numeric: Numeric): Time
	export function create(time: number | Numeric, precision: Precision = "seconds"): Time {
		return typeof time == "number" ? create(Numeric.create(time, precision)) : time.format()
	}
	export function normalize(time: Time): Time {
		return Numeric.parse(time).format()
	}
	export function now(): Time {
		return Numeric.now().format()
	}
	export function invert(time: Time): Time {
		return Numeric.parse(time).invert().format()
	}
	export function truncate(time: Time, precision: Precision): Time {
		return Numeric.parse(time).truncate(precision).format()
	}
	export function epoch(time: Time, precision: Precision = "seconds"): number {
		return Numeric.parse(time).epoch(precision)
	}
}
