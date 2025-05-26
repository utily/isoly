import { HalfYear } from "HalfYear"
import { Month } from "Month"
import { Quarter } from "Quarter"
import { Week } from "Week"
import { Year } from "Year"
import { Precision } from "../../DateTime/Precision"
import { Date } from "../Date"
import { Duration } from "../Duration"
import { Numeric as DateNumeric } from "../Numeric"
import { Interval as _Interval } from "./Interval"
import { Like as _Like } from "./Like"
import { Numeric as _Numeric } from "./Numeric"

export type Interval = _Interval

export namespace Interval {
	export import Like = _Like
	export import Numeric = _Numeric
	export const { type, is, flawed } = _Interval.type.bind()
	export function parse(value: Interval.Like): Numeric
	export function parse(value: Interval.Like | string | undefined): Numeric | undefined
	export function parse(value: Interval.Like | string | undefined): Numeric | undefined {
		const p = (
			v: string
		): Date.Numeric | Month.Numeric | Week.Numeric | Year.Numeric | HalfYear.Numeric | Quarter.Numeric | undefined =>
			Date.parse(v) ?? Week.parse(v) ?? Month.parse(v) ?? Quarter.parse(v) ?? HalfYear.parse(v) ?? Year.parse(v)
		const result =
			value == undefined
				? undefined
				: /^(\d{4}(?:-\d{2}(?:-\d{2})?|-Q[1-4]|-H[12]|-W\d{2})?)--(\d{4}(?:-\d{2}(?:-\d{2})?|-Q[1-4]|-H[12]|-W\d{2})?)$/
						.exec(value)
						?.slice(1)
						?.map(p) ?? p(value)
		return !Array.isArray(result)
			? result
				? Numeric.create(result)
				: undefined
			: result.length == 2 && result[0] && result[1]
			? Numeric.create(result[0], result[1])
			: undefined
	}
	export function from(value: Interval | string | undefined): Interval | undefined
	export function from(start: Date, duration: Duration | DateNumeric.Value): Interval
	export function from(
		...argument: [value: Interval | string | undefined] | [start: Date, duration: Duration | DateNumeric.Value]
	): Interval | undefined {
		return argument.length == 2
			? new Numeric(Date.parse(argument[0]), Date.parse(argument[0]))
					.increase(typeof argument[1] == "string" ? Duration.parse(argument[1]) : argument[1])
					.format()
			: argument[0] == undefined
			? undefined
			: parse(argument[0])?.format()
	}
	export function shorten(value: Interval): Like {
		return parse(value).format("short")
	}
	export function length(value: Interval, precision: Precision = "days"): number {
		return parse(value).length(precision)
	}
	export function duration(value: Interval): Duration {
		return parse(value).duration.format("duration")
	}
	export function contains(value: Interval, date: Date): boolean {
		return parse(value).contains(Date.parse(date))
	}
	export function increase(value: Interval, duration: DateNumeric): Interval {
		return parse(value).increase(duration).format()
	}
	export function decrease(value: Interval, duration: DateNumeric): Interval {
		return parse(value).decrease(duration).format()
	}
	export function move(value: Interval, duration: DateNumeric): Interval {
		return parse(value).move(duration).format()
	}
	export function dates(value: Interval): Date[] {
		return parse(value).dates.map(v => v.format())
	}
}
