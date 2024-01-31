import { isoly } from "./index"
const commonlyUsedAreas: { [key: string]: isoly.CallingCode } = {
	SE: "+46",
	FI: "+358",
	DE: "+49",
	DK: "+45",
	NO: "+47",
}

describe("CallingCode", () => {
	it("seperate Swedish number", () => {
		const phoneNumber = "+461570000000"
		expect(isoly.CallingCode.separate(phoneNumber)).toEqual(["+46", "1570000000"])
	})
	it("check common countries", () => {
		for (const key in commonlyUsedAreas) {
			const phoneNumber = commonlyUsedAreas[key] + "123456789"
			expect(isoly.CallingCode.separate(phoneNumber)).toEqual([commonlyUsedAreas[key], "123456789"])
		}
	})
})
