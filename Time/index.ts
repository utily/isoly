import { isly } from "isly"
import { Hour as _Hour } from "./Hour"
import { Like as _Like } from "./Like"
import { Millisecond as _Millisecond } from "./Millisecond"
import { Minute as _Minute } from "./Minute"
import { Numeric as _Numeric } from "./Numeric"
import { Precision as _Precision } from "./Precision"
import { Second as _Second } from "./Second"

export type Time = string

export namespace Time {
	export import Hour = _Hour
	export import Like = _Like
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
	export function parse(value: Time): Numeric
	export function parse(value: Time | Like | string | undefined): Numeric | undefined
	export function parse(value: Time | Like | string | undefined): Numeric | undefined {
		const match =
			value == undefined
				? undefined
				: (
						(
							/^(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?$/.exec(value) ??
							/^(\d+)(?::(\d+)(?::(\d+)(?:\.(\d+))?)?)?$/.exec(value)
						)?.slice(1) ?? []
				  )
						.map((v, i) => (v ? Number.parseInt(i == 3 ? v.substring(0, 3).padEnd(3, "0") : v) : undefined))
						.map(v => (Number.isSafeInteger(v) ? v : undefined))
		return match && match.some(v => v != undefined) ? new Numeric(match[0], match[1], match[2], match[3]) : undefined
	}
	export function from(epoch: number): Time
	export function from(epoch: number, precision: Precision): Time
	export function from(value: Numeric.Value): Time
	export function from(time: Time | string | undefined): Time | undefined
	export function from(
		...argument:
			| [epoch: number]
			| [epoch: number, precision: Precision]
			| [value: Numeric.Value]
			| [time: Time | string | undefined]
	): Time | undefined {
		return (
			(isly.tuple(isly.number()).is(argument)
				? Numeric.create(argument[0])
				: isly.tuple(isly.number(), Precision.type).is(argument)
				? Numeric.create(argument[0], argument[1])
				: isly.tuple(Numeric.type).is(argument)
				? argument[0]
				: isly.tuple(isly.string()).is(argument)
				? parse(argument[0])
				: undefined
			)?.format() ?? undefined
		)
	}
	export function now(): Time {
		return Numeric.now().format()
	}
	export function invert(time: Time): Time {
		return parse(time).invert().format()
	}
	export function truncate(time: Time, precision: Precision): Time {
		return parse(time).truncate(precision).format()
	}
	export function epoch(time: Time, precision: Precision = "seconds"): number {
		return parse(time).epoch(precision)
	}
}
