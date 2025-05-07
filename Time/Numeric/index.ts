import { isly } from "isly"
import type { Time } from "../index"
import { Precision } from "../Precision"
import { Value as _Value } from "./Value"

export class Numeric {
	get precision(): Precision {
		return this.milliseconds != undefined
			? "milliseconds"
			: this.seconds != undefined
			? "seconds"
			: this.minutes != undefined
			? "minutes"
			: "hours"
	}
	get value(): Numeric.Value {
		return {
			...(this.hours != undefined ? { hours: this.hours } : {}),
			...(this.minutes != undefined ? { minutes: this.minutes } : {}),
			...(this.seconds != undefined ? { seconds: this.seconds } : {}),
			...(this.milliseconds != undefined ? { milliseconds: this.milliseconds } : {}),
		}
	}
	constructor(
		readonly hours?: number,
		readonly minutes?: number,
		readonly seconds?: number,
		readonly milliseconds?: number
	) {}
	normalize(): Numeric {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let result: Numeric = this
		const seconds = result.milliseconds == undefined ? 0 : Math.floor(result.milliseconds / 1000)
		if (seconds != 0)
			result = result.next({ seconds, milliseconds: -1000 * seconds })
		const minutes = result.seconds == undefined ? 0 : Math.floor(result.seconds / 60)
		if (minutes != 0)
			result = result.next({ minutes, seconds: -60 * minutes })
		const hours = result.minutes == undefined ? 0 : Math.floor(result.minutes / 60)
		if (hours != 0)
			result = result.next({ hours, minutes: -60 * hours })
		return result
	}
	invert(): Numeric {
		const result = this.normalize()
		return new Numeric(
			result.hours ? 23 - result.hours : undefined,
			result.minutes ? 59 - result.minutes : undefined,
			result.seconds ? 59 - result.seconds : undefined,
			result.milliseconds ? 999 - result.milliseconds : undefined
		)
	}
	truncate(precision: Precision): Numeric {
		const result = this.value
		switch (precision) {
			case "hours":
				delete result.minutes
			// eslint-disable-next-line no-fallthrough
			case "minutes":
				delete result.seconds
			// eslint-disable-next-line no-fallthrough
			case "seconds":
				delete result.milliseconds
		}
		return Numeric.from(result)
	}
	format(): Time {
		const normalized = this.normalize()
		let result = ""
		switch (this.precision) {
			case "milliseconds":
				result = `.${(normalized.milliseconds ?? 0).toString().padStart(3, "0")}`
			// eslint-disable-next-line no-fallthrough
			case "seconds":
				result = `:${(normalized.seconds ?? 0).toString().padStart(2, "0") + result}`
			// eslint-disable-next-line no-fallthrough
			case "minutes":
				result = `:${(normalized.minutes ?? 0).toString().padStart(2, "0") + result}`
			// eslint-disable-next-line no-fallthrough
			case "hours":
				result = `${(normalized.hours ?? 0).toString().padStart(2, "0") + result}`
		}
		return result
	}
	epoch(precision: Precision = "seconds"): number {
		const result =
			(((this.hours ?? 0) * 60 + (this.minutes ?? 0)) * 60 + (this.seconds ?? 0)) * 1000 + (this.milliseconds ?? 0)
		return Math.trunc(result / Precision.factor[precision])
	}
	next(increment: Numeric.Value): Numeric {
		return new Numeric(
			this.hours == undefined && increment.hours == undefined ? undefined : (this.hours ?? 0) + (increment.hours ?? 0),
			this.minutes == undefined && increment.minutes == undefined
				? undefined
				: (this.minutes ?? 0) + (increment.minutes ?? 0),
			this.seconds == undefined && increment.seconds == undefined
				? undefined
				: (this.seconds ?? 0) + (increment.seconds ?? 0),
			this.milliseconds == undefined && increment.milliseconds == undefined
				? undefined
				: (this.milliseconds ?? 0) + (increment.milliseconds ?? 0)
		)
	}
	previous(decrement: Numeric.Value): Numeric {
		return new Numeric(
			this.hours == undefined && decrement.hours == undefined ? undefined : (this.hours ?? 0) - (decrement.hours ?? 0),
			this.minutes == undefined && decrement.minutes == undefined
				? undefined
				: (this.minutes ?? 0) - (decrement.minutes ?? 0),
			this.seconds == undefined && decrement.seconds == undefined
				? undefined
				: (this.seconds ?? 0) - (decrement.seconds ?? 0),
			this.milliseconds == undefined && decrement.milliseconds == undefined
				? undefined
				: (this.milliseconds ?? 0) - (decrement.milliseconds ?? 0)
		)
	}
	static now(): Numeric {
		return Numeric.create(Date.now())
	}
	static create(epoch: number, precision: Precision = "seconds"): Numeric {
		const integerDivision = (dividend: number, divisor: number) => [Math.trunc(dividend / divisor), dividend % divisor]
		const [s, milliseconds] = integerDivision(epoch * Precision.factor[precision], 1000)
		const [m, seconds] = integerDivision(s, 60)
		const [hours, minutes] = integerDivision(m, 60)
		return new Numeric(hours, minutes, seconds, milliseconds).truncate(precision)
	}
	static from(value: Numeric.Value | globalThis.Date): Numeric {
		return value instanceof globalThis.Date
			? new Numeric(value.getUTCHours(), value.getUTCMinutes(), value.getUTCSeconds(), value.getUTCMilliseconds())
			: new Numeric(value.hours, value.minutes, value.seconds, value.milliseconds)
	}
}

export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Time.Numeric").bind()
}
