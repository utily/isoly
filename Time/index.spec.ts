import { isoly } from "../index"

describe("isoly.Time", () => {
	it.each([
		"12:34:56.789",
		"01:02:03.004",
		"23:59:59.999",
		"00:00:00.000",
		"09:08:07.006",
		"15:45:30.123",
		"12:34:56",
		"12:34",
		"12",
		"23:59:60",
	])("is(%s) should be true", t => expect(isoly.Time.is(t)).toBe(true))
	it.each(["24:00:00.000", "12:60:00.000", "12:34:60.000", "12:34:56.1000", ""])("is(%s) should be false", t =>
		expect(isoly.Time.is(t)).toBe(false)
	)
	it.each([
		["99:34:56", "99:34:56"],
		["12:34:56.789123", "12:34:56.789"],
		["12:34:56.789", "12:34:56.789"],
		["1:2:3.4", "01:02:03.400"],
		["23:59:59", "23:59:59"],
		["00:00", "00:00"],
		["12", "12"],
	])("normalize(%s) == %s", (t, e) => expect(isoly.Time.normalize(t)).toEqual(e))
	it.each([
		[458923, "hours", "458923"],
		[458923, "minutes", "7648:43"],
		[458923, "seconds", "127:28:43"],
		[458923, undefined, "127:28:43"],
		[458923, "milliseconds", "00:07:38.923"],
	] as const)("create(%d, %s) == %s", (value, precision, expected) =>
		expect(precision ? isoly.Time.create(value, precision) : isoly.Time.create(value)).toBe(expected)
	)
})
