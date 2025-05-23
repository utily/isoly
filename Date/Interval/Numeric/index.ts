import { HalfYear } from "HalfYear"
import { isly } from "isly"
import { Month } from "Month"
import { Quarter } from "Quarter"
import { Week } from "Week"
import { Year } from "Year"
import { Precision } from "../../../DateTime/Precision"
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
		return DateNumeric.Value.is(start) && DateNumeric.Value.is(end)
			? new Numeric(DateNumeric.create(start), DateNumeric.create(end))
			: end
			? new Numeric(Numeric.create(start).start, Numeric.create(end).end)
			: Numeric.Value.is(start)
			? new Numeric(DateNumeric.create(start.start), DateNumeric.create(start.end))
			: DateNumeric.Value.is(start) && start.days != undefined
			? Numeric.create(start, start)
			: Month.Numeric.Value.is(start) && start.months != undefined
			? Numeric.create(
					{ years: start.years, months: start.months, days: 0 },
					{ years: start.years, months: start.months, days: Month.Numeric.create(start).length - 1 }
			  )
			: HalfYear.Numeric.Value.is(start) && start.halfYears != undefined
			? Numeric.create(
					{ years: start.years, months: start.halfYears * 5, days: 0 },
					{ years: start.years, months: start.halfYears * 5 + 6, days: 30 }
			  )
			: Quarter.Numeric.Value.is(start) && start.quarters != undefined
			? Numeric.create(
					{ years: start.years, months: start.quarters * 3, days: 0 },
					{
						years: start.years,
						months: start.quarters * 3 + 2,
						days: [30, 29, 29, 30][start.quarters],
					}
			  )
			: Week.Numeric.Value.is(start) && start.weeks != undefined
			? Numeric.create(
					new DateNumeric(start.years, start.weeks * 7).normalize(),
					new DateNumeric(start.years, start.weeks * 7 + 6).normalize()
			  )
			: Numeric.create({ years: start.years, months: 0, days: 0 }, { years: start.years, months: 11, days: 30 })
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
