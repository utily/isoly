import { Date } from "./Date"
import { Locale } from "./Locale"
import { TimeSpan } from "./TimeSpan"
import { TimeZone } from "./TimeZone"
import { TimeZoneOffset } from "./TimeZoneOffset"

export type DateTime = string

export namespace DateTime {
	function isHours(v: string): boolean {
		return (v[0] >= "0" && v[0] <= "1" && v[1] >= "0" && v[1] <= "9") || (v[0] == "2" && v[1] >= "0" && v[1] <= "3")
	}
	function isMinutes(v: string): boolean {
		return v[0] >= "0" && v[0] <= "5" && v[1] >= "0" && v[1] <= "9"
	}
	function isSeconds(v: string): boolean {
		return (v[0] >= "0" && v[0] <= "5" && v[1] >= "0" && v[1] <= "9") || v == "60" || v == "61"
	}
	export function is(value: any | DateTime): value is DateTime {
		// 2019-04-01T01
		// 2019-04-01T01Z
		// 2019-04-01T01+01:00
		// 2019-04-01T01:11
		// 2019-04-01T01:11Z
		// 2019-04-01T01:11+01:00
		// 2019-04-01T01:11:29
		// 2019-04-01T01:11:29Z
		// 2019-04-01T01:11:29+01:00
		// 2019-04-01T01:11:29.000
		// 2019-04-01T01:11:29.000Z
		// 2019-04-01T01:11:29.000+01:00
		// 01234567890123456789012345678
		// 0         1         2
		return (
			typeof value == "string" &&
			value.length >= 13 &&
			value.length <= 29 &&
			Date.is(value.substring(0, 10)) &&
			value[10] == "T" &&
			isHours(value.substring(11, 13)) &&
			(value.length == 13 ||
				TimeZoneOffset.is(value.substring(13)) ||
				(value[13] == ":" &&
					value.length >= 16 &&
					isMinutes(value.substring(14, 16)) &&
					(value.length == 16 ||
						TimeZoneOffset.is(value.substring(16)) ||
						(value[16] == ":" &&
							value.length >= 19 &&
							isSeconds(value.substring(17, 19)) &&
							(value.length == 19 ||
								TimeZoneOffset.is(value.substring(19)) ||
								(value[19] == "." &&
									value.length >= 23 &&
									[...value.substring(20, 23)].every(c => c >= "0" && c <= "9") &&
									(value.length == 23 || TimeZoneOffset.is(value.substring(23)))))))))
		)
	}
	export function parse(value: DateTime): globalThis.Date {
		return new globalThis.Date(DateTime.truncate(value, "milliseconds"))
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
				// fallthrough...
				case "hours":
					value = value * 60
				// fallthrough...
				case "minutes":
					value = value * 60
				// fallthrough...
				case "seconds":
					value = value * 1000
				// fallthrough...
				case "milliseconds":
			}
			value = new globalThis.Date(value)
		}
		return value.toISOString()
	}
	export function now(): DateTime {
		return create(new globalThis.Date())
	}
	export type Format = Intl.DateTimeFormatOptions

	export function localize(value: DateTime | globalThis.Date, format: Format, locale?: Locale): string
	export function localize(value: DateTime | globalThis.Date, locale?: Locale, timeZone?: TimeZone): string
	export function localize(
		value: DateTime | globalThis.Date,
		formatOrLocale?: Locale | Format,
		localeOrTimeZone?: string | Locale
	): string {
		let result: string
		if (typeof formatOrLocale == "object") {
			// formatOrLocale is Format
			// localeOrTimeZone is Locale | undefined
			const localeString = localeOrTimeZone ? localeOrTimeZone : Intl.DateTimeFormat().resolvedOptions().locale
			result = (is(value) ? parse(value) : value)
				.toLocaleString(localeString, formatOrLocale)
				// For consistency, replace NNBSP with space:
				// Unicode has decided to use `Narrow No-Break Space (NNBSP)` (U+202F) instead of space in some cases.
				// It breaks tests, when running in different environments.
				// https://icu.unicode.org/download/72#:~:text=In%20many%20formatting%20patterns%2C%20ASCII%20spaces%20are%20replaced%20with%20Unicode%20spaces%20(e.g.%2C%20a%20%22thin%20space%22)
				// This can be removed, with a breaking change and updated tests, when all systems use updated versions of ICU.
				.replaceAll(" ", " ")
		} else {
			// formatOrLocale is Locale | undefined
			// localeOrTimeZone is timeZone | undefined
			const precision = is(value) ? DateTime.precision(value) : "milliseconds"
			result = localize(
				value,
				{
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute:
						precision == "minutes" || precision == "seconds" || precision == "milliseconds" ? "2-digit" : undefined,
					second: precision == "seconds" || precision == "milliseconds" ? "2-digit" : undefined,
					timeZone: localeOrTimeZone,
				} as Format,
				formatOrLocale
			)
		}
		return result
	}
	/** @deprecated Use timeZoneOffset() */
	export function timeZone(value: DateTime): TimeZoneOffset | "" {
		return timeZoneOffset(value)
	}
	export function timeZoneOffset(value: DateTime): TimeZoneOffset | "" {
		const result = value[value.length - 1] == "Z" ? "Z" : value.substring(value.length - 6)
		return TimeZoneOffset.is(result) ? result : ""
	}
	export function timeZoneShort(value: DateTime): number {
		return parse(value).getTimezoneOffset()
	}
	export type Precision = "hours" | "minutes" | "seconds" | "milliseconds"
	export function precision(value: DateTime): Precision {
		const zone = timeZoneOffset(value)
		const time = value.substring(0, value.length - zone.length).split("T", 2)[1]
		let result: Precision
		switch (time.length) {
			case 2:
				result = "hours"
				break
			case 5:
				result = "minutes"
				break
			case 8:
				result = "seconds"
				break
			default:
			case 12:
				result = "milliseconds"
				break
		}
		return result
	}

	export function truncate(value: DateTime, precision: Precision): DateTime {
		const zone = timeZoneOffset(value)
		// eslint-disable-next-line prefer-const
		let [date, time] = value.split("T", 2)
		time = time.substring(0, time.length - zone.length)
		switch (time.length) {
			case 2:
				time += ":00:00.000"
				break
			case 5:
				time += ":00.000"
				break
			case 8:
				time += ".000"
				break
		}
		let result: string
		switch (precision) {
			case "hours":
				result = time.substring(0, 2)
				break
			case "minutes":
				result = time.substring(0, 5)
				break
			case "seconds":
				result = time.substring(0, 8)
				break
			case "milliseconds":
				result = time.substring(0, 12)
				break
		}
		return date + "T" + result + zone
	}
	export function epoch(
		value: DateTime | globalThis.Date,
		resolution: "days" | "hours" | "minutes" | "seconds" | "milliseconds" = "seconds"
	): number {
		let result = (typeof value == "string" ? parse(value) : value).getTime()
		switch (resolution) {
			case "days":
				result = Math.round(result / 24)
			// fallthrough...
			case "hours":
				result = Math.round(result / 60)
			// fallthrough...
			case "minutes":
				result = Math.round(result / 60)
			// fallthrough...
			case "seconds":
				result = Math.round(result / 1000)
			// fallthrough...
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
	export function previousMillisecond(time: DateTime, milliseconds = 1): DateTime {
		return nextMillisecond(time, -milliseconds)
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
		const offset = result.getTimezoneOffset()
		result.setDate(result.getDate() + days)
		result.setMinutes(result.getMinutes() + offset - result.getTimezoneOffset()) // handle changing potential daylight saving time
		return DateTime.create(result)
	}
	export function previousDay(time: DateTime, days = 1): DateTime {
		return nextDay(time, -days)
	}
	export function nextMonth(time: DateTime, months = 1): DateTime {
		const result = parse(time)
		const offset = result.getTimezoneOffset()
		result.setMonth(result.getMonth() + months)
		result.setMinutes(result.getMinutes() + offset - result.getTimezoneOffset()) // handle changing potential daylight saving time
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
	export function getMillisecond(time: DateTime): number {
		return Number.parseInt(time.substring(20, 23))
	}
	export function span(time: DateTime, relative: DateTime): TimeSpan {
		return {
			...Date.span(time, relative),
			hours: getHour(time) - getHour(relative),
			minutes: getMinute(time) - getMinute(relative),
			seconds: getSecond(time) - getSecond(relative),
			milliseconds: getMillisecond(time) - getMillisecond(relative),
		}
	}
	export function duration(
		from: DateTime,
		to: DateTime,
		greatestUnit: "days" | "hours" | "minutes" | "seconds" | "milliseconds" = "hours"
	): TimeSpan {
		let milliseconds = epoch(to, "milliseconds") - epoch(from, "milliseconds")
		const sign = Math.sign(milliseconds)
		milliseconds = Math.abs(milliseconds)
		const result: TimeSpan = {}
		switch (greatestUnit) {
			case "days":
				result.days = sign * Math.floor(milliseconds / (24 * 3600 * 1000))
				milliseconds -= sign * result.days * 24 * 3600 * 1000
			// Fallthrough...
			case "hours":
				result.hours = sign * Math.floor(milliseconds / (3600 * 1000))
				milliseconds -= sign * result.hours * 3600 * 1000
			// Fallthrough...
			case "minutes":
				result.minutes = sign * Math.floor(milliseconds / (60 * 1000))
				milliseconds -= sign * result.minutes * 60 * 1000
			// Fallthrough...
			case "seconds":
				result.seconds = sign * Math.floor(milliseconds / 1000)
				milliseconds -= sign * result.seconds * 1000
			// Fallthrough...
			case "milliseconds":
				result.milliseconds = sign * milliseconds
		}
		return result
		// return {
		// 	hours: getHour(time) - getHour(relative),
		// 	minutes: getMinute(time) - getMinute(relative),
		// 	seconds: getSecond(time) - getSecond(relative),
		// 	milliseconds: getMillisecond(time) - getMillisecond(relative),
		// }
	}
	export const epochStart = "0000-01-01T00:00:00.000Z" as const
	export const epochEnd = "9999-12-31T23:59:59.999Z" as const
	export function invert(time: DateTime): DateTime {
		return `${Date.invert(getDate(time))}T${(24 - getHour(time)).toFixed(0).padStart(2, "0")}:${(60 - getMinute(time))
			.toFixed(0)
			.padStart(2, "0")}:${(60 - getSecond(time)).toFixed(0).padStart(2, "0")}.${(999 - getMillisecond(time))
			.toFixed(0)
			.padStart(3, "0")}Z`
	}
}
/*
2021-01-10T13:37:42.000Z
012345678901234567890123
0         1         2
*/
