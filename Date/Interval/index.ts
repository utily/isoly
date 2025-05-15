import { isly } from "isly"
import { Precision } from "../../DateTime/Precision"
import { Date } from "../Date"
import { Duration } from "../Duration"
import { Numeric as DateNumeric } from "../Numeric"
import { Numeric as _Numeric } from "./Numeric"

export type Interval = `${Date}--${Date}`

export namespace Interval {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Interval>(value => {
			const match = /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/.exec(value)
			return !!match && Date.is(match[1]) && Date.is(match[2]) && match[1] < match[2]
		}, "YYYY-MM-DD--YYYY-MM-DD")
		.rename("isoly.Date.Interval")
		.describe("Interval string in format YYYY-MM-DD--YYYY-MM-DD.")
		.bind()
	export function parse(value: Interval): Numeric
	export function parse(value: Interval | string | undefined): Numeric | undefined
	export function parse(value: Interval | string | undefined): Numeric | undefined {
		const match =
			value == undefined
				? undefined
				: /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/
						.exec(value)
						?.slice(1)
						?.map(v => Date.parse(v))
		return !(match && match[0] && match[1]) ? undefined : new Numeric(match[0], match[1])
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
