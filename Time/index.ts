
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
		.string<Time>((value: string) => {
			const splitted = /^\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?$/.test(value) && Time.split(value)
			return (
				splitted &&
				Time.Hour.type.is(splitted[0]) &&
				Time.Minute.type.optional().is(splitted[1]) &&
				Time.Second.type.optional().is(splitted[2]) &&
				Time.Millisecond.type.optional().is(splitted[3]) &&
				(splitted[2] != "60" || (splitted[0] == "23" && splitted[1] == "59")) // only allow leap second at 23:59
			)
		}, "HH[:mm[:ss[.fff]]]")
		.rename("isoly.Time")
		.describe("ISO 8601 time in the format HH[:mm[:ss[.fff]]].")
		.bind()
	export function create(epoch: number): Time
	export function create(epoch: number, precision: Precision): Time
	export function create(numeric: Numeric): Time
	export function create(time: number | Numeric, precision: Precision = "seconds"): Time {
		return typeof time == "number" ? create(Numeric.create(time, precision)) : Numeric.format(time)
	}
	export function split(value: Time): [Hour, Minute | undefined, Second | undefined, Millisecond | undefined] {
		const [hours, minutes, secondsMilliseconds] = value.split(":", 3) as [Hour, Minute | undefined, string | undefined]
		const [seconds, milliseconds] =
			secondsMilliseconds?.split(".", 2) ?? ([undefined, undefined] as [Second | undefined, Millisecond | undefined])
		return [
			hours.padStart(2, "0") as Hour,
			minutes?.padStart(2, "0") as Minute | undefined,
			seconds?.padStart(2, "0") as Second | undefined,
			milliseconds?.slice(0, 3)?.padEnd(3, "0") as Millisecond | undefined,
		]
	}
	export function normalize(time: Time, precision?: Precision): Time {
		return Numeric.format(Numeric.parse(time), precision)
	}
}
