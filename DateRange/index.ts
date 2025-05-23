import { isly } from "isly"
import { Date } from "../Date"
import { DateSpan } from "../DateSpan"
export interface DateRange {
	start: Date
	end: Date
}

export namespace DateRange {
	export const { type, is, flawed } = isly
		.object<DateRange>({ start: Date.type, end: Date.type }, "isoly.DateRange")
		.bind()
	export function create(start: Date, end: Date): DateRange
	export function create(date: Date, length: DateSpan): DateRange
	export function create(start: Date, end: Date | DateSpan): DateRange {
		return !Date.is(end)
			? create(start, Date.next(start, end))
			: start <= end
			? { start, end }
			: { start: end, end: start }
	}
	export function toDates(value: DateRange, includeLast = true): Date[] {
		const result: string[] = []
		for (
			let current = value.start;
			includeLast ? current <= value.end : current < value.end;
			current = Date.next(current)
		)
			result.push(current)
		return result
	}
	export function getDays(value: DateRange): number {
		const result =
			value.start <= value.end
				? Math.ceil(
						(new globalThis.Date(value.end).getTime() - new globalThis.Date(value.start).getTime()) / (1000 * 3600 * 24)
				  )
				: -getDays({ start: value.end, end: value.start })

		return result
	}
}
