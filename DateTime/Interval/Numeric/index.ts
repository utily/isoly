import { isly } from "isly"
import { Precision } from "../../../DateTime/Precision"
import { Numeric as DateNumeric } from "../../Numeric"
import type { Interval } from ".."
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
	format(): Interval {
		return `${this.start.format()}--${this.end.format()}` as any as Interval
	}
	length(precision: Precision = "days"): number {
		return Math.ceil(this.end.epoch(precision) - this.start.epoch(precision))
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
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
