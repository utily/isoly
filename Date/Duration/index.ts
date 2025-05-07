import { isly } from "isly"
import { Numeric } from "../Numeric"

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
	export function parse(value: Duration): Numeric
	export function parse(value: Duration | string | undefined): Numeric | undefined
	export function parse(value: Duration | string | undefined): Numeric | undefined {
		const result =
			typeof value == "string" && value[0] == "P"
				? (v => {
						const matches = /^P(?<years>-?\d+)(?:Y(?<months>-?\d+)(?:M(?<days>-?\d+)D)?)?$/u.exec(v)?.groups
						return [
							matches?.years ? Number.parseInt(matches.years) : undefined,
							matches?.months ? Number.parseInt(matches.months) : undefined,
							matches?.days ? Number.parseInt(matches.days) : undefined,
						] as const
				  })(value)
				: undefined
		return result && new Numeric(result[0], result[1], result[2])
	}
	export function from(value: Numeric | Duration | string | undefined): Duration | undefined {
		return value == undefined
			? undefined
			: (typeof value == "string" ? parse(value) : Numeric.create(value))?.format("duration")
	}
}
