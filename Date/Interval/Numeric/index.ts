import { isly } from "isly"
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
	equals(value: Numeric): boolean {
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
		return new Numeric(this.start.next(duration), this.end)
	}
	toJson(): Interval {
		return this.format()
	}
	toString(): Interval {
		return this.format()
	}
	static create(start: DateNumeric.Value, end: DateNumeric.Value): Numeric {
		return new Numeric(DateNumeric.create(start), DateNumeric.create(end))
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
