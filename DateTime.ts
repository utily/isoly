import { Date } from "./Date"
import { Locale } from "./Locale"
import { TimeSpan } from "./TimeSpan"

export type DateTime = string

export namespace DateTime {
	export function is(value: any | DateTime): value is DateTime {
		return (
			typeof value == "string" &&
			/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)$/.test(
				value
			)
		)
	}
	export function parse(value: DateTime): globalThis.Date {
		return new globalThis.Date(value)
	}
	export function create(
		value: number,
		resolution?: "days" | "hours" | "minutes" | "seconds" | "milliseconds"
	): DateTime
	export function create(value: globalThis.Date): DateTime
	export function create(
		value: number | globalThis.Date,
		resolution: "days" | "hours" | "minutes" | "seconds" | "milliseconds" = "seconds"
	): DateTime {
		if (typeof value == "number") {
			switch (resolution) {
				case "days":
					value = value * 24
				// eslint-disable-next-line no-fallthrough
				case "hours":
					value = value * 60
				// eslint-disable-next-line no-fallthrough
				case "minutes":
					value = value * 60
				// eslint-disable-next-line no-fallthrough
				case "seconds":
					value = value * 1000
				// eslint-disable-next-line no-fallthrough
				case "milliseconds":
			}
			value = new globalThis.Date(value)
		}
		return value.toISOString()
	}
	export function now(): DateTime {
		return create(new globalThis.Date())
	}
	export function localize(value: DateTime | globalThis.Date, locale?: Locale, timezone?: string): DateTime {
		const localeString = locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale
		return (is(value) ? parse(value) : value).toLocaleString(localeString, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
		})
	}
	export function epoch(
		value: DateTime | globalThis.Date,
		resolution: "days" | "hours" | "minutes" | "seconds" | "milliseconds" = "seconds"
	): number {
		let result = (typeof value == "string" ? parse(value) : value).getTime()
		switch (resolution) {
			case "days":
				result = Math.round(result / 24)
			// eslint-disable-next-line no-fallthrough
			case "hours":
				result = Math.round(result / 60)
			// eslint-disable-next-line no-fallthrough
			case "minutes":
				result = Math.round(result / 60)
			// eslint-disable-next-line no-fallthrough
			case "seconds":
				result = Math.round(result / 1000)
			// eslint-disable-next-line no-fallthrough
			case "milliseconds":
		}
		return result
	}
	export function next(time: DateTime, span: number | TimeSpan = 1): DateTime {
		let result: DateTime
		if (typeof span == "number")
			result = nextSecond(time, span)
		else {
			result = time
			if (span.years)
				result = nextYear(result, span.years)
			if (span.months)
				result = nextMonth(result, span.months)
			if (span.days)
				result = nextDay(result, span.days)
			if (span.hours)
				result = nextHour(result, span.hours)
			if (span.minutes)
				result = nextMinute(result, span.minutes)
			if (span.seconds)
				result = nextSecond(result, span.seconds)
			if (span.milliseconds)
				result = nextMillisecond(result, span.milliseconds)
		}
		return result
	}
	export function previous(time: DateTime, span: number | TimeSpan = 1): DateTime {
		let result: DateTime
		if (typeof span == "number")
			result = previousSecond(time, span)
		else {
			result = time
			if (span.years)
				result = previousYear(result, span.years)
			if (span.months)
				result = previousMonth(result, span.months)
			if (span.days)
				result = previousDay(result, span.days)
			if (span.hours)
				result = previousHour(result, span.hours)
			if (span.minutes)
				result = previousMinute(result, span.minutes)
			if (span.seconds)
				result = previousSecond(result, span.seconds)
			if (span.milliseconds)
				result = previousMillisecond(result, span.milliseconds)
		}
		return result
	}
	export function nextMillisecond(time: DateTime, milliseconds = 1): DateTime {
		const result = parse(time)
		result.setMilliseconds(result.getMilliseconds() + milliseconds)
		return DateTime.create(result)
	}
	export function previousMillisecond(time: DateTime, seconds = 1): DateTime {
		return nextMillisecond(time, -seconds)
	}
	export function nextSecond(time: DateTime, seconds = 1): DateTime {
		const result = parse(time)
		result.setSeconds(result.getSeconds() + seconds)
		return DateTime.create(result)
	}
	export function previousSecond(time: DateTime, seconds = 1): DateTime {
		return nextSecond(time, -seconds)
	}
	export function nextMinute(time: DateTime, minutes = 1): DateTime {
		const result = parse(time)
		result.setMinutes(result.getMinutes() + minutes)
		return DateTime.create(result)
	}
	export function previousMinute(time: DateTime, minutes = 1): DateTime {
		return nextMinute(time, -minutes)
	}
	export function nextHour(time: DateTime, hours = 1): DateTime {
		const result = parse(time)
		result.setHours(result.getHours() + hours)
		return DateTime.create(result)
	}
	export function previousHour(time: DateTime, hours = 1): DateTime {
		return nextHour(time, -hours)
	}
	export function nextDay(time: DateTime, days = 1): DateTime {
		const result = parse(time)
		result.setDate(result.getDate() + days)
		return DateTime.create(result)
	}
	export function previousDay(time: DateTime, days = 1): DateTime {
		return nextDay(time, -days)
	}
	export function nextMonth(time: DateTime, months = 1): DateTime {
		const result = parse(time)
		result.setMonth(result.getMonth() + months)
		return DateTime.create(result)
	}
	export function previousMonth(time: DateTime, months = 1): DateTime {
		return nextMonth(time, -months)
	}
	export function nextYear(time: DateTime, years = 1): DateTime {
		const result = parse(time)
		result.setFullYear(result.getFullYear() + years)
		return DateTime.create(result)
	}
	export function previousYear(time: DateTime, years = 1): DateTime {
		return nextYear(time, -years)
	}
	export function getDate(time: DateTime): Date {
		return time.substring(0, 10)
	}
	export function getTime(time: DateTime): string {
		return time.substring(11)
	}
	export function getYear(time: DateTime): number {
		return Number.parseInt(time.substring(0, 4))
	}
	export function getMonth(time: DateTime): number {
		return Number.parseInt(time.substring(5, 7))
	}
	export function getDay(time: DateTime): number {
		return Number.parseInt(time.substring(8, 10))
	}
	export function getHour(time: DateTime): number {
		return Number.parseInt(time.substring(11, 13))
	}
	export function getMinute(time: DateTime): number {
		return Number.parseInt(time.substring(14, 16))
	}
	export function getSecond(time: DateTime): number {
		return Number.parseInt(time.substring(17, 19))
	}
}
/*
2021-01-10T13:37:42.000Z
012345678901234567890123
0         1         2
*/
