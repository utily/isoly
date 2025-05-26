import { isoly } from "../index"

describe("isoly.Month", () => {
	it.each([
		["2024-01", true],
		["2024-01-01", false],
		["2024-W01", false],
	] as const)("is(%s) == %s", (month, expected) => expect(isoly.Month.is(month)).toEqual(expected))
	it.each([
		["2023-12", "2024-01"],
		["2024-01", "2024-02"],
	] as const)("next(%s) == %s", (month, expected) => expect(isoly.Month.next(month)).toEqual(expected))
	it.each([
		["2024-01", "2023-12"],
		["2024-02", "2024-01"],
	] as const)("previous(%s) == %s", (month, expected) => expect(isoly.Month.previous(month)).toEqual(expected))
	it.each([
		["2024-01", 31],
		["2024-02", 29],
		["2023-03", 31],
		["2022-04", 30],
	] as const)("length(%s) == %s", (month, expected) => expect(isoly.Month.length(month)).toEqual(expected))
	it("now()", () => {
		expect(isoly.Month.now()).toEqual(new globalThis.Date(globalThis.Date.now()).toISOString().substring(0, 7))
	})
})
