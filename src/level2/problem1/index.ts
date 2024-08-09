export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {

  private cache: Map<string, Promise<TOutput>> = new Map();

  constructor(private readonly handler: (...args: TInputs) => Promise<TOutput>) {}

  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */
    if(!this.cache.has(key)) {
      const result = this.handler(...args);
      this.cache.set(key, result);

      return result;
    }

    return this.cache.get(key);
  }
}
