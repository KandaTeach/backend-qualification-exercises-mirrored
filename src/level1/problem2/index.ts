export class ObjectId {
  private data: Buffer;
  private static randomValue: number = Math.floor(Math.random() * 0xFFFFFFFF);
  private static counter: number = Math.floor(Math.random() * 0xFFFFFF);

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */


    this.data = Buffer.alloc(14);

    this.data.writeUInt8(type, 0);

    const timeBuffer = Buffer.alloc(8);
    timeBuffer.writeBigUInt64BE(BigInt(timestamp), 0);
    timeBuffer.copy(this.data, 1, 2, 8);

    this.data.writeUInt32BE(ObjectId.randomValue, 7);

    this.data.writeUIntBE(ObjectId.counter++, 11, 3);

    ObjectId.counter &= 0xFFFFFF;
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }

  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}
