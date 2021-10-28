import { DateTime } from "./DateTime"
import { TimeSpan } from "./TimeSpan"

export interface TimeRange {
	start: DateTime
	end: DateTime
}

export namespace TimeRange {
	export function is(value: any | TimeRange): value is TimeRange {
		return typeof value == "object" && DateTime.is(value.start) && DateTime.is(value.end)
	}
	export function create(start: DateTime, end: DateTime): TimeRange
	export function create(date: DateTime, length: TimeSpan): TimeRange
	export function create(start: DateTime, end: DateTime | TimeSpan): TimeRange {
		return !DateTime.is(end)
			? create(start, DateTime.next(start, end))
			: start <= end
			? { start, end }
			: { start: end, end: start }
	}
}
