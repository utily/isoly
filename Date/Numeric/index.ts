import { HalfYear } from "HalfYear"
import { isly } from "isly"
import { Quarter } from "Quarter"
import { Precision } from "../../DateTime/Precision"
import { Month } from "../../Month"
import { Week } from "../../Week"
import { Weekday } from "../../Weekday"
import { Year } from "../../Year"
import type { Date } from "../Date"
import { Value as _Value } from "./Value"

export class Numeric {
	get system(): globalThis.Date {
		return new globalThis.Date(this.format())
	}
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.months != undefined ? { months: this.months } : {}),
			...(this.days != undefined ? { days: this.days } : {}),
		}
	}
	get month(): Month.Numeric {
		return new Month.Numeric(this.years, this.months)
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	get halfYear(): HalfYear.Numeric {
		return new HalfYear.Numeric(this.years, Math.floor((this.months ?? 0) / 6))
	}
	get quarter(): Quarter.Numeric {
		return new Quarter.Numeric(this.years, Math.floor((this.months ?? 0) / 3))
	}
	get week(): Week.Numeric {
		const ordinal = this.ordinal()
		return new Week.Numeric(
			ordinal.years,
			Math.floor(((ordinal.days ?? 0) - new Numeric(ordinal.years, 0, 0).weekday) / 7)
		)
	}
	get weekday(): Weekday.Index {
		return ((this.system.getDay() + 6) % 7) as Weekday.Index
	}
	get normalized(): boolean {
		return Numeric.Value.Normalized.is(this) && this.days < this.month.length
	}
	constructor(readonly years?: number, readonly months?: number, readonly days?: number) {}
	normalize(): Numeric {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let result: Numeric = this
		while ((result.days ?? 0) < 0)
			result = result.next({ months: -1, days: result.month.length })
		while ((result.days ?? 0) >= result.month.length)
			result = result.next({ months: 1, days: -result.month.length })
		const years = result.months == undefined ? 0 : Math.floor(result.months / 12)
		return years
			? result.next({
					years,
					months: -years * 12,
			  })
			: result
	}
	invert(): Numeric {
		const result = this.normalize()
		return new Numeric(
			result.years ? 9999 - result.years : undefined,
			result.months ? 11 - result.months : undefined,
			result.days ? 30 - result.days : undefined
		)
	}
	ordinal(): Numeric {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let result: Numeric = this
		while ((result.months ?? 0) >= 12)
			result = result.next({ years: 1, months: -12 })
		while ((result.months ?? 0) > 0)
			result = result.next({ months: -1, days: result.month.length })
		while ((result.days ?? 0) < 0)
			result = result.next({ years: -1, days: result.year.length("days") })
		while ((result.days ?? 0) >= result.year.length("days"))
			result = result.next({ years: 1, days: -result.year.length("days") })
		return new Numeric(result.years, undefined, result.days)
	}
	epoch(precision: Precision = "seconds"): number {
		return Math.trunc(
			this.system.getTime() /
				{ milliseconds: 1, seconds: 1000, minutes: 60000, hours: 3600000, days: 86400000 }[precision]
		)
	}
	format(format?: "calendar"): Date
	format(format: "ordinal"): Date.Ordinal
	format(format: "duration"): Date.Duration
	format(format: "calendar" | "ordinal" | "duration" = "calendar"): Date | Date.Ordinal | Date.Duration {
		let result: Date | Date.Ordinal | Date.Duration
		switch (format) {
			case "calendar":
				const normalized = this.normalize()
				result = `${(normalized.years ?? 0).toFixed(0).padStart(4, "0")}-${((normalized.months ?? 0) + 1)
					.toFixed(0)
					.padStart(2, "0")}-${((normalized.days ?? 0) + 1).toFixed(0).padStart(2, "0")}` as Date
				break
			case "ordinal":
				const ordinal = this.ordinal()
				result = `${(ordinal.years ?? 0).toFixed(0).padStart(4, "0")}-${((ordinal.days ?? 0) + 1)
					.toFixed(0)
					.padStart(3, "0")}` as Date.Ordinal
				break
			case "duration":
				result = `D${this.years ? `${this.years}Y ` : ""}${this.months ? `${this.months}M ` : ""}${
					this.days ? `${this.days}D ` : ""
				}` as Date.Duration
				break
		}
		return result
	}
	next(increment: Numeric.Value): Numeric {
		return new Numeric(
			this.years == undefined && increment.years == undefined ? undefined : (this.years ?? 0) + (increment.years ?? 0),
			this.months == undefined && increment.months == undefined
				? undefined
				: (this.months ?? 0) + (increment.months ?? 0),
			this.days == undefined && increment.days == undefined ? undefined : (this.days ?? 0) + (increment.days ?? 0)
		)
	}
	previous(increment: Numeric.Value): Numeric {
		return new Numeric(
			this.years == undefined && increment.years == undefined ? undefined : (this.years ?? 0) - (increment.years ?? 0),
			this.months == undefined && increment.months == undefined
				? undefined
				: (this.months ?? 0) - (increment.months ?? 0),
			this.days == undefined && increment.days == undefined ? undefined : (this.days ?? 0) - (increment.days ?? 0)
		)
	}
	set(changes: Numeric.Value): Numeric {
		return new Numeric(changes.years ?? this.years, changes.months ?? this.months, changes.days ?? this.days)
	}
	before(date: Numeric.Value): boolean {
		const left = { ...Numeric.Value.zero, ...this.normalize().value }
		const right = { ...Numeric.Value.zero, ...Numeric.create(date).normalize().value }
		return (
			left.years < right.years ||
			(left.years == right.years &&
				(left.months < right.months || (left.months == right.months && left.days < right.days)))
		)
	}
	after(date: Numeric.Value): boolean {
		const left = { ...Numeric.Value.zero, ...this.normalize().value }
		const right = { ...Numeric.Value.zero, ...Numeric.create(date).normalize().value }
		return (
			left.years > right.years ||
			(left.years == right.years &&
				(left.months > right.months || (left.months == right.months && left.days > right.days)))
		)
	}
	equals(date: Numeric.Value): boolean {
		const left = this.normalize()
		const right = Numeric.create(date).normalize()
		return left.years == right.years && left.months == right.months && left.days == right.days
	}
	compare(date: Numeric.Value): number {
		const left = { ...Numeric.Value.zero, ...this.normalize().value }
		const right = { ...Numeric.Value.zero, ...Numeric.create(date).normalize().value }
		return left.years < right.years
			? -1
			: left.years > right.years
			? 1
			: left.months < right.months
			? -1
			: left.months > right.months
			? 1
			: left.days < right.days
			? -1
			: left.days > right.days
			? 1
			: 0
	}
	toString(): string {
		return this.format()
	}
	toJSON(): string {
		return this.format()
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static create(value: globalThis.Date | Numeric | Numeric.Value | number): Numeric {
		return Numeric.is(value)
			? value
			: typeof value == "number"
			? new Numeric(0, 0, value)
			: value instanceof globalThis.Date
			? new Numeric(value.getFullYear(), value.getMonth() - 1, value.getDate() - 1)
			: new Numeric(value?.years, value?.months, value?.days)
	}
	static get zero(): Numeric {
		return new Numeric(0, 0, 0)
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
