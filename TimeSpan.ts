import { DateSpan } from "./DateSpan"

export interface TimeSpan extends DateSpan {
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

export namespace TimeSpan {
	export function is(value: TimeSpan | any): value is TimeSpan {
		return (
			typeof value == "object" &&
			(typeof value.years == "number" || value.years == undefined) &&
			(typeof value.months == "number" || value.months == undefined) &&
			(typeof value.days == "number" || value.days == undefined) &&
			(typeof value.hours == "number" || value.hours == undefined) &&
			(typeof value.minutes == "number" || value.minutes == undefined) &&
			(typeof value.seconds == "number" || value.seconds == undefined) &&
			(typeof value.milliseconds == "number" || value.milliseconds == undefined) &&
			(typeof value.years == "number" ||
				typeof value.months == "number" ||
				typeof value.days == "number" ||
				typeof value.hours == "number" ||
				typeof value.minutes == "number" ||
				typeof value.seconds == "number" ||
				typeof value.milliseconds == "number")
		)
	}
}
