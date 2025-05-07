import { isly } from "isly"

export type Duration = `P${string}`

export namespace Duration {
	export const { type, is, flawed } = isly
		.string<Duration>((value: string) => {
			const match = value.match(/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?$/)
			return (
				!!match &&
				(match[1] != undefined || match[2] != undefined || match[3] != undefined) &&
				(!match[1] || Number.parseInt(match[1]) >= 0) &&
				(!match[2] || Number.parseInt(match[2]) >= 0) &&
				(!match[3] || Number.parseInt(match[3]) >= 0)
			)
		}, "P[n]Y[n]M[n]D")
		.rename("isoly.Date.Duration")
		.describe("Duration string in format P[n]Y[n]M[n]D.")
		.bind()
}
