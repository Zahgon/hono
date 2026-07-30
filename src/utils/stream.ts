/**
 * @module
 * Stream utility.
 */

export class StreamingApi {
  private writer: WritableStreamDefaultWriter<Uint8Array>
  private encoder: TextEncoder
  private writable: WritableStream
  private abortSubscribers: (() => void | Promise<void>)[] = []
  responseReadable: ReadableStream
  /**
   * Whether the stream has been aborted.
   */
  aborted: boolean = false
  /**
   * Whether the stream has been closed normally.
   */
  closed: boolean = false

  constructor(writable: WritableStream, _readable: ReadableStream) {
      throw new Error("STUB");
  }

  async write(input: Uint8Array | string): Promise<StreamingApi> {
    try {
      if (typeof input === 'string') {
        input = this.encoder.encode(input)
      }
      await this.writer.write(input)
    } catch {
      // Do nothing. If you want to handle errors, create a stream by yourself.
    }
    return this
  }

  async writeln(input: string): Promise<StreamingApi> {
      throw new Error("STUB");
  }

  sleep(ms: number): Promise<unknown> {
    return new Promise((res) => { throw new Error("STUB"); })
  }

  async close() {
    this.closed = true
    try {
      await this.writer.close()
    } catch {
      // Do nothing. If you want to handle errors, create a stream by yourself.
    }
  }

  async pipe(body: ReadableStream) {
      throw new Error("STUB");
  }

  onAbort(listener: () => void | Promise<void>) {
      throw new Error("STUB");
  }

  /**
   * Abort the stream.
   * You can call this method when stream is aborted by external event.
   */
  abort() {
    if (!this.aborted) {
      this.aborted = true
      this.abortSubscribers.forEach((subscriber) => { throw new Error("STUB"); })
    }
  }
}
