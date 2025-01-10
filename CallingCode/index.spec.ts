import { isoly } from "../index"

describe("CallingCode", () => {
	it.each([
		["SE", "+46"],
		["FI", "+358"],
		["DE", "+49"],
		["DK", "+45"],
		["NO", "+47"],
	] as const)("separate %s %s", (key, callingCode) =>
		expect(isoly.CallingCode.separate(callingCode + "123456789")).toEqual([callingCode, "123456789"])
	)
	it.each([
		["SE", "+46"],
		["FI", "+358"],
		["DE", "+49"],
		["DK", "+45"],
		["NO", "+47"],
	] as const)("from %s == %s", (alpha2, callingCode) => expect(isoly.CallingCode.from(alpha2)).toEqual(callingCode))
	it.each([
		["+46", "SE"],
		["+358", ["FI", "AX"]],
		["+49", "DE"],
		["+45", "DK"],
		["+47", ["NO", "SJ"]],
	] as const)("to %s == %s", (callingCode, alpha2) => expect(isoly.CallingCode.to(callingCode)).toEqual(alpha2))
})
