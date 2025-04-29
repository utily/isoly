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
	normalize(precision?: Precision): Numeric {
		return Numeric.create(this.toEpoch(precision ?? this.precision), precision ?? this.precision)
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
	format(precision?: Precision): Time {
		if (!precision)
			precision = this.precision
		const normalized = this.normalize(precision)
		let result = ""
		switch (precision) {
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
	toEpoch(precision: Precision = "seconds"): number {
		const result =
			(((this.hours ?? 0) * 60 + (this.minutes ?? 0)) * 60 + (this.seconds ?? 0)) * 1000 + (this.milliseconds ?? 0)
		return Math.trunc(result / Precision.factor[precision])
	}
	static create(epoch: number, precision: Precision = "seconds"): Numeric {
		const integerDivision = (dividend: number, divisor: number) => [Math.trunc(dividend / divisor), dividend % divisor]
		const [s, milliseconds] = integerDivision(epoch * Precision.factor[precision], 1000)
		const [m, seconds] = integerDivision(s, 60)
		const [hours, minutes] = integerDivision(m, 60)
		return new Numeric(hours, minutes, seconds, milliseconds).truncate(precision)
	}
	static from(value: Numeric.Value): Numeric {
		return new Numeric(value.hours, value.minutes, value.seconds, value.milliseconds)
	}
	static parse(time: Time | string | undefined): Numeric {
		const [hours, minutes, secondsMilliseconds] = time?.split(":", 3) ?? []
		const [seconds, milliseconds] = secondsMilliseconds?.split(".", 2) ?? []
		return new Numeric(
			hours != undefined ? Number.parseInt(hours) : undefined,
			minutes != undefined ? Number.parseInt(minutes) : undefined,
			seconds != undefined ? Number.parseInt(seconds) : undefined,
			milliseconds != undefined ? Number.parseInt(milliseconds.slice(0, 3).padEnd(3, "0")) : undefined
		)
	}
}

export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Time.Numeric").bind()
}
