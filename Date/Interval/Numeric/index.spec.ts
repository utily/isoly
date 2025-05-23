import { isoly } from "../../../index"

describe("isoly.Date.Interval.Numeric", () => {
	it.each([
		{
			value: [
				{ years: 2023, months: 5, days: 15 },
				{ years: 2023, months: 6, days: 20 },
			] as const,
			expected: { start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
		},
		{
			value: [{ years: 2023, months: 5, days: 15 }] as const,
			expected: { start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 5, days: 15 } },
		},
	])("create(%s) == %s", ({ value, expected }) =>
		expect(isoly.Date.Interval.Numeric.create(...value)).toEqual(expected)
	)
	it.each([
		{
			value: [
				{ years: 2023, months: 5, days: 15 },
				{ years: 2023, months: 6, days: 20 },
			] as const,
			expected: { years: 0, months: 1, days: 5 },
		},
		{
			value: [
				{ years: 2023, months: 5, days: 15 },
				{ years: 2023, months: 5, days: 15 },
			] as const,
			expected: { years: 0, months: 0, days: 0 },
		},
	])("%s.duration == %s", ({ value: [start, end], expected }) =>
		expect(isoly.Date.Interval.Numeric.create(start, end).duration).toEqual(expected)
	)
	it.each([
		{
			left: { start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
			right: { start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
			expected: true,
		},
		{
			left: { start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
			right: { start: { years: 2023, months: 5, days: 16 }, end: { years: 2023, months: 6, days: 21 } },
			expected: false,
		},
	])("%s.equals(%s) == %s", ({ left, right, expected }) =>
		expect(isoly.Date.Interval.Numeric.create(left.start, left.end).equals(right)).toBe(expected)
	)
	it.each([
		{
			date: { years: 2023, months: 5, days: 16 },
			expected: true,
		},
		{
			date: { years: 2023, months: 5, days: 15 },
			expected: true,
		},
		{
			date: { years: 2023, months: 6, days: 20 },
			expected: true,
		},
		{
			date: { years: 2023, months: 7, days: 1 },
			expected: false,
		},
	])("contains(%s) == %s", ({ date, expected }) =>
		expect(
			isoly.Date.Interval.Numeric.create(
				{ years: 2023, months: 5, days: 15 },
				{ years: 2023, months: 6, days: 20 }
			).contains(isoly.Date.Numeric.create(date))
		).toBe(expected)
	)
	it.each([
		[
			{ start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
			{ days: 5 },
			{ start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 15 } },
		],
		[
			{ start: { years: 2023, months: 1, days: 1 }, end: { years: 2023, months: 1, days: 10 } },
			{ days: 3 },
			{ start: { years: 2023, months: 1, days: 1 }, end: { years: 2023, months: 1, days: 7 } },
		],
	])("%s.decrease(%s) == %s", (value, change, expected) =>
		expect(isoly.Date.Interval.Numeric.create(value).decrease(change).value).toEqual(expected)
	)
	it.each([
		[
			{ start: { years: 2023, months: 5, days: 15 }, end: { years: 2023, months: 6, days: 20 } },
			{ days: 5 },
			{ start: { years: 2023, months: 5, days: 20 }, end: { years: 2023, months: 6, days: 25 } },
		],
		[
			{ start: { years: 2023, months: 1, days: 10 }, end: { years: 2023, months: 2, days: 10 } },
			{ months: 1 },
			{ start: { years: 2023, months: 2, days: 10 }, end: { years: 2023, months: 3, days: 10 } },
		],
	] as const)("%s.move(%s) == %s", (value, change, expected) =>
		expect(isoly.Date.Interval.Numeric.create(value).move(change).value).toEqual(expected)
	)
	it.each([
		[
			{
				start: { years: 2023, months: 5, days: 14 },
				end: { years: 2023, months: 6, days: 19 },
			},
			"2023-06-15--2023-07-20",
		],
		[
			{
				start: { years: 2022, months: 1, days: 1 },
				end: { years: 2022, months: 12, days: 31 },
			},
			"2022-02-02--2023-02-01",
		],
	])("%s.toJson() == %s", (value, expected) => {
		const interval = isoly.Date.Interval.Numeric.create(value)
		expect(interval.toJson()).toBe(expected)
		expect(interval.toString()).toBe(expected)
	})
})
