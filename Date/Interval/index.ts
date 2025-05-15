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
		let result: Numeric | undefined
		const match =
			value == undefined
				? undefined
				: /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/
						.exec(value)
						?.slice(1)
						?.map(v => Date.parse(v))
		result = !(match && match[0] && match[1]) ? undefined : new Numeric(match[0], match[1])
		if (!result) {
			const numeric = Year.parse(value)
			result =
				numeric &&
				Numeric.create({ years: numeric.years, months: 0, days: 0 }, { years: numeric.years, months: 11, days: 30 })
		}
		if (!result) {
			const numeric = HalfYear.parse(value)?.normalize()
			result =
				numeric &&
				Numeric.create(
					{ years: numeric.years, months: (numeric.halfYears ?? 0) * 5, days: 0 },
					{ years: numeric.years, months: (numeric.halfYears ?? 0) * 5 + 6, days: 30 }
				)
		}
		if (!result) {
			const numeric = Quarter.parse(value)?.normalize()
			result =
				numeric &&
				Numeric.create(
					{ years: numeric.years, months: (numeric.quarters ?? 0) * 3, days: 0 },
					{
						years: numeric.years,
						months: (numeric.quarters ?? 0) * 3 + 3,
						days: [30, 29, 29, 30][numeric.quarters ?? 0],
					}
				)
		}
		if (!result) {
			const numeric = Month.parse(value)?.normalize()
			result =
				numeric &&
				Numeric.create(
					{ years: numeric.years, months: numeric.months, days: 0 },
					{
						years: numeric.years,
						months: numeric.months,
						days: numeric.length - 1,
					}
				)
		}
		if (!result) {
			const numeric = Week.parse(value)?.normalize()
			const years = numeric?.years
			const days = numeric?.weeks != undefined ? (numeric?.weeks ?? 0) * 7 : undefined
			result =
				years != undefined && days != undefined
					? Numeric.create(new DateNumeric(years, days).normalize(), new DateNumeric(years, days + 6).normalize())
					: undefined
		}
		if (!result) {
			const numeric = Date.parse(value)?.normalize()
			result = numeric ? Numeric.create(numeric, numeric) : undefined
		}
		return result
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
	export function format(value: Interval): string {
		return parse(value).format()
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
