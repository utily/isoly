export type IsoDate = string

export namespace IsoDate {
	export function is(value: any | IsoDate): value is IsoDate {
		return (
			typeof value == "string" && /^(\d{4}-[01]\d-[0-3]\d)|(\d{4}-[01]\d-[0-3]\d)|(\d{4}-[01]\d-[0-3]\d)$/.test(value)
		)
	}
	export function parse(value: IsoDate, time?: string): Date {
		return new Date(value + (time ?? "T12:00:00.000Z"))
	}
	export function create(value: Date): IsoDate {
		return value.toISOString().substring(0, 10)
	}
	export function now(): IsoDate {
		return create(new Date())
	}
	export function localize(value: IsoDate | Date, locale?: string): IsoDate {
		const localeString = locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale
		const localeOptions = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		}
		return (is(value) ? parse(value) : value).toLocaleString(localeString, localeOptions).substring(0, 10)
	}
}
