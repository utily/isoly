import { isly } from "isly"
import { Month } from "Month"
import { Quarter } from "Quarter"
import { Week } from "Week"
import { Year } from "Year"
import { Precision } from "../../../DateTime/Precision"
import { HalfYear } from "../../../HalfYear"
import { Numeric as DateNumeric } from "../../Numeric"
import type { Interval } from "../"
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			start: this.start.value,
			end: this.end.value,
		}
	}
	get dates(): DateNumeric[] {
		const result: DateNumeric[] = []
		for (let current = this.start; current <= this.end; current = current.next({ days: 1 }))
			result.push(current)
		return result
	}
	get duration(): DateNumeric {
		return new DateNumeric(
			this.end.years == undefined && this.start.years == undefined
				? undefined
				: (this.end.years ?? 0) - (this.start.years ?? 0),
			this.end.months == undefined && this.start.months == undefined
				? undefined
				: (this.end.months ?? 0) - (this.start.months ?? 0),
			this.end.days == undefined && this.start.days == undefined
				? undefined
				: (this.end.days ?? 0) - (this.start.days ?? 0)
		)
	}
	constructor(readonly start: DateNumeric, readonly end: DateNumeric) {}
	normalize(): Numeric {
		return new Numeric(this.start.normalize(), this.end.normalize())
	}
	format(format?: "strict"): Interval
	format(format: "short"): Interval.Like
	format(format?: "strict" | "short"): Interval | Interval.Like {
		const normalized = this.normalize()
		let result: Interval.Like
		switch (format) {
			case undefined:
			case "strict":
				result = `${normalized.start.format()}--${normalized.end.format()}` as Interval
				break
			case "short":
				result =
					normalized.start.years == normalized.end.years &&
					normalized.start.months == 0 &&
					normalized.end.months == 11 &&
					normalized.start.days == 0 &&
					normalized.end.days == 30
						? normalized.start.year.format()
						: normalized.start.years == normalized.end.years &&
						  normalized.start.months == normalized.end.months &&
						  normalized.start.days == 0 &&
						  normalized.end.days == normalized.end.month.length - 1
						? normalized.start.month.format()
						: normalized.start.years == normalized.end.years &&
						  (normalized.start.months ?? 0) % 3 == 0 &&
						  normalized.start.days == 0 &&
						  (normalized.start.months ?? 0) + 2 == normalized.end.months &&
						  normalized.end.days == normalized.end.month.length - 1
						? normalized.start.quarter.format()
						: normalized.start.years == normalized.end.years &&
						  (normalized.start.months ?? 0) % 6 == 0 &&
						  normalized.start.days == 0 &&
						  (normalized.start.months ?? 0) + 5 == normalized.end.months &&
						  normalized.end.days == normalized.end.month.length - 1
						? normalized.start.halfYear.format()
						: normalized.length() == 7 && normalized.start.weekday == 0
						? normalized.start.week.format()
						: normalized.length() == 0
						? normalized.start.format()
						: normalized.format("strict")
				break
		}
		return result
	}
	length(precision: Precision = "days"): number {
		return Math.ceil(this.end.epoch(precision) - this.start.epoch(precision))
	}
	equals(value: Numeric.Value): boolean {
		return this.start.equals(value.start) && this.end.equals(value.end)
	}
	contains(date: DateNumeric): boolean {
		return date >= this.start && date <= this.end
	}
	increase(duration: DateNumeric.Value): Numeric {
		return new Numeric(this.start, this.end.next(duration))
	}
	decrease(duration: DateNumeric.Value): Numeric {
		return new Numeric(this.start, this.end.previous(duration))
	}
	move(duration: DateNumeric.Value): Numeric {
		return new Numeric(this.start.next(duration), this.end.next(duration))
	}
	toJson(): Interval {
		return this.format()
	}
	toString(): Interval {
		return this.format()
	}
	static create(
		...[start, end]:
			| [
					value:
						| Numeric.Value
						| DateNumeric.Value
						| Month.Numeric.Value
						| Week.Numeric.Value
						| Quarter.Numeric.Value
						| HalfYear.Numeric.Value
						| Year.Numeric.Value
			  ]
			| [
					start:
						| DateNumeric.Value
						| Month.Numeric.Value
						| Week.Numeric.Value
						| Quarter.Numeric.Value
						| HalfYear.Numeric.Value
						| Year.Numeric.Value,
					end:
						| DateNumeric.Value
						| Month.Numeric.Value
						| Week.Numeric.Value
						| Quarter.Numeric.Value
						| HalfYear.Numeric.Value
						| Year.Numeric.Value
			  ]
	): Numeric {
		let result: [DateNumeric.Value, DateNumeric.Value]
		if (DateNumeric.Value.is(start) && DateNumeric.Value.is(end) && start.days != undefined && end.days != undefined)
			result = [start, end]
		else if (end)
			result = [Numeric.create(start).start, Numeric.create(end).end]
		else if (Numeric.Value.is(start))
			result = [start.start, start.end]
		else if (DateNumeric.Value.is(start) && start.days != undefined)
			result = [start, start]
		else if (Month.Numeric.Value.is(start) && start.months != undefined)
			result = [
				{ years: start.years, months: start.months, days: 0 },
				{ years: start.years, months: start.months, days: Month.Numeric.create(start).length - 1 },
			]
		else if (HalfYear.Numeric.Value.is(start) && start.halfYears != undefined)
			result = [
				{ years: start.years, months: start.halfYears * 6, days: 0 },
				{ years: start.years, months: start.halfYears * 6 + 5, days: 29 + (start.halfYears % 2) },
			]
		else if (Quarter.Numeric.Value.is(start) && start.quarters != undefined)
			result = [
				{ years: start.years, months: start.quarters * 3, days: 0 },
				{
					years: start.years,
					months: start.quarters * 3 + 2,
					days: [30, 29, 29, 30][start.quarters % 4],
				},
			]
		else if (Week.Numeric.Value.is(start) && start.weeks != undefined) {
			const s = new DateNumeric(
				start.years,
				undefined,
				3 - new DateNumeric(start.years, 0, 3).weekday + start.weeks * 7
			)
			result = [s.normalize(), s.next({ days: 6 }).normalize()]
		} else if (Year.Numeric.Value.is(start) && start.years != undefined)
			result = [
				{ years: start.years, months: 0, days: 0 },
				{ years: start.years, months: 11, days: 30 },
			]
		else
			result = [{}, {}]
		return new Numeric(DateNumeric.create(result[0]), DateNumeric.create(result[1]))
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
