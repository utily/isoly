import { isly } from "isly"
import { DateSpan } from "../DateSpan"

export interface TimeSpan extends DateSpan {
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

export namespace TimeSpan {
	export const { type, is, flawed } = DateSpan.type
		.extend<TimeSpan>(
			{
				hours: isly.number().optional(),
				minutes: isly.number().optional(),
				seconds: isly.number().optional(),
				milliseconds: isly.number().optional(),
			},
			"isoly.TimeSpan"
		)
		.bind()
	export function toHours(value: TimeSpan, round?: Round): number {
		const result =
			(dateToMilliseconds(value) + (value.milliseconds ?? 0)) / (60 * 60 * 1000) +
			(value.seconds ?? 0) / (60 * 60) +
			(value.minutes ?? 0) / 60 +
			(value.hours ?? 0)
		return performRound(result, round)
	}
	export function toMinutes(value: TimeSpan, round?: Round): number {
		const result =
			(dateToMilliseconds(value) + (value.milliseconds ?? 0)) / (60 * 1000) +
			(value.seconds ?? 0) / 60 +
			(value.minutes ?? 0) +
			(value.hours ?? 0) * 60
		return performRound(result, round)
	}
	export function toSeconds(value: TimeSpan, round?: Round): number {
		const result =
			(dateToMilliseconds(value) + (value.milliseconds ?? 0)) / 1000 +
			(value.seconds ?? 0) +
			(value.minutes ?? 0) * 60 +
			(value.hours ?? 0) * 60 * 60
		return performRound(result, round)
	}
	export function toMilliseconds(value: TimeSpan, round?: Round): number {
		const result =
			dateToMilliseconds(value) +
			(value.milliseconds ?? 0) +
			(value.seconds ?? 0) * 1000 +
			(value.minutes ?? 0) * 60 * 1000 +
			(value.hours ?? 0) * 60 * 60 * 1000
		return performRound(result, round)
	}
	function unitByUnit(
		operation: (left: number, right: number) => number,
		left: TimeSpan,
		...rights: TimeSpan[]
	): TimeSpan {
		return rights.reduce(
			(result, span) =>
				Object.entries<number | undefined>(span).reduce(
					(result, [key, right]: [keyof TimeSpan, number | undefined]) =>
						(({ [key]: left, ...result }) =>
							Object.assign(result, { [key]: +operation(left ?? 0, right ?? 0).toFixed(9) }))(result),
					result
				),
			left
		)
	}
	export function add(...addends: TimeSpan[]): TimeSpan {
		return normalize(unitByUnit((left, right) => left + right, {}, ...addends))
	}
	export function subtract(minuend: TimeSpan, ...subtrahends: TimeSpan[]): TimeSpan {
		return normalize(unitByUnit((left, right) => left - right, minuend, ...subtrahends))
	}
	export function fromHours(
		value: number,
		options?: { precision?: "hours" | "minutes" | "seconds" | "milliseconds"; normalize?: boolean }
	): TimeSpan {
		let result: ReturnType<typeof fromHours>
		const precision = options?.precision ?? "milliseconds"
		const hours = Math.trunc(value)
		const remainder = +(value % 1).toFixed(9)
		if (precision != "hours") {
			result = { hours: hours, ...fromMinutes(remainder * 60, { precision, normalize: false }) }
		} else
			result = { hours: hours + Math.round(remainder) }
		return options?.normalize == false ? result : normalize(result)
	}
	export function fromMinutes(
		value: number,
		options?: { precision?: "minutes" | "seconds" | "milliseconds"; normalize?: boolean }
	): TimeSpan {
		let result: ReturnType<typeof fromMinutes>
		const precision = options?.precision ?? "milliseconds"
		const minutes = Math.trunc(value)
		const remainder = +(value % 1).toFixed(7)
		if (precision != "minutes")
			result = { minutes: minutes, ...fromSeconds(remainder * 60, { precision, normalize: false }) }
		else {
			const rounded = minutes + Math.round(remainder)
			result = add(
				{ minutes: rounded % 60 },
				fromHours(Math.trunc(rounded / 60), { precision: "hours", normalize: false })
			)
		}
		return options?.normalize == false ? result : normalize(result)
	}
	export function fromSeconds(
		value: number,
		options?: { precision?: "seconds" | "milliseconds"; normalize?: boolean }
	): TimeSpan {
		let result: ReturnType<typeof fromSeconds>
		const precision = options?.precision ?? "milliseconds"
		const seconds = Math.trunc(value)
		const remainder = +(value % 1).toFixed(5)
		if (precision != "seconds")
			result = { ...(seconds && { seconds: seconds }), ...fromMilliseconds(remainder * 1000, { normalize: false }) }
		else {
			const rounded = seconds + Math.round(remainder)
			result = add(
				{ seconds: rounded % 60 },
				fromMinutes(Math.trunc(rounded / 60), { precision: "minutes", normalize: false })
			)
		}
		return options?.normalize == false ? result : normalize(result)
	}
	export function fromMilliseconds(value: number, options?: { normalize?: boolean }): TimeSpan {
		const rounded = Math.round(value)
		const result = add(
			!rounded ? {} : { milliseconds: rounded % 1000 },
			Math.abs(rounded) < 1000
				? {}
				: fromSeconds(Math.trunc(rounded / 1000), { precision: "seconds", normalize: false })
		)
		return options?.normalize == false ? result : normalize(result)
	}
	export function normalize(value: TimeSpan): TimeSpan {
		const result = {
			milliseconds: Math.round(toMilliseconds(value) % 1000),
			seconds: Math.trunc(toSeconds(value) % 60),
			minutes: Math.trunc(toMinutes(value) % 60),
			hours: Math.trunc(toHours(value)),
		}
		if (!(-1000 < result.milliseconds && result.milliseconds < 1000)) {
			result.seconds += Math.trunc(result.milliseconds / 1000)
			result.milliseconds = result.milliseconds % 1000
		}
		if (!(-60 < result.seconds && result.seconds < 60)) {
			result.minutes += Math.trunc(result.seconds / 60)
			result.seconds = result.seconds % 60
		}
		if (!(-60 < result.minutes && result.minutes < 60)) {
			result.hours += Math.trunc(result.minutes)
			result.minutes = result.minutes % 60
		}
		return Object.fromEntries(Object.entries<number | undefined>(result).filter(([, value]) => !!value))
	}
}

function dateToMilliseconds(span: TimeSpan): number {
	const now = Date.UTC(0, 0)
	const date = new Date(now)
	const future = Date.UTC(
		date.getUTCFullYear() + (span.years ?? 0),
		date.getUTCMonth() + (span.months ?? 0),
		date.getUTCDate() + (span.days ?? 0),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
		date.getUTCMilliseconds()
	)
	return future.valueOf() - date.valueOf()
}

type Round = "round" | "floor" | "ceiling"
function performRound(value: number, round?: Round): number {
	return !round
		? value
		: round == "ceiling"
		? Math.ceil(value)
		: round == "floor"
		? Math.floor(value)
		: Math.round(value)
}
