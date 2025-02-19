import { isly } from "isly"
import { Date } from "../Date"
import { Locale } from "../Locale"
import { Time } from "../Time"
import { TimeSpan } from "../TimeSpan"
import { TimeZone } from "../TimeZone"
import { Format } from "./Format"
import { Numeric as DateTimeNumeric } from "./Numeric"
import { Precision } from "./Precision"

export type DateTime = string

export namespace DateTime {
	export import Numeric = DateTimeNumeric
	export const { type, is, flawed } = isly
		.string<DateTime>((value: string) => {
			const { date, time, timeZoneOffset } = DateTime.split(value)
			return Date.is(date) && Time.type.optional().is(time) && TimeZone.Offset.type.optional().is(timeZoneOffset)
		}, "YYYY-MM-DDTHH[:mm[:ss[.fff]]][Z|(+|-)HH:MM]")
		.rename("isoly.DateTime")
		.describe("Valid ISO 8601 date-time formats include YYYY-MM-DDTHH[:mm[:ss[.fff]]][Z|(+|-)HH:MM].")
		.bind()
	export function split(value: DateTime): {
		date: Date
		time: Time | undefined
		timeZoneOffset: TimeZone.Offset | undefined
	} {
		const [date, splitted] = value.split("T", 2) as [Date, string | undefined]
		const [time, timeZoneOffset] = (splitted?.split(/(Z|[+-].{5})?$/, 2) ?? [undefined, undefined]) as [
			Time | undefined,
			TimeZone.Offset | undefined
		]
		return {
			date,
			time,
			timeZoneOffset,
		}
	}
	export function parse(value: DateTime): globalThis.Date {
		return new globalThis.Date(DateTime.truncate(value, "milliseconds"))
	}
	export function create(value: number, resolution?: Precision): DateTime
	export function create(value: globalThis.Date): DateTime
	export function create(value: number | globalThis.Date, precision: Precision = "seconds"): DateTime {
		return Numeric.create(value).format(precision)
	}
	export function normalize(value: DateTime | string, precision?: Precision): DateTime {
		return Numeric.parse(value).format(precision)
	}
	/**
	 * Return local time with offset.
	 * Note: During DST-change, this might be wrong.
	 */
	export function fromLocal(local: DateTime, timeZone: TimeZone) {
		// Cut off any time-zone-information:
		// TODO: Use the information, and just change offset.
		local = local.replace(/(Z|([+-].{5}))?$/, "")
		// Create a Date object with the specified time as UTC
		const utcDateTime = new globalThis.Date(`${local}Z`)
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
		const timeZoneString = `${diffInMinutes >= 0 ? "+" : "-"}${offsetHours}:${offsetMinutes}`
		return `${local}${timeZoneString}`
	}
	export function now(): DateTime {
		return create(new globalThis.Date())
	}

	export function localize(value: DateTime | globalThis.Date, format: Format, locale?: Locale): string
	export function localize(value: DateTime | globalThis.Date, locale?: Locale, timeZone?: TimeZone): string
	export function localize(
		value: DateTime | globalThis.Date,
		formatOrLocale?: Locale | Format,
		localeOrTimeZone?: string | Locale
	): string {
		return Numeric.create(value).localize(formatOrLocale, localeOrTimeZone)
	}
	export function startOfDay(value: DateTime | Date): DateTime {
		return Numeric.create(value).startOfDay.format()
	}
	export function endOfDay(value: DateTime | Date): DateTime {
		return Numeric.create(value).endOfDay.format()
	}
	export function timeZoneShort(value: DateTime): number {
		return Numeric.create(value).to("system").getTimezoneOffset()
	}
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

	export function truncate(
		value: globalThis.Date | Numeric.Values | number | DateTime,
		precision: Precision
	): DateTime {
		return Numeric.create(value).truncate(precision).format()
	}
	export function epoch(
		value: globalThis.Date | Numeric.Values | number | DateTime,
		precision: Time.Precision | "days" = "seconds"
	): number {
		return Numeric.create(value).epoch(precision)
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
