import { isly } from "isly"
import { Numeric } from "../Numeric"

export type Duration = `P${string}`

export namespace Duration {
	export const { type, is, flawed } = isly
		.string<Duration>((value: string) => {
			const match = value.match(
				/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d{1,3}))?S)?)?$/ // ISO 8601 duration with time part
			)
			return (
				!!match &&
				(match[1] != undefined || // years
					match[2] != undefined || // months
					match[3] != undefined || // days
					match[4] != undefined || // hours
					match[5] != undefined || // minutes
					match[6] != undefined || // seconds
					match[7] != undefined) && // milliseconds
				(!match[1] || Number.parseInt(match[1]) >= 0) &&
				(!match[2] || Number.parseInt(match[2]) >= 0) &&
				(!match[3] || Number.parseInt(match[3]) >= 0) &&
				(!match[4] || Number.parseInt(match[4]) >= 0) &&
				(!match[5] || Number.parseInt(match[5]) >= 0) &&
				(!match[6] || Number.parseInt(match[6]) >= 0) &&
				(!match[7] || Number.parseInt(match[7]) >= 0)
			)
		}, "P[nY][nM][nD]T[nH][nM][n.[n]S]")
		.rename("isoly.DateTime.Duration")
		.describe("Duration string in format P[nY][nM][nD]T[nH][nM][n.[n]S]")
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
