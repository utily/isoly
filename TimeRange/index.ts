import { isly } from "isly"
import { DateTime } from "../DateTime"
import { TimeSpan } from "../TimeSpan"

export interface TimeRange {
	start: DateTime
	end: DateTime
}

export namespace TimeRange {
	export const type = isly<TimeRange>("object", { start: DateTime.type, end: DateTime.type }, "isoly.TimeRange")
	export const is = type.is.bind(type) as typeof type.is
	export const flawed = type.flawed.bind(type) as typeof type.flawed
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
