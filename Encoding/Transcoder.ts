export abstract class Transcoder {
	abstract encode(data: string): Uint8Array
	abstract decode(data: ArrayBufferView | undefined): string
}
