import { isoly } from "../../index"

describe("isoly.Date.Day", () => {
	it.each(isoly.Date.Day.values)("is(%s) == true", day => expect(isoly.Date.Day.is(day)).toBe(true))
	it.each(["00", "32", "abc", "1", "001", "31a"])("is(%s) == false", day => expect(isoly.Date.Day.is(day)).toBe(false))
	it.each([
		[1, "01"],
		[15, "15"],
		[31, "31"],
	])("create(%d) == %s", (n, d) => expect(isoly.Date.Day.create(n)).toBe(d))
	it.each([0, 32, -1])("create(%d) == undefined", n => expect(isoly.Date.Day.create(n)).toBeUndefined())
})
