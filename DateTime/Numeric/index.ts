import { isly } from "isly"
import { Date } from "../../Date/Date"
import { Time } from "../../Time"
import { TimeZone } from "../../TimeZone"
import { DateTime } from "../index"
import { Like } from "../Like"
import { Precision } from "../Precision"
import { Value as _Value } from "./Value"

export class Numeric {
	get system(): globalThis.Date {
		return new globalThis.Date(this.truncate("milliseconds").format())
	}
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.months != undefined ? { months: this.months } : {}),
			...(this.days != undefined ? { days: this.days } : {}),
			...(this.hours != undefined ? { hours: this.hours } : {}),
			...(this.minutes != undefined ? { minutes: this.minutes } : {}),
			...(this.seconds != undefined ? { seconds: this.seconds } : {}),
			...(this.milliseconds != undefined ? { milliseconds: this.milliseconds } : {}),
			...(this.zone != undefined ? { zone: this.zone } : {}),
		}
	}
	get date(): Date.Numeric | undefined {
		return this.years == undefined && this.months == undefined && this.days == undefined
			? undefined
			: new Date.Numeric(this.years, this.months, this.days)
	}
	get time(): Time.Numeric | undefined {
		return this.hours == undefined &&
			this.minutes == undefined &&
			this.seconds == undefined &&
			this.milliseconds == undefined
			? undefined
			: new Time.Numeric(this.hours, this.minutes, this.seconds, this.milliseconds)
	}
	get precision(): Precision {
		return this.time?.precision ?? "days"
	}
	constructor(
		readonly years?: number,
		readonly months?: number,
		readonly days?: number,
		readonly hours?: number,
		readonly minutes?: number,
		readonly seconds?: number,
		readonly milliseconds?: number,
		readonly zone?: TimeZone.Offset
	) {}
	normalize(): Numeric {
		const time = this.time?.normalize()
		const days = time?.hours == undefined ? 0 : Math.floor(time.hours / 24)
		return days != 0
			? Numeric.create(
					(this.date ?? new Date.Numeric()).next({ days }).normalize(),
					time?.next({ hours: -24 * days }),
					this.zone
			  )
			: Numeric.create(this.date, time, this.zone)
	}
	invert(): Numeric {
		const result = this.normalize()
		return new Numeric(
			result.years ? 9999 - result.years : undefined,
			result.months ? 11 - result.months : undefined,
			result.days ? 30 - result.days : undefined,
			result.hours ? 23 - result.hours : undefined,
			result.minutes ? 59 - result.minutes : undefined,
			result.seconds ? 59 - result.seconds : undefined,
			result.milliseconds ? 999 - result.milliseconds : undefined,
			result.zone
		)
	}
	epoch(precision: Precision = "seconds"): number {
		return Math.round(
			this.system.getTime() /
				{ milliseconds: 1, seconds: 1000, minutes: 60000, hours: 3600000, days: 86400000 }[precision]
		)
	}
	truncate(precision: Precision): Numeric {
		const result = { ...Numeric.zero, ...this.value }
		switch (precision) {
			case "days":
				delete result.hours
			// eslint-disable-next-line no-fallthrough
			case "hours":
				delete result.minutes
			// eslint-disable-next-line no-fallthrough
			case "minutes":
				delete result.seconds
			// eslint-disable-next-line no-fallthrough
			case "seconds":
				delete result.milliseconds
		}
		return Numeric.create(result)
	}
	format(): DateTime {
		const result = this.normalize()
		return `${(result.date ?? new Date.Numeric()).format()}T${result.time?.format() ?? ""}${
			result.zone ?? ""
		}` as DateTime
	}
	next(increment: Numeric.Value): Numeric {
		return new Numeric(
			this.years == undefined && increment.years == undefined ? undefined : (this.years ?? 0) + (increment.years ?? 0),
			this.months == undefined && increment.months == undefined
				? undefined
				: (this.months ?? 0) + (increment.months ?? 0),
			this.days == undefined && increment.days == undefined ? undefined : (this.days ?? 0) + (increment.days ?? 0),
			this.hours == undefined && increment.hours == undefined ? undefined : (this.hours ?? 0) + (increment.hours ?? 0),
			this.minutes == undefined && increment.minutes == undefined
				? undefined
				: (this.minutes ?? 0) + (increment.minutes ?? 0),
			this.seconds == undefined && increment.seconds == undefined
				? undefined
				: (this.seconds ?? 0) + (increment.seconds ?? 0),
			this.milliseconds == undefined && increment.milliseconds == undefined
				? undefined
				: (this.milliseconds ?? 0) + (increment.milliseconds ?? 0),
			this.zone
		)
	}
	previous(decrement: Numeric.Value): Numeric {
		return new Numeric(
			this.years == undefined && decrement.years == undefined ? undefined : (this.years ?? 0) - (decrement.years ?? 0),
			this.months == undefined && decrement.months == undefined
				? undefined
				: (this.months ?? 0) - (decrement.months ?? 0),
			this.days == undefined && decrement.days == undefined ? undefined : (this.days ?? 0) - (decrement.days ?? 0),
			this.hours == undefined && decrement.hours == undefined ? undefined : (this.hours ?? 0) - (decrement.hours ?? 0),
			this.minutes == undefined && decrement.minutes == undefined
				? undefined
				: (this.minutes ?? 0) - (decrement.minutes ?? 0),
			this.seconds == undefined && decrement.seconds == undefined
				? undefined
				: (this.seconds ?? 0) - (decrement.seconds ?? 0),
			this.milliseconds == undefined && decrement.milliseconds == undefined
				? undefined
				: (this.milliseconds ?? 0) - (decrement.milliseconds ?? 0),
			this.zone
		)
	}
	set(changes: Numeric.Value): Numeric {
		return new Numeric(
			changes.years ?? this.years,
			changes.months ?? this.months,
			changes.days ?? this.days,
			changes.hours ?? this.hours,
			changes.minutes ?? this.minutes,
			changes.seconds ?? this.seconds,
			changes.milliseconds ?? this.milliseconds,
			changes.zone ?? this.zone
		)
	}
	adjust(zone: TimeZone.Offset): Numeric {
		const difference = TimeZone.Offset.difference(this.zone, zone)
		return new Numeric(
			this.years,
			this.months,
			this.days,
			(this.hours ?? 0) - difference.hours,
			(this.minutes ?? 0) - difference.minutes,
			this.seconds,
			this.milliseconds,
			zone
		)
	}
	static zero = new Numeric(undefined, undefined, undefined, undefined, undefined, undefined, 0)
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static create(): Numeric
	static create(date: globalThis.Date): Numeric
	static create(date: number, precision?: Precision): Numeric
	static create(date: Numeric.Value): Numeric
	static create(date?: Date.Numeric.Value, time?: Time.Numeric.Value, zone?: TimeZone.Offset): Numeric
	static create(
		...argument:
			| []
			| [globalThis.Date]
			| [number, Precision?]
			| [Numeric.Value]
			| [Date.Numeric.Value?, Time.Numeric.Value?, TimeZone.Offset?]
	): Numeric {
		return isly.tuple().is(argument)
			? new Numeric()
			: isly.tuple(isly.instance(globalThis.Date, "Date")).is(argument)
			? new Numeric(
					argument[0].getUTCFullYear(),
					argument[0].getUTCMonth(),
					argument[0].getUTCDate() - 1,
					argument[0].getUTCHours(),
					argument[0].getUTCMinutes(),
					argument[0].getUTCSeconds(),
					argument[0].getUTCMilliseconds(),
					"Z"
			  )
			: isly.tuple(Numeric.Value.type).is(argument)
			? new Numeric(
					argument[0].years,
					argument[0].months,
					argument[0].days,
					argument[0].hours,
					argument[0].minutes,
					argument[0].seconds,
					argument[0].milliseconds,
					argument[0].zone
			  )
			: isly
					.tuple(
						Date.Numeric.Value.type.optional(),
						Time.Numeric.Value.type.optional(),
						TimeZone.Offset.type.optional()
					)
					.is(argument)
			? new Numeric(
					argument[0]?.years,
					argument[0]?.months,
					argument[0]?.days,
					argument[1]?.hours,
					argument[1]?.minutes,
					argument[1]?.seconds,
					argument[1]?.milliseconds,
					argument[2]
			  )
			: isly.tuple(isly.number(), Precision.type.optional()).is(argument)
			? argument[1] == "milliseconds"
				? new Numeric(1970, undefined, undefined, undefined, undefined, undefined, argument[0], "Z")
				: argument[1] == "minutes"
				? new Numeric(1970, undefined, undefined, undefined, argument[0], undefined, undefined, "Z")
				: argument[1] == "hours"
				? new Numeric(1970, undefined, undefined, argument[0], undefined, undefined, undefined, "Z")
				: argument[1] == "days"
				? new Numeric(1970, undefined, argument[0], undefined, undefined, undefined, undefined, "Z")
				: new Numeric(1970, undefined, undefined, undefined, undefined, argument[0], undefined, "Z")
			: new Numeric()
	}
	static parse(value: DateTime | Like): Numeric
	static parse(value: string): Numeric | undefined
	static parse(value: DateTime | Like | string): Numeric | undefined {
		const matched =
			/^(\d{4})-(\d{2})-(\d{2})T(?:(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?)?(Z|[+-]\d{2}:\d{2})?$/.exec(
				value
			) ?? /^(\d+)-(\d+)-(\d+)(?:(?:T| )(?:(\d+)(?::(\d+)(?::(\d+)(?:\.(\d+))?)?)?)?)?(Z|[+-]\d+:\d+)?$/.exec(value)
		return matched
			? new Numeric(
					matched[1] ? parseInt(matched[1]) : undefined, // years
					matched[2] ? parseInt(matched[2]) - 1 : undefined, // months
					matched[3] ? parseInt(matched[3]) - 1 : undefined, // days
					matched[4] ? parseInt(matched[4]) : undefined, // hours
					matched[5] ? parseInt(matched[5]) : undefined, // minutes
					matched[6] ? parseInt(matched[6]) : undefined, // seconds
					matched[7] ? parseInt(matched[7].substring(0, 3).padEnd(3, "0")) : undefined, // milliseconds
					matched[8] ? TimeZone.Offset.parse(matched[8]) : undefined // zone
			  )
			: undefined
	}
}

export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.DateTime.Numeric").bind()
}
