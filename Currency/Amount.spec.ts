import { isoly } from "../index"

describe("isoly.Currency.Amount", () => {
	it("should create an Amount instance", () => {
		expect(isoly.Currency.Amount.create("USD", 100).add(50).subtract(20).value).toBe(130)
	})
})
