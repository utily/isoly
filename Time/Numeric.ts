import { isly } from "isly"
import type { Time } from "./index"
import { Precision } from "./Precision"

export type Numeric = Partial<Record<Precision, number>>

export namespace Numeric {
	export const type = isly<Numeric>(
		"object",
		{
			hours: isly("number").optional(),
			minutes: isly("number").optional(),
			seconds: isly("number").optional(),
			milliseconds: isly("number").optional(),
		},
		"isoly.Time.Numeric"
	)
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
	export function create(epoch: number, precision: Precision = "seconds"): Required<Numeric> {
		const integerDivision = (dividend: number, divisor: number) => [Math.trunc(dividend / divisor), dividend % divisor]
		const [s, milliseconds] = integerDivision(epoch * Precision.factor[precision], 1000)
		const [m, seconds] = integerDivision(s, 60)
		const [hours, minutes] = integerDivision(m, 60)
		return {
			hours,
			minutes,
			seconds,
			milliseconds,
		}
	}
	export function parse(time: Time | string | undefined): Numeric {
		const [hours, minutes, secondsMilliseconds] = time?.split(":", 3) ?? []
		const [seconds, milliseconds] = secondsMilliseconds?.split(".", 2) ?? []
		return {
			hours: Number.parseInt(hours),
			minutes: minutes != undefined ? Number.parseInt(minutes) : undefined,
			seconds: seconds != undefined ? Number.parseInt(seconds) : undefined,
			milliseconds: milliseconds != undefined ? Number.parseInt(milliseconds.slice(0, 3).padEnd(3, "0")) : undefined,
		}
	}
	export function epoch(time: Numeric, precision: Precision = "seconds"): number {
		const result =
			(((time.hours ?? 0) * 60 + (time.minutes ?? 0)) * 60 + (time.seconds ?? 0)) * 1000 + (time.milliseconds ?? 0)
		return Math.trunc(result / Precision.factor[precision])
	}
	export function truncate(time: Required<Numeric>, precision: "hours"): Pick<Required<Numeric>, "hours">
	export function truncate(time: Numeric, precision: "hours"): Pick<Numeric, "hours">
	export function truncate(time: Required<Numeric>, precision: "minutes"): Pick<Required<Numeric>, "hours" | "minutes">
	export function truncate(time: Numeric, precision: "minutes"): Pick<Numeric, "hours" | "minutes">
	export function truncate(time: Required<Numeric>, precision: "seconds"): Exclude<Required<Numeric>, "milliseconds">
	export function truncate(time: Numeric, precision: "seconds"): Exclude<Numeric, "milliseconds">
	export function truncate(time: Required<Numeric>, precision: "milliseconds"): Required<Numeric>
	export function truncate(time: Numeric, precision: "milliseconds"): Numeric
	export function truncate(time: Required<Numeric>, precision: Precision): Required<Numeric>
	export function truncate(time: Numeric, precision: Precision): Numeric
	export function truncate(time: Numeric, precision: Precision): Numeric {
		const result = { ...time }
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
		return result
	}
	export function normalize(time: Numeric, precision: "hours"): Pick<Required<Numeric>, "hours">
	export function normalize(time: Numeric, precision: "minutes"): Pick<Required<Numeric>, "hours" | "minutes">
	export function normalize(time: Numeric, precision: "seconds"): Exclude<Required<Numeric>, "milliseconds">
	export function normalize(time: Numeric, precision: "milliseconds"): Required<Numeric>
	export function normalize(time: Numeric, precision?: Precision): Numeric
	export function normalize(time: Numeric, precision?: Precision): Numeric {
		return truncate(create(epoch(time, "milliseconds"), "milliseconds"), precision ?? Numeric.precision(time))
	}
	export function format(time: Numeric, precision?: Precision): Time {
		if (!precision)
			precision = Numeric.precision(time)
		const normalized = normalize(time, precision)
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
	export function precision(time: Numeric): Precision {
		return time.milliseconds != undefined
			? "milliseconds"
			: time.seconds != undefined
			? "seconds"
			: time.minutes != undefined
			? "minutes"
			: "hours"
	}
}
