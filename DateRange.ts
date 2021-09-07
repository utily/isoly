import { Date } from "./Date"
import { DateSpan } from "./DateSpan"
export interface DateRange {
	start: Date
	end: Date
}

export namespace DateRange {
	export function is(value: any | DateRange): value is DateRange {
		return typeof value == "object" && Date.is(value.start) && Date.is(value.end)
	}
	export function create(start: Date, end: Date): DateRange
	export function create(date: Date, length: DateSpan): DateRange
	export function create(start: Date, end: Date | DateSpan): DateRange {
		return !Date.is(end)
			? create(start, Date.next(start, end))
			: start <= end
			? { start, end }
			: { start: end, end: start }
	}
}
