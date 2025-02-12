import { isly } from "isly"
import { DateTime } from "../DateTime"
import { TimeSpan } from "../TimeSpan"

export interface TimeRange {
	start: DateTime
	end: DateTime
}

export namespace TimeRange {
	export const { type, is, flawed } = isly
		.object<TimeRange>({ start: DateTime.type, end: DateTime.type }, "isoly.TimeRange")
		.bind()
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
