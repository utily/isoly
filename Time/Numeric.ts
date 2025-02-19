import { isly } from "isly"
import type { Time } from "./index"
import { Precision } from "./Precision"

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
	get values(): Numeric.Values {
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
	epoch(precision: Precision = "seconds"): number {
		return Math.trunc(
			(((this.hours ?? 0) * 60 + (this.minutes ?? 0)) * 60 + (this.seconds ?? 0)) * 1000 +
				(this.milliseconds ?? 0) / Precision.factor[precision]
		)
	}
	truncate(precision: Precision): Numeric {
		const result = this.values
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
		return Numeric.create(result)
	}
	normalize(precision?: Precision): Numeric {
		return Numeric.create(this.epoch("milliseconds"), "milliseconds").truncate(precision ?? this.precision)
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
	static create(epoch: number, precision?: Precision): Numeric
	static create(values: Numeric.Values): Numeric
	static create(epoch: number | Numeric.Values, precision: Precision = "seconds"): Numeric {
		if (typeof epoch == "number") {
			const integerDivision = (dividend: number, divisor: number) => [
				Math.trunc(dividend / divisor),
				dividend % divisor,
			]
			const [s, milliseconds] = integerDivision(epoch * Precision.factor[precision], 1000)
			const [m, seconds] = integerDivision(s, 60)
			const [hours, minutes] = integerDivision(m, 60)
			epoch = {
				hours,
				minutes,
				seconds,
				milliseconds,
			}
		}
		return new Numeric(epoch.hours, epoch.minutes, epoch.seconds, epoch.milliseconds)
	}
	static parse(time: Time | string | undefined): Numeric {
		const [hours, minutes, secondsMilliseconds] = time?.split(":", 3) ?? []
		const [seconds, milliseconds] = secondsMilliseconds?.split(".", 2) ?? []
		return Numeric.create({
			hours: Number.parseInt(hours),
			minutes: minutes != undefined ? Number.parseInt(minutes) : undefined,
			seconds: seconds != undefined ? Number.parseInt(seconds) : undefined,
			milliseconds: milliseconds != undefined ? Number.parseInt(milliseconds.slice(0, 3).padEnd(3, "0")) : undefined,
		})
	}
}

export namespace Numeric {
	export const { type, is, flawed } = isly.instance(Numeric, "isoly.Time.Numeric").bind()
	export type Values = Partial<Record<Precision, number>>
	export namespace Values {
		export const { type, is, flawed } = isly
			.object<Values>(
				{
					hours: isly.number().optional(),
					minutes: isly.number().optional(),
					seconds: isly.number().optional(),
					milliseconds: isly.number().optional(),
				},
				"isoly.Time.Numeric.Values"
			)
			.bind()
	}
}
