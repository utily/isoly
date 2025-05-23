import { isly } from "isly"
import { EndPoint as _EndPoint } from "./EndPoint"

export type Like = `${Like.EndPoint}--${Like.EndPoint}` | Like.EndPoint

export namespace Like {
	export import EndPoint = _EndPoint
	export const { type, is, flawed } = isly
		.string<Like>(
			value => EndPoint.is(value) || value.split("--", 2).every(EndPoint.is),
			"{EndPoint}--{EndPoint} | {EndPoint}"
		)
		.rename("isoly.Date.Interval.Like")
		.describe("String parsable into isoly.Date.Interval.")
		.bind()
}
