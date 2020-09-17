import { CallingCode } from "./CallingCode"
const commonlyUsedAreas: { [key: string]: CallingCode } = {
	SE: "+46",
	FI: "+358",
	DE: "+49",
	DK: "+45",
	NO: "+47",
}

describe("CallingCode", () => {
	it("seperate Swedish number", () => {
		const phoneNumber = "+461570000000"
		expect(CallingCode.seperate(phoneNumber)).toEqual(["+46", "1570000000"])
	})
	it("check common countries", () => {
		for (const key in commonlyUsedAreas) {
			const phoneNumber = commonlyUsedAreas[key] + "123456789"
			expect(CallingCode.seperate(phoneNumber)).toEqual([commonlyUsedAreas[key], "123456789"])
		}
	})
})
