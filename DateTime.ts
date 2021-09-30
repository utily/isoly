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
	export function parse(value: DateTime): Date {
		return new Date(value)
	}
	export function create(value: Date): DateTime {
		return value.toISOString()
	}
	export function now(): DateTime {
		return create(new Date())
	}
	export function localize(value: DateTime | Date, locale?: string): DateTime {
		const localeString = locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale
		return (is(value) ? parse(value) : value).toLocaleString(localeString, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		})
	}
	export function epoch(
		value: DateTime | Date,
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
}
