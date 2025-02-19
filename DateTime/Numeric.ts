import { isly } from "isly"
import { Precision } from "Time/Precision"
import { Date } from "../Date"
import { Locale } from "../Locale"
import { Time } from "../Time"
import { TimeSpan } from "../TimeSpan"
import { TimeZone } from "../TimeZone"
import { Format } from "./Format"
import { DateTime } from "./index"

export class Numeric {
	get precision(): Precision | "days" {
		return this.time?.precision ?? "days"
	}
	get values(): Numeric.Values {
		return {
			...(this.date?.values ?? {}),
			...(this.time?.values ?? {}),
			...(this.zone ? { zone: this.zone } : {}),
		}
	}
	get startOfDay(): Numeric {
		return new Numeric(this.date, new Time.Numeric(0, 0, 0, 0), this.zone)
	}
	get endOfDay(): Numeric {
		return new Numeric(this.date, new Time.Numeric(23, 59, 59, 999), this.zone)
	}
	constructor(readonly date?: Date.Numeric, readonly time?: Time.Numeric, readonly zone?: TimeZone.Offset) {}
	to(type: "system"): globalThis.Date {
		return new globalThis.Date(this.format())
	}
	normalize(): Numeric {
		const time = (this.time?.normalize() ?? new Time.Numeric()).values
		const days = time.hours == undefined ? undefined : Math.trunc(time.hours / 24)
		if (time.hours != undefined)
			time.hours = time.hours % 24
		return new Numeric(this.date?.add({ days }), Time.Numeric.create(time), this.zone)
	}
	format(precision?: Precision): DateTime {
		const result = this.normalize()
		return `${result.date?.format() ?? ""}T${result.time?.format(precision)}${result.zone ?? ""}`
	}
	localize(format: Format, locale?: Locale): string
	localize(locale?: Locale, timeZone?: TimeZone): string
	localize(formatOrLocale?: Locale | Format, localeOrTimeZone?: string | Locale): string {
		let result: string
		if (typeof formatOrLocale == "object") {
			// formatOrLocale is Format
			// localeOrTimeZone is Locale | undefined
			const localeString = localeOrTimeZone ? localeOrTimeZone : Intl.DateTimeFormat().resolvedOptions().locale
			result = this.to("system")
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
			const precision = this.precision
			result = this.localize(
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
	next(span: number | TimeSpan = 1): Numeric {
		let result: Numeric
		if (typeof span == "number")
			result = this.nextSecond(span)
		else {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			result = this
			if (span.years)
				result = result.nextYear(span.years)
			if (span.months)
				result = result.nextMonth(span.months)
			if (span.days)
				result = result.nextDay(span.days)
			if (span.hours)
				result = result.nextHour(span.hours)
			if (span.minutes)
				result = result.nextMinute(span.minutes)
			if (span.seconds)
				result = result.nextSecond(span.seconds)
			if (span.milliseconds)
				result = result.nextMillisecond(span.milliseconds)
		}
		return result
	}
	previous(span: number | TimeSpan = 1): Numeric {
		let result: Numeric
		if (typeof span == "number")
			result = this.previousSecond(span)
		else {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			result = this
			if (span.years)
				result = result.previousYear(span.years)
			if (span.months)
				result = result.previousMonth(span.months)
			if (span.days)
				result = result.previousDay(span.days)
			if (span.hours)
				result = result.previousHour(span.hours)
			if (span.minutes)
				result = result.previousMinute(span.minutes)
			if (span.seconds)
				result = result.previousSecond(span.seconds)
			if (span.milliseconds)
				result = result.previousMillisecond(span.milliseconds)
		}
		return result
	}
	nextMillisecond(milliseconds = 1): Numeric {
		const result = this.to("system")
		result.setUTCMilliseconds(result.getUTCMilliseconds() + milliseconds)
		return Numeric.create(result)
	}
	previousMillisecond(milliseconds = 1): Numeric {
		return this.nextMillisecond(-milliseconds)
	}
	nextSecond(seconds = 1): Numeric {
		const result = this.to("system")
		result.setUTCSeconds(result.getUTCSeconds() + seconds)
		return Numeric.create(result)
	}
	previousSecond(seconds = 1): Numeric {
		return this.nextSecond(-seconds)
	}
	nextMinute(minutes = 1): Numeric {
		const result = this.to("system")
		result.setUTCMinutes(result.getUTCMinutes() + minutes)
		return Numeric.create(result)
	}
	previousMinute(minutes = 1): Numeric {
		return this.nextMinute(-minutes)
	}
	nextHour(hours = 1): Numeric {
		const result = this.to("system")
		result.setUTCHours(result.getUTCHours() + hours)
		return Numeric.create(result)
	}
	previousHour(hours = 1): Numeric {
		return this.nextHour(-hours)
	}
	nextDay(days = 1): Numeric {
		const result = this.to("system")
		result.setUTCDate(result.getUTCDate() + days)
		result.setUTCMinutes(result.getUTCMinutes())
		return Numeric.create(result)
	}
	previousDay(days = 1): Numeric {
		return this.nextDay(-days)
	}
	nextMonth(months = 1): Numeric {
		const result = this.to("system")
		result.setUTCMonth(result.getUTCMonth() + months)
		result.setUTCMinutes(result.getUTCMinutes())
		return Numeric.create(result)
	}
	previousMonth(months = 1): Numeric {
		return this.nextMonth(-months)
	}
	nextYear(years = 1): Numeric {
		const result = this.to("system")
		result.setUTCFullYear(result.getUTCFullYear() + years)
		return Numeric.create(result)
	}
	previousYear(years = 1): Numeric {
		return this.nextYear(-years)
	}
	epoch(precision: Precision | "days" = "seconds"): number {
		let result = this.to("system").getTime()
		switch (precision) {
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
	toJSON(): DateTime {
		return this.format()
	}
	truncate(precision: Precision | "days"): Numeric {
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
	static create(value: globalThis.Date | Numeric.Values | number | DateTime): Numeric {
		return value instanceof globalThis.Date
			? Numeric.parse(value.toISOString())
			: typeof value == "number"
			? Numeric.create(new globalThis.Date(value))
			: typeof value == "string"
			? Numeric.parse(value)
			: new Numeric(
					new Date.Numeric(value.years, value.months, value.days),
					new Time.Numeric(value.hours, value.minutes, value.seconds, value.milliseconds),
					value.zone
			  )
	}
	static parse(value: DateTime | string): Numeric {
		const [date, splitted]: (string | undefined)[] = value.split("T", 2)
		const [time, zone]: (string | undefined)[] = splitted?.split(/(Z|[+-].{5})?$/, 2) ?? []
		return new Numeric(Date.Numeric.parse(date), Time.Numeric.parse(time), TimeZone.Offset.parse(zone))
	}
	static get now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static get epoch(): [Numeric, Numeric] {
		return [
			new Numeric(Date.Numeric.epoch[0], Time.Numeric.create({})),
			new Numeric(
				Date.Numeric.epoch[1],
				Time.Numeric.create({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 })
			),
		]
	}
}

export namespace Numeric {
	export type Values = Date.Numeric.Values & Time.Numeric.Values & { zone?: TimeZone.Offset }
	export namespace Values {
		export const { type, is, flawed } = isly
			.union<Numeric.Values>(
				Date.Numeric.Values.type,
				Time.Numeric.Values.type,
				isly.object<{ zone?: TimeZone.Offset }>({ zone: TimeZone.Offset.type.optional() })
			)
			.rename("isoly.DateTime.Numeric.Values")
			.bind()
	}
}
