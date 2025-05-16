import { isly } from "isly"
import { Precision } from "../../DateTime/Precision"
import { DateTime } from "../DateTime"
import { Duration } from "../Duration"
import { Numeric as DateTimeNumeric } from "../Numeric"
import { Numeric as _Numeric } from "./Numeric"

export type Interval = `${string}T${string}--${string}T${string}`

export namespace Interval {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Interval>(value => {
			const match =
				/^(\d{4}-\d{2}-\d{2}T(?:\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?)?(?:Z|[+-]\d{2}:\d{2})?)--(\d{4}-\d{2}-\d{2}T(?:\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?)?(?:Z|[+-]\d{2}:\d{2})?)$/.exec(
					value
				)
			return !!match && DateTime.is(match[1]) && DateTime.is(match[2]) && match[1] < match[2]
		}, "YYYY-MM-DDT[HH[:mm[:ss[.fff]]]]--YYYY-MM-DDT[HH[:mm[:ss[.fff]]]]")
		.rename("isoly.Date.Interval")
		.describe("Interval string in format YYYY-MM-DDT[HH[:mm[:ss[.fff]]]]--YYYY-MM-DDT[HH[:mm[:ss[.fff]]]]")
		.bind()
	export function parse(value: Interval): Numeric
	export function parse(value: Interval | string | undefined): Numeric | undefined
	export function parse(value: Interval | string | undefined): Numeric | undefined {
		const match =
			value == undefined
				? undefined
				: /^(\d{4}-\d{2}-\d{2}T(?:\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?)?(?:Z|[+-]\d{2}:\d{2})?)--(\d{4}-\d{2}-\d{2}T(?:\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?)?(?:Z|[+-]\d{2}:\d{2})?)$/
						.exec(value)
						?.slice(1)
						?.map(v => DateTime.parse(v))
		return !(match && match[0] && match[1]) ? undefined : new Numeric(match[0], match[1])
	}
	export function from(value: Interval | string | undefined): Interval | undefined
	export function from(start: DateTime, duration: Duration | DateTimeNumeric.Value): Interval
	export function from(
		...argument: [value: Interval | string | undefined] | [start: DateTime, duration: Duration | DateTimeNumeric.Value]
	): Interval | undefined {
		return argument.length == 2
			? new Numeric(DateTime.parse(argument[0]), DateTime.parse(argument[0]))
					.increase(typeof argument[1] == "string" ? Duration.parse(argument[1]) : argument[1])
					.format()
			: argument[0] == undefined
			? undefined
			: parse(argument[0])?.format()
	}
	export function length(value: Interval, precision: Precision = "days"): number {
		return parse(value).length(precision)
	}
	export function duration(value: Interval): Duration {
		return parse(value).duration.format("duration")
	}
	export function contains(value: Interval, date: DateTime): boolean {
		return parse(value).contains(DateTime.parse(date))
	}
	export function increase(value: Interval, duration: DateTimeNumeric): Interval {
		return parse(value).increase(duration).format()
	}
	export function decrease(value: Interval, duration: DateTimeNumeric): Interval {
		return parse(value).decrease(duration).format()
	}
	export function move(value: Interval, duration: DateTimeNumeric): Interval {
		return parse(value).move(duration).format()
	}
}
