import { isly } from "isly"
import { Date } from "../Date"
import { Locale } from "../Locale"
import { TimeSpan } from "../TimeSpan"
import { TimeZone } from "../TimeZone"
import { TimeZoneOffset } from "../TimeZoneOffset"
import { Resolution as DateTimeResolution } from "./Resolution"

export type DateTime = string

export namespace DateTime {
	export import Resolution = DateTimeResolution
	export const type = isly.named(
		"isoly.DateTime",
		isly.string<DateTime>(
			/^((((18|19|20|21|22)[0-9]{2}-(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|(18|19|20)[0-9]{2}-(0[469]|11)-(0[1-9]|[12][0-9]|30)|(18|19|20)[0-9]{2}-(02)-(0[1-9]|1[0-9]|2[0-8])|(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)-(02)-29)(T([01]\d|2[0-3]))(:[0-5]\d(:(([0-5]\d)|60)(\.\d{3}?)?)?)?)(Z|([-+](0\d|1[012])(:(00|15|30|45)?)?)?)$/
		)
	)
	export const is = type.is
	export const flaw = type.flaw
	export function parse(value: DateTime): globalThis.Date {
		return new globalThis.Date(DateTime.truncate(value, "milliseconds"))
	}

	export function create(value: number, resolution?: Resolution): DateTime
	export function create(value: globalThis.Date): DateTime
	export function create(value: number | globalThis.Date, resolution: Resolution = "seconds"): DateTime {
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
		return fixIncorrect(value.toISOString())
	}
	export function fixIncorrect(value: DateTime | string): DateTime {
		if (value.length == 22 && value.match(/\.\dZ$/))
			value = value.substring(0, 21) + "00Z"
		else if (value.length == 23 && value.match(/\.\d\dZ$/))
			value = value.substring(0, 22) + "0Z"
		return value
	}
	/**
	 * Return local time with offset.
	 * Note: During DST-change, this might be wrong.
	 */
	export function fromLocalDateTime(localDateTime: DateTime, timeZone: TimeZone) {
		// Cut off any time-zone-information:
		// TODO: Use the information, and just change offset.
		localDateTime = localDateTime.replace(/(Z|([+-].{5}))?$/, "")

		// Create a Date object with the specified time as UTC
		const utcDateTime = new globalThis.Date(`${localDateTime}Z`)

		const localDate = new globalThis.Date(
			utcDateTime.toLocaleString("sv-SE", { timeZone: timeZone }).replace(" ", "T") + "Z"
		)

		// Calculate the time difference in minutes
		const diffInMinutes = (localDate.getTime() - utcDateTime.getTime()) / 60000

		// Calculate the timezone's offset in hours and minutes
		const offsetHours = Math.floor(Math.abs(diffInMinutes) / 60)
			.toString()
			.padStart(2, "0")
		const offsetMinutes = (Math.abs(diffInMinutes) % 60).toString().padStart(2, "0")

		// Create the timezone string
		const timeZoneString = `${diffInMinutes >= 0 ? "+" : "-"}${offsetHours}:${offsetMinutes}`

		// Return the formatted date string with timezone information
		return `${localDateTime}${timeZoneString}`
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
	export function startOfDay(value: DateTime | Date): DateTime {
		return value.slice(0, 10) + "T00:00:00.000" + (DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z")
	}
	export function endOfDay(value: DateTime | Date): DateTime {
		return value.slice(0, 10) + "T23:59:59.999" + (DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z")
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
		switch (time?.length) {
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
		time = time ? time.substring(0, time.length - zone.length) : ""
		time += {
			2: ":00:00.000",
			5: ":00.000",
			8: ".000",
		}[time?.length]
		return (
			date +
			"T" +
			time.substring(
				0,
				{
					hours: 2,
					minutes: 5,
					seconds: 8,
					milliseconds: 12,
				}[precision]
			) +
			zone
		)
	}
	export function epoch(value: DateTime | globalThis.Date, resolution: Resolution = "seconds"): number {
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
		result.setUTCMilliseconds(result.getUTCMilliseconds() + milliseconds)
		return DateTime.create(result)
	}
	export function previousMillisecond(time: DateTime, milliseconds = 1): DateTime {
		return nextMillisecond(time, -milliseconds)
	}
	export function nextSecond(time: DateTime, seconds = 1): DateTime {
		const result = parse(time)
		result.setUTCSeconds(result.getUTCSeconds() + seconds)
		return DateTime.create(result)
	}
	export function previousSecond(time: DateTime, seconds = 1): DateTime {
		return nextSecond(time, -seconds)
	}
	export function nextMinute(time: DateTime, minutes = 1): DateTime {
		const result = parse(time)
		result.setUTCMinutes(result.getUTCMinutes() + minutes)
		return DateTime.create(result)
	}
	export function previousMinute(time: DateTime, minutes = 1): DateTime {
		return nextMinute(time, -minutes)
	}
	export function nextHour(time: DateTime, hours = 1): DateTime {
		const result = parse(time)
		result.setUTCHours(result.getUTCHours() + hours)
		return DateTime.create(result)
	}
	export function previousHour(time: DateTime, hours = 1): DateTime {
		return nextHour(time, -hours)
	}
	export function nextDay(time: DateTime, days = 1): DateTime {
		const result = parse(time)
		result.setUTCDate(result.getUTCDate() + days)
		result.setUTCMinutes(result.getUTCMinutes())
		return DateTime.create(result)
	}
	export function previousDay(time: DateTime, days = 1): DateTime {
		return nextDay(time, -days)
	}
	export function nextMonth(time: DateTime, months = 1): DateTime {
		const result = parse(time)
		result.setUTCMonth(result.getUTCMonth() + months)
		result.setUTCMinutes(result.getUTCMinutes())
		return DateTime.create(result)
	}
	export function previousMonth(time: DateTime, months = 1): DateTime {
		return nextMonth(time, -months)
	}
	export function nextYear(time: DateTime, years = 1): DateTime {
		const result = parse(time)
		result.setUTCFullYear(result.getUTCFullYear() + years)
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
	export function getYear(time: DateTime, options?: { digits?: 2 | 4 }): number {
		return options?.digits != 2 ? Number.parseInt(time.substring(0, 4)) : +getYear(time).toString().slice(-2)
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
	export function span(
		time: DateTime,
		relative: DateTime,
		greatestUnit: "years" | "hours" | "minutes" | "seconds" | "milliseconds" = "years"
	): TimeSpan {
		let result: TimeSpan
		if (greatestUnit == "years") {
			result = {
				...Date.span(time, relative),
				hours: getHour(time) - getHour(relative),
				minutes: getMinute(time) - getMinute(relative),
				seconds: getSecond(time) - getSecond(relative),
				milliseconds: getMillisecond(time) - getMillisecond(relative),
			}
		} else {
			let milliseconds = epoch(time, "milliseconds") - epoch(relative, "milliseconds")
			const sign = Math.sign(milliseconds)
			milliseconds = Math.abs(milliseconds)
			result = {}
			switch (greatestUnit) {
				case "hours":
					result.hours = sign * Math.floor(milliseconds / (3600 * 1000))
					milliseconds -= sign * result.hours * 3600 * 1000
				// fallthrough...
				case "minutes":
					result.minutes = sign * Math.floor(milliseconds / (60 * 1000))
					milliseconds -= sign * result.minutes * 60 * 1000
				// fallthrough...
				case "seconds":
					result.seconds = sign * Math.floor(milliseconds / 1000)
					milliseconds -= sign * result.seconds * 1000
				// fallthrough...
				case "milliseconds":
					result.milliseconds = sign * milliseconds
			}
		}
		return result
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
