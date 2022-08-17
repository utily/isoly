import { Date } from "./Date"
import { Locale } from "./Locale"
import { TimeSpan } from "./TimeSpan"
import { TimeZone } from "./TimeZone"

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
		const length = value.length
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
			length >= 13 &&
			length <= 29 &&
			Date.is(value.substring(0, 10)) &&
			value[10] == "T" &&
			isHours(value.substring(11, 13)) &&
			(length == 13 ||
				TimeZone.is(value.substring(13)) ||
				(value[13] == ":" &&
					length >= 16 &&
					isMinutes(value.substring(14, 16)) &&
					(length == 16 ||
						TimeZone.is(value.substring(16)) ||
						(value[16] == ":" &&
							length >= 19 &&
							isSeconds(value.substring(17, 19)) &&
							(length == 19 ||
								TimeZone.is(value.substring(19)) ||
								(value[19] == "." &&
									length >= 23 &&
									[...value.substring(20, 23)].every(c => c >= "0" && c <= "9") &&
									(length == 23 || TimeZone.is(value.substring(23)))))))))
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
	export interface Format {
		localeMatcher?: "best fit" | "lookup" | undefined
		weekday?: "long" | "short" | "narrow" | undefined
		era?: "long" | "short" | "narrow" | undefined
		year?: "numeric" | "2-digit" | undefined
		month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
		day?: "numeric" | "2-digit" | undefined
		hour?: "numeric" | "2-digit" | undefined
		minute?: "numeric" | "2-digit" | undefined
		second?: "numeric" | "2-digit" | undefined
		timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined
		formatMatcher?: "best fit" | "basic" | undefined
		hour12?: boolean | undefined
		timeZone?: TimeZone | undefined
	}
	export function localize(value: DateTime | globalThis.Date, format: Format, locale?: Locale): string
	export function localize(value: DateTime | globalThis.Date, locale?: Locale, timeZone?: TimeZone): string
	export function localize(
		value: DateTime | globalThis.Date,
		locale?: Locale | Format,
		timeZone?: TimeZone | Locale
	): string {
		let result: string
		if (typeof locale == "object") {
			const localeString = timeZone ? timeZone : Intl.DateTimeFormat().resolvedOptions().locale
			result = (is(value) ? parse(value) : value).toLocaleString(localeString, locale as any)
		} else {
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
					timeZone: timeZone as TimeZone,
				},
				locale
			)
		}
		return result
	}

	export function timeZone(value: DateTime): TimeZone | "" {
		const result = value[value.length - 1] == "Z" ? "Z" : value.substring(value.length - 6)
		return TimeZone.is(result) ? result : ""
	}
	export type Precision = "hours" | "minutes" | "seconds" | "milliseconds"
	export function precision(value: DateTime): Precision {
		const zone = timeZone(value)
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
		const zone = timeZone(value)
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
