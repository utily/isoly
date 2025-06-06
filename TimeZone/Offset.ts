import { isly } from "isly"

export type Offset = typeof Offset.values[number]

export namespace Offset {
	export const values = [
		"-12:00",
		"-11:00",
		"-10:00",
		"-09:30",
		"-09:00",
		"-08:00",
		"-07:00",
		"-06:00",
		"-05:00",
		"-04:00",
		"-03:30",
		"-03:00",
		"-02:00",
		"-01:00",
		"-00:00",
		"Z",
		"+00:00",
		"+01:00",
		"+02:00",
		"+03:00",
		"+03:30",
		"+04:00",
		"+04:30",
		"+05:00",
		"+05:30",
		"+05:45",
		"+06:00",
		"+06:30",
		"+07:00",
		"+08:00",
		"+08:45",
		"+09:00",
		"+09:30",
		"+10:00",
		"+10:30",
		"+11:00",
		"+12:00",
		"+12:45",
		"+13:00",
		"+14:00",
	] as const
	export const { type, is, flawed } = isly
		.string("value", ...values)
		.rename("isoly.TimeZone.Offset")
		.describe("Time zone offset Z|(+|-)HH:MM")
		.bind()
	export function parse(value: Offset | string | undefined): Offset | undefined {
		return type.get(value)
	}
}
