import { isoly } from "../index"

describe("Time", () => {
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
	])("isoly.Time.is(%s) should be true", t => expect(isoly.Time.is(t)).toBe(true))
	it.each(["24:00:00.000", "12:60:00.000", "12:34:60.000", "12:34:56.1000", ""])(
		"isoly.Time.is(%s) should be false",
		t => expect(isoly.Time.is(t)).toBe(false)
	)
	it.each([
		["12:34:56.789", ["12", "34", "56", "789"]],
		["1:2:3.4", ["01", "02", "03", "400"]],
		["23:59:59", ["23", "59", "59", undefined]],
		["00:00", ["00", "00", undefined, undefined]],
		["12", ["12", undefined, undefined, undefined]],
	])("isoly.Time.split(%s) should return %j", (t, e) => expect(isoly.Time.split(t)).toEqual(e))
	it.each([
		["12:34:56.789", "12:34:56.789"],
		["1:2:3.4", "01:02:03.400"],
		["23:59:59", "23:59:59.000"],
		["00:00", "00:00:00.000"],
		["12", "12:00:00.000"],
	])("isoly.Time.normalize(%s) should return %s", (t, e) => expect(isoly.Time.normalize(t)).toEqual(e))
})
